"use client";

import React, { useState } from "react";
import { Form, Input, Button, Select, Card, Row, Col } from "antd";
import { addUser } from "@/server/api/user";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { addUserForm } from "@/types/add-user";

const { Option } = Select;

export default function AddUserForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: addUserForm) => {
    setLoading(true);
    try {
      await addUser(values);
      toast.success("Thêm người dùng thành công!");
      router.push("/admin/users");
    } catch (error) {
      console.error("Lỗi thêm người dùng:", error);
      toast.error("Thêm người dùng thất bại!");
    }
    setLoading(false);
  };

  return (
    <Card
      title="Thêm Người Dùng"
      className="mx-auto mt-8"
      style={{ maxWidth: 600 }}
    >
      <Form<addUserForm>
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ maNhom: "GP01" }}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Tài khoản"
              name="taiKhoan"
              rules={[
                { required: true, message: "Vui lòng nhập tài khoản!" },
                { min: 4, message: "Tài khoản phải có ít nhất 4 ký tự!" },
              ]}
            >
              <Input
                className="rounded-md focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Nhập tài khoản"
              />
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
              <Input.Password
                className="rounded-md focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Nhập mật khẩu"
              />
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
              <Input
                className="rounded-md focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Nhập họ tên"
              />
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
              <Input
                className="rounded-md focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Nhập số điện thoại"
              />
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
              <Select
                className="rounded-md focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Chọn loại người dùng"
              >
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
              <Input
                className="rounded-md focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Nhập mã nhóm"
              />
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
              <Input
                className="rounded-md focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Nhập email"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Thêm người dùng
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
