"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { loginUser } from "@/app/login/loginSlice";
import { RootState, useAppDispatch } from "@/app/store";

export default function LoginPage() {
  const [userLogin, setUserLogin] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.userLogin.data);
  const loading = useSelector((state: RootState) => state.userLogin.loading);
  const error = useSelector((state: RootState) => state.userLogin.error);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(loginUser(userLogin)).unwrap();
      alert("Đăng nhập thành công!");
      router.push("/");
    } catch (error) {
      return error;
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="bg-white rounded-lg">
      <div className="container flex flex-col mx-auto bg-white rounded-lg my-5">
        <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
          <div className="flex items-center justify-center w-full lg:p-12">
            <div className="flex items-center xl:p-10">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl"
              >
                <h3 className="mb-3 text-4xl font-extrabold text-dark-gray-900">
                  Sign In
                </h3>
                <p className="mb-4 text-gray-700">
                  Enter your email and password
                </p>
                <button className="flex items-center justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-gray-900 bg-gray-300 hover:bg-gray-400 focus:ring-4 focus:ring-gray-300">
                  <img
                    className="h-5 mr-2"
                    src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                    alt=""
                  />
                  Sign in with Google
                </button>
                <div className="flex items-center mb-3">
                  <hr className="h-0 border-b border-solid border-gray-500 grow" />
                  <p className="mx-4 text-gray-600">or</p>
                  <hr className="h-0 border-b border-solid border-gray-500 grow" />
                </div>
                <label
                  htmlFor="email"
                  className="mb-2 text-sm text-start text-gray-900"
                >
                  Username*
                </label>
                <input
                  id="email"
                  type="text"
                  name="taiKhoan"
                  onChange={handleOnChange}
                  placeholder="username"
                  className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-gray-400 mb-7 placeholder:text-gray-700 bg-gray-200 text-dark-gray-900 rounded-2xl"
                />
                <label
                  htmlFor="password"
                  className="mb-2 text-sm text-start text-gray-900"
                >
                  Password*
                </label>
                <input
                  id="password"
                  type="password"
                  name="matKhau"
                  onChange={handleOnChange}
                  placeholder="Enter a password"
                  className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-gray-400 placeholder:text-gray-700 bg-gray-200 text-dark-gray-900 rounded-2xl"
                />

                <div className="flex flex-row justify-between mb-4">
                  <label className="relative inline-flex items-center mr-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      defaultChecked
                      defaultValue=""
                      className="sr-only peer"
                    />
                    <div className="w-5 h-5 bg-white border-2 rounded-sm border-gray-500 peer peer-checked:border-0 peer-checked:bg-purple-500">
                      <img
                        className=""
                        src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/icons/check.png"
                        alt="tick"
                      />
                    </div>
                    <span className="ml-3 text-sm font-normal text-gray-900">
                      Keep me logged in
                    </span>
                  </label>
                  <a
                    onClick={() =>
                      console.log("Chức năng quên mật khẩu chưa có")
                    }
                    className="mr-4 text-sm font-medium text-purple-500"
                  >
                    Forget password?
                  </a>
                </div>
                {error && <p className="text-red-500 mb-4 mt-0">{error}</p>}
                <button
                  type="submit"
                  className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-600 focus:ring-4 focus:ring-purple-100 bg-purple-500"
                  disabled={loading}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
                <p className="text-sm leading-relaxed text-gray-900">
                  Not registered yet?
                  <Link href="/register" className="font-bold text-gray-700">
                    Create an Account
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap my-5">
        <div className="w-full max-w-full sm:w-3/4 mx-auto text-center">
          <p className="text-sm text-slate-500 py-1">
            Tailwind CSS Component from{" "}
            <a
              href="https://www.loopple.com/theme/motion-landing-library?ref=tailwindcomponents"
              className="text-slate-700 hover:text-slate-900"
              target="_blank"
            >
              Motion Landing Library
            </a>{" "}
            by{" "}
            <a
              href="https://www.loopple.com"
              className="text-slate-700 hover:text-slate-900"
              target="_blank"
            >
              Loopple Builder
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
