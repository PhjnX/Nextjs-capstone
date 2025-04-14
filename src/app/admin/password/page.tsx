"use client"

import { Button, Card, Form, Input, message } from "antd";
import { updateUser } from "@/server/api/user";
import { useEffect, useState } from "react";

const ChangePasswordPage = () => {
  const [form] = Form.useForm();

  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("ADMIN_LOCAL") || "{}");
    setCurrentUser(storedUser);
  }, []);
  const onFinish = async (values: any) => {
    const { newPassword } = values

    try {
      // console.log('currentUser: ', currentUser);
      
      if (!currentUser || !currentUser.taiKhoan) {
        message.error("Không tìm thấy thông tin người dùng!")
        return
      }

      const userData = {
        taiKhoan: currentUser.taiKhoan,
        hoTen: currentUser.hoTen,
        email: currentUser.email,
        soDt: currentUser.soDt,
        maLoaiNguoiDung: currentUser.maLoaiNguoiDung || "GV",
        maNhom: currentUser.maNhom || "GP01",
        matKhau: newPassword, // Chú ý: Một số API dùng "matKhau", có thể không phải "matKhauMoi"
      };

      console.log("Gửi yêu cầu:", userData);
      await updateUser(userData);

      message.success("Cập nhật mật khẩu thành công!");
      form.resetFields();
    } catch (error: any) {
      console.log("Lỗi:", error?.response);
      message.error(error?.response?.data?.message || "Cập nhật thất bại!");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <Card title="Thay đổi mật khẩu" style={{ width: 500 }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Nhập lại mật khẩu mới"
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu mới!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Mật khẩu không khớp!");
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Cập nhật mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ChangePasswordPage;
