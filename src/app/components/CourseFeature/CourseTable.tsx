"use client";
import React from "react";
import { Table, Space, Button, Tooltip } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UserAddOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { CourseList } from "@/types/courseList";
import { formatText } from "@/app/utils/format";

interface CourseTableProps {
  courses: CourseList[];
  loading: boolean;
  onEdit: (maKhoaHoc: string | number) => void;
  onDelete: (maKhoaHoc: string | number) => void;
  onManageEnrollment: (maKhoaHoc: string | number) => void;
}

const EMPTY_IMAGE = "Không có hình ảnh";
const EMPTY_TEXT = "Không có thông tin";

const CourseTable: React.FC<CourseTableProps> = ({
  courses,
  loading,
  onEdit,
  onDelete,
  onManageEnrollment,
}) => {
  const filteredCourses = courses.filter(
    (course) =>
      course.maKhoaHoc !== null &&
      course.maKhoaHoc !== undefined &&
      course.maKhoaHoc !== ""
  );

  const columns: ColumnsType<CourseList> = [
    {
      title: "Mã khóa học",
      dataIndex: "maKhoaHoc",
      key: "maKhoaHoc",
      render: (text) => formatText(text, EMPTY_TEXT),
    },
    {
      title: "Tên khóa học",
      dataIndex: "tenKhoaHoc",
      key: "tenKhoaHoc",
      render: (text) => formatText(text, EMPTY_TEXT),
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (src: string) =>
        src ? (
          <img
            src={src}
            alt="course-img"
            style={{ width: "80px", height: "50px", objectFit: "cover" }}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "";
              e.currentTarget.alt = EMPTY_IMAGE;
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <Tooltip title="Không có hình ảnh">
            <span style={{ color: "#999" }}>
              <ExclamationCircleOutlined /> {EMPTY_IMAGE}
            </span>
          </Tooltip>
        ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "ngayTao",
      key: "ngayTao",
      render: (text) => formatText(text, EMPTY_TEXT),
    },
    {
      title: "Tài khoản người tạo",
      dataIndex: "nguoiTao",
      key: "nguoiTao",
      render: (nguoiTao: CourseList["nguoiTao"]) =>
        nguoiTao?.taiKhoan || (
          <Tooltip title="Không có người tạo">
            <span style={{ color: "#999" }}>
              <ExclamationCircleOutlined /> {EMPTY_TEXT}
            </span>
          </Tooltip>
        ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: CourseList) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined style={{ color: "#fa8c16", fontSize: 18 }} />}
            onClick={() => onEdit(record.maKhoaHoc)}
          />
          <Button
            type="text"
            icon={<DeleteOutlined style={{ color: "#f5222d", fontSize: 18 }} />}
            onClick={() => onDelete(record.maKhoaHoc)}
          />
          <Button
            type="text"
            icon={
              <UserAddOutlined style={{ color: "#4CAF50", fontSize: 18 }} />
            }
            onClick={() => onManageEnrollment(record.maKhoaHoc)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={filteredCourses}
      loading={loading}
      rowKey="maKhoaHoc"
    />
  );
};

export default CourseTable;
