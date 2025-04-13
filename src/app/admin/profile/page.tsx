"use client";

import React, { useEffect, useState } from "react";
import { Card, Descriptions, Spin, Typography, Avatar, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getMyInfor } from "@/server/api/user";

const { Title, Text } = Typography;

const ProfilePage = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("Không tìm thấy accessToken");
      return;
    }

    getMyInfor(accessToken)
      .then((res) => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy thông tin tài khoản:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12}>
          <Card
            variant="borderless"
            style={{
              borderRadius: 16,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div className="flex items-center gap-4 mb-6">
              <Avatar size={64} icon={<UserOutlined />} />
              <div>
                <Title level={4} style={{ marginBottom: 0 }}>
                  {profile?.hoTen}
                </Title>
                <Text type="secondary">{profile?.email}</Text>
              </div>
            </div>

            <Descriptions column={1} bordered size="middle">
              <Descriptions.Item label="Tài khoản">
                {profile?.taiKhoan}
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">
                {profile?.soDT}
              </Descriptions.Item>
              <Descriptions.Item label="Loại người dùng">
                {profile?.maLoaiNguoiDung}
              </Descriptions.Item>
              <Descriptions.Item label="Mã nhóm">
                {profile?.maNhom}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;
