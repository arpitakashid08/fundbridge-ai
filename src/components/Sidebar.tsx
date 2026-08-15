import { NavLink } from "react-router-dom";

const navigation = [
  { label: "Dashboard", path: "/dashboard", icon: "⌂" },
  { label: "Funding Discovery", path: "/funding-discovery", icon: "◇" },
  { label: "AI Strategist", path: "/ai-strategist", icon: "✦" },
  { label: "Grants", path: "/grants", icon: "◇" },
  { label: "Loans", path: "/loans", icon: "₹" },
  { label: "Investors", path: "/investors", icon: "◎" },
  { label: "Government Schemes", path: "/schemes", icon: "▱" },
  { label: "Applications", path: "/applications", icon: "✓" },
  { label: "Documents", path: "/documents", icon: "□" },
  { label: "Analytics", path: "/analytics", icon: "⌁" },
];

const accountNavigation = [
  { label: "Profile", path: "/profile", icon: "◉" },
  { label: "Settings", path: "/settings", icon: "⚙" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-mark">✦</div>

        <div className="logo-text">
          <strong>FUNDBRIDGE</strong>
          <span>AI</span>
        </div>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-heading">WORKSPACE</p>

        <nav className="sidebar-nav">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="sidebar-section account-section">
        <p className="sidebar-heading">ACCOUNT</p>

        <nav className="sidebar-nav">
          {accountNavigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="sidebar-user">
        <div className="user-avatar">A</div>

        <div className="user-info">
          <strong>Arpita Startup</strong>
          <span>Startup account</span>
        </div>
      </div>
    </aside>
  );
}