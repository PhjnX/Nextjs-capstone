import axios from "axios";
export const api = axios.create({
  baseURL: "https://elearningnew.cybersoft.edu.vn/api",
});
api.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  config.headers.TokenCybersoft =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3OCIsIkhldEhhblN0cmluZyI6IjI3LzA3LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc1MzU3NDQwMDAwMCIsIm5iZiI6MTcyNjA3NDAwMCwiZXhwIjoxNzUzNzIyMDAwfQ.BTmM2iB4rp2M5zBswdnAhImSAoSPeaxquN5mTgxFzaQ";

  try {
    const storedData = localStorage.getItem("listCourse");
    const accessToken = storedData ? JSON.parse(storedData)?.accessToken : null;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  } catch (error) {
    console.error("Lỗi khi lấy accessToken:", error);
  }

  return config;
});

export const searchCourse = async (tenKhoaHoc: string) => {
  try {
    const result = await api.get(
      `/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${tenKhoaHoc}`
    );
    return result.data.content;
  } catch (error) {
    console.error("Lỗi khi tìm kiếm khóa học:", error);
    return [];
  }
};
