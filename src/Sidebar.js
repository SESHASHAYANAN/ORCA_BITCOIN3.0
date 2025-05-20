import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { path: "/dashboard", icon: "📊", label: "Dashboard" },
    { path: "/wallet", icon: "💼", label: "Wallet" },
    { path: "/staking", icon: "🔒", label: "Staking" },
    { path: "/betting", icon: "🎲", label: "Betting" },
    { path: "/trading", icon: "📈", label: "Trading" },
    { path: "/bills", icon: "📝", label: "Pay Bills" },
    { path: "/lightning", icon: "⚡", label: "Lightning Network" },
    { path: "/ai-tools", icon: "🧠", label: "AI Tools" },
    { path: "/threat-detection", icon: "🛡️", label: "Threat Detection" },
  ];

  return (
    <div
      className={`sidebar ${collapsed ? "collapsed" : ""}`}
      style={{
        width: collapsed ? "70px" : "260px",
        transition: "width 0.3s ease",
      }}
    >
      <div
        className="logo"
        style={{
          padding: "20px 0",
          textAlign: "center",
          borderBottom: "1px solid var(--border-color)",
          marginBottom: "20px",
        }}
      >
        <h1
          style={{
            fontSize: collapsed ? "24px" : "32px",
            background: "var(--gradient-primary)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {collapsed ? "O" : "ORCA"}
        </h1>
      </div>

      <div
        className="menu-toggle"
        style={{
          textAlign: "right",
          padding: "0 20px",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            background: "transparent",
            border: "none",
            color: "var(--text-secondary)",
            cursor: "pointer",
          }}
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>

      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 20px",
                  color:
                    location.pathname === item.path
                      ? "var(--accent-primary)"
                      : "var(--text-primary)",
                  textDecoration: "none",
                  borderLeft:
                    location.pathname === item.path
                      ? "4px solid var(--accent-primary)"
                      : "4px solid transparent",
                  background:
                    location.pathname === item.path
                      ? "rgba(0, 112, 243, 0.1)"
                      : "transparent",
                  transition: "background 0.2s ease",
                }}
              >
                <span style={{ marginRight: "12px", fontSize: "20px" }}>
                  {item.icon}
                </span>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div
        className="sidebar-footer"
        style={{
          position: "absolute",
          bottom: "20px",
          left: 0,
          right: 0,
          padding: "0 20px",
          borderTop: "1px solid var(--border-color)",
          paddingTop: "20px",
          textAlign: "center",
        }}
      >
        {!collapsed && (
          <>
            <div
              className="bitcoin-price"
              style={{
                marginBottom: "10px",
                fontSize: "14px",
                color: "var(--text-secondary)",
              }}
            >
              <p>BTC Price</p>
              <p
                style={{
                  color: "var(--accent-primary)",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                $43,256.78
              </p>
            </div>
            <div
              className="network-status"
              style={{
                fontSize: "12px",
                color: "var(--text-secondary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
              }}
            >
              <span
                className="status-dot"
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "var(--accent-secondary)",
                }}
              ></span>
              <span>Network: Healthy</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
