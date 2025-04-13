// utils/logout.ts

export const logout = () => {
  // Xóa các thông tin cần thiết khi đăng xuất
  localStorage.removeItem("maLoaiNguoiDung");
  localStorage.removeItem("role");
  localStorage.removeItem("accessToken"); // nếu bạn lưu access token ở đây
  // Nếu cần thiết có thể xóa các key khác
};
