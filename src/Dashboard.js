import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import WalletContext from "./WalletContext";

function Dashboard() {
  const {
    wallet,
    balance = 3,
    transactions = [],
    exchangeRates,
  } = useContext(WalletContext);
  const [chartData, setChartData] = useState([]);
  const [timeFrame, setTimeFrame] = useState("1d");
  const [marketStats, setMarketStats] = useState({
    priceChange24h: "+234.42%",
    marketCap: "$2.72T",
    volume24h: "$28.7B",
    allTimeHigh: "$140,268.75",
    dominance: "43.2%",
  });

  // Generate historical chart data
  useEffect(() => {
    const generateChartData = () => {
      const now = new Date();
      const data = [];

      // Number of data points based on timeframe
      const dataPoints =
        timeFrame === "1d"
          ? 24
          : timeFrame === "1w"
          ? 7
          : timeFrame === "1m"
          ? 30
          : 365;

      // Time interval in milliseconds
      const interval =
        timeFrame === "1d"
          ? 60 * 60 * 1000
          : timeFrame === "1w"
          ? 24 * 60 * 60 * 1000
          : timeFrame === "1m"
          ? 24 * 60 * 60 * 1000
          : 24 * 60 * 60 * 1000;

      // Base price around current BTC price with some historical movement
      // Use the value from context or default to 140268.75
      const basePrice = exchangeRates?.usd || 140268.75;

      for (let i = dataPoints - 1; i >= 0; i--) {
        const date = new Date(now.getTime() - i * interval);

        // Simulate price movement with some randomness
        // More volatility in shorter timeframes
        const volatility =
          timeFrame === "1d"
            ? 0.015
            : timeFrame === "1w"
            ? 0.035
            : timeFrame === "1m"
            ? 0.08
            : 0.2;

        // Generate a slightly trended random walk
        const randomFactor = (Math.random() - 0.48) * volatility;
        const trend = ((dataPoints - i) / dataPoints) * 0.1; // Slight upward trend over time

        let price;
        if (i === dataPoints - 1) {
          price = basePrice * 0.7; // Start from lower price for uptrend
        } else {
          price = data[data.length - 1].price * (1 + randomFactor + trend);
        }

        // For the last point, use the exact price
        if (i === 0) {
          price = basePrice;
        }

        data.push({
          date: date.toISOString(),
          price: price,
        });
      }

      setChartData(data);
    };

    generateChartData();
  }, [timeFrame, exchangeRates?.usd]); // Use optional chaining here

  return (
    <div className="dashboard-container">
      <h1 style={{ marginBottom: "30px" }}>Dashboard</h1>

      <div
        className="stats-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div
          className="card"
          style={{
            background: "var(--gradient-primary)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <div>
            <h3
              style={{ marginBottom: "5px", color: "rgba(255, 255, 255, 0.8)" }}
            >
              Bitcoin Balance
            </h3>
            <p
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                margin: "10px 0",
                color: "white",
              }}
            >
              {balance.toFixed(8)} BTC
            </p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p style={{ margin: 0, color: "rgba(255, 255, 255, 0.8)" }}>
              $
              {exchangeRates?.usd
                ? (balance * exchangeRates.usd).toLocaleString()
                : (balance * 140268.75).toLocaleString()}
            </p>
            <Link
              to="/wallet"
              style={{
                color: "white",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Manage →
            </Link>
          </div>
        </div>

        <div className="card" style={{ padding: "20px", borderRadius: "10px" }}>
          <h3 style={{ marginBottom: "10px" }}>Recent Activity</h3>
          {transactions && transactions.length > 0 ? (
            <div className="transactions-list">
              {transactions.slice(0, 3).map((tx) => (
                <div
                  key={tx.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px",
                    padding: "10px",
                    borderRadius: "8px",
                    background: "rgba(255, 255, 255, 0.05)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "20px",
                        color:
                          tx.type === "receive"
                            ? "var(--accent-secondary)"
                            : "var(--accent-primary)",
                      }}
                    >
                      {tx.type === "receive"
                        ? "↓"
                        : tx.type === "stake"
                        ? "🔒"
                        : "↑"}
                    </span>
                    <div>
                      <p style={{ margin: 0, fontWeight: "bold" }}>
                        {tx.type === "receive"
                          ? "Received"
                          : tx.type === "stake"
                          ? "Staked"
                          : "Sent"}
                      </p>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "12px",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {new Date(tx.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p
                      style={{
                        margin: 0,
                        fontWeight: "bold",
                        color:
                          tx.type === "receive"
                            ? "var(--accent-secondary)"
                            : "var(--text-primary)",
                      }}
                    >
                      {tx.type === "receive" ? "+" : "-"}
                      {tx.amount.toFixed(8)} BTC
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "12px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {tx.confirmations} confirmation
                      {tx.confirmations !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No recent transactions</p>
          )}
          <Link
            to="/wallet"
            style={{
              display: "block",
              textAlign: "center",
              marginTop: "10px",
              color: "var(--accent-primary)",
              textDecoration: "none",
            }}
          >
            View all transactions
          </Link>
        </div>

        <div className="card" style={{ padding: "20px", borderRadius: "10px" }}>
          <h3 style={{ marginBottom: "10px" }}>Quick Actions</h3>
          <div
            className="actions-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "10px",
            }}
          >
            <Link
              to="/wallet"
              className="action-btn"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "15px",
                borderRadius: "8px",
                background: "rgba(255, 255, 255, 0.05)",
                textDecoration: "none",
                color: "var(--text-primary)",
                transition: "transform 0.2s ease",
              }}
            >
              <span style={{ fontSize: "24px", marginBottom: "5px" }}>↑</span>
              <span>Send</span>
            </Link>

            <Link
              to="/wallet"
              className="action-btn"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "15px",
                borderRadius: "8px",
                background: "rgba(255, 255, 255, 0.05)",
                textDecoration: "none",
                color: "var(--text-primary)",
                transition: "transform 0.2s ease",
              }}
            >
              <span style={{ fontSize: "24px", marginBottom: "5px" }}>↓</span>
              <span>Receive</span>
            </Link>

            <Link
              to="/staking"
              className="action-btn"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "15px",
                borderRadius: "8px",
                background: "rgba(255, 255, 255, 0.05)",
                textDecoration: "none",
                color: "var(--text-primary)",
                transition: "transform 0.2s ease",
              }}
            >
              <span style={{ fontSize: "24px", marginBottom: "5px" }}>🔒</span>
              <span>Stake</span>
            </Link>

            <Link
              to="/trading"
              className="action-btn"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "15px",
                borderRadius: "8px",
                background: "rgba(255, 255, 255, 0.05)",
                textDecoration: "none",
                color: "var(--text-primary)",
                transition: "transform 0.2s ease",
              }}
            >
              <span style={{ fontSize: "24px", marginBottom: "5px" }}>📈</span>
              <span>Trade</span>
            </Link>
          </div>
        </div>
      </div>

      <div
        className="card"
        style={{
          marginBottom: "30px",
          padding: "20px",
          borderRadius: "10px",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ margin: 0 }}>Bitcoin Price</h2>
          <div
            className="time-selector"
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            {["1d", "1w", "1m", "1y"].map((period) => (
              <button
                key={period}
                onClick={() => setTimeFrame(period)}
                style={{
                  padding: "5px 10px",
                  borderRadius: "5px",
                  border: "none",
                  background:
                    timeFrame === period
                      ? "var(--accent-primary)"
                      : "rgba(255, 255, 255, 0.05)",
                  color: timeFrame === period ? "white" : "var(--text-primary)",
                  cursor: "pointer",
                }}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        <div
          className="price-chart"
          style={{
            height: "300px",
            position: "relative",
            marginBottom: "20px",
          }}
        >
          {/* Simplified chart representation */}
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "flex-end",
              gap: "2px",
            }}
          >
            {chartData.map((dataPoint, index) => {
              const maxPrice = Math.max(...chartData.map((d) => d.price));
              const minPrice = Math.min(...chartData.map((d) => d.price));
              const range = maxPrice - minPrice;
              const heightPercentage =
                ((dataPoint.price - minPrice) / range) * 100;

              // Set a min height for better visualization
              const barHeight = Math.max(10, heightPercentage);

              // Determine if price is increasing or decreasing
              const increasing =
                index > 0 && dataPoint.price > chartData[index - 1].price;

              return (
                <div
                  key={index}
                  style={{
                    flex: 1,
                    height: `${barHeight}%`,
                    backgroundColor: increasing
                      ? "var(--accent-secondary)"
                      : "var(--accent-primary)",
                    borderRadius: "2px 2px 0 0",
                    minWidth: "3px",
                    maxWidth: "20px",
                    transition: "height 0.3s ease",
                  }}
                ></div>
              );
            })}
          </div>

          {/* Price labels */}
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <p style={{ margin: 0, fontWeight: "bold", fontSize: "24px" }}>
              $
              {exchangeRates?.usd
                ? exchangeRates.usd.toLocaleString()
                : "140,268.75"}
            </p>
            <p
              style={{
                margin: 0,
                color: "var(--accent-secondary)",
                fontWeight: "bold",
              }}
            >
              ↑ 234.42%
            </p>
          </div>
        </div>

        <div
          className="market-stats"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <div>
            <p
              style={{
                margin: 0,
                color: "var(--text-secondary)",
                fontSize: "14px",
              }}
            >
              24h Change
            </p>
            <p
              style={{
                margin: 0,
                fontWeight: "bold",
                color: marketStats.priceChange24h.startsWith("+")
                  ? "var(--accent-secondary)"
                  : "var(--accent-danger)",
              }}
            >
              {marketStats.priceChange24h}
            </p>
          </div>
          <div>
            <p
              style={{
                margin: 0,
                color: "var(--text-secondary)",
                fontSize: "14px",
              }}
            >
              Market Cap
            </p>
            <p style={{ margin: 0, fontWeight: "bold" }}>
              {marketStats.marketCap}
            </p>
          </div>
          <div>
            <p
              style={{
                margin: 0,
                color: "var(--text-secondary)",
                fontSize: "14px",
              }}
            >
              24h Volume
            </p>
            <p style={{ margin: 0, fontWeight: "bold" }}>
              {marketStats.volume24h}
            </p>
          </div>
          <div>
            <p
              style={{
                margin: 0,
                color: "var(--text-secondary)",
                fontSize: "14px",
              }}
            >
              All-Time High
            </p>
            <p style={{ margin: 0, fontWeight: "bold" }}>
              {marketStats.allTimeHigh}
            </p>
          </div>
          <div>
            <p
              style={{
                margin: 0,
                color: "var(--text-secondary)",
                fontSize: "14px",
              }}
            >
              BTC Dominance
            </p>
            <p style={{ margin: 0, fontWeight: "bold" }}>
              {marketStats.dominance}
            </p>
          </div>
        </div>
      </div>

      <div
        className="features-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div className="card" style={{ padding: "20px", borderRadius: "10px" }}>
          <h3>Bitcoin Staking</h3>
          <p style={{ color: "var(--text-secondary)" }}>
            Earn passive income with our secure staking options.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "15px",
            }}
          >
            <div>
              <p
                style={{
                  margin: 0,
                  color: "var(--text-secondary)",
                  fontSize: "14px",
                }}
              >
                APY
              </p>
              <p
                style={{
                  margin: 0,
                  fontWeight: "bold",
                  color: "var(--accent-secondary)",
                }}
              >
                Up to 8.5%
              </p>
            </div>
            <Link
              to="/staking"
              className="btn"
              style={{
                background: "var(--gradient-primary)",
                color: "white",
                textDecoration: "none",
                padding: "8px 15px",
                borderRadius: "8px",
                fontWeight: "bold",
              }}
            >
              Start Staking
            </Link>
          </div>
        </div>

        <div className="card" style={{ padding: "20px", borderRadius: "10px" }}>
          <h3>Bitcoin Betting</h3>
          <p style={{ color: "var(--text-secondary)" }}>
            Bet on market trends and events directly with Bitcoin.
          </p>
          <div
            style={{
              marginTop: "15px",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "var(--text-secondary)",
                fontSize: "14px",
              }}
            >
              Hot Topics
            </p>
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "5px",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  padding: "5px 10px",
                  borderRadius: "15px",
                  background: "rgba(255, 255, 255, 0.05)",
                  fontSize: "12px",
                }}
              >
                ETF Approval
              </span>
              <span
                style={{
                  padding: "5px 10px",
                  borderRadius: "15px",
                  background: "rgba(255, 255, 255, 0.05)",
                  fontSize: "12px",
                }}
              >
                Trump Tariffs
              </span>
              <span
                style={{
                  padding: "5px 10px",
                  borderRadius: "15px",
                  background: "rgba(255, 255, 255, 0.05)",
                  fontSize: "12px",
                }}
              >
                Halving Impact
              </span>
            </div>
          </div>
          <Link
            to="/betting"
            style={{
              display: "inline-block",
              marginTop: "15px",
              color: "var(--accent-primary)",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Explore bets →
          </Link>
        </div>

        <div className="card" style={{ padding: "20px", borderRadius: "10px" }}>
          <h3>Lightning Network</h3>
          <p style={{ color: "var(--text-secondary)" }}>
            Connect unused GPUs to create a private computing network.
          </p>
          <div
            style={{
              display: "flex",
              gap: "15px",
              marginTop: "15px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                flex: 1,
                minWidth: "120px",
                padding: "15px",
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <h4 style={{ margin: 0, color: "var(--accent-primary)" }}>
                Rent GPUs
              </h4>
              <p style={{ margin: "5px 0 0 0", fontSize: "12px" }}>
                From $5/hour
              </p>
            </div>
            <div
              style={{
                flex: 1,
                minWidth: "120px",
                padding: "15px",
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <h4 style={{ margin: 0, color: "var(--accent-secondary)" }}>
                Provide GPUs
              </h4>
              <p style={{ margin: "5px 0 0 0", fontSize: "12px" }}>
                Earn up to $20/hour
              </p>
            </div>
          </div>
          <Link
            to="/lightning"
            style={{
              display: "inline-block",
              marginTop: "15px",
              color: "var(--accent-primary)",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Connect now →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
