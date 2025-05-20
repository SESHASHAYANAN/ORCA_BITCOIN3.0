import React, { useContext, useState } from "react";
import WalletContext from "./WalletContext";

function Header({ onLogout, toggleTheme }) {
  const { wallet, balance, exchangeRates } = useContext(WalletContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "transaction",
      message: "You received 0.025 BTC",
      time: "2 min ago",
      read: false,
    },
    {
      id: 2,
      type: "security",
      message: "New login from Chrome on Windows",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      type: "price",
      message: "BTC price increased by 5% in the last 24h",
      time: "6 hours ago",
      read: true,
    },
  ]);

  const [showNotifications, setShowNotifications] = useState(false);

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header
      className="header"
      style={{
        height: "70px",
        position: "sticky",
        top: 0,
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(30, 30, 30, 0.8)",
      }}
    >
      <div className="search-container" style={{ width: "300px" }}>
        <input
          type="text"
          placeholder="Search..."
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid var(--border-color)",
            borderRadius: "20px",
            padding: "8px 15px",
            width: "100%",
            color: "var(--text-primary)",
            margin: 0,
          }}
        />
      </div>

      <div
        className="header-right"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div
          className="wallet-status"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            className="bitcoin-amount"
            style={{
              padding: "6px 12px",
              background: "var(--card-bg)",
              borderRadius: "20px",
              border: "1px solid var(--border-color)",
            }}
          >
            <span
              style={{ fontWeight: "bold", color: "var(--accent-primary)" }}
            >
              {balance ? balance.toFixed(8) : "0.00000000"} BTC
            </span>
            {balance && exchangeRates.usd && (
              <span
                style={{
                  marginLeft: "5px",
                  fontSize: "12px",
                  color: "var(--text-secondary)",
                }}
              >
                (${(balance * exchangeRates.usd).toFixed(2)})
              </span>
            )}
          </div>
        </div>

        <div
          className="notifications-container"
          style={{ position: "relative" }}
        >
          <button
            className="notification-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--text-primary)",
              fontSize: "20px",
              cursor: "pointer",
              position: "relative",
            }}
          >
            🔔
            {unreadCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-5px",
                  background: "var(--accent-danger)",
                  color: "white",
                  borderRadius: "50%",
                  width: "18px",
                  height: "18px",
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div
              className="notifications-dropdown"
              style={{
                position: "absolute",
                top: "40px",
                right: "0",
                width: "300px",
                maxHeight: "400px",
                overflowY: "auto",
                background: "var(--card-bg)",
                borderRadius: "8px",
                boxShadow: "var(--shadow)",
                border: "1px solid var(--border-color)",
                zIndex: 100,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 15px",
                  borderBottom: "1px solid var(--border-color)",
                }}
              >
                <h3>Notifications</h3>
                <button
                  onClick={markAllRead}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "var(--accent-primary)",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  Mark all read
                </button>
              </div>

              <div>
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    style={{
                      padding: "10px 15px",
                      borderBottom: "1px solid var(--border-color)",
                      backgroundColor: notification.read
                        ? "transparent"
                        : "rgba(0, 112, 243, 0.05)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span style={{ fontSize: "20px" }}>
                        {notification.type === "transaction"
                          ? "💰"
                          : notification.type === "security"
                          ? "🔐"
                          : "📈"}
                      </span>
                      <div>
                        <p style={{ margin: 0 }}>{notification.message}</p>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "12px",
                            color: "var(--text-secondary)",
                          }}
                        >
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={toggleTheme}
          style={{
            background: "transparent",
            border: "none",
            color: "var(--text-primary)",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          🌓
        </button>

        <div className="profile-dropdown" style={{ position: "relative" }}>
          <button
            className="profile-btn"
            onClick={() => setShowDropdown(!showDropdown)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              className="avatar"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "var(--gradient-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                color: "white",
              }}
            >
              {wallet ? wallet.address.substring(0, 2) : "U"}
            </div>
            <span style={{ color: "var(--text-primary)" }}>
              {wallet
                ? `${wallet.address.substring(
                    0,
                    6
                  )}...${wallet.address.substring(wallet.address.length - 4)}`
                : "User"}
            </span>
          </button>

          {showDropdown && (
            <div
              className="dropdown-menu"
              style={{
                position: "absolute",
                top: "50px",
                right: "0",
                background: "var(--card-bg)",
                borderRadius: "8px",
                boxShadow: "var(--shadow)",
                border: "1px solid var(--border-color)",
                width: "200px",
                zIndex: 100,
              }}
            >
              <ul style={{ listStyle: "none", padding: "10px 0", margin: 0 }}>
                <li>
                  <a
                    href="#profile"
                    style={{
                      display: "block",
                      padding: "10px 15px",
                      color: "var(--text-primary)",
                      textDecoration: "none",
                    }}
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <a
                    href="#settings"
                    style={{
                      display: "block",
                      padding: "10px 15px",
                      color: "var(--text-primary)",
                      textDecoration: "none",
                    }}
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#support"
                    style={{
                      display: "block",
                      padding: "10px 15px",
                      color: "var(--text-primary)",
                      textDecoration: "none",
                    }}
                  >
                    Support
                  </a>
                </li>
                <li
                  style={{
                    borderTop: "1px solid var(--border-color)",
                    marginTop: "5px",
                  }}
                >
                  <button
                    onClick={onLogout}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: "10px 15px",
                      background: "transparent",
                      border: "none",
                      color: "var(--accent-danger)",
                      cursor: "pointer",
                    }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
