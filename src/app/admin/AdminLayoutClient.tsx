"use client"; // Bắt buộc để dùng hook, localStorage, v.v...
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Layout,
  Spin,
  Avatar,
  Dropdown,
  Button,
  Drawer,
  MenuProps,
} from "antd";
import { UserOutlined, LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import AdminSidebar from "../components/AdminSidebar";

const { Content, Header, Sider } = Layout;

interface Props {
  children: React.ReactNode;
}

export default function AdminLayoutClient({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const [isMounted, setIsMounted] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Kiểm tra role từ localStorage (xác thực) + set loading
  useEffect(() => {
    if (isMounted) {
      const role = localStorage.getItem("role");
      setIsAuthorized(role === "GV"); // Cho phép vào nếu role === "GV"
      setIsLoading(false);
    }
  }, [isMounted]);

  // Xử lý responsive
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // Gọi lần đầu
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Xử lý logout
  const handleLogout = () => {
    localStorage.removeItem("role");
    router.push("/auth");
  };

  // Dropdown menu khi click vào Avatar
  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      label: "Profile",
      icon: <UserOutlined />,
    },
    { type: "divider" }, // Divider không cần key
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  // Nếu đang load hoặc chưa mount -> hiển thị loading
  if (!isMounted || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  // Nếu không có quyền -> có thể redirect, hoặc return null
  if (!isAuthorized) {
    router.push("/auth");
    return null;
  }

  // Tùy theo pathname mà ta đổi title cho header
  let pageTitle = "Admin Dashboard";
  if (pathname.includes("/admin/users")) {
    pageTitle = "Quản lý Users";
  } else if (pathname.includes("/admin/settings")) {
    pageTitle = "Cài đặt";
  }
  // ... bạn có thể mở rộng thêm

  return (
    <Layout className="min-h-screen">
      {/* Sidebar (desktop) */}
      {!isMobile && (
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={() => setCollapsed((prev) => !prev)}
          collapsedWidth={80}
          width={250}
          className="bg-[#001529] hidden lg:block transition-all duration-300"
        >
          <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        </Sider>
      )}

      {/* Drawer (mobile) */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setIsSidebarVisible(false)}
        bodyStyle={{ padding: 0, height: "100vh" }}
        open={isSidebarVisible}
      >
        <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </Drawer>

      {/* Layout bên phải */}
      <Layout className="flex-1">
        {/* Header */}
        <Header className="flex justify-between items-center bg-white shadow px-4 sm:px-6">
          {/* Nút mở sidebar trên mobile */}
          {isMobile && (
            <Button
              icon={<MenuOutlined />}
              className="lg:hidden"
              onClick={() => setIsSidebarVisible(true)}
            />
          )}

          <h1 className="text-lg sm:text-xl font-bold flex-1 text-center lg:text-left">
            {pageTitle}
          </h1>

          {/* Avatar + Dropdown menu */}
          <Dropdown menu={{ items: userMenuItems }} trigger={["click"]}>
            <Avatar
              size={40}
              icon={<UserOutlined />}
              className="cursor-pointer hover:opacity-80 transition"
            />
          </Dropdown>
        </Header>

        {/* Content chính - nơi render các trang con */}
        <Content className="p-4 sm:p-6 bg-gray-100 flex-1 min-h-[calc(100vh-64px)]">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
