"use client";
import React from "react";
import {
  Form,
  Input,
  Button,
  InputNumber,
  DatePicker,
  Select,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { addCourse, uploadCourseImage } from "@/server/api/course";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// Danh mục khóa học (theo backend)
const validCourseCategories = [
  { value: "BackEnd", label: "Lập trình Backend" },
  { value: "Design", label: "Thiết kế Web" },
  { value: "DiDong", label: "Lập trình di động" },
  { value: "FrontEnd", label: "Lập trình Front end" },
  { value: "FullStack", label: "Lập trình Full Stack" },
  { value: "TuDuy", label: "Tư duy lập trình" },
];

const AddCoursePage = () => {
  const [form] = Form.useForm();
  const router = useRouter();

  // Xử lý submit form
  const onFinish = async (values: any) => {
    try {
      // Lấy file ảnh từ Upload (AntD trả về mảng fileList)
      const file = values.hinhAnh?.[0]?.originFileObj;
      if (!file) {
        toast.error("Vui lòng chọn file ảnh!");
        return;
      }

      // Tạo object JSON cho API Thêm khóa học
      const courseData = {
        maKhoaHoc: values.maKhoaHoc,
        biDanh: values.biDanh, // nếu backend cần
        tenKhoaHoc: values.tenKhoaHoc,
        moTa: values.moTa,
        luotXem: Number(values.luotXem) || 0,
        danhGia: Number(values.danhGia) || 0,
        // Lưu lại tên file (VD: "avatar.jpg")
        hinhAnh: file.name,
        maNhom: values.maNhom,
        // Chuyển ngày sang format "DD/MM/YYYY"
        ngayTao: values.ngayTao ? values.ngayTao.format("DD/MM/YYYY") : "",
        maDanhMucKhoaHoc: values.maDanhMucKhoaHoc,
        taiKhoanNguoiTao: values.taiKhoanNguoiTao,
      };

      // 1) Gửi request thêm khóa học (dạng JSON)
      await addCourse(courseData);

      // 2) Upload file ảnh (multipart/form-data)
      await uploadCourseImage(file, values.tenKhoaHoc);

      toast.success("Thêm khóa học thành công!");
      router.push("/admin/courses");
    } catch (error: any) {
      console.error("Lỗi thêm khóa học:", error);
      // Lấy message lỗi từ response.data nếu có, nếu không thì hiện message mặc định
      const errorMessage = error?.response?.data || "Thêm khóa học thất bại!";
      toast.error(`Thêm khóa học thất bại: ${errorMessage}`);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Thêm khóa học mới</h1>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="maKhoaHoc"
          label="Mã khóa học"
          rules={[{ required: true, message: "Vui lòng nhập mã khóa học" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="biDanh"
          label="Bí danh"
          rules={[{ required: true, message: "Vui lòng nhập bí danh" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="tenKhoaHoc"
          label="Tên khóa học"
          rules={[{ required: true, message: "Vui lòng nhập tên khóa học" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="moTa"
          label="Mô tả"
          rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="luotXem"
          label="Lượt xem"
          initialValue={0}
          rules={[{ required: true, message: "Vui lòng nhập lượt xem" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="danhGia"
          label="Đánh giá"
          initialValue={0}
          rules={[{ required: true, message: "Vui lòng nhập đánh giá" }]}
        >
          <InputNumber min={0} max={5} style={{ width: "100%" }} />
        </Form.Item>

        {/* Upload ảnh */}
        <Form.Item
          name="hinhAnh"
          label="Hình ảnh"
          rules={[{ required: true, message: "Vui lòng chọn hình ảnh" }]}
          valuePropName="fileList"
          getValueFromEvent={(e: any) =>
            Array.isArray(e) ? e : e && e.fileList
          }
        >
          <Upload beforeUpload={() => false} maxCount={1} accept="image/*">
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          name="maNhom"
          label="Mã nhóm"
          initialValue="GP01"
          rules={[{ required: true, message: "Vui lòng nhập mã nhóm" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="ngayTao"
          label="Ngày tạo"
          rules={[{ required: true, message: "Vui lòng chọn ngày tạo" }]}
        >
          <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="maDanhMucKhoaHoc"
          label="Mã danh mục khóa học"
          rules={[
            { required: true, message: "Vui lòng chọn danh mục khóa học" },
          ]}
        >
          <Select options={validCourseCategories} />
        </Form.Item>

        <Form.Item
          name="taiKhoanNguoiTao"
          label="Tài khoản người tạo"
          rules={[
            { required: true, message: "Vui lòng nhập tài khoản người tạo" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Thêm khóa học
          </Button>
        </Form.Item>
      </Form>

      <style jsx global>{`
        .ant-input,
        .ant-input-affix-wrapper,
        .ant-select-selector,
        .ant-picker,
        .ant-input-number,
        .ant-input-number-input,
        .ant-upload,
        .ant-picker-input > input {
          border-radius: 6px !important;
        }
        .ant-input::placeholder,
        .ant-select-selection-placeholder,
        .ant-picker-input > input::placeholder {
          color: #a0aec0 !important;
        }
      `}</style>
    </div>
  );
};

export default AddCoursePage;
