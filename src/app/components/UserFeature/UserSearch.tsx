"use client";
import React, { useState, useEffect } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface SearchInputProps {
  onSearch: (value: string) => void;
  delay?: number; 
}

export default function SearchInput({
  onSearch,
  delay = 500,
}: SearchInputProps) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay, onSearch]);

  return (
    <Input
      placeholder="Nhập tên người dùng"
      allowClear
      value={value}
      onChange={(e) => setValue(e.target.value)}
      style={{ width: 300 }}
      suffix={<SearchOutlined style={{ color: "#1890ff" }} />}
    />
  );
}
