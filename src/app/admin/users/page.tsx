"use client";
import React, { useEffect, useState } from "react";
import { Table, Tag, Space, Button, Input } from "antd";
import { getUsers, deleteUser } from "@/server/api/user";
import { useRouter } from "next/navigation";

interface User {
  key: string;
  taiKhoan: string;
  hoTen: string;
  email: string;
  soDT: string;
  maLoaiNguoiDung: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (error) {
      console.error("Lỗi lấy danh sách người dùng", error);
    }
    setLoading(false);
  };

  const handleDelete = async (taiKhoan: string) => {
    try {
      await deleteUser(taiKhoan);
      fetchUsers();
    } catch (error) {
      console.error("Lỗi xóa người dùng", error);
    }
  };

  const columns = [
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
      render: (_: any, record: User) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() =>
              router.push(`/admin/users/edit-user?tk=${record.taiKhoan}`)
            }
          >
            Sửa
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => handleDelete(record.taiKhoan)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Quản lý người dùng</h2>
      <Button
        type="primary"
        className="mb-4"
        onClick={() => router.push("/admin/users/add-user")}
      >
        Thêm người dùng
      </Button>
      <Table
        columns={columns}
        dataSource={users}
        loading={loading}
        rowKey="taiKhoan"
      />
    </div>
  );
};

export default UserList;
