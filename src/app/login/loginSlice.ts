import { api } from "@/server/api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserData {
  taiKhoan: string;
  matKhau: string;
  // Thêm các trường khác từ API
}

interface ApiError {
  message: string;
  [key: string]: any; // Nếu cần
}

interface UserState {
  loading: boolean;
  data: UserData | null;
  error: ApiError | string | null;
}

const storedUser =
  typeof window !== "undefined" ? localStorage.getItem("userInfo") : null;
const initialData = storedUser ? (JSON.parse(storedUser) as UserData) : null;

const initialState: UserState = {
  loading: false,
  data: initialData,
  error: null,
};

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (
    userLogin: { taiKhoan: string; matKhau: string },
    { rejectWithValue }
  ) => {
    try {
      const result = await api.post("/QuanLyNguoiDung/DangNhap", userLogin);
      const userDataLogin = result.data as UserData;

      if (typeof window !== "undefined") {
        localStorage.setItem("userInfo", JSON.stringify(userDataLogin));
      }
      return userDataLogin;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Đăng nhập thất bại");
      }
      return rejectWithValue("Đăng nhập thất bại");
    }
  }
);

const userLoginSlice = createSlice({
  name: "userLoginSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload as UserData;
      if (typeof window !== "undefined") {
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload as UserData;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as ApiError | string;
    });
  },
});

export const { setUser } = userLoginSlice.actions;
export default userLoginSlice.reducer;
