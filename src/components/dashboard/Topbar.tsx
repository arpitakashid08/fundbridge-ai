import {
  Search,
  Bell,
  Command,
  Plus,
} from "lucide-react";

export default function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-search">
        <Search size={17} />

        <input
          type="text"
          placeholder="Search funding, schemes, investors..."
        />

        <div className="search-shortcut">
          <Command size={12} />
          <span>K</span>
        </div>
      </div>

      <div className="topbar-actions">
        <button className="quick-add">
          <Plus size={16} />
          <span>New application</span>
        </button>

        <button className="icon-button">
          <Bell size={18} />
          <span className="notification-dot" />
        </button>

        <div className="topbar-avatar">
          A
        </div>
      </div>
    </header>
  );
}