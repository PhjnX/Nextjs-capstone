"use client";
import React, { useEffect, useState } from "react";
import { Table, Tag, Space, Button, Input } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { getUsers, deleteUser, searchUser } from "@/server/api/user";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, []);

  // Lấy toàn bộ danh sách người dùng
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (error) {
      console.error("Lỗi lấy danh sách người dùng", error);
      toast.error("❌ Lỗi khi lấy danh sách người dùng!");
    }
    setLoading(false);
  };

  const handleDelete = async (taiKhoan: string) => {
    setLoading(true);
    try {
      await deleteUser(taiKhoan);
      toast.success(`✅ Xóa người dùng ${taiKhoan} thành công!`, {
        position: "top-right",
        autoClose: 3000,
      });
      fetchUsers();
    } catch (error: any) {
      console.error("Lỗi xóa người dùng:", error);

      // Kiểm tra nếu API có trả về thông tin chi tiết
      const errorMessage =
        error.response?.data ||
        error.response?.data?.message ||
        "Xóa người dùng thất bại.";

      if (typeof errorMessage === "object") {
        toast.error(`❌ ${JSON.stringify(errorMessage)}`, {
          position: "top-right",
        });
      } else {
        toast.error(`❌ ${errorMessage}`, { position: "top-right" });
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      performSearch();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  const performSearch = async () => {
    if (!searchText.trim()) {
      fetchUsers();
      return;
    }
    setLoading(true);
    try {
      const res = await searchUser(searchText);
      const filteredUsers = res.data.filter((user: User) =>
        user.hoTen.toLowerCase().includes(searchText.toLowerCase())
      );
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Lỗi tìm kiếm người dùng", error);
      toast.error("❌ Lỗi khi tìm kiếm người dùng!");
    }
    setLoading(false);
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
            type="text"
            icon={<EditOutlined style={{ color: "#fa8c16", fontSize: 18 }} />}
            onClick={() =>
              router.push(`/admin/users/edit-user?tk=${record.taiKhoan}`)
            }
          />
          <Button
            type="text"
            icon={<DeleteOutlined style={{ color: "#f5222d", fontSize: 18 }} />}
            onClick={() => handleDelete(record.taiKhoan)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={() => router.push("/admin/users/add-user")}
        >
          Thêm người dùng
        </Button>
        <Input
          placeholder="Nhập tên người dùng"
          allowClear
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300 }}
          suffix={<SearchOutlined style={{ color: "#1890ff" }} />}
        />
      </Space>
      <Table
        columns={columns}
        dataSource={users}
        loading={loading}
        rowKey="taiKhoan"
      />
    </div>
  );
}
