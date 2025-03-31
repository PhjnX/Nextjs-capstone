import axios from "axios";

const LOGIN_URL =
  "https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap";
const CYBERSOFT_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3OCIsIkhldEhhblN0cmluZyI6IjI3LzA3LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc1MzU3NDQwMDAwMCIsIm5iZiI6MTcyNjA3NDAwMCwiZXhwIjoxNzUzNzIyMDAwfQ.BTmM2iB4rp2M5zBswdnAhImSAoSPeaxquN5mTgxFzaQ";

export async function login(username: string, password: string) {
  try {
    const response = await axios.post(
      LOGIN_URL,
      {
        taiKhoan: username,
        matKhau: password,
      },
      {
        headers: {
          TokenCybersoft: CYBERSOFT_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Login response:", response.data);

    const userData = response.data;
    const accessToken = userData?.accessToken; 

    if (userData?.maLoaiNguoiDung === "GV") {
      localStorage.setItem("role", "GV");
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }
      return { success: true, role: "GV" };
    } else {
      return { success: false, message: "Bạn không có quyền truy cập admin." };
    }
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "Sai tài khoản hoặc mật khẩu!" };
  }
}
