"use client";
import React, { useEffect, useState } from "react";
import { Button, Space, Select } from "antd";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getUsers, deleteUser } from "@/server/api/user";
import { User } from "@/types/user";
import UserTable from "@/app/components/UserFeature/UserTable";
import SearchInput from "@/app/components/UserFeature/UserSearch";
import EditUserModal from "@/app/components/UserFeature/EditUserModal";
import GhiDanhModal from "@/app/components/UserFeature/GhiDanhModal";

const removeDiacritics = (str: string) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export default function UserList() {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editInitialValues, setEditInitialValues] = useState<Partial<any>>({});
  const [filterRole, setFilterRole] = useState("ALL");
  // Sử dụng tài khoản được chọn để quản lý ghi danh (HV)
  const [ghiDanhModalVisible, setGhiDanhModalVisible] = useState(false);
  const [selectedTaiKhoan, setSelectedTaiKhoan] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, []);

  // Lọc theo role
  useEffect(() => {
    const filteredUsers =
      filterRole === "ALL"
        ? allUsers
        : allUsers.filter((u) => u.maLoaiNguoiDung === filterRole);
    setUsers(filteredUsers);
  }, [filterRole, allUsers]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getUsers();
      setAllUsers(res.data); // Chỉ set allUsers, không lọc ở đây
    } catch (error) {
      toast.error("❌ Lỗi khi lấy danh sách người dùng!");
    }
    setLoading(false);
  };

  const handleDelete = async (taiKhoan: string) => {
    setLoading(true);
    try {
      await deleteUser(taiKhoan);
      toast.success(`✅ Xóa người dùng ${taiKhoan} thành công!`);
      fetchUsers(); // Load lại danh sách
    } catch (error: any) {
      console.error("Lỗi khi xóa người dùng:", error);

      // Lấy thông điệp chi tiết từ API nếu có
      const errorMessage =
        error?.response?.data || // Trường hợp trả về plain text
        error?.response?.data?.message || // Trường hợp trả về dạng object { message: "..." }
        error?.message ||
        "Đã xảy ra lỗi không xác định.";

      toast.error(`❌ Xóa người dùng thất bại: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (taiKhoan: string) => {
    const userToEdit = allUsers.find((user) => user.taiKhoan === taiKhoan);
    if (userToEdit) {
      setEditInitialValues({
        taiKhoan: userToEdit.taiKhoan,
        matKhau: "",
        hoTen: userToEdit.hoTen,
        soDT: userToEdit.soDt,
        maLoaiNguoiDung: userToEdit.maLoaiNguoiDung,
        maNhom: "GP01",
        email: userToEdit.email,
      });
      setEditModalVisible(true);
    }
  };

  const handleSearch = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) {
      // Reset theo role
      const filtered =
        filterRole === "ALL"
          ? allUsers
          : allUsers.filter((u) => u.maLoaiNguoiDung === filterRole);
      setUsers(filtered);
      return;
    }

    const normalizedSearch = removeDiacritics(trimmed).toLowerCase();
    const filtered = allUsers.filter((user) => {
      const normalizedName = removeDiacritics(user.hoTen).toLowerCase();
      return normalizedName.includes(normalizedSearch);
    });

    setUsers(filtered);
  };

  const handleFilterRole = (role: string) => {
    setFilterRole(role);
  };

  // Khi click icon ghi danh trên bảng, mở modal và truyền tài khoản của user đó
  const handleGhiDanh = (taiKhoan: string) => {
    setSelectedTaiKhoan(taiKhoan);
    setGhiDanhModalVisible(true);
  };

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={() => router.push("/admin/users/add-user")}
        >
          Thêm người dùng
        </Button>
        <SearchInput onSearch={handleSearch} delay={500} />
        <Select
          value={filterRole}
          style={{ width: 150 }}
          onChange={handleFilterRole}
          options={[
            { value: "ALL", label: "Tất cả" },
            { value: "GV", label: "Giảng viên" },
            { value: "HV", label: "Học viên" },
          ]}
        />
      </Space>

      <UserTable
        users={users}
        loading={loading}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onGhiDanh={handleGhiDanh} // Truyền sự kiện ghi danh (sẽ nhận tài khoản HV)
      />

      <EditUserModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        initialValues={editInitialValues}
        onUpdate={fetchUsers}
      />

      {/* Modal ghi danh dựa theo tài khoản người dùng */}
      {selectedTaiKhoan && (
        <GhiDanhModal
          visible={ghiDanhModalVisible}
          taiKhoan={selectedTaiKhoan}
          onClose={() => {
            setGhiDanhModalVisible(false);
            setSelectedTaiKhoan(null);
          }}
        />
      )}
    </div>
  );
}
