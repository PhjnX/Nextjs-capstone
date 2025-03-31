"use client";
import React, { useEffect, useState } from "react";
import { Button, Space } from "antd";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getUsers, deleteUser } from "@/server/api/user";
import { User } from "@/types/user";
import UserTable from "@/app/components/UserFeature/UserTable";
import SearchInput from "@/app/components/UserFeature/UserSearch";
import EditUserModal from "@/app/components/UserFeature/EditUserModal"; // Import modal

const removeDiacritics = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export default function UserList() {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editInitialValues, setEditInitialValues] = useState<Partial<any>>({});
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getUsers();
      setAllUsers(res.data);
      setUsers(res.data);
    } catch (error) {
      console.error("Lỗi lấy danh sách người dùng", error);
      toast.error("❌ Lỗi khi lấy danh sách người dùng!");
    }
    setLoading(false);
  };

  // Xóa user
  const handleDelete = async (taiKhoan: string) => {
    setLoading(true);
    try {
      await deleteUser(taiKhoan);
      toast.success(`✅ Xóa người dùng ${taiKhoan} thành công!`, {
        position: "top-right",
        autoClose: 3000,
      });
      fetchUsers();
    } catch (error: unknown) {
      console.error("Lỗi xóa người dùng:", error);
      let errorMessage = "Xóa người dùng thất bại.";
      if (error && typeof error === "object" && "response" in error) {
        const err = error as { response?: { data?: any; message?: string } };
        errorMessage =
          err.response?.data || err.response?.message || errorMessage;
      }
      toast.error(`❌ ${errorMessage}`, { position: "top-right" });
    }
    setLoading(false);
  };

  const handleEdit = (taiKhoan: string) => {
    // Tìm user dựa vào taiKhoan, sau đó set làm initialValues cho modal
    const userToEdit = allUsers.find((user) => user.taiKhoan === taiKhoan);
    if (userToEdit) {
      // Giả sử API updateUser yêu cầu các trường tương tự như addUserForm
      setEditInitialValues({
        taiKhoan: userToEdit.taiKhoan,
        // Nếu cập nhật mật khẩu không cần hiển thị, có thể để trống hoặc bỏ qua
        matKhau: "",
        hoTen: userToEdit.hoTen,
        soDT: userToEdit.soDt,
        maLoaiNguoiDung: userToEdit.maLoaiNguoiDung,
        maNhom: "GP01", // hoặc lấy từ user nếu có
        email: userToEdit.email,
      });
      setEditModalVisible(true);
    }
  };

  const handleSearch = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) {
      setUsers(allUsers);
      return;
    }
    const normalizedSearch = removeDiacritics(trimmed).toLowerCase();
    const filtered = allUsers.filter((user) => {
      const normalizedName = removeDiacritics(user.hoTen).toLowerCase();
      return normalizedName.includes(normalizedSearch);
    });
    setUsers(filtered);
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
      </Space>

      <UserTable
        users={users}
        loading={loading}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      {/* Edit modal */}
      <EditUserModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        initialValues={editInitialValues}
        onUpdate={fetchUsers}
      />
    </div>
  );
}
