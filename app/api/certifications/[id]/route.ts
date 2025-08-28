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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const certificationId = parseInt(params.id, 10);
    const updatedCertificationData = await request.json();
    let certifications = readCertificationsFromFile();
    const certIndex = certifications.findIndex(
      (c: any) => c.id === certificationId
    );

    if (certIndex === -1) {
      return NextResponse.json(
        { message: "Certification not found" },
        { status: 404 }
      );
    }

    certifications[certIndex] = {
      ...certifications[certIndex],
      ...updatedCertificationData,
    };
    writeCertificationsToFile(certifications);

    return NextResponse.json(certifications[certIndex]);
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating certification" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const certificationId = parseInt(params.id, 10);
    let certifications = readCertificationsFromFile();
    const filteredCertifications = certifications.filter(
      (c: any) => c.id !== certificationId
    );

    if (certifications.length === filteredCertifications.length) {
      return NextResponse.json(
        { message: "Certification not found" },
        { status: 404 }
      );
    }

    writeCertificationsToFile(filteredCertifications);

    return NextResponse.json({ message: "Certification deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting certification" },
      { status: 500 }
    );
  }
}
