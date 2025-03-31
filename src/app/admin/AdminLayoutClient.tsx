"use client"; // Bắt buộc để dùng hook, localStorage, v.v...
import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Layout, Spin, ConfigProvider } from "antd";
import AdminSidebar from "../components/AdminSidebar";
import { getMyInfor } from "@/server/api/user";
import CustomHeader from "@/app/components/CustomeHeader";

const { Content } = Layout;

interface Props {
  children: ReactNode;
}

export default function AdminLayoutClient({ children }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");

    if (role === "GV" && accessToken) {
      getMyInfor(accessToken)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
          router.push("/auth");
        });
    } else {
      router.push("/auth");
    }
  }, [router]);

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
