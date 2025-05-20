import React, { useState, useContext, useEffect, useRef } from "react";
import WalletContext from "./WalletContext";
import "./Staking.css";

function Staking() {
  const { wallet, balance = 0, exchangeRates = {} } = useContext(WalletContext);
  const [actualBalance, setActualBalance] = useState(3); // Set available balance to 3 BTC
  const [stakeAmount, setStakeAmount] = useState("");
  const [stakePeriod, setStakePeriod] = useState("3");
  const [customPeriod, setCustomPeriod] = useState("");
  const [activeTab, setActiveTab] = useState("stake");
  const [estimatedRewards, setEstimatedRewards] = useState(0);
  const [staking, setStaking] = useState(false);
  const [stakingResult, setStakingResult] = useState(null);
  const [myStakes, setMyStakes] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedStake, setSelectedStake] = useState(null);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState({});
  const [validationError, setValidationError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("idle");
  const confirmationModalRef = useRef(null);
  const [successAnimation, setSuccessAnimation] = useState(false);

  const [stakingOptions, setStakingOptions] = useState([
    {
      id: 1,
      name: "Bitcoin Core Staking",
      apr: 6.5,
      description: "Participate in Bitcoin network security and earn rewards",
      minAmount: 0.01,
      maxAmount: 10,
      periods: [3, 6, 12, "custom"],
      issuer: "Bitcoin Foundation",
      registeredUsers: 13872,
      issuerDetails:
        "The Bitcoin Foundation is dedicated to advancing Bitcoin through standardization and education.",
      icon: "🔒",
    },
    {
      id: 2,
      name: "Lightning Network Staking",
      apr: 7.2,
      description: "Stake your BTC in Lightning Network channels",
      minAmount: 0.005,
      maxAmount: 5,
      periods: [1, 3, 6, 12],
      issuer: "Lightning Labs",
      registeredUsers: 9521,
      issuerDetails:
        "Lightning Labs is building the next generation of decentralized financial infrastructure.",
      icon: "⚡",
    },
    {
      id: 3,
      name: "Yield Enhancement",
      apr: 8.5,
      description: "Advanced staking with optimized yield strategies",
      minAmount: 0.1,
      maxAmount: 20,
      periods: [6, 12, 24],
      issuer: "DeFi Alliance",
      registeredUsers: 7364,
      issuerDetails:
        "DeFi Alliance provides optimized yield strategies across multiple networks and platforms.",
      icon: "📈",
    },
    {
      id: 4,
      name: "US Treasury Bond BTC Index",
      apr: 4.2,
      description: "BTC-denominated exposure to US government bonds",
      minAmount: 0.05,
      maxAmount: 50,
      periods: [12, 24, 36, 60],
      issuer: "Crypto Treasury Partners",
      registeredUsers: 5631,
      issuerDetails:
        "Crypto Treasury Partners specializes in tokenizing traditional financial instruments.",
      icon: "🇺🇸",
    },
    {
      id: 5,
      name: "Gold-Backed BTC Vault",
      apr: 3.8,
      description: "Bitcoin staking backed by physical gold reserves",
      minAmount: 0.025,
      maxAmount: 25,
      periods: [6, 12, 24, 36],
      issuer: "Digital Gold Reserve",
      registeredUsers: 4215,
      issuerDetails:
        "Digital Gold Reserve maintains 100% gold backing in secure vaults across Switzerland, Singapore, and Canada.",
      icon: "🏆",
    },
    {
      id: 6,
      name: "Japanese Govt Bond BTC Pool",
      apr: 3.5,
      description:
        "BTC staking with exposure to Japanese government securities",
      minAmount: 0.02,
      maxAmount: 15,
      periods: [12, 24, 36],
      issuer: "Tokyo Crypto Finance Group",
      registeredUsers: 3147,
      issuerDetails:
        "Tokyo Crypto Finance Group is a regulated entity that bridges traditional Japanese finance with cryptocurrency markets.",
      icon: "🇯🇵",
    },
    {
      id: 7,
      name: "European Bond BTC Index",
      apr: 4.0,
      description: "Diversified exposure to European government bonds via BTC",
      minAmount: 0.05,
      maxAmount: 30,
      periods: [12, 24, 36, 48],
      issuer: "Euro Digital Assets",
      registeredUsers: 2983,
      issuerDetails:
        "Euro Digital Assets provides regulated, compliant exposure to European financial markets.",
      icon: "🇪🇺",
    },
  ]);

  const [selectedOption, setSelectedOption] = useState(stakingOptions[0]);

  // Initialize comments state for each staking option
  useEffect(() => {
    const initialComments = {};
    stakingOptions.forEach((option) => {
      initialComments[option.id] = [
        {
          id: `${option.id}-comment-1`,
          user: "SatoshiFan",
          text: `Really enjoying the returns from ${option.name}. Consistently reliable!`,
          timestamp: new Date(Date.now() - 3600000 * 24 * 3).toISOString(),
          likes: 42,
          replies: [
            {
              id: `${option.id}-reply-1`,
              user: "BTCmaximalist",
              text: "How long have you been staking with them?",
              timestamp: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
              likes: 8,
            },
          ],
        },
        {
          id: `${option.id}-comment-2`,
          user: "CryptoWhale",
          text: `${option.apr}% APR is competitive in the current market. Been staking for 6 months.`,
          timestamp: new Date(Date.now() - 3600000 * 24 * 1).toISOString(),
          likes: 28,
          replies: [],
        },
      ];
    });
    setComments(initialComments);
  }, [stakingOptions]);

  // Validate stake amount
  const validateStakeAmount = (amount) => {
    if (!amount) {
      setValidationError(null);
      return;
    }

    const numAmount = parseFloat(amount);

    if (numAmount < selectedOption.minAmount) {
      setValidationError(
        `Minimum value (${selectedOption.minAmount}) must be less than the maximum value (${selectedOption.maxAmount}).`
      );
    } else if (numAmount > selectedOption.maxAmount) {
      setValidationError(
        `Maximum stake amount is ${selectedOption.maxAmount} BTC.`
      );
    } else if (numAmount > actualBalance) {
      setValidationError(
        `Insufficient balance. You have ${actualBalance} BTC available.`
      );
    } else {
      setValidationError(null);
    }
  };

  // Handle stake amount change
  const handleStakeAmountChange = (e) => {
    const value = e.target.value;
    setStakeAmount(value);
    validateStakeAmount(value);
  };

  // Calculate estimated rewards whenever input changes
  useEffect(() => {
    if (stakeAmount && stakePeriod) {
      const period =
        stakePeriod === "custom"
          ? parseInt(customPeriod)
          : parseInt(stakePeriod);

      if (period > 0) {
        const apr = selectedOption.apr / 100;
        const rewards = parseFloat(stakeAmount) * ((apr * period) / 12);
        setEstimatedRewards(rewards);
      }
    } else {
      setEstimatedRewards(0);
    }
  }, [stakeAmount, stakePeriod, customPeriod, selectedOption]);

  // Reset validation when option changes
  useEffect(() => {
    if (stakeAmount) {
      validateStakeAmount(stakeAmount);
    }
  }, [selectedOption]);

  const handleStake = async (e) => {
    e.preventDefault();

    if (
      !stakeAmount ||
      !stakePeriod ||
      (stakePeriod === "custom" && !customPeriod) ||
      validationError
    ) {
      return;
    }

    // Start connection animation
    setConnectionStatus("connecting");

    // Simulate network connection time
    setTimeout(() => {
      setConnectionStatus("confirming");

      // Simulate blockchain confirmation time
      setTimeout(() => {
        setConnectionStatus("idle");
        setSuccessAnimation(true);
        setShowConfirmationModal(true);
      }, 1500);
    }, 2000);
  };

  const confirmStaking = async () => {
    setStaking(true);
    setStakingResult(null);
    setShowConfirmationModal(false);
    setSuccessAnimation(false);

    try {
      // Simulate staking process
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const stakedAmount = parseFloat(stakeAmount);
      const period =
        stakePeriod === "custom"
          ? parseInt(customPeriod)
          : parseInt(stakePeriod);
      const rewards =
        stakedAmount * (((selectedOption.apr / 100) * period) / 12);

      // Reduce the balance by the staked amount
      setActualBalance((prevBalance) => prevBalance - stakedAmount);

      const newStake = {
        id: Date.now().toString(),
        amount: stakedAmount,
        period: period,
        option: selectedOption.name,
        optionIcon: selectedOption.icon,
        startDate: new Date(),
        endDate: new Date(Date.now() + period * 30 * 24 * 60 * 60 * 1000), // Approximate months to milliseconds
        estimatedRewards: rewards,
        status: "active",
        movements: [
          {
            date: new Date(),
            type: "stake",
            amount: stakedAmount,
            description: `Initial stake of ${stakeAmount} BTC for ${period} months`,
          },
        ],
        issuer: selectedOption.issuer,
        apr: selectedOption.apr,
      };

      setMyStakes((prev) => [newStake, ...prev]);

      setStakingResult({
        success: true,
        message: "Your Bitcoin has been successfully staked!",
        stake: newStake,
      });

      // Reset form
      setStakeAmount("");
      setStakePeriod("3");
      setCustomPeriod("");
      setActiveTab("mystakes");
    } catch (error) {
      setStakingResult({
        success: false,
        message: error.message || "Failed to stake Bitcoin. Please try again.",
      });
    } finally {
      setStaking(false);
    }
  };

  const handleUnstake = async (stakeId) => {
    // Find the stake to unstake
    const stakeToUnstake = myStakes.find((stake) => stake.id === stakeId);
    setSelectedStake(stakeToUnstake);

    // Show confirmation modal
    setShowConfirmationModal(true);
  };

  const confirmUnstaking = async () => {
    if (!selectedStake) return;

    setShowConfirmationModal(false);

    // Simulate unstaking process with animation
    setConnectionStatus("connecting");

    setTimeout(() => {
      setConnectionStatus("confirming");

      setTimeout(() => {
        setConnectionStatus("idle");

        // Return the balance when unstaking
        setActualBalance((prevBalance) => prevBalance + selectedStake.amount);

        // Update the stake status
        const updatedStakes = myStakes.map((stake) => {
          if (stake.id === selectedStake.id) {
            return {
              ...stake,
              status: "unstaking",
              movements: [
                ...stake.movements,
                {
                  date: new Date(),
                  type: "unstake",
                  amount: stake.amount,
                  description: "Early withdrawal of staked Bitcoin",
                },
              ],
            };
          }
          return stake;
        });
        setMyStakes(updatedStakes);

        // Simulate final processing time
        setTimeout(() => {
          setMyStakes(
            myStakes.filter((stake) => stake.id !== selectedStake.id)
          );
          setSelectedStake(null);
        }, 3000);
      }, 1500);
    }, 2000);
  };

  const handleAddComment = (optionId) => {
    if (!newComment.trim()) return;

    const newCommentObj = {
      id: `${optionId}-comment-${Date.now()}`,
      user: "You",
      text: newComment,
      timestamp: new Date().toISOString(),
      likes: 0,
      replies: [],
    };

    setComments((prev) => ({
      ...prev,
      [optionId]: [newCommentObj, ...(prev[optionId] || [])],
    }));

    setNewComment("");
  };

  const handleAddReply = (optionId, commentId, replyText) => {
    if (!replyText.trim()) return;

    const newReply = {
      id: `${commentId}-reply-${Date.now()}`,
      user: "You",
      text: replyText,
      timestamp: new Date().toISOString(),
      likes: 0,
    };

    const updatedComments = { ...comments };
    const commentIndex = updatedComments[optionId].findIndex(
      (c) => c.id === commentId
    );

    if (commentIndex !== -1) {
      updatedComments[optionId][commentIndex].replies.push(newReply);
      setComments(updatedComments);
    }
  };

  const toggleComments = (optionId) => {
    setShowComments((prev) => ({
      ...prev,
      [optionId]: !prev[optionId],
    }));
  };

  // Close modal if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        confirmationModalRef.current &&
        !confirmationModalRef.current.contains(event.target)
      ) {
        setShowConfirmationModal(false);
        setSuccessAnimation(false);
      }
    }

    if (showConfirmationModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showConfirmationModal]);

  return (
    <div className="staking-container">
      <h1 style={{ marginBottom: "30px" }}>Bitcoin Staking</h1>

      <div className="staking-tabs">
        <button
          className={`tab ${activeTab === "stake" ? "active" : ""}`}
          onClick={() => setActiveTab("stake")}
        >
          Stake Bitcoin
        </button>
        <button
          className={`tab ${activeTab === "mystakes" ? "active" : ""}`}
          onClick={() => setActiveTab("mystakes")}
        >
          My Stakes
        </button>
      </div>

      {activeTab === "stake" && (
        <div className="stake-tab">
          <div className="staking-options">
            {stakingOptions.map((option) => (
              <div
                key={option.id}
                className={`card staking-option ${
                  selectedOption.id === option.id ? "selected" : ""
                }`}
                onClick={() => setSelectedOption(option)}
              >
                <div className="option-header">
                  <h3>
                    <span className="option-icon">{option.icon}</span>
                    {option.name}
                  </h3>
                  <div className="apr-badge">{option.apr}% APR</div>
                </div>
                <p className="option-description">{option.description}</p>
                <div className="issuer-info">
                  <div className="info-row">
                    <span>Issuer:</span>
                    <span className="bold-text">{option.issuer}</span>
                  </div>
                  <div className="info-row">
                    <span>Users:</span>
                    <span>{option.registeredUsers.toLocaleString()}</span>
                  </div>
                </div>
                <div className="amount-limits">
                  <div className="info-row">
                    <span>Min. Amount:</span>
                    <span>{option.minAmount} BTC</span>
                  </div>
                  <div className="info-row">
                    <span>Max. Amount:</span>
                    <span>{option.maxAmount} BTC</span>
                  </div>
                </div>

                {/* Comments section */}
                <div className="comments-section">
                  <div
                    className="comments-toggle"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleComments(option.id);
                    }}
                  >
                    <span>💬 {comments[option.id]?.length || 0} Comments</span>
                    <span>{showComments[option.id] ? "▲" : "▼"}</span>
                  </div>

                  {showComments[option.id] && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="comments-container"
                    >
                      <div className="comment-input">
                        <input
                          type="text"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Add a comment..."
                          onClick={(e) => e.stopPropagation()}
                        />
                        <button
                          onClick={() => handleAddComment(option.id)}
                          className="comment-btn"
                        >
                          Post
                        </button>
                      </div>

                      {comments[option.id]?.map((comment) => (
                        <div key={comment.id} className="comment">
                          <div className="comment-header">
                            <strong>{comment.user}</strong>
                            <span className="timestamp">
                              {new Date(comment.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="comment-text">{comment.text}</p>
                          <div className="comment-actions">
                            <span>👍 {comment.likes}</span>
                            <span className="reply-btn">Reply</span>
                          </div>

                          {comment.replies.length > 0 && (
                            <div className="replies">
                              {comment.replies.map((reply) => (
                                <div key={reply.id} className="reply">
                                  <div className="comment-header">
                                    <strong>{reply.user}</strong>
                                    <span className="timestamp">
                                      {new Date(
                                        reply.timestamp
                                      ).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <p className="comment-text">{reply.text}</p>
                                  <div className="comment-actions">
                                    <span>👍 {reply.likes}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="card">
            <h3>Stake Your Bitcoin</h3>

            {/* Added balance display */}
            <div className="balance-info">
              <h4>Available Balance</h4>
              <p className="balance-amount">{actualBalance.toFixed(8)} BTC</p>
              {exchangeRates?.usd && (
                <p className="fiat-equivalent">
                  ≈ ${(actualBalance * exchangeRates.usd).toFixed(2)}
                </p>
              )}
            </div>

            <div className="issuer-details">
              <h4>About {selectedOption.name}</h4>
              <p>{selectedOption.issuerDetails}</p>
              <div className="issuer-stats">
                <span>
                  Active Users:{" "}
                  {selectedOption.registeredUsers.toLocaleString()}
                </span>
                <span>Min. Stake: {selectedOption.minAmount} BTC</span>
              </div>
            </div>

            <form onSubmit={handleStake}>
              <div className="form-group">
                <label>Stake Amount (BTC)</label>
                <input
                  type="number"
                  value={stakeAmount}
                  onChange={handleStakeAmountChange}
                  placeholder={`Min: ${selectedOption.minAmount} BTC, Max: ${selectedOption.maxAmount} BTC`}
                  step="0.001"
                  min={selectedOption.minAmount}
                  max={Math.min(selectedOption.maxAmount, actualBalance || 0)}
                  required
                />
                {validationError && (
                  <div className="validation-error">
                    <span className="error-icon">⚠️</span> {validationError}
                  </div>
                )}
                {stakeAmount && exchangeRates?.usd && (
                  <p className="fiat-equivalent">
                    ≈ $
                    {(parseFloat(stakeAmount) * exchangeRates.usd).toFixed(2)}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label>Lock Period (Months)</label>
                <div className="period-options">
                  {selectedOption.periods.map((period) => (
                    <button
                      key={period}
                      type="button"
                      className={`period-option ${
                        stakePeriod === period.toString() ? "active" : ""
                      }`}
                      onClick={() => setStakePeriod(period.toString())}
                    >
                      {period === "custom"
                        ? "Custom"
                        : `${period} Month${period !== 1 ? "s" : ""}`}
                    </button>
                  ))}
                </div>

                {stakePeriod === "custom" && (
                  <input
                    type="number"
                    value={customPeriod}
                    onChange={(e) => setCustomPeriod(e.target.value)}
                    placeholder="Enter custom period in months"
                    min="1"
                    max="36"
                    required
                    className="custom-period-input"
                  />
                )}
              </div>

              <div className="form-group">
                <label>Staking Summary</label>
                <div className="staking-summary">
                  <div className="summary-row">
                    <p>Staking Option:</p>
                    <p className="bold-text">{selectedOption.name}</p>
                  </div>
                  <div className="summary-row">
                    <p>Amount:</p>
                    <p className="bold-text">{stakeAmount || "0"} BTC</p>
                  </div>
                  <div className="summary-row">
                    <p>Lock Period:</p>
                    <p>
                      {stakePeriod === "custom" ? customPeriod : stakePeriod}{" "}
                      month
                      {(stakePeriod !== "1" && stakePeriod !== "custom") ||
                      (stakePeriod === "custom" && customPeriod !== "1")
                        ? "s"
                        : ""}
                    </p>
                  </div>
                  <div className="summary-row">
                    <p>APR:</p>
                    <p>{selectedOption.apr}%</p>
                  </div>
                  <div className="summary-row total">
                    <p>Estimated Rewards:</p>
                    <p className="rewards-value">
                      +{estimatedRewards.toFixed(8)} BTC
                    </p>
                  </div>
                  {stakeAmount && exchangeRates?.usd && (
                    <div className="summary-row fiat-row">
                      <p></p>
                      <p className="fiat-equivalent">
                        ≈ ${(estimatedRewards * exchangeRates.usd).toFixed(2)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className={`btn ${
                  connectionStatus !== "idle" ? "connecting" : ""
                }`}
                disabled={
                  connectionStatus !== "idle" ||
                  !stakeAmount ||
                  validationError ||
                  (stakePeriod === "custom" && !customPeriod)
                }
              >
                {connectionStatus === "connecting" ? (
                  <div className="connecting-animation">
                    <div className="connecting-text">
                      Connecting to Bitcoin Network
                    </div>
                    <div className="connecting-dots">
                      <span>.</span>
                      <span>.</span>
                      <span>.</span>
                    </div>
                  </div>
                ) : connectionStatus === "confirming" ? (
                  <div className="connecting-animation">
                    <div className="connecting-text">
                      Confirming Transaction
                    </div>
                    <div className="connecting-dots">
                      <span>.</span>
                      <span>.</span>
                      <span>.</span>
                    </div>
                  </div>
                ) : (
                  "Stake Bitcoin"
                )}
              </button>
            </form>

            {stakingResult && (
              <div
                className={`staking-result ${
                  stakingResult.success ? "success" : "error"
                }`}
              >
                <p className="result-title">
                  {stakingResult.success
                    ? "Staking Successful!"
                    : "Staking Failed!"}
                </p>
                <p>{stakingResult.message}</p>
                {stakingResult.success && stakingResult.stake && (
                  <div className="stake-details">
                    <p>
                      Amount Staked:{" "}
                      <strong>
                        {stakingResult.stake.amount.toFixed(8)} BTC
                      </strong>
                    </p>
                    <p>
                      Lock Period:{" "}
                      <strong>
                        {stakingResult.stake.period} month
                        {stakingResult.stake.period !== 1 ? "s" : ""}
                      </strong>
                    </p>
                    <p>
                      Expected Rewards:{" "}
                      <strong className="rewards-value">
                        {stakingResult.stake.estimatedRewards.toFixed(8)} BTC
                      </strong>
                    </p>
                    <p>
                      Unlock Date:{" "}
                      <strong>
                        {stakingResult.stake.endDate.toLocaleDateString()}
                      </strong>
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "mystakes" && (
        <div className="mystakes-tab">
          <div className="card">
            <h3>My Active Stakes</h3>

            {myStakes.length > 0 ? (
              <div className="stakes-list">
                {myStakes.map((stake) => (
                  <div key={stake.id} className={`stake-card ${stake.status}`}>
                    <div className="stake-header">
                      <div>
                        <h4>
                          <span className="option-icon">
                            {stake.optionIcon}
                          </span>
                          {stake.option}
                        </h4>
                        <p className="stake-date">
                          Started on{" "}
                          {new Date(stake.startDate).toLocaleDateString()}
                        </p>
                        <p className="stake-issuer">
                          Issued by: {stake.issuer}
                        </p>
                      </div>
                      <div className={`status-badge ${stake.status}`}>
                        {stake.status}
                      </div>
                    </div>

                    <div className="stake-grid">
                      <div className="stake-data">
                        <p className="data-label">Staked Amount</p>
                        <p className="data-value">
                          {stake.amount.toFixed(8)} BTC
                        </p>
                        {exchangeRates?.usd && (
                          <p className="fiat-equivalent">
                            ≈ ${(stake.amount * exchangeRates.usd).toFixed(2)}
                          </p>
                        )}
                      </div>

                      <div className="stake-data">
                        <p className="data-label">Estimated Rewards</p>
                        <p className="data-value rewards-value">
                          +{stake.estimatedRewards.toFixed(8)} BTC
                        </p>
                        {exchangeRates?.usd && (
                          <p className="fiat-equivalent">
                            ≈ $
                            {(
                              stake.estimatedRewards * exchangeRates.usd
                            ).toFixed(2)}
                          </p>
                        )}
                      </div>

                      <div className="stake-data">
                        <p className="data-label">APR</p>
                        <p className="data-value">{stake.apr}%</p>
                      </div>

                      <div className="stake-data">
                        <p className="data-label">Lock Period</p>
                        <p className="data-value">
                          {stake.period} month{stake.period !== 1 ? "s" : ""}
                        </p>
                      </div>

                      <div className="stake-data">
                        <p className="data-label">Unlock Date</p>
                        <p className="data-value">
                          {new Date(stake.endDate).toLocaleDateString()}
                        </p>
                        <p className="days-remaining">
                          {Math.ceil(
                            (new Date(stake.endDate) - new Date()) /
                              (1000 * 60 * 60 * 24)
                          )}{" "}
                          days remaining
                        </p>
                      </div>
                    </div>

                    {/* Movements and Transaction History */}
                    <div className="transaction-history">
                      <h4>Transaction History</h4>
                      {stake.movements.map((movement, index) => (
                        <div
                          key={index}
                          className={`movement ${
                            index < stake.movements.length - 1
                              ? "with-border"
                              : ""
                          }`}
                        >
                          <div>
                            <p className="movement-type">
                              {movement.type === "stake" ? "🔒 " : "🔓 "}
                              {movement.type}
                            </p>
                            <p className="movement-description">
                              {movement.description}
                            </p>
                          </div>
                          <div className="movement-amount">
                            <p className={`amount ${movement.type}`}>
                              {movement.type === "stake" ? "+" : "-"}
                              {movement.amount.toFixed(8)} BTC
                            </p>
                            <p className="movement-date">
                              {new Date(movement.date).toLocaleDateString()}{" "}
                              {new Date(movement.date).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => handleUnstake(stake.id)}
                      disabled={stake.status !== "active"}
                      className="btn btn-outline"
                    >
                      {stake.status === "unstaking"
                        ? "Unstaking..."
                        : "Unstake (Early Withdrawal)"}
                    </button>
                    {stake.status === "active" && (
                      <p className="unstake-warning">
                        Warning: Early unstaking will result in loss of rewards
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-stakes">
                <p>You don't have any active stakes</p>
                <button onClick={() => setActiveTab("stake")} className="btn">
                  Start Staking
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="modal-overlay">
          <div
            ref={confirmationModalRef}
            className={`confirmation-modal ${
              successAnimation ? "success-animation" : ""
            }`}
          >
            <div
              className="modal-close"
              onClick={() => {
                setShowConfirmationModal(false);
                setSuccessAnimation(false);
              }}
            >
              ✕
            </div>

            {selectedStake ? (
              /* Unstaking Confirmation */
              <>
                <div className="modal-icon unstake">🔓</div>
                <h3>Confirm Unstaking</h3>
                <p className="modal-description">
                  You are about to unstake{" "}
                  <strong>{selectedStake.amount.toFixed(8)} BTC</strong> from{" "}
                  <strong>{selectedStake.option}</strong>.
                </p>
                <p className="modal-warning">
                  Warning: Early unstaking will result in loss of accumulated
                  rewards.
                </p>
                <div className="modal-actions">
                  <button
                    onClick={() => setShowConfirmationModal(false)}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmUnstaking}
                    className="btn btn-warning"
                  >
                    Confirm Unstake
                  </button>
                </div>
              </>
            ) : (
              /* Staking Confirmation */
              <>
                <div
                  className={`modal-icon ${
                    successAnimation ? "animate-success" : ""
                  }`}
                >
                  {successAnimation ? "✓" : "🔒"}
                </div>
                <h3>
                  {successAnimation
                    ? "Stake Placed Successfully!"
                    : "Confirm Staking"}
                </h3>
                <p className="modal-description">
                  {successAnimation
                    ? `You have successfully staked ${stakeAmount} BTC for ${
                        stakePeriod === "custom" ? customPeriod : stakePeriod
                      } month${
                        (stakePeriod !== "1" && stakePeriod !== "custom") ||
                        (stakePeriod === "custom" && customPeriod !== "1")
                          ? "s"
                          : ""
                      }.`
                    : `You are about to stake ${stakeAmount} BTC for ${
                        stakePeriod === "custom" ? customPeriod : stakePeriod
                      } month${
                        (stakePeriod !== "1" && stakePeriod !== "custom") ||
                        (stakePeriod === "custom" && customPeriod !== "1")
                          ? "s"
                          : ""
                      }.`}
                </p>
                <div className="modal-stake-details">
                  <div className="detail-row">
                    <span>Staking Option:</span>
                    <span>{selectedOption.name}</span>
                  </div>
                  <div className="detail-row">
                    <span>APR:</span>
                    <span>{selectedOption.apr}%</span>
                  </div>
                  <div className="detail-row highlight">
                    <span>Estimated Rewards:</span>
                    <span className="rewards-value">
                      +{estimatedRewards.toFixed(8)} BTC
                    </span>
                  </div>
                  <div className="detail-row">
                    <span>Unlock Date:</span>
                    <span>
                      {new Date(
                        Date.now() +
                          parseInt(
                            stakePeriod === "custom"
                              ? customPeriod
                              : stakePeriod
                          ) *
                            30 *
                            24 *
                            60 *
                            60 *
                            1000
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {successAnimation ? (
                  <div className="modal-actions">
                    <button
                      onClick={() => {
                        setShowConfirmationModal(false);
                        setSuccessAnimation(false);
                      }}
                      className="btn btn-outline"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        setShowConfirmationModal(false);
                        setSuccessAnimation(false);
                        confirmStaking();
                      }}
                      className="btn"
                    >
                      View My Stakes
                    </button>
                  </div>
                ) : (
                  <div className="modal-actions">
                    <button
                      onClick={() => setShowConfirmationModal(false)}
                      className="btn btn-outline"
                    >
                      Cancel
                    </button>
                    <button onClick={confirmStaking} className="btn">
                      Confirm Stake
                    </button>
                  </div>
                )}

                {successAnimation && (
                  <div className="confetti">
                    <div className="confetti-piece"></div>
                    <div className="confetti-piece"></div>
                    <div className="confetti-piece"></div>
                    <div className="confetti-piece"></div>
                    <div className="confetti-piece"></div>
                    <div className="confetti-piece"></div>
                    <div className="confetti-piece"></div>
                    <div className="confetti-piece"></div>
                    <div className="confetti-piece"></div>
                    <div className="confetti-piece"></div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Staking;
