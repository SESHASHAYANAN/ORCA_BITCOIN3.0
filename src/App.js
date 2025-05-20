import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Wallet from "./Wallet";
import Staking from "./Staking";
import Betting from "./Betting";
import Trading from "./Trading";
import BillPayment from "./BillPayment";
import LightningNetwork from "./LightningNetwork";
import AITools from "./AITools";
import WalletContext from "./WalletContext";
import ThreatDetection from "./ThreatDetection";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "./styles.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [wallet, setWallet] = useState(null);
  const [bitcoinPrice, setBitcoinPrice] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("orca-token");
    if (token) {
      setIsAuthenticated(true);
    }

    const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@ticker");
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setBitcoinPrice(parseFloat(data.c).toFixed(2));
    };

    return () => ws.close();
  }, []);

  const handleLogin = (walletData) => {
    setWallet(walletData);
    setIsAuthenticated(true);
    localStorage.setItem("orca-token", "bitcoin-user-auth-token");
  };

  const handleLogout = () => {
    setWallet(null);
    setIsAuthenticated(false);
    localStorage.removeItem("orca-token");
  };

  return (
    <WalletContext.Provider value={{ wallet, setWallet, bitcoinPrice }}>
      <div className={`app ${darkMode ? "dark-theme" : "light-theme"}`}>
        {isAuthenticated && <Sidebar />}
        {isAuthenticated && (
          <Header
            onLogout={handleLogout}
            toggleTheme={() => setDarkMode(!darkMode)}
            bitcoinPrice={bitcoinPrice}
          />
        )}

        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                !isAuthenticated ? (
                  <Login onLogin={handleLogin} />
                ) : (
                  <Navigate to="/dashboard" />
                )
              }
            />
            <Route
              path="/dashboard"
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
            />
            <Route
              path="/wallet"
              element={isAuthenticated ? <Wallet /> : <Navigate to="/" />}
            />
            <Route
              path="/staking"
              element={isAuthenticated ? <Staking /> : <Navigate to="/" />}
            />
            <Route
              path="/betting"
              element={isAuthenticated ? <Betting /> : <Navigate to="/" />}
            />
            <Route
              path="/trading"
              element={isAuthenticated ? <Trading /> : <Navigate to="/" />}
            />
            <Route
              path="/bills"
              element={isAuthenticated ? <BillPayment /> : <Navigate to="/" />}
            />
            <Route
              path="/lightning"
              element={
                isAuthenticated ? <LightningNetwork /> : <Navigate to="/" />
              }
            />
            <Route
              path="/ai-tools"
              element={isAuthenticated ? <AITools /> : <Navigate to="/" />}
            />
            <Route
              path="/threat-detection"
              element={
                isAuthenticated ? <ThreatDetection /> : <Navigate to="/" />
              }
            />
          </Routes>
        </main>
      </div>
    </WalletContext.Provider>
  );
}

export default App;
