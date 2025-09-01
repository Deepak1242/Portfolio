import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Normalize common hosting URLs to their direct-download variants
function normalizeDownloadUrl(original: string): string {
  try {
    const u = new URL(original);
    const host = u.hostname.toLowerCase();

    // Google Drive -> direct download
    if (host.includes('drive.google.com')) {
      const match = original.match(/\/file\/d\/([^/]+)/);
      const id = match?.[1] || u.searchParams.get('id');
      if (id) return `https://drive.google.com/uc?export=download&id=${id}`;
    }

    // Dropbox -> raw content host
    if (host.includes('dropbox.com')) {
      if (host === 'www.dropbox.com' || host === 'dropbox.com') {
        u.hostname = 'dl.dropboxusercontent.com';
      }
      // Avoid HTML landing page
      u.searchParams.delete('dl');
      return u.toString();
    }

    // GitHub blob -> raw
    if (host === 'github.com') {
      const parts = u.pathname.split('/').filter(Boolean);
      const blobIdx = parts.indexOf('blob');
      if (blobIdx > 1 && parts.length > blobIdx + 2) {
        const user = parts[0];
        const repo = parts[1];
        const branch = parts[blobIdx + 1];
        const path = parts.slice(blobIdx + 2).join('/');
        return `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${path}`;
      }
    }

    return original;
  } catch {
    return original;
  }
}

export async function GET() {
  try {
    // Fetch the active resume from database
    const activeResume = await prisma.resume.findFirst({
      where: { isActive: true },
      orderBy: { updatedAt: 'desc' }
    });
    
    if (!activeResume) {
      return new NextResponse("No active resume found", { status: 404 });
    }
    
    // Normalize common hosting URLs to direct-download endpoints
    const sourceUrl = normalizeDownloadUrl(activeResume.fileUrl);

    // Fetch the file from the URL and stream it through
    const upstream = await fetch(sourceUrl, {
      cache: 'no-store',
      redirect: 'follow',
      headers: {
        // Encourage servers to return file bytes
        Accept: 'application/pdf,*/*;q=0.8',
      },
    });
    
    if (!upstream.ok || !upstream.body) {
      console.error('Failed to fetch resume file from URL:', sourceUrl, upstream.status, upstream.statusText);
      return new NextResponse("Failed to fetch resume file", { status: 500 });
    }
    
    // Prepare headers: start with upstream headers (excluding hop-by-hop headers)
    const headers = new Headers();
    upstream.headers.forEach((value, key) => {
      if (!['transfer-encoding', 'connection', 'keep-alive', 'proxy-authenticate', 'proxy-authorization', 'te', 'trailer', 'upgrade'].includes(key.toLowerCase())) {
        headers.set(key, value);
      }
    });
    
    // Ensure content type defaults to PDF if missing
    const contentType = headers.get('content-type') || '';
    if (!contentType) headers.set('Content-Type', 'application/pdf');

    // If upstream clearly isn't a PDF (e.g., HTML landing page), fallback to redirecting
    const ct = (headers.get('content-type') || '').toLowerCase();
    const isPdfLike = ct.includes('pdf') || ct.includes('octet-stream');
    if (!isPdfLike) {
      return NextResponse.redirect(activeResume.fileUrl);
    }
    
    // Force download with a stable filename
    const filename = activeResume.fileName || 'resume.pdf';
    headers.set('Content-Disposition', `attachment; filename="${filename}"`);
    
    // Strict no-cache
    headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    headers.set('Pragma', 'no-cache');
    headers.set('Expires', '0');
    
    return new NextResponse(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers,
    });
  } catch (error) {
    console.error('Error in resume download:', error);
    return new NextResponse("Error downloading resume", { status: 500 });
  }
}
