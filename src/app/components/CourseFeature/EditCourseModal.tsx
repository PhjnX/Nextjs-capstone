"use client";
import React, { useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Select,
  Upload,
  Button,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { updateCourse } from "@/server/api/course";
import { toast } from "react-toastify";
import type { CourseList } from "@/types/courseList";
import moment from "moment";

// Danh sách mã danh mục khóa học
const validCourseCategories = [
  { value: "BackEnd", label: "Lập trình Backend" },
  { value: "Design", label: "Thiết kế Web" },
  { value: "DiDong", label: "Lập trình di động" },
  { value: "FrontEnd", label: "Lập trình Front end" },
  { value: "FullStack", label: "Lập trình Full Stack" },
  { value: "TuDuy", label: "Tư duy lập trình" },
];

interface EditCourseModalProps {
  visible: boolean;
  course?: CourseList | null;
  onCancel: () => void;
  onUpdated: () => void;
}

const EditCourseModal: React.FC<EditCourseModalProps> = ({
  visible,
  course,
  onCancel,
  onUpdated,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (course) {
      // Kiểm tra thông tin course
      console.log("Course nhận được:", course);

      // Xử lý giá trị mã danh mục: ưu tiên course.maDanhMucKhoaHoc,
      // nếu không có thì lấy từ course.danhMucKhoaHoc.maDanhMuc, nếu vẫn không có thì mặc định "BackEnd"
      const maDanhMuc =
        course.danhMucKhoaHoc.maDanhMucKhoahoc ||
        (course.danhMucKhoaHoc && course.danhMucKhoaHoc.maDanhMuc
          ? course.danhMucKhoaHoc.maDanhMuc
          : "BackEnd");

      form.setFieldsValue({
        maKhoaHoc: course.maKhoaHoc,
        biDanh: course.biDanh,
        tenKhoaHoc: course.tenKhoaHoc,
        moTa: course.moTa,
        luotXem: course.luotXem,
        danhGia: course.danhGia !== undefined ? Number(course.danhGia) : 0,
        maNhom: course.maNhom,
        ngayTao: course.ngayTao ? moment(course.ngayTao, "DD/MM/YYYY") : null,
        maDanhMucKhoaHoc: maDanhMuc,
        taiKhoanNguoiTao: course?.nguoiTao?.taiKhoan || "",
      });

      // Set file list mặc định cho hình ảnh nếu có
      form.setFieldValue(
        "hinhAnh",
        course.hinhAnh
          ? [
              {
                uid: "-1",
                name: "image.png",
                status: "done",
                url: course.hinhAnh,
              },
            ]
          : []
      );
    }
  }, [course, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (values.ngayTao) {
        values.ngayTao = values.ngayTao.format("DD/MM/YYYY");
      }
      // Tạo FormData để gửi dữ liệu update, bao gồm file nếu có thay đổi
      const formData = new FormData();
      formData.append("maKhoaHoc", values.maKhoaHoc);
      formData.append("biDanh", values.biDanh);
      formData.append("tenKhoaHoc", values.tenKhoaHoc);
      formData.append("moTa", values.moTa);
      formData.append("luotXem", values.luotXem.toString());
      formData.append("danhGia", values.danhGia.toString());
      formData.append("maNhom", values.maNhom);
      formData.append("ngayTao", values.ngayTao);
      formData.append("maDanhMucKhoaHoc", values.maDanhMucKhoaHoc);
      formData.append("taiKhoanNguoiTao", values.taiKhoanNguoiTao);

      // Nếu người dùng chọn file mới thì sẽ có originFileObj
      if (
        values.hinhAnh &&
        Array.isArray(values.hinhAnh) &&
        values.hinhAnh.length > 0 &&
        values.hinhAnh[0].originFileObj
      ) {
        formData.append("hinhAnh", values.hinhAnh[0].originFileObj);
      } else if (course && course.hinhAnh) {
        // Nếu không có thay đổi, gửi luôn URL cũ
        formData.append("hinhAnh", course.hinhAnh);
      }

      await updateCourse(formData);
      toast.success("Cập nhật khóa học thành công!");
      onUpdated();
      onCancel();
    } catch (error) {
      toast.error("Cập nhật khóa học thất bại!");
    }
  };

  return (
    <>
      <Modal
        title="Chỉnh sửa khóa học"
        open={visible}
        onCancel={onCancel}
        onOk={handleOk}
        okText="Cập nhật"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="maKhoaHoc"
            label="Mã khóa học"
            rules={[{ required: true, message: "Vui lòng nhập mã khóa học" }]}
          >
            <Input disabled />
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
            rules={[{ required: true, message: "Vui lòng nhập lượt xem" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="danhGia"
            label="Đánh giá"
            rules={[{ required: true, message: "Vui lòng nhập đánh giá" }]}
          >
            <InputNumber min={0} max={5} style={{ width: "100%" }} />
          </Form.Item>
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
        </Form>
      </Modal>

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
    </>
  );
};

export default EditCourseModal;
