"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  postDanhSachHocVienKhoaHoc,
  postHocVienChoXetDuyet,
  postLayDanhSachKhoaHocDaXetDuyet,
  postKhoaHocChoXetDuyet,
} from "@/server/api/user";
import { getCourses } from "@/server/api/course";

const COLORS = ["#34d399", "#f97316"]; // xanh lá, cam

export default function AdminDashboardPage() {
  const [chartData, setChartData] = useState<any[]>([]);
  const [approvedCourses, setApprovedCourses] = useState<number>(0);
  const [pendingCourses, setPendingCourses] = useState<number>(0);
  const [totalApprovedStudents, setTotalApprovedStudents] = useState<number>(0);
  const [totalPendingStudents, setTotalPendingStudents] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseRes = await getCourses();
        const courses = courseRes.data;
        const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

        const myCourses = courses.filter(
          (c: any) => c.taiKhoanNguoiTao === currentUser.taiKhoan
        );

        let approvedStudentCount = 0;
        let pendingStudentCount = 0;

        const chartPromises = myCourses.map(async (course: any) => {
          const approvedRes = await postDanhSachHocVienKhoaHoc(
            course.maKhoaHoc
          );
          const pendingRes = await postHocVienChoXetDuyet(course.maKhoaHoc);

          approvedStudentCount += approvedRes.data.length;
          pendingStudentCount += pendingRes.data.length;

          return {
            name: course.tenKhoaHoc,
            DaDay: approvedRes.data.length,
            ChoDuyet: pendingRes.data.length,
          };
        });

        const chartResult = await Promise.all(chartPromises);
        setChartData(chartResult);
        setTotalApprovedStudents(approvedStudentCount);
        setTotalPendingStudents(pendingStudentCount);

        const approvedRes = await postLayDanhSachKhoaHocDaXetDuyet(
          currentUser.taiKhoan
        );
        const pendingRes = await postKhoaHocChoXetDuyet(currentUser.taiKhoan);
        setApprovedCourses(approvedRes.data.length);
        setPendingCourses(pendingRes.data.length);
      } catch (err) {
        console.error("Lỗi khi load dashboard:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        📊 Chào mừng bạn đến với trang quản trị!
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white">
        <Card
          color="blue-500"
          title="Tổng số lớp học"
          value={chartData.length}
        />
        <Card
          color="green-500"
          title="Lớp của bạn (đã duyệt)"
          value={approvedCourses}
        />
        <Card
          color="orange-500"
          title="Học sinh đã dạy"
          value={totalApprovedStudents}
        />
        <Card
          color="purple-500"
          title="Học sinh chờ duyệt"
          value={totalPendingStudents}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Biểu đồ cột */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">
            Học viên theo từng khóa học
          </h2>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="DaDay" fill="#34d399" name="Đã dạy" />
                <Bar dataKey="ChoDuyet" fill="#f97316" name="Chờ duyệt" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Biểu đồ tròn */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Tỷ lệ học sinh</h2>
          <div className="flex justify-center items-center h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: "Đã dạy", value: totalApprovedStudents },
                    { name: "Chờ duyệt", value: totalPendingStudents },
                  ]}
                  dataKey="value"
                  outerRadius={100}
                  label
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({
  color,
  title,
  value,
}: {
  color: string;
  title: string;
  value: number;
}) {
  return (
    <div className={`bg-${color} p-4 rounded-xl shadow-md`}>
      <h2 className="text-sm font-medium">{title}</h2>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
