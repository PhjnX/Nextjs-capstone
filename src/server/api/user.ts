import axios from "axios";

const API_URL = "https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3OCIsIkhldEhhblN0cmluZyI6IjI3LzA3LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc1MzU3NDQwMDAwMCIsIm5iZiI6MTcyNjA3NDAwMCwiZXhwIjoxNzUzNzIyMDAwfQ.BTmM2iB4rp2M5zBswdnAhImSAoSPeaxquN5mTgxFzaQ"; // Lưu ý: Token cần lấy từ localStorage hoặc Redux store

const api = axios.create({
  baseURL: API_URL,
  headers: {
    TokenCybersoft: token, // Đổi từ Authorization sang TokenCybersoft
    "Content-Type": "application/json",
  },
});

export const getUsers = async () => {
  return api.get(`/LayDanhSachNguoiDung?MaNhom=GP01`);
};

export const addUser = async (data: any) => {
  return api.post(`/ThemNguoiDung`, data);
};

export const updateUser = async (data: any) => {
  return api.put(`/CapNhatThongTinNguoiDung`, data);
};

export const deleteUser = async (taiKhoan: string) => {
  return api.delete(`/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
};

export const searchUser = async (tuKhoa: string) => {
  return api.get(`/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${tuKhoa}`);
};
