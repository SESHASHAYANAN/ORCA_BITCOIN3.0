import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [loginMethod, setLoginMethod] = useState("wallet");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleWalletConnect = async () => {
    setLoading(true);
    setError("");

    try {
      // Simulate Bitcoin wallet connection
      setTimeout(() => {
        // Mock wallet data
        const walletData = {
          address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
          balance: 2.34567,
          network: "mainnet",
        };

        onLogin(walletData);
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      setError("Failed to connect wallet. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="login-container"
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--gradient-background)",
      }}
    >
      <div
        className="card"
        style={{
          width: "400px",
          maxWidth: "90%",
          textAlign: "center",
          animation: "fadeIn 0.5s ease-out",
        }}
      >
        <div
          className="logo"
          style={{
            marginBottom: "30px",
          }}
        >
          <h1
            style={{
              background: "var(--gradient-primary)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "42px",
            }}
          >
            ORCA
          </h1>
          <p>The ultimate Bitcoin platform</p>
        </div>

        <div
          className="login-options"
          style={{
            marginBottom: "30px",
          }}
        >
          <div
            className="tabs"
            style={{
              display: "flex",
              marginBottom: "20px",
            }}
          >
            <button
              className={`tab ${loginMethod === "wallet" ? "active" : ""}`}
              onClick={() => setLoginMethod("wallet")}
              style={{
                flex: 1,
                padding: "10px",
                background:
                  loginMethod === "wallet"
                    ? "var(--accent-primary)"
                    : "transparent",
                border: "none",
                cursor: "pointer",
                color: "white",
                borderRadius: "8px 0 0 8px",
              }}
            >
              Connect Wallet
            </button>
            <button
              className={`tab ${loginMethod === "credentials" ? "active" : ""}`}
              onClick={() => setLoginMethod("credentials")}
              style={{
                flex: 1,
                padding: "10px",
                background:
                  loginMethod === "credentials"
                    ? "var(--accent-primary)"
                    : "transparent",
                border: "none",
                cursor: "pointer",
                color: "white",
                borderRadius: "0 8px 8px 0",
              }}
            >
              Login
            </button>
          </div>

          {loginMethod === "wallet" ? (
            <div className="wallet-options">
              <button
                className="btn wallet-btn"
                onClick={handleWalletConnect}
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "15px",
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                {loading ? (
                  <span className="spinner"></span>
                ) : (
                  <>
                    <span className="wallet-icon">₿</span>
                    <span>Connect Bitcoin Wallet</span>
                  </>
                )}
              </button>

              {error && (
                <p
                  className="error-message"
                  style={{ color: "var(--accent-danger)" }}
                >
                  {error}
                </p>
              )}

              <div
                className="supported-wallets"
                style={{
                  marginTop: "20px",
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                }}
              >
                <p>Supported wallets:</p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "15px",
                    marginTop: "10px",
                  }}
                >
                  <span>Muun</span>
                  <span>BlueWallet</span>
                  <span>Ledger</span>
                  <span>Trezor</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="credentials-login">
              <input type="email" placeholder="Email address" />
              <input type="password" placeholder="Password" />
              <button
                className="btn"
                style={{ width: "100%", marginTop: "10px" }}
              >
                Login
              </button>

              <div
                style={{
                  marginTop: "15px",
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                }}
              >
                <a
                  href="#forgot"
                  style={{
                    color: "var(--accent-primary)",
                    textDecoration: "none",
                  }}
                >
                  Forgot password?
                </a>
              </div>
            </div>
          )}
        </div>

        <div
          className="create-account"
          style={{
            borderTop: "1px solid var(--border-color)",
            paddingTop: "20px",
          }}
        >
          <p style={{ marginBottom: "15px" }}>Don't have an account?</p>
          <button className="btn btn-outline" style={{ width: "100%" }}>
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
