export type CourseList = {
  maKhoaHoc: number | string;
  biDanh: string;
  tenKhoaHoc: string;
  moTa: string;
  luotXem: string;
  hinhAnh: string | null | undefined;
  maNhom: "gp01";
  ngayTao: string;
  soLuongHocVien: number;
  nguoiTao: {
    taiKhoan: null;
    hoTen: null;
    maLoaiNguoiDung: null;
    tenLoaiNguoiDung: null;
  };
  danhMucKhoaHoc: {
    maDanhMucKhoahoc: string;
    tenDanhMucKhoaHoc: string;
  };
};
