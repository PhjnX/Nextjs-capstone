// File: /app/components/CourseFeature/UserEnrollmentModal.tsx
"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Modal, Tabs, Table, Button, message } from "antd";
import {
  postNguoiDungChuaGhiDanhKhoaHoc,
  postDanhSachHocVienKhoaHoc,
  postHocVienChoXetDuyet,
} from "@/server/api/user";
import { postGhiDanhKhoaHoc, postHuyGhiDanh } from "@/server/api/course";

interface UserEnrollmentModalProps {
  visible: boolean;
  maKhoaHoc: string;
  onCancel: () => void;
}

interface UserData {
  taiKhoan: string;
  matKhau: string;
  biDanh: string;
}

const UserEnrollmentModal: React.FC<UserEnrollmentModalProps> = ({
  visible,
  maKhoaHoc,
  onCancel,
}) => {
  const [notEnrolledUsers, setNotEnrolledUsers] = useState<UserData[]>([]);
  const [enrolledUsers, setEnrolledUsers] = useState<UserData[]>([]);
  const [pendingUsers, setPendingUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const notEnrolledRes = await postNguoiDungChuaGhiDanhKhoaHoc(maKhoaHoc);
      setNotEnrolledUsers(notEnrolledRes.data);
      const enrolledRes = await postDanhSachHocVienKhoaHoc(maKhoaHoc);
      setEnrolledUsers(enrolledRes.data);
      const pendingRes = await postHocVienChoXetDuyet(maKhoaHoc);
      setPendingUsers(pendingRes.data);
    } catch (error) {
      console.error(error);
      message.error("Lỗi khi tải dữ liệu");
    }
    setLoading(false);
  }, [maKhoaHoc]);

  useEffect(() => {
    if (visible) {
      fetchData();
    }
  }, [visible, fetchData]);

  const handleEnroll = async (user: UserData) => {
    try {
      await postGhiDanhKhoaHoc({ maKhoaHoc, taiKhoan: user.taiKhoan });
      message.success("Ghi danh thành công");
      fetchData();
    } catch (error) {
      console.error(error);
      message.error("Ghi danh thất bại");
    }
  };

  const handleCancelEnrollment = async (user: UserData) => {
    try {
      await postHuyGhiDanh({ maKhoaHoc, taiKhoan: user.taiKhoan });
      message.success("Hủy ghi danh thành công");
      fetchData();
    } catch (error) {
      console.error(error);
      message.error("Hủy ghi danh thất bại");
    }
  };

  const columnsNotEnrolled = [
    { title: "Tài khoản", dataIndex: "taiKhoan", key: "taiKhoan" },
    { title: "Bi danh", dataIndex: "biDanh", key: "biDanh" },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: UserData) => (
        <Button type="primary" onClick={() => handleEnroll(record)}>
          Ghi danh
        </Button>
      ),
    },
  ];

  const columnsEnrolled = [
    { title: "Tài khoản", dataIndex: "taiKhoan", key: "taiKhoan" },
    { title: "Bi danh", dataIndex: "biDanh", key: "biDanh" },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: UserData) => (
        <Button danger onClick={() => handleCancelEnrollment(record)}>
          Hủy ghi danh
        </Button>
      ),
    },
  ];

  const columnsPending = [
    { title: "Tài khoản", dataIndex: "taiKhoan", key: "taiKhoan" },
    { title: "Bi danh", dataIndex: "biDanh", key: "biDanh" },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: UserData) => (
        <>
          <Button
            type="primary"
            onClick={() => handleEnroll(record)}
            style={{ marginRight: 8 }}
          >
            Xác thực
          </Button>
          <Button danger onClick={() => handleCancelEnrollment(record)}>
            Hủy
          </Button>
        </>
      ),
    },
  ];

  const tabItems = [
    {
      key: "1",
      label: "Chưa ghi danh",
      children: (
        <Table
          dataSource={notEnrolledUsers}
          columns={columnsNotEnrolled}
          loading={loading}
          rowKey="taiKhoan"
        />
      ),
    },
    {
      key: "2",
      label: "Đã ghi danh",
      children: (
        <Table
          dataSource={enrolledUsers}
          columns={columnsEnrolled}
          loading={loading}
          rowKey="taiKhoan"
        />
      ),
    },
    {
      key: "3",
      label: "Chờ xét duyệt",
      children: (
        <Table
          dataSource={pendingUsers}
          columns={columnsPending}
          loading={loading}
          rowKey="taiKhoan"
        />
      ),
    },
  ];

  return (
    <Modal
      open={visible} // antd v5 sử dụng prop 'open'
      onCancel={onCancel}
      footer={null}
      width={800}
      title={`Quản lý ghi danh cho khóa học: ${maKhoaHoc}`}
    >
      <Tabs defaultActiveKey="1" items={tabItems} />
    </Modal>
  );
};

export default UserEnrollmentModal;
