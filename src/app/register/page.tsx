"use client";
import { api } from "@/server/api/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UserInfo } from "@/types/userInfo";

function Register() {
  const [userRegister, setUserRegister] = useState<UserInfo>({
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    maLoaiNguoiDung: "HV",
    soDT: "",
    maNhom: "GP01",
    email: "",
    confirmPassword: "",
  });

  const router = useRouter();

  const [message, setMessage] = useState("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (userRegister.matKhau != userRegister.confirmPassword) {
      setMessage("Password không khớp!");
      return;
    }

    const { confirmPassword, ...userData } = userRegister;
    try {
      const result = await api.post("/QuanLyNguoiDung/DangKy", userData);
      setMessage("Đăng ký thành công! Chuyển hướng đến trang đăng nhập...");
      console.log(result.data);
      // chuyển hướng trang
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      setMessage("Đăng ký thất bại! ");
    }
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      {/* Video nền */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
        src="/background-register.mp4"
        autoPlay
        loop
        muted
      />

      {/* Form đăng ký */}
      <div className="relative bg-white bg-opacity-80 backdrop-blur-md p-8 rounded-lg shadow-lg max-w-4xl max-sm:max-w-lg mx-auto font-[sans-serif]">
        <div className="text-center mb-6">
          <h4 className="text-4xl font-extrabold text-dark-gray-900">
            Sign up
          </h4>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-600 text-sm mb-2 block">
                Fullname
              </label>
              <input
                type="text"
                onChange={(e) =>
                  setUserRegister({ ...userRegister, hoTen: e.target.value })
                }
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter your fullname"
              />
            </div>
            <div>
              <label className="text-gray-600 text-sm mb-2 block">
                Tài khoản
              </label>
              <input
                type="text"
                onChange={(e) =>
                  setUserRegister({ ...userRegister, taiKhoan: e.target.value })
                }
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="text-gray-600 text-sm mb-2 block">Email</label>
              <input
                type="text"
                onChange={(e) =>
                  setUserRegister({ ...userRegister, email: e.target.value })
                }
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="text-gray-600 text-sm mb-2 block">
                Số điện thoại
              </label>
              <input
                type="number"
                onChange={(e) =>
                  setUserRegister({ ...userRegister, soDT: e.target.value })
                }
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter mobile number"
              />
            </div>
            <div>
              <label className="text-gray-600 text-sm mb-2 block">
                Password
              </label>
              <input
                type="password"
                onChange={(e) =>
                  setUserRegister({ ...userRegister, matKhau: e.target.value })
                }
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter password"
              />
            </div>
            <div>
              <label className="text-gray-600 text-sm mb-2 block">
                Xác nhận mật khẩu
              </label>
              <input
                type="password"
                onChange={(e) =>
                  setUserRegister({
                    ...userRegister,
                    confirmPassword: e.target.value,
                  })
                }
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Confirm password"
              />
            </div>
          </div>
          <div className="mt-8">
            <button
              type="submit"
              className="mx-auto block py-3 px-8 text-lg font-semibold rounded-lg text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-lg transform hover:scale-105 transition duration-300"
            >
              Sign Up
            </button>
          </div>
          {message && <p className="text-red-700">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default Register;
