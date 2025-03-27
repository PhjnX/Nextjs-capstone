"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Layout, Menu } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

export default function AdminSidebar({
  collapsed,
  setCollapsed,
}: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === "logout") {
      localStorage.removeItem("role"); // Xóa role
      router.push("/auth");
    } else {
      router.push(key); // key ở dưới mình sẽ set là "/admin" hoặc "/admin/users"...
    }
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={250}
      collapsedWidth={80}
      className={`transition-all duration-300 bg-[#001529] ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="h-16 flex items-center justify-center text-white text-lg font-bold">
        {collapsed ? "A" : "Admin Panel"}
      </div>

      <Menu
        theme="dark"
        mode="inline"
        onClick={handleMenuClick}
        // Xác định item nào được select
        selectedKeys={[pathname]}
        items={[
          {
            key: "/admin",
            icon: <MailOutlined />,
            label: "Dashboard",
          },
          {
            key: "/admin/users",
            icon: <AppstoreOutlined />,
            label: "Quản lý Users",
          },
          {
            key: "/admin/settings",
            icon: <SettingOutlined />,
            label: "Cài đặt",
          },
          { type: "divider" },
          {
            key: "logout",
            icon: <LogoutOutlined />,
            label: "Đăng xuất",
          },
        ]}
      />
    </Sider>
  );
}
