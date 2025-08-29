"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProjectManager from "@/components/admin/ProjectManager";
import CertificationManager from "@/components/admin/CertificationManager";
import ResumeManager from "@/components/admin/ResumeManager";

const DashboardPage = () => {
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const response = await fetch('/api/admin/verify');
        if (response.ok) {
          const data = await response.json();
          setAdmin(data.admin);
        } else {
          router.push("/admin/login");
        }
      } catch (error) {
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    verifyAdmin();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push("/admin/login");
    } catch (error) {
      router.push("/admin/login");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#030014]">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#030014]">
        <p className="text-white">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030014] text-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-50">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 relative z-50">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-400">Welcome back, {admin.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors relative z-50"
            style={{ position: 'relative', zIndex: 9999 }}
          >
            Logout
          </button>
        </header>
        
        <main className="space-y-8 relative z-40">
          <section className="bg-[#0c0c1b] border border-[#2A0E61] rounded-lg p-6">
            <ResumeManager />
          </section>
          <section className="bg-[#0c0c1b] border border-[#2A0E61] rounded-lg p-6">
            <ProjectManager />
          </section>
          <section className="bg-[#0c0c1b] border border-[#2A0E61] rounded-lg p-6">
            <CertificationManager />
          </section>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
