"use client";
import React, { useEffect, useState } from "react";
import { Course } from "@/types/cart";
import Header from "../components/Header/header";
import { CourseList } from "@/types/courseList";
import { api } from "@/server/api/api";

const defaultImage =
  "https://media.daily.dev/image/upload/f_auto,q_auto/v1/posts/25fa2d9a027f1042600664a409ab97c2?_a=AQAEuj9";

function Cart() {
  const [courses, setCourses] = useState<Course[]>([]);

  const getCart = () => {
    const cartData = localStorage.getItem("cart");
    return cartData ? JSON.parse(cartData) : [];
  };

  useEffect(() => {
    setCourses(getCart());

    const handleStorageChange = () => {
      setCourses(getCart());
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleAddToCart = (newCourse: Course) => {
    const cartData = getCart();
    const existingCourse = cartData.find(
      (course: Course) => course.maKhoaHoc === newCourse.maKhoaHoc
    );
    if (existingCourse) {
      existingCourse.count = (existingCourse.count || 1) + 1;
    } else {
      newCourse.count = 1;
      cartData.push(newCourse);
    }

    localStorage.setItem("cart", JSON.stringify(cartData));
    setCourses(cartData);
    window.dispatchEvent(new Event("storage")); // Kích hoạt sự kiện storage
    console.log(cartData);
  };

  const handleDecreaseCount = (maKhoaHoc: string | number) => {
    const cartData = getCart();
    const existingCourse = cartData.find(
      (course: Course) => course.maKhoaHoc === String(maKhoaHoc)
    );
    if (existingCourse) {
      if (existingCourse.count && existingCourse.count > 1) {
        existingCourse.count -= 1;
      } else {
        const updatedCart = cartData.filter(
          (c: Course) => String(c.maKhoaHoc) !== String(maKhoaHoc)
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCourses(updatedCart);
        window.dispatchEvent(new Event("storage")); // Kích hoạt sự kiện storage
        return;
      }
    }
    localStorage.setItem("cart", JSON.stringify(cartData));
    setCourses(cartData);
    window.dispatchEvent(new Event("storage")); // Kích hoạt sự kiện storage
  };

  const totalCourses = courses.reduce(
    (acc, course) => acc + (course.count || 1),
    0
  );
  const totalPrice = totalCourses * 100000;

  const onSubmit = () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
      const payments = localStorage.getItem(`thanhToan_${userInfo.taiKhoan}`);
      const existingPayments = payments ? JSON.parse(payments) : [];
      const newPayments = [...existingPayments, ...courses];
      localStorage.setItem(
        `thanhToan_${userInfo.taiKhoan}`,
        JSON.stringify(newPayments)
      );

      // Xóa giỏ hàng sau khi thanh toán
      localStorage.removeItem("cart");
      setCourses([]);
      window.dispatchEvent(new Event("storage")); // Kích hoạt sự kiện storage khi thanh toán thành công
      alert("Thanh toán thành công!");
    } catch (error) {
      console.log("Lỗi khi thành toán", error);
    }
  };

  const [filteredCourses, setFilteredCourses] = useState<CourseList[]>([]);
  const [course, setCourse] = useState<CourseList[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const result = await api.get(
          "/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01"
        );
        setCourse(result.data);
        setFilteredCourses(result.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourses();
  }, []);

  const handleSearchCourse = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredCourses(course);
      return;
    }
    const filtered = course.filter((course) =>
      course.tenKhoaHoc.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  return (
    <>
      <Header onSearch={handleSearchCourse} />
      <div className="flex justify-center p-4 mt-20">
        <div className="w-2/3 bg-white p-4 shadow-lg rounded-lg">
          <h1 className="font-bold text-2xl m-3">Giỏ hàng</h1>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th>ID Course</th>
                <th className="pl-7">Image</th>
                <th>Course Name</th>
                <th>Count</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr
                  key={`${course.maKhoaHoc}-${index}`}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td>{course.maKhoaHoc}</td>
                  <td>
                    <img
                      src={course.hinhAnh || defaultImage}
                      alt={course.tenKhoaHoc}
                      width={100}
                      height={100}
                    />
                  </td>
                  <td>{course.tenKhoaHoc}</td>
                  <td className="pl-5">{course.count || 1}</td>
                  <td className="space-x-3">
                    <button
                      onClick={() => handleAddToCart(course)}
                      className="bg-green-600 text-white px-2 py-1"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleDecreaseCount(course.maKhoaHoc)}
                      className="bg-yellow-600 text-white px-2 py-1"
                    >
                      -
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-1/3 bg-gray-100 p-4 ml-4 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Thanh Toán</h2>
          <div className="mt-4">
            {courses.map((course, index) => (
              <div
                key={index}
                className="flex justify-between items-center mb-2"
              >
                <span>{course.tenKhoaHoc}</span>
                <span>x {course.count || 1}</span>
              </div>
            ))}
          </div>
          <p className="text-lg mb-2">
            Tổng tiền:{" "}
            <span className="font-bold">{totalPrice.toLocaleString()} VND</span>
          </p>
          <button
            onClick={() => {
              onSubmit();
            }}
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Thanh Toán
          </button>
        </div>
      </div>
    </>
  );
}

export default Cart;
