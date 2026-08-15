import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="dashboard-layout">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <main
        className={`dashboard-main ${
          collapsed ? "main-expanded" : ""
        }`}
      >
        <Topbar />

        <div className="dashboard-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}