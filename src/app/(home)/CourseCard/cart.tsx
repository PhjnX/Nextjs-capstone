"use client";

import { useRouter } from "next/navigation";

interface Course {
  maKhoaHoc: number | string;
  tenKhoaHoc: string;
  hinhAnh: string | null | undefined;
}

const defaultImage =
  "https://media.daily.dev/image/upload/f_auto,q_auto/v1/posts/25fa2d9a027f1042600664a409ab97c2?_a=AQAEuj9";

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const router = useRouter();

  const checkUserLogin = (action: string) => {
    const userData = localStorage.getItem("userInfo");

    if (!userData) {
      alert("Đăng nhập để tiếp tục!");
      router.push("/login");
      return;
    }

    if (action === "order") {
      alert(`Bạn đã đặt hàng khóa học: ${course.tenKhoaHoc}`);
    } else if (action === "cart") {
      let cart = JSON.parse(localStorage.getItem("cart") || "[]");
      cart.push(course);
      localStorage.setItem("cart", JSON.stringify(cart));

      // Cập nhật Header bằng sự kiện storage
      window.dispatchEvent(new Event("storage"));
      alert(`Bạn đã thêm khóa học ${course.tenKhoaHoc} vào giỏ hàng!`);
    }
  };
  return (
    <div className="flex justify-center">
      <div
        key={course.maKhoaHoc}
        className="w-full max-w-[300px] h-[450px] bg-white border border-gray-200 rounded-xl shadow-md dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between"
      >
        <div className="w-full h-48">
          <a href="#">
            <img
              src={course.hinhAnh || defaultImage}
              alt={course.tenKhoaHoc}
              width={250}
              height={150}
              onError={(e) => (e.currentTarget.src = defaultImage)}
              className="w-auto h-full object-cover rounded-t-xl"
            />
          </a>
        </div>
        <div className="p-5 flex flex-col  h-auto">
          <div>
            <a href="#">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1">
                {course.tenKhoaHoc}
              </h5>
            </a>

            <div className="flex items-center my-5">
              <svg
                className="w-4 h-4 text-yellow-300 ms-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 text-yellow-300 ms-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 text-yellow-300 ms-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 text-yellow-300 ms-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <span className="ml-2 mr-3">4.5</span>
              <span>(1,593)</span>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => {
                checkUserLogin("order");
              }}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 w-24 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Order
            </button>
            <button
              type="button"
              onClick={() => {
                checkUserLogin("cart");
              }}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 w-auto font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Thêm giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
