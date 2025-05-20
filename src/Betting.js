import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import WalletContext from "./WalletContext";

// New component for detailed betting option
const BettingOptionDetail = ({
  event,
  option,
  handleAddToBetSlip,
  handleReadSituation,
}) => {
  return (
    <div
      className="betting-option-detail"
      style={{
        background: "rgba(30, 30, 40, 0.7)",
        borderRadius: "12px",
        padding: "20px",
        border: "1px solid rgba(90, 100, 255, 0.3)",
        marginBottom: "15px",
        transition: "transform 0.2s ease",
        position: "relative",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-5px)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <h4 style={{ margin: "0" }}>
          {option.icon || "🔮"} {option.name}
        </h4>
        <span
          style={{
            background: "var(--accent-primary)",
            color: "white",
            borderRadius: "8px",
            padding: "6px 12px",
            fontWeight: "bold",
          }}
        >
          {option.odds}x
        </span>
      </div>

      <p
        style={{
          fontSize: "14px",
          color: "var(--text-secondary)",
          marginBottom: "15px",
        }}
      >
        {option.analysis || "Analysis not available"}
      </p>

      <div className="community-sentiment" style={{ marginBottom: "15px" }}>
        <p
          style={{
            fontSize: "14px",
            marginBottom: "5px",
            color: "var(--text-secondary)",
          }}
        >
          👥 Community Sentiment:
        </p>
        <div
          className="sentiment-bars"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <div
            style={{
              flex: option.sentiment?.positive || 5,
              height: "6px",
              background: "#4cd964",
              borderRadius: "3px",
            }}
          ></div>
          <div
            style={{
              flex: option.sentiment?.neutral || 3,
              height: "6px",
              background: "#ffcc00",
              borderRadius: "3px",
            }}
          ></div>
          <div
            style={{
              flex: option.sentiment?.negative || 2,
              height: "6px",
              background: "#ff3b30",
              borderRadius: "3px",
            }}
          ></div>
          <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
            {option.sentiment ? option.sentiment.positive * 10 : 50}% positive
          </span>
        </div>
      </div>

      <div
        className="progress-container"
        style={{
          height: "8px",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "4px",
          overflow: "hidden",
          marginBottom: "10px",
        }}
      >
        <div
          className="progress-bar"
          style={{
            height: "100%",
            width: `${option.percentage}%`,
            background: "var(--gradient-primary)",
          }}
        ></div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
          Win probability: {option.percentage}%
        </span>
        <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
          Volume: {option.volume || (event.totalBets / 2).toFixed(2)} BTC
        </span>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={() => handleAddToBetSlip(event, option)}
          className="btn"
          style={{ flex: "1" }}
        >
          Place Bet
        </button>

        <button
          onClick={() => handleReadSituation(event, option)}
          className="btn btn-outline"
          style={{ flex: "1" }}
        >
          Read Situation
        </button>
      </div>
    </div>
  );
};

// New component for situation popup
const EventSituationPopup = ({ event, option, onClose }) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div
      className="event-situation-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(10, 10, 15, 0.85)",
        backdropFilter: "blur(5px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1200,
        padding: "20px",
      }}
    >
      <div
        className="event-situation-modal card"
        style={{
          width: "100%",
          maxWidth: "900px",
          maxHeight: "90vh",
          overflow: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px",
          }}
        >
          <h2 style={{ margin: 0 }}>
            {event.categoryEmoji || getCategoryEmoji(event.category)}{" "}
            {event.title}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--text-primary)",
              fontSize: "24px",
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>

        <div
          className="event-tabs"
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "25px",
            borderBottom: "1px solid var(--border-color)",
            paddingBottom: "15px",
          }}
        >
          {["overview", "analysis", "community", "history"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background:
                  activeTab === tab ? "var(--accent-primary)" : "transparent",
                border: "none",
                borderRadius: "8px",
                padding: "8px 16px",
                color: activeTab === tab ? "white" : "var(--text-primary)",
                fontWeight: activeTab === tab ? "bold" : "normal",
                cursor: "pointer",
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="overview-tab">
            <div
              className="event-highlights card"
              style={{ marginBottom: "25px" }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "20px",
                }}
              >
                <div>
                  <p
                    style={{
                      margin: "0",
                      fontSize: "14px",
                      color: "var(--text-secondary)",
                    }}
                  >
                    Category
                  </p>
                  <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                    {event.categoryEmoji || getCategoryEmoji(event.category)}{" "}
                    {event.category}
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      margin: "0",
                      fontSize: "14px",
                      color: "var(--text-secondary)",
                    }}
                  >
                    Closes On
                  </p>
                  <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                    {new Date(event.expiryDate).toLocaleDateString()}
                    {event.timeRemaining ? ` (${event.timeRemaining})` : ""}
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      margin: "0",
                      fontSize: "14px",
                      color: "var(--text-secondary)",
                    }}
                  >
                    Total Pool
                  </p>
                  <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                    {event.totalBets.toFixed(2)} BTC
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      margin: "0",
                      fontSize: "14px",
                      color: "var(--text-secondary)",
                    }}
                  >
                    Participants
                  </p>
                  <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                    {event.participants.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <h3 style={{ marginBottom: "15px" }}>Event Summary</h3>
            <p style={{ marginBottom: "25px" }}>
              {event.detailedDescription || event.description}
            </p>

            <h3 style={{ marginBottom: "15px" }}>Your Selected Prediction</h3>
            <div className="card" style={{ marginBottom: "25px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "15px",
                }}
              >
                <h4
                  style={{
                    margin: "0",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  {option.icon || "🔮"} {option.name}
                </h4>
                <span
                  style={{
                    background: "var(--accent-primary)",
                    color: "white",
                    borderRadius: "8px",
                    padding: "6px 12px",
                    fontWeight: "bold",
                  }}
                >
                  {option.odds}x
                </span>
              </div>
              <p style={{ marginBottom: "15px" }}>
                {option.detailedAnalysis ||
                  option.analysis ||
                  "No detailed analysis available."}
              </p>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span
                  style={{ color: "var(--text-secondary)", fontSize: "14px" }}
                >
                  Current win probability: <b>{option.percentage}%</b>
                </span>
                <span
                  style={{ color: "var(--text-secondary)", fontSize: "14px" }}
                >
                  Volume:{" "}
                  <b>{option.volume || (event.totalBets / 2).toFixed(2)} BTC</b>
                </span>
              </div>
            </div>

            {event.keyFactors && (
              <>
                <h3 style={{ marginBottom: "15px" }}>
                  Key Factors to Consider
                </h3>
                <div className="key-factors" style={{ marginBottom: "25px" }}>
                  {event.keyFactors.map((factor, index) => (
                    <div
                      key={index}
                      className="card"
                      style={{
                        display: "flex",
                        gap: "15px",
                        marginBottom: "15px",
                      }}
                    >
                      <div style={{ fontSize: "24px" }}>{factor.icon}</div>
                      <div>
                        <h4 style={{ margin: "0 0 5px 0" }}>{factor.title}</h4>
                        <p style={{ margin: "0", fontSize: "14px" }}>
                          {factor.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div
              style={{ display: "flex", gap: "15px", justifyContent: "center" }}
            >
              <button className="btn" style={{ padding: "12px 25px" }}>
                Place Bet Now
              </button>
              <button
                className="btn btn-outline"
                style={{ padding: "12px 25px" }}
              >
                Follow This Event
              </button>
            </div>
          </div>
        )}

        {activeTab === "analysis" && (
          <div className="analysis-tab">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                marginBottom: "25px",
              }}
            >
              <div className="card">
                <h3
                  style={{
                    marginBottom: "15px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  📈 Trend Analysis
                </h3>
                <p>
                  {event.trendAnalysis ||
                    "Trend analysis not available for this event."}
                </p>
              </div>

              <div className="card">
                <h3
                  style={{
                    marginBottom: "15px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  🔮 Prediction Models
                </h3>
                <p>
                  {event.predictionModels ||
                    "Prediction models not available for this event."}
                </p>
              </div>
            </div>

            {event.expertOpinions && (
              <>
                <h3 style={{ marginBottom: "15px" }}>Expert Opinions</h3>
                <div
                  className="expert-opinions"
                  style={{ marginBottom: "25px" }}
                >
                  {event.expertOpinions.map((opinion, index) => (
                    <div
                      key={index}
                      className="card"
                      style={{ marginBottom: "15px" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "10px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <div
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                              background: "var(--accent-primary)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: "bold",
                              color: "white",
                            }}
                          >
                            {opinion.expert[0]}
                          </div>
                          <div>
                            <h4 style={{ margin: "0" }}>{opinion.expert}</h4>
                            <p
                              style={{
                                margin: "0",
                                color: "var(--text-secondary)",
                                fontSize: "12px",
                              }}
                            >
                              {opinion.credentials}
                            </p>
                          </div>
                        </div>
                        <div
                          style={{
                            padding: "5px 10px",
                            borderRadius: "20px",
                            background:
                              opinion.prediction === "Yes"
                                ? "rgba(76, 217, 100, 0.2)"
                                : opinion.prediction === "No"
                                ? "rgba(255, 59, 48, 0.2)"
                                : "rgba(255, 204, 0, 0.2)",
                            color:
                              opinion.prediction === "Yes"
                                ? "var(--accent-secondary)"
                                : opinion.prediction === "No"
                                ? "var(--accent-danger)"
                                : "var(--accent-warning)",
                            fontSize: "12px",
                            fontWeight: "bold",
                          }}
                        >
                          Predicts: {opinion.prediction}
                        </div>
                      </div>
                      <p style={{ margin: "0" }}>{opinion.analysis}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {event.historicalComparison && (
              <>
                <h3 style={{ marginBottom: "15px" }}>
                  Historical Data Comparison
                </h3>
                <div className="card" style={{ marginBottom: "25px" }}>
                  <p>{event.historicalComparison}</p>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === "community" && (
          <div className="community-tab">
            {event.communitySentiment && (
              <div
                className="sentiment-overview card"
                style={{ marginBottom: "25px" }}
              >
                <h3 style={{ marginBottom: "15px" }}>Community Sentiment</h3>
                <div
                  style={{ display: "flex", gap: "15px", marginBottom: "20px" }}
                >
                  <div
                    style={{
                      flex: "1",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "15px",
                      background: "rgba(76, 217, 100, 0.1)",
                      borderRadius: "12px",
                    }}
                  >
                    <span style={{ fontSize: "24px", marginBottom: "10px" }}>
                      👍
                    </span>
                    <span
                      style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        color: "var(--accent-secondary)",
                      }}
                    >
                      {event.communitySentiment.positive}%
                    </span>
                    <span style={{ color: "var(--text-secondary)" }}>
                      Positive
                    </span>
                  </div>
                  <div
                    style={{
                      flex: "1",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "15px",
                      background: "rgba(255, 204, 0, 0.1)",
                      borderRadius: "12px",
                    }}
                  >
                    <span style={{ fontSize: "24px", marginBottom: "10px" }}>
                      🤔
                    </span>
                    <span
                      style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        color: "var(--accent-warning)",
                      }}
                    >
                      {event.communitySentiment.neutral}%
                    </span>
                    <span style={{ color: "var(--text-secondary)" }}>
                      Neutral
                    </span>
                  </div>
                  <div
                    style={{
                      flex: "1",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "15px",
                      background: "rgba(255, 59, 48, 0.1)",
                      borderRadius: "12px",
                    }}
                  >
                    <span style={{ fontSize: "24px", marginBottom: "10px" }}>
                      👎
                    </span>
                    <span
                      style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        color: "var(--accent-danger)",
                      }}
                    >
                      {event.communitySentiment.negative}%
                    </span>
                    <span style={{ color: "var(--text-secondary)" }}>
                      Negative
                    </span>
                  </div>
                </div>
                <p>
                  {event.communityOverview ||
                    "No community overview available."}
                </p>
              </div>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h3 style={{ margin: "0" }}>
                Discussion ({event.comments?.length || 0})
              </h3>
              <div style={{ display: "flex", gap: "10px" }}>
                <select
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "8px",
                    padding: "8px 12px",
                    color: "var(--text-primary)",
                    cursor: "pointer",
                  }}
                >
                  <option>Most Recent</option>
                  <option>Most Liked</option>
                  <option>Controversial</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: "25px" }}>
              <textarea
                placeholder="Share your thoughts on this event..."
                style={{
                  width: "100%",
                  minHeight: "100px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "8px",
                  padding: "15px",
                  color: "var(--text-primary)",
                  resize: "vertical",
                  marginBottom: "10px",
                }}
              />
              <button className="btn" style={{ marginTop: "10px" }}>
                Post Comment
              </button>
            </div>

            <div className="comments-list">
              {event.comments?.map((comment, index) => (
                <div
                  key={index}
                  className="card"
                  style={{ marginBottom: "15px" }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          background: "var(--accent-primary)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "bold",
                          color: "white",
                        }}
                      >
                        {comment.user[0]}
                      </div>
                      <div>
                        <h4 style={{ margin: "0" }}>{comment.user}</h4>
                        <p
                          style={{
                            margin: "0",
                            color: "var(--text-secondary)",
                            fontSize: "12px",
                          }}
                        >
                          {comment.time}
                        </p>
                      </div>
                    </div>
                    {comment.stance && (
                      <div
                        style={{
                          padding: "5px 10px",
                          borderRadius: "20px",
                          background:
                            comment.stance === "bullish"
                              ? "rgba(76, 217, 100, 0.2)"
                              : comment.stance === "bearish"
                              ? "rgba(255, 59, 48, 0.2)"
                              : "rgba(255, 204, 0, 0.2)",
                          color:
                            comment.stance === "bullish"
                              ? "var(--accent-secondary)"
                              : comment.stance === "bearish"
                              ? "var(--accent-danger)"
                              : "var(--accent-warning)",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        {comment.stance === "bullish"
                          ? "Bullish"
                          : comment.stance === "bearish"
                          ? "Bearish"
                          : "Neutral"}
                      </div>
                    )}
                  </div>
                  <p style={{ margin: "0 0 15px 0" }}>{comment.text}</p>
                  <div style={{ display: "flex", gap: "15px" }}>
                    <button
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "var(--text-secondary)",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        cursor: "pointer",
                      }}
                    >
                      👍 {comment.likes}
                    </button>
                    <button
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "var(--text-secondary)",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Reply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div className="history-tab">
            <h3 style={{ marginBottom: "15px" }}>Market History</h3>
            <div className="card" style={{ marginBottom: "25px" }}>
              <h4 style={{ marginBottom: "15px" }}>Price Movement</h4>
              <div
                style={{
                  height: "200px",
                  background: "rgba(255, 255, 255, 0.05)",
                  borderRadius: "8px",
                  marginBottom: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p style={{ color: "var(--text-secondary)" }}>
                  Chart placeholder - Price movement over time
                </p>
              </div>
              <p>
                {event.priceMovementAnalysis ||
                  "No price movement analysis available."}
              </p>
            </div>

            {event.significantBets && (
              <>
                <h3 style={{ marginBottom: "15px" }}>
                  Recent Significant Bets
                </h3>
                <div
                  className="significant-bets"
                  style={{ marginBottom: "25px" }}
                >
                  {event.significantBets.map((bet, index) => (
                    <div
                      key={index}
                      className="card"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <div>
                        <p style={{ margin: "0 0 5px 0", fontWeight: "bold" }}>
                          {bet.user}
                        </p>
                        <p
                          style={{
                            margin: "0",
                            color: "var(--text-secondary)",
                            fontSize: "12px",
                          }}
                        >
                          {bet.time}
                        </p>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <p style={{ margin: "0 0 5px 0" }}>{bet.option}</p>
                        <p
                          style={{
                            margin: "0",
                            color: "var(--text-secondary)",
                            fontSize: "12px",
                          }}
                        >
                          Odds: {bet.odds}x
                        </p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <p style={{ margin: "0 0 5px 0", fontWeight: "bold" }}>
                          {bet.amount} BTC
                        </p>
                        <p
                          style={{
                            margin: "0",
                            color: bet.option.includes("Yes")
                              ? "var(--accent-secondary)"
                              : "var(--accent-danger)",
                            fontSize: "12px",
                          }}
                        >
                          Potential: {bet.potential} BTC
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {event.similarEvents && (
              <>
                <h3 style={{ marginBottom: "15px" }}>Similar Past Events</h3>
                <div className="similar-events">
                  {event.similarEvents.map((similarEvent, index) => (
                    <div
                      key={index}
                      className="card"
                      style={{
                        marginBottom: "10px",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "10px",
                        }}
                      >
                        <h4 style={{ margin: "0" }}>{similarEvent.title}</h4>
                        <span
                          style={{
                            padding: "3px 8px",
                            borderRadius: "20px",
                            background: similarEvent.outcome?.includes("Yes")
                              ? "rgba(76, 217, 100, 0.2)"
                              : similarEvent.outcome?.includes("No")
                              ? "rgba(255, 59, 48, 0.2)"
                              : "rgba(255, 204, 0, 0.2)",
                            color: similarEvent.outcome?.includes("Yes")
                              ? "var(--accent-secondary)"
                              : similarEvent.outcome?.includes("No")
                              ? "var(--accent-danger)"
                              : "var(--accent-warning)",
                            fontSize: "12px",
                            fontWeight: "bold",
                          }}
                        >
                          Resolved: {similarEvent.outcome}
                        </span>
                      </div>
                      <p
                        style={{
                          margin: "0 0 10px 0",
                          color: "var(--text-secondary)",
                          fontSize: "14px",
                        }}
                      >
                        {similarEvent.date}
                      </p>
                      <p style={{ margin: "0" }}>{similarEvent.description}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to get category emoji
function getCategoryEmoji(category) {
  switch (category) {
    case "Politics":
      return "🏛️";
    case "Crypto":
      return "₿";
    case "Economy":
      return "📊";
    case "Tech":
      return "💻";
    case "Sports":
      return "🏆";
    case "Climate":
      return "🌡️";
    default:
      return "🔮";
  }
}

function Betting() {
  const { wallet, balance, exchangeRates, sendTransaction } =
    useContext(WalletContext);
  const [bettingEvents, setBettingEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [betAmount, setBetAmount] = useState("");
  const [betSlip, setBetSlip] = useState([]);
  const [placingBet, setPlacingBet] = useState(false);
  const [betResult, setBetResult] = useState(null);
  const [activeTab, setActiveTab] = useState("trending");
  const [myBets, setMyBets] = useState([]);
  const [activeBetView, setActiveBetView] = useState("active");
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState("");
  const [situationEvent, setSituationEvent] = useState(null);
  const [situationOption, setSituationOption] = useState(null);

  // Generate betting events
  useEffect(() => {
    const generateEvents = () => {
      const events = [
        {
          id: 1,
          category: "Politics",
          categoryEmoji: "🏛️",
          title: "Will Trump remove tariffs by April 2025?",
          description:
            "Betting on whether the Trump administration will remove tariffs on imported goods by April 2025.",
          detailedDescription:
            "This market focuses on whether President Trump will follow through on campaign discussions about trade policy and remove any of the significant tariffs currently in place on imports, particularly those on Chinese goods, by April 30, 2025. The market will resolve 'Yes' if official executive or legislative action is taken to remove or substantially reduce major existing tariffs before the deadline.",
          expiryDate: new Date("2025-04-30").getTime(),
          timeRemaining: "345 days remaining",
          options: [
            {
              id: 1,
              name: "Yes, tariffs will be removed",
              icon: "🔓",
              odds: 3.2,
              percentage: 32,
              volume: 12.56,
              analysis:
                "Based on campaign rhetoric and potential economic advantages of reduced tariffs.",
              detailedAnalysis:
                "While Trump has historically favored tariffs as a negotiation tool, economic pressures and potential deals with trading partners could lead to strategic tariff reductions. Recent statements from economic advisors suggest a more flexible approach than in the previous administration.",
              sentiment: {
                positive: 6,
                neutral: 2,
                negative: 2,
              },
            },
            {
              id: 2,
              name: "No, tariffs will remain",
              icon: "🔒",
              odds: 1.4,
              percentage: 68,
              volume: 18.79,
              analysis:
                "Based on Trump's historical stance on trade protectionism and continued focus on American manufacturing.",
              detailedAnalysis:
                "Trump's previous administration maintained strong tariff policies, particularly against China. His campaign emphasized economic nationalism and protection of American industries, suggesting tariffs are likely to remain as leverage in trade negotiations. The administration may maintain or even strengthen tariff policies.",
              sentiment: {
                positive: 7,
                neutral: 2,
                negative: 1,
              },
            },
          ],
          participants: 1247,
          totalBets: 28.56,
          trendAnalysis:
            "Market sentiment has shifted slightly toward 'Yes' over the past month, possibly reacting to statements from the incoming administration's economic team about potential trade negotiations.",
          predictionModels:
            "Quantitative models analyzing previous presidential trade policies suggest a 35-40% probability of significant tariff reductions within the first 100 days of the administration.",
          historicalComparison:
            "Historically, incoming presidents have made trade policy changes within their first year in office. The Trump administration's previous term saw rapid implementation of tariffs, but the current economic environment differs significantly from 2017.",
          priceMovementAnalysis:
            "The 'Yes' option has seen increasing support following recent Treasury Secretary nominee statements about economic growth priorities.",
          communitySentiment: {
            positive: 45,
            neutral: 30,
            negative: 25,
          },
          communityOverview:
            "The community is divided, with economic nationalists strongly favoring continued tariffs while free trade advocates and some business sectors are betting on reductions.",
          keyFactors: [
            {
              icon: "🇨🇳",
              title: "US-China Relations",
              description:
                "Current diplomatic relations and potential upcoming trade negotiations with China will be critical determinants.",
            },
            {
              icon: "📉",
              title: "Inflation Concerns",
              description:
                "Rising inflation might pressure the administration to reduce tariffs to lower consumer prices.",
            },
            {
              icon: "🏭",
              title: "Manufacturing Sector Influence",
              description:
                "The domestic manufacturing lobby has significant influence on trade policy decisions.",
            },
            {
              icon: "📊",
              title: "Economic Indicators",
              description:
                "Q1 2025 economic growth and employment figures will likely influence policy direction.",
            },
          ],
          expertOpinions: [
            {
              expert: "Dr. Rachel Morris",
              credentials: "Former US Trade Representative Advisor",
              prediction: "Yes",
              analysis:
                "The administration will likely use tariff reductions as leverage in new trade negotiations, particularly with China. Economic pressures may accelerate this timeline.",
            },
            {
              expert: "James Wong",
              credentials: "International Trade Economist",
              prediction: "No",
              analysis:
                "Trump's consistent position on protecting American industries suggests tariffs will remain in place at least through 2025 as negotiating leverage.",
            },
            {
              expert: "Maria Gonzalez",
              credentials: "Global Policy Institute",
              prediction: "Neutral",
              analysis:
                "We may see selective tariff reductions in specific sectors while maintaining others, making this bet highly dependent on specific resolution criteria.",
            },
          ],
          significantBets: [
            {
              user: "TradePolicyExpert",
              time: "2 days ago",
              option: "Yes, tariffs will be removed",
              odds: 3.2,
              amount: 0.85,
              potential: 2.72,
            },
            {
              user: "EconAnalyst",
              time: "1 week ago",
              option: "No, tariffs will remain",
              odds: 1.4,
              amount: 2.4,
              potential: 3.36,
            },
            {
              user: "DiplomacyWatcher",
              time: "3 days ago",
              option: "Yes, tariffs will be removed",
              odds: 3.1,
              amount: 0.5,
              potential: 1.55,
            },
          ],
          similarEvents: [
            {
              title: "Biden removes China tariffs in 2022",
              date: "Resolved June 2022",
              outcome: "Partial",
              description:
                "The Biden administration partially removed some Trump-era tariffs on Chinese goods in 2022.",
            },
            {
              title: "Trump imposes new EU tariffs in 2020",
              date: "Resolved January 2020",
              outcome: "Yes",
              description:
                "The previous Trump administration imposed additional tariffs on European goods in early 2020.",
            },
          ],
          comments: [
            {
              id: 1,
              user: "Satoshi21",
              text: "I think tariffs will be reduced but not completely removed. The administration might keep some leverage for future negotiations.",
              time: "2 hours ago",
              likes: 15,
              stance: "neutral",
            },
            {
              id: 2,
              user: "BTCAnalyst",
              text: "Markets are clearly predicting tariffs to stay in place. Look at how manufacturing stocks have been performing since the election.",
              time: "5 hours ago",
              likes: 8,
              stance: "bearish",
            },
            {
              id: 3,
              user: "EconTrader",
              text: "Just placed a big bet on 'Yes'. Consumer price pressures will force the administration's hand by March.",
              time: "1 day ago",
              likes: 23,
              stance: "bullish",
            },
          ],
        },
        {
          id: 2,
          category: "Crypto",
          categoryEmoji: "₿",
          title: "Bitcoin to reach $100K before July 2025?",
          description:
            "Will Bitcoin price reach or exceed $100,000 before July 2025?",
          detailedDescription:
            "This market predicts whether Bitcoin's price will reach or exceed $100,000 USD at any point before July 1, 2025. The market will resolve to 'Yes' if the price of Bitcoin reaches $100,000 or higher on any major exchange (Coinbase, Binance, Kraken) before the deadline. The price must be sustained for at least 1 hour to be considered valid.",
          expiryDate: new Date("2025-06-30").getTime(),
          options: [
            {
              id: 1,
              name: "Yes, BTC will reach $100K",
              icon: "🚀",
              odds: 2.1,
              percentage: 47,
              volume: 75.32,
              analysis:
                "Based on historical cycle patterns and increasing institutional adoption.",
              detailedAnalysis:
                "Bitcoin has demonstrated a pattern of cyclical bull markets typically peaking 12-18 months after halving events. With the 2024 halving completed and institutional adoption accelerating via ETFs and corporate treasury investments, the $100K threshold is reasonable within this timeframe according to many analysts.",
              sentiment: {
                positive: 8,
                neutral: 1,
                negative: 1,
              },
            },
            {
              id: 2,
              name: "No, BTC will stay below $100K",
              icon: "🐻",
              odds: 1.9,
              percentage: 53,
              volume: 80.93,
              analysis:
                "Based on regulatory uncertainty and potential macroeconomic headwinds.",
              detailedAnalysis:
                "Despite historical patterns suggesting higher prices, current macroeconomic conditions, regulatory uncertainty, and potential interest rate scenarios could limit Bitcoin's upside potential during this timeframe. Market participants pricing this outcome are typically considering lengthening cycles and diminishing returns theories.",
              sentiment: {
                positive: 5,
                neutral: 2,
                negative: 3,
              },
            },
          ],
          participants: 3851,
          totalBets: 156.25,
          hot: true,
          trendAnalysis:
            "The market has been trending increasingly toward 'Yes' over the past two weeks, following significant ETF inflows and positive statements from institutional investors.",
          predictionModels:
            "Quantitative stock-to-flow models suggest Bitcoin should reach approximately $110,000-150,000 during this cycle, though timelines vary considerably.",
          historicalComparison:
            "In previous post-halving cycles, Bitcoin has achieved 10-20x returns from cycle lows. A similar performance would put the price between $80,000 and $160,000 by mid-2025.",
          priceMovementAnalysis:
            "The 'Yes' option has gained 12 percentage points in the last month, suggesting growing confidence among traders.",
          communitySentiment: {
            positive: 65,
            neutral: 22,
            negative: 13,
          },
          communityOverview:
            "The community is increasingly bullish, with on-chain metrics being cited as evidence of strong holder conviction and reduced selling pressure.",
          keyFactors: [
            {
              icon: "🏦",
              title: "Institutional Adoption",
              description:
                "Continued ETF inflows and corporate treasury investments will be critical for pushing price to new heights.",
            },
            {
              icon: "📈",
              title: "Halving Effect",
              description:
                "The supply reduction from the 2024 halving historically takes 6-12 months to fully impact market prices.",
            },
            {
              icon: "🏛️",
              title: "Regulatory Environment",
              description:
                "Regulatory clarity or crackdowns could significantly impact market sentiment and institutional participation.",
            },
            {
              icon: "🌍",
              title: "Global Economic Conditions",
              description:
                "Inflation rates, interest rate policies, and overall economic stability will influence Bitcoin as a macro asset.",
            },
          ],
          comments: [
            {
              id: 1,
              user: "CryptoQueen",
              text: "With institutional adoption accelerating, $100K is inevitable. I expect we'll hit it by March 2025 at the latest.",
              time: "3 hours ago",
              likes: 25,
              stance: "bullish",
            },
            {
              id: 2,
              user: "BitcoinBeliever",
              text: "The halving effect hasn't been priced in yet. When supply shock hits, we'll blow past $100K.",
              time: "1 day ago",
              likes: 18,
              stance: "bullish",
            },
            {
              id: 3,
              user: "SkepticalTrader",
              text: "Everyone's expecting $100K which makes me think we'll fall short. Market usually does the opposite of consensus.",
              time: "5 hours ago",
              likes: 7,
              stance: "bearish",
            },
          ],
        },
        {
          id: 3,
          category: "Economy",
          categoryEmoji: "📊",
          title: "Fed to cut rates in Q2 2025?",
          description:
            "Will the Federal Reserve cut interest rates during the second quarter of 2025?",
          expiryDate: new Date("2025-06-30").getTime(),
          options: [
            {
              id: 1,
              name: "Yes, rate cut in Q2",
              icon: "✂️",
              odds: 2.5,
              percentage: 40,
              volume: 22.31,
              analysis:
                "Based on projected inflation data and potential economic slowdown signals.",
              detailedAnalysis:
                "Current economic indicators suggest inflation may be sufficiently contained by Q2 2025 to allow the Federal Reserve to begin easing monetary policy. Labor market cooling and decelerating wage growth may provide the necessary conditions for rate cuts during this period.",
              sentiment: {
                positive: 5,
                neutral: 3,
                negative: 2,
              },
            },
            {
              id: 2,
              name: "No rate cut in Q2",
              icon: "🛑",
              odds: 1.6,
              percentage: 60,
              volume: 23.42,
              analysis:
                "Based on persistent inflation concerns and strong employment data.",
              detailedAnalysis:
                "The Federal Reserve has consistently communicated a 'higher for longer' approach to interest rates. With ongoing concerns about potential inflation resurgence and resilient economic data, the Fed may maintain current rates through Q2 2025, potentially holding off cuts until later in the year.",
              sentiment: {
                positive: 6,
                neutral: 3,
                negative: 1,
              },
            },
          ],
          participants: 952,
          totalBets: 45.73,
          hot: true,
          comments: [
            {
              id: 1,
              user: "EconWatcher",
              text: "Inflation data suggests cuts are coming, but I think the Fed will wait until Q3 based on their recent projections.",
              time: "5 hours ago",
              likes: 12,
              stance: "bearish",
            },
            {
              id: 2,
              user: "MarketGuru",
              text: "Too much uncertainty in employment numbers to predict cuts. If unemployment rises above 4.5% in Q1, we'll see cuts in Q2.",
              time: "2 days ago",
              likes: 8,
              stance: "neutral",
            },
            {
              id: 3,
              user: "FedFollower",
              text: "Looking at the dot plot from the last meeting, several board members are projecting Q2 cuts. This market is underpriced.",
              time: "8 hours ago",
              likes: 15,
              stance: "bullish",
            },
          ],
        },
        {
          id: 4,
          category: "Tech",
          categoryEmoji: "💻",
          title: "SpaceX Starship to reach orbit in 2025?",
          description:
            "Will SpaceX successfully complete an orbital mission with Starship by end of 2025?",
          expiryDate: new Date("2025-12-31").getTime(),
          options: [
            {
              id: 1,
              name: "Yes, orbital mission success",
              icon: "🚀",
              odds: 1.5,
              percentage: 65,
              volume: 24.8,
              analysis:
                "Based on current test flight progress and SpaceX's development velocity.",
              sentiment: {
                positive: 7,
                neutral: 2,
                negative: 1,
              },
            },
            {
              id: 2,
              name: "No successful orbital mission",
              icon: "💥",
              odds: 2.8,
              percentage: 35,
              volume: 13.35,
              analysis:
                "Based on technical challenges and regulatory hurdles that may delay full orbital capability.",
              sentiment: {
                positive: 3,
                neutral: 4,
                negative: 3,
              },
            },
          ],
          participants: 724,
          totalBets: 38.15,
          comments: [
            {
              id: 1,
              user: "SpaceXFan",
              text: "Progress has been amazing after the test flights. They'll definitely achieve orbit in early 2025.",
              time: "8 hours ago",
              likes: 21,
              stance: "bullish",
            },
            {
              id: 2,
              user: "RocketScience",
              text: "I'm betting yes but timelines usually slip. The thermal protection system is still a major hurdle.",
              time: "1 day ago",
              likes: 15,
              stance: "neutral",
            },
            {
              id: 3,
              user: "OrbitMechanics",
              text: "The technical challenges are significant, but SpaceX has a history of eventually succeeding. It's just a matter of when.",
              time: "3 days ago",
              likes: 9,
              stance: "bullish",
            },
          ],
        },
        {
          id: 5,
          category: "Politics",
          categoryEmoji: "🏛️",
          title: "AI Regulation Bill to pass in 2025?",
          description:
            "Will the comprehensive AI regulation bill be passed by Congress in 2025?",
          expiryDate: new Date("2025-12-31").getTime(),
          options: [
            {
              id: 1,
              name: "Yes, bill will pass",
              icon: "✅",
              odds: 2.3,
              percentage: 43,
              analysis:
                "Based on bipartisan concerns about AI safety and growing regulatory momentum.",
              sentiment: {
                positive: 5,
                neutral: 3,
                negative: 2,
              },
            },
            {
              id: 2,
              name: "No, bill will not pass",
              icon: "❌",
              odds: 1.75,
              percentage: 57,
              analysis:
                "Based on legislative gridlock and industry lobbying efforts.",
              sentiment: {
                positive: 6,
                neutral: 2,
                negative: 2,
              },
            },
          ],
          participants: 531,
          totalBets: 26.89,
          comments: [
            {
              id: 1,
              user: "AIEthicist",
              text: "Given recent events, regulation is inevitable. The question is just how comprehensive it will be.",
              time: "4 hours ago",
              likes: 7,
              stance: "bullish",
            },
            {
              id: 2,
              user: "PolicyWonk",
              text: "Too many competing interests to get this passed quickly. Tech companies will lobby for delays.",
              time: "1 day ago",
              likes: 11,
              stance: "bearish",
            },
            {
              id: 3,
              user: "TechLawyer",
              text: "I think we'll see targeted regulation of specific AI applications rather than a comprehensive bill.",
              time: "2 days ago",
              likes: 14,
              stance: "neutral",
            },
          ],
        },
        {
          id: 6,
          category: "Crypto",
          categoryEmoji: "₿",
          title: "Ethereum to flip Bitcoin in market cap?",
          description:
            "Will Ethereum's market cap exceed Bitcoin's at any point during 2025?",
          expiryDate: new Date("2025-12-31").getTime(),
          options: [
            {
              id: 1,
              name: "Yes, flippening will happen",
              icon: "🔄",
              odds: 9.5,
              percentage: 11,
              volume: 12.37,
              analysis:
                "Based on Ethereum's expanding use cases and potential growth in DeFi and institutional adoption.",
              sentiment: {
                positive: 8,
                neutral: 1,
                negative: 1,
              },
            },
            {
              id: 2,
              name: "No, Bitcoin remains on top",
              icon: "👑",
              odds: 1.12,
              percentage: 89,
              volume: 100.08,
              analysis:
                "Based on Bitcoin's strong network effects and position as the primary crypto asset for institutional investment.",
              sentiment: {
                positive: 9,
                neutral: 1,
                negative: 0,
              },
            },
          ],
          participants: 1865,
          totalBets: 112.45,
          comments: [
            {
              id: 1,
              user: "EthMaximalist",
              text: "With ETH staking and DeFi growth, it's only a matter of time. The flippening will happen when institutional investors fully understand Ethereum's utility.",
              time: "12 hours ago",
              likes: 32,
              stance: "bullish",
            },
            {
              id: 2,
              user: "BtcOG",
              text: "Not happening this cycle or ever. Bitcoin's scarcity and brand recognition are too strong.",
              time: "2 days ago",
              likes: 45,
              stance: "bearish",
            },
            {
              id: 3,
              user: "CryptoResearcher",
              text: "The ratio might improve for ETH, but a complete flippening remains unlikely. Both will grow significantly though.",
              time: "1 day ago",
              likes: 19,
              stance: "neutral",
            },
          ],
        },
        {
          id: 7,
          category: "Economy",
          categoryEmoji: "📊",
          title: "S&P 500 to end 2025 above 6,000?",
          description:
            "Will the S&P 500 index close above 6,000 points on the last trading day of 2025?",
          expiryDate: new Date("2025-12-31").getTime(),
          options: [
            {
              id: 1,
              name: "Yes, above 6,000",
              icon: "📈",
              odds: 1.8,
              percentage: 55,
              volume: 32.4,
              analysis:
                "Based on projected earnings growth and potential interest rate cuts boosting valuations.",
              sentiment: {
                positive: 6,
                neutral: 3,
                negative: 1,
              },
            },
            {
              id: 2,
              name: "No, below 6,000",
              icon: "📉",
              odds: 2.2,
              percentage: 45,
              volume: 26.51,
              analysis:
                "Based on concerns about market valuations and potential economic slowdown affecting corporate earnings.",
              sentiment: {
                positive: 4,
                neutral: 3,
                negative: 3,
              },
            },
          ],
          participants: 624,
          totalBets: 58.91,
          hot: true,
          comments: [
            {
              id: 1,
              user: "BullMarket",
              text: "The post-election rally will continue. Lower corporate taxes will boost earnings and drive the index higher.",
              time: "6 hours ago",
              likes: 9,
              stance: "bullish",
            },
            {
              id: 2,
              user: "CautiousInvestor",
              text: "Valuations are already stretched, expecting correction before end of 2025. PE ratios can't expand indefinitely.",
              time: "1 day ago",
              likes: 14,
              stance: "bearish",
            },
            {
              id: 3,
              user: "DataAnalyst",
              text: "Historically, markets perform well in the first year after elections. Combined with potential rate cuts, 6,000 is reasonable.",
              time: "2 days ago",
              likes: 11,
              stance: "bullish",
            },
          ],
        },
        {
          id: 8,
          category: "Tech",
          categoryEmoji: "💻",
          title: "Apple to release AR glasses in 2025?",
          description:
            "Will Apple officially announce and release AR glasses or similar XR product in 2025?",
          expiryDate: new Date("2025-12-31").getTime(),
          options: [
            {
              id: 1,
              name: "Yes, product will launch",
              icon: "👓",
              odds: 2.7,
              percentage: 37,
              volume: 15.93,
              analysis:
                "Based on supply chain reports and Apple's increasing focus on AR technology.",
              sentiment: {
                positive: 7,
                neutral: 2,
                negative: 1,
              },
            },
            {
              id: 2,
              name: "No product launch in 2025",
              icon: "⏱️",
              odds: 1.55,
              percentage: 63,
              volume: 27.13,
              analysis:
                "Based on Apple's typical cautious approach to new product categories and technical challenges with AR glasses.",
              sentiment: {
                positive: 6,
                neutral: 3,
                negative: 1,
              },
            },
          ],
          participants: 912,
          totalBets: 43.06,
          comments: [
            {
              id: 1,
              user: "AppleGeek",
              text: "Sources in supply chain confirm it's happening. Components are already being produced in limited quantities.",
              time: "10 hours ago",
              likes: 17,
              stance: "bullish",
            },
            {
              id: 2,
              user: "TechAnalyst",
              text: "Too many technical hurdles remain for 2025 launch. Battery technology and miniaturization are still major challenges.",
              time: "3 days ago",
              likes: 21,
              stance: "bearish",
            },
            {
              id: 3,
              user: "ProductDesigner",
              text: "Apple won't release until they have something truly revolutionary. They're still iterating on Vision Pro for now.",
              time: "1 day ago",
              likes: 13,
              stance: "bearish",
            },
          ],
        },
        {
          id: 9,
          category: "Sports",
          categoryEmoji: "🏆",
          title: "Chiefs to win Super Bowl LX?",
          description:
            "Will the Kansas City Chiefs win Super Bowl LX in February 2026?",
          expiryDate: new Date("2026-02-15").getTime(),
          options: [
            {
              id: 1,
              name: "Yes, Chiefs will win",
              icon: "🏈",
              odds: 6.5,
              percentage: 15,
              volume: 13.01,
              analysis:
                "Based on the Chiefs' continued dominance with Patrick Mahomes and Andy Reid's coaching system.",
              sentiment: {
                positive: 8,
                neutral: 1,
                negative: 1,
              },
            },
            {
              id: 2,
              name: "No, another team wins",
              icon: "🚫",
              odds: 1.18,
              percentage: 85,
              volume: 73.71,
              analysis:
                "Based on the historical difficulty of winning three consecutive Super Bowls and overall NFL parity.",
              sentiment: {
                positive: 8,
                neutral: 1,
                negative: 1,
              },
            },
          ],
          participants: 2134,
          totalBets: 86.72,
          comments: [
            {
              id: 1,
              user: "ChiefsKingdom",
              text: "Three-peat coming up! As long as we have Mahomes and Kelce, nobody can stop this dynasty.",
              time: "1 day ago",
              likes: 28,
              stance: "bullish",
            },
            {
              id: 2,
              user: "NFLExpert",
              text: "Dynasty continues but betting against it for value. No team has ever won three straight Super Bowls.",
              time: "2 days ago",
              likes: 13,
              stance: "bearish",
            },
            {
              id: 3,
              user: "SportsBettor",
              text: "At these odds, the 'Yes' option offers tremendous value. Only needs to hit 15% of the time to be profitable.",
              time: "5 hours ago",
              likes: 7,
              stance: "bullish",
            },
          ],
        },
        {
          id: 10,
          category: "Climate",
          categoryEmoji: "🌡️",
          title: "2025 to be hottest year on record?",
          description:
            "Will 2025 officially be declared the hottest year on record by NASA and NOAA?",
          expiryDate: new Date("2026-01-31").getTime(),
          options: [
            {
              id: 1,
              name: "Yes, record broken",
              icon: "🔥",
              odds: 1.65,
              percentage: 61,
              volume: 11.81,
              analysis:
                "Based on current climate trends, El Niño patterns, and ongoing global temperature increases.",
              sentiment: {
                positive: 6,
                neutral: 2,
                negative: 2,
              },
            },
            {
              id: 2,
              name: "No, not the hottest",
              icon: "❄️",
              odds: 2.4,
              percentage: 39,
              volume: 7.55,
              analysis:
                "Based on potential La Niña development and natural climate variability that may temporarily offset warming trends.",
              sentiment: {
                positive: 4,
                neutral: 3,
                negative: 3,
              },
            },
          ],
          participants: 405,
          totalBets: 19.36,
          comments: [
            {
              id: 1,
              user: "ClimateScientist",
              text: "El Niño patterns suggest high probability. Current models show 2025 will likely surpass previous records.",
              time: "5 hours ago",
              likes: 11,
              stance: "bullish",
            },
            {
              id: 2,
              user: "DataNerd",
              text: "Trend analysis shows 70% chance. The warming trend is clear, but year-to-year variability still exists.",
              time: "4 days ago",
              likes: 8,
              stance: "bullish",
            },
            {
              id: 3,
              user: "WeatherWatcher",
              text: "La Niña might develop late 2024, which could carry cooling effects into 2025. Don't count on a new record.",
              time: "2 days ago",
              likes: 5,
              stance: "bearish",
            },
          ],
        },

        // Additional Politics events (to have 6 total)
        {
          id: 11,
          category: "Politics",
          categoryEmoji: "🏛️",
          title: "US-China trade deal by end of 2025?",
          description:
            "Will the US and China sign a comprehensive new trade agreement by the end of 2025?",
          expiryDate: new Date("2025-12-31").getTime(),
          options: [
            {
              id: 1,
              name: "Yes, deal will be signed",
              icon: "🤝",
              odds: 3.8,
              percentage: 26,
              analysis:
                "Based on potential economic pressures and diplomatic initiatives to stabilize relations.",
              sentiment: {
                positive: 6,
                neutral: 2,
                negative: 2,
              },
            },
            {
              id: 2,
              name: "No deal by end of 2025",
              icon: "🚧",
              odds: 1.35,
              percentage: 74,
              analysis:
                "Based on continued geopolitical tensions and fundamental disagreements on key issues.",
              sentiment: {
                positive: 8,
                neutral: 1,
                negative: 1,
              },
            },
          ],
          participants: 723,
          totalBets: 32.47,
          comments: [
            {
              id: 1,
              user: "GeopoliticsExpert",
              text: "Relations are too strained for a comprehensive deal. We might see targeted agreements on specific sectors.",
              time: "3 hours ago",
              likes: 19,
              stance: "bearish",
            },
            {
              id: 2,
              user: "TradePolicy",
              text: "Economic realities will push both sides to the table. Neither country can afford continued trade tensions.",
              time: "1 day ago",
              likes: 8,
              stance: "bullish",
            },
          ],
        },
        {
          id: 12,
          category: "Politics",
          categoryEmoji: "🏛️",
          title: "Supreme Court expansion attempted in 2025?",
          description:
            "Will legislation to expand the Supreme Court be formally introduced in Congress in 2025?",
          expiryDate: new Date("2025-12-31").getTime(),
          options: [
            {
              id: 1,
              name: "Yes, expansion introduced",
              icon: "⚖️",
              odds: 4.2,
              percentage: 24,
              analysis:
                "Based on growing calls from progressive lawmakers for judicial reform.",
              sentiment: {
                positive: 5,
                neutral: 2,
                negative: 3,
              },
            },
            {
              id: 2,
              name: "No expansion attempt",
              icon: "🛑",
              odds: 1.33,
              percentage: 76,
              analysis:
                "Based on the significant political barriers and moderate opposition to court expansion.",
              sentiment: {
                positive: 7,
                neutral: 2,
                negative: 1,
              },
            },
          ],
          participants: 492,
          totalBets: 21.38,
          comments: [
            {
              id: 1,
              user: "ConstitutionalLawyer",
              text: "The political appetite isn't there. Even if introduced, it would be purely symbolic.",
              time: "8 hours ago",
              likes: 14,
              stance: "bearish",
            },
            {
              id: 2,
              user: "ProgressiveVoter",
              text: "After recent controversial decisions, momentum for court reform is building. Expect to see something in 2025.",
              time: "2 days ago",
              likes: 7,
              stance: "bullish",
            },
          ],
        },
        {
          id: 13,
          category: "Politics",
          categoryEmoji: "🏛️",
          title: "Major immigration reform passes in 2025?",
          description:
            "Will comprehensive immigration reform legislation be signed into law in 2025?",
          expiryDate: new Date("2025-12-31").getTime(),
          options: [
            {
              id: 1,
              name: "Yes, reform becomes law",
              icon: "📜",
              odds: 5.7,
              percentage: 18,
              analysis:
                "Based on potential political pressure to address border issues with a comprehensive solution.",
              sentiment: {
                positive: 6,
                neutral: 2,
                negative: 2,
              },
            },
            {
              id: 2,
              name: "No major reform passed",
              icon: "❌",
              odds: 1.23,
              percentage: 82,
              analysis:
                "Based on historical failures to pass comprehensive immigration reform and continued partisan divides.",
              sentiment: {
                positive: 8,
                neutral: 1,
                negative: 1,
              },
            },
          ],
          participants: 613,
          totalBets: 29.74,
          comments: [
            {
              id: 1,
              user: "ImmigrationLawyer",
              text: "Every administration talks about comprehensive reform, but it never happens. Expect executive actions instead.",
              time: "4 hours ago",
              likes: 23,
              stance: "bearish",
            },
            {
              id: 2,
              user: "BorderState",
              text: "The situation at the border requires action. I think we'll see targeted legislation but not comprehensive reform.",
              time: "1 day ago",
              likes: 15,
              stance: "neutral",
            },
          ],
        },
        {
          id: 14,
          category: "Politics",
          categoryEmoji: "🏛️",
          title: "Harris to run for President in 2028?",
          description:
            "Will Kamala Harris officially announce a run for President for the 2028 election?",
          expiryDate: new Date("2027-12-31").getTime(),
          options: [
            {
              id: 1,
              name: "Yes, Harris will run",
              icon: "🗳️",
              odds: 1.45,
              percentage: 69,
              analysis:
                "Based on her continued political presence and position within the Democratic party.",
              sentiment: {
                positive: 7,
                neutral: 2,
                negative: 1,
              },
            },
            {
              id: 2,
              name: "No, Harris won't run",
              icon: "🚫",
              odds: 2.9,
              percentage: 31,
              analysis:
                "Based on the possibility of other career paths or new rising stars in the party.",
              sentiment: {
                positive: 4,
                neutral: 3,
                negative: 3,
              },
            },
          ],
          participants: 824,
          totalBets: 37.62,
          comments: [
            {
              id: 1,
              user: "PoliticalAnalyst",
              text: "Almost certain she'll run. She's positioning herself already with key appearances and fundraising.",
              time: "6 hours ago",
              likes: 18,
              stance: "bullish",
            },
            {
              id: 2,
              user: "DemocraticStrategist",
              text: "Three years is a long time in politics. New candidates might emerge who change the calculus.",
              time: "1 day ago",
              likes: 11,
              stance: "neutral",
            },
          ],
        },

        // Additional Crypto events (to have 6 total)
        {
          id: 15,
          category: "Crypto",
          categoryEmoji: "₿",
          title: "Ethereum to implement sharding in 2025?",
          description:
            "Will Ethereum successfully implement sharding or an equivalent scaling solution in 2025?",
          expiryDate: new Date("2025-12-31").getTime(),
          options: [
            {
              id: 1,
              name: "Yes, sharding implemented",
              icon: "🧩",
              odds: 2.4,
              percentage: 42,
              analysis:
                "Based on the Ethereum roadmap and development milestones achieved so far.",
              sentiment: {
                positive: 6,
                neutral: 3,
                negative: 1,
              },
            },
            {
              id: 2,
              name: "No sharding in 2025",
              icon: "⏱️",
              odds: 1.7,
              percentage: 58,
              analysis:
                "Based on historical delays in Ethereum development and technical challenges of sharding.",
              sentiment: {
                positive: 6,
                neutral: 2,
                negative: 2,
              },
            },
          ],
          participants: 1236,
          totalBets: 67.85,
          comments: [
            {
              id: 1,
              user: "EthDeveloper",
              text: "Proto-danksharding is likely in 2025, but full sharding implementation will take longer. Depends on definition.",
              time: "7 hours ago",
              likes: 29,
              stance: "neutral",
            },
            {
              id: 2,
              user: "ScalingSpecialist",
              text: "Layer 2 solutions are reducing the urgency for sharding. Might be pushed back for more important upgrades.",
              time: "2 days ago",
              likes: 17,
              stance: "bearish",
            },
          ],
        },
        {
          id: 16,
          category: "Crypto",
          categoryEmoji: "₿",
          title: "CBDC launched in the US by end of 2025?",
          description:
            "Will the United States officially launch a Central Bank Digital Currency by the end of 2025?",
          expiryDate: new Date("2025-12-31").getTime(),
          options: [
            {
              id: 1,
              name: "Yes, CBDC launched",
              icon: "💵",
              odds: 6.8,
              percentage: 15,
              analysis:
                "Based on increasing global CBDC development and potential pressure to maintain dollar dominance.",
              sentiment: {
                positive: 4,
                neutral: 3,
                negative: 3,
              },
            },
            {
              id: 2,
              name: "No CBDC by end of 2025",
              icon: "🕰️",
              odds: 1.17,
              percentage: 85,
              analysis:
                "Based on the cautious approach of US regulators and political opposition to a digital dollar.",
              sentiment: {
                positive: 8,
                neutral: 1,
                negative: 1,
              },
            },
          ],
          participants: 952,
          totalBets: 41.83,
          comments: [
            {
              id: 1,
              user: "FinTechObserver",
              text: "The Fed is still in research phase. Implementation would take years even after a decision is made.",
              time: "12 hours ago",
              likes: 21,
              stance: "bearish",
            },
            {
              id: 2,
              user: "CentralBankExpert",
              text: "Other countries are moving faster. US might accelerate timeline if China's e-CNY gains international traction.",
              time: "2 days ago",
              likes: 14,
              stance: "neutral",
            },
          ],
        },
        {
          id: 17,
          category: "Crypto",
          categoryEmoji: "₿",
          title: "Ripple XRP to win SEC case appeal in 2025?",
          description:
            "Will Ripple receive a favorable final ruling in its SEC case appeal by the end of 2025?",
          expiryDate: new Date("2025-12-31").getTime(),
          options: [
            {
              id: 1,
              name: "Yes, Ripple wins appeal",
              icon: "⚖️",
              odds: 2.1,
              percentage: 48,
              analysis:
                "Based on previous partial court victories and strong legal arguments against SEC classification.",
              sentiment: {
                positive: 7,
                neutral: 2,
                negative: 1,
              },
            },
            {
              id: 2,
              name: "No, Ripple loses appeal",
              icon: "📉",
              odds: 1.9,
              percentage: 52,
              analysis:
                "Based on regulatory uncertainty and the SEC's determination to establish precedent in crypto regulation.",
              sentiment: {
                positive: 5,
                neutral: 3,
                negative: 2,
              },
            },
          ],
          participants: 1785,
          totalBets: 72.34,
          comments: [
            {
              id: 1,
              user: "CryptoLawyer",
              text: "Precedent is building in Ripple's favor. SEC's arguments on secondary sales are particularly weak.",
              time: "5 hours ago",
              likes: 31,
              stance: "bullish",
            },
            {
              id: 2,
              user: "RegulationWatcher",
              text: "Appeals process could extend beyond 2025. This market might not resolve within the timeframe.",
              time: "1 day ago",
              likes: 19,
              stance: "neutral",
            },
          ],
        },
        {
          id: 18,
          category: "Crypto",
          categoryEmoji: "₿",
          title: "Bitcoin mining difficulty to double by end of 2025?",
          description:
            "Will Bitcoin's mining difficulty at least double from January 1, 2025 levels by December 31, 2025?",
          expiryDate: new Date("2025-12-31").getTime(),
          options: [
            {
              id: 1,
              name: "Yes, difficulty doubles",
              icon: "⛏️",
              odds: 1.75,
              percentage: 57,
              analysis:
                "Based on projected hardware improvements and increased mining investment following the 2024 halving.",
              sentiment: {
                positive: 6,
                neutral: 3,
                negative: 1,
              },
            },
            {
              id: 2,
              name: "No, less than double",
              icon: "📊",
              odds: 2.3,
              percentage: 43,
              analysis:
                "Based on diminishing returns in mining hardware and potential regulatory constraints on mining operations.",
              sentiment: {
                positive: 5,
                neutral: 2,
                negative: 3,
              },
            },
          ],
          participants: 843,
          totalBets: 38.76,
          comments: [
            {
              id: 1,
              user: "HashRateFanatic",
              text: "ASIC manufacturers are already working on 3nm chips. Difficulty will at least triple by end of 2025.",
              time: "8 hours ago",
              likes: 16,
              stance: "bullish",
            },
            {
              id: 2,
              user: "EnergyAnalyst",
              text: "Energy costs and regulations will constrain growth. Many regions are implementing mining restrictions.",
              time: "3 days ago",
              likes: 11,
              stance: "bearish",
            },
          ],
        },

        // Additional Economy events (to have 6 total)
        {
          id: 19,
          category: "Economy",
          categoryEmoji: "📊",
          title: "US unemployment to exceed 5% in 2025?",
          description:
            "Will the US unemployment rate exceed 5% at any point during 2025?",
          expiryDate: new Date("2025-12-31").getTime(),
          options: [
            {
              id: 1,
              name: "Yes, over 5% unemployment",
              icon: "📉",
              odds: 2.8,
              percentage: 36,
              analysis:
                "Based on potential economic slowdown and interest rate impact on job markets.",
              sentiment: {
                positive: 4,
                neutral: 3,
                negative: 3,
              },
            },
            {
              id: 2,
              name: "No, stays below 5%",
              icon: "📈",
              odds: 1.51,
              percentage: 64,
              analysis:
                "Based on labor market resilience and projected economic growth.",
              sentiment: {
                positive: 7,
                neutral: 2,
                negative: 1,
              },
            },
          ],
          participants: 732,
          totalBets: 35.48,
          comments: [
            {
              id: 1,
              user: "LaborEconomist",
              text: "Labor market is showing signs of cooling, but structural worker shortages should keep unemployment relatively low.",
              time: "9 hours ago",
              likes: 13,
              stance: "bearish",
            },
            {
              id: 2,
              user: "RecessionPredictor",
              text: "Inverted yield curve and other indicators point to recession in late 2024/early 2025. Unemployment will rise.",
              time: "2 days ago",
              likes: 8,
              stance: "bullish",
            },
          ],
        },
        {
          id: 20,
          category: "Economy",
          categoryEmoji: "📊",
          title: "Euro to reach parity with USD in 2025?",
          description:
            "Will the Euro reach parity (1:1) with the US Dollar at any point during 2025?",
          expiryDate: new Date("2025-12-31").getTime(),
          options: [
            {
              id: 1,
              name: "Yes, EUR/USD reaches 1.00",
              icon: "🔄",
              odds: 3.3,
              percentage: 30,
              analysis:
                "Based on divergent monetary policies and economic challenges in the Eurozone.",
              sentiment: {
                positive: 6,
                neutral: 2,
                negative: 2,
              },
            },
            {
              id: 2,
              name: "No, stays above parity",
              icon: "€",
              odds: 1.43,
              percentage: 70,
              analysis:
                "Based on anticipated ECB policy adjustments and Eurozone recovery.",
              sentiment: {
                positive: 7,
                neutral: 2,
                negative: 1,
              },
            },
          ],
          participants: 614,
          totalBets: 29.85,
          comments: [
            {
              id: 1,
              user: "ForexTrader",
              text: "Eurozone manufacturing weakness and energy issues make parity very possible. I'm betting yes.",
              time: "6 hours ago",
              likes: 12,
              stance: "bullish",
            },
            {
              id: 2,
              user: "MacroEconomist",
              text: "ECB policy is already becoming less dovish. The gap between Fed and ECB policy will narrow in 2025.",
              time: "1 day ago",
              likes: 9,
              stance: "bearish",
            },
          ],
        },
        {
          id: 21,
          category: "Economy",
          categoryEmoji: "📊",
          title: "Oil to exceed $100/barrel in 2025?",
          description:
            "Will the price of Brent crude oil exceed $100 per barrel at any point during 2025?",
          expiryDate: new Date("2025-12-31").getTime(),
          options: [
            {
              id: 1,
              name: "Yes, exceeds $100",
              icon: "🛢️",
              odds: 2.1,
              percentage: 48,
              analysis:
                "Based on potential supply constraints and geopolitical tensions affecting oil producing regions.",
              sentiment: {
                positive: 6,
                neutral: 2,
                negative: 2,
              },
            },
            {
              id: 2,
              name: "No, stays below $100",
              icon: "💰",
              odds: 1.9,
              percentage: 52,
              analysis:
                "Based on increasing renewable adoption and potential demand reduction from economic slowdown.",
              sentiment: {
                positive: 5,
                neutral: 3,
                negative: 2,
              },
            },
          ],
          participants: 851,
          totalBets: 42.83,
          comments: [
            {
              id: 1,
              user: "EnergyTrader",
              text: "OPEC+ production cuts combined with potential Middle East tensions make $100 oil likely in 2025.",
              time: "4 hours ago",
              likes: 15,
              stance: "bullish",
            },
            {
              id: 2,
              user: "OilAnalyst",
              text: "EV adoption and efficiency improvements are reducing demand growth. Supply is adequate for foreseeable future.",
              time: "2 days ago",
              likes: 11,
              stance: "bearish",
            },
          ],
        },
        {
          id: 22,
          category: "Economy",
          categoryEmoji: "📊",
          title: "Gold to reach $3,000/oz in 2025?",
          description:
            "Will the price of gold reach or exceed $3,000 per troy ounce at any point during 2025?",
          expiryDate: new Date("2025-12-31").getTime(),
          options: [
            {
              id: 1,
              name: "Yes, gold reaches $3,000",
              icon: "🥇",
              odds: 2.7,
              percentage: 37,
              analysis:
                "Based on monetary policy expectations, inflation concerns, and increased central bank purchasing.",
              sentiment: {
                positive: 7,
                neutral: 2,
                negative: 1,
              },
            },
            {
              id: 2,
              name: "No, stays below $3,000",
              icon: "📉",
              odds: 1.55,
              percentage: 63,
              analysis:
                "Based on potential interest rate stability and competition from other assets.",
              sentiment: {
                positive: 6,
                neutral: 3,
                negative: 1,
              },
            },
          ],
          participants: 1047,
          totalBets: 58.92,
          comments: [
            {
              id: 1,
              user: "GoldBug",
              text: "Central banks are accumulating gold at record pace. $3,000 is conservative - we could see $4,000.",
              time: "7 hours ago",
              likes: 23,
              stance: "bullish",
            },
            {
              id: 2,
              user: "PreciousMetalTrader",
              text: "Gold will continue uptrend but $3,000 is a stretch. More likely to consolidate around $2,500-$2,700 level.",
              time: "1 day ago",
              likes: 14,
              stance: "neutral",
            },
          ],
        },
        {
          id: 23,
          category: "Economy",
          categoryEmoji: "📊",
          title: "Housing prices to decline in 2025?",
          description:
            "Will the US national home price index show a year-over-year decline at any point during 2025?",
          expiryDate: new Date("2025-12-31").getTime(),
          options: [
            {
              id: 1,
              name: "Yes, prices will decline",
              icon: "🏠",
              odds: 3.1,
              percentage: 32,
              analysis:
                "Based on affordability constraints, potential recession, and interest rate impacts on mortgage demand.",
              sentiment: {
                positive: 5,
                neutral: 2,
                negative: 3,
              },
            },
            {
              id: 2,
              name: "No decline in 2025",
              icon: "📈",
              odds: 1.47,
              percentage: 68,
              analysis:
                "Based on housing supply shortages and demographic demand factors supporting price stability.",
              sentiment: {
                positive: 7,
                neutral: 2,
                negative: 1,
              },
            },
          ],
          participants: 734,
          totalBets: 36.28,
          comments: [
            {
              id: 1,
              user: "RealEstateInvestor",
              text: "Supply remains critically low while millennial demand continues. Prices may cool but won't decline nationally.",
              time: "10 hours ago",
              likes: 19,
              stance: "bearish",
            },
            {
              id: 2,
              user: "MortgageBroker",
              text: "Affordability is already stretched. If rates don't come down significantly, we'll see price corrections.",
              time: "2 days ago",
              likes: 12,
              stance: "bullish",
            },
          ],
        },

        // Additional Tech events (to have 6 total)
        {
          id: 24,
          category: "Tech",
          categoryEmoji: "💻",
          title: "Self-driving taxi service in 5+ US cities by end of 2025?",
          description:
            "Will there be fully autonomous (Level 4+) robotaxi services operating commercially in at least 5 major US cities by end of 2025?",
          expiryDate: new Date("2025-12-31").getTime(),
          options: [
            {
              id: 1,
              name: "Yes, 5+ cities with robotaxis",
              icon: "🚕",
              odds: 2.3,
              percentage: 43,
              analysis:
                "Based on current deployment schedules of companies like Waymo, Cruise, and potential Tesla robotaxi launch.",
              sentiment: {
                positive: 7,
                neutral: 2,
                negative: 1,
              },
            },
            {
              id: 2,
              name: "No, fewer than 5 cities",
              icon: "🛑",
              odds: 1.75,
              percentage: 57,
              analysis:
                "Based on regulatory hurdles, safety concerns, and technical challenges of full autonomy in diverse environments.",
              sentiment: {
                positive: 6,
                neutral: 2,
                negative: 2,
              },
            },
          ],
          participants: 926,
          totalBets: 45.37,
          comments: [
            {
              id: 1,
              user: "AutonomousEngineer",
              text: "Waymo is already in multiple cities, and Cruise is expanding rapidly. Five cities is achievable by 2025.",
              time: "5 hours ago",
              likes: 21,
              stance: "bullish",
            },
            {
              id: 2,
              user: "TransportationFuturist",
              text: "Regulation is the biggest hurdle, not technology. Local governments move slowly on approving driverless services.",
              time: "1 day ago",
              likes: 17,
              stance: "bearish",
            },
          ],
        },
        {
          id: 25,
          category: "Tech",
          categoryEmoji: "💻",
          title: "AGI breakthrough announced in 2025?",
          description:
            "Will a major AI research lab announce a significant breakthrough toward Artificial General Intelligence in 2025?",
          expiryDate: new Date("2025-12-31").getTime(),
          options: [
            {
              id: 1,
              name: "Yes, AGI breakthrough announced",
              icon: "🧠",
              odds: 4.5,
              percentage: 22,
              analysis:
                "Based on accelerating AI research progress and significant investments in AGI capabilities.",
              sentiment: {
                positive: 8,
                neutral: 1,
                negative: 1,
              },
            },
            {
              id: 2,
              name: "No AGI breakthrough in 2025",
              icon: "⏳",
              odds: 1.28,
              percentage: 78,
              analysis:
                "Based on the significant remaining challenges to achieve AGI and the likely gradual nature of progress.",
              sentiment: {
                positive: 7,
                neutral: 2,
                negative: 1,
              },
            },
          ],
          participants: 1253,
          totalBets: 64.72,
          comments: [
            {
              id: 1,
              user: "AIResearcher",
              text: "We're seeing impressive advances, but true AGI requires conceptual breakthroughs we don't yet have visibility on.",
              time: "8 hours ago",
              likes: 32,
              stance: "bearish",
            },
            {
              id: 2,
              user: "FutureTech",
              text: "The pace of progress is accelerating. Something major will be announced in 2025, even if not full AGI.",
              time: "2 days ago",
              likes: 19,
              stance: "bullish",
            },
          ],
        },
        {
          id: 26,
          category: "Tech",
          categoryEmoji: "💻",
          title: "Quantum computer to break RSA-2048 by end of 2025?",
          description:
            "Will any quantum computer successfully factor an RSA-2048 key by the end of 2025?",
          expiryDate: new Date("2025-12-31").getTime(),
          options: [
            {
              id: 1,
              name: "Yes, RSA-2048 broken",
              icon: "🔓",
              odds: 12.5,
              percentage: 8,
              analysis:
                "Based on the potential for unexpected breakthroughs in quantum computing hardware or algorithms.",
              sentiment: {
                positive: 4,
                neutral: 3,
                negative: 3,
              },
            },
            {
              id: 2,
              name: "No, RSA-2048 remains secure",
              icon: "🔒",
              odds: 1.08,
              percentage: 92,
              analysis:
                "Based on the current state of quantum computing development and the significant scaling challenges ahead.",
              sentiment: {
                positive: 9,
                neutral: 1,
                negative: 0,
              },
            },
          ],
          participants: 836,
          totalBets: 40.18,
          comments: [
            {
              id: 1,
              user: "QuantumPhysicist",
              text: "We need millions of stable qubits to factor RSA-2048. We're nowhere near that - maybe by 2030 at earliest.",
              time: "6 hours ago",
              likes: 28,
              stance: "bearish",
            },
            {
              id: 2,
              user: "CryptographyExpert",
              text: "Algorithmic improvements could reduce qubit requirements. But still extremely unlikely by 2025.",
              time: "1 day ago",
              likes: 15,
              stance: "bearish",
            },
          ],
        },

        // Additional Sports events (to have 6 total)
        {
          id: 27,
          category: "Sports",
          categoryEmoji: "🏆",
          title: "USA to win most gold medals at 2025 Summer Olympics?",
          description:
            "Will the United States win the most gold medals at the 2026 Winter Olympics in Milan-Cortina?",
          expiryDate: new Date("2026-02-28").getTime(),
          options: [
            {
              id: 1,
              name: "Yes, USA wins most golds",
              icon: "🥇",
              odds: 1.9,
              percentage: 53,
              analysis:
                "Based on historical US winter Olympic performance and current athlete development programs.",
              sentiment: {
                positive: 6,
                neutral: 3,
                negative: 1,
              },
            },
            {
              id: 2,
              name: "No, another country wins more",
              icon: "🏅",
              odds: 2.0,
              percentage: 47,
              analysis:
                "Based on strong competition from Norway, Germany, and other winter sports powerhouses.",
              sentiment: {
                positive: 5,
                neutral: 3,
                negative: 2,
              },
            },
          ],
          participants: 742,
          totalBets: 36.85,
          comments: [
            {
              id: 1,
              user: "OlympicFan",
              text: "Norway is the team to beat in Winter Olympics. They dominated Beijing and have a strong development system.",
              time: "7 hours ago",
              likes: 14,
              stance: "bearish",
            },
            {
              id: 2,
              user: "SportsAnalyst",
              text: "US has been investing heavily in winter sports development. They'll be competitive but might fall short of most golds.",
              time: "2 days ago",
              likes: 9,
              stance: "neutral",
            },
          ],
        },
        {
          id: 28,
          category: "Sports",
          categoryEmoji: "🏆",
          title: "Messi to retire from international football in 2025?",
          description:
            "Will Lionel Messi announce his retirement from international football (Argentina national team) in 2025?",
          expiryDate: new Date("2025-12-31").getTime(),
          options: [
            {
              id: 1,
              name: "Yes, Messi retires internationally",
              icon: "👋",
              odds: 1.65,
              percentage: 61,
              analysis:
                "Based on Messi's age and having already won the World Cup and Copa America with Argentina.",
              sentiment: {
                positive: 6,
                neutral: 3,
                negative: 1,
              },
            },
            {
              id: 2,
              name: "No, continues with Argentina",
              icon: "⚽",
              odds: 2.4,
              percentage: 39,
              analysis:
                "Based on potential desire to play in the 2026 World Cup as his final international tournament.",
              sentiment: {
                positive: 7,
                neutral: 2,
                negative: 1,
              },
            },
          ],
          participants: 1358,
          totalBets: 67.24,
          comments: [
            {
              id: 1,
              user: "MessiFan",
              text: "He's already achieved everything with Argentina. 2025 is the perfect time to step aside with his legacy secured.",
              time: "9 hours ago",
              likes: 31,
              stance: "bullish",
            },
            {
              id: 2,
              user: "FootballExpert",
              text: "The 2026 World Cup is too tempting. He'll want one more major tournament, especially with Argentina as champions.",
              time: "1 day ago",
              likes: 22,
              stance: "bearish",
            },
          ],
        },
        {
          id: 29,
          category: "Sports",
          categoryEmoji: "🏆",
          title: "Real Madrid to win Champions League 2024-25?",
          description:
            "Will Real Madrid win the UEFA Champions League for the 2024-2025 season?",
          expiryDate: new Date("2025-06-01").getTime(),
          options: [
            {
              id: 1,
              name: "Yes, Madrid wins UCL",
              icon: "🏆",
              odds: 4.3,
              percentage: 23,
              analysis:
                "Based on Real Madrid's star-studded squad and historical success in the competition.",
              sentiment: {
                positive: 7,
                neutral: 2,
                negative: 1,
              },
            },
            {
              id: 2,
              name: "No, another team wins",
              icon: "❌",
              odds: 1.3,
              percentage: 77,
              analysis:
                "Based on the competitive nature of the Champions League and strong competition from other elite European clubs.",
              sentiment: {
                positive: 7,
                neutral: 2,
                negative: 1,
              },
            },
          ],
          participants: 1825,
          totalBets: 87.63,
          comments: [
            {
              id: 1,
              user: "MadridFan",
              text: "With Mbappé joining the squad, Madrid has the strongest attacking trio in world football. They're favorites.",
              time: "5 hours ago",
              likes: 24,
              stance: "bullish",
            },
            {
              id: 2,
              user: "FootballTactician",
              text: "Man City, Bayern, and several others are just as strong. Champions League is too unpredictable.",
              time: "2 days ago",
              likes: 17,
              stance: "bearish",
            },
          ],
        },
        {
          id: 30,
          category: "Sports",
          categoryEmoji: "🏆",
          title: "LeBron and Bronny to play together in 2025?",
          description:
            "Will LeBron James and his son Bronny James play together in at least one NBA regular season game during 2025?",
          expiryDate: new Date("2025-12-31").getTime(),
          options: [
            {
              id: 1,
              name: "Yes, they play together",
              icon: "👨‍👦",
              odds: 1.75,
              percentage: 57,
              analysis:
                "Based on LeBron's stated desire to play with his son and Bronny's draft eligibility.",
              sentiment: {
                positive: 7,
                neutral: 2,
                negative: 1,
              },
            },
            {
              id: 2,
              name: "No, don't play together",
              icon: "🏀",
              odds: 2.2,
              percentage: 43,
              analysis:
                "Based on uncertainties about LeBron's longevity and Bronny's NBA readiness.",
              sentiment: {
                positive: 5,
                neutral: 3,
                negative: 2,
              },
            },
          ],
          participants: 1943,
          totalBets: 92.57,
          comments: [
            {
              id: 1,
              user: "NBAInsider",
              text: "LeBron has made this a career goal. Teams will make it happen just for the historic marketing opportunity.",
              time: "6 hours ago",
              likes: 28,
              stance: "bullish",
            },
            {
              id: 2,
              user: "BasketballAnalyst",
              text: "Bronny needs development time. Even if they're on the same team, significant playing time together is unlikely.",
              time: "1 day ago",
              likes: 15,
              stance: "neutral",
            },
          ],
        },
        {
          id: 31,
          category: "Sports",
          categoryEmoji: "🏆",
          title: "Olympics to be held in Africa for 2036?",
          description:
            "Will the IOC select an African city to host the 2036 Summer Olympics?",
          expiryDate: new Date("2029-12-31").getTime(),
          options: [
            {
              id: 1,
              name: "Yes, African host for 2036",
              icon: "🌍",
              odds: 3.5,
              percentage: 29,
              analysis:
                "Based on the IOC's stated goal of geographic diversity and growing interest from African nations.",
              sentiment: {
                positive: 8,
                neutral: 1,
                negative: 1,
              },
            },
            {
              id: 2,
              name: "No, another continent hosts",
              icon: "🌎",
              odds: 1.4,
              percentage: 71,
              analysis:
                "Based on infrastructure challenges and competition from well-established cities in other continents.",
              sentiment: {
                positive: 7,
                neutral: 2,
                negative: 1,
              },
            },
          ],
          participants: 534,
          totalBets: 25.62,
          comments: [
            {
              id: 1,
              user: "OlympicHistorian",
              text: "The IOC has been talking about an African Olympics for decades. 2036 might finally be the right timing.",
              time: "11 hours ago",
              likes: 13,
              stance: "bullish",
            },
            {
              id: 2,
              user: "SportsEconomist",
              text: "Financial considerations will favor established cities that can reuse existing facilities. Africa's time will come, but not yet.",
              time: "3 days ago",
              likes: 8,
              stance: "bearish",
            },
          ],
        },

        // Additional Climate events (to have 6 total)
        {
          id: 32,
          category: "Climate",
          categoryEmoji: "🌡️",
          title: "Arctic ice-free summer by 2025?",
          description:
            "Will the Arctic Ocean experience an ice-free day (less than 1 million sq km ice coverage) during summer 2025?",
          expiryDate: new Date("2025-09-30").getTime(),
          options: [
            {
              id: 1,
              name: "Yes, ice-free day occurs",
              icon: "🧊",
              odds: 5.2,
              percentage: 19,
              analysis:
                "Based on accelerating ice loss trends and potential for extreme weather conditions.",
              sentiment: {
                positive: 5,
                neutral: 2,
                negative: 3,
              },
            },
            {
              id: 2,
              name: "No ice-free day in 2025",
              icon: "❄️",
              odds: 1.24,
              percentage: 81,
              analysis:
                "Based on current ice coverage projections and scientific models predicting first ice-free summer likely after 2025.",
              sentiment: {
                positive: 8,
                neutral: 1,
                negative: 1,
              },
            },
          ],
          participants: 623,
          totalBets: 29.85,
          comments: [
            {
              id: 1,
              user: "ClimateScientist",
              text: "Most models project first ice-free conditions between 2030-2035. 2025 is possible but unlikely.",
              time: "7 hours ago",
              likes: 19,
              stance: "bearish",
            },
            {
              id: 2,
              user: "ArcticResearcher",
              text: "Recent data shows acceleration beyond model predictions. If we get an extreme summer, 2025 could see this milestone.",
              time: "2 days ago",
              likes: 11,
              stance: "neutral",
            },
          ],
        },
        {
          id: 33,
          category: "Climate",
          categoryEmoji: "🌡️",
          title: "Major climate legislation passed in 2025?",
          description:
            "Will the US pass significant new climate legislation in 2025?",
          expiryDate: new Date("2025-12-31").getTime(),
          options: [
            {
              id: 1,
              name: "Yes, major climate bill passes",
              icon: "📜",
              odds: 4.8,
              percentage: 21,
              analysis:
                "Based on potential political pressure following extreme weather events and international agreements.",
              sentiment: {
                positive: 7,
                neutral: 2,
                negative: 1,
              },
            },
            {
              id: 2,
              name: "No major climate legislation",
              icon: "🛑",
              odds: 1.26,
              percentage: 79,
              analysis:
                "Based on political division and challenges passing major legislation in a polarized Congress.",
              sentiment: {
                positive: 7,
                neutral: 2,
                negative: 1,
              },
            },
          ],
          participants: 742,
          totalBets: 36.28,
          comments: [
            {
              id: 1,
              user: "PolicyExpert",
              text: "With the current political landscape, comprehensive climate legislation is highly unlikely in 2025.",
              time: "5 hours ago",
              likes: 21,
              stance: "bearish",
            },
            {
              id: 2,
              user: "ClimateAdvocate",
              text: "Increasing extreme weather events may shift public opinion enough to enable targeted legislation.",
              time: "1 day ago",
              likes: 13,
              stance: "neutral",
            },
          ],
        },
        {
          id: 34,
          category: "Climate",
          categoryEmoji: "🌡️",
          title: "Global EV sales to exceed 20M in 2025?",
          description:
            "Will global electric vehicle sales exceed 20 million units in 2025?",
          expiryDate: new Date("2026-01-31").getTime(),
          options: [
            {
              id: 1,
              name: "Yes, over 20M EVs sold",
              icon: "🔌",
              odds: 1.85,
              percentage: 54,
              analysis:
                "Based on accelerating EV adoption rates, increased model availability, and government incentives.",
              sentiment: {
                positive: 7,
                neutral: 2,
                negative: 1,
              },
            },
            {
              id: 2,
              name: "No, less than 20M EVs",
              icon: "🚗",
              odds: 2.1,
              percentage: 46,
              analysis:
                "Based on supply chain constraints, charging infrastructure limitations, and potential economic headwinds.",
              sentiment: {
                positive: 5,
                neutral: 3,
                negative: 2,
              },
            },
          ],
          participants: 852,
          totalBets: 41.73,
          comments: [
            {
              id: 1,
              user: "AutoIndustryAnalyst",
              text: "EV growth remains strong despite challenges. Major automakers are finally delivering compelling models at scale.",
              time: "8 hours ago",
              likes: 17,
              stance: "bullish",
            },
            {
              id: 2,
              user: "BatteryExpert",
              text: "Raw material constraints for batteries might limit production growth. 20M is possible but challenging.",
              time: "2 days ago",
              likes: 12,
              stance: "neutral",
            },
          ],
        },
        {
          id: 35,
          category: "Climate",
          categoryEmoji: "🌡️",
          title: "Category 5+ hurricane to hit US in 2025?",
          description:
            "Will a Category 5 or stronger hurricane make landfall in the continental United States during 2025?",
          expiryDate: new Date("2025-12-31").getTime(),
          options: [
            {
              id: 1,
              name: "Yes, Cat 5+ hurricane hits",
              icon: "🌪️",
              odds: 3.4,
              percentage: 29,
              analysis:
                "Based on warming ocean temperatures increasing the potential for stronger hurricanes.",
              sentiment: {
                positive: 4,
                neutral: 3,
                negative: 3,
              },
            },
            {
              id: 2,
              name: "No Cat 5 landfall in 2025",
              icon: "☂️",
              odds: 1.41,
              percentage: 71,
              analysis:
                "Based on the historical rarity of Category 5 landfalls in the continental US.",
              sentiment: {
                positive: 7,
                neutral: 2,
                negative: 1,
              },
            },
          ],
          participants: 615,
          totalBets: 29.74,
          comments: [
            {
              id: 1,
              user: "MeteorologyProfessor",
              text: "Cat 5 landfalls in continental US are extremely rare - only 4 in recorded history. Odds are against it in any given year.",
              time: "9 hours ago",
              likes: 15,
              stance: "bearish",
            },
            {
              id: 2,
              user: "ClimateRiskAnalyst",
              text: "Ocean temperatures continue to break records. The physical potential for Cat 5 storms is increasing each year.",
              time: "1 day ago",
              likes: 11,
              stance: "neutral",
            },
          ],
        },
        {
          id: 36,
          category: "Climate",
          categoryEmoji: "🌡️",
          title: "Carbon price to exceed $100/ton in EU in 2025?",
          description:
            "Will the EU carbon price (ETS) exceed €100 per ton at any point during 2025?",
          expiryDate: new Date("2025-12-31").getTime(),
          options: [
            {
              id: 1,
              name: "Yes, exceeds €100/ton",
              icon: "💨",
              odds: 2.2,
              percentage: 45,
              analysis:
                "Based on EU climate policy tightening and increased industrial demand for carbon allowances.",
              sentiment: {
                positive: 6,
                neutral: 3,
                negative: 1,
              },
            },
            {
              id: 2,
              name: "No, stays below €100/ton",
              icon: "📉",
              odds: 1.8,
              percentage: 55,
              analysis:
                "Based on potential economic slowdown reducing industrial emissions and demand for allowances.",
              sentiment: {
                positive: 5,
                neutral: 3,
                negative: 2,
              },
            },
          ],
          participants: 534,
          totalBets: 25.84,
          comments: [
            {
              id: 1,
              user: "CarbonTrader",
              text: "EU is setting more aggressive carbon reduction targets. €100 is almost inevitable as scarcity increases.",
              time: "6 hours ago",
              likes: 13,
              stance: "bullish",
            },
            {
              id: 2,
              user: "EnergyEconomist",
              text: "Industrial lobbying could lead to more allowances being released if prices rise too quickly, capping growth.",
              time: "2 days ago",
              likes: 9,
              stance: "bearish",
            },
          ],
        },
      ];
      setBettingEvents(events);
    };
    generateEvents();

    // Simulate some existing bets
    const simulatePastBets = () => {
      const pastBets = [
        {
          id: 101,
          eventId: 2,
          eventTitle: "Bitcoin to reach $100K before July 2025?",
          option: "Yes, BTC will reach $100K",
          amount: 0.05,
          odds: 2.1,
          potential: 0.105,
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          status: "active",
        },
        {
          id: 102,
          eventId: 7,
          eventTitle: "S&P 500 to end 2025 above 6,000?",
          option: "Yes, above 6,000",
          amount: 0.03,
          odds: 1.8,
          potential: 0.054,
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          status: "active",
        },
        {
          id: 103,
          eventId: 3,
          eventTitle: "Fed to cut rates in Q2 2025?",
          option: "No rate cut in Q2",
          amount: 0.02,
          odds: 1.6,
          potential: 0.032,
          date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
          status: "won",
          payout: 0.032,
        },
        {
          id: 104,
          eventId: 6,
          eventTitle: "Ethereum to flip Bitcoin in market cap?",
          option: "No, Bitcoin remains on top",
          amount: 0.1,
          odds: 1.12,
          potential: 0.112,
          date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          status: "lost",
        },
      ];
      setMyBets(pastBets);
    };
    simulatePastBets();
  }, []);

  // Handle adding a bet to the slip
  const handleAddToBetSlip = (event, option) => {
    setSelectedEvent(event);
    setSelectedOption(option);
    // Check if already in bet slip
    const existingBet = betSlip.find(
      (bet) => bet.eventId === event.id && bet.optionId === option.id
    );
    if (!existingBet) {
      setBetSlip([
        ...betSlip,
        {
          eventId: event.id,
          eventTitle: event.title,
          optionId: option.id,
          optionName: option.name,
          odds: option.odds,
          amount: "",
          potential: 0,
        },
      ]);
    }
    // Scroll to bet slip if on mobile
    if (window.innerWidth < 768) {
      document
        .getElementById("bet-slip")
        .scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle showing the situation popup
  const handleReadSituation = (event, option) => {
    setSituationEvent(event);
    setSituationOption(option);
  };

  // Close situation popup
  const handleCloseSituation = () => {
    setSituationEvent(null);
    setSituationOption(null);
  };

  // Remove from bet slip
  const handleRemoveFromSlip = (index) => {
    const newSlip = [...betSlip];
    newSlip.splice(index, 1);
    setBetSlip(newSlip);
  };

  // Update bet amount
  const handleUpdateBetAmount = (index, amount) => {
    const newSlip = [...betSlip];
    newSlip[index].amount = amount;
    newSlip[index].potential = (
      parseFloat(amount) * newSlip[index].odds
    ).toFixed(8);
    setBetSlip(newSlip);
  };

  // Place bet
  const handlePlaceBet = async (bet, index) => {
    if (!bet.amount || parseFloat(bet.amount) <= 0) {
      return;
    }
    setPlacingBet(true);
    setBetResult(null);
    try {
      // Simulate transaction to bet contract
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const newBet = {
        id: Date.now(),
        eventId: bet.eventId,
        eventTitle: bet.eventTitle,
        option: bet.optionName,
        amount: parseFloat(bet.amount),
        odds: bet.odds,
        potential: parseFloat(bet.potential),
        date: new Date(),
        status: "active",
      };
      setMyBets((prev) => [newBet, ...prev]);
      setBetResult({
        success: true,
        message: "Your bet has been placed successfully!",
        bet: newBet,
      });
      // Remove from slip
      handleRemoveFromSlip(index);
    } catch (error) {
      setBetResult({
        success: false,
        message: error.message || "Failed to place bet. Please try again.",
      });
    } finally {
      setPlacingBet(false);
    }
  };

  // Handle adding comment
  const handleAddComment = (eventId) => {
    if (!newComment.trim()) return;
    const updatedEvents = bettingEvents.map((event) => {
      if (event.id === eventId) {
        const newCommentObj = {
          id: Date.now(),
          user: "Me",
          text: newComment,
          time: "Just now",
          likes: 0,
        };
        return {
          ...event,
          comments: [newCommentObj, ...event.comments],
        };
      }
      return event;
    });
    setBettingEvents(updatedEvents);
    setNewComment("");
    // Update comments state
    setComments({
      ...comments,
      [eventId]: "",
    });
  };

  // Handle like comment
  const handleLikeComment = (eventId, commentId) => {
    const updatedEvents = bettingEvents.map((event) => {
      if (event.id === eventId) {
        const updatedComments = event.comments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              likes: comment.likes + 1,
            };
          }
          return comment;
        });
        return {
          ...event,
          comments: updatedComments,
        };
      }
      return event;
    });
    setBettingEvents(updatedEvents);
  };

  return (
    <div className="betting-container">
      <h1 style={{ marginBottom: "30px" }}>Bitcoin Betting</h1>
      <div
        className="betting-tabs"
        style={{
          display: "flex",
          borderBottom: "1px solid var(--border-color)",
          marginBottom: "30px",
        }}
      >
        <button
          className={`tab ${activeTab === "trending" ? "active" : ""}`}
          onClick={() => setActiveTab("trending")}
          style={{
            padding: "10px 20px",
            background: "transparent",
            border: "none",
            borderBottom:
              activeTab === "trending"
                ? "2px solid var(--accent-primary)"
                : "2px solid transparent",
            color:
              activeTab === "trending"
                ? "var(--accent-primary)"
                : "var(--text-primary)",
            cursor: "pointer",
            fontWeight: activeTab === "trending" ? "bold" : "normal",
          }}
        >
          Trending Bets
        </button>
        <button
          className={`tab ${activeTab === "categories" ? "active" : ""}`}
          onClick={() => setActiveTab("categories")}
          style={{
            padding: "10px 20px",
            background: "transparent",
            border: "none",
            borderBottom:
              activeTab === "categories"
                ? "2px solid var(--accent-primary)"
                : "2px solid transparent",
            color:
              activeTab === "categories"
                ? "var(--accent-primary)"
                : "var(--text-primary)",
            cursor: "pointer",
            fontWeight: activeTab === "categories" ? "bold" : "normal",
          }}
        >
          Categories
        </button>
        <button
          className={`tab ${activeTab === "mybets" ? "active" : ""}`}
          onClick={() => setActiveTab("mybets")}
          style={{
            padding: "10px 20px",
            background: "transparent",
            border: "none",
            borderBottom:
              activeTab === "mybets"
                ? "2px solid var(--accent-primary)"
                : "2px solid transparent",
            color:
              activeTab === "mybets"
                ? "var(--accent-primary)"
                : "var(--text-primary)",
            cursor: "pointer",
            fontWeight: activeTab === "mybets" ? "bold" : "normal",
          }}
        >
          My Bets
        </button>
      </div>
      <div
        className="betting-layout"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) 300px",
          gap: "30px",
        }}
      >
        <div className="betting-main-content">
          {activeTab === "trending" && (
            <div className="trending-bets">
              <div
                className="featured-event card"
                style={{
                  marginBottom: "30px",
                  background:
                    "linear-gradient(to right, rgba(0, 112, 243, 0.2), rgba(0, 255, 149, 0.2))",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  className="featured-tag"
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "var(--accent-primary)",
                    color: "white",
                    padding: "5px 10px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  Featured
                </div>
                <h2>
                  {bettingEvents.length > 0
                    ? bettingEvents[1]?.title
                    : "Loading..."}
                </h2>
                <p style={{ marginBottom: "20px" }}>
                  {bettingEvents.length > 0
                    ? bettingEvents[1]?.description
                    : ""}
                </p>
                <div
                  className="event-stats"
                  style={{
                    display: "flex",
                    gap: "20px",
                    marginBottom: "20px",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <p
                      style={{
                        margin: "0",
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      Total Pool
                    </p>
                    <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                      {bettingEvents.length > 0
                        ? bettingEvents[1]?.totalBets.toFixed(2)
                        : 0}{" "}
                      BTC
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        margin: "0",
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      Participants
                    </p>
                    <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                      {bettingEvents.length > 0
                        ? bettingEvents[1]?.participants
                        : 0}
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        margin: "0",
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      Closing Date
                    </p>
                    <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                      {bettingEvents.length > 0
                        ? new Date(
                            bettingEvents[1]?.expiryDate
                          ).toLocaleDateString()
                        : ""}
                    </p>
                  </div>
                </div>
                <div
                  className="betting-options"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "15px",
                    marginBottom: "20px",
                  }}
                >
                  {bettingEvents.length > 0 &&
                    bettingEvents[1]?.options.map((option) => (
                      <div
                        key={option.id}
                        className="betting-option"
                        style={{
                          background: "rgba(255, 255, 255, 0.1)",
                          borderRadius: "8px",
                          padding: "15px",
                          cursor: "pointer",
                          transition: "transform 0.2s ease",
                          border: "1px solid var(--border-color)",
                        }}
                        onClick={() =>
                          handleAddToBetSlip(bettingEvents[1], option)
                        }
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.transform = "translateY(-5px)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.transform = "translateY(0)")
                        }
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "10px",
                          }}
                        >
                          <h4 style={{ margin: "0" }}>{option.name}</h4>
                          <span
                            style={{
                              background: "var(--accent-primary)",
                              color: "white",
                              borderRadius: "5px",
                              padding: "5px 10px",
                              fontWeight: "bold",
                            }}
                          >
                            {option.odds}x
                          </span>
                        </div>
                        <div
                          className="progress-container"
                          style={{
                            height: "8px",
                            background: "rgba(255, 255, 255, 0.1)",
                            borderRadius: "4px",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            className="progress-bar"
                            style={{
                              height: "100%",
                              width: `${option.percentage}%`,
                              background: "var(--gradient-primary)",
                            }}
                          ></div>
                        </div>
                        <p
                          style={{
                            margin: "5px 0 0 0",
                            fontSize: "14px",
                            textAlign: "right",
                          }}
                        >
                          {option.percentage}%
                        </p>
                      </div>
                    ))}
                </div>
                <div className="event-comments">
                  <h3 style={{ marginBottom: "15px" }}>Discussion</h3>
                  <div style={{ marginBottom: "20px" }}>
                    <textarea
                      placeholder="Add your comment..."
                      value={
                        comments[
                          bettingEvents.length > 0 ? bettingEvents[1]?.id : ""
                        ] || ""
                      }
                      onChange={(e) =>
                        setComments({
                          ...comments,
                          [bettingEvents[1]?.id]: e.target.value,
                        })
                      }
                      style={{
                        width: "100%",
                        minHeight: "80px",
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid var(--border-color)",
                        borderRadius: "8px",
                        padding: "10px",
                        color: "var(--text-primary)",
                        resize: "vertical",
                      }}
                    ></textarea>
                    <button
                      onClick={() => handleAddComment(bettingEvents[1]?.id)}
                      className="btn"
                      style={{ marginTop: "10px" }}
                      disabled={!comments[bettingEvents[1]?.id]}
                    >
                      Post Comment
                    </button>
                  </div>
                  <div className="comments-list">
                    {bettingEvents.length > 0 &&
                      bettingEvents[1]?.comments.map((comment) => (
                        <div
                          key={comment.id}
                          style={{
                            background: "rgba(255, 255, 255, 0.05)",
                            borderRadius: "8px",
                            padding: "15px",
                            marginBottom: "10px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: "5px",
                            }}
                          >
                            <p style={{ margin: "0", fontWeight: "bold" }}>
                              {comment.user}
                            </p>
                            <p
                              style={{
                                margin: "0",
                                fontSize: "12px",
                                color: "var(--text-secondary)",
                              }}
                            >
                              {comment.time}
                            </p>
                          </div>
                          <p style={{ margin: "5px 0 10px 0" }}>
                            {comment.text}
                          </p>
                          <button
                            onClick={() =>
                              handleLikeComment(
                                bettingEvents[1]?.id,
                                comment.id
                              )
                            }
                            style={{
                              background: "transparent",
                              border: "none",
                              color: "var(--text-secondary)",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                              padding: "0",
                              fontSize: "14px",
                            }}
                          >
                            👍 {comment.likes}
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <h3 style={{ marginBottom: "20px" }}>Trending Bets</h3>
              <div
                className="events-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: "20px",
                }}
              >
                {bettingEvents
                  .filter((event) => event.hot)
                  .map((event) => (
                    <div
                      key={event.id}
                      className="card event-card"
                      style={{
                        cursor: "pointer",
                        transition: "transform 0.2s ease",
                        position: "relative",
                        overflow: "hidden",
                      }}
                      onClick={() => setSelectedEvent(event)}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "translateY(-5px)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "translateY(0)")
                      }
                    >
                      {event.hot && (
                        <span
                          style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            background: "var(--accent-danger)",
                            borderRadius: "20px",
                            padding: "2px 8px",
                            fontSize: "12px",
                            fontWeight: "bold",
                            color: "white",
                          }}
                        >
                          HOT
                        </span>
                      )}
                      <div style={{ marginBottom: "10px" }}>
                        <span
                          style={{
                            background: "rgba(0, 112, 243, 0.1)",
                            color: "var(--accent-primary)",
                            borderRadius: "20px",
                            padding: "2px 8px",
                            fontSize: "12px",
                          }}
                        >
                          {event.category}
                        </span>
                      </div>
                      <h3 style={{ margin: "0 0 10px 0" }}>{event.title}</h3>
                      <p
                        style={{
                          color: "var(--text-secondary)",
                          fontSize: "14px",
                          marginBottom: "15px",
                        }}
                      >
                        {event.description}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "14px",
                          marginBottom: "10px",
                        }}
                      >
                        <span>Pool: {event.totalBets.toFixed(2)} BTC</span>
                        <span>
                          Closes:{" "}
                          {new Date(event.expiryDate).toLocaleDateString()}
                        </span>
                      </div>
                      <button
                        className="btn btn-outline"
                        style={{ width: "100%" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEvent(event);
                        }}
                      >
                        View Options
                      </button>
                    </div>
                  ))}
              </div>
              <h3 style={{ margin: "30px 0 20px 0" }}>All Betting Events</h3>
              <div
                className="events-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: "20px",
                }}
              >
                {bettingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="card event-card"
                    style={{
                      cursor: "pointer",
                      transition: "transform 0.2s ease",
                    }}
                    onClick={() => setSelectedEvent(event)}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "translateY(-5px)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "translateY(0)")
                    }
                  >
                    <div style={{ marginBottom: "10px" }}>
                      <span
                        style={{
                          background: "rgba(0, 112, 243, 0.1)",
                          color: "var(--accent-primary)",
                          borderRadius: "20px",
                          padding: "2px 8px",
                          fontSize: "12px",
                        }}
                      >
                        {event.category}
                      </span>
                      {event.hot && (
                        <span
                          style={{
                            background: "var(--accent-danger)",
                            borderRadius: "20px",
                            padding: "2px 8px",
                            fontSize: "12px",
                            fontWeight: "bold",
                            color: "white",
                            marginLeft: "5px",
                          }}
                        >
                          HOT
                        </span>
                      )}
                    </div>
                    <h3 style={{ margin: "0 0 10px 0" }}>{event.title}</h3>
                    <p
                      style={{
                        color: "var(--text-secondary)",
                        fontSize: "14px",
                        marginBottom: "15px",
                      }}
                    >
                      {event.description}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "14px",
                        marginBottom: "10px",
                      }}
                    >
                      <span>Pool: {event.totalBets.toFixed(2)} BTC</span>
                      <span>
                        Closes:{" "}
                        {new Date(event.expiryDate).toLocaleDateString()}
                      </span>
                    </div>
                    <button
                      className="btn btn-outline"
                      style={{ width: "100%" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEvent(event);
                      }}
                    >
                      View Options
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === "categories" && (
            <div className="categories-tab">
              <div
                className="categories-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                  gap: "20px",
                  marginBottom: "30px",
                }}
              >
                {[
                  "Politics",
                  "Crypto",
                  "Economy",
                  "Tech",
                  "Sports",
                  "Climate",
                ].map((category) => (
                  <div
                    key={category}
                    className="category-card card"
                    style={{
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "transform 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "translateY(-5px)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "translateY(0)")
                    }
                  >
                    <div
                      style={{
                        fontSize: "36px",
                        marginBottom: "10px",
                      }}
                    >
                      {category === "Politics"
                        ? "🏛️"
                        : category === "Crypto"
                        ? "₿"
                        : category === "Economy"
                        ? "📊"
                        : category === "Tech"
                        ? "💻"
                        : category === "Sports"
                        ? "🏆"
                        : "🌡️"}
                    </div>
                    <h3>{category}</h3>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {
                        bettingEvents.filter(
                          (event) => event.category === category
                        ).length
                      }{" "}
                      events
                    </p>
                  </div>
                ))}
              </div>
              <div>
                {[
                  "Politics",
                  "Crypto",
                  "Economy",
                  "Tech",
                  "Sports",
                  "Climate",
                ].map((category) => (
                  <div key={category} style={{ marginBottom: "30px" }}>
                    <h3 style={{ marginBottom: "20px" }}>{category}</h3>
                    <div className="events-list">
                      {bettingEvents
                        .filter((event) => event.category === category)
                        .map((event) => (
                          <div
                            key={event.id}
                            className="card"
                            style={{
                              marginBottom: "15px",
                              cursor: "pointer",
                            }}
                            onClick={() => setSelectedEvent(event)}
                          >
                            <h3 style={{ marginBottom: "10px" }}>
                              {event.title}
                            </h3>
                            <p
                              style={{
                                color: "var(--text-secondary)",
                                marginBottom: "15px",
                              }}
                            >
                              {event.description}
                            </p>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                flexWrap: "wrap",
                                gap: "10px",
                              }}
                            >
                              <div>
                                <span
                                  style={{
                                    fontSize: "14px",
                                    color: "var(--text-secondary)",
                                  }}
                                >
                                  Closes:{" "}
                                  {new Date(
                                    event.expiryDate
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <div>
                                <span
                                  style={{
                                    fontSize: "14px",
                                    color: "var(--text-secondary)",
                                  }}
                                >
                                  Pool: {event.totalBets.toFixed(2)} BTC
                                </span>
                              </div>
                              <div>
                                <span
                                  style={{
                                    fontSize: "14px",
                                    color: "var(--text-secondary)",
                                  }}
                                >
                                  Participants: {event.participants}
                                </span>
                              </div>
                            </div>
                            <div
                              className="betting-options"
                              style={{
                                display: "flex",
                                gap: "15px",
                                marginTop: "15px",
                                flexWrap: "wrap",
                              }}
                            >
                              {event.options.map((option) => (
                                <button
                                  key={option.id}
                                  className="betting-option"
                                  style={{
                                    background: "rgba(255, 255, 255, 0.05)",
                                    border: "1px solid var(--border-color)",
                                    borderRadius: "8px",
                                    padding: "10px 15px",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddToBetSlip(event, option);
                                  }}
                                >
                                  <span>{option.name}</span>
                                  <span
                                    style={{
                                      background: "var(--accent-primary)",
                                      color: "white",
                                      borderRadius: "5px",
                                      padding: "2px 6px",
                                      fontSize: "12px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {option.odds}x
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === "mybets" && (
            <div className="mybets-tab">
              <div
                className="mybets-tabs"
                style={{
                  display: "flex",
                  marginBottom: "20px",
                }}
              >
                <button
                  className={`tab ${
                    activeBetView === "active" ? "active" : ""
                  }`}
                  onClick={() => setActiveBetView("active")}
                  style={{
                    padding: "8px 15px",
                    background:
                      activeBetView === "active"
                        ? "var(--accent-primary)"
                        : "rgba(255, 255, 255, 0.05)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "8px 0 0 8px",
                    color:
                      activeBetView === "active"
                        ? "white"
                        : "var(--text-primary)",
                    cursor: "pointer",
                  }}
                >
                  Active Bets
                </button>
                <button
                  className={`tab ${
                    activeBetView === "settled" ? "active" : ""
                  }`}
                  onClick={() => setActiveBetView("settled")}
                  style={{
                    padding: "8px 15px",
                    background:
                      activeBetView === "settled"
                        ? "var(--accent-primary)"
                        : "rgba(255, 255, 255, 0.05)",
                    border: "1px solid var(--border-color)",
                    borderLeft: "none",
                    borderRadius: "0 8px 8px 0",
                    color:
                      activeBetView === "settled"
                        ? "white"
                        : "var(--text-primary)",
                    cursor: "pointer",
                  }}
                >
                  Settled Bets
                </button>
              </div>
              {myBets.filter((bet) =>
                activeBetView === "active"
                  ? bet.status === "active"
                  : bet.status === "won" || bet.status === "lost"
              ).length > 0 ? (
                <div className="bets-list">
                  {myBets
                    .filter((bet) =>
                      activeBetView === "active"
                        ? bet.status === "active"
                        : bet.status === "won" || bet.status === "lost"
                    )
                    .map((bet) => (
                      <div
                        key={bet.id}
                        className="card"
                        style={{
                          marginBottom: "15px",
                          borderLeft:
                            bet.status === "won"
                              ? "4px solid var(--accent-secondary)"
                              : bet.status === "lost"
                              ? "4px solid var(--accent-danger)"
                              : "4px solid var(--accent-primary)",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                          }}
                        >
                          <div>
                            <h3 style={{ marginBottom: "5px" }}>
                              {bet.eventTitle}
                            </h3>
                            <p
                              style={{
                                color: "var(--text-secondary)",
                                fontSize: "14px",
                              }}
                            >
                              Placed on{" "}
                              {new Date(bet.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div
                            style={{
                              background:
                                bet.status === "won"
                                  ? "rgba(0, 255, 149, 0.1)"
                                  : bet.status === "lost"
                                  ? "rgba(255, 71, 87, 0.1)"
                                  : "rgba(0, 112, 243, 0.1)",
                              color:
                                bet.status === "won"
                                  ? "var(--accent-secondary)"
                                  : bet.status === "lost"
                                  ? "var(--accent-danger)"
                                  : "var(--accent-primary)",
                              borderRadius: "20px",
                              padding: "5px 10px",
                              fontSize: "14px",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            {bet.status}
                          </div>
                        </div>
                        <div
                          style={{
                            background: "rgba(255, 255, 255, 0.05)",
                            borderRadius: "8px",
                            padding: "15px",
                            marginTop: "15px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: "10px",
                            }}
                          >
                            <p style={{ margin: "0", fontWeight: "bold" }}>
                              Prediction
                            </p>
                            <p style={{ margin: "0" }}>{bet.option}</p>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: "10px",
                            }}
                          >
                            <p style={{ margin: "0" }}>Amount</p>
                            <p style={{ margin: "0", fontWeight: "bold" }}>
                              {bet.amount.toFixed(8)} BTC
                            </p>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: "10px",
                            }}
                          >
                            <p style={{ margin: "0" }}>Odds</p>
                            <p style={{ margin: "0" }}>{bet.odds}x</p>
                          </div>
                          {bet.status === "active" && (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p style={{ margin: "0" }}>Potential Payout</p>
                              <p
                                style={{
                                  margin: "0",
                                  fontWeight: "bold",
                                  color: "var(--accent-secondary)",
                                }}
                              >
                                {bet.potential.toFixed(8)} BTC
                              </p>
                            </div>
                          )}
                          {bet.status === "won" && (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p style={{ margin: "0" }}>Payout Received</p>
                              <p
                                style={{
                                  margin: "0",
                                  fontWeight: "bold",
                                  color: "var(--accent-secondary)",
                                }}
                              >
                                +{bet.payout.toFixed(8)} BTC
                              </p>
                            </div>
                          )}
                          {bet.status === "lost" && (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p style={{ margin: "0" }}>Outcome</p>
                              <p
                                style={{
                                  margin: "0",
                                  color: "var(--accent-danger)",
                                }}
                              >
                                Bet Lost
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div
                  className="card"
                  style={{ textAlign: "center", padding: "40px 20px" }}
                >
                  <p style={{ fontSize: "18px", marginBottom: "20px" }}>
                    {activeBetView === "active"
                      ? "You don't have any active bets"
                      : "You don't have any settled bets"}
                  </p>
                  <button
                    onClick={() => setActiveTab("trending")}
                    className="btn"
                  >
                    {activeBetView === "active"
                      ? "Place a Bet"
                      : "View Betting Events"}
                  </button>
                </div>
              )}
            </div>
          )}
          {selectedEvent && (
            <div
              className="event-detail-modal"
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0, 0, 0, 0.8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
                padding: "20px",
              }}
            >
              <div
                className="card"
                style={{
                  width: "100%",
                  maxWidth: "800px",
                  maxHeight: "90vh",
                  overflow: "auto",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "20px",
                  }}
                >
                  <h2 style={{ margin: "0" }}>{selectedEvent.title}</h2>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "var(--text-primary)",
                      fontSize: "24px",
                      cursor: "pointer",
                    }}
                  >
                    ×
                  </button>
                </div>
                <p style={{ marginBottom: "20px" }}>
                  {selectedEvent.description}
                </p>
                <div
                  className="event-stats"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                    gap: "15px",
                    marginBottom: "20px",
                  }}
                >
                  <div>
                    <p
                      style={{
                        margin: "0",
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      Category
                    </p>
                    <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                      {selectedEvent.category}
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        margin: "0",
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      Total Pool
                    </p>
                    <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                      {selectedEvent.totalBets.toFixed(2)} BTC
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        margin: "0",
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      Participants
                    </p>
                    <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                      {selectedEvent.participants}
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        margin: "0",
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      Closing Date
                    </p>
                    <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                      {new Date(selectedEvent.expiryDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <h3 style={{ marginBottom: "15px" }}>Betting Options</h3>
                <div
                  className="betting-options"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "15px",
                    marginBottom: "30px",
                  }}
                >
                  {selectedEvent.options.map((option) => (
                    <BettingOptionDetail
                      key={option.id}
                      event={selectedEvent}
                      option={option}
                      handleAddToBetSlip={handleAddToBetSlip}
                      handleReadSituation={handleReadSituation}
                    />
                  ))}
                </div>
                <div className="event-comments">
                  <h3 style={{ marginBottom: "15px" }}>Discussion</h3>
                  <div style={{ marginBottom: "20px" }}>
                    <textarea
                      placeholder="Add your comment..."
                      value={comments[selectedEvent.id] || ""}
                      onChange={(e) =>
                        setComments({
                          ...comments,
                          [selectedEvent.id]: e.target.value,
                        })
                      }
                      style={{
                        width: "100%",
                        minHeight: "80px",
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid var(--border-color)",
                        borderRadius: "8px",
                        padding: "10px",
                        color: "var(--text-primary)",
                        resize: "vertical",
                      }}
                    ></textarea>
                    <button
                      onClick={() => handleAddComment(selectedEvent.id)}
                      className="btn"
                      style={{ marginTop: "10px" }}
                      disabled={!comments[selectedEvent.id]}
                    >
                      Post Comment
                    </button>
                  </div>
                  <div className="comments-list">
                    {selectedEvent.comments.map((comment) => (
                      <div
                        key={comment.id}
                        style={{
                          background: "rgba(255, 255, 255, 0.05)",
                          borderRadius: "8px",
                          padding: "15px",
                          marginBottom: "10px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "5px",
                          }}
                        >
                          <p style={{ margin: "0", fontWeight: "bold" }}>
                            {comment.user}
                          </p>
                          <p
                            style={{
                              margin: "0",
                              fontSize: "12px",
                              color: "var(--text-secondary)",
                            }}
                          >
                            {comment.time}
                          </p>
                        </div>
                        <p style={{ margin: "5px 0 10px 0" }}>{comment.text}</p>
                        <button
                          onClick={() =>
                            handleLikeComment(selectedEvent.id, comment.id)
                          }
                          style={{
                            background: "transparent",
                            border: "none",
                            color: "var(--text-secondary)",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                            padding: "0",
                            fontSize: "14px",
                          }}
                        >
                          👍 {comment.likes}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="bet-slip" id="bet-slip">
          <div
            className="card"
            style={{
              position: "sticky",
              top: "90px",
              maxHeight: "calc(100vh - 120px)",
              overflowY: "auto",
            }}
          >
            <h3 style={{ marginBottom: "20px" }}>Bet Slip</h3>
            {betSlip.length > 0 ? (
              <div>
                {betSlip.map((bet, index) => (
                  <div
                    key={index}
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      borderRadius: "8px",
                      padding: "15px",
                      marginBottom: "15px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <h4
                          style={{
                            margin: "0 0 5px 0",
                            fontSize: "16px",
                          }}
                        >
                          {bet.eventTitle}
                        </h4>
                        <p style={{ margin: "0", fontSize: "14px" }}>
                          {bet.optionName}
                        </p>
                        <p
                          style={{
                            margin: "5px 0 0 0",
                            fontSize: "14px",
                            color: "var(--accent-primary)",
                          }}
                        >
                          Odds: {bet.odds}x
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveFromSlip(index)}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "var(--text-secondary)",
                          cursor: "pointer",
                          fontSize: "18px",
                        }}
                      >
                        ×
                      </button>
                    </div>
                    <div style={{ marginTop: "15px" }}>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "5px",
                          fontSize: "14px",
                        }}
                      >
                        Bet Amount (BTC)
                      </label>
                      <input
                        type="number"
                        value={bet.amount}
                        onChange={(e) =>
                          handleUpdateBetAmount(index, e.target.value)
                        }
                        placeholder="0.00000000"
                        step="0.00000001"
                        min="0.00000001"
                        max={balance}
                        style={{
                          background: "rgba(255, 255, 255, 0.05)",
                          border: "1px solid var(--border-color)",
                          borderRadius: "8px",
                          padding: "8px 10px",
                          width: "100%",
                          color: "var(--text-primary)",
                          marginBottom: "10px",
                        }}
                      />
                      {bet.amount && (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: "14px",
                            marginBottom: "15px",
                          }}
                        >
                          <p style={{ margin: "0" }}>Potential Win:</p>
                          <p
                            style={{
                              margin: "0",
                              fontWeight: "bold",
                              color: "var(--accent-secondary)",
                            }}
                          >
                            {bet.potential} BTC
                          </p>
                        </div>
                      )}
                      <button
                        onClick={() => handlePlaceBet(bet, index)}
                        className="btn"
                        style={{ width: "100%" }}
                        disabled={
                          !bet.amount ||
                          parseFloat(bet.amount) <= 0 ||
                          placingBet
                        }
                      >
                        {placingBet ? "Placing Bet..." : "Place Bet"}
                      </button>
                    </div>
                  </div>
                ))}
                {betResult && (
                  <div
                    className={`bet-result ${
                      betResult.success ? "success" : "error"
                    }`}
                    style={{
                      padding: "15px",
                      borderRadius: "8px",
                      background: betResult.success
                        ? "rgba(0, 255, 149, 0.1)"
                        : "rgba(255, 71, 87, 0.1)",
                      color: betResult.success
                        ? "var(--accent-secondary)"
                        : "var(--accent-danger)",
                      border: `1px solid ${
                        betResult.success
                          ? "var(--accent-secondary)"
                          : "var(--accent-danger)"
                      }`,
                      marginTop: "15px",
                    }}
                  >
                    <p style={{ margin: "0", fontWeight: "bold" }}>
                      {betResult.success
                        ? "Bet Placed Successfully!"
                        : "Failed to Place Bet"}
                    </p>
                    <p style={{ margin: "5px 0 0 0" }}>{betResult.message}</p>
                    {betResult.success && betResult.bet && (
                      <button
                        onClick={() => setActiveTab("mybets")}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "var(--accent-secondary)",
                          cursor: "pointer",
                          padding: "0",
                          marginTop: "10px",
                          textDecoration: "underline",
                        }}
                      >
                        View your bets
                      </button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <p style={{ marginBottom: "15px" }}>Your bet slip is empty</p>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "14px",
                  }}
                >
                  Click on a betting option to add it to your slip
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Situation Popup */}
      {situationEvent && situationOption && (
        <EventSituationPopup
          event={situationEvent}
          option={situationOption}
          onClose={handleCloseSituation}
        />
      )}
    </div>
  );
}

export default Betting;
