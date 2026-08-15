import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./dashboard-shell.css";

export default function DashboardShell() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="dashboard-shell">

      <aside className={`dashboard-sidebar ${mobileMenuOpen ? "mobile-open" : ""}`}>
        <Sidebar onNavigate={() => setMobileMenuOpen(false)} />
      </aside>

      {mobileMenuOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div className="dashboard-content">

        <header className="dashboard-header">

          <button
            className="mobile-menu-button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            ☰
          </button>

          <div className="dashboard-breadcrumb">
            <span>FundBridge</span>
            <span>/</span>
            <strong>Workspace</strong>
          </div>

          <div className="dashboard-header-actions">

            <div className="dashboard-search">
              <span>⌕</span>
              <input
                type="text"
                placeholder="Search funding opportunities"
              />
              <small>⌘ K</small>
            </div>

            <button className="header-icon-button">
              ◇
            </button>

            <button className="header-profile-button">
              A
            </button>

          </div>

        </header>

        <main className="dashboard-main">
          <Outlet />
        </main>

      </div>

    </div>
  );
}
