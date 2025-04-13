"use client";
import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface CourseSearchProps {
  searchText: string;
  onSearch: (value: string) => void;
}

const CourseSearch: React.FC<CourseSearchProps> = ({
  searchText,
  onSearch,
}) => {
  return (
    <Input
      placeholder="Nhập tên khóa học"
      allowClear
      value={searchText}
      onChange={(e) => onSearch(e.target.value)}
      style={{ width: 300 }}
      suffix={<SearchOutlined style={{ color: "#1890ff" }} />}
    />
  );
};

export default CourseSearch;
