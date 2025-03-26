import { useRouter } from "next/navigation";
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

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === "logout") {
      localStorage.removeItem("role"); // Xóa đăng nhập
      router.push("/auth");
    } else {
      router.push(`/admin/${key}`);
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
        defaultSelectedKeys={["dashboard"]}
        onClick={handleMenuClick}
        items={[
          { key: "dashboard", icon: <MailOutlined />, label: "Dashboard" },
          { key: "users", icon: <AppstoreOutlined />, label: "Quản lý Users" },
          { key: "settings", icon: <SettingOutlined />, label: "Cài đặt" },
          { type: "divider" },
          { key: "logout", icon: <LogoutOutlined />, label: "Đăng xuất" },
        ]}
      />
    </Sider>
  );
}
