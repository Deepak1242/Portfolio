"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // FIXME: This is a temporary and insecure authentication mechanism.
    // In a production environment, this should be replaced with a proper
    // authentication system (e.g., NextAuth.js, JWT, etc.).
    if (username === "admin" && password === "password") {
      localStorage.setItem("isAdmin", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#030014]">
      <div className="w-full max-w-md p-8 space-y-6 bg-[#0c0c1b] rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-white">Admin Login</h1>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-300"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-white bg-[#1a1a2e] border border-[#2A0E61] rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-white bg-[#1a1a2e] border border-[#2A0E61] rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
