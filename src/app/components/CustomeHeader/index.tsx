"use client";

import { Layout, Breadcrumb, Avatar, Dropdown, MenuProps, Typography, Divider, Space, message } from "antd";
import { HomeOutlined, UserOutlined, LogoutOutlined, LockOutlined, InfoCircleOutlined } from "@ant-design/icons";

import { useRouter, usePathname } from "next/navigation";

const { Header } = Layout;
const { Text } = Typography;

interface UserProps {
  user: {
    taiKhoan: string;
    hoTen: string;
    avatar: string | null;
    maLoaiNguoiDung: string;
  } | null;
}

export default function CustomHeader({ user }: UserProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    message.success("Đăng xuất thành công!");
    localStorage.removeItem("maLoaiNguoiDung");
    router.push("/auth");
  };

  const generateBreadcrumbs = () => {
    const pathArray = pathname.split("/").filter((x) => x); 
    const breadcrumbs = [{ title: <HomeOutlined />, href: "/admin" }]; 
  
    pathArray.forEach((path, index) => {
      const href = `/${pathArray.slice(0, index + 1).join("/")}`;
  
      const breadcrumbTitle: { [key: string]: string } = {
        dashboard: "Trang chủ",
 
      };
  
      breadcrumbs.push({
        title: <span>{breadcrumbTitle[path] || path}</span>,
        href,
      });
    });
  
    return breadcrumbs;
  };
  

  const breadcrumbItems = generateBreadcrumbs();

  const avatarSrc = user?.avatar && user.avatar !== "" ? user.avatar : null;

  const userMenuItems: MenuProps["items"] = [
    {
      key: "avatar",
      label: (
        <div className="w-44">
          <Space direction="horizontal" size="small" style={{ display: "flex" }}>
            <Avatar size={50} src={avatarSrc} icon={!avatarSrc ? <UserOutlined /> : undefined} />
            <div className="flex flex-col">
              <Text strong>{user?.hoTen || "Người dùng"}</Text>
              <Text type="secondary">{user?.maLoaiNguoiDung|| "Vai trò"}</Text>
            </div>
          </Space>
          <Divider style={{ margin: "10px 0" }} />
        </div>
      ),
    },
    { key: "profile", label: "Thông tin", icon: <InfoCircleOutlined /> },
    { key: "change-password", label: "Đổi mật khẩu", icon: <LockOutlined /> },
    { type: "divider" },
    {
      key: "logout",
      label: "Đăng xuất",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
    { type: "divider" },
    {
      key: "version",
      label: "Hoàng Phi - 2025",
      disabled: true,
      style: { textAlign: "center" },
    },
  ];

  return (
    <Header
      style={{
        padding: "0 20px",
        background: "#ffffff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      <Breadcrumb items={breadcrumbItems} />

      <Dropdown menu={{ items: userMenuItems }} trigger={["click"]} placement="bottomRight" arrow>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            cursor: "pointer",
          }}
        >
          <Avatar size="default" src={avatarSrc} icon={!avatarSrc ? <UserOutlined /> : undefined} />
        </div>
      </Dropdown>
    </Header>
  );
}
