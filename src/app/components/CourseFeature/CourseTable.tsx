"use client";
import React from "react";
import { Table, Space, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { CourseList } from "@/types/courseList";

interface CourseTableProps {
  courses: CourseList[];
  loading: boolean;
  onEdit: (maKhoaHoc: string | number) => void;
  onDelete: (maKhoaHoc: string | number) => void;
}

const CourseTable: React.FC<CourseTableProps> = ({
  courses,
  loading,
  onEdit,
  onDelete,
}) => {
  const columns = [
    {
      title: "Mã khóa học",
      dataIndex: "maKhoaHoc",
      key: "maKhoaHoc",
    },
    {
      title: "Tên khóa học",
      dataIndex: "tenKhoaHoc",
      key: "tenKhoaHoc",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (src: string) => {
        if (!src) return "Không có hình";
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt="course-img"
            style={{ width: "80px", height: "50px", objectFit: "cover" }}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "";
              e.currentTarget.alt = "Không có hình";
              e.currentTarget.style.display = "none";
            }}
          />
        );
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "ngayTao",
      key: "ngayTao",
    },
    {
      title: "Tài khoản người tạo",
      dataIndex: "nguoiTao",
      key: "nguoiTao",
      render: (nguoiTao: CourseList["nguoiTao"]) => nguoiTao?.taiKhoan || "-",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: CourseList) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined style={{ color: "#fa8c16", fontSize: 18 }} />}
            onClick={() => onEdit(record.maKhoaHoc)}
          />
          <Button
            type="text"
            icon={<DeleteOutlined style={{ color: "#f5222d", fontSize: 18 }} />}
            onClick={() => onDelete(record.maKhoaHoc)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={courses}
      loading={loading}
      rowKey="maKhoaHoc"
    />
  );
};

export default CourseTable;
