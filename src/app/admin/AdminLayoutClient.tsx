"use client"; // Bắt buộc để dùng hook, localStorage, v.v...
import React, { ReactNode, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Layout,
  Spin,
  Avatar,
  Dropdown,
  Button,
  Drawer,
  MenuProps,
  ConfigProvider,
} from "antd";
import { UserOutlined, LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import AdminSidebar from "../components/AdminSidebar";
import { getMyInfor } from "@/server/api/user";
import CustomHeader from "@/app/components/CustomeHeader";

const { Content, Header, Sider } = Layout;


interface Props {
  children: ReactNode;
}

export default function AdminLayoutClient({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const [isMounted, setIsMounted] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [loading, setLoading] = useState(false); 

  const [user, setUser] = useState(null)
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken")
    if(localStorage.getItem("role") == "GV" && accessToken){
      getMyInfor(accessToken).then((res) => { 
        // console.log('res: ', res);
        setUser(res.data)
      }).catch((err) => { 
        console.log(err);
        router.push("/auth");
      })
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const role = localStorage.getItem("role");
      setIsAuthorized(role === "GV"); 
      setIsLoading(false);
    }
  }, [isMounted]);



  return (
    <div className="flex">
      <ConfigProvider componentSize="large">
        <Layout className="!h-screen">
          <AdminSidebar setLoading={setLoading} />
          <Layout>
            <CustomHeader user={user} />
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
                background: "#ffffff",
                borderRadius: 8,
                position: "relative",
                overflowY: "auto", 
              }}
            >
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-50">
                  <Spin size="large" />
                </div>
              )}
              {children}
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    </div>
  );
}
