// File: /app/courses/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Space, Button } from "antd";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCourses, deleteCourse } from "@/server/api/course";
import type { CourseList } from "@/types/courseList";
import CourseTable from "@/app/components/CourseFeature/CourseTable";
import CourseSearch from "@/app/components/CourseFeature/CourseSearch";
import EditCourseModal from "@/app/components/CourseFeature/EditCourseModal";
import UserEnrollmentModal from "@/app/components/CourseFeature/UserEnrollmentModal";

// Hàm bỏ dấu, phục vụ tìm kiếm
const removeDiacritics = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export default function CourseListPage() {
  const [allCourses, setAllCourses] = useState<CourseList[]>([]);
  const [courses, setCourses] = useState<CourseList[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<CourseList | null>(null);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isEnrollmentModalVisible, setEnrollmentModalVisible] = useState(false);
  const [selectedCourseEnrollment, setSelectedCourseEnrollment] =
    useState<string>("");

  const router = useRouter();

  // Lấy danh sách khóa học khi mount
  useEffect(() => {
    fetchCourses();
  }, []);

  // Gọi API lấy danh sách khóa học
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await getCourses();
      setAllCourses(res.data);
      setCourses(res.data);
    } catch (error) {
      console.error("Lỗi lấy danh sách khóa học", error);
      toast.error("❌ Lỗi khi lấy danh sách khóa học!");
    }
    setLoading(false);
  };

  // Xóa khóa học
  const handleDelete = async (maKhoaHoc: string | number) => {
    setLoading(true);
    try {
      await deleteCourse(String(maKhoaHoc));
      toast.success(`✅ Xóa khóa học ${maKhoaHoc} thành công!`, {
        position: "top-right",
        autoClose: 3000,
      });
      fetchCourses();
    } catch (error: unknown) {
      console.error("Lỗi xóa khóa học:", error);
      let errorMessage = "Xóa khóa học thất bại.";
      if (error && typeof error === "object" && "response" in error) {
        const err = error as { response?: { data?: any; message?: string } };
        errorMessage =
          err.response?.data || err.response?.message || errorMessage;
      }
      toast.error(`❌ ${errorMessage}`, { position: "top-right" });
    }
    setLoading(false);
  };

  // Sửa khóa học – mở modal với dữ liệu của khoá học
  const handleEdit = (maKhoaHoc: string | number) => {
    const courseToEdit = courses.find(
      (course) => course.maKhoaHoc === maKhoaHoc
    );
    if (courseToEdit) {
      setSelectedCourse(courseToEdit);
      setEditModalVisible(true);
    }
  };

  // Mở modal quản lý ghi danh cho khóa học
  const handleManageEnrollment = (maKhoaHoc: string | number) => {
    setSelectedCourseEnrollment(String(maKhoaHoc));
    setEnrollmentModalVisible(true);
  };

  // Tìm kiếm cục bộ
  const handleSearch = (value: string) => {
    setSearchText(value);
    const trimmed = value.trim();
    if (!trimmed) {
      setCourses(allCourses);
      return;
    }
    const normalizedSearch = removeDiacritics(trimmed).toLowerCase();
    const filtered = allCourses.filter((course) => {
      const normalizedName = removeDiacritics(course.tenKhoaHoc).toLowerCase();
      return normalizedName.includes(normalizedSearch);
    });
    setCourses(filtered);
  };

  return (
    <>
      <div>
        {/* Thanh công cụ */}
        <Space style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            onClick={() => router.push("/admin/courses/add-course")}
          >
            Thêm khóa học
          </Button>
          <CourseSearch searchText={searchText} onSearch={handleSearch} />
        </Space>

        {/* Bảng hiển thị */}
        <CourseTable
          courses={courses}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onManageEnrollment={handleManageEnrollment}
        />
      </div>

      {/* Modal chỉnh sửa khóa học */}
      <EditCourseModal
        visible={isEditModalVisible}
        course={selectedCourse}
        onCancel={() => setEditModalVisible(false)}
        onUpdated={fetchCourses}
      />

      {/* Modal quản lý ghi danh */}
      <UserEnrollmentModal
        visible={isEnrollmentModalVisible}
        maKhoaHoc={selectedCourseEnrollment}
        onCancel={() => setEnrollmentModalVisible(false)}
      />
    </>
  );
}
