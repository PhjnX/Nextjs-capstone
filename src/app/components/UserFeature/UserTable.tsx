"use client";
import React from "react";
import { Table, Tag, Space, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { User } from "@/types/user";

interface UserTableProps {
  users: User[];
  loading: boolean;
  onDelete: (taiKhoan: string) => void;
  onEdit: (taiKhoan: string) => void;
}

export default function UserTable({
  users,
  loading,
  onDelete,
  onEdit,
}: UserTableProps) {
  const columns: ColumnsType<User> = [
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDt",
      key: "soDt",
    },
    {
      title: "Loại người dùng",
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
      render: (text: string) => (
        <Tag color={text === "GV" ? "geekblue" : "green"}>{text}</Tag>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_text, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined style={{ color: "#fa8c16", fontSize: 18 }} />}
            onClick={() => onEdit(record.taiKhoan)}
          />
          <Button
            type="text"
            icon={<DeleteOutlined style={{ color: "#f5222d", fontSize: 18 }} />}
            onClick={() => onDelete(record.taiKhoan)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Table<User>
      columns={columns}
      dataSource={users}
      loading={loading}
      rowKey="taiKhoan"
    />
  );
}
