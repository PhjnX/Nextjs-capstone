"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/server/api/auth";
import { FaUser, FaLock } from "react-icons/fa";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { motion } from "framer-motion"; // Thư viện animation

export default function AuthPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const role = localStorage.getItem("role");
      if (role === "GV") {
        router.replace("/admin"); // Dùng replace thay vì push để tránh bị đẩy vào stack lịch sử
      }
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Vui lòng nhập đầy đủ tài khoản và mật khẩu.");
      return;
    }

    const result = await login(username, password);
    if (result.success) {
      localStorage.setItem("role", "GV");
      router.push("/admin");
    } else {
      setError(result.message || "Có lỗi xảy ra. Vui lòng thử lại!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-900 via-gray-800 to-black">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-gray-800 bg-opacity-90 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-700"
      >
        {/* Tiêu đề với icon vui nhộn */}
        <motion.h2
          className="text-3xl font-bold text-center text-white mb-6 flex items-center justify-center gap-2"
          whileHover={{ scale: 1.1, rotate: 3 }}
        >
          🔐 Admin Login 🚀
        </motion.h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleLogin}>
          {/* Tài khoản */}
          <div className="mb-4">
            <label className="block text-gray-300 font-semibold">
              Tài khoản
            </label>
            <div className="relative">
              <motion.span
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                whileHover={{ scale: 1.2, rotate: -5 }}
              >
                <FaUser size={18} />
              </motion.span>
              <input
                type="text"
                className="w-full p-3 pl-10 border rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Nhập tài khoản..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Mật khẩu */}
          <div className="mb-4">
            <label className="block text-gray-300 font-semibold">
              Mật khẩu
            </label>
            <div className="relative">
              <motion.span
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                whileHover={{ scale: 1.2, rotate: 5 }}
              >
                <FaLock size={18} />
              </motion.span>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-3 pl-10 border rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Nhập mật khẩu..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <motion.button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition"
                onClick={() => setShowPassword(!showPassword)}
                whileTap={{ scale: 0.9 }}
              >
                {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
              </motion.button>
            </div>
          </div>

          {/* Nút đăng nhập */}
          <motion.button
            type="submit"
            className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:opacity-90 transition-all duration-200 shadow-md flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🚀 Đăng nhập
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
