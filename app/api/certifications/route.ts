import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const certificationsFilePath = path.join(
  process.cwd(),
  "data",
  "certifications.json"
);

const readCertificationsFromFile = () => {
  const fileContent = fs.readFileSync(certificationsFilePath, "utf-8");
  return JSON.parse(fileContent);
};

const writeCertificationsToFile = (certifications: any) => {
  fs.writeFileSync(
    certificationsFilePath,
    JSON.stringify(certifications, null, 2)
  );
};

export async function GET() {
  try {
    const certifications = readCertificationsFromFile();
    return NextResponse.json(certifications);
  } catch (error) {
    return NextResponse.json(
      { message: "Error reading certifications data" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const newCertification = await request.json();
    const certifications = readCertificationsFromFile();
    newCertification.id = certifications.length > 0 ? Math.max(...certifications.map((c: any) => c.id)) + 1 : 1;
    certifications.push(newCertification);
    writeCertificationsToFile(certifications);
    return NextResponse.json(newCertification, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating certification" },
      { status: 500 }
    );
  }
}
