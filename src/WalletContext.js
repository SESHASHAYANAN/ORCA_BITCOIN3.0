import React, { createContext, useState, useEffect } from "react";

const WalletContext = createContext();


export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState(3); 
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [exchangeRates, setExchangeRates] = useState({
    usd: 140268.75, 
    eur: 129500.42,
    gbp: 110732.18,
  });


  const updateBalance = (newBalance) => {
    setBalance(newBalance);
  };

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,eur,gbp"
        );
        const data = await response.json();

        if (data && data.bitcoin) {
          setExchangeRates({
            usd: data.bitcoin.usd || 140268.75,
            eur: data.bitcoin.eur || 129500.42,
            gbp: data.bitcoin.gbp || 110732.18,
          });
        }
      } catch (error) {
        console.error("Failed to fetch exchange rates:", error);
      }
    };


  }, []);


  useEffect(() => {
    if (wallet) {
    
      const transactionInterval = setInterval(() => {
     
        if (Math.random() > 0.8) {
          const newTransaction = {
            id: Date.now().toString(),
            type: Math.random() > 0.5 ? "receive" : "send",
            amount: parseFloat((Math.random() * 0.1).toFixed(8)),
            timestamp: new Date(),
            confirmations: 0,
            address: `${Math.random().toString(36).substring(2, 10)}...`,
            fee: parseFloat((Math.random() * 0.0001).toFixed(8)),
          };

          setTransactions((prev) => [newTransaction, ...prev]);

          
          setBalance((prev) => {
            if (newTransaction.type === "receive") {
              return prev + newTransaction.amount;
            } else {
              return prev - (newTransaction.amount + newTransaction.fee);
            }
          });
        }
      }, 30000); 

      return () => clearInterval(transactionInterval);
    }
  }, [wallet]);


  const connectWallet = async (type) => {
    setLoading(true);

    try {
     
      const mockWallet = {
        address: `bc1q${Math.random().toString(36).substring(2, 15)}`,
        type: type,
        connected: true,
        publicKey: `xpub${Math.random().toString(36).substring(2, 30)}`,
      };

      setWallet(mockWallet);
    
      const mockTransactions = Array(5)
        .fill()
        .map((_, i) => ({
          id: `tx-${i}`,
          type: i % 2 === 0 ? "receive" : "send",
          amount: parseFloat((Math.random() * 0.5).toFixed(8)),
          timestamp: new Date(Date.now() - i * 86400000), // 1 day ago, 2 days ago, etc.
          confirmations: Math.floor(Math.random() * 6),
          address: `${Math.random().toString(36).substring(2, 10)}...`,
          fee: parseFloat((Math.random() * 0.0001).toFixed(8)),
        }));

      setTransactions(mockTransactions);

      return mockWallet;
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    setWallet(null);
    setBalance(3); 
    setTransactions([]);
  };


  const sendTransaction = async (recipient, amount, fee = "medium") => {
    if (!wallet || balance < amount) {
      throw new Error("Insufficient balance or wallet not connected");
    }

    setLoading(true);

    try {
    
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const feeAmount =
        fee === "high" ? 0.0002 : fee === "medium" ? 0.0001 : 0.00005;

      const newTransaction = {
        id: `tx-${Date.now()}`,
        type: "send",
        amount: parseFloat(amount),
        timestamp: new Date(),
        confirmations: 0,
        address: recipient,
        fee: feeAmount,
      };

      setTransactions((prev) => [newTransaction, ...prev]);

     
      const newBalance = balance - (parseFloat(amount) + feeAmount);
      setBalance(newBalance);

      return {
        success: true,
        txid: newTransaction.id,
        newBalance: newBalance,
      };
    } catch (error) {
      console.error("Failed to send transaction:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

 
  const stakeTransaction = async (amount, period, stakingOption) => {
    if (!wallet || balance < amount) {
      throw new Error("Insufficient balance or wallet not connected");
    }

    setLoading(true);

    try {
     
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const newTransaction = {
        id: `stake-${Date.now()}`,
        type: "stake",
        amount: parseFloat(amount),
        timestamp: new Date(),
        confirmations: 3,  
        period: period,
        option: stakingOption,
        status: "active",
      };

      setTransactions((prev) => [newTransaction, ...prev]);

 
      const newBalance = balance - parseFloat(amount);
      setBalance(newBalance);

      return {
        success: true,
        txid: newTransaction.id,
        newBalance: newBalance,
      };
    } catch (error) {
      console.error("Failed to stake Bitcoin:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };


  const sendPrivateTransaction = async (recipient, amount) => {
    if (!wallet || balance < amount) {
      throw new Error("Insufficient balance or wallet not connected");
    }

    setLoading(true);

    try {

      await new Promise((resolve) => setTimeout(resolve, 3000));

      const feeAmount = 0.0003; 

      const newTransaction = {
        id: `rebar-${Date.now()}`,
        type: "send",
        amount: parseFloat(amount),
        timestamp: new Date(),
        confirmations: 0,
        address: recipient,
        fee: feeAmount,
        private: true,
      };

      setTransactions((prev) => [newTransaction, ...prev]);

      const newBalance = balance - (parseFloat(amount) + feeAmount);
      setBalance(newBalance);

      return {
        success: true,
        txid: newTransaction.id,
        shield: true,
        newBalance: newBalance,
      };
    } catch (error) {
      console.error("Failed to send private transaction:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <WalletContext.Provider
      value={{
        wallet,
        balance,
        transactions,
        loading,
        exchangeRates,
        connectWallet,
        disconnectWallet,
        sendTransaction,
        sendPrivateTransaction,
        stakeTransaction,
        updateBalance,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletContext;
