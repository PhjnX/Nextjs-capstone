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
import logo from "../../../../public/logo_admin.png";
import { logout } from "@/app/utils/logout";
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
      logout();
      router.push("/auth");
      return;
    }
    setLoading(true);
    setSelectedKey(key);

    setTimeout(() => {
      setLoading(false);
    }, 1000);

    router.push(key);
  };

  const adminMenu: MenuProps["items"] = [
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

    !collapsed ? { label: "Hệ thống", type: "group" } : { type: "divider" },
    {
      key: "sub3",
      label: "Tài khoản",
      icon: <UserOutlined />,
      children: [
        { key: "/admin/profile", label: "Thông tin cá nhân" },
        { key: "/admin/password", label: "Cập nhật mật khẩu" },
      ],
    },
    {
      key: "logout",
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
        <div className="h-16 flex items-center justify-center">
          <img
            src={logo.src}
            alt="Logo"
            className={`transition-all duration-300 ${
              collapsed ? "w-10" : "w-[75px]"
            }`}
          />
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
