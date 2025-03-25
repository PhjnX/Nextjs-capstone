import { api } from "@/server/api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserState {
  loading: boolean;
  data: any | null;
  error: any | null;
}

const storedUser =
  typeof window !== "undefined" ? localStorage.getItem("userInfo") : null;

const initialState: UserState = {
  loading: false,
  data: storedUser ? JSON.parse(storedUser) : null,
  error: null as string | null,
};

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (
    userLogin: { taiKhoan: string; matKhau: string },
    { rejectWithValue }
  ) => {
    try {
      const result = await api.post("/QuanLyNguoiDung/DangNhap", userLogin);
      const userDataLogin = result.data;

      if (typeof window !== "undefined") {
        localStorage.setItem("userInfo", JSON.stringify(userDataLogin));
      }
      return userDataLogin;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Đăng nhập thất bại");
    }
  }
);

const userLoginSlice = createSlice({
  name: "userLoginSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("userInfo", JSON.stringify(action.payload)); // Lưu vào localStorage
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      (state.loading = false), (state.data = action.payload);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      (state.loading = false), (state.error = action.payload);
    });
  },
});

export const { setUser } = userLoginSlice.actions;
export default userLoginSlice.reducer;
