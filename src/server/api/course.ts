import axios from "axios";

export type CourseData = {
  maKhoaHoc: string;
  biDanh: string;
  tenKhoaHoc: string;
  moTa: string;
  luotXem: number;
  danhGia: number;
  hinhAnh: string; 
  maNhom: string;
  ngayTao: string; 
  maDanhMucKhoaHoc: string;
  taiKhoanNguoiTao: string;
};

const API_URL = "https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc";
const CYBERSOFT_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3OCIsIkhldEhhblN0cmluZyI6IjI3LzA3LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc1MzU3NDQwMDAwMCIsIm5iZiI6MTcyNjA3NDAwMCwiZXhwIjoxNzUzNzIyMDAwfQ.BTmM2iB4rp2M5zBswdnAhImSAoSPeaxquN5mTgxFzaQ";

// Tạo instance axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    config.headers.TokenCybersoft = CYBERSOFT_API_KEY;
    return config;
  },
  (error) => Promise.reject(error)
);

export const getCourses = async () => {
  return api.get("/LayDanhSachKhoaHoc?MaNhom=GP01");
};

export const deleteCourse = async (maKhoaHoc: string) => {
  return api.delete(`/XoaKhoaHoc?maKhoaHoc=${maKhoaHoc}`);
};

export const addCourse = async (courseData: CourseData) => {
  return api.post("/ThemKhoaHoc", courseData);
};

export const updateCourse = async (courseData: CourseData) => {
  return api.put("/CapNhatKhoaHoc", courseData);
};

export const uploadCourseImage = async (file: File, tenKhoaHoc: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("tenKhoaHoc", tenKhoaHoc);

  return api.post("/UploadHinhAnhKhoaHoc", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
