// app/admin/page.tsx
"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Tháng 1", doanhThu: 4000, chiPhi: 2400 },
  { name: "Tháng 2", doanhThu: 3000, chiPhi: 1398 },
  { name: "Tháng 3", doanhThu: 2000, chiPhi: 9800 },
  { name: "Tháng 4", doanhThu: 2780, chiPhi: 3908 },
  { name: "Tháng 5", doanhThu: 1890, chiPhi: 4800 },
  { name: "Tháng 6", doanhThu: 2390, chiPhi: 3800 },
  { name: "Tháng 7", doanhThu: 3490, chiPhi: 4300 },
];

export default function AdminDashboardPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Chào mừng bạn đến với trang quản trị!</h1>
      <p>Đây là nội dung của trang Dashboard.</p>
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="doanhThu" fill="#8884d8" name="Doanh thu" />
            <Bar dataKey="chiPhi" fill="#82ca9d" name="Chi phí" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
