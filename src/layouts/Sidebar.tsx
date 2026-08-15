import { NavLink } from "react-router-dom";

interface SidebarProps {
  onNavigate?: () => void;
}

export default function Sidebar({ onNavigate }: SidebarProps) {
  const workspaceItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: "⌂",
    },
    {
      label: "Funding Discovery",
      path: "/funding-discovery",
      icon: "◇",
    },
    {
      label: "AI Strategist",
      path: "/ai-strategist",
      icon: "✦",
    },
    {
      label: "Grants",
      path: "/grants",
      icon: "◇",
    },
    {
      label: "Loans",
      path: "/loans",
      icon: "₹",
    },
    {
      label: "Investors",
      path: "/investors",
      icon: "◎",
    },
    {
      label: "Government Schemes",
      path: "/schemes",
      icon: "▱",
    },
    {
      label: "Applications",
      path: "/applications",
      icon: "✓",
    },
    {
      label: "Documents",
      path: "/documents",
      icon: "□",
    },
    {
      label: "Analytics",
      path: "/analytics",
      icon: "⌁",
    },
  ];

  const accountItems = [
    {
      label: "Profile",
      path: "/profile",
      icon: "◉",
    },
    {
      label: "Settings",
      path: "/settings",
      icon: "⚙",
    },
  ];

  return (
    <div className="sidebar-inner">

      {/* BRAND */}
      <div className="sidebar-brand">

        <span className="sidebar-brand-symbol">
          ✦
        </span>

        <div className="sidebar-brand-text">
          <strong>FUNDBRIDGE</strong>
          <span>AI</span>
        </div>

      </div>

      {/* WORKSPACE */}
      <div className="sidebar-section">

        <p className="sidebar-section-title">
          WORKSPACE
        </p>

        <nav className="sidebar-nav">

          {workspaceItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onNavigate}
              className={({ isActive }) =>
                `sidebar-link ${
                  isActive ? "active" : ""
                }`
              }
            >
              <span className="sidebar-icon">
                {item.icon}
              </span>

              <span>{item.label}</span>
            </NavLink>
          ))}

        </nav>

      </div>

      {/* ACCOUNT */}
      <div className="sidebar-section sidebar-account">

        <p className="sidebar-section-title">
          ACCOUNT
        </p>

        <nav className="sidebar-nav">

          {accountItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onNavigate}
              className={({ isActive }) =>
                `sidebar-link ${
                  isActive ? "active" : ""
                }`
              }
            >
              <span className="sidebar-icon">
                {item.icon}
              </span>

              <span>{item.label}</span>
            </NavLink>
          ))}

        </nav>

      </div>

    </div>
  );
}