import React, { useState, useContext, useEffect } from "react";
import WalletContext from "./WalletContext";

function BillPayment() {
  const { wallet, balance, exchangeRates, sendTransaction } =
    useContext(WalletContext);
  const [billCategories, setBillCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [paymentFrequency, setPaymentFrequency] = useState("once");
  const [dueDate, setDueDate] = useState("");
  const [bitcoinAmount, setBitcoinAmount] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);
  const [recentPayments, setRecentPayments] = useState([]);
  const [upcomingPayments, setUpcomingPayments] = useState([]);

  // Initialize bill categories and bills
  useEffect(() => {
    const categoriesData = [
      { id: 1, name: "Utilities", icon: "⚡", bills: 3 },
      { id: 2, name: "Rent & Mortgage", icon: "🏠", bills: 2 },
      { id: 3, name: "Phone & Internet", icon: "📱", bills: 4 },
      { id: 4, name: "Subscriptions", icon: "📺", bills: 5 },
      { id: 5, name: "Insurance", icon: "🛡️", bills: 3 },
      { id: 6, name: "Transport", icon: "🚗", bills: 2 },
      { id: 7, name: "Education", icon: "🎓", bills: 1 },
      { id: 8, name: "Healthcare", icon: "🏥", bills: 3 },
      { id: 9, name: "Taxes", icon: "📊", bills: 2 },
      { id: 10, name: "Other", icon: "🔄", bills: 4 },
    ];

    setBillCategories(categoriesData);

    // Generate recent and upcoming payments
    const recentPaymentsData = [
      {
        id: 1,
        name: "Electricity Bill",
        category: "Utilities",
        amount: 120.5,
        bitcoinAmount: 0.0028,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        status: "completed",
      },
      {
        id: 2,
        name: "Internet Service",
        category: "Phone & Internet",
        amount: 75.99,
        bitcoinAmount: 0.0018,
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        status: "completed",
      },
      {
        id: 3,
        name: "Rent Payment",
        category: "Rent & Mortgage",
        amount: 1200,
        bitcoinAmount: 0.0282,
        date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        status: "completed",
      },
    ];

    const upcomingPaymentsData = [
      {
        id: 4,
        name: "Water Bill",
        category: "Utilities",
        amount: 45.75,
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        status: "pending",
      },
      {
        id: 5,
        name: "Netflix Subscription",
        category: "Subscriptions",
        amount: 14.99,
        dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        status: "pending",
      },
    ];

    setRecentPayments(recentPaymentsData);
    setUpcomingPayments(upcomingPaymentsData);
  }, []);

  // Generate bills when a category is selected
  useEffect(() => {
    if (selectedCategory) {
      // Generate mock bills based on selected category
      const generateBills = () => {
        const billsData = [];
        const billsByCategory = {
          1: [
            {
              name: "Electricity Bill",
              company: "PowerGrid Energy",
              icon: "⚡",
            },
            { name: "Water Bill", company: "City Water Services", icon: "💧" },
            { name: "Gas Bill", company: "National Gas Company", icon: "🔥" },
          ],
          2: [
            {
              name: "Rent Payment",
              company: "Property Management Inc.",
              icon: "🏠",
            },
            {
              name: "Mortgage Payment",
              company: "First National Bank",
              icon: "🏦",
            },
          ],
          3: [
            { name: "Mobile Phone", company: "Mobile Carrier Co.", icon: "📱" },
            {
              name: "Internet Service",
              company: "FastConnect ISP",
              icon: "🌐",
            },
            { name: "Cable TV", company: "CablePlus", icon: "📺" },
            { name: "Landline Phone", company: "Telecom Services", icon: "☎️" },
          ],
          4: [
            { name: "Netflix", company: "Netflix Inc.", icon: "🎬" },
            { name: "Spotify", company: "Spotify AB", icon: "🎵" },
            { name: "Amazon Prime", company: "Amazon.com", icon: "📦" },
            { name: "Disney+", company: "Disney", icon: "🏰" },
            { name: "Gym Membership", company: "FitLife Gym", icon: "💪" },
          ],
          5: [
            {
              name: "Health Insurance",
              company: "HealthGuard Insurance",
              icon: "🏥",
            },
            {
              name: "Car Insurance",
              company: "AutoSafe Insurance",
              icon: "🚗",
            },
            {
              name: "Home Insurance",
              company: "HomeShield Insurance",
              icon: "🏠",
            },
          ],
          6: [
            { name: "Car Loan", company: "Auto Finance Bank", icon: "🚘" },
            { name: "Fuel Card", company: "GasNow", icon: "⛽" },
          ],
          7: [
            {
              name: "Student Loan",
              company: "Education Finance Corp.",
              icon: "🎓",
            },
          ],
          8: [
            { name: "Medical Bill", company: "City Hospital", icon: "🏥" },
            { name: "Dental Care", company: "Smile Dental Clinic", icon: "😁" },
            { name: "Pharmacy", company: "MediPlus Pharmacy", icon: "💊" },
          ],
          9: [
            {
              name: "Income Tax",
              company: "Internal Revenue Service",
              icon: "💰",
            },
            { name: "Property Tax", company: "County Tax Office", icon: "🏠" },
          ],
          10: [
            { name: "Donation", company: "Charity Foundation", icon: "❤️" },
            { name: "Child Support", company: "Support Services", icon: "👶" },
            {
              name: "Legal Services",
              company: "Legal Partners LLC",
              icon: "⚖️",
            },
            {
              name: "Maintenance Fee",
              company: "Building Management",
              icon: "🔧",
            },
          ],
        };

        const count = selectedCategory.bills;
        const categoryBills = billsByCategory[selectedCategory.id] || [];

        for (let i = 0; i < count; i++) {
          if (i < categoryBills.length) {
            billsData.push({
              id: i + 1,
              name: categoryBills[i].name,
              company: categoryBills[i].company,
              icon: categoryBills[i].icon,
              category: selectedCategory.name,
              minAmount: 10 + Math.floor(Math.random() * 90),
              maxAmount: 100 + Math.floor(Math.random() * 1000),
              acceptsBitcoin: Math.random() > 0.5,
            });
          }
        }

        return billsData;
      };

      setBills(generateBills());
    } else {
      setBills([]);
    }
  }, [selectedCategory]);

  // Calculate Bitcoin amount when payment amount changes
  useEffect(() => {
    if (paymentAmount && exchangeRates) {
      const bitcoinRequired = parseFloat(paymentAmount) / exchangeRates.usd;
      setBitcoinAmount(bitcoinRequired.toFixed(8));
    } else {
      setBitcoinAmount("");
    }
  }, [paymentAmount, exchangeRates]);

  // Handle bill payment
  const handlePayBill = async () => {
    if (!paymentAmount || !selectedBill || !accountNumber) {
      return;
    }

    setProcessing(true);
    setPaymentResult(null);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const newPayment = {
        id: Date.now(),
        name: selectedBill.name,
        category: selectedBill.category,
        amount: parseFloat(paymentAmount),
        bitcoinAmount: parseFloat(bitcoinAmount),
        date: new Date(),
        status: "completed",
        accountNumber: accountNumber,
        frequency: paymentFrequency,
      };

      setRecentPayments([newPayment, ...recentPayments]);

      // If it's a recurring payment, add to upcoming payments
      if (paymentFrequency !== "once") {
        let nextDueDate;
        const today = new Date();

        if (paymentFrequency === "weekly") {
          nextDueDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
        } else if (paymentFrequency === "biweekly") {
          nextDueDate = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);
        } else if (paymentFrequency === "monthly") {
          nextDueDate = new Date(
            today.getFullYear(),
            today.getMonth() + 1,
            today.getDate()
          );
        }

        const upcomingPayment = {
          id: Date.now() + 1,
          name: selectedBill.name,
          category: selectedBill.category,
          amount: parseFloat(paymentAmount),
          dueDate: nextDueDate,
          status: "scheduled",
          frequency: paymentFrequency,
        };

        setUpcomingPayments([...upcomingPayments, upcomingPayment]);
      }

      setPaymentResult({
        success: true,
        message: "Payment completed successfully!",
        payment: newPayment,
      });

      // Reset form
      setPaymentAmount("");
      setAccountNumber("");
      setDueDate("");
      setBitcoinAmount("");
      setShowConfirmation(false);
    } catch (error) {
      setPaymentResult({
        success: false,
        message:
          error.message || "Failed to process payment. Please try again.",
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="app-container" style={{ display: "flex" }}>
      {/* Left Sidebar Navigation - This would be a separate component */}
      <div
        className="left-sidebar"
        style={{
          width: "200px",
          backgroundColor: "#1a1a1a",
          color: "#fff",
          padding: "20px 0",
        }}
      >
        <div style={{ padding: "20px", marginTop: "50px" }}>
          <p style={{ margin: "0 0 5px 0", fontSize: "14px", color: "#888" }}>
            BTC Price
          </p>
          <p style={{ margin: "0", color: "#00c8ff", fontWeight: "bold" }}>
            $43,256.78
          </p>
          <p
            style={{ margin: "5px 0 0 0", fontSize: "12px", color: "#2ecc71" }}
          >
            • Network: Healthy
          </p>
        </div>
      </div>

      <div
        className="main-content-wrapper"
        style={{ flex: 1, display: "flex" }}
      >
        {/* Main Content */}
        <div className="main-content" style={{ flex: 1, padding: "30px" }}>
          <h1 style={{ marginBottom: "30px" }}>Pay Bills with Bitcoin</h1>

          <div className="card" style={{ marginBottom: "30px" }}>
            <h3 style={{ marginBottom: "20px" }}>Bill Categories</h3>
            <div
              className="categories-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                gap: "15px",
              }}
            >
              {billCategories.map((category) => (
                <div
                  key={category.id}
                  className="category-item"
                  style={{
                    background:
                      selectedCategory && selectedCategory.id === category.id
                        ? "rgba(0, 112, 243, 0.1)"
                        : "rgba(255, 255, 255, 0.05)",
                    borderRadius: "8px",
                    padding: "15px",
                    cursor: "pointer",
                    textAlign: "center",
                    border:
                      selectedCategory && selectedCategory.id === category.id
                        ? "1px solid var(--accent-primary)"
                        : "1px solid var(--border-color)",
                    transition: "transform 0.2s ease",
                  }}
                  onClick={() => setSelectedCategory(category)}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "translateY(-5px)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }
                >
                  <div style={{ fontSize: "32px", marginBottom: "10px" }}>
                    {category.icon}
                  </div>
                  <h4 style={{ margin: "0" }}>{category.name}</h4>
                  <p
                    style={{
                      margin: "5px 0 0 0",
                      fontSize: "12px",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {category.bills} {category.bills === 1 ? "bill" : "bills"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {selectedCategory && (
            <div className="card">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <h3>{selectedCategory.name}</h3>
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setSelectedBill(null);
                  }}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "var(--text-secondary)",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  ← Back to Categories
                </button>
              </div>

              <div className="bills-list">
                {bills.map((bill) => (
                  <div
                    key={bill.id}
                    className={`bill-item ${
                      selectedBill && selectedBill.id === bill.id
                        ? "selected"
                        : ""
                    }`}
                    style={{
                      background:
                        selectedBill && selectedBill.id === bill.id
                          ? "rgba(0, 112, 243, 0.1)"
                          : "rgba(255, 255, 255, 0.05)",
                      borderRadius: "8px",
                      padding: "15px",
                      marginBottom: "15px",
                      cursor: "pointer",
                      border:
                        selectedBill && selectedBill.id === bill.id
                          ? "1px solid var(--accent-primary)"
                          : "1px solid var(--border-color)",
                    }}
                    onClick={() => setSelectedBill(bill)}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                      }}
                    >
                      <div style={{ fontSize: "24px" }}>{bill.icon}</div>
                      <div>
                        <h4 style={{ margin: "0 0 5px 0" }}>{bill.name}</h4>
                        <p
                          style={{
                            margin: "0",
                            fontSize: "14px",
                            color: "var(--text-secondary)",
                          }}
                        >
                          {bill.company}
                        </p>
                      </div>
                      <div style={{ marginLeft: "auto", textAlign: "right" }}>
                        <p style={{ margin: "0", fontSize: "14px" }}>
                          Typical: ${bill.minAmount} - ${bill.maxAmount}
                        </p>
                        {bill.acceptsBitcoin && (
                          <span
                            style={{
                              background: "rgba(0, 255, 149, 0.1)",
                              color: "var(--accent-secondary)",
                              borderRadius: "20px",
                              padding: "2px 8px",
                              fontSize: "12px",
                              marginTop: "5px",
                              display: "inline-block",
                            }}
                          >
                            Accepts Bitcoin Directly
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedBill && (
                <div className="payment-form" style={{ marginTop: "30px" }}>
                  <h3 style={{ marginBottom: "20px" }}>
                    Pay {selectedBill.name}
                  </h3>

                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>
                      Account Number / Reference
                    </label>
                    <input
                      type="text"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      placeholder={`Enter your ${selectedBill.name} account number`}
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid var(--border-color)",
                        borderRadius: "8px",
                        padding: "10px",
                        width: "100%",
                        color: "var(--text-primary)",
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>
                      Payment Amount (USD)
                    </label>
                    <input
                      type="number"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      placeholder={`Enter amount (typical: $${selectedBill.minAmount} - $${selectedBill.maxAmount})`}
                      min={selectedBill.minAmount}
                      step="0.01"
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid var(--border-color)",
                        borderRadius: "8px",
                        padding: "10px",
                        width: "100%",
                        color: "var(--text-primary)",
                      }}
                    />
                    {paymentAmount && (
                      <p
                        style={{
                          margin: "5px 0 0 0",
                          fontSize: "14px",
                          color: "var(--text-secondary)",
                        }}
                      >
                        ≈ {bitcoinAmount} BTC
                      </p>
                    )}
                  </div>

                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>
                      Due Date (Optional)
                    </label>
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid var(--border-color)",
                        borderRadius: "8px",
                        padding: "10px",
                        width: "100%",
                        color: "var(--text-primary)",
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", marginBottom: "10px" }}>
                      Payment Frequency
                    </label>
                    <div
                      className="frequency-options"
                      style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
                    >
                      <button
                        type="button"
                        className={paymentFrequency === "once" ? "active" : ""}
                        onClick={() => setPaymentFrequency("once")}
                        style={{
                          padding: "10px 15px",
                          background:
                            paymentFrequency === "once"
                              ? "rgba(0, 112, 243, 0.1)"
                              : "rgba(255, 255, 255, 0.05)",
                          border:
                            paymentFrequency === "once"
                              ? "1px solid var(--accent-primary)"
                              : "1px solid var(--border-color)",
                          borderRadius: "8px",
                          cursor: "pointer",
                          color:
                            paymentFrequency === "once"
                              ? "var(--accent-primary)"
                              : "var(--text-primary)",
                        }}
                      >
                        One-time Payment
                      </button>
                      <button
                        type="button"
                        className={
                          paymentFrequency === "weekly" ? "active" : ""
                        }
                        onClick={() => setPaymentFrequency("weekly")}
                        style={{
                          padding: "10px 15px",
                          background:
                            paymentFrequency === "weekly"
                              ? "rgba(0, 112, 243, 0.1)"
                              : "rgba(255, 255, 255, 0.05)",
                          border:
                            paymentFrequency === "weekly"
                              ? "1px solid var(--accent-primary)"
                              : "1px solid var(--border-color)",
                          borderRadius: "8px",
                          cursor: "pointer",
                          color:
                            paymentFrequency === "weekly"
                              ? "var(--accent-primary)"
                              : "var(--text-primary)",
                        }}
                      >
                        Weekly
                      </button>
                      <button
                        type="button"
                        className={
                          paymentFrequency === "biweekly" ? "active" : ""
                        }
                        onClick={() => setPaymentFrequency("biweekly")}
                        style={{
                          padding: "10px 15px",
                          background:
                            paymentFrequency === "biweekly"
                              ? "rgba(0, 112, 243, 0.1)"
                              : "rgba(255, 255, 255, 0.05)",
                          border:
                            paymentFrequency === "biweekly"
                              ? "1px solid var(--accent-primary)"
                              : "1px solid var(--border-color)",
                          borderRadius: "8px",
                          cursor: "pointer",
                          color:
                            paymentFrequency === "biweekly"
                              ? "var(--accent-primary)"
                              : "var(--text-primary)",
                        }}
                      >
                        Bi-weekly
                      </button>
                      <button
                        type="button"
                        className={
                          paymentFrequency === "monthly" ? "active" : ""
                        }
                        onClick={() => setPaymentFrequency("monthly")}
                        style={{
                          padding: "10px 15px",
                          background:
                            paymentFrequency === "monthly"
                              ? "rgba(0, 112, 243, 0.1)"
                              : "rgba(255, 255, 255, 0.05)",
                          border:
                            paymentFrequency === "monthly"
                              ? "1px solid var(--accent-primary)"
                              : "1px solid var(--border-color)",
                          borderRadius: "8px",
                          cursor: "pointer",
                          color:
                            paymentFrequency === "monthly"
                              ? "var(--accent-primary)"
                              : "var(--text-primary)",
                        }}
                      >
                        Monthly
                      </button>
                    </div>
                  </div>

                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>
                      Payment Method
                    </label>
                    <div
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        borderRadius: "8px",
                        padding: "15px",
                        marginBottom: "20px",
                        border: "1px solid var(--border-color)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <span style={{ fontSize: "24px" }}>₿</span>
                        <div>
                          <p style={{ margin: "0", fontWeight: "bold" }}>
                            Bitcoin
                          </p>
                          <p
                            style={{
                              margin: "5px 0 0 0",
                              fontSize: "14px",
                              color: "var(--text-secondary)",
                            }}
                          >
                            Pay directly with Bitcoin
                          </p>
                        </div>
                        {/* Selected indicator */}
                        <div
                          style={{
                            marginLeft: "auto",
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            border: "2px solid var(--accent-primary)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            style={{
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              background: "var(--accent-primary)",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowConfirmation(true)}
                    disabled={!paymentAmount || !accountNumber || processing}
                    className="btn"
                    style={{ width: "100%" }}
                  >
                    {processing ? "Processing..." : "Pay Now"}
                  </button>

                  {paymentResult && (
                    <div
                      className={`payment-result ${
                        paymentResult.success ? "success" : "error"
                      }`}
                      style={{
                        marginTop: "20px",
                        padding: "15px",
                        borderRadius: "8px",
                        background: paymentResult.success
                          ? "rgba(0, 255, 149, 0.1)"
                          : "rgba(255, 71, 87, 0.1)",
                        color: paymentResult.success
                          ? "var(--accent-secondary)"
                          : "var(--accent-danger)",
                        border: `1px solid ${
                          paymentResult.success
                            ? "var(--accent-secondary)"
                            : "var(--accent-danger)"
                        }`,
                      }}
                    >
                      <p style={{ margin: "0", fontWeight: "bold" }}>
                        {paymentResult.success ? "Success!" : "Error!"}
                      </p>
                      <p style={{ margin: "5px 0 0 0" }}>
                        {paymentResult.message}
                      </p>
                      {paymentResult.success && paymentResult.payment && (
                        <div style={{ marginTop: "10px" }}>
                          <p style={{ margin: "0", fontSize: "14px" }}>
                            Paid {paymentResult.payment.name}: $
                            {paymentResult.payment.amount.toFixed(2)}
                          </p>
                          <p style={{ margin: "5px 0 0 0", fontSize: "14px" }}>
                            Bitcoin spent:{" "}
                            {paymentResult.payment.bitcoinAmount.toFixed(8)} BTC
                          </p>
                          <p style={{ margin: "5px 0 0 0", fontSize: "14px" }}>
                            Transaction ID: BTC-
                            {Math.random()
                              .toString(36)
                              .substring(2, 10)
                              .toUpperCase()}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div
          className="right-sidebar"
          style={{ width: "350px", padding: "30px 20px" }}
        >
          <div className="card" style={{ marginBottom: "20px" }}>
            <h3 style={{ marginBottom: "15px" }}>Upcoming Bills</h3>

            {upcomingPayments.length > 0 ? (
              <div className="upcoming-bills">
                {upcomingPayments.map((payment) => (
                  <div
                    key={payment.id}
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
                      <h4 style={{ margin: "0" }}>{payment.name}</h4>
                      <span
                        style={{
                          background: "rgba(255, 184, 0, 0.1)",
                          color: "var(--accent-warning)",
                          borderRadius: "20px",
                          padding: "2px 8px",
                          fontSize: "12px",
                        }}
                      >
                        {payment.status}
                      </span>
                    </div>
                    <p
                      style={{
                        margin: "0",
                        color: "var(--text-secondary)",
                        fontSize: "14px",
                      }}
                    >
                      {payment.category}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "10px",
                        alignItems: "flex-end",
                      }}
                    >
                      <p style={{ margin: "0", fontWeight: "bold" }}>
                        ${payment.amount.toFixed(2)}
                      </p>
                      <p
                        style={{
                          margin: "0",
                          fontSize: "14px",
                          color: "var(--text-secondary)",
                        }}
                      >
                        Due: {new Date(payment.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    {payment.frequency && payment.frequency !== "once" && (
                      <p
                        style={{
                          margin: "5px 0 0 0",
                          fontSize: "12px",
                          color: "var(--text-secondary)",
                          textAlign: "right",
                        }}
                      >
                        Recurring: {payment.frequency}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p>No upcoming bills</p>
            )}
          </div>

          <div className="card">
            <h3 style={{ marginBottom: "15px" }}>Recent Payments</h3>

            {recentPayments.length > 0 ? (
              <div className="recent-payments">
                {recentPayments.map((payment) => (
                  <div
                    key={payment.id}
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
                      <h4 style={{ margin: "0" }}>{payment.name}</h4>
                      <span
                        style={{
                          background: "rgba(0, 255, 149, 0.1)",
                          color: "var(--accent-secondary)",
                          borderRadius: "20px",
                          padding: "2px 8px",
                          fontSize: "12px",
                        }}
                      >
                        {payment.status}
                      </span>
                    </div>
                    <p
                      style={{
                        margin: "0",
                        color: "var(--text-secondary)",
                        fontSize: "14px",
                      }}
                    >
                      {payment.category}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "10px",
                        alignItems: "flex-end",
                      }}
                    >
                      <div>
                        <p style={{ margin: "0", fontWeight: "bold" }}>
                          ${payment.amount.toFixed(2)}
                        </p>
                        <p
                          style={{
                            margin: "5px 0 0 0",
                            fontSize: "12px",
                            color: "var(--text-secondary)",
                          }}
                        >
                          {payment.bitcoinAmount.toFixed(8)} BTC
                        </p>
                      </div>
                      <p
                        style={{
                          margin: "0",
                          fontSize: "14px",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {new Date(payment.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No recent payments</p>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div
          className="confirmation-modal"
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
              maxWidth: "500px",
              width: "100%",
            }}
          >
            <h3 style={{ marginBottom: "20px" }}>Confirm Payment</h3>

            <p style={{ marginBottom: "15px" }}>
              You are about to pay <strong>${paymentAmount}</strong> to{" "}
              <strong>{selectedBill.name}</strong>.
            </p>

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
                <p style={{ margin: "0" }}>Payee:</p>
                <p style={{ margin: "0", fontWeight: "bold" }}>
                  {selectedBill.name}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <p style={{ margin: "0" }}>Account Number:</p>
                <p style={{ margin: "0" }}>{accountNumber}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <p style={{ margin: "0" }}>Amount (USD):</p>
                <p style={{ margin: "0" }}>${paymentAmount}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <p style={{ margin: "0" }}>Payment Frequency:</p>
                <p style={{ margin: "0", textTransform: "capitalize" }}>
                  {paymentFrequency}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderTop: "1px solid var(--border-color)",
                  paddingTop: "10px",
                  marginTop: "10px",
                }}
              >
                <p style={{ margin: "0", fontWeight: "bold" }}>
                  Bitcoin Amount:
                </p>
                <p style={{ margin: "0", fontWeight: "bold" }}>
                  {bitcoinAmount} BTC
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => setShowConfirmation(false)}
                className="btn btn-outline"
                style={{ flex: 1 }}
              >
                Cancel
              </button>
              <button
                onClick={handlePayBill}
                className="btn"
                style={{ flex: 1 }}
                disabled={processing}
              >
                {processing ? "Processing..." : "Confirm Payment"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BillPayment;
