"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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

export default function AdminPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isMobile, setIsMobile] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const role = localStorage.getItem("role");
      setIsAuthorized(role === "GV");
      setIsLoading(false);
    }
  }, [isMounted]);

  const handleLogout = () => {
    localStorage.removeItem("role");
    router.push("/auth");
  };

  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      label: "Profile",
      icon: <UserOutlined />,
    },
    { key: "divider", type: "divider" },
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  if (!isMounted || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!isAuthorized) return null;

  return (
    <Layout className="min-h-screen">
      {/* Sidebar hiển thị trên desktop */}
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

      {/* Drawer cho mobile */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setIsSidebarVisible(false)}
        styles={{ body: { padding: 0, height: "100vh" } }}
        open={isSidebarVisible}
      >
        <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </Drawer>

      {/* Nội dung chính */}
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
            Admin Dashboard
          </h1>

          {/* Avatar + Dropdown Menu */}
          <Dropdown menu={{ items: userMenuItems }} trigger={["click"]}>
            <Avatar
              size={40}
              icon={<UserOutlined />}
              className="cursor-pointer hover:opacity-80 transition"
            />
          </Dropdown>
        </Header>

        {/* Nội dung */}
        <Content className="p-4 sm:p-6 bg-gray-100 flex-1 min-h-[calc(100vh-64px)]">
          <p>Chào mừng bạn đến với trang quản trị!</p>
        </Content>
      </Layout>
    </Layout>
  );
}
