import {
  LayoutDashboard,
  Search,
  Sparkles,
  FileText,
  ClipboardCheck,
  BarChart3,
  User,
  Settings,
  LogOut,
  ChevronLeft,
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

const mainNavigation = [
  {
    name: "Overview",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Funding Discovery",
    path: "/dashboard/funding",
    icon: Search,
  },
  {
    name: "AI Strategist",
    path: "/dashboard/ai-strategist",
    icon: Sparkles,
  },
  {
    name: "Documents",
    path: "/dashboard/documents",
    icon: FileText,
  },
  {
    name: "Applications",
    path: "/dashboard/applications",
    icon: ClipboardCheck,
  },
  {
    name: "Analytics",
    path: "/dashboard/analytics",
    icon: BarChart3,
  },
];

const accountNavigation = [
  {
    name: "Profile",
    path: "/dashboard/profile",
    icon: User,
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar({
  collapsed,
  setCollapsed,
}: SidebarProps) {
  return (
    <aside className={`sidebar ${collapsed ? "sidebar-collapsed" : ""}`}>
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-symbol">
          <span />
          <span />
        </div>

        {!collapsed && (
          <div className="logo-text">
            <span>FUND</span>
            <span>BRIDGE AI</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="sidebar-content">
        <p className="sidebar-label">
          {collapsed ? "•" : "WORKSPACE"}
        </p>

        <nav>
          {mainNavigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/dashboard"}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active" : ""}`
                }
                title={collapsed ? item.name : ""}
              >
                <Icon size={18} strokeWidth={1.7} />

                {!collapsed && <span>{item.name}</span>}

                {!collapsed && item.name === "Funding Discovery" && (
                  <span className="nav-count">24</span>
                )}
              </NavLink>
            );
          })}
        </nav>

        <p className="sidebar-label account-label">
          {collapsed ? "•" : "ACCOUNT"}
        </p>

        <nav>
          {accountNavigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active" : ""}`
                }
                title={collapsed ? item.name : ""}
              >
                <Icon size={18} strokeWidth={1.7} />

                {!collapsed && <span>{item.name}</span>}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom */}
      <div className="sidebar-bottom">
        {!collapsed && (
          <div className="user-mini">
            <div className="user-avatar">A</div>

            <div className="user-info">
              <strong>Arpita</strong>
              <span>Startup Founder</span>
            </div>
          </div>
        )}

        <button
          className="collapse-button"
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Toggle sidebar"
        >
          <ChevronLeft
            size={17}
            className={collapsed ? "rotate-right" : ""}
          />
        </button>

        {!collapsed && (
          <button className="logout-button">
            <LogOut size={17} />
            <span>Sign out</span>
          </button>
        )}
      </div>
    </aside>
  );
}