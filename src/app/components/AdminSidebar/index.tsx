/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button, Layout, Menu, theme } from "antd";
import {
  MailOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
type MenuItem = Required<MenuProps>["items"][number];
import logo from "../../../../public/logo-edutech.png";
const { Sider } = Layout;

interface SidebarProps {
  setLoading: (value: boolean) => void;
}

export default function AdminSidebar({ setLoading }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedKey, setSelectedKey] = useState<string>(pathname);
  const [collapsed, setCollapsed] = useState(false);

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === "logout") {
      localStorage.removeItem("role");
      router.push("/auth");
    }
    setLoading(true);
    setSelectedKey(key);

    setTimeout(() => {
      setLoading(false);
    }, 1000);

    router.push(key);
  };

  const adminMenu: MenuItem[] = [
    !collapsed
      ? { label: "Giao diện -  Người dùng", type: "group" }
      : { type: "divider" },
    { key: "/admin", label: "Trang chủ", icon: <MailOutlined /> },
    {
      key: "sub1",
      label: "Quản lý người dùng",
      icon: <SettingOutlined />,

      children: [
        { key: "/admin/users", label: "Danh sách người dùng" },
        { key: "/admin/users/add-user", label: "Thêm người dùng" },
      ],
    },
    !collapsed ? { label: "Học tập", type: "group" } : { type: "divider" },
    {
      key: "sub2",
      label: "Quản lý khoá học",
      icon: <SettingOutlined />,
      children: [
        { key: "/admin/courses", label: "Danh sách khoá học" },
        { key: "/admin/courses/add-course", label: "Thêm khóa học" },
      ],
    },
    {
      key: "sub3",
      label: "Học viên",
      icon: <UserOutlined />,
      children: [
        { key: "/admin/student-list", label: "Danh sách học viên" },
        { key: "/admin/add-student", label: "Thêm học viên" },
        { key: "/admin/awaiting-approval", label: "Học viên chờ phê duyệt" },
      ],
    },
    !collapsed ? { label: "Hệ thống", type: "group" } : { type: "divider" },
    {
      key: "sub4",
      label: "Tài khoản",
      icon: <UserOutlined />,
      children: [
        { key: "/admin/profile", label: "Thông tin cá nhân" },
        { key: "/admin/settings", label: "Cập nhật mật khẩu" },
      ],
    },
    {
      key: "/auth/logout",
      label: "Đăng xuất",
      danger: true,
      icon: <LogoutOutlined />,
    },
  ];

  const {
    token: { colorBgBase, colorTextBase },
  } = theme.useToken();
  const items = adminMenu;
  return (
    <Sider
      breakpoint="md"
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={250}
      style={{ background: colorBgBase }}
    >
      <div className="relative px-4">
        <div className="h-16">
          {!collapsed ? (
            <div className="flex items-center text-center w-full h-full">
              <img src={logo.src} alt="Logo" width={200} />
            </div>
          ) : (
            "" // nếu có logo khi về responsive thì thêm ở đây còn k tyhì để đại
          )}
        </div>
        <Button
          className="absolute -right-4 top-3"
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            color: colorTextBase,
            background: colorBgBase,
          }}
        />
      </div>
      <div style={{ maxHeight: "calc(100vh - 64px)", overflowY: "auto" }}>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[selectedKey]}
          style={{ background: colorBgBase, color: colorTextBase }}
          items={items}
          onClick={handleMenuClick}
        />
      </div>
    </Sider>
  );
}
