"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProjectManager from "@/components/admin/ProjectManager";
import CertificationManager from "@/components/admin/CertificationManager";

const DashboardPage = () => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(adminStatus);
    if (!adminStatus) {
      router.push("/admin/login");
    }
  }, [router]);

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#030014]">
        <p className="text-white">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030014] text-white p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => {
            localStorage.removeItem("isAdmin");
            router.push("/admin/login");
          }}
          className="px-4 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </header>
      <main className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <section className="bg-[#0c0c1b] p-6 rounded-lg">
          <ProjectManager />
        </section>
        <section className="bg-[#0c0c1b] p-6 rounded-lg">
          <CertificationManager />
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;
