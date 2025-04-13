// src/components/EditUserModal.tsx
"use client";

import React, { useEffect } from "react";
import { Modal, Form, Input, Button, Select, Row, Col } from "antd";
import { toast } from "react-toastify";
import { updateUser } from "@/server/api/user";
import { addUserForm } from "@/types/add-user"; // Giả sử kiểu dùng chung cho Add & Update

const { Option } = Select;

interface EditUserModalProps {
  visible: boolean;
  onClose: () => void;
  initialValues: Partial<addUserForm>;
  onUpdate: () => void; // Hàm gọi lại sau khi cập nhật thành công (ví dụ: reload danh sách)
}

export default function EditUserModal({
  visible,
  onClose,
  initialValues,
  onUpdate,
}: EditUserModalProps) {
  const [form] = Form.useForm<addUserForm>();

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(initialValues);
    }
  }, [visible, initialValues, form]);

  const handleFinish = async (values: addUserForm) => {
    try {
      await updateUser(values);
      toast.success("Cập nhật người dùng thành công!");
      onUpdate();
      onClose();
    } catch (error: unknown) {
      console.error("Lỗi cập nhật người dùng:", error);
      toast.error("Cập nhật người dùng thất bại!");
    }
  };

  return (
    <Modal
      open={visible}
      title="Chỉnh sửa người dùng"
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Form<addUserForm>
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={initialValues}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Tài khoản"
              name="taiKhoan"
              rules={[{ required: true, message: "Vui lòng nhập tài khoản!" }]}
            >
              {/* Nếu muốn không cho chỉnh sửa tài khoản, set disabled */}
              <Input placeholder="Nhập tài khoản" disabled />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Mật khẩu"
              name="matKhau"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu!" },
                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
              ]}
            >
              <Input.Password placeholder="Nhập mật khẩu" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Họ tên"
              name="hoTen"
              rules={[
                { required: true, message: "Vui lòng nhập họ tên!" },
                {
                  pattern: /^[^\d!@#$%^&*()_+\[\]{};:'"\\|,.<>/?]+$/,
                  message: "Họ tên không được chứa ký tự đặc biệt hoặc số!",
                },
              ]}
            >
              <Input placeholder="Nhập họ tên" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Số điện thoại"
              name="soDT"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
                {
                  pattern: /^[0-9]{10,11}$/,
                  message: "Số điện thoại phải là 10-11 chữ số!",
                },
              ]}
            >
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Loại người dùng"
              name="maLoaiNguoiDung"
              rules={[
                { required: true, message: "Vui lòng chọn loại người dùng!" },
              ]}
            >
              <Select placeholder="Chọn loại người dùng">
                <Option value="GV">Giáo vụ (GV)</Option>
                <Option value="HV">Học viên (HV)</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Mã nhóm"
              name="maNhom"
              rules={[{ required: true, message: "Vui lòng nhập mã nhóm!" }]}
            >
              <Input placeholder="Nhập mã nhóm" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input placeholder="Nhập email" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Cập nhật người dùng
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
