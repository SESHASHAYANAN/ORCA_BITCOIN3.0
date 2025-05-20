import React, { useContext, useState, useRef, useEffect } from "react";
import WalletContext from "./WalletContext";

function Wallet() {
  const walletContext = useContext(WalletContext) || {};
  const {
    wallet = { address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa" }, 
    balance = 0.25,
    transactions: initialTransactions = [],
    exchangeRates = { usd: 65000, eur: 60000, gbp: 52000 },
  } = walletContext;

  const [transactions, setTransactions] = useState(initialTransactions);

  const [activeTab, setActiveTab] = useState("overview");
  const [sendAmount, setSendAmount] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [transactionFee, setTransactionFee] = useState("medium");
  const [useRebarShield, setUseRebarShield] = useState(false);
  const [sending, setSending] = useState(false);
  const [transactionResult, setTransactionResult] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const qrRef = useRef(null);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationStage, setConfirmationStage] = useState("initial");
  const [pendingTx, setPendingTx] = useState(null);
  const [txDetails, setTxDetails] = useState(null);

  const walletAddress = wallet?.address || "Wallet address unavailable";

  const addTransactionToHistory = (transaction) => {
    const newTransaction = {
      id: `tx_${Date.now()}`,
      type: "send",
      amount: transaction.amount,
      timestamp: transaction.timestamp,
      confirmations: transaction.confirmations || 1,
      address: transaction.recipient,
      fee: transaction.fee,
      private: transaction.private || false,
      status: transaction.status || "Confirmed",
      blockHeight: transaction.blockHeight || 800123,
      sender: transaction.sender || walletAddress,
    };

    setTransactions((prevTransactions) => [
      newTransaction,
      ...prevTransactions,
    ]);
  };

  const mockSendTransaction = async (recipient, amount, fee) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const feeAmount =
      fee === "high" ? 0.0002 : fee === "medium" ? 0.0001 : 0.00005;

    if (Math.random() > 0.05) {
      const timestamp = new Date().toISOString();
      const txid = `tx_${Math.random().toString(36).substring(2, 15)}`;

      const details = {
        txid: txid,
        timestamp: timestamp,
        sender: walletAddress,
        recipient: recipient,
        amount: amount,
        fee: feeAmount,
        feeLevel: fee,
        status: "Pending",
        confirmations: 0,
        blockHeight: null,
        private: false,
        estimatedConfirmationTime:
          fee === "high"
            ? "~10 minutes"
            : fee === "medium"
            ? "~30 minutes"
            : "~1 hour",
        verificationStatus: "Unverified",
        totalAmount: amount + feeAmount,
      };

      return details;
    } else {
      throw new Error("Network connection error. Please try again.");
    }
  };

  const mockSendPrivateTransaction = async (recipient, amount) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const feeAmount = 0.0001;
    const shieldFee = 0.0001;

    if (Math.random() > 0.1) {
      const timestamp = new Date().toISOString();
      const txid = `priv_${Math.random().toString(36).substring(2, 15)}`;

      const details = {
        txid: txid,
        timestamp: timestamp,
        sender: walletAddress,
        recipient: recipient,
        amount: amount,
        fee: feeAmount,
        shieldFee: shieldFee,
        feeLevel: "medium",
        status: "Pending",
        confirmations: 0,
        blockHeight: null,
        private: true,
        estimatedConfirmationTime: "~45 minutes",
        verificationStatus: "Unverified",
        totalAmount: amount + feeAmount + shieldFee,
        routingMethod: "Rebar Shield Private Mempool",
      };

      return details;
    } else {
      throw new Error("Private transaction routing failed. Please try again.");
    }
  };

  const handleSendTransaction = async (e) => {
    e.preventDefault();

    if (!sendAmount || !recipientAddress) {
      return;
    }

    setPendingTx({
      recipient: recipientAddress,
      amount: parseFloat(sendAmount),
      fee:
        transactionFee === "high"
          ? 0.0002
          : transactionFee === "medium"
          ? 0.0001
          : 0.00005,
      private: useRebarShield,
      timestamp: new Date().toISOString(),
    });
    setShowConfirmation(true);
    setConfirmationStage("initial");
  };

  const confirmAndSendTransaction = async () => {
    setConfirmationStage("contacting");
    setSending(true);
    setTransactionResult(null);

    try {
      let result;

      if (pendingTx.private) {
        result = await mockSendPrivateTransaction(
          pendingTx.recipient,
          pendingTx.amount
        );
      } else {
        result = await mockSendTransaction(
          pendingTx.recipient,
          pendingTx.amount,
          transactionFee
        );
      }

      setTxDetails(result);

      setConfirmationStage("confirmed");

      await new Promise((resolve) => setTimeout(resolve, 2500));

      const updatedTxDetails = {
        ...result,
        status: "Confirmed",
        confirmations: 1,
        blockHeight: 800123,  
        verificationStatus: "Verified",
        timestamp: new Date().toISOString(), 
      };

      setTxDetails(updatedTxDetails);
      setConfirmationStage("added");

      setTransactionResult({
        success: true,
        txid: result.txid,
        message: "Transaction sent successfully!",
      });

      
      addTransactionToHistory(updatedTxDetails);

     
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      setConfirmationStage("error");
      setTransactionResult({
        success: false,
        message:
          error.message || "Failed to send transaction. Please try again.",
      });
    } finally {
      setSending(false);
    }
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
    if (transactionResult?.success) {
      setSendAmount("");
      setRecipientAddress("");
    }
  };

  const handleGenerateQR = () => {
    setShowQR(true);

  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return (
    <div className="wallet-container">
      <h1 style={{ marginBottom: "30px" }}>Bitcoin Wallet</h1>

      <div
        className="balance-card card"
        style={{
          background: "var(--gradient-primary)",
          marginBottom: "30px",
          color: "white",
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
            <h3
              style={{
                marginBottom: "10px",
                color: "rgba(255, 255, 255, 0.8)",
              }}
            >
              Total Balance
            </h3>
            <p style={{ fontSize: "32px", fontWeight: "bold", margin: "0" }}>
              {balance ? balance.toFixed(8) : "0.00000000"} BTC
            </p>
            <p
              style={{ margin: "5px 0 0 0", color: "rgba(255, 255, 255, 0.8)" }}
            >
              $
              {balance && exchangeRates?.usd
                ? (balance * exchangeRates.usd).toFixed(2)
                : "0.00"}
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ margin: "0", fontSize: "14px", opacity: 0.8 }}>
              Wallet Address
            </p>
            <p
              style={{
                margin: "5px 0 0 0",
                fontFamily: "monospace",
                wordBreak: "break-all",
              }}
            >
              {walletAddress}
            </p>
          </div>
        </div>
      </div>

      <div
        className="wallet-tabs"
        style={{
          display: "flex",
          borderBottom: "1px solid var(--border-color)",
          marginBottom: "30px",
        }}
      >
        <button
          className={`tab ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
          style={{
            padding: "10px 20px",
            background: "transparent",
            border: "none",
            borderBottom:
              activeTab === "overview"
                ? "2px solid var(--accent-primary)"
                : "2px solid transparent",
            color:
              activeTab === "overview"
                ? "var(--accent-primary)"
                : "var(--text-primary)",
            cursor: "pointer",
            fontWeight: activeTab === "overview" ? "bold" : "normal",
          }}
        >
          Overview
        </button>
        <button
          className={`tab ${activeTab === "send" ? "active" : ""}`}
          onClick={() => setActiveTab("send")}
          style={{
            padding: "10px 20px",
            background: "transparent",
            border: "none",
            borderBottom:
              activeTab === "send"
                ? "2px solid var(--accent-primary)"
                : "2px solid transparent",
            color:
              activeTab === "send"
                ? "var(--accent-primary)"
                : "var(--text-primary)",
            cursor: "pointer",
            fontWeight: activeTab === "send" ? "bold" : "normal",
          }}
        >
          Send
        </button>
        <button
          className={`tab ${activeTab === "receive" ? "active" : ""}`}
          onClick={() => setActiveTab("receive")}
          style={{
            padding: "10px 20px",
            background: "transparent",
            border: "none",
            borderBottom:
              activeTab === "receive"
                ? "2px solid var(--accent-primary)"
                : "2px solid transparent",
            color:
              activeTab === "receive"
                ? "var(--accent-primary)"
                : "var(--text-primary)",
            cursor: "pointer",
            fontWeight: activeTab === "receive" ? "bold" : "normal",
          }}
        >
          Receive
        </button>
        <button
          className={`tab ${activeTab === "transactions" ? "active" : ""}`}
          onClick={() => setActiveTab("transactions")}
          style={{
            padding: "10px 20px",
            background: "transparent",
            border: "none",
            borderBottom:
              activeTab === "transactions"
                ? "2px solid var(--accent-primary)"
                : "2px solid transparent",
            color:
              activeTab === "transactions"
                ? "var(--accent-primary)"
                : "var(--text-primary)",
            cursor: "pointer",
            fontWeight: activeTab === "transactions" ? "bold" : "normal",
          }}
        >
          Transactions
        </button>
      </div>

      {activeTab === "overview" && (
        <div className="overview-tab">
          <div
            className="stats-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            <div className="card">
              <h3>Total Received</h3>
              <p
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  margin: "10px 0",
                  color: "var(--accent-secondary)",
                }}
              >
                {transactions
                  ? transactions
                      .filter((tx) => tx.type === "receive")
                      .reduce((sum, tx) => sum + tx.amount, 0)
                      .toFixed(8)
                  : "0.00000000"}{" "}
                BTC
              </p>
            </div>
            <div className="card">
              <h3>Total Sent</h3>
              <p
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  margin: "10px 0",
                  color: "var(--accent-primary)",
                }}
              >
                {transactions
                  ? transactions
                      .filter((tx) => tx.type === "send")
                      .reduce((sum, tx) => sum + tx.amount, 0)
                      .toFixed(8)
                  : "0.00000000"}{" "}
                BTC
              </p>
            </div>
            <div className="card">
              <h3>Current Value</h3>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "10px",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <p
                    style={{
                      margin: "0",
                      color: "var(--text-secondary)",
                      fontSize: "14px",
                    }}
                  >
                    USD
                  </p>
                  <p
                    style={{
                      margin: "0",
                      fontWeight: "bold",
                      fontSize: "18px",
                    }}
                  >
                    $
                    {balance && exchangeRates?.usd
                      ? (balance * exchangeRates.usd).toFixed(2)
                      : "0.00"}
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      margin: "0",
                      color: "var(--text-secondary)",
                      fontSize: "14px",
                    }}
                  >
                    EUR
                  </p>
                  <p
                    style={{
                      margin: "0",
                      fontWeight: "bold",
                      fontSize: "18px",
                    }}
                  >
                    €
                    {balance && exchangeRates?.eur
                      ? (balance * exchangeRates.eur).toFixed(2)
                      : "0.00"}
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      margin: "0",
                      color: "var(--text-secondary)",
                      fontSize: "14px",
                    }}
                  >
                    GBP
                  </p>
                  <p
                    style={{
                      margin: "0",
                      fontWeight: "bold",
                      fontSize: "18px",
                    }}
                  >
                    £
                    {balance && exchangeRates?.gbp
                      ? (balance * exchangeRates.gbp).toFixed(2)
                      : "0.00"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3>Recent Transactions</h3>
            {transactions && transactions.length > 0 ? (
              <div className="transactions-list">
                {transactions.slice(0, 5).map((tx) => (
                  <div
                    key={tx.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "15px 10px",
                      borderBottom: "1px solid var(--border-color)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                      }}
                    >
                      <span
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          background:
                            tx.type === "receive"
                              ? "rgba(0, 255, 149, 0.1)"
                              : "rgba(0, 112, 243, 0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "20px",
                          color:
                            tx.type === "receive"
                              ? "var(--accent-secondary)"
                              : "var(--accent-primary)",
                        }}
                      >
                        {tx.type === "receive" ? "↓" : "↑"}
                      </span>
                      <div>
                        <p style={{ margin: "0", fontWeight: "bold" }}>
                          {tx.type === "receive"
                            ? "Received Bitcoin"
                            : "Sent Bitcoin"}
                          {tx.private && " (Private)"}
                        </p>
                        <p
                          style={{
                            margin: "0",
                            fontSize: "14px",
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
                          margin: "0",
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
                          margin: "0",
                          fontSize: "14px",
                          color: "var(--text-secondary)",
                        }}
                      >
                        $
                        {exchangeRates?.usd
                          ? (tx.amount * exchangeRates.usd).toFixed(2)
                          : "0.00"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No transactions yet</p>
            )}
            {transactions && transactions.length > 5 && (
              <button
                onClick={() => setActiveTab("transactions")}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--accent-primary)",
                  cursor: "pointer",
                  margin: "15px 0 0 0",
                  padding: "0",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                View all transactions
              </button>
            )}
          </div>
        </div>
      )}

      {activeTab === "send" && (
        <div className="send-tab">
          <div className="card">
            <h3>Send Bitcoin</h3>
            <form onSubmit={handleSendTransaction}>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Recipient Address
                </label>
                <input
                  type="text"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  placeholder="Enter Bitcoin address"
                  required
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Amount (BTC)
                </label>
                <input
                  type="number"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(e.target.value)}
                  placeholder="0.00000000"
                  step="0.00000001"
                  min="0.00000001"
                  max={balance}
                  required
                />
                {sendAmount && exchangeRates?.usd && (
                  <p
                    style={{
                      margin: "5px 0 0 0",
                      fontSize: "14px",
                      color: "var(--text-secondary)",
                    }}
                  >
                    ≈ ${(parseFloat(sendAmount) * exchangeRates.usd).toFixed(2)}
                  </p>
                )}
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "10px" }}>
                  Transaction Fee
                </label>
                <div
                  className="fee-options"
                  style={{ display: "flex", gap: "10px" }}
                >
                  <button
                    type="button"
                    className={`fee-option ${
                      transactionFee === "low" ? "active" : ""
                    }`}
                    onClick={() => setTransactionFee("low")}
                    style={{
                      flex: 1,
                      padding: "10px",
                      background:
                        transactionFee === "low"
                          ? "rgba(0, 112, 243, 0.1)"
                          : "rgba(255, 255, 255, 0.05)",
                      border:
                        transactionFee === "low"
                          ? "1px solid var(--accent-primary)"
                          : "1px solid var(--border-color)",
                      borderRadius: "8px",
                      cursor: "pointer",
                      color:
                        transactionFee === "low"
                          ? "var(--accent-primary)"
                          : "var(--text-primary)",
                    }}
                  >
                    <div style={{ textAlign: "center" }}>
                      <p style={{ margin: "0", fontWeight: "bold" }}>Low</p>
                      <p
                        style={{
                          margin: "5px 0 0 0",
                          fontSize: "12px",
                          color: "var(--text-secondary)",
                        }}
                      >
                        ~1 hour
                      </p>
                      <p style={{ margin: "5px 0 0 0", fontSize: "12px" }}>
                        0.00005 BTC
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    className={`fee-option ${
                      transactionFee === "medium" ? "active" : ""
                    }`}
                    onClick={() => setTransactionFee("medium")}
                    style={{
                      flex: 1,
                      padding: "10px",
                      background:
                        transactionFee === "medium"
                          ? "rgba(0, 112, 243, 0.1)"
                          : "rgba(255, 255, 255, 0.05)",
                      border:
                        transactionFee === "medium"
                          ? "1px solid var(--accent-primary)"
                          : "1px solid var(--border-color)",
                      borderRadius: "8px",
                      cursor: "pointer",
                      color:
                        transactionFee === "medium"
                          ? "var(--accent-primary)"
                          : "var(--text-primary)",
                    }}
                  >
                    <div style={{ textAlign: "center" }}>
                      <p style={{ margin: "0", fontWeight: "bold" }}>Medium</p>
                      <p
                        style={{
                          margin: "5px 0 0 0",
                          fontSize: "12px",
                          color: "var(--text-secondary)",
                        }}
                      >
                        ~30 minutes
                      </p>
                      <p style={{ margin: "5px 0 0 0", fontSize: "12px" }}>
                        0.0001 BTC
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    className={`fee-option ${
                      transactionFee === "high" ? "active" : ""
                    }`}
                    onClick={() => setTransactionFee("high")}
                    style={{
                      flex: 1,
                      padding: "10px",
                      background:
                        transactionFee === "high"
                          ? "rgba(0, 112, 243, 0.1)"
                          : "rgba(255, 255, 255, 0.05)",
                      border:
                        transactionFee === "high"
                          ? "1px solid var(--accent-primary)"
                          : "1px solid var(--border-color)",
                      borderRadius: "8px",
                      cursor: "pointer",
                      color:
                        transactionFee === "high"
                          ? "var(--accent-primary)"
                          : "var(--text-primary)",
                    }}
                  >
                    <div style={{ textAlign: "center" }}>
                      <p style={{ margin: "0", fontWeight: "bold" }}>High</p>
                      <p
                        style={{
                          margin: "5px 0 0 0",
                          fontSize: "12px",
                          color: "var(--text-secondary)",
                        }}
                      >
                        ~10 minutes
                      </p>
                      <p style={{ margin: "5px 0 0 0", fontSize: "12px" }}>
                        0.0002 BTC
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={useRebarShield}
                    onChange={() => setUseRebarShield(!useRebarShield)}
                    style={{ marginRight: "10px" }}
                  />
                  <span>Use Rebar Shield for private transaction</span>
                </label>
                {useRebarShield && (
                  <p
                    style={{
                      margin: "10px 0 0 0",
                      fontSize: "14px",
                      color: "var(--text-secondary)",
                      padding: "10px",
                      background: "rgba(0, 112, 243, 0.1)",
                      borderRadius: "8px",
                    }}
                  >
                    Rebar Shield allows Bitcoin users to submit transactions via
                    RPC through a private mempool, bypassing Bitcoin's public
                    mempool and protecting users from frontrunning.
                  </p>
                )}
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Transaction Summary
                </label>
                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "8px",
                    padding: "15px",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                  >
                    <p style={{ margin: "0" }}>Amount:</p>
                    <p style={{ margin: "0", fontWeight: "bold" }}>
                      {sendAmount || "0.00000000"} BTC
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                  >
                    <p style={{ margin: "0" }}>Network Fee:</p>
                    <p style={{ margin: "0" }}>
                      {transactionFee === "high"
                        ? "0.0002"
                        : transactionFee === "medium"
                        ? "0.0001"
                        : "0.00005"}{" "}
                      BTC
                    </p>
                  </div>
                  {useRebarShield && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                      }}
                    >
                      <p style={{ margin: "0" }}>Rebar Shield Fee:</p>
                      <p style={{ margin: "0" }}>0.0001 BTC</p>
                    </div>
                  )}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderTop: "1px solid var(--border-color)",
                      paddingTop: "10px",
                      marginTop: "10px",
                    }}
                  >
                    <p style={{ margin: "0", fontWeight: "bold" }}>Total:</p>
                    <p style={{ margin: "0", fontWeight: "bold" }}>
                      {sendAmount
                        ? (
                            parseFloat(sendAmount) +
                            (transactionFee === "high"
                              ? 0.0002
                              : transactionFee === "medium"
                              ? 0.0001
                              : 0.00005) +
                            (useRebarShield ? 0.0001 : 0)
                          ).toFixed(8)
                        : "0.00000000"}{" "}
                      BTC
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn"
                disabled={sending || !sendAmount || !recipientAddress}
                style={{ width: "100%" }}
              >
                {sending ? "Sending..." : "Send Bitcoin"}
              </button>
            </form>

            {transactionResult && !showConfirmation && (
              <div
                className={`transaction-result ${
                  transactionResult.success ? "success" : "error"
                }`}
                style={{
                  marginTop: "20px",
                  padding: "15px",
                  borderRadius: "8px",
                  background: transactionResult.success
                    ? "rgba(0, 255, 149, 0.1)"
                    : "rgba(255, 71, 87, 0.1)",
                  color: transactionResult.success
                    ? "var(--accent-secondary)"
                    : "var(--accent-danger)",
                  border: `1px solid ${
                    transactionResult.success
                      ? "var(--accent-secondary)"
                      : "var(--accent-danger)"
                  }`,
                }}
              >
                <p style={{ margin: "0", fontWeight: "bold" }}>
                  {transactionResult.success ? "Success!" : "Error!"}
                </p>
                <p style={{ margin: "5px 0 0 0" }}>
                  {transactionResult.message}
                </p>
                {transactionResult.success && transactionResult.txid && (
                  <p style={{ margin: "5px 0 0 0", fontSize: "14px" }}>
                    Transaction ID: {transactionResult.txid}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "receive" && (
        <div className="receive-tab">
          <div className="card">
            <h3>Receive Bitcoin</h3>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Your Bitcoin Address
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "20px",
                }}
              >
                <input
                  type="text"
                  value={walletAddress}
                  readOnly
                  style={{ flex: 1, margin: 0 }}
                />
                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(walletAddress)}
                  className="btn"
                  style={{
                    padding: "10px 15px",
                    minWidth: "auto",
                  }}
                >
                  Copy
                </button>
              </div>

              <div style={{ textAlign: "center" }}>
                <button
                  type="button"
                  onClick={handleGenerateQR}
                  className="btn"
                  style={{ marginBottom: "20px" }}
                >
                  Show QR Code
                </button>

                {showQR && (
                  <div
                    className="qr-code"
                    ref={qrRef}
                    style={{
                      width: "200px",
                      height: "200px",
                      margin: "0 auto",
                      background: "white",
                      padding: "15px",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    {/* In a real app, this would be a QR code */}
                    QR Code for {walletAddress.substring(0, 10) + "..."}
                  </div>
                )}
              </div>
            </div>

            <div
              style={{
                borderTop: "1px solid var(--border-color)",
                paddingTop: "20px",
              }}
            >
              <h4>Important Information</h4>
              <ul
                style={{ color: "var(--text-secondary)", paddingLeft: "20px" }}
              >
                <li style={{ marginBottom: "10px" }}>
                  Send only Bitcoin (BTC) to this address.
                </li>
                <li style={{ marginBottom: "10px" }}>
                  Sending any other cryptocurrency may result in permanent loss.
                </li>
                <li style={{ marginBottom: "10px" }}>
                  Double-check the address before sending.
                </li>
                <li style={{ marginBottom: "10px" }}>
                  Transactions typically take 10-60 minutes to confirm.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === "transactions" && (
        <div className="transactions-tab">
          <div className="card">
            <h3>Transaction History</h3>

            {transactions && transactions.length > 0 ? (
              <div className="transactions-list">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "15px 10px",
                      borderBottom: "1px solid var(--border-color)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                      }}
                    >
                      <span
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          background:
                            tx.type === "receive"
                              ? "rgba(0, 255, 149, 0.1)"
                              : "rgba(0, 112, 243, 0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "20px",
                          color:
                            tx.type === "receive"
                              ? "var(--accent-secondary)"
                              : "var(--accent-primary)",
                        }}
                      >
                        {tx.type === "receive" ? "↓" : "↑"}
                      </span>
                      <div>
                        <p style={{ margin: "0", fontWeight: "bold" }}>
                          {tx.type === "receive"
                            ? "Received Bitcoin"
                            : "Sent Bitcoin"}
                          {tx.private && " (Private)"}
                        </p>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <p
                            style={{
                              margin: "0",
                              fontSize: "14px",
                              color: "var(--text-secondary)",
                            }}
                          >
                            {new Date(tx.timestamp).toLocaleString()}
                          </p>
                          <span
                            style={{
                              fontSize: "12px",
                              background:
                                tx.confirmations > 3
                                  ? "rgba(0, 255, 149, 0.1)"
                                  : "rgba(255, 184, 0, 0.1)",
                              color:
                                tx.confirmations > 3
                                  ? "var(--accent-secondary)"
                                  : "var(--accent-warning)",
                              padding: "2px 8px",
                              borderRadius: "20px",
                            }}
                          >
                            {tx.confirmations} confirmation
                            {tx.confirmations !== 1 ? "s" : ""}
                          </span>
                        </div>
                        <p
                          style={{
                            margin: "5px 0 0 0",
                            fontSize: "14px",
                            color: "var(--text-secondary)",
                          }}
                        >
                          {tx.type === "send" ? "To: " : "From: "}
                          {tx.address}
                        </p>
                        {tx.blockHeight && (
                          <p
                            style={{
                              margin: "5px 0 0 0",
                              fontSize: "14px",
                              color: "var(--text-secondary)",
                            }}
                          >
                            Block: {tx.blockHeight}
                          </p>
                        )}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p
                        style={{
                          margin: "0",
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
                          margin: "5px 0 0 0",
                          fontSize: "14px",
                          color: "var(--text-secondary)",
                        }}
                      >
                        $
                        {exchangeRates?.usd
                          ? (tx.amount * exchangeRates.usd).toFixed(2)
                          : "0.00"}
                      </p>
                      {tx.type === "send" && (
                        <p
                          style={{
                            margin: "5px 0 0 0",
                            fontSize: "12px",
                            color: "var(--text-secondary)",
                          }}
                        >
                          Fee: {tx.fee.toFixed(8)} BTC
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No transactions yet</p>
            )}
          </div>
        </div>
      )}

      {/* Transaction Confirmation Popup */}
      {showConfirmation && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "var(--bg-card)",
              borderRadius: "12px",
              padding: "30px",
              width: "90%",
              maxWidth: "500px",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
              position: "relative",
            }}
          >
            <button
              onClick={() => {
                if (confirmationStage === "initial") {
                  setShowConfirmation(false);
                }
              }}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "transparent",
                border: "none",
                fontSize: "20px",
                cursor: confirmationStage === "initial" ? "pointer" : "default",
                color: "var(--text-secondary)",
                opacity: confirmationStage === "initial" ? 1 : 0.5,
              }}
              disabled={confirmationStage !== "initial"}
            >
              ×
            </button>

            {confirmationStage === "initial" && (
              <>
                <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
                  Confirm Transaction
                </h3>
                <div
                  style={{
                    marginBottom: "20px",
                    padding: "20px",
                    background: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "15px",
                    }}
                  >
                    <p style={{ margin: "0", color: "var(--text-secondary)" }}>
                      Recipient:
                    </p>
                    <p
                      style={{
                        margin: "0",
                        fontWeight: "bold",
                        wordBreak: "break-all",
                        textAlign: "right",
                      }}
                    >
                      {pendingTx.recipient}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "15px",
                    }}
                  >
                    <p style={{ margin: "0", color: "var(--text-secondary)" }}>
                      Amount:
                    </p>
                    <p style={{ margin: "0", fontWeight: "bold" }}>
                      {pendingTx.amount.toFixed(8)} BTC
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "15px",
                    }}
                  >
                    <p style={{ margin: "0", color: "var(--text-secondary)" }}>
                      Fee:
                    </p>
                    <p style={{ margin: "0" }}>
                      {pendingTx.fee.toFixed(8)} BTC
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "15px",
                    }}
                  >
                    <p style={{ margin: "0", color: "var(--text-secondary)" }}>
                      Private:
                    </p>
                    <p style={{ margin: "0" }}>
                      {pendingTx.private ? "Yes (Rebar Shield)" : "No"}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderTop: "1px solid var(--border-color)",
                      paddingTop: "15px",
                    }}
                  >
                    <p
                      style={{
                        margin: "0",
                        color: "var(--text-secondary)",
                        fontWeight: "bold",
                      }}
                    >
                      Total:
                    </p>
                    <p style={{ margin: "0", fontWeight: "bold" }}>
                      {(
                        pendingTx.amount +
                        pendingTx.fee +
                        (pendingTx.private ? 0.0001 : 0)
                      ).toFixed(8)}{" "}
                      BTC
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "15px",
                  }}
                >
                  <button
                    onClick={() => setShowConfirmation(false)}
                    className="btn"
                    style={{
                      flex: 1,
                      background: "transparent",
                      border: "1px solid var(--border-color)",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmAndSendTransaction}
                    className="btn"
                    style={{ flex: 1 }}
                  >
                    Confirm
                  </button>
                </div>
              </>
            )}

            {confirmationStage === "contacting" && (
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    margin: "0 auto 20px",
                    border: "4px solid rgba(0, 112, 243, 0.1)",
                    borderTop: "4px solid var(--accent-primary)",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                  }}
                />
                <h3 style={{ marginBottom: "10px" }}>
                  Contacting Bitcoin Network
                </h3>
                <p style={{ color: "var(--text-secondary)" }}>
                  Please wait while we broadcast your transaction...
                </p>
                <div
                  style={{
                    margin: "20px auto 0",
                    padding: "15px",
                    background: "rgba(0, 112, 243, 0.1)",
                    borderRadius: "8px",
                    maxWidth: "350px",
                  }}
                >
                  <div style={{ marginBottom: "10px" }}>
                    <p
                      style={{
                        margin: "0",
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      From:
                    </p>
                    <p
                      style={{
                        margin: "0",
                        fontSize: "14px",
                        wordBreak: "break-all",
                      }}
                    >
                      {walletAddress}
                    </p>
                  </div>
                  <div style={{ marginBottom: "10px" }}>
                    <p
                      style={{
                        margin: "0",
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      To:
                    </p>
                    <p
                      style={{
                        margin: "0",
                        fontSize: "14px",
                        wordBreak: "break-all",
                      }}
                    >
                      {pendingTx?.recipient || "Recipient address"}
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
                      Amount:
                    </p>
                    <p
                      style={{
                        margin: "0",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {pendingTx?.amount.toFixed(8) || "0.00000000"} BTC
                    </p>
                  </div>
                </div>
              </div>
            )}

            {confirmationStage === "confirmed" && (
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    margin: "0 auto 20px",
                    background: "rgba(0, 255, 149, 0.1)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "40px",
                    color: "var(--accent-secondary)",
                  }}
                >
                  ✓
                </div>
                <h3 style={{ marginBottom: "10px" }}>Transaction Confirmed!</h3>
                <p style={{ color: "var(--text-secondary)" }}>
                  Your transaction has been successfully broadcast to the
                  Bitcoin network
                </p>
                <div
                  style={{
                    margin: "20px auto",
                    padding: "15px",
                    background: "rgba(0, 255, 149, 0.1)",
                    borderRadius: "8px",
                    maxWidth: "350px",
                  }}
                >
                  <div style={{ marginBottom: "10px", textAlign: "left" }}>
                    <p
                      style={{
                        margin: "0 0 10px 0",
                        fontSize: "16px",
                        fontWeight: "bold",
                        borderBottom: "1px solid rgba(0, 255, 149, 0.3)",
                        paddingBottom: "5px",
                      }}
                    >
                      Transaction Details
                    </p>
                    <p
                      style={{
                        margin: "0",
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      Status:
                    </p>
                    <p
                      style={{
                        margin: "0 0 10px 0",
                        fontSize: "14px",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          padding: "2px 8px",
                          background: "rgba(255, 184, 0, 0.2)",
                          color: "var(--accent-warning)",
                          borderRadius: "20px",
                          fontSize: "12px",
                          marginLeft: "5px",
                        }}
                      >
                        Pending -{" "}
                        {txDetails?.verificationStatus || "Unverified"}
                      </span>
                    </p>

                    <p
                      style={{
                        margin: "5px 0 0 0",
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      Transaction ID:
                    </p>
                    <p
                      style={{
                        margin: "0 0 10px 0",
                        fontSize: "14px",
                        wordBreak: "break-all",
                      }}
                    >
                      {txDetails?.txid || "Transaction ID pending..."}
                    </p>

                    <p
                      style={{
                        margin: "5px 0 0 0",
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      Time:
                    </p>
                    <p style={{ margin: "0 0 10px 0", fontSize: "14px" }}>
                      {txDetails?.timestamp
                        ? formatDate(txDetails.timestamp)
                        : new Date().toLocaleString()}
                    </p>

                    <p
                      style={{
                        margin: "5px 0 0 0",
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      From:
                    </p>
                    <p
                      style={{
                        margin: "0 0 10px 0",
                        fontSize: "14px",
                        wordBreak: "break-all",
                      }}
                    >
                      {txDetails?.sender || walletAddress}
                    </p>

                    <p
                      style={{
                        margin: "5px 0 0 0",
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      To:
                    </p>
                    <p
                      style={{
                        margin: "0 0 10px 0",
                        fontSize: "14px",
                        wordBreak: "break-all",
                      }}
                    >
                      {txDetails?.recipient ||
                        pendingTx?.recipient ||
                        "Recipient address"}
                    </p>

                    <p
                      style={{
                        margin: "5px 0 0 0",
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      Amount:
                    </p>
                    <p
                      style={{
                        margin: "0 0 10px 0",
                        fontWeight: "bold",
                        color: "var(--accent-secondary)",
                      }}
                    >
                      {txDetails?.amount?.toFixed(8) ||
                        pendingTx?.amount?.toFixed(8) ||
                        "0.00000000"}{" "}
                      BTC
                    </p>

                    <p
                      style={{
                        margin: "5px 0 0 0",
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      Network Fee:
                    </p>
                    <p style={{ margin: "0 0 10px 0", fontSize: "14px" }}>
                      {txDetails?.fee?.toFixed(8) ||
                        pendingTx?.fee?.toFixed(8) ||
                        "0.00000000"}{" "}
                      BTC
                      {txDetails?.feeLevel && ` (${txDetails.feeLevel})`}
                    </p>

                    {(txDetails?.private || pendingTx?.private) && (
                      <>
                        <p
                          style={{
                            margin: "5px 0 0 0",
                            fontSize: "14px",
                            color: "var(--text-secondary)",
                          }}
                        >
                          Privacy:
                        </p>
                        <p style={{ margin: "0 0 10px 0", fontSize: "14px" }}>
                          <span
                            style={{
                              display: "inline-block",
                              padding: "2px 8px",
                              background: "rgba(0, 112, 243, 0.1)",
                              color: "var(--accent-primary)",
                              borderRadius: "20px",
                              fontSize: "12px",
                            }}
                          >
                            Rebar Shield Protected
                          </span>
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
                  Adding transaction to the blockchain...
                </p>
              </div>
            )}

            {confirmationStage === "added" && (
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    margin: "0 auto 20px",
                    background: "rgba(0, 255, 149, 0.1)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "50px",
                    color: "var(--accent-secondary)",
                    animation: "pulse 1.5s ease-in-out",
                  }}
                >
                  🎉
                </div>
                <h3 style={{ marginBottom: "10px" }}>
                  Transaction Added to Blockchain!
                </h3>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    marginBottom: "20px",
                  }}
                >
                  Your transaction has been added to the blockchain and is being
                  processed
                </p>
                <div
                  style={{
                    margin: "0 auto 20px",
                    padding: "15px",
                    background: "rgba(0, 255, 149, 0.1)",
                    borderRadius: "8px",
                    maxWidth: "350px",
                    border: "1px solid var(--accent-secondary)",
                  }}
                >
                  <div style={{ textAlign: "left" }}>
                    <p
                      style={{
                        margin: "0 0 10px 0",
                        fontSize: "16px",
                        fontWeight: "bold",
                        borderBottom: "1px solid rgba(0, 255, 149, 0.3)",
                        paddingBottom: "5px",
                      }}
                    >
                      Transaction Receipt
                    </p>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "14px",
                          color: "var(--text-secondary)",
                        }}
                      >
                        Status:
                      </span>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "2px 8px",
                          background: "rgba(0, 255, 149, 0.2)",
                          color: "var(--accent-secondary)",
                          borderRadius: "20px",
                          fontSize: "12px",
                        }}
                      >
                        {txDetails?.status || "Confirmed"} ✓
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "5px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "14px",
                          color: "var(--text-secondary)",
                        }}
                      >
                        Transaction ID:
                      </span>
                    </div>
                    <p
                      style={{
                        margin: "0 0 10px 0",
                        fontSize: "13px",
                        wordBreak: "break-all",
                      }}
                    >
                      {txDetails?.txid ||
                        transactionResult?.txid ||
                        "tx_123456789abcdef"}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "5px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "14px",
                          color: "var(--text-secondary)",
                        }}
                      >
                        Timestamp:
                      </span>
                      <span style={{ fontSize: "14px" }}>
                        {txDetails?.timestamp
                          ? formatDate(txDetails.timestamp)
                          : new Date().toLocaleString()}
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "5px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "14px",
                          color: "var(--text-secondary)",
                        }}
                      >
                        Block Height:
                      </span>
                      <span style={{ fontSize: "14px" }}>
                        {txDetails?.blockHeight || "800123"}
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "5px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "14px",
                          color: "var(--text-secondary)",
                        }}
                      >
                        Confirmations:
                      </span>
                      <span style={{ fontSize: "14px" }}>
                        {txDetails?.confirmations || "1"}
                      </span>
                    </div>

                    <div
                      style={{
                        margin: "15px 0",
                        borderTop: "1px dashed rgba(0, 255, 149, 0.3)",
                        paddingTop: "10px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "5px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "14px",
                            color: "var(--text-secondary)",
                          }}
                        >
                          From:
                        </span>
                      </div>
                      <p
                        style={{
                          margin: "0 0 10px 0",
                          fontSize: "13px",
                          wordBreak: "break-all",
                        }}
                      >
                        {txDetails?.sender || walletAddress}
                      </p>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "5px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "14px",
                            color: "var(--text-secondary)",
                          }}
                        >
                          To:
                        </span>
                      </div>
                      <p
                        style={{
                          margin: "0 0 10px 0",
                          fontSize: "13px",
                          wordBreak: "break-all",
                        }}
                      >
                        {txDetails?.recipient ||
                          pendingTx?.recipient ||
                          "Recipient address"}
                      </p>
                    </div>

                    <div
                      style={{
                        margin: "15px 0",
                        borderTop: "1px dashed rgba(0, 255, 149, 0.3)",
                        paddingTop: "10px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "5px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "14px",
                            color: "var(--text-secondary)",
                          }}
                        >
                          Amount:
                        </span>
                        <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                          {txDetails?.amount?.toFixed(8) ||
                            pendingTx?.amount?.toFixed(8) ||
                            "0.00000000"}{" "}
                          BTC
                        </span>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "5px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "14px",
                            color: "var(--text-secondary)",
                          }}
                        >
                          Network Fee:
                        </span>
                        <span style={{ fontSize: "14px" }}>
                          {txDetails?.fee?.toFixed(8) ||
                            pendingTx?.fee?.toFixed(8) ||
                            "0.00000000"}{" "}
                          BTC
                        </span>
                      </div>

                      {(txDetails?.private || pendingTx?.private) && (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "5px",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "14px",
                              color: "var(--text-secondary)",
                            }}
                          >
                            Shield Fee:
                          </span>
                          <span style={{ fontSize: "14px" }}>
                            {txDetails?.shieldFee?.toFixed(8) || "0.0001"} BTC
                          </span>
                        </div>
                      )}

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginTop: "10px",
                          paddingTop: "10px",
                          borderTop: "1px solid rgba(0, 255, 149, 0.3)",
                        }}
                      >
                        <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                          Total:
                        </span>
                        <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                          {txDetails?.totalAmount?.toFixed(8) ||
                            (pendingTx?.amount &&
                              (
                                pendingTx.amount +
                                pendingTx.fee +
                                (pendingTx.private ? 0.0001 : 0)
                              ).toFixed(8)) ||
                            "0.00000000"}{" "}
                          BTC
                        </span>
                      </div>

                      {(txDetails?.private || pendingTx?.private) && (
                        <div
                          style={{
                            marginTop: "15px",
                            padding: "8px",
                            background: "rgba(0, 112, 243, 0.1)",
                            borderRadius: "8px",
                            fontSize: "12px",
                            color: "var(--accent-primary)",
                            textAlign: "center",
                          }}
                        >
                          Transaction protected by Rebar Shield Private Mempool
                        </div>
                      )}

                      <div
                        style={{
                          marginTop: "15px",
                          padding: "8px",
                          background: "rgba(0, 255, 149, 0.1)",
                          borderRadius: "8px",
                          textAlign: "center",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "14px",
                            fontWeight: "bold",
                            color: "var(--accent-secondary)",
                          }}
                        >
                          Verified ✓
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={closeConfirmation}
                  className="btn"
                  style={{ width: "100%" }}
                >
                  Close
                </button>
              </div>
            )}

            {confirmationStage === "error" && (
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    margin: "0 auto 20px",
                    background: "rgba(255, 71, 87, 0.1)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "40px",
                    color: "var(--accent-danger)",
                  }}
                >
                  ✗
                </div>
                <h3
                  style={{
                    marginBottom: "10px",
                    color: "var(--accent-danger)",
                  }}
                >
                  Transaction Failed
                </h3>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    marginBottom: "20px",
                  }}
                >
                  {transactionResult?.message ||
                    "An error occurred while processing your transaction."}
                </p>
                <button
                  onClick={closeConfirmation}
                  className="btn"
                  style={{ width: "100%" }}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CSS for animations */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes pulse {
            0% { transform: scale(0.8); opacity: 0.7; }
            50% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}

export default Wallet;
