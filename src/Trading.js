import React, { useState, useEffect, useContext, useRef } from "react";
import WalletContext from "./WalletContext";

function Trading() {
  const { wallet, balance, exchangeRates, sendTransaction } =
    useContext(WalletContext);
  const [markets, setMarkets] = useState([]);
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [stockDetails, setStockDetails] = useState(null);
  const [orderType, setOrderType] = useState("buy");
  const [orderAmount, setOrderAmount] = useState("");
  const [bitcoinAmount, setBitcoinAmount] = useState("");
  const [activeTab, setActiveTab] = useState("markets");
  const [myPortfolio, setMyPortfolio] = useState([]);
  const [topPortfolios, setTopPortfolios] = useState([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderResult, setOrderResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [analyzingPortfolio, setAnalyzingPortfolio] = useState(false);
  const [showBitcoinAnimation, setShowBitcoinAnimation] = useState(false);
  const [selectedQuantCompany, setSelectedQuantCompany] = useState(null);
  const [showPersonalityTest, setShowPersonalityTest] = useState(false);
  const [personalityQuestions, setPersonalityQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [personalityResult, setPersonalityResult] = useState(null);
  const [showStockRecommendation, setShowStockRecommendation] = useState(false);
  const [stockRecommendations, setStockRecommendations] = useState([]);
  const [portfolioMetrics, setPortfolioMetrics] = useState(null);
  const [quantCompanies, setQuantCompanies] = useState([]);
  const [globalMarkets, setGlobalMarkets] = useState([]);
  const [allETFs, setAllETFs] = useState([]);
  const [allCryptos, setCryptos] = useState([]);
  const [activeSecondaryTab, setActiveSecondaryTab] = useState("stocks");
  const bitcoinAnimationRef = useRef(null);

  useEffect(() => {
    const marketsData = [
      {
        id: 1,
        name: "US Stocks",
        description: "Trade top US stocks with Bitcoin",
        currency: "USD",
        stocks: 25,
      },
      {
        id: 2,
        name: "European Stocks",
        description: "Access European markets",
        currency: "EUR",
        stocks: 15,
      },
      {
        id: 3,
        name: "Asian Stocks",
        description: "Trade in Asian markets",
        currency: "Mixed",
        stocks: 12,
      },
      {
        id: 4,
        name: "Tech Stocks",
        description: "Focus on technology companies",
        currency: "USD",
        stocks: 18,
      },
      {
        id: 5,
        name: "Energy Stocks",
        description: "Trade energy sector stocks",
        currency: "Mixed",
        stocks: 10,
      },
      {
        id: 6,
        name: "Finance Stocks",
        description: "Financial sector stocks",
        currency: "Mixed",
        stocks: 15,
      },
      {
        id: 7,
        name: "Healthcare Stocks",
        description: "Medical and healthcare companies",
        currency: "Mixed",
        stocks: 12,
      },
      {
        id: 8,
        name: "Consumer Goods",
        description: "Consumer products and retail",
        currency: "Mixed",
        stocks: 14,
      },
      {
        id: 9,
        name: "Real Estate",
        description: "REITs and property stocks",
        currency: "Mixed",
        stocks: 8,
      },
      {
        id: 10,
        name: "Emerging Markets",
        description: "Stocks from developing economies",
        currency: "Mixed",
        stocks: 20,
      },
    ];

    setMarkets(marketsData);

    const globalMarketsData = [
      {
        id: 1,
        name: "USA Stock Market",
        description: "Largest and most liquid market globally",
        icon: "🇺🇸",
        returns: { ytd: 15.2, "1y": 22.4, "5y": 68.9 },
        majorIndices: ["S&P 500", "NASDAQ", "Dow Jones"],
        tradingHours: "9:30 AM - 4:00 PM EST",
      },
      {
        id: 2,
        name: "Indian Stock Market",
        description: "One of the fastest growing economies",
        icon: "🇮🇳",
        returns: { ytd: 9.8, "1y": 16.5, "5y": 59.2 },
        majorIndices: ["NIFTY 50", "SENSEX"],
        tradingHours: "9:15 AM - 3:30 PM IST",
      },
      {
        id: 3,
        name: "Japanese Stock Market",
        description: "Third largest economy in the world",
        icon: "🇯🇵",
        returns: { ytd: 7.6, "1y": 12.3, "5y": 32.1 },
        majorIndices: ["Nikkei 225", "TOPIX"],
        tradingHours: "9:00 AM - 3:00 PM JST",
      },
      {
        id: 4,
        name: "UK Stock Market",
        description: "Europe's financial hub",
        icon: "🇬🇧",
        returns: { ytd: 6.8, "1y": 11.2, "5y": 29.5 },
        majorIndices: ["FTSE 100", "FTSE 250"],
        tradingHours: "8:00 AM - 4:30 PM GMT",
      },
      {
        id: 5,
        name: "Chinese Stock Market",
        description: "World's second largest economy",
        icon: "🇨🇳",
        returns: { ytd: 5.3, "1y": 9.1, "5y": 28.4 },
        majorIndices: ["Shanghai Composite", "Shenzhen Component", "Hang Seng"],
        tradingHours: "9:30 AM - 3:00 PM CST",
      },
      {
        id: 6,
        name: "Brazilian Stock Market",
        description: "Largest market in Latin America",
        icon: "🇧🇷",
        returns: { ytd: 8.2, "1y": 14.7, "5y": 45.6 },
        majorIndices: ["Bovespa"],
        tradingHours: "10:00 AM - 5:00 PM BRT",
      },
    ];
    setGlobalMarkets(globalMarketsData);

    const etfsData = [
      {
        id: 1,
        symbol: "BTCETF",
        name: "Bitcoin Equity ETF",
        description: "Exposure to companies with Bitcoin holdings",
        aum: "1.2B",
        expense: 0.65,
        ytdReturn: 28.4,
        holdings: 45,
        topHoldings: ["MSTR", "TSLA", "SQ", "COIN", "MARA"],
      },
      {
        id: 2,
        symbol: "TECHX",
        name: "Next-Gen Tech ETF",
        description: "Diversified exposure to cutting-edge tech",
        aum: "3.8B",
        expense: 0.48,
        ytdReturn: 22.1,
        holdings: 75,
        topHoldings: ["NVDA", "MSFT", "GOOGL", "ASML", "TSM"],
      },
      {
        id: 3,
        symbol: "FINBTC",
        name: "Bitcoin Financial Services ETF",
        description: "Financial firms embracing Bitcoin",
        aum: "850M",
        expense: 0.72,
        ytdReturn: 18.9,
        holdings: 32,
        topHoldings: ["SQ", "PYPL", "GS", "JPM", "SCHW"],
      },
      {
        id: 4,
        symbol: "AIREV",
        name: "AI Revolution ETF",
        description: "Companies leading in artificial intelligence",
        aum: "4.2B",
        expense: 0.52,
        ytdReturn: 31.5,
        holdings: 38,
        topHoldings: ["NVDA", "MSFT", "GOOGL", "META", "AMD"],
      },
      {
        id: 5,
        symbol: "BTCMN",
        name: "Bitcoin Mining ETF",
        description: "Focused on Bitcoin mining operations",
        aum: "620M",
        expense: 0.85,
        ytdReturn: 42.3,
        holdings: 25,
        topHoldings: ["RIOT", "MARA", "HUT", "BITF", "CLSK"],
      },
    ];
    setAllETFs(etfsData);

    const cryptosData = [
      {
        id: 1,
        symbol: "BTC",
        name: "Bitcoin",
        price: 64289.45,
        marketCap: "1.23T",
        volume: "42.6B",
        change24h: 3.2,
        description: "The original cryptocurrency and largest by market cap",
      },
      {
        id: 2,
        symbol: "ETH",
        name: "Ethereum",
        price: 3452.18,
        marketCap: "415B",
        volume: "18.9B",
        change24h: 2.8,
        description: "Leading smart contract platform with DeFi ecosystem",
      },
      {
        id: 3,
        symbol: "SOL",
        name: "Solana",
        price: 142.76,
        marketCap: "62.5B",
        volume: "5.1B",
        change24h: 5.6,
        description: "High-performance blockchain with fast transaction speeds",
      },
      {
        id: 4,
        symbol: "AVAX",
        name: "Avalanche",
        price: 37.42,
        marketCap: "14.2B",
        volume: "1.8B",
        change24h: 4.2,
        description: "Scalable platform for decentralized applications",
      },
      {
        id: 5,
        symbol: "LINK",
        name: "Chainlink",
        price: 18.93,
        marketCap: "10.8B",
        volume: "965M",
        change24h: 1.5,
        description: "Decentralized oracle network connecting smart contracts",
      },
    ];
    setCryptos(cryptosData);

    const quantCompaniesData = [
      {
        id: 1,
        name: "AlphaQuantum",
        description: "AI-powered quantitative trading strategies",
        aum: "$2.8 Billion",
        returns: {
          ytd: 32.5,
          "1y": 78.9,
          "3y": 215.4,
          "5y": 412.8,
        },
        strategies: [
          "Statistical Arbitrage",
          "Machine Learning",
          "High-Frequency Trading",
        ],
        topHoldings: [
          { symbol: "NVDA", weight: 12.5 },
          { symbol: "MSFT", weight: 8.2 },
          { symbol: "ASML", weight: 7.4 },
          { symbol: "TSLA", weight: 6.8 },
          { symbol: "GOOGL", weight: 6.1 },
        ],
        performance: [
          { month: "Jan", return: 4.2 },
          { month: "Feb", return: 3.8 },
          { month: "Mar", return: 5.1 },
          { month: "Apr", return: 2.9 },
          { month: "May", return: 4.5 },
          { month: "Jun", return: 3.7 },
          { month: "Jul", return: 5.8 },
          { month: "Aug", return: 2.5 },
        ],
        riskMetrics: {
          sharpeRatio: 2.8,
          volatility: 15.2,
          maxDrawdown: -12.4,
          betaToSP500: 0.85,
        },
      },
      {
        id: 2,
        name: "QuantumEdge Partners",
        description: "Systematic macro strategies with economic data focus",
        aum: "$5.2 Billion",
        returns: {
          ytd: 28.3,
          "1y": 62.4,
          "3y": 185.9,
          "5y": 362.1,
        },
        strategies: [
          "Global Macro",
          "Trend Following",
          "Systematic Factor Analysis",
        ],
        topHoldings: [
          { symbol: "AAPL", weight: 9.8 },
          { symbol: "AMZN", weight: 8.6 },
          { symbol: "V", weight: 7.2 },
          { symbol: "MA", weight: 6.7 },
          { symbol: "JPM", weight: 5.9 },
        ],
        performance: [
          { month: "Jan", return: 3.8 },
          { month: "Feb", return: 4.1 },
          { month: "Mar", return: 4.7 },
          { month: "Apr", return: 3.2 },
          { month: "May", return: 3.9 },
          { month: "Jun", return: 4.2 },
          { month: "Jul", return: 5.1 },
          { month: "Aug", return: 2.3 },
        ],
        riskMetrics: {
          sharpeRatio: 2.5,
          volatility: 16.8,
          maxDrawdown: -14.2,
          betaToSP500: 0.92,
        },
      },
      {
        id: 3,
        name: "NeoQuant Technologies",
        description: "Deep learning algorithms for market prediction",
        aum: "$1.9 Billion",
        returns: {
          ytd: 38.2,
          "1y": 82.6,
          "3y": 245.3,
          "5y": 472.5,
        },
        strategies: [
          "Neural Networks",
          "Natural Language Processing",
          "Alternative Data Analysis",
        ],
        topHoldings: [
          { symbol: "META", weight: 11.2 },
          { symbol: "NVDA", weight: 10.8 },
          { symbol: "AMD", weight: 8.4 },
          { symbol: "CRM", weight: 7.1 },
          { symbol: "ADBE", weight: 6.3 },
        ],
        performance: [
          { month: "Jan", return: 5.2 },
          { month: "Feb", return: 4.9 },
          { month: "Mar", return: 6.3 },
          { month: "Apr", return: 3.8 },
          { month: "May", return: 5.7 },
          { month: "Jun", return: 4.6 },
          { month: "Jul", return: 6.5 },
          { month: "Aug", return: 3.2 },
        ],
        riskMetrics: {
          sharpeRatio: 3.1,
          volatility: 19.4,
          maxDrawdown: -16.8,
          betaToSP500: 1.12,
        },
      },
      {
        id: 4,
        name: "Renaissance Bitcoin Fund",
        description:
          "Quantitative strategies optimized for crypto correlations",
        aum: "$3.4 Billion",
        returns: {
          ytd: 36.5,
          "1y": 74.8,
          "3y": 224.6,
          "5y": 398.2,
        },
        strategies: [
          "Crypto-Equity Correlation",
          "Multi-Asset Statistical Arbitrage",
          "Digital Asset Trend Following",
        ],
        topHoldings: [
          { symbol: "MSTR", weight: 12.4 },
          { symbol: "COIN", weight: 9.6 },
          { symbol: "SQ", weight: 8.2 },
          { symbol: "TSLA", weight: 7.5 },
          { symbol: "RIOT", weight: 6.2 },
        ],
        performance: [
          { month: "Jan", return: 4.8 },
          { month: "Feb", return: 5.3 },
          { month: "Mar", return: 5.9 },
          { month: "Apr", return: 3.5 },
          { month: "May", return: 5.1 },
          { month: "Jun", return: 4.3 },
          { month: "Jul", return: 6.2 },
          { month: "Aug", return: 3.4 },
        ],
        riskMetrics: {
          sharpeRatio: 2.7,
          volatility: 22.5,
          maxDrawdown: -18.2,
          betaToSP500: 1.25,
          btcCorrelation: 0.64,
        },
      },
      {
        id: 5,
        name: "Quantum AI Capital",
        description: "AI-driven market-neutral strategies",
        aum: "$4.1 Billion",
        returns: {
          ytd: 29.8,
          "1y": 65.7,
          "3y": 196.4,
          "5y": 382.9,
        },
        strategies: [
          "Market Neutral",
          "Machine Learning Pattern Recognition",
          "Pairs Trading",
        ],
        topHoldings: [
          { symbol: "GOOGL", weight: 10.5 },
          { symbol: "AMZN", weight: 9.2 },
          { symbol: "AAPL", weight: 8.7 },
          { symbol: "MSFT", weight: 8.3 },
          { symbol: "FB", weight: 7.4 },
        ],
        performance: [
          { month: "Jan", return: 4.1 },
          { month: "Feb", return: 3.7 },
          { month: "Mar", return: 4.8 },
          { month: "Apr", return: 3.1 },
          { month: "May", return: 4.2 },
          { month: "Jun", return: 3.8 },
          { month: "Jul", return: 5.3 },
          { month: "Aug", return: 2.8 },
        ],
        riskMetrics: {
          sharpeRatio: 2.6,
          volatility: 14.8,
          maxDrawdown: -11.9,
          betaToSP500: 0.78,
        },
      },
    ];
    setQuantCompanies(quantCompaniesData);

    const questionsData = [
      {
        id: 1,
        question: "How long do you typically plan to hold your investments?",
        options: [
          "Short-term (< 1 year)",
          "Medium-term (1-5 years)",
          "Long-term (5+ years)",
        ],
      },
      {
        id: 2,
        question:
          "How would you react to a sudden 20% drop in your portfolio value?",
        options: [
          "Sell everything to prevent further losses",
          "Wait and see for a short while",
          "Buy more at the lower price",
        ],
      },
      {
        id: 3,
        question: "Which investment outcome is most appealing to you?",
        options: [
          "Low risk, stable 5-7% annual returns",
          "Moderate risk, potential 8-12% returns",
          "High risk, potential 15%+ returns",
        ],
      },
      {
        id: 4,
        question:
          "How familiar are you with financial markets and investment strategies?",
        options: [
          "Beginner - Limited knowledge",
          "Intermediate - Some experience",
          "Advanced - Experienced investor",
        ],
      },
    ];
    setPersonalityQuestions(questionsData);
  }, []);

  useEffect(() => {
    if (selectedMarket) {
      const generateStocks = () => {
        const stocksData = [];
        const sectors = [
          "Technology",
          "Finance",
          "Healthcare",
          "Energy",
          "Consumer",
          "Industry",
          "Telecom",
          "Materials",
        ];
        const stockPrefixes = {
          1: [
            "AAPL",
            "MSFT",
            "GOOGL",
            "AMZN",
            "META",
            "NFLX",
            "TSLA",
            "AMD",
            "INTC",
            "NVDA",
          ],
          2: [
            "SAP",
            "ASML",
            "EOAN",
            "DB",
            "SIE",
            "BNP",
            "BAYN",
            "ADS",
            "BMW",
            "AIR",
          ],
          3: [
            "9984",
            "9988",
            "3333",
            "005930",
            "000660",
            "7203",
            "6758",
            "6861",
            "2330",
            "1299",
          ],
          4: [
            "AAPL",
            "MSFT",
            "GOOGL",
            "AMZN",
            "META",
            "NFLX",
            "TSLA",
            "AMD",
            "INTC",
            "NVDA",
          ],
          5: [
            "XOM",
            "CVX",
            "BP",
            "SHEL",
            "TOT",
            "COP",
            "SLB",
            "EOG",
            "PXD",
            "OXY",
          ],
          6: ["JPM", "BAC", "WFC", "MS", "GS", "C", "AXP", "V", "MA", "BLK"],
          7: [
            "JNJ",
            "PFE",
            "MRK",
            "ABBV",
            "ABT",
            "TMO",
            "UNH",
            "BMY",
            "AMGN",
            "GILD",
          ],
          8: [
            "PG",
            "KO",
            "PEP",
            "WMT",
            "COST",
            "NKE",
            "MCD",
            "SBUX",
            "HD",
            "LOW",
          ],
          9: [
            "AMT",
            "EQIX",
            "PSA",
            "SPG",
            "O",
            "AVB",
            "EQR",
            "VTR",
            "DLR",
            "PLD",
          ],
          10: [
            "BABA",
            "BIDU",
            "3988",
            "INFY",
            "WIT",
            "ITUB",
            "BBD",
            "PBR",
            "000002",
            "601398",
          ],
        };

        const count = selectedMarket.stocks;
        const prefixes = stockPrefixes[selectedMarket.id] || stockPrefixes[1];

        for (let i = 0; i < count; i++) {
          const symbol = prefixes[i % prefixes.length] || `STCK${i + 1}`;
          const randomPrice = (50 + Math.random() * 950).toFixed(2);
          const randomChange = (Math.random() * 10 - 5).toFixed(2);
          const randomVolume = (Math.random() * 10000000).toFixed(0);

          stocksData.push({
            id: i + 1,
            symbol,
            name: `${symbol} Corporation`,
            price: parseFloat(randomPrice),
            change: parseFloat(randomChange),
            volume: parseInt(randomVolume),
            marketCap: (
              parseFloat(randomPrice) *
              1000000 *
              (1 + Math.random() * 100)
            ).toFixed(0),
            sector: sectors[Math.floor(Math.random() * sectors.length)],
            currency:
              selectedMarket.currency === "Mixed"
                ? Math.random() > 0.5
                  ? "USD"
                  : Math.random() > 0.5
                  ? "EUR"
                  : "JPY"
                : selectedMarket.currency,
          });
        }

        return stocksData;
      };

      setStocks(generateStocks());
    } else {
      setStocks([]);
    }
  }, [selectedMarket]);

  useEffect(() => {
    if (selectedStock) {
      const generateStockDetails = () => {
        const historicalPrices = [];
        let price = selectedStock.price * 0.9;

        for (let i = 30; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);

          const change = Math.random() * 0.06 - 0.025 + 0.005;
          price = price * (1 + change);

          historicalPrices.push({
            date: date.toISOString().split("T")[0],
            price: price,
          });
        }

        const keyStats = {
          open: (selectedStock.price * (1 - Math.random() * 0.02)).toFixed(2),
          high: (selectedStock.price * (1 + Math.random() * 0.03)).toFixed(2),
          low: (selectedStock.price * (1 - Math.random() * 0.03)).toFixed(2),
          volume: selectedStock.volume,
          avgVolume: (
            selectedStock.volume *
            (0.8 + Math.random() * 0.4)
          ).toFixed(0),
          marketCap: selectedStock.marketCap,
          pe: (10 + Math.random() * 30).toFixed(2),
          eps: (selectedStock.price / (10 + Math.random() * 30)).toFixed(2),
          dividend: (Math.random() * 3).toFixed(2),
          targetPrice: (
            selectedStock.price *
            (1 + (Math.random() * 0.4 - 0.1))
          ).toFixed(2),
        };

        return {
          ...selectedStock,
          historicalPrices,
          keyStats,
          description: `${selectedStock.name} is a leading company in the ${selectedStock.sector} sector. The company operates globally and has shown consistent growth over the years.`,
        };
      };

      setStockDetails(generateStockDetails());
    } else {
      setStockDetails(null);
    }
  }, [selectedStock]);

  // Generate portfolio data
  useEffect(() => {
    // Mock data for user's portfolio
    const generatePortfolio = () => {
      return [
        {
          id: 1,
          symbol: "AAPL",
          name: "Apple Inc.",
          shares: 10,
          avgPrice: 185.27,
          currentPrice: 191.33,
          value: 1913.3,
          profit: 60.6,
          profitPercentage: 3.27,
          currency: "USD",
          sector: "Technology",
          description:
            "Leading consumer technology company with strong ecosystem of products and services.",
        },
        {
          id: 2,
          symbol: "MSFT",
          name: "Microsoft Corporation",
          shares: 5,
          avgPrice: 378.92,
          currentPrice: 390.24,
          value: 1951.2,
          profit: 56.6,
          profitPercentage: 2.99,
          currency: "USD",
          sector: "Technology",
          description:
            "Global technology leader in cloud computing, software, and hardware solutions.",
        },
        {
          id: 3,
          symbol: "TSLA",
          name: "Tesla, Inc.",
          shares: 8,
          avgPrice: 230.15,
          currentPrice: 215.89,
          value: 1727.12,
          profit: -114.08,
          profitPercentage: -6.2,
          currency: "USD",
          sector: "Consumer Cyclical",
          description:
            "Electric vehicle manufacturer with expanding energy business.",
        },
        {
          id: 4,
          symbol: "JPM",
          name: "JPMorgan Chase & Co.",
          shares: 12,
          avgPrice: 162.45,
          currentPrice: 173.82,
          value: 2085.84,
          profit: 136.44,
          profitPercentage: 7.0,
          currency: "USD",
          sector: "Financial Services",
          description:
            "Leading global financial services firm and banking institution.",
        },
        {
          id: 5,
          symbol: "JNJ",
          name: "Johnson & Johnson",
          shares: 15,
          avgPrice: 152.18,
          currentPrice: 147.62,
          value: 2214.3,
          profit: -68.4,
          profitPercentage: -3.0,
          currency: "USD",
          sector: "Healthcare",
          description:
            "Global healthcare company developing medical devices, pharmaceuticals, and consumer packaged goods.",
        },
      ];
    };

    // Mock data for top portfolios
    const generateTopPortfolios = () => {
      return [
        {
          id: 1,
          name: "Tech Growth",
          trader: "CryptoWhale",
          returns: {
            "1m": 8.2,
            "3m": 24.7,
            "1y": 87.5,
          },
          stocks: [
            { symbol: "NVDA", weight: 25 },
            { symbol: "MSFT", weight: 20 },
            { symbol: "GOOGL", weight: 15 },
            { symbol: "AMZN", weight: 15 },
            { symbol: "TSLA", weight: 15 },
            { symbol: "AMD", weight: 10 },
          ],
          followers: 1247,
        },
        {
          id: 2,
          name: "Dividend Kings",
          trader: "IncomeInvestor",
          returns: {
            "1m": 3.1,
            "3m": 9.4,
            "1y": 32.2,
          },
          stocks: [
            { symbol: "JNJ", weight: 20 },
            { symbol: "PG", weight: 20 },
            { symbol: "KO", weight: 15 },
            { symbol: "XOM", weight: 15 },
            { symbol: "VZ", weight: 15 },
            { symbol: "T", weight: 15 },
          ],
          followers: 892,
        },
        {
          id: 3,
          name: "AI Revolution",
          trader: "FutureTech",
          returns: {
            "1m": 12.5,
            "3m": 35.8,
            "1y": 115.6,
          },
          stocks: [
            { symbol: "NVDA", weight: 30 },
            { symbol: "META", weight: 20 },
            { symbol: "MSFT", weight: 20 },
            { symbol: "GOOGL", weight: 15 },
            { symbol: "AMD", weight: 15 },
          ],
          followers: 1843,
        },
        {
          id: 4,
          name: "Balanced Growth",
          trader: "WealthBuilder",
          returns: {
            "1m": 5.6,
            "3m": 16.3,
            "1y": 42.8,
          },
          stocks: [
            { symbol: "AAPL", weight: 15 },
            { symbol: "MSFT", weight: 15 },
            { symbol: "AMZN", weight: 10 },
            { symbol: "JNJ", weight: 10 },
            { symbol: "V", weight: 10 },
            { symbol: "PG", weight: 10 },
            { symbol: "JPM", weight: 10 },
            { symbol: "DIS", weight: 10 },
            { symbol: "HD", weight: 10 },
          ],
          followers: 765,
        },
        {
          id: 5,
          name: "Energy Future",
          trader: "GreenInvestor",
          returns: {
            "1m": 7.2,
            "3m": 19.5,
            "1y": 68.3,
          },
          stocks: [
            { symbol: "TSLA", weight: 25 },
            { symbol: "ENPH", weight: 20 },
            { symbol: "SEDG", weight: 15 },
            { symbol: "NEE", weight: 15 },
            { symbol: "PLUG", weight: 15 },
            { symbol: "BE", weight: 10 },
          ],
          followers: 924,
        },
      ];
    };

    const portfolioData = generatePortfolio();
    setMyPortfolio(portfolioData);
    setTopPortfolios(generateTopPortfolios());

    // Calculate portfolio metrics
    const totalValue = portfolioData.reduce(
      (sum, position) => sum + position.value,
      0
    );
    const totalProfit = portfolioData.reduce(
      (sum, position) => sum + position.profit,
      0
    );
    const profitPercentage = (totalProfit / (totalValue - totalProfit)) * 100;

    // Calculate sector allocation
    const sectorData = {};
    portfolioData.forEach((position) => {
      if (!sectorData[position.sector]) {
        sectorData[position.sector] = 0;
      }
      sectorData[position.sector] += position.value;
    });

    const sectorAllocation = Object.entries(sectorData).map(
      ([sector, value]) => ({
        sector,
        value,
        percentage: (value / totalValue) * 100,
      })
    );

    setPortfolioMetrics({
      totalValue,
      totalProfit,
      profitPercentage,
      positionCount: portfolioData.length,
      sectorAllocation,
    });
  }, []);

  // Calculate Bitcoin amount needed based on order amount
  useEffect(() => {
    if (orderAmount && selectedStock && exchangeRates) {
      const stockPriceInUSD = selectedStock.price;
      let conversionRate;

      // Convert based on the currency of the stock
      if (selectedStock.currency === "USD") {
        conversionRate = exchangeRates.usd;
      } else if (selectedStock.currency === "EUR") {
        conversionRate = exchangeRates.eur;
      } else {
        // Fallback to USD for other currencies
        conversionRate = exchangeRates.usd;
      }

      const bitcoinRequired = (orderAmount * stockPriceInUSD) / conversionRate;
      setBitcoinAmount(bitcoinRequired.toFixed(8));
    } else {
      setBitcoinAmount("");
    }
  }, [orderAmount, selectedStock, exchangeRates]);

  // Analyze portfolio using Groq
  const analyzePortfolio = async () => {
    setAnalyzingPortfolio(true);
    setAnalysisResult(null);

    try {
      // In a real implementation, this would make an API call to Groq
      // using the API key: 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

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Mock analysis result
      const result = {
        overview:
          "Your portfolio shows moderate diversification with a technology sector tilt. The overall performance is positive but has room for improvement.",
        strengths: [
          "Strong positions in established tech companies (AAPL, MSFT)",
          "Good exposure to financial sector through JPM",
          "Positive overall returns despite some losses",
        ],
        weaknesses: [
          "Overexposure to technology sector (40% allocation)",
          "Limited international diversification",
          "No small or mid-cap stocks for growth potential",
        ],
        recommendations: [
          "📈 Consider adding more sector diversity with consumer staples or utilities",
          "🔄 Rebalance technology exposure to reduce concentration risk",
          "🌍 Add international stocks for geographic diversification",
          "💰 Consider trimming underperforming positions (TSLA, JNJ)",
        ],
        potentialAdditions: [
          {
            symbol: "PG",
            name: "Procter & Gamble",
            reason: "Stability and consistent dividends",
          },
          {
            symbol: "NVDA",
            name: "NVIDIA Corporation",
            reason: "Exposure to AI and semiconductor growth",
          },
          {
            symbol: "VXUS",
            name: "Vanguard Total International Stock ETF",
            reason: "Broad international exposure",
          },
        ],
        potentialReductions: [
          {
            symbol: "TSLA",
            name: "Tesla, Inc.",
            reason: "High volatility and current losses",
          },
        ],
        riskAssessment:
          "Moderate risk profile with beta slightly above market average",
        btcCorrelation:
          "Your portfolio shows 0.42 correlation with Bitcoin price movements",
      };

      setAnalysisResult(result);
      setShowAnalysis(true);
    } catch (error) {
      console.error("Error analyzing portfolio:", error);
      setAnalysisResult({
        error: "Failed to analyze portfolio. Please try again later.",
      });
    } finally {
      setAnalyzingPortfolio(false);
    }
  };

  // Analyze quant company for suitability
  const analyzeQuantCompany = async (company) => {
    setAnalyzingPortfolio(true);
    setAnalysisResult(null);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2500));

      // Mock analysis result
      const result = {
        suitability: Math.random() > 0.5 ? "High" : "Medium",
        fitReason: `${company.name} aligns with your investment goals based on its performance metrics and risk profile.`,
        suitabilityScore: Math.floor(70 + Math.random() * 25),
        keyStrengths: [
          "Strong consistent returns across market cycles",
          "Advanced technological edge in algorithm development",
          "Disciplined risk management framework",
        ],
        potentialConcerns: [
          "Higher fee structure compared to some alternatives",
          "Potential for increased volatility during market stress",
        ],
        expectedReturns:
          "Based on historical performance, expected annual returns of 18-24% are possible but not guaranteed.",
        bitcoinEfficiency:
          "The strategy utilizes Bitcoin efficiently with optimized entry and exit points.",
      };

      setAnalysisResult(result);
      setShowAnalysis(true);
    } catch (error) {
      console.error("Error analyzing company:", error);
      setAnalysisResult({
        error: "Failed to analyze company. Please try again later.",
      });
    } finally {
      setAnalyzingPortfolio(false);
    }
  };

  // Handle trading order
  const handlePlaceOrder = async () => {
    if (
      !orderAmount ||
      (!selectedStock && !selectedPortfolio) ||
      !bitcoinAmount
    ) {
      // Set a default bitcoin amount if it's empty
      if (!bitcoinAmount && selectedPortfolio) {
        setBitcoinAmount("0.00324");
      } else {
        return;
      }
    }

    setProcessing(true);
    setOrderResult(null);

    // Show Bitcoin transaction animation
    setShowBitcoinAnimation(true);

    try {
      // Simulate transaction to trading contract
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Handle different asset types
      if (selectedPortfolio?.isCrypto) {
        // Handle crypto transaction
        const cryptoOrder = {
          id: Date.now(),
          type: orderType,
          symbol: selectedPortfolio.symbol,
          name: selectedPortfolio.name,
          quantity: parseFloat(orderAmount || "1"),
          price: selectedPortfolio.price,
          total: parseFloat(orderAmount || "1") * selectedPortfolio.price,
          bitcoinAmount: parseFloat(
            bitcoinAmount ||
              (
                (parseFloat(orderAmount || "1") * selectedPortfolio.price) /
                65000
              ).toFixed(8)
          ),
          status: "completed",
          date: new Date(),
        };

        // Add to portfolio for buy orders
        if (orderType === "buy") {
          const newPosition = {
            id: Date.now(),
            symbol: selectedPortfolio.symbol,
            name: selectedPortfolio.name,
            shares: parseFloat(orderAmount || "1"),
            avgPrice: selectedPortfolio.price,
            currentPrice: selectedPortfolio.price,
            value: parseFloat(orderAmount || "1") * selectedPortfolio.price,
            profit: 0,
            profitPercentage: 0,
            currency: "USD",
            sector: "Cryptocurrency",
            description:
              selectedPortfolio.description ||
              `${selectedPortfolio.name} cryptocurrency`,
          };
          setMyPortfolio([...myPortfolio, newPosition]);
        }

        setOrderResult({
          success: true,
          message: `${orderType === "buy" ? "Buy" : "Sell"} order for ${
            selectedPortfolio.symbol
          } executed successfully!`,
          order: cryptoOrder,
        });
      } else if (
        selectedPortfolio?.isRecommendation ||
        selectedPortfolio?.symbol
      ) {
        // Handle ETF or recommendation purchase
        const etfOrder = {
          id: Date.now(),
          type: "buy",
          symbol: selectedPortfolio.symbol,
          name: selectedPortfolio.name,
          quantity: parseInt(orderAmount || "10"),
          price: selectedPortfolio.price || 100 + Math.random() * 200,
          total:
            parseInt(orderAmount || "10") *
            (selectedPortfolio.price || 100 + Math.random() * 200),
          bitcoinAmount: parseFloat(bitcoinAmount || "0.00324"),
          status: "completed",
          date: new Date(),
        };

        // Add to portfolio
        const newPosition = {
          id: Date.now(),
          symbol: selectedPortfolio.symbol,
          name: selectedPortfolio.name,
          shares: parseInt(orderAmount || "10"),
          avgPrice: etfOrder.price,
          currentPrice: etfOrder.price,
          value: etfOrder.total,
          profit: 0,
          profitPercentage: 0,
          currency: "USD",
          sector: selectedPortfolio.type || "ETF",
          description:
            selectedPortfolio.description ||
            `${selectedPortfolio.name} investment product`,
        };
        setMyPortfolio([...myPortfolio, newPosition]);

        setOrderResult({
          success: true,
          message: `Successfully purchased ${selectedPortfolio.symbol}!`,
          order: etfOrder,
        });
      } else if (selectedPortfolio) {
        // Handle portfolio copying
        setOrderResult({
          success: true,
          message: `Successfully copied ${selectedPortfolio.name} portfolio!`,
          portfolio: selectedPortfolio,
        });

        // Create a mock position representing the copied portfolio
        const newPosition = {
          id: Date.now(),
          symbol: `PF-${selectedPortfolio.id}`,
          name: `${selectedPortfolio.name} Portfolio`,
          shares: 1,
          avgPrice: parseFloat(bitcoinAmount || "0.01") * 65000, // Convert BTC to USD for display
          currentPrice: parseFloat(bitcoinAmount || "0.01") * 65000,
          value: parseFloat(bitcoinAmount || "0.01") * 65000,
          profit: 0,
          profitPercentage: 0,
          currency: "USD",
          sector: "Copied Portfolio",
          description: `Copied portfolio managed by ${selectedPortfolio.trader}`,
        };
        setMyPortfolio([...myPortfolio, newPosition]);
      } else {
        // Regular stock order
        const newOrder = {
          id: Date.now(),
          type: orderType,
          symbol: selectedStock.symbol,
          name: selectedStock.name,
          quantity: parseInt(orderAmount),
          price: selectedStock.price,
          total: parseFloat(orderAmount) * selectedStock.price,
          bitcoinAmount: parseFloat(bitcoinAmount),
          status: "completed",
          date: new Date(),
        };

        // Update portfolio if buying
        if (orderType === "buy") {
          const existingPosition = myPortfolio.find(
            (p) => p.symbol === selectedStock.symbol
          );

          if (existingPosition) {
            // Update existing position
            const updatedPortfolio = myPortfolio.map((p) => {
              if (p.symbol === selectedStock.symbol) {
                const newShares = p.shares + parseInt(orderAmount);
                const newAvgPrice =
                  (p.shares * p.avgPrice +
                    parseInt(orderAmount) * selectedStock.price) /
                  newShares;
                const newValue = newShares * selectedStock.price;
                const newProfit = newValue - newShares * newAvgPrice;
                const newProfitPercentage =
                  (newProfit / (newShares * newAvgPrice)) * 100;

                return {
                  ...p,
                  shares: newShares,
                  avgPrice: newAvgPrice,
                  currentPrice: selectedStock.price,
                  value: newValue,
                  profit: newProfit,
                  profitPercentage: newProfitPercentage,
                };
              }
              return p;
            });

            setMyPortfolio(updatedPortfolio);
          } else {
            // Add new position
            const newPosition = {
              id: Date.now(),
              symbol: selectedStock.symbol,
              name: selectedStock.name,
              shares: parseInt(orderAmount),
              avgPrice: selectedStock.price,
              currentPrice: selectedStock.price,
              value: parseInt(orderAmount) * selectedStock.price,
              profit: 0,
              profitPercentage: 0,
              currency: selectedStock.currency,
              sector: selectedStock.sector,
              description:
                selectedStock.description ||
                `${selectedStock.name} is a company in the ${selectedStock.sector} sector.`,
            };

            setMyPortfolio([...myPortfolio, newPosition]);
          }
        } else if (orderType === "sell") {
          // Handle sell order
          const existingPosition = myPortfolio.find(
            (p) => p.symbol === selectedStock.symbol
          );

          if (
            existingPosition &&
            existingPosition.shares >= parseInt(orderAmount)
          ) {
            const updatedPortfolio = myPortfolio
              .map((p) => {
                if (p.symbol === selectedStock.symbol) {
                  const newShares = p.shares - parseInt(orderAmount);

                  if (newShares === 0) {
                    return null; // Remove position completely
                  }

                  const newValue = newShares * selectedStock.price;
                  const newProfit = newValue - newShares * p.avgPrice;
                  const newProfitPercentage =
                    (newProfit / (newShares * p.avgPrice)) * 100;

                  return {
                    ...p,
                    shares: newShares,
                    currentPrice: selectedStock.price,
                    value: newValue,
                    profit: newProfit,
                    profitPercentage: newProfitPercentage,
                  };
                }
                return p;
              })
              .filter((p) => p !== null);

            setMyPortfolio(updatedPortfolio);
          }
        }

        setOrderResult({
          success: true,
          message: `${
            orderType === "buy" ? "Buy" : "Sell"
          } order executed successfully!`,
          order: newOrder,
        });
      }

      // Update portfolio metrics after transaction
      const updatedPortfolio = myPortfolio;
      const totalValue = updatedPortfolio.reduce(
        (sum, position) => sum + position.value,
        0
      );
      const totalProfit = updatedPortfolio.reduce(
        (sum, position) => sum + position.profit,
        0
      );
      const profitPercentage = (totalProfit / (totalValue - totalProfit)) * 100;

      // Calculate sector allocation
      const sectorData = {};
      updatedPortfolio.forEach((position) => {
        if (!sectorData[position.sector]) {
          sectorData[position.sector] = 0;
        }
        sectorData[position.sector] += position.value;
      });

      const sectorAllocation = Object.entries(sectorData).map(
        ([sector, value]) => ({
          sector,
          value,
          percentage: (value / totalValue) * 100,
        })
      );

      setPortfolioMetrics({
        totalValue,
        totalProfit,
        profitPercentage,
        positionCount: updatedPortfolio.length,
        sectorAllocation,
      });

      // Reset form
      setOrderAmount("");
      setBitcoinAmount("");
      setShowConfirmation(false);
    } catch (error) {
      setOrderResult({
        success: false,
        message:
          error.message || `Failed to complete transaction. Please try again.`,
      });
    } finally {
      setProcessing(false);
      // Hide Bitcoin animation after a delay
      setTimeout(() => {
        setShowBitcoinAnimation(false);
      }, 1000);
    }
  };

  // Handle following a portfolio
  const handleFollowPortfolio = (portfolio) => {
    setSelectedPortfolio(portfolio);
    setShowConfirmation(true);
  };

  // Handle copying a portfolio
  const handleCopyPortfolio = async () => {
    setProcessing(true);

    // Show Bitcoin transaction animation
    setShowBitcoinAnimation(true);

    try {
      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Add the copied portfolio to the user's portfolio
      if (selectedPortfolio) {
        const newPosition = {
          id: Date.now(),
          symbol: `PF-${selectedPortfolio.id}`,
          name: `${selectedPortfolio.name} Portfolio`,
          shares: 1,
          avgPrice: parseFloat(bitcoinAmount || "0.01") * 65000, // Convert BTC to USD for display
          currentPrice: parseFloat(bitcoinAmount || "0.01") * 65000,
          value: parseFloat(bitcoinAmount || "0.01") * 65000,
          profit: 0,
          profitPercentage: 0,
          currency: "USD",
          sector: "Copied Portfolio",
          description: `Copied portfolio managed by ${selectedPortfolio.trader}`,
        };
        setMyPortfolio([...myPortfolio, newPosition]);
      }

      setOrderResult({
        success: true,
        message: `Successfully copied ${
          selectedPortfolio ? selectedPortfolio.name : "selected"
        } portfolio!`,
        portfolio: selectedPortfolio,
      });

      setShowConfirmation(false);
      setSelectedPortfolio(null);
    } catch (error) {
      setOrderResult({
        success: false,
        message: error.message || "Failed to copy portfolio. Please try again.",
      });
    } finally {
      setProcessing(false);
      // Hide Bitcoin animation after a delay
      setTimeout(() => {
        setShowBitcoinAnimation(false);
      }, 1000);
    }
  };

  // Handle personality test
  const submitAnswer = (answer) => {
    setUserAnswers([...userAnswers, answer]);

    if (currentQuestionIndex < personalityQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Process results when all questions answered
      analyzeInvestorProfile();
    }
  };

  // Analyze investor profile based on answers
  const analyzeInvestorProfile = async () => {
    setProcessing(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2500));

      // Determine investor type based on answers
      let riskTolerance = 0;
      let timeHorizon = 0;
      let expertise = 0;

      // Calculate profile based on answers
      if (userAnswers[0] === "Short-term (< 1 year)") timeHorizon = 1;
      else if (userAnswers[0] === "Medium-term (1-5 years)") timeHorizon = 2;
      else timeHorizon = 3;

      if (userAnswers[1] === "Sell everything to prevent further losses")
        riskTolerance = 1;
      else if (userAnswers[1] === "Wait and see for a short while")
        riskTolerance = 2;
      else riskTolerance = 3;

      if (userAnswers[2] === "Low risk, stable 5-7% annual returns")
        riskTolerance += 1;
      else if (userAnswers[2] === "Moderate risk, potential 8-12% returns")
        riskTolerance += 2;
      else riskTolerance += 3;

      if (userAnswers[3] === "Beginner - Limited knowledge") expertise = 1;
      else if (userAnswers[3] === "Intermediate - Some experience")
        expertise = 2;
      else expertise = 3;

      let investorType = "";
      if (riskTolerance <= 3) investorType = "Conservative";
      else if (riskTolerance <= 5) investorType = "Moderate";
      else investorType = "Aggressive";

      if (timeHorizon === 3) investorType += " Long-Term";
      else if (timeHorizon === 2) investorType += " Medium-Term";
      else investorType += " Short-Term";

      // Generate recommendations based on profile
      let recommendations = [];

      if (investorType.includes("Conservative")) {
        recommendations = [
          {
            symbol: "JNJ",
            name: "Johnson & Johnson",
            type: "Stock",
            reasoning: "Stable blue-chip with strong dividend history",
          },
          {
            symbol: "PG",
            name: "Procter & Gamble",
            type: "Stock",
            reasoning: "Consumer defensive with consistent cash flow",
          },
          {
            symbol: "BTCETF",
            name: "Bitcoin Equity ETF",
            type: "ETF",
            reasoning:
              "Diversified exposure to Bitcoin ecosystem with lower volatility",
          },
          {
            symbol: "VYM",
            name: "Vanguard High Dividend Yield ETF",
            type: "ETF",
            reasoning:
              "Focus on income generation with moderate growth potential",
          },
        ];
      } else if (investorType.includes("Moderate")) {
        recommendations = [
          {
            symbol: "MSFT",
            name: "Microsoft",
            type: "Stock",
            reasoning: "Growth with stability and strong cloud business",
          },
          {
            symbol: "AAPL",
            name: "Apple Inc.",
            type: "Stock",
            reasoning: "Consistent performance with strong ecosystem",
          },
          {
            symbol: "FINBTC",
            name: "Bitcoin Financial Services ETF",
            type: "ETF",
            reasoning:
              "Exposure to Bitcoin financial infrastructure with moderate risk",
          },
          {
            symbol: "QQQ",
            name: "Invesco QQQ Trust",
            type: "ETF",
            reasoning: "Tech-focused growth with established companies",
          },
        ];
      } else {
        recommendations = [
          {
            symbol: "NVDA",
            name: "NVIDIA Corporation",
            type: "Stock",
            reasoning: "High growth potential in AI and computing",
          },
          {
            symbol: "TSLA",
            name: "Tesla, Inc.",
            type: "Stock",
            reasoning: "Disruptive potential with high volatility",
          },
          {
            symbol: "BTCMN",
            name: "Bitcoin Mining ETF",
            type: "ETF",
            reasoning: "High correlation to Bitcoin with amplified returns",
          },
          {
            symbol: "COIN",
            name: "Coinbase Global",
            type: "Stock",
            reasoning: "Direct exposure to crypto trading volume",
          },
        ];
      }

      // Create final profile
      const profile = {
        type: investorType,
        riskTolerance:
          riskTolerance <= 3 ? "Low" : riskTolerance <= 5 ? "Medium" : "High",
        timeHorizon:
          timeHorizon === 1
            ? "Short-term"
            : timeHorizon === 2
            ? "Medium-term"
            : "Long-term",
        expertise:
          expertise === 1
            ? "Beginner"
            : expertise === 2
            ? "Intermediate"
            : "Advanced",
        recommendations: recommendations,
        description: `As a ${investorType.toLowerCase()} investor, you prefer ${
          riskTolerance <= 3
            ? "stable investments with reliable returns"
            : riskTolerance <= 5
            ? "a balanced approach with moderate growth potential"
            : "growth-oriented investments even with higher volatility"
        }. Your ${
          timeHorizon === 1
            ? "short-term"
            : timeHorizon === 2
            ? "medium-term"
            : "long-term"
        } focus suggests ${
          timeHorizon === 1
            ? "you may need more liquidity and should avoid locking funds in long-term investments"
            : timeHorizon === 2
            ? "you have some time to weather market fluctuations"
            : "you can take advantage of market cycles and compound growth"
        }.`,
      };

      setPersonalityResult(profile);
      setShowPersonalityTest(false);
      setShowStockRecommendation(true);
      setStockRecommendations(recommendations);
    } catch (error) {
      console.error("Error analyzing profile:", error);
    } finally {
      setProcessing(false);
      setCurrentQuestionIndex(0);
      setUserAnswers([]);
    }
  };

  return (
    <div className="trading-container">
      <h1 style={{ marginBottom: "30px" }}>Bitcoin Stock Trading</h1>

      <div
        className="trading-tabs"
        style={{
          display: "flex",
          borderBottom: "1px solid var(--border-color)",
          marginBottom: "30px",
        }}
      >
        <button
          className={`tab ${activeTab === "markets" ? "active" : ""}`}
          onClick={() => setActiveTab("markets")}
          style={{
            padding: "10px 20px",
            background: "transparent",
            border: "none",
            borderBottom:
              activeTab === "markets"
                ? "2px solid var(--accent-primary)"
                : "2px solid transparent",
            color:
              activeTab === "markets"
                ? "var(--accent-primary)"
                : "var(--text-primary)",
            cursor: "pointer",
            fontWeight: activeTab === "markets" ? "bold" : "normal",
          }}
        >
          Markets
        </button>
        <button
          className={`tab ${activeTab === "portfolio" ? "active" : ""}`}
          onClick={() => setActiveTab("portfolio")}
          style={{
            padding: "10px 20px",
            background: "transparent",
            border: "none",
            borderBottom:
              activeTab === "portfolio"
                ? "2px solid var(--accent-primary)"
                : "2px solid transparent",
            color:
              activeTab === "portfolio"
                ? "var(--accent-primary)"
                : "var(--text-primary)",
            cursor: "pointer",
            fontWeight: activeTab === "portfolio" ? "bold" : "normal",
          }}
        >
          My Portfolio
        </button>
        <button
          className={`tab ${activeTab === "copy" ? "active" : ""}`}
          onClick={() => setActiveTab("copy")}
          style={{
            padding: "10px 20px",
            background: "transparent",
            border: "none",
            borderBottom:
              activeTab === "copy"
                ? "2px solid var(--accent-primary)"
                : "2px solid transparent",
            color:
              activeTab === "copy"
                ? "var(--accent-primary)"
                : "var(--text-primary)",
            cursor: "pointer",
            fontWeight: activeTab === "copy" ? "bold" : "normal",
          }}
        >
          Copy Trading
        </button>
        <button
          className={`tab ${activeTab === "etf" ? "active" : ""}`}
          onClick={() => setActiveTab("etf")}
          style={{
            padding: "10px 20px",
            background: "transparent",
            border: "none",
            borderBottom:
              activeTab === "etf"
                ? "2px solid var(--accent-primary)"
                : "2px solid transparent",
            color:
              activeTab === "etf"
                ? "var(--accent-primary)"
                : "var(--text-primary)",
            cursor: "pointer",
            fontWeight: activeTab === "etf" ? "bold" : "normal",
          }}
        >
          ETFs
        </button>
        <button
          className={`tab ${activeTab === "crypto" ? "active" : ""}`}
          onClick={() => setActiveTab("crypto")}
          style={{
            padding: "10px 20px",
            background: "transparent",
            border: "none",
            borderBottom:
              activeTab === "crypto"
                ? "2px solid var(--accent-primary)"
                : "2px solid transparent",
            color:
              activeTab === "crypto"
                ? "var(--accent-primary)"
                : "var(--text-primary)",
            cursor: "pointer",
            fontWeight: activeTab === "crypto" ? "bold" : "normal",
          }}
        >
          Crypto
        </button>
        <button
          className={`tab ${activeTab === "global" ? "active" : ""}`}
          onClick={() => setActiveTab("global")}
          style={{
            padding: "10px 20px",
            background: "transparent",
            border: "none",
            borderBottom:
              activeTab === "global"
                ? "2px solid var(--accent-primary)"
                : "2px solid transparent",
            color:
              activeTab === "global"
                ? "var(--accent-primary)"
                : "var(--text-primary)",
            cursor: "pointer",
            fontWeight: activeTab === "global" ? "bold" : "normal",
          }}
        >
          Global
        </button>
        <button
          className={`tab ${activeTab === "analyze" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("analyze");
            setShowPersonalityTest(true);
          }}
          style={{
            padding: "10px 20px",
            background: "transparent",
            border: "none",
            borderBottom:
              activeTab === "analyze"
                ? "2px solid var(--accent-primary)"
                : "2px solid transparent",
            color:
              activeTab === "analyze"
                ? "var(--accent-primary)"
                : "var(--text-primary)",
            cursor: "pointer",
            fontWeight: activeTab === "analyze" ? "bold" : "normal",
          }}
        >
          Analyze Me
        </button>
      </div>

      {activeTab === "markets" && (
        <div className="markets-tab">
          <div
            className="trading-layout"
            style={{
              display: "grid",
              gridTemplateColumns: selectedStock ? "300px 1fr" : "300px 1fr",
              gap: "30px",
            }}
          >
            <div className="markets-list">
              {!selectedMarket && (
                <div className="card" style={{ marginBottom: "20px" }}>
                  <h3 style={{ marginBottom: "15px" }}>Markets</h3>
                  <div
                    className="markets-grid"
                    style={{
                      display: "grid",
                      gap: "15px",
                    }}
                  >
                    {markets.map((market) => (
                      <div
                        key={market.id}
                        className="market-item"
                        style={{
                          background: "rgba(255, 255, 255, 0.05)",
                          borderRadius: "8px",
                          padding: "15px",
                          cursor: "pointer",
                          transition: "transform 0.2s ease",
                        }}
                        onClick={() => setSelectedMarket(market)}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.transform = "translateY(-5px)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.transform = "translateY(0)")
                        }
                      >
                        <h4 style={{ marginBottom: "5px" }}>{market.name}</h4>
                        <p
                          style={{
                            fontSize: "14px",
                            color: "var(--text-secondary)",
                            marginBottom: "10px",
                          }}
                        >
                          {market.description}
                        </p>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: "14px",
                          }}
                        >
                          <span>Currency: {market.currency}</span>
                          <span>{market.stocks} stocks</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedMarket && (
                <div className="card" style={{ marginBottom: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "15px",
                    }}
                  >
                    <h3>{selectedMarket.name}</h3>
                    <button
                      onClick={() => {
                        setSelectedMarket(null);
                        setSelectedStock(null);
                      }}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "var(--text-secondary)",
                        cursor: "pointer",
                        fontSize: "14px",
                      }}
                    >
                      ← Back to Markets
                    </button>
                  </div>

                  <div
                    className="search-container"
                    style={{ marginBottom: "15px" }}
                  >
                    <input
                      type="text"
                      placeholder="Search stocks..."
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid var(--border-color)",
                        borderRadius: "8px",
                        padding: "8px 12px",
                        width: "100%",
                        color: "var(--text-primary)",
                      }}
                    />
                  </div>

                  <div
                    className="stocks-list"
                    style={{
                      maxHeight: "600px",
                      overflowY: "auto",
                    }}
                  >
                    {stocks.map((stock) => (
                      <div
                        key={stock.id}
                        className={`stock-item ${
                          selectedStock && selectedStock.id === stock.id
                            ? "selected"
                            : ""
                        }`}
                        style={{
                          padding: "10px",
                          borderRadius: "8px",
                          cursor: "pointer",
                          background:
                            selectedStock && selectedStock.id === stock.id
                              ? "rgba(0, 112, 243, 0.1)"
                              : "transparent",
                          borderLeft:
                            selectedStock && selectedStock.id === stock.id
                              ? "4px solid var(--accent-primary)"
                              : "4px solid transparent",
                          marginBottom: "5px",
                        }}
                        onClick={() => setSelectedStock(stock)}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>
                            <h4 style={{ margin: "0" }}>{stock.symbol}</h4>
                            <p
                              style={{
                                margin: "5px 0 0 0",
                                fontSize: "12px",
                                color: "var(--text-secondary)",
                              }}
                            >
                              {stock.name}
                            </p>
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <p style={{ margin: "0", fontWeight: "bold" }}>
                              {stock.currency} {stock.price.toFixed(2)}
                            </p>
                            <p
                              style={{
                                margin: "5px 0 0 0",
                                fontSize: "12px",
                                color:
                                  stock.change >= 0
                                    ? "var(--accent-secondary)"
                                    : "var(--accent-danger)",
                              }}
                            >
                              {stock.change >= 0 ? "+" : ""}
                              {stock.change}%
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="stock-details">
              {!selectedMarket && (
                <div
                  className="card"
                  style={{ textAlign: "center", padding: "40px 20px" }}
                >
                  <h3 style={{ marginBottom: "15px" }}>
                    Welcome to Bitcoin Stock Trading
                  </h3>
                  <p style={{ marginBottom: "20px" }}>
                    Trade stocks in global markets directly with Bitcoin. No
                    conversion fees, no middlemen, full control.
                  </p>
                  <p
                    style={{
                      color: "var(--text-secondary)",
                      marginBottom: "20px",
                    }}
                  >
                    Please select a market from the left panel to start trading.
                  </p>
                </div>
              )}

              {selectedMarket && !selectedStock && (
                <div
                  className="card"
                  style={{ textAlign: "center", padding: "40px 20px" }}
                >
                  <h3 style={{ marginBottom: "15px" }}>Select a Stock</h3>
                  <p
                    style={{
                      color: "var(--text-secondary)",
                      marginBottom: "20px",
                    }}
                  >
                    Choose a stock from the {selectedMarket.name} market to view
                    details and start trading.
                  </p>
                </div>
              )}

              {selectedStock && stockDetails && (
                <div>
                  <div className="card" style={{ marginBottom: "20px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "20px",
                      }}
                    >
                      <div>
                        <h2 style={{ marginBottom: "5px" }}>
                          {selectedStock.symbol}
                        </h2>
                        <p
                          style={{
                            margin: "0",
                            color: "var(--text-secondary)",
                          }}
                        >
                          {selectedStock.name}
                        </p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <h2 style={{ marginBottom: "5px" }}>
                          {selectedStock.currency}{" "}
                          {selectedStock.price.toFixed(2)}
                        </h2>
                        <p
                          style={{
                            margin: "0",
                            color:
                              selectedStock.change >= 0
                                ? "var(--accent-secondary)"
                                : "var(--accent-danger)",
                            fontWeight: "bold",
                          }}
                        >
                          {selectedStock.change >= 0 ? "+" : ""}
                          {selectedStock.change}%
                        </p>
                      </div>
                    </div>

                    <div
                      className="price-chart"
                      style={{
                        height: "200px",
                        marginBottom: "20px",
                        position: "relative",
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
                        {stockDetails.historicalPrices.map(
                          (dataPoint, index) => {
                            const maxPrice = Math.max(
                              ...stockDetails.historicalPrices.map(
                                (d) => d.price
                              )
                            );
                            const minPrice = Math.min(
                              ...stockDetails.historicalPrices.map(
                                (d) => d.price
                              )
                            );
                            const range = maxPrice - minPrice;
                            const heightPercentage =
                              ((dataPoint.price - minPrice) / range) * 100;

                            // Set a min height for better visualization
                            const barHeight = Math.max(10, heightPercentage);

                            // Determine if price is increasing or decreasing
                            const increasing =
                              index > 0 &&
                              dataPoint.price >
                                stockDetails.historicalPrices[index - 1].price;

                            return (
                              <div
                                key={index}
                                style={{
                                  flex: 1,
                                  height: `${barHeight}%`,
                                  backgroundColor: increasing
                                    ? "var(--accent-secondary)"
                                    : "var(--accent-danger)",
                                  borderRadius: "2px 2px 0 0",
                                  minWidth: "3px",
                                  maxWidth: "10px",
                                  transition: "height 0.3s ease",
                                }}
                              ></div>
                            );
                          }
                        )}
                      </div>

                      {/* Time labels */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: "-25px",
                          left: "0",
                          right: "0",
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "12px",
                          color: "var(--text-secondary)",
                        }}
                      >
                        <span>{stockDetails.historicalPrices[0].date}</span>
                        <span>
                          {
                            stockDetails.historicalPrices[
                              Math.floor(
                                stockDetails.historicalPrices.length / 2
                              )
                            ].date
                          }
                        </span>
                        <span>
                          {
                            stockDetails.historicalPrices[
                              stockDetails.historicalPrices.length - 1
                            ].date
                          }
                        </span>
                      </div>
                    </div>

                    <div
                      className="stock-stats-grid"
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(120px, 1fr))",
                        gap: "15px",
                        marginBottom: "20px",
                      }}
                    >
                      <div>
                        <p
                          style={{
                            margin: "0",
                            fontSize: "12px",
                            color: "var(--text-secondary)",
                          }}
                        >
                          Open
                        </p>
                        <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                          {stockDetails.keyStats.open}
                        </p>
                      </div>
                      <div>
                        <p
                          style={{
                            margin: "0",
                            fontSize: "12px",
                            color: "var(--text-secondary)",
                          }}
                        >
                          High
                        </p>
                        <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                          {stockDetails.keyStats.high}
                        </p>
                      </div>
                      <div>
                        <p
                          style={{
                            margin: "0",
                            fontSize: "12px",
                            color: "var(--text-secondary)",
                          }}
                        >
                          Low
                        </p>
                        <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                          {stockDetails.keyStats.low}
                        </p>
                      </div>
                      <div>
                        <p
                          style={{
                            margin: "0",
                            fontSize: "12px",
                            color: "var(--text-secondary)",
                          }}
                        >
                          Volume
                        </p>
                        <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                          {parseInt(
                            stockDetails.keyStats.volume
                          ).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p
                          style={{
                            margin: "0",
                            fontSize: "12px",
                            color: "var(--text-secondary)",
                          }}
                        >
                          Market Cap
                        </p>
                        <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                          {parseInt(
                            stockDetails.keyStats.marketCap
                          ).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p
                          style={{
                            margin: "0",
                            fontSize: "12px",
                            color: "var(--text-secondary)",
                          }}
                        >
                          P/E Ratio
                        </p>
                        <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                          {stockDetails.keyStats.pe}
                        </p>
                      </div>
                      <div>
                        <p
                          style={{
                            margin: "0",
                            fontSize: "12px",
                            color: "var(--text-secondary)",
                          }}
                        >
                          EPS
                        </p>
                        <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                          {stockDetails.keyStats.eps}
                        </p>
                      </div>
                      <div>
                        <p
                          style={{
                            margin: "0",
                            fontSize: "12px",
                            color: "var(--text-secondary)",
                          }}
                        >
                          Dividend
                        </p>
                        <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                          {stockDetails.keyStats.dividend}%
                        </p>
                      </div>
                    </div>

                    <p
                      style={{
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {stockDetails.description}
                    </p>
                  </div>

                  <div className="card">
                    <h3 style={{ marginBottom: "20px" }}>
                      Trade {selectedStock.symbol}
                    </h3>
                    <div
                      className="order-types"
                      style={{
                        display: "flex",
                        marginBottom: "20px",
                        background: "rgba(255, 255, 255, 0.05)",
                        borderRadius: "8px",
                        padding: "2px",
                      }}
                    >
                      <button
                        className={orderType === "buy" ? "active" : ""}
                        onClick={() => setOrderType("buy")}
                        style={{
                          flex: 1,
                          padding: "10px",
                          background:
                            orderType === "buy"
                              ? "rgba(0, 255, 149, 0.1)"
                              : "transparent",
                          color:
                            orderType === "buy"
                              ? "var(--accent-secondary)"
                              : "var(--text-primary)",
                          border: "none",
                          cursor: "pointer",
                          borderRadius: "6px",
                          fontWeight: orderType === "buy" ? "bold" : "normal",
                        }}
                      >
                        Buy
                      </button>
                      <button
                        className={orderType === "sell" ? "active" : ""}
                        onClick={() => setOrderType("sell")}
                        style={{
                          flex: 1,
                          padding: "10px",
                          background:
                            orderType === "sell"
                              ? "rgba(255, 71, 87, 0.1)"
                              : "transparent",
                          color:
                            orderType === "sell"
                              ? "var(--accent-danger)"
                              : "var(--text-primary)",
                          border: "none",
                          cursor: "pointer",
                          borderRadius: "6px",
                          fontWeight: orderType === "sell" ? "bold" : "normal",
                        }}
                      >
                        Sell
                      </button>
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                      <label style={{ display: "block", marginBottom: "5px" }}>
                        Quantity (Shares)
                      </label>
                      <input
                        type="number"
                        value={orderAmount}
                        onChange={(e) => setOrderAmount(e.target.value)}
                        placeholder="Enter quantity"
                        min="1"
                        step="1"
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
                        Order Summary
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
                          <p style={{ margin: "0" }}>Stock Price:</p>
                          <p style={{ margin: "0", fontWeight: "bold" }}>
                            {selectedStock.currency}{" "}
                            {selectedStock.price.toFixed(2)}
                          </p>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "10px",
                          }}
                        >
                          <p style={{ margin: "0" }}>Quantity:</p>
                          <p style={{ margin: "0" }}>
                            {orderAmount || "0"}{" "}
                            {parseInt(orderAmount) === 1 ? "share" : "shares"}
                          </p>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "10px",
                          }}
                        >
                          <p style={{ margin: "0" }}>Total Value:</p>
                          <p style={{ margin: "0" }}>
                            {selectedStock.currency}{" "}
                            {orderAmount
                              ? (
                                  selectedStock.price * parseFloat(orderAmount)
                                ).toFixed(2)
                              : "0.00"}
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
                            Bitcoin Required:
                          </p>
                          <p style={{ margin: "0", fontWeight: "bold" }}>
                            {bitcoinAmount || "0.00000000"} BTC
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowConfirmation(true)}
                      disabled={
                        !orderAmount ||
                        parseFloat(orderAmount) <= 0 ||
                        processing
                      }
                      className="btn"
                      style={{
                        width: "100%",
                        background:
                          orderType === "buy"
                            ? "var(--accent-secondary)"
                            : "var(--accent-danger)",
                      }}
                    >
                      {processing
                        ? "Processing..."
                        : orderType === "buy"
                        ? "Buy"
                        : "Sell"}{" "}
                      {selectedStock.symbol}
                    </button>

                    {orderResult && (
                      <div
                        className={`order-result ${
                          orderResult.success ? "success" : "error"
                        }`}
                        style={{
                          marginTop: "20px",
                          padding: "15px",
                          borderRadius: "8px",
                          background: orderResult.success
                            ? "rgba(0, 255, 149, 0.1)"
                            : "rgba(255, 71, 87, 0.1)",
                          color: orderResult.success
                            ? "var(--accent-secondary)"
                            : "var(--accent-danger)",
                          border: `1px solid ${
                            orderResult.success
                              ? "var(--accent-secondary)"
                              : "var(--accent-danger)"
                          }`,
                        }}
                      >
                        <p style={{ margin: "0", fontWeight: "bold" }}>
                          {orderResult.success ? "Success!" : "Error!"}
                        </p>
                        <p style={{ margin: "5px 0 0 0" }}>
                          {orderResult.message}
                        </p>
                        {orderResult.success && orderResult.order && (
                          <div style={{ marginTop: "10px" }}>
                            <p style={{ margin: "0", fontSize: "14px" }}>
                              {orderResult.order.type === "buy"
                                ? "Bought"
                                : "Sold"}{" "}
                              {orderResult.order.quantity}{" "}
                              {orderResult.order.symbol} shares at{" "}
                              {selectedStock.currency}{" "}
                              {orderResult.order.price.toFixed(2)}
                            </p>
                            <p
                              style={{ margin: "5px 0 0 0", fontSize: "14px" }}
                            >
                              Bitcoin{" "}
                              {orderResult.order.type === "buy"
                                ? "spent"
                                : "received"}
                              : {orderResult.order.bitcoinAmount.toFixed(8)} BTC
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === "portfolio" && (
        <div className="portfolio-tab">
          <div className="card" style={{ marginBottom: "30px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h3>My Portfolio Summary</h3>
              <button
                onClick={analyzePortfolio}
                disabled={analyzingPortfolio}
                style={{
                  background: "var(--accent-primary)",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                {analyzingPortfolio ? (
                  "Analyzing..."
                ) : (
                  <>
                    <span>🔍</span> Analyze Portfolio
                  </>
                )}
              </button>
            </div>

            <div
              className="portfolio-stats"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "20px",
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
                  Total Value
                </p>
                <p
                  style={{
                    margin: "5px 0 0 0",
                    fontWeight: "bold",
                    fontSize: "24px",
                  }}
                >
                  $
                  {portfolioMetrics?.totalValue.toFixed(2) ||
                    myPortfolio
                      .reduce((sum, position) => sum + position.value, 0)
                      .toFixed(2)}
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
                  Total Profit/Loss
                </p>
                <p
                  style={{
                    margin: "5px 0 0 0",
                    fontWeight: "bold",
                    fontSize: "24px",
                    color:
                      portfolioMetrics?.totalProfit >= 0
                        ? "var(--accent-secondary)"
                        : "var(--accent-danger)",
                  }}
                >
                  $
                  {portfolioMetrics?.totalProfit.toFixed(2) ||
                    myPortfolio
                      .reduce((sum, position) => sum + position.profit, 0)
                      .toFixed(2)}
                </p>
                <p
                  style={{
                    margin: "2px 0 0 0",
                    fontSize: "14px",
                    color:
                      portfolioMetrics?.profitPercentage >= 0
                        ? "var(--accent-secondary)"
                        : "var(--accent-danger)",
                  }}
                >
                  ({portfolioMetrics?.profitPercentage.toFixed(2) || "0.00"}%)
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
                  Positions
                </p>
                <p
                  style={{
                    margin: "5px 0 0 0",
                    fontWeight: "bold",
                    fontSize: "24px",
                  }}
                >
                  {myPortfolio.length}
                </p>
              </div>
            </div>

            <div
              className="portfolio-chart"
              style={{
                height: "200px",
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: "8px",
                padding: "15px",
                marginBottom: "20px",
                position: "relative",
              }}
            >
              <h4 style={{ marginBottom: "15px" }}>Portfolio Performance</h4>

              <div
                style={{
                  height: "130px",
                  display: "flex",
                  alignItems: "flex-end",
                  gap: "8px",
                }}
              >
                {/* Mock portfolio performance chart with profit/loss coloring */}
                {Array.from({ length: 30 }, (_, i) => {
                  const value = 30 + Math.sin(i / 2) * 20 + Math.random() * 10;
                  const isPositive = value > 40;

                  return (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: `${value}%`,
                        backgroundColor: isPositive
                          ? "var(--accent-secondary)"
                          : "var(--accent-danger)",
                        borderRadius: "2px 2px 0 0",
                        minWidth: "3px",
                      }}
                    ></div>
                  );
                })}
              </div>

              <div
                style={{
                  position: "absolute",
                  bottom: "15px",
                  left: "15px",
                  right: "15px",
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "12px",
                  color: "var(--text-secondary)",
                }}
              >
                <span>Apr 20</span>
                <span>May 1</span>
                <span>May 10</span>
                <span>May 20</span>
              </div>
            </div>

            <div
              className="allocation-charts"
              style={{
                display: "flex",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  flex: "1",
                  minWidth: "300px",
                  height: "220px",
                  background: "rgba(255, 255, 255, 0.05)",
                  borderRadius: "8px",
                  padding: "15px",
                  marginBottom: "20px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h4 style={{ marginBottom: "15px" }}>Sector Allocation</h4>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {portfolioMetrics?.sectorAllocation.map((sector, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>{sector.sector}</span>
                        <span>{sector.percentage.toFixed(1)}%</span>
                      </div>
                      <div
                        style={{
                          width: "100%",
                          height: "8px",
                          background: "#1e2430",
                          borderRadius: "4px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${sector.percentage}%`,
                            height: "100%",
                            background:
                              index === 0
                                ? "#3498db"
                                : index === 1
                                ? "#2ecc71"
                                : index === 2
                                ? "#e74c3c"
                                : index === 3
                                ? "#f39c12"
                                : "#9b59b6",
                            borderRadius: "4px",
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  flex: "1",
                  minWidth: "300px",
                  height: "220px",
                  background: "rgba(255, 255, 255, 0.05)",
                  borderRadius: "8px",
                  padding: "15px",
                  marginBottom: "20px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h4 style={{ marginBottom: "15px" }}>Asset Allocation</h4>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  {/* Simple pie chart visualization */}
                  <div
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "50%",
                      background:
                        "conic-gradient(#3498db 0% 40%, #2ecc71 40% 65%, #e74c3c 65% 80%, #f39c12 80% 90%, #9b59b6 90% 100%)",
                    }}
                  ></div>

                  <div
                    style={{
                      position: "absolute",
                      right: "10px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      fontSize: "12px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <div
                        style={{
                          width: "10px",
                          height: "10px",
                          background: "#3498db",
                          borderRadius: "2px",
                        }}
                      ></div>
                      <span>AAPL (40%)</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <div
                        style={{
                          width: "10px",
                          height: "10px",
                          background: "#2ecc71",
                          borderRadius: "2px",
                        }}
                      ></div>
                      <span>MSFT (25%)</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <div
                        style={{
                          width: "10px",
                          height: "10px",
                          background: "#e74c3c",
                          borderRadius: "2px",
                        }}
                      ></div>
                      <span>TSLA (15%)</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <div
                        style={{
                          width: "10px",
                          height: "10px",
                          background: "#f39c12",
                          borderRadius: "2px",
                        }}
                      ></div>
                      <span>JPM (10%)</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <div
                        style={{
                          width: "10px",
                          height: "10px",
                          background: "#9b59b6",
                          borderRadius: "2px",
                        }}
                      ></div>
                      <span>JNJ (10%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: "20px" }}>My Positions</h3>

            {myPortfolio.length > 0 ? (
              <div className="positions-table" style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr
                      style={{
                        borderBottom: "1px solid var(--border-color)",
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      <th style={{ textAlign: "left", padding: "10px 15px" }}>
                        Symbol
                      </th>
                      <th style={{ textAlign: "left", padding: "10px 15px" }}>
                        Name
                      </th>
                      <th style={{ textAlign: "right", padding: "10px 15px" }}>
                        Shares
                      </th>
                      <th style={{ textAlign: "right", padding: "10px 15px" }}>
                        Avg. Price
                      </th>
                      <th style={{ textAlign: "right", padding: "10px 15px" }}>
                        Current Price
                      </th>
                      <th style={{ textAlign: "right", padding: "10px 15px" }}>
                        Value
                      </th>
                      <th style={{ textAlign: "right", padding: "10px 15px" }}>
                        P/L
                      </th>
                      <th style={{ textAlign: "right", padding: "10px 15px" }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {myPortfolio.map((position) => (
                      <tr
                        key={position.id}
                        style={{
                          borderBottom: "1px solid var(--border-color)",
                        }}
                      >
                        <td style={{ padding: "15px", fontWeight: "bold" }}>
                          {position.symbol}
                        </td>
                        <td style={{ padding: "15px" }}>
                          <div>
                            {position.name}
                            <p
                              style={{
                                margin: "5px 0 0 0",
                                fontSize: "12px",
                                color: "var(--text-secondary)",
                                maxWidth: "250px",
                              }}
                            >
                              {position.description}
                            </p>
                          </div>
                        </td>
                        <td style={{ padding: "15px", textAlign: "right" }}>
                          {position.shares}
                        </td>
                        <td style={{ padding: "15px", textAlign: "right" }}>
                          {position.currency} {position.avgPrice.toFixed(2)}
                        </td>
                        <td style={{ padding: "15px", textAlign: "right" }}>
                          {position.currency} {position.currentPrice.toFixed(2)}
                        </td>
                        <td style={{ padding: "15px", textAlign: "right" }}>
                          {position.currency} {position.value.toFixed(2)}
                        </td>
                        <td
                          style={{
                            padding: "15px",
                            textAlign: "right",
                            color:
                              position.profit >= 0
                                ? "var(--accent-secondary)"
                                : "var(--accent-danger)",
                          }}
                        >
                          {position.currency} {position.profit.toFixed(2)} (
                          {position.profitPercentage.toFixed(2)}%)
                        </td>
                        <td style={{ padding: "15px", textAlign: "right" }}>
                          <button
                            className="btn btn-outline"
                            style={{
                              padding: "5px 10px",
                              fontSize: "12px",
                            }}
                            onClick={() => {
                              // Find the stock in the stocks list
                              let stock;
                              const existingStock = stocks.find(
                                (s) => s.symbol === position.symbol
                              );

                              if (existingStock) {
                                stock = existingStock;
                              } else {
                                // Create a mock stock if not found
                                stock = {
                                  id: Date.now(),
                                  symbol: position.symbol,
                                  name: position.name,
                                  price: position.currentPrice,
                                  change: position.profitPercentage,
                                  volume: 1000000,
                                  marketCap: position.currentPrice * 1000000,
                                  sector: position.sector,
                                  currency: position.currency,
                                };
                              }

                              setSelectedMarket(markets[0]);
                              setSelectedStock(stock);
                              setActiveTab("markets");
                              setOrderType("sell");
                              setOrderAmount(position.shares.toString());
                            }}
                          >
                            Trade
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "30px 0" }}>
                <p style={{ marginBottom: "15px" }}>
                  You don't have any positions yet
                </p>
                <button className="btn" onClick={() => setActiveTab("markets")}>
                  Start Trading
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "copy" && (
        <div className="copy-tab">
          <div className="card" style={{ marginBottom: "30px" }}>
            <h3 style={{ marginBottom: "20px" }}>Copy Trading</h3>
            <p style={{ marginBottom: "20px" }}>
              Follow expert traders and automatically copy their trades with
              your Bitcoin. Simply select a portfolio strategy and set your
              allocation.
            </p>

            <div
              className="info-boxes"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  borderRadius: "8px",
                  padding: "15px",
                }}
              >
                <h4 style={{ marginBottom: "10px" }}>How It Works</h4>
                <ol
                  style={{
                    paddingLeft: "20px",
                    color: "var(--text-secondary)",
                  }}
                >
                  <li style={{ marginBottom: "5px" }}>
                    Select a trader or portfolio strategy
                  </li>
                  <li style={{ marginBottom: "5px" }}>
                    Set the amount of Bitcoin to allocate
                  </li>
                  <li style={{ marginBottom: "5px" }}>
                    Trades will be executed automatically
                  </li>
                  <li>Manage your copied portfolios in one place</li>
                </ol>
              </div>

              <div
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  borderRadius: "8px",
                  padding: "15px",
                }}
              >
                <h4 style={{ marginBottom: "10px" }}>Benefits</h4>
                <ul
                  style={{
                    paddingLeft: "20px",
                    color: "var(--text-secondary)",
                  }}
                >
                  <li style={{ marginBottom: "5px" }}>
                    No need for trading experience
                  </li>
                  <li style={{ marginBottom: "5px" }}>
                    Diversify your Bitcoin investment
                  </li>
                  <li style={{ marginBottom: "5px" }}>
                    Learn from expert traders
                  </li>
                  <li>Stop copying anytime</li>
                </ul>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: "30px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h3>Top Performing Portfolios</h3>
              <div style={{ display: "flex", gap: "15px" }}>
                <button
                  className={activeSecondaryTab === "stocks" ? "active" : ""}
                  onClick={() => setActiveSecondaryTab("stocks")}
                  style={{
                    background:
                      activeSecondaryTab === "stocks"
                        ? "var(--accent-primary)"
                        : "rgba(255, 255, 255, 0.05)",
                    color:
                      activeSecondaryTab === "stocks"
                        ? "white"
                        : "var(--text-primary)",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  Stock Portfolios
                </button>
                <button
                  className={activeSecondaryTab === "quant" ? "active" : ""}
                  onClick={() => setActiveSecondaryTab("quant")}
                  style={{
                    background:
                      activeSecondaryTab === "quant"
                        ? "var(--accent-primary)"
                        : "rgba(255, 255, 255, 0.05)",
                    color:
                      activeSecondaryTab === "quant"
                        ? "white"
                        : "var(--text-primary)",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  Quant Companies
                </button>
              </div>
            </div>
          </div>

          {activeSecondaryTab === "stocks" && (
            <div
              className="portfolios-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "20px",
                marginBottom: "30px",
              }}
            >
              {topPortfolios.map((portfolio) => (
                <div
                  key={portfolio.id}
                  className="card"
                  style={{
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
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "15px",
                    }}
                  >
                    <div>
                      <h3 style={{ marginBottom: "5px" }}>{portfolio.name}</h3>
                      <p
                        style={{
                          margin: "0",
                          color: "var(--text-secondary)",
                          fontSize: "14px",
                        }}
                      >
                        by {portfolio.trader}
                      </p>
                    </div>
                    <div
                      style={{
                        background: "rgba(0, 255, 149, 0.1)",
                        color: "var(--accent-secondary)",
                        borderRadius: "20px",
                        padding: "5px 10px",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      +{portfolio.returns["1y"]}% YTD
                    </div>
                  </div>

                  <div
                    className="portfolio-returns"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      background: "rgba(255, 255, 255, 0.05)",
                      borderRadius: "8px",
                      padding: "10px",
                      marginBottom: "15px",
                    }}
                  >
                    <div style={{ textAlign: "center" }}>
                      <p
                        style={{
                          margin: "0",
                          fontSize: "12px",
                          color: "var(--text-secondary)",
                        }}
                      >
                        1M
                      </p>
                      <p
                        style={{
                          margin: "5px 0 0 0",
                          fontWeight: "bold",
                          color: "var(--accent-secondary)",
                        }}
                      >
                        +{portfolio.returns["1m"]}%
                      </p>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <p
                        style={{
                          margin: "0",
                          fontSize: "12px",
                          color: "var(--text-secondary)",
                        }}
                      >
                        3M
                      </p>
                      <p
                        style={{
                          margin: "5px 0 0 0",
                          fontWeight: "bold",
                          color: "var(--accent-secondary)",
                        }}
                      >
                        +{portfolio.returns["3m"]}%
                      </p>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <p
                        style={{
                          margin: "0",
                          fontSize: "12px",
                          color: "var(--text-secondary)",
                        }}
                      >
                        1Y
                      </p>
                      <p
                        style={{
                          margin: "5px 0 0 0",
                          fontWeight: "bold",
                          color: "var(--accent-secondary)",
                        }}
                      >
                        +{portfolio.returns["1y"]}%
                      </p>
                    </div>
                  </div>

                  <div style={{ marginBottom: "15px" }}>
                    <p style={{ margin: "0 0 10px 0", fontSize: "14px" }}>
                      Top Holdings:
                    </p>
                    <div
                      style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}
                    >
                      {portfolio.stocks.map((stock) => (
                        <span
                          key={stock.symbol}
                          style={{
                            background: "rgba(0, 112, 243, 0.1)",
                            color: "var(--accent-primary)",
                            borderRadius: "20px",
                            padding: "5px 10px",
                            fontSize: "12px",
                          }}
                        >
                          {stock.symbol} {stock.weight}%
                        </span>
                      ))}
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <p
                      style={{
                        margin: "0",
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {portfolio.followers} followers
                    </p>
                    <button
                      className="btn"
                      onClick={() => handleFollowPortfolio(portfolio)}
                    >
                      Copy Portfolio
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSecondaryTab === "quant" && (
            <div
              className="quant-companies-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
                gap: "20px",
                marginBottom: "30px",
              }}
            >
              {quantCompanies.map((company) => (
                <div
                  key={company.id}
                  className="card"
                  style={{
                    cursor: "pointer",
                    transition: "transform 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "translateY(-5px)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }
                  onClick={() => setSelectedQuantCompany(company)}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "15px",
                    }}
                  >
                    <div>
                      <h3 style={{ marginBottom: "5px" }}>{company.name}</h3>
                      <p
                        style={{
                          margin: "0",
                          color: "var(--text-secondary)",
                          fontSize: "14px",
                        }}
                      >
                        {company.description}
                      </p>
                    </div>
                    <div
                      style={{
                        background: "rgba(0, 255, 149, 0.1)",
                        color: "var(--accent-secondary)",
                        borderRadius: "20px",
                        padding: "5px 10px",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      +{company.returns.ytd}% YTD
                    </div>
                  </div>

                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      borderRadius: "8px",
                      padding: "12px",
                      marginBottom: "15px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p style={{ margin: "0", fontSize: "14px" }}>
                        Assets Under Management:
                      </p>
                      <p style={{ margin: "0", fontWeight: "bold" }}>
                        {company.aum}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p style={{ margin: "0", fontSize: "14px" }}>
                        Sharpe Ratio:
                      </p>
                      <p style={{ margin: "0", fontWeight: "bold" }}>
                        {company.riskMetrics.sharpeRatio}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p style={{ margin: "0", fontSize: "14px" }}>
                        3-Year Return:
                      </p>
                      <p
                        style={{
                          margin: "0",
                          fontWeight: "bold",
                          color: "var(--accent-secondary)",
                        }}
                      >
                        +{company.returns["3y"]}%
                      </p>
                    </div>
                  </div>

                  <div style={{ marginBottom: "15px" }}>
                    <p style={{ margin: "0 0 10px 0", fontSize: "14px" }}>
                      Core Strategies:
                    </p>
                    <div
                      style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}
                    >
                      {company.strategies.map((strategy, index) => (
                        <span
                          key={index}
                          style={{
                            background: "rgba(0, 112, 243, 0.1)",
                            color: "var(--accent-primary)",
                            borderRadius: "20px",
                            padding: "5px 10px",
                            background: "rgba(0, 112, 243, 0.1)",
                            color: "var(--accent-primary)",
                            borderRadius: "20px",
                            padding: "5px 10px",
                            fontSize: "12px",
                          }}
                        >
                          {strategy}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: "15px" }}>
                    <p style={{ margin: "0 0 8px 0", fontSize: "14px" }}>
                      Performance:
                    </p>

                    <div
                      style={{
                        display: "flex",
                        height: "50px",
                        alignItems: "flex-end",
                        gap: "3px",
                      }}
                    >
                      {company.performance.map((data, index) => (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            flex: 1,
                          }}
                        >
                          <div
                            style={{
                              height: `${data.return * 8}px`,
                              width: "100%",
                              backgroundColor:
                                data.return >= 3.5
                                  ? "var(--accent-secondary)"
                                  : "var(--accent-danger)",
                              borderTopLeftRadius: "2px",
                              borderTopRightRadius: "2px",
                            }}
                          ></div>
                          <span style={{ fontSize: "9px", marginTop: "2px" }}>
                            {data.month.substring(0, 1)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "10px",
                    }}
                  >
                    <button
                      className="btn btn-outline"
                      style={{ flex: 1 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        analyzeQuantCompany(company);
                      }}
                    >
                      Analyze Fit
                    </button>
                    <button
                      className="btn"
                      style={{ flex: 1 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPortfolio({
                          id: company.id,
                          name: company.name,
                          trader: "Quant AI",
                          stocks: company.topHoldings.map((h) => ({
                            symbol: h.symbol,
                            weight: h.weight,
                          })),
                        });
                        setShowConfirmation(true);
                      }}
                    >
                      Allocate BTC
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "etf" && (
        <div className="etf-tab">
          <div className="card" style={{ marginBottom: "30px" }}>
            <h3 style={{ marginBottom: "20px" }}>Bitcoin-Backed ETFs</h3>
            <p style={{ marginBottom: "20px" }}>
              Invest in exchange-traded funds with your Bitcoin. These ETFs
              provide diversified exposure to various sectors and strategies.
            </p>
          </div>

          <div
            className="etfs-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            {allETFs.map((etf) => (
              <div
                key={etf.id}
                className="card"
                style={{
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
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "15px",
                  }}
                >
                  <div>
                    <h3 style={{ marginBottom: "5px" }}>{etf.symbol}</h3>
                    <p
                      style={{
                        margin: "0",
                        color: "var(--text-primary)",
                        fontWeight: "500",
                      }}
                    >
                      {etf.name}
                    </p>
                    <p
                      style={{
                        margin: "5px 0 0 0",
                        color: "var(--text-secondary)",
                        fontSize: "14px",
                      }}
                    >
                      {etf.description}
                    </p>
                  </div>
                  <div
                    style={{
                      background: "rgba(0, 255, 149, 0.1)",
                      color: "var(--accent-secondary)",
                      borderRadius: "20px",
                      padding: "5px 10px",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    +{etf.ytdReturn}% YTD
                  </div>
                </div>

                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "8px",
                    padding: "15px",
                    marginBottom: "15px",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "10px",
                  }}
                >
                  <div>
                    <p
                      style={{
                        margin: "0",
                        fontSize: "12px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      AUM
                    </p>
                    <p style={{ margin: "3px 0 0 0", fontWeight: "bold" }}>
                      ${etf.aum}
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        margin: "0",
                        fontSize: "12px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      Expense Ratio
                    </p>
                    <p style={{ margin: "3px 0 0 0", fontWeight: "bold" }}>
                      {etf.expense}%
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        margin: "0",
                        fontSize: "12px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      Holdings
                    </p>
                    <p style={{ margin: "3px 0 0 0", fontWeight: "bold" }}>
                      {etf.holdings}
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        margin: "0",
                        fontSize: "12px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      BTC Price
                    </p>
                    <p style={{ margin: "3px 0 0 0", fontWeight: "bold" }}>
                      0.00324 BTC
                    </p>
                  </div>
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <p style={{ margin: "0 0 8px 0", fontSize: "14px" }}>
                    Top Holdings:
                  </p>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}
                  >
                    {etf.topHoldings.map((stock, index) => (
                      <span
                        key={index}
                        style={{
                          background: "rgba(0, 112, 243, 0.1)",
                          color: "var(--accent-primary)",
                          borderRadius: "20px",
                          padding: "5px 10px",
                          fontSize: "12px",
                        }}
                      >
                        {stock}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  className="btn"
                  onClick={() => {
                    setSelectedPortfolio({
                      id: `etf-${etf.id}`,
                      name: etf.name,
                      trader: "ETF Provider",
                      symbol: etf.symbol,
                      stocks: etf.topHoldings.map((symbol, index) => ({
                        symbol,
                        weight: 20 - index * 2,
                      })),
                    });
                    setShowConfirmation(true);
                    setBitcoinAmount("0.00324");
                  }}
                  style={{ width: "100%" }}
                >
                  Buy with Bitcoin
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "crypto" && (
        <div className="crypto-tab">
          <div className="card" style={{ marginBottom: "30px" }}>
            <h3 style={{ marginBottom: "20px" }}>Crypto Market</h3>
            <p style={{ marginBottom: "20px" }}>
              Trade cryptocurrencies directly with your Bitcoin. Get exposure to
              various digital assets without switching to fiat.
            </p>
          </div>

          <div className="positions-table" style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr
                  style={{
                    borderBottom: "1px solid var(--border-color)",
                    fontSize: "14px",
                    color: "var(--text-secondary)",
                  }}
                >
                  <th style={{ textAlign: "left", padding: "15px" }}>Asset</th>
                  <th style={{ textAlign: "right", padding: "15px" }}>Price</th>
                  <th style={{ textAlign: "right", padding: "15px" }}>
                    24h Change
                  </th>
                  <th style={{ textAlign: "right", padding: "15px" }}>
                    Market Cap
                  </th>
                  <th style={{ textAlign: "right", padding: "15px" }}>
                    Volume (24h)
                  </th>
                  <th style={{ textAlign: "center", padding: "15px" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {allCryptos.map((crypto) => (
                  <tr
                    key={crypto.id}
                    style={{
                      borderBottom: "1px solid var(--border-color)",
                      cursor: "pointer",
                      transition: "background-color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        "rgba(255, 255, 255, 0.05)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    <td style={{ padding: "15px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <div
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            background: `linear-gradient(135deg, ${
                              crypto.symbol === "BTC"
                                ? "#f7931a"
                                : crypto.symbol === "ETH"
                                ? "#627eea"
                                : crypto.symbol === "SOL"
                                ? "#14f195"
                                : crypto.symbol === "AVAX"
                                ? "#e84142"
                                : "#2a5ada"
                            }, ${
                              crypto.symbol === "BTC"
                                ? "#f2a900"
                                : crypto.symbol === "ETH"
                                ? "#3c3c3d"
                                : crypto.symbol === "SOL"
                                ? "#00bcd4"
                                : crypto.symbol === "AVAX"
                                ? "#92060c"
                                : "#5580f6"
                            })`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "12px",
                          }}
                        >
                          {crypto.symbol.substring(0, 1)}
                        </div>
                        <div>
                          <p style={{ margin: "0", fontWeight: "bold" }}>
                            {crypto.name}
                          </p>
                          <p
                            style={{
                              margin: "3px 0 0 0",
                              fontSize: "12px",
                              color: "var(--text-secondary)",
                            }}
                          >
                            {crypto.symbol}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "15px", textAlign: "right" }}>
                      $
                      {crypto.price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td
                      style={{
                        padding: "15px",
                        textAlign: "right",
                        color:
                          crypto.change24h >= 0
                            ? "var(--accent-secondary)"
                            : "var(--accent-danger)",
                      }}
                    >
                      {crypto.change24h >= 0 ? "+" : ""}
                      {crypto.change24h}%
                    </td>
                    <td style={{ padding: "15px", textAlign: "right" }}>
                      ${crypto.marketCap}
                    </td>
                    <td style={{ padding: "15px", textAlign: "right" }}>
                      ${crypto.volume}
                    </td>
                    <td style={{ padding: "15px", textAlign: "center" }}>
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          justifyContent: "center",
                        }}
                      >
                        <button
                          className="btn btn-sm"
                          style={{
                            background: "var(--accent-secondary)",
                            fontSize: "12px",
                            padding: "5px 10px",
                            minWidth: "60px",
                          }}
                          onClick={() => {
                            setSelectedPortfolio({
                              id: `crypto-${crypto.id}`,
                              name: crypto.name,
                              symbol: crypto.symbol,
                              price: crypto.price,
                              isCrypto: true,
                            });
                            setOrderType("buy");
                            setShowConfirmation(true);
                          }}
                        >
                          Buy
                        </button>
                        <button
                          className="btn btn-sm"
                          style={{
                            background: "var(--accent-danger)",
                            fontSize: "12px",
                            padding: "5px 10px",
                            minWidth: "60px",
                          }}
                          onClick={() => {
                            setSelectedPortfolio({
                              id: `crypto-${crypto.id}`,
                              name: crypto.name,
                              symbol: crypto.symbol,
                              price: crypto.price,
                              isCrypto: true,
                            });
                            setOrderType("sell");
                            setShowConfirmation(true);
                          }}
                        >
                          Sell
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "global" && (
        <div className="global-tab">
          <div className="card" style={{ marginBottom: "30px" }}>
            <h3 style={{ marginBottom: "20px" }}>Global Markets</h3>
            <p style={{ marginBottom: "20px" }}>
              Trade stocks in global markets directly with Bitcoin. Access
              international opportunities without currency conversion.
            </p>
          </div>

          <div
            className="global-markets-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            {globalMarkets.map((market) => (
              <div
                key={market.id}
                className="card"
                style={{
                  cursor: "pointer",
                  transition: "transform 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-5px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
                onClick={() => {
                  // Find and set an existing market that matches or use first market
                  const matchingMarket =
                    markets.find((m) =>
                      m.name.includes(market.name.split(" ")[0])
                    ) || markets[0];
                  setSelectedMarket(matchingMarket);
                  setActiveTab("markets");
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "15px",
                  }}
                >
                  <div>
                    <h3 style={{ marginBottom: "5px" }}>
                      <span style={{ marginRight: "8px", fontSize: "24px" }}>
                        {market.icon}
                      </span>
                      {market.name}
                    </h3>
                    <p
                      style={{
                        margin: "5px 0 0 0",
                        color: "var(--text-secondary)",
                        fontSize: "14px",
                      }}
                    >
                      {market.description}
                    </p>
                  </div>
                  <div
                    style={{
                      background:
                        market.returns.ytd >= 10
                          ? "rgba(0, 255, 149, 0.1)"
                          : "rgba(0, 112, 243, 0.1)",
                      color:
                        market.returns.ytd >= 10
                          ? "var(--accent-secondary)"
                          : "var(--accent-primary)",
                      borderRadius: "20px",
                      padding: "5px 10px",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    +{market.returns.ytd}% YTD
                  </div>
                </div>

                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "8px",
                    padding: "15px",
                    marginBottom: "15px",
                  }}
                >
                  <p style={{ margin: "0 0 10px 0", fontWeight: "500" }}>
                    Performance
                  </p>
                  <div style={{ display: "flex", gap: "20px" }}>
                    <div>
                      <p
                        style={{
                          margin: "0",
                          fontSize: "12px",
                          color: "var(--text-secondary)",
                        }}
                      >
                        1Y Return
                      </p>
                      <p
                        style={{
                          margin: "3px 0 0 0",
                          fontWeight: "bold",
                          color: "var(--accent-secondary)",
                        }}
                      >
                        +{market.returns["1y"]}%
                      </p>
                    </div>
                    <div>
                      <p
                        style={{
                          margin: "0",
                          fontSize: "12px",
                          color: "var(--text-secondary)",
                        }}
                      >
                        5Y Return
                      </p>
                      <p
                        style={{
                          margin: "3px 0 0 0",
                          fontWeight: "bold",
                          color: "var(--accent-secondary)",
                        }}
                      >
                        +{market.returns["5y"]}%
                      </p>
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <p style={{ margin: "0 0 8px 0", fontWeight: "500" }}>
                    Major Indices
                  </p>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}
                  >
                    {market.majorIndices.map((index, i) => (
                      <span
                        key={i}
                        style={{
                          background: "rgba(0, 112, 243, 0.1)",
                          color: "var(--accent-primary)",
                          borderRadius: "20px",
                          padding: "5px 10px",
                          fontSize: "12px",
                        }}
                      >
                        {index}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <p
                    style={{
                      margin: "0",
                      fontSize: "14px",
                      color: "var(--text-secondary)",
                    }}
                  >
                    Trading Hours: {market.tradingHours}
                  </p>
                </div>

                <button
                  className="btn"
                  style={{ width: "100%" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    // Find and set an existing market that matches or use first market
                    const matchingMarket =
                      markets.find((m) =>
                        m.name.includes(market.name.split(" ")[0])
                      ) || markets[0];
                    setSelectedMarket(matchingMarket);
                    setActiveTab("markets");
                  }}
                >
                  Explore Markets
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "analyze" &&
        !showPersonalityTest &&
        !showStockRecommendation && (
          <div className="analyze-tab">
            <div
              className="card"
              style={{
                marginBottom: "30px",
                textAlign: "center",
                padding: "40px 20px",
              }}
            >
              <h3 style={{ marginBottom: "15px" }}>
                Investor Profile Analysis
              </h3>
              <p style={{ marginBottom: "20px" }}>
                Let us analyze your investment preferences to recommend the best
                stocks for your profile.
              </p>
              <button
                className="btn"
                onClick={() => setShowPersonalityTest(true)}
                style={{ padding: "10px 20px", fontSize: "16px" }}
              >
                Start Questionnaire
              </button>
            </div>
          </div>
        )}

      {/* Personality Test */}
      {showPersonalityTest && (
        <div
          className="modal-overlay"
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
          <div className="card" style={{ maxWidth: "600px", width: "100%" }}>
            <h3 style={{ marginBottom: "20px" }}>
              Investor Profile Questionnaire
            </h3>

            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "15px",
                }}
              >
                <p style={{ margin: "0", fontWeight: "bold" }}>
                  Question {currentQuestionIndex + 1} of{" "}
                  {personalityQuestions.length}
                </p>
                <div
                  style={{
                    width: "120px",
                    height: "6px",
                    background: "#1e2430",
                    borderRadius: "3px",
                  }}
                >
                  <div
                    style={{
                      width: `${
                        ((currentQuestionIndex + 1) /
                          personalityQuestions.length) *
                        100
                      }%`,
                      height: "100%",
                      background: "var(--accent-primary)",
                      borderRadius: "3px",
                    }}
                  ></div>
                </div>
              </div>

              <p
                style={{
                  fontSize: "18px",
                  marginBottom: "20px",
                  fontWeight: "500",
                }}
              >
                {personalityQuestions[currentQuestionIndex]?.question}
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {personalityQuestions[currentQuestionIndex]?.options.map(
                  (option, index) => (
                    <button
                      key={index}
                      style={{
                        padding: "12px 15px",
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid var(--border-color)",
                        borderRadius: "8px",
                        color: "var(--text-primary)",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(255, 255, 255, 0.1)";
                        e.currentTarget.style.borderColor =
                          "var(--accent-primary)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          "rgba(255, 255, 255, 0.05)";
                        e.currentTarget.style.borderColor =
                          "var(--border-color)";
                      }}
                      onClick={() => submitAnswer(option)}
                    >
                      {option}
                    </button>
                  )
                )}
              </div>
            </div>

            <button
              onClick={() => setShowPersonalityTest(false)}
              className="btn btn-outline"
              style={{ width: "100%" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Stock Recommendations Based on Analysis */}
      {showStockRecommendation && (
        <div
          className="modal-overlay"
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
              maxWidth: "700px",
              width: "100%",
              maxHeight: "90vh",
              overflow: "auto",
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
              <h3>Your Investment Profile</h3>
              <button
                onClick={() => setShowStockRecommendation(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                  fontSize: "20px",
                }}
              >
                ✕
              </button>
            </div>

            {personalityResult && (
              <>
                <div
                  style={{
                    background: "rgba(0, 112, 243, 0.1)",
                    padding: "15px",
                    borderRadius: "8px",
                    marginBottom: "20px",
                  }}
                >
                  <h4
                    style={{
                      marginBottom: "10px",
                      color: "var(--accent-primary)",
                    }}
                  >
                    {personalityResult.type} Investor
                  </h4>
                  <p style={{ marginBottom: "15px" }}>
                    {personalityResult.description}
                  </p>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      gap: "10px",
                      marginTop: "15px",
                    }}
                  >
                    <div style={{ textAlign: "center" }}>
                      <p
                        style={{
                          margin: "0",
                          fontSize: "12px",
                          color: "var(--text-secondary)",
                        }}
                      >
                        Risk Tolerance
                      </p>
                      <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                        {personalityResult.riskTolerance}
                      </p>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <p
                        style={{
                          margin: "0",
                          fontSize: "12px",
                          color: "var(--text-secondary)",
                        }}
                      >
                        Time Horizon
                      </p>
                      <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                        {personalityResult.timeHorizon}
                      </p>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <p
                        style={{
                          margin: "0",
                          fontSize: "12px",
                          color: "var(--text-secondary)",
                        }}
                      >
                        Experience Level
                      </p>
                      <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                        {personalityResult.expertise}
                      </p>
                    </div>
                  </div>
                </div>

                <h4 style={{ marginBottom: "15px" }}>
                  Recommended Investments
                </h4>

                <div style={{ marginBottom: "30px" }}>
                  {stockRecommendations.map((recommendation, index) => (
                    <div
                      key={index}
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        borderRadius: "8px",
                        padding: "15px",
                        marginBottom: "15px",
                        border: "1px solid var(--border-color)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: "10px",
                        }}
                      >
                        <div>
                          <h4 style={{ marginBottom: "5px" }}>
                            {recommendation.symbol}
                          </h4>
                          <p
                            style={{
                              margin: "0",
                              color: "var(--text-secondary)",
                            }}
                          >
                            {recommendation.name}
                          </p>
                        </div>
                        <div
                          style={{
                            background: "rgba(0, 112, 243, 0.1)",
                            color: "var(--accent-primary)",
                            padding: "3px 8px",
                            borderRadius: "4px",
                            fontSize: "12px",
                          }}
                        >
                          {recommendation.type}
                        </div>
                      </div>

                      <p style={{ margin: "0 0 15px 0", fontSize: "14px" }}>
                        {recommendation.reasoning}
                      </p>

                      <div style={{ display: "flex", gap: "10px" }}>
                        <button
                          className="btn btn-sm"
                          style={{ flex: 1, fontSize: "13px" }}
                          onClick={() => {
                            // Find or create mock stock
                            let stock;
                            const existingStock = stocks.find(
                              (s) => s.symbol === recommendation.symbol
                            );

                            if (existingStock) {
                              stock = existingStock;
                            } else {
                              stock = {
                                id: Date.now(),
                                symbol: recommendation.symbol,
                                name: recommendation.name,
                                price: 100 + Math.random() * 400,
                                change: Math.random() * 6 - 1,
                                volume: 1000000 + Math.random() * 9000000,
                                marketCap: (
                                  1000000000 +
                                  Math.random() * 9000000000
                                ).toFixed(0),
                                sector:
                                  recommendation.type === "ETF"
                                    ? "ETF"
                                    : "Technology",
                                currency: "USD",
                              };
                            }

                            setSelectedMarket(markets[0]);
                            setSelectedStock(stock);
                            setActiveTab("markets");
                            setOrderType("buy");
                            setShowStockRecommendation(false);
                          }}
                        >
                          View Details
                        </button>
                        <button
                          className="btn btn-sm"
                          style={{
                            flex: 1,
                            background: "var(--accent-secondary)",
                            fontSize: "13px",
                          }}
                          onClick={() => {
                            setSelectedPortfolio({
                              id: `rec-${Date.now()}`,
                              name: recommendation.name,
                              symbol: recommendation.symbol,
                              price: 100 + Math.random() * 400,
                              isRecommendation: true,
                              type: recommendation.type,
                            });
                            setOrderType("buy");
                            setShowConfirmation(true);
                            setShowStockRecommendation(false);
                          }}
                        >
                          Buy with BTC
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  className="btn btn-outline"
                  onClick={() => setShowStockRecommendation(false)}
                  style={{ width: "100%" }}
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Portfolio Analysis Modal */}
      {showAnalysis && (
        <div
          className="modal-overlay"
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
              maxWidth: "700px",
              width: "100%",
              maxHeight: "90vh",
              overflow: "auto",
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
              <h3>
                {selectedQuantCompany
                  ? "Company Fit Analysis"
                  : "Portfolio Analysis"}
              </h3>
              <button
                onClick={() => setShowAnalysis(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                  fontSize: "20px",
                }}
              >
                ✕
              </button>
            </div>

            {analysisResult ? (
              selectedQuantCompany ? (
                // Quant company analysis
                <>
                  <div
                    style={{
                      background: "rgba(0, 112, 243, 0.1)",
                      padding: "20px",
                      borderRadius: "8px",
                      marginBottom: "20px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "15px",
                      }}
                    >
                      <h4
                        style={{ margin: "0", color: "var(--accent-primary)" }}
                      >
                        Suitability Assessment
                      </h4>
                      <div
                        style={{
                          background:
                            analysisResult.suitability === "High"
                              ? "rgba(0, 255, 149, 0.1)"
                              : "rgba(255, 193, 7, 0.1)",
                          color:
                            analysisResult.suitability === "High"
                              ? "var(--accent-secondary)"
                              : "#ffc107",
                          padding: "5px 10px",
                          borderRadius: "20px",
                          fontWeight: "bold",
                        }}
                      >
                        {analysisResult.suitability} Fit
                      </div>
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                      <p style={{ fontSize: "16px" }}>
                        {analysisResult.fitReason}
                      </p>
                    </div>

                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{
                          width: "100%",
                          height: "10px",
                          background: "#1e2430",
                          borderRadius: "5px",
                          marginBottom: "5px",
                        }}
                      >
                        <div
                          style={{
                            width: `${analysisResult.suitabilityScore}%`,
                            height: "100%",
                            background:
                              analysisResult.suitabilityScore > 80
                                ? "var(--accent-secondary)"
                                : analysisResult.suitabilityScore > 60
                                ? "#ffc107"
                                : "var(--accent-danger)",
                            borderRadius: "5px",
                            transition: "width 1s ease-in-out",
                          }}
                        ></div>
                      </div>
                      <p style={{ fontSize: "14px" }}>
                        Compatibility Score: {analysisResult.suitabilityScore}%
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "20px",
                      marginBottom: "20px",
                    }}
                  >
                    <div
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        padding: "15px",
                        borderRadius: "8px",
                      }}
                    >
                      <h4
                        style={{
                          marginBottom: "10px",
                          color: "var(--accent-secondary)",
                        }}
                      >
                        Key Strengths
                      </h4>
                      <ul style={{ paddingLeft: "20px", margin: "0" }}>
                        {analysisResult.keyStrengths &&
                          analysisResult.keyStrengths.map((strength, index) => (
                            <li key={index} style={{ marginBottom: "5px" }}>
                              {strength}
                            </li>
                          ))}
                      </ul>
                    </div>

                    <div
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        padding: "15px",
                        borderRadius: "8px",
                      }}
                    >
                      <h4 style={{ marginBottom: "10px", color: "#ffc107" }}>
                        Potential Concerns
                      </h4>
                      <ul style={{ paddingLeft: "20px", margin: "0" }}>
                        {analysisResult.potentialConcerns &&
                          analysisResult.potentialConcerns.map(
                            (concern, index) => (
                              <li key={index} style={{ marginBottom: "5px" }}>
                                {concern}
                              </li>
                            )
                          )}
                      </ul>
                    </div>
                  </div>

                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      padding: "15px",
                      borderRadius: "8px",
                      marginBottom: "20px",
                    }}
                  >
                    <h4 style={{ marginBottom: "10px" }}>
                      Expected Performance
                    </h4>
                    <p>{analysisResult.expectedReturns}</p>
                    <p style={{ marginTop: "10px" }}>
                      {analysisResult.bitcoinEfficiency}
                    </p>
                  </div>

                  <div style={{ display: "flex", gap: "15px" }}>
                    <button
                      className="btn btn-outline"
                      onClick={() => setShowAnalysis(false)}
                      style={{ flex: 1 }}
                    >
                      Close
                    </button>
                    <button
                      className="btn"
                      onClick={() => {
                        setShowAnalysis(false);
                        if (selectedQuantCompany) {
                          setSelectedPortfolio({
                            id: selectedQuantCompany.id,
                            name: selectedQuantCompany.name,
                            trader: "Quant AI",
                            stocks: selectedQuantCompany.topHoldings.map(
                              (h) => ({
                                symbol: h.symbol,
                                weight: h.weight,
                              })
                            ),
                          });
                          setShowConfirmation(true);
                        }
                      }}
                      style={{ flex: 1 }}
                    >
                      Allocate BTC
                    </button>
                  </div>
                </>
              ) : (
                // Portfolio analysis
                <>
                  <div
                    style={{
                      background: "rgba(0, 112, 243, 0.1)",
                      padding: "15px",
                      borderRadius: "8px",
                      marginBottom: "20px",
                    }}
                  >
                    <h4
                      style={{
                        marginBottom: "10px",
                        color: "var(--accent-primary)",
                      }}
                    >
                      Overview
                    </h4>
                    <p>{analysisResult.overview}</p>
                    <p style={{ marginTop: "10px", fontSize: "14px" }}>
                      {analysisResult.riskAssessment}
                    </p>
                    <p style={{ marginTop: "5px", fontSize: "14px" }}>
                      {analysisResult.btcCorrelation}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "20px",
                      marginBottom: "20px",
                    }}
                  >
                    <div
                      style={{
                        background: "rgba(0, 255, 149, 0.05)",
                        padding: "15px",
                        borderRadius: "8px",
                      }}
                    >
                      <h4
                        style={{
                          marginBottom: "10px",
                          color: "var(--accent-secondary)",
                        }}
                      >
                        Strengths
                      </h4>
                      <ul style={{ paddingLeft: "20px", margin: "0" }}>
                        {analysisResult.strengths &&
                          analysisResult.strengths.map((strength, index) => (
                            <li key={index} style={{ marginBottom: "5px" }}>
                              {strength}
                            </li>
                          ))}
                      </ul>
                    </div>

                    <div
                      style={{
                        background: "rgba(255, 71, 87, 0.05)",
                        padding: "15px",
                        borderRadius: "8px",
                      }}
                    >
                      <h4
                        style={{
                          marginBottom: "10px",
                          color: "var(--accent-danger)",
                        }}
                      >
                        Weaknesses
                      </h4>
                      <ul style={{ paddingLeft: "20px", margin: "0" }}>
                        {analysisResult.weaknesses &&
                          analysisResult.weaknesses.map((weakness, index) => (
                            <li key={index} style={{ marginBottom: "5px" }}>
                              {weakness}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>

                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      padding: "15px",
                      borderRadius: "8px",
                      marginBottom: "20px",
                    }}
                  >
                    <h4 style={{ marginBottom: "10px" }}>Recommendations</h4>
                    <ul style={{ paddingLeft: "20px", margin: "0" }}>
                      {analysisResult.recommendations &&
                        analysisResult.recommendations.map(
                          (recommendation, index) => (
                            <li key={index} style={{ marginBottom: "8px" }}>
                              {recommendation}
                            </li>
                          )
                        )}
                    </ul>
                  </div>

                  <div style={{ marginBottom: "20px" }}>
                    <h4 style={{ marginBottom: "15px" }}>Suggested Actions</h4>

                    <div style={{ marginBottom: "15px" }}>
                      <h5
                        style={{
                          margin: "0 0 10px 0",
                          color: "var(--accent-secondary)",
                        }}
                      >
                        Consider Adding
                      </h5>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "10px",
                        }}
                      >
                        {analysisResult.potentialAdditions &&
                          analysisResult.potentialAdditions.map(
                            (stock, index) => (
                              <div
                                key={index}
                                style={{
                                  background: "rgba(0, 255, 149, 0.1)",
                                  border: "1px solid var(--accent-secondary)",
                                  borderRadius: "8px",
                                  padding: "10px",
                                  flex: "1 0 calc(50% - 10px)",
                                  minWidth: "200px",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginBottom: "5px",
                                  }}
                                >
                                  <strong>{stock.symbol}</strong>
                                  <button
                                    style={{
                                      background: "var(--accent-secondary)",
                                      color: "black",
                                      border: "none",
                                      borderRadius: "4px",
                                      padding: "2px 8px",
                                      fontSize: "12px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => {
                                      // Create a mock stock
                                      const mockStock = {
                                        id: Date.now(),
                                        symbol: stock.symbol,
                                        name: stock.name,
                                        price: 100 + Math.random() * 400,
                                        change: 1 + Math.random() * 5,
                                        volume:
                                          1000000 + Math.random() * 9000000,
                                        marketCap: (
                                          1000000000 +
                                          Math.random() * 9000000000
                                        ).toFixed(0),
                                        sector: "Recommended",
                                        currency: "USD",
                                      };
                                      setSelectedMarket(markets[0]);
                                      setSelectedStock(mockStock);
                                      setActiveTab("markets");
                                      setOrderType("buy");
                                      setShowAnalysis(false);
                                    }}
                                  >
                                    Buy
                                  </button>
                                </div>
                                <p style={{ margin: "0", fontSize: "14px" }}>
                                  {stock.name}
                                </p>
                                <p
                                  style={{
                                    margin: "5px 0 0 0",
                                    fontSize: "12px",
                                    color: "var(--text-secondary)",
                                  }}
                                >
                                  {stock.reason}
                                </p>
                              </div>
                            )
                          )}
                      </div>
                    </div>

                    {analysisResult.potentialReductions &&
                      analysisResult.potentialReductions.length > 0 && (
                        <div>
                          <h5
                            style={{
                              margin: "0 0 10px 0",
                              color: "var(--accent-danger)",
                            }}
                          >
                            Consider Reducing
                          </h5>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "10px",
                            }}
                          >
                            {analysisResult.potentialReductions.map(
                              (stock, index) => (
                                <div
                                  key={index}
                                  style={{
                                    background: "rgba(255, 71, 87, 0.1)",
                                    border: "1px solid var(--accent-danger)",
                                    borderRadius: "8px",
                                    padding: "10px",
                                    flex: "1 0 calc(50% - 10px)",
                                    minWidth: "200px",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      marginBottom: "5px",
                                    }}
                                  >
                                    <strong>{stock.symbol}</strong>
                                    <button
                                      style={{
                                        background: "var(--accent-danger)",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "4px",
                                        padding: "2px 8px",
                                        fontSize: "12px",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => {
                                        // Find position in portfolio
                                        const position = myPortfolio.find(
                                          (p) => p.symbol === stock.symbol
                                        );
                                        if (position) {
                                          // Create a stock from the position
                                          const mockStock = {
                                            id: Date.now(),
                                            symbol: position.symbol,
                                            name: position.name,
                                            price: position.currentPrice,
                                            change: position.profitPercentage,
                                            volume: 1000000,
                                            marketCap:
                                              position.currentPrice * 1000000,
                                            sector: position.sector,
                                            currency: position.currency,
                                          };
                                          setSelectedMarket(markets[0]);
                                          setSelectedStock(mockStock);
                                          setActiveTab("markets");
                                          setOrderType("sell");
                                          setOrderAmount(
                                            position.shares.toString()
                                          );
                                          setShowAnalysis(false);
                                        }
                                      }}
                                    >
                                      Sell
                                    </button>
                                  </div>
                                  <p style={{ margin: "0", fontSize: "14px" }}>
                                    {stock.name}
                                  </p>
                                  <p
                                    style={{
                                      margin: "5px 0 0 0",
                                      fontSize: "12px",
                                      color: "var(--text-secondary)",
                                    }}
                                  >
                                    {stock.reason}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                  </div>

                  <button
                    className="btn btn-outline"
                    onClick={() => setShowAnalysis(false)}
                    style={{ width: "100%" }}
                  >
                    Close
                  </button>
                </>
              )
            ) : (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <p>Analyzing data...</p>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    margin: "20px auto",
                    border: "3px solid rgba(0, 112, 243, 0.3)",
                    borderTop: "3px solid var(--accent-primary)",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                  }}
                ></div>
                <style>
                  {`
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                `}
                </style>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bitcoin Transaction Animation */}
      {showBitcoinAnimation && (
        <div
          className="bitcoin-transaction-animation"
          ref={bitcoinAnimationRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
          }}
        >
          <div
            style={{
              fontSize: "80px",
              marginBottom: "20px",
              animation: "pulse 1s infinite alternate",
            }}
          >
            ₿
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#f7931a",
              fontWeight: "bold",
              marginBottom: "15px",
            }}
          >
            Processing Bitcoin Transaction
          </div>
          <div
            style={{
              width: "300px",
              height: "6px",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "3px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(90deg, transparent, #f7931a, transparent)",
                animation: "loading 1.5s infinite",
              }}
            ></div>
          </div>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              gap: "15px",
            }}
          >
            <div style={{ animation: "float 3s infinite ease-in-out" }}>🔒</div>
            <div style={{ animation: "float 3s infinite ease-in-out 0.5s" }}>
              📊
            </div>
            <div style={{ animation: "float 3s infinite ease-in-out 1s" }}>
              ⚡
            </div>
            <div style={{ animation: "float 3s infinite ease-in-out 1.5s" }}>
              🌐
            </div>
          </div>

          <style>
            {`
              @keyframes pulse {
                0% { transform: scale(1); opacity: 0.8; }
                100% { transform: scale(1.1); opacity: 1; }
              }
              
              @keyframes loading {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
              }
              
              @keyframes float {
                0% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
                100% { transform: translateY(0px); }
              }
            `}
          </style>
        </div>
      )}

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
            <h3 style={{ marginBottom: "20px" }}>
              {selectedPortfolio?.isCrypto
                ? `${orderType === "buy" ? "Buy" : "Sell"} ${
                    selectedPortfolio.symbol
                  } Confirmation`
                : selectedPortfolio?.isRecommendation
                ? `Buy ${selectedPortfolio.symbol} Confirmation`
                : selectedPortfolio?.symbol
                ? `Buy ${selectedPortfolio.symbol} Confirmation`
                : selectedPortfolio
                ? `Copy Portfolio Confirmation`
                : "Transaction Confirmation"}
            </h3>

            {selectedPortfolio?.isCrypto ? (
              // Crypto transaction confirmation
              <div style={{ marginBottom: "20px" }}>
                <p style={{ marginBottom: "15px" }}>
                  You are about to {orderType === "buy" ? "buy" : "sell"}{" "}
                  <strong>{selectedPortfolio.symbol}</strong> with Bitcoin.
                </p>
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
                    <p style={{ margin: "0" }}>Asset:</p>
                    <p style={{ margin: "0", fontWeight: "bold" }}>
                      {selectedPortfolio.name} ({selectedPortfolio.symbol})
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                  >
                    <p style={{ margin: "0" }}>
                      Price per {selectedPortfolio.symbol}:
                    </p>
                    <p style={{ margin: "0" }}>
                      $
                      {selectedPortfolio.price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                  >
                    <p style={{ margin: "0" }}>Quantity:</p>
                    <input
                      type="number"
                      value={orderAmount || ""}
                      onChange={(e) => setOrderAmount(e.target.value)}
                      placeholder="Enter amount"
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid var(--border-color)",
                        borderRadius: "4px",
                        padding: "5px 10px",
                        color: "var(--text-primary)",
                        width: "100px",
                        textAlign: "right",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                  >
                    <p style={{ margin: "0" }}>Total Value:</p>
                    <p style={{ margin: "0" }}>
                      $
                      {orderAmount
                        ? (
                            selectedPortfolio.price * parseFloat(orderAmount)
                          ).toFixed(2)
                        : "0.00"}
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
                      Bitcoin {orderType === "buy" ? "Required" : "Received"}:
                    </p>
                    <p style={{ margin: "0", fontWeight: "bold" }}>
                      {orderAmount
                        ? (
                            (parseFloat(orderAmount) *
                              selectedPortfolio.price) /
                            65000
                          ).toFixed(8)
                        : "0.00000000"}{" "}
                      BTC
                    </p>
                  </div>
                </div>
              </div>
            ) : selectedPortfolio?.isRecommendation ||
              selectedPortfolio?.symbol ? (
              <div style={{ marginBottom: "20px" }}>
                <p style={{ marginBottom: "15px" }}>
                  You are about to buy{" "}
                  <strong>{selectedPortfolio.symbol}</strong> using Bitcoin.
                </p>
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
                    <p style={{ margin: "0" }}>Asset:</p>
                    <p style={{ margin: "0", fontWeight: "bold" }}>
                      {selectedPortfolio.name} ({selectedPortfolio.symbol})
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                  >
                    <p style={{ margin: "0" }}>Type:</p>
                    <p style={{ margin: "0" }}>
                      {selectedPortfolio.type || "ETF"}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                  >
                    <p style={{ margin: "0" }}>Quantity:</p>
                    <input
                      type="number"
                      value={orderAmount || ""}
                      onChange={(e) => setOrderAmount(e.target.value)}
                      placeholder="Enter shares"
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid var(--border-color)",
                        borderRadius: "4px",
                        padding: "5px 10px",
                        color: "var(--text-primary)",
                        width: "100px",
                        textAlign: "right",
                      }}
                    />
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
                      Bitcoin Required:
                    </p>
                    <p style={{ margin: "0", fontWeight: "bold" }}>
                      {bitcoinAmount || "0.00324"} BTC
                    </p>
                  </div>
                </div>
              </div>
            ) : selectedPortfolio ? (
              <div style={{ marginBottom: "20px" }}>
                <p style={{ marginBottom: "15px" }}>
                  You are about to copy the{" "}
                  <strong>{selectedPortfolio.name}</strong> portfolio managed by{" "}
                  {selectedPortfolio.trader}.
                </p>
                <p style={{ marginBottom: "15px" }}>
                  Your Bitcoin will be allocated according to the portfolio's
                  weights and all future trades will be automatically copied.
                </p>
                <div
                  className="allocation-details"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "8px",
                    padding: "15px",
                    marginBottom: "20px",
                  }}
                >
                  <h4 style={{ marginBottom: "10px" }}>Portfolio Allocation</h4>
                  <div style={{ marginBottom: "15px" }}>
                    {selectedPortfolio.stocks &&
                      selectedPortfolio.stocks.map((stock) => (
                        <div
                          key={stock.symbol}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "5px",
                          }}
                        >
                          <span>{stock.symbol}</span>
                          <span>{stock.weight}%</span>
                        </div>
                      ))}
                  </div>
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "5px" }}>
                    Bitcoin Allocation
                  </label>
                  <input
                    type="number"
                    value={bitcoinAmount}
                    onChange={(e) => setBitcoinAmount(e.target.value)}
                    placeholder="Enter BTC amount"
                    step="0.00000001"
                    min="0.001"
                    max={balance}
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
              </div>
            ) : (
              <div style={{ marginBottom: "20px" }}>
                <p style={{ marginBottom: "15px" }}>
                  Please confirm your transaction.
                </p>
              </div>
            )}

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => setShowConfirmation(false)}
                className="btn btn-outline"
                style={{ flex: 1 }}
              >
                Cancel
              </button>
              <button
                onClick={
                  selectedPortfolio?.isCrypto ||
                  selectedPortfolio?.isRecommendation ||
                  selectedPortfolio?.symbol
                    ? handlePlaceOrder
                    : handleCopyPortfolio
                }
                className="btn"
                style={{
                  flex: 1,
                  background:
                    selectedPortfolio?.isCrypto && orderType === "sell"
                      ? "var(--accent-danger)"
                      : "var(--accent-secondary)",
                }}
                disabled={processing}
              >
                {processing
                  ? "Processing..."
                  : selectedPortfolio?.isCrypto
                  ? `Confirm ${orderType === "buy" ? "Buy" : "Sell"}`
                  : selectedPortfolio?.isRecommendation ||
                    selectedPortfolio?.symbol
                  ? "Confirm Purchase"
                  : "Confirm Copy"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Selected Quant Company Modal */}
      {selectedQuantCompany && !showAnalysis && (
        <div
          className="modal-overlay"
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
              maxWidth: "800px",
              width: "100%",
              maxHeight: "90vh",
              overflow: "auto",
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
              <h3>{selectedQuantCompany.name}</h3>
              <button
                onClick={() => setSelectedQuantCompany(null)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                  fontSize: "20px",
                }}
              >
                ✕
              </button>
            </div>

            <p style={{ marginBottom: "20px" }}>
              {selectedQuantCompany.description}
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "15px",
                marginBottom: "25px",
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: "8px",
                padding: "15px",
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
                  Assets Under Management
                </p>
                <p
                  style={{
                    margin: "5px 0 0 0",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  {selectedQuantCompany.aum}
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
                  YTD Return
                </p>
                <p
                  style={{
                    margin: "5px 0 0 0",
                    fontWeight: "bold",
                    fontSize: "18px",
                    color: "var(--accent-secondary)",
                  }}
                >
                  +{selectedQuantCompany.returns.ytd}%
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
                  Sharpe Ratio
                </p>
                <p
                  style={{
                    margin: "5px 0 0 0",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  {selectedQuantCompany.riskMetrics.sharpeRatio}
                </p>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                marginBottom: "25px",
              }}
            >
              <div>
                <h4 style={{ marginBottom: "15px" }}>Historical Performance</h4>
                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "8px",
                    padding: "15px",
                    height: "220px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "10px",
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
                        1-Year
                      </p>
                      <p
                        style={{
                          margin: "5px 0 0 0",
                          fontWeight: "bold",
                          color: "var(--accent-secondary)",
                        }}
                      >
                        +{selectedQuantCompany.returns["1y"]}%
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
                        3-Year
                      </p>
                      <p
                        style={{
                          margin: "5px 0 0 0",
                          fontWeight: "bold",
                          color: "var(--accent-secondary)",
                        }}
                      >
                        +{selectedQuantCompany.returns["3y"]}%
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
                        5-Year
                      </p>
                      <p
                        style={{
                          margin: "5px 0 0 0",
                          fontWeight: "bold",
                          color: "var(--accent-secondary)",
                        }}
                      >
                        +{selectedQuantCompany.returns["5y"]}%
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      height: "150px",
                      position: "relative",
                      marginTop: "15px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderBottom: "1px solid var(--border-color)",
                        borderLeft: "1px solid var(--border-color)",
                      }}
                    >
                      <svg
                        width="100%"
                        height="100%"
                        style={{ position: "absolute" }}
                      >
                        <path
                          d={`M 0 ${150 - 150 * 0.7} L 25 ${
                            150 - 150 * 0.65
                          } L 50 ${150 - 150 * 0.58} L 75 ${
                            150 - 150 * 0.52
                          } L 100 ${150 - 150 * 0.48} L 125 ${
                            150 - 150 * 0.42
                          } L 150 ${150 - 150 * 0.46} L 175 ${
                            150 - 150 * 0.51
                          } L 200 ${150 - 150 * 0.57} L 225 ${
                            150 - 150 * 0.63
                          } L 250 ${150 - 150 * 0.68} L 275 ${
                            150 - 150 * 0.73
                          } L 300 ${150 - 150 * 0.82}`}
                          fill="none"
                          stroke="var(--accent-secondary)"
                          strokeWidth="2"
                        />

                        <path
                          d={`M 0 ${150 - 150 * 0.7} L 300 ${
                            150 - 150 * 0.82
                          } L 300 150 L 0 150 Z`}
                          fill="rgba(0, 255, 149, 0.1)"
                        />
                      </svg>

                      {/* Grid lines */}
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          paddingBottom: "20px",
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            height: "1px",
                            background: "rgba(255, 255, 255, 0.05)",
                          }}
                        ></div>
                        <div
                          style={{
                            width: "100%",
                            height: "1px",
                            background: "rgba(255, 255, 255, 0.05)",
                          }}
                        ></div>
                        <div
                          style={{
                            width: "100%",
                            height: "1px",
                            background: "rgba(255, 255, 255, 0.05)",
                          }}
                        ></div>
                      </div>

                      {/* X-axis labels */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: "-20px",
                          left: 0,
                          right: 0,
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "10px",
                          color: "var(--text-secondary)",
                        }}
                      >
                        <span>2021</span>
                        <span>2022</span>
                        <span>2023</span>
                        <span>2024</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 style={{ marginBottom: "15px" }}>Risk Metrics</h4>
                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "8px",
                    padding: "15px",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "15px",
                      marginBottom: "15px",
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
                        Sharpe Ratio
                      </p>
                      <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                        {selectedQuantCompany.riskMetrics.sharpeRatio}
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
                        Volatility
                      </p>
                      <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                        {selectedQuantCompany.riskMetrics.volatility}%
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
                        Max Drawdown
                      </p>
                      <p
                        style={{
                          margin: "5px 0 0 0",
                          fontWeight: "bold",
                          color: "var(--accent-danger)",
                        }}
                      >
                        {selectedQuantCompany.riskMetrics.maxDrawdown}%
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
                        Beta to S&P 500
                      </p>
                      <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                        {selectedQuantCompany.riskMetrics.betaToSP500}
                      </p>
                    </div>
                  </div>

                  {selectedQuantCompany.riskMetrics.btcCorrelation && (
                    <div
                      style={{
                        background: "rgba(247, 147, 26, 0.1)",
                        padding: "10px 15px",
                        borderRadius: "8px",
                        border: "1px solid rgba(247, 147, 26, 0.3)",
                      }}
                    >
                      <p style={{ margin: "0", fontSize: "14px" }}>
                        <strong>BTC Correlation:</strong>{" "}
                        {selectedQuantCompany.riskMetrics.btcCorrelation}
                      </p>
                      <p
                        style={{
                          margin: "5px 0 0 0",
                          fontSize: "12px",
                          color: "var(--text-secondary)",
                        }}
                      >
                        This strategy shows moderate correlation with Bitcoin
                        price movements
                      </p>
                    </div>
                  )}
                </div>

                <h4 style={{ margin: "20px 0 15px 0" }}>Top Holdings</h4>
                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "8px",
                    padding: "15px",
                  }}
                >
                  {selectedQuantCompany.topHoldings.map((holding, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "8px 0",
                        borderBottom:
                          index < selectedQuantCompany.topHoldings.length - 1
                            ? "1px solid var(--border-color)"
                            : "none",
                      }}
                    >
                      <span>{holding.symbol}</span>
                      <span>{holding.weight}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h4 style={{ marginBottom: "15px" }}>Strategies</h4>
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  borderRadius: "8px",
                  padding: "15px",
                  marginBottom: "25px",
                }}
              >
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {selectedQuantCompany.strategies.map((strategy, index) => (
                    <div
                      key={index}
                      style={{
                        background: "rgba(0, 112, 243, 0.1)",
                        color: "var(--accent-primary)",
                        padding: "8px 15px",
                        borderRadius: "20px",
                        fontSize: "14px",
                      }}
                    >
                      {strategy}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "15px" }}>
              <button
                className="btn btn-outline"
                onClick={() => setSelectedQuantCompany(null)}
                style={{ flex: 1 }}
              >
                Close
              </button>
              <button
                className="btn"
                onClick={() => analyzeQuantCompany(selectedQuantCompany)}
                style={{ flex: 1 }}
              >
                Analyze Fit
              </button>
              <button
                className="btn"
                style={{ flex: 1, background: "var(--accent-secondary)" }}
                onClick={() => {
                  setSelectedPortfolio({
                    id: selectedQuantCompany.id,
                    name: selectedQuantCompany.name,
                    trader: "Quant AI",
                    stocks: selectedQuantCompany.topHoldings.map((h) => ({
                      symbol: h.symbol,
                      weight: h.weight,
                    })),
                  });
                  setShowConfirmation(true);
                  setSelectedQuantCompany(null);
                }}
              >
                Allocate BTC
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Trading;
