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

// Interceptor tự động gắn token
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      console.log(">>> Authorization header:", config.headers.Authorization);
    } else {
      console.warn(">>> Access token not found in localStorage");
    }

    config.headers.TokenCybersoft = CYBERSOFT_API_KEY;
    console.log(">>> TokenCybersoft header:", config.headers.TokenCybersoft);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// === APIs người dùng ===
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

export const getMyInfor = async (accessToken: string) => {
  return api.post("ThongTinTaiKhoan", { accessToken });
};

// === Ghi danh theo KHÓA HỌC ===
export const postNguoiDungChuaGhiDanhKhoaHoc = async (maKhoaHoc: string) => {
  return api.post(`/LayDanhSachNguoiDungChuaGhiDanh`, {
    MaKhoaHoc: maKhoaHoc,
  });
};

export const postDanhSachHocVienKhoaHoc = async (maKhoaHoc: string) => {
  return api.post(`/LayDanhSachHocVienKhoaHoc`, {
    MaKhoaHoc: maKhoaHoc,
  });
};

export const postHocVienChoXetDuyet = async (maKhoaHoc: string) => {
  return api.post(`/LayDanhSachHocVienChoXetDuyet`, {
    MaKhoaHoc: maKhoaHoc,
  });
};

// === Ghi danh theo NGƯỜI DÙNG ===
export const postNguoiDungChuaGhiDanhHV = async (
  maKhoaHoc: string,
  taiKhoan: string
) => {
  return api.post(`/LayDanhSachNguoiDungChuaGhiDanh?taiKhoan=${taiKhoan}`, {
    MaKhoaHoc: maKhoaHoc,
  });
};

export const postLayDanhSachKhoaHocDaXetDuyet = async (taiKhoan: string) => {
  return api.post(`/LayDanhSachKhoaHocDaXetDuyet`, {
    TaiKhoan: taiKhoan,
  });
};

export const postKhoaHocChoXetDuyet = async (taiKhoan: string) => {
  return api.post(`/LayDanhSachKhoaHocChoXetDuyet`, {
    TaiKhoan: taiKhoan,
  });
};
