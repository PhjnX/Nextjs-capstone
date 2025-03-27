import axios from "axios";

// Địa chỉ API chung
const API_URL = "https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung";

// TokenCybersoft cố định (nếu thay đổi, bạn có thể lưu vào .env)
const CYBERSOFT_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3OCIsIkhldEhhblN0cmluZyI6IjI3LzA3LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc1MzU3NDQwMDAwMCIsIm5iZiI6MTcyNjA3NDAwMCwiZXhwIjoxNzUzNzIyMDAwfQ.BTmM2iB4rp2M5zBswdnAhImSAoSPeaxquN5mTgxFzaQ";

// Tạo instance axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Interceptor này sẽ tự động gắn:
 * - Authorization: Bearer <accessToken> (lấy từ localStorage)
 * - TokenCybersoft: <CYBERSOFT_API_KEY>
 * cho mọi request (GET, POST, DELETE, v.v.)
 */
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    // Kiểm tra xem có token không
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      console.log(">>> Authorization header:", config.headers.Authorization);
    } else {
      console.warn(">>> Access token not found in localStorage");
    }

    // Luôn gắn TokenCybersoft
    config.headers.TokenCybersoft = CYBERSOFT_API_KEY;
    console.log(">>> TokenCybersoft header:", config.headers.TokenCybersoft);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Hàm gọi API lấy danh sách người dùng
export const getUsers = async () => {
  return api.get(`/LayDanhSachNguoiDung?MaNhom=GP01`);
};

// Hàm thêm người dùng
export const addUser = async (data: any) => {
  return api.post(`/ThemNguoiDung`, data);
};

// Hàm cập nhật người dùng
export const updateUser = async (data: any) => {
  return api.put(`/CapNhatThongTinNguoiDung`, data);
};

// Hàm xóa người dùng
export const deleteUser = async (taiKhoan: string) => {
  return api.delete(`/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
};

// Hàm tìm kiếm người dùng
export const searchUser = async (tuKhoa: string) => {
  return api.get(`/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${tuKhoa}`);
};

export const getMyInfor = async ( accessToken: string ) => {
   return api.post("ThongTinTaiKhoan", accessToken)
}