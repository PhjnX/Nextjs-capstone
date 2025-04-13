"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

// Import FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";

function Header({ onSearch }: { onSearch: any }) {
  const [searchCourse, setSearchCourse] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadUser = () => {
      const userData = localStorage.getItem("userInfo");
      if (userData) {
        try {
          setUser(JSON.parse(userData)); // Lưu thông tin user vào state
        } catch (error) {
          console.error("Lỗi khi parse JSON:", error);
          localStorage.removeItem("userInfo");
        }
      } else {
        setUser(null);
      }
    };

    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(
        cart.reduce((acc: number, course: any) => acc + (course.count || 1), 0)
      );
    };

    loadUser();
    updateCartCount();

    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    router.push("/");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearchChange = (e: any) => {
    setSearchCourse(e.target.value);
    onSearch(e.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 shadow-md">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {/* Logo và tên */}
        <Link href="/" className="flex items-center space-x-3">
          <img
            src="./logo_image.jpg"
            className="h-10 w-10 rounded-full object-cover"
            alt="IT Learning Logo"
          />
          <span className="text-2xl font-bold text-gray-800 dark:text-white tracking-tight">
            IT Learning
          </span>
        </Link>

        {/* Thanh tìm kiếm và danh mục */}
        <div className="flex-1 flex items-center justify-start space-x-4 mx-6">
          <div className="relative group">
            <button
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200"
              onClick={toggleDropdown}
            >
              <span className="text-lg">☰</span>
              <span className="text-sm font-medium">Danh mục khóa học</span>
            </button>
            {/* Dropdown */}
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 visible  transition-opacity duration-200 z-50">
                <ul className="py-2 text-gray-700 dark:text-gray-200">
                  <li>
                    <Link
                      href="/python"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                      Python
                    </Link>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                      C++
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                      Front-end
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                      Back-end
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm khóa học..."
            value={searchCourse}
            onChange={handleSearchChange}
            className="w-full max-w-2xl px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>

        {/* Hiển thị user và giỏ hàng */}
        {user ? (
          <div className="flex items-center space-x-4 relative">
            <Link
              href="/cart"
              className="px-4 mx-4 py-2 bg-green-600 text-white font-medium text-sm rounded-lg hover:bg-green-700 transition duration-200"
            >
              🛒 Giỏ hàng
              {cartCount > 0 && <span className="pl-1">[{cartCount}]</span>}
            </Link>
            <div className="relative" ref={userMenuRef}>
              <button
                className="text-gray-800 dark:text-white font-medium cursor-pointer px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <FontAwesomeIcon
                  icon={faUserTie}
                  className="text-gray-800 dark:text-white text-xl mr-2"
                />
                Xin chào, {user.taiKhoan}
              </button>

              {/* Dropdown menu user */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg border rounded-lg p-2 z-50">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md transition duration-200"
                  >
                    Thông tin cá nhân
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 rounded-md transition duration-200"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Link
              href="/login"
              type="button"
              className="px-5 py-2.5 bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-gray-900 transition duration-200"
            >
              Đăng nhập
            </Link>
            <Link
              href="/register"
              type="button"
              className="px-5 py-2.5 bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-gray-900 transition duration-200"
            >
              Đăng ký
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;
