import React, { useState, useEffect, useRef } from "react";

function OpenCommunity() {
  const [activeTab, setActiveTab] = useState("feed");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPostText, setNewPostText] = useState("");
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [newsArticles, setNewsArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [activeHashtag, setActiveHashtag] = useState(null);

  const [dataSourcesSettings, setDataSourcesSettings] = useState({
    socialMedia: true,
    independentJournalists: true,
    researchPapers: true,
    declassifiedDocs: true,
    leakedFiles: false,
    whistleblowers: false,
  });


  useEffect(() => {
    setTimeout(() => {
 
      const generatePosts = () => {
        return [
          {
            id: 1,
            user: "TruthSeeker42",
            handle: "@anonymous_truth42",
            content:
              "Documents reveal that the Central Banks coordinated to artificially suppress gold prices since 1980. Look at the COMEX delivery failures and the BIS coordination papers.",
            timestamp: new Date(Date.now() - 2 * 3600000).toISOString(),
            likes: 1247,
            reposts: 538,
            replies: 72,
            attachments: ["gold_price_chart.jpg"],
            sources: [
              "Bank for International Settlements Paper #103, 2005",
              "Newly declassified Treasury memos from 1980-1982",
            ],
            verified: true,
            sourcesType: ["declassifiedDocs", "researchPapers"],
            hashtags: ["CentralBanks", "GoldManipulation", "FinancialReset"],
          },
          {
            id: 2,
            user: "CryptoRevolution",
            handle: "@anon_btc_insider",
            content:
              "BREAKING: Documents confirm intelligence agencies developed back-doors for all major operating systems. The zero-day exploits allow remote access to any system without detection.",
            timestamp: new Date(Date.now() - 5 * 3600000).toISOString(),
            likes: 3289,
            reposts: 2105,
            replies: 416,
            attachments: ["security_leak.jpg"],
            sources: [
              "Technical analysis by security researchers",
              "Confirmed by 3 independent cybersecurity firms",
            ],
            verified: true,
            sourcesType: ["independentJournalists", "leakedFiles"],
            hashtags: ["CyberSecurity", "Surveillance", "PrivacyTech"],
          },
          {
            id: 3,
            user: "PatternObserver",
            handle: "@hidden_patterns",
            content:
              "Medical research funding is being deliberately directed away from promising natural compounds that can't be patented. Follow the money trail of NIH grants compared to pharma patent applications.",
            timestamp: new Date(Date.now() - 12 * 3600000).toISOString(),
            likes: 972,
            reposts: 341,
            replies: 89,
            attachments: ["research_funding_chart.jpg"],
            sources: [
              "NIH funding database 2015-2023",
              "Patent filing trends analysis",
            ],
            verified: true,
            sourcesType: ["researchPapers", "declassifiedDocs"],
            hashtags: ["BigPharma", "MedicalResearch", "PatentSystem"],
          },
          {
            id: 4,
            user: "QuantumThinker",
            handle: "@quantum_anon",
            content:
              "Analysis of global seed vault funding reveals concentrated ownership by only 4 corporate entities. These same entities have acquired 78% of all agricultural patent rights in the last decade.",
            timestamp: new Date(Date.now() - 22 * 3600000).toISOString(),
            likes: 4521,
            reposts: 1872,
            replies: 341,
            attachments: ["ownership_diagram.jpg"],
            sources: [
              "Corporate SEC filings cross-referenced with patent databases",
              "Agricultural ownership concentration study, Stanford 2022",
            ],
            verified: true,
            sourcesType: ["researchPapers", "independentJournalists"],
            hashtags: [
              "FoodSupplyChain",
              "AgriculturalLandOwnership",
              "Monopoly",
            ],
          },
          {
            id: 5,
            user: "DataMiner",
            handle: "@anonymous_analyst",
            content:
              "FOIA documents show that weather modification programs have been operational since 1986, not just in testing phases as publicly claimed. The scale is much larger than acknowledged.",
            timestamp: new Date(Date.now() - 36 * 3600000).toISOString(),
            likes: 2148,
            reposts: 952,
            replies: 205,
            attachments: ["climate_data.jpg"],
            sources: [
              "Declassified military weather program documents",
              "Patent analysis of weather modification technologies",
            ],
            verified: true,
            sourcesType: ["declassifiedDocs", "whistleblowers"],
            hashtags: ["WeatherModification", "GeoEngineering", "HAARP"],
          },
          {
            id: 6,
            user: "CosmicSkeptic",
            handle: "@truth_seeker_apollo",
            content:
              "The moon landing was staged. Analysis of shadow angles in NASA photos reveals inconsistencies that can only be explained by studio lighting. Why are there no stars visible in the lunar photos?",
            timestamp: new Date(Date.now() - 48 * 3600000).toISOString(),
            likes: 3854,
            reposts: 1299,
            replies: 872,
            attachments: ["moon_landing_analysis.jpg"],
            sources: [
              "Photo analysis by independent researchers",
              "Testimonies from former NASA employees",
            ],
            verified: false,
            sourcesType: ["whistleblowers", "independentJournalists"],
            hashtags: ["MoonLanding", "NASALies", "SpaceHoax"],
          },
          {
            id: 7,
            user: "FinancialFreedom",
            handle: "@crypto_prophet",
            content:
              "Central Bank Digital Currencies (CBDCs) are the final step toward complete financial surveillance. Each transaction will be monitored, scored, and potentially restricted based on social compliance.",
            timestamp: new Date(Date.now() - 18 * 3600000).toISOString(),
            likes: 5732,
            reposts: 2903,
            replies: 431,
            attachments: ["cbdc_diagram.jpg"],
            sources: [
              "Bank for International Settlements CBDC working papers",
              "Central bank policy statements on transaction monitoring",
            ],
            verified: true,
            sourcesType: ["declassifiedDocs", "researchPapers"],
            hashtags: ["CBDC", "FinancialSurveillance", "CentralBanks"],
          },
        ];
      };

     
      const generateNotifications = () => {
        return [
          {
            id: 1,
            type: "alert",
            message:
              "New evidence supporting the financial reset theory has emerged",
            timestamp: new Date(Date.now() - 1.5 * 3600000).toISOString(),
            read: false,
          },
          {
            id: 2,
            type: "info",
            message:
              "Your post about central banking has been viewed 1,278 times",
            timestamp: new Date(Date.now() - 4 * 3600000).toISOString(),
            read: false,
          },
          {
            id: 3,
            type: "success",
            message: "Document verification complete: 96% confidence rating",
            timestamp: new Date(Date.now() - 8 * 3600000).toISOString(),
            read: true,
          },
          {
            id: 4,
            type: "warning",
            message:
              "Unusual traffic detected on posts related to financial topics",
            timestamp: new Date(Date.now() - 14 * 3600000).toISOString(),
            read: true,
          },
          {
            id: 5,
            type: "info",
            message:
              "New connection established with independent researcher network",
            timestamp: new Date(Date.now() - 26 * 3600000).toISOString(),
            read: true,
          },
        ];
      };

  
      const generateTrendingTopics = () => {
        return [
          {
            id: 1,
            name: "Central Bank Digital Currencies",
            hashtag: "CBDC",
            count: "42.8K posts",
            trend: "up",
          },
          {
            id: 2,
            name: "Food Supply Chain Vulnerabilities",
            hashtag: "FoodSupplyChain",
            count: "38.2K posts",
            trend: "up",
          },
          {
            id: 3,
            name: "Quantum Computing Breakthrough",
            hashtag: "QuantumComputing",
            count: "24.5K posts",
            trend: "up",
          },
          {
            id: 4,
            name: "Privacy Technology",
            hashtag: "PrivacyTech",
            count: "18.9K posts",
            trend: "down",
          },
          {
            id: 5,
            name: "Agricultural Land Ownership",
            hashtag: "AgriculturalLandOwnership",
            count: "15.3K posts",
            trend: "up",
          },
          {
            id: 6,
            name: "Moon Landing",
            hashtag: "MoonLanding",
            count: "12.1K posts",
            trend: "up",
          },
        ];
      };

    
      const generateNewsArticles = () => {
        return [
          {
            id: 1,
            title:
              "Leaked documents reveal extensive surveillance program targeting financial privacy advocates",
            source: "Independent Digital Journal",
            timestamp: new Date(Date.now() - 5 * 3600000).toISOString(),
            verified: true,
            sourcesType: ["leakedFiles", "independentJournalists"],
            hashtags: ["Surveillance", "FinancialPrivacy", "CivilLiberties"],
          },
          {
            id: 2,
            title:
              "Analysis confirms manipulation patterns in precious metals markets over 20-year period",
            source: "Financial Truth Network",
            timestamp: new Date(Date.now() - 8 * 3600000).toISOString(),
            verified: true,
            sourcesType: ["researchPapers", "independentJournalists"],
            hashtags: [
              "PreciousMetals",
              "MarketManipulation",
              "GoldManipulation",
            ],
          },
          {
            id: 3,
            title:
              "Corporate consolidation of seed supplies reaches critical threshold, researchers warn",
            source: "Agricultural Independence Project",
            timestamp: new Date(Date.now() - 14 * 3600000).toISOString(),
            verified: true,
            sourcesType: ["researchPapers", "independentJournalists"],
            hashtags: [
              "FoodSupplyChain",
              "SeedMonopoly",
              "AgriculturalLandOwnership",
            ],
          },
          {
            id: 4,
            title:
              "New evidence emerges of targeted suppression of alternative energy technologies",
            source: "Open Source Technology Review",
            timestamp: new Date(Date.now() - 20 * 3600000).toISOString(),
            verified: false,
            sourcesType: ["whistleblowers", "independentJournalists"],
            hashtags: ["AlternativeEnergy", "PatentSuppression", "CleanTech"],
          },
          {
            id: 5,
            title:
              "Patent analysis reveals concerning pattern in pharmaceutical research priorities",
            source: "Medical Transparency Initiative",
            timestamp: new Date(Date.now() - 28 * 3600000).toISOString(),
            verified: true,
            sourcesType: ["researchPapers", "declassifiedDocs"],
            hashtags: ["BigPharma", "MedicalResearch", "PatentSystem"],
          },
        ];
      };

      const allPosts = generatePosts();
      setPosts(allPosts);
      setFilteredPosts(allPosts);
      setNotifications(generateNotifications());
      setTrendingTopics(generateTrendingTopics());
      setNewsArticles(generateNewsArticles());
      setLoading(false);
    }, 1500);
  }, []);


  useEffect(() => {
    const enabledSources = Object.entries(dataSourcesSettings)
      .filter(([_, enabled]) => enabled)
      .map(([source]) => source);

    const filtered = posts.filter(
      (post) =>
        post.sourcesType &&
        post.sourcesType.some((source) => enabledSources.includes(source))
    );

    setFilteredPosts(filtered);
  }, [dataSourcesSettings, posts]);

 
  useEffect(() => {
    if (activeHashtag) {
      const hashtagFiltered = posts.filter(
        (post) => post.hashtags && post.hashtags.includes(activeHashtag)
      );
      setFilteredPosts(hashtagFiltered);
      setActiveTab("hashtag");
    }
  }, [activeHashtag, posts]);


  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

  
    const hashtags = newPostText.match(/#(\w+)/g) || [];
    const hashtagsArray = hashtags.map((tag) => tag.substring(1));

    const newPost = {
      id: Date.now(),
      user: "You",
      handle: "@anonymous_user",
      content: newPostText,
      timestamp: new Date().toISOString(),
      likes: 0,
      reposts: 0,
      replies: 0,
      attachments: [],
      sources: [],
      verified: false,
      sourcesType: ["socialMedia"],
      hashtags: hashtagsArray,
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    setFilteredPosts(updatedPosts);
    setNewPostText("");

    setNotifications([
      {
        id: Date.now(),
        type: "success",
        message: "Your post has been published anonymously",
        timestamp: new Date().toISOString(),
        read: false,
      },
      ...notifications,
    ]);
  };

  
  const toggleDataSource = (source) => {
    setDataSourcesSettings({
      ...dataSourcesSettings,
      [source]: !dataSourcesSettings[source],
    });
  };

 
  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    const results = posts.filter(
      (post) =>
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.hashtags &&
          post.hashtags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          ))
    );

    setSearchResults(results);
    setActiveTab("search");
  };

 
  const handleHashtagClick = (hashtag) => {
    setActiveHashtag(hashtag);
  };


  const resetHashtagFilter = () => {
    setActiveHashtag(null);
    setFilteredPosts(posts);
    setActiveTab("feed");
  };


  const handleLike = (postId) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updatedPosts);
    setFilteredPosts(
      updatedPosts.filter((post) =>
        filteredPosts.some((fp) => fp.id === post.id)
      )
    );
  };


  const handleRepost = (postId) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, reposts: post.reposts + 1 } : post
    );
    setPosts(updatedPosts);
    setFilteredPosts(
      updatedPosts.filter((post) =>
        filteredPosts.some((fp) => fp.id === post.id)
      )
    );

    setNotifications([
      {
        id: Date.now(),
        type: "success",
        message: "Post reshared anonymously",
        timestamp: new Date().toISOString(),
        read: false,
      },
      ...notifications,
    ]);
  };


  const handleReply = (postId) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, replies: post.replies + 1 } : post
    );
    setPosts(updatedPosts);
    setFilteredPosts(
      updatedPosts.filter((post) =>
        filteredPosts.some((fp) => fp.id === post.id)
      )
    );


    setNotifications([
      {
        id: Date.now(),
        type: "info",
        message: "Reply feature activated",
        timestamp: new Date().toISOString(),
        read: false,
      },
      ...notifications,
    ]);
  };

 
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));
      return `${diffInMinutes}m`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h`;
    } else {
      return date.toLocaleDateString();
    }
  };


  const renderPostContent = (content, hashtags) => {
    if (!hashtags || hashtags.length === 0) return content;

    let renderedContent = content;
    hashtags.forEach((hashtag) => {
      const hashtagRegex = new RegExp(`#${hashtag}|\\b${hashtag}\\b`, "g");
      renderedContent = renderedContent.replace(hashtagRegex, (match) => {
        if (match.startsWith("#")) {
          return `<span class="hashtag" style="color: var(--accent-primary); cursor: pointer" data-hashtag="${hashtag}">#${hashtag}</span>`;
        } else {
          return `<span class="hashtag" style="color: var(--accent-primary); cursor: pointer" data-hashtag="${hashtag}">${hashtag}</span>`;
        }
      });
    });

    return (
      <div
        dangerouslySetInnerHTML={{ __html: renderedContent }}
        onClick={(e) => {
          if (e.target.classList.contains("hashtag")) {
            handleHashtagClick(e.target.getAttribute("data-hashtag"));
          }
        }}
      />
    );
  };

  return (
    <div className="app-container" style={{ display: "flex" }}>
   

      <div
        className="main-content-wrapper"
        style={{
          flex: 1,
          display: "flex",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
    
        <div className="main-content" style={{ flex: 1, padding: "30px" }}>
          <h1 style={{ marginBottom: "20px" }}>Open Community</h1>

        
          <div style={{ position: "relative", marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Search topics... (e.g. 'moon landing')"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              style={{
                width: "100%",
                padding: "10px 40px 10px 15px",
                borderRadius: "20px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid var(--border-color)",
                color: "var(--text-primary)",
              }}
            />
            <button
              onClick={handleSearch}
              style={{
                position: "absolute",
                right: "15px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                color: "var(--text-secondary)",
                cursor: "pointer",
              }}
            >
              🔍
            </button>
          </div>

          {/* Hashtag filter indicator */}
          {activeHashtag && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 15px",
                background: "rgba(12, 170, 170, 0.1)",
                borderRadius: "8px",
                marginBottom: "20px",
              }}
            >
              <span style={{ marginRight: "10px" }}>
                Showing posts tagged with <strong>#{activeHashtag}</strong>
              </span>
              <button
                onClick={resetHashtagFilter}
                style={{
                  marginLeft: "auto",
                  background: "transparent",
                  border: "none",
                  color: "var(--accent-primary)",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>
          )}

          <div
            className="community-tabs"
            style={{
              display: "flex",
              borderBottom: "1px solid var(--border-color)",
              marginBottom: "30px",
            }}
          >
            <button
              className={`tab ${activeTab === "feed" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("feed");
                setActiveHashtag(null);
                setFilteredPosts(posts);
              }}
              style={{
                padding: "10px 20px",
                background: "transparent",
                border: "none",
                borderBottom:
                  activeTab === "feed"
                    ? "2px solid var(--accent-primary)"
                    : "2px solid transparent",
                color:
                  activeTab === "feed"
                    ? "var(--accent-primary)"
                    : "var(--text-primary)",
                cursor: "pointer",
                fontWeight: activeTab === "feed" ? "bold" : "normal",
              }}
            >
              For You
            </button>
            <button
              className={`tab ${activeTab === "trending" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("trending");
                setActiveHashtag(null);
              }}
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
              Trending
            </button>
            <button
              className={`tab ${activeTab === "verified" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("verified");
                setActiveHashtag(null);
                setFilteredPosts(posts.filter((post) => post.verified));
              }}
              style={{
                padding: "10px 20px",
                background: "transparent",
                border: "none",
                borderBottom:
                  activeTab === "verified"
                    ? "2px solid var(--accent-primary)"
                    : "2px solid transparent",
                color:
                  activeTab === "verified"
                    ? "var(--accent-primary)"
                    : "var(--text-primary)",
                cursor: "pointer",
                fontWeight: activeTab === "verified" ? "bold" : "normal",
              }}
            >
              Verified
            </button>
            <button
              className={`tab ${activeTab === "news" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("news");
                setActiveHashtag(null);
              }}
              style={{
                padding: "10px 20px",
                background: "transparent",
                border: "none",
                borderBottom:
                  activeTab === "news"
                    ? "2px solid var(--accent-primary)"
                    : "2px solid transparent",
                color:
                  activeTab === "news"
                    ? "var(--accent-primary)"
                    : "var(--text-primary)",
                cursor: "pointer",
                fontWeight: activeTab === "news" ? "bold" : "normal",
              }}
            >
              News
            </button>
            {activeTab === "search" && (
              <button
                className="tab active"
                style={{
                  padding: "10px 20px",
                  background: "transparent",
                  border: "none",
                  borderBottom: "2px solid var(--accent-primary)",
                  color: "var(--accent-primary)",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Search Results
              </button>
            )}
            {activeTab === "hashtag" && (
              <button
                className="tab active"
                style={{
                  padding: "10px 20px",
                  background: "transparent",
                  border: "none",
                  borderBottom: "2px solid var(--accent-primary)",
                  color: "var(--accent-primary)",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                #{activeHashtag}
              </button>
            )}
          </div>

          {/* Post creation area */}
          <div
            className="card"
            style={{
              marginBottom: "20px",
              padding: "20px",
              backgroundColor: "#1a1a1a",
              borderRadius: "8px",
            }}
          >
            <form onSubmit={handlePostSubmit}>
              <textarea
                placeholder="Share your thoughts (posts are anonymous by default)..."
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                style={{
                  width: "100%",
                  height: "100px",
                  padding: "15px",
                  borderRadius: "8px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-primary)",
                  resize: "none",
                  marginBottom: "15px",
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", gap: "15px" }}>
                  <button
                    type="button"
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "var(--accent-primary)",
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                  >
                    📸
                  </button>
                  <button
                    type="button"
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "var(--accent-primary)",
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                  >
                    🔗
                  </button>
                  <button
                    type="button"
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "var(--accent-primary)",
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                  >
                    📊
                  </button>
                  <button
                    type="button"
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "var(--accent-primary)",
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                  >
                    📁
                  </button>
                </div>
                <button
                  type="submit"
                  className="btn"
                  disabled={!newPostText.trim()}
                  style={{
                    padding: "10px 20px",
                    background: "var(--accent-primary)",
                    color: "white",
                    border: "none",
                    borderRadius: "25px",
                    fontWeight: "bold",
                    cursor: newPostText.trim() ? "pointer" : "not-allowed",
                    opacity: newPostText.trim() ? 1 : 0.7,
                  }}
                >
                  POST ANONYMOUSLY
                </button>
              </div>
            </form>
          </div>

          {/* Content based on active tab */}
          {(activeTab === "feed" ||
            activeTab === "verified" ||
            activeTab === "hashtag") && (
            <>
              {loading ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "40px 0",
                  }}
                >
                  <div
                    className="loading-spinner"
                    style={{
                      width: "30px",
                      height: "30px",
                      border: "3px solid rgba(0, 112, 243, 0.2)",
                      borderTop: "3px solid var(--accent-primary)",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }}
                  ></div>
                </div>
              ) : (
                <div className="posts-feed">
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                      <div
                        key={post.id}
                        className="card"
                        style={{
                          marginBottom: "20px",
                          padding: "20px",
                          backgroundColor: "#1a1a1a",
                          borderRadius: "8px",
                          border: post.verified
                            ? "1px solid rgba(46, 213, 115, 0.3)"
                            : "1px solid var(--border-color)",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "15px",
                          }}
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <div
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                background: "rgba(255, 255, 255, 0.1)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginRight: "10px",
                              }}
                            >
                              👤
                            </div>
                            <div>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <p style={{ margin: "0", fontWeight: "bold" }}>
                                  {post.user}
                                </p>
                                {post.verified && (
                                  <span
                                    style={{
                                      marginLeft: "5px",
                                      color: "#2ed573",
                                      fontSize: "14px",
                                    }}
                                  >
                                    ✓
                                  </span>
                                )}
                              </div>
                              <p
                                style={{
                                  margin: "0",
                                  color: "var(--text-secondary)",
                                  fontSize: "14px",
                                }}
                              >
                                {post.handle}
                              </p>
                            </div>
                          </div>
                          <p
                            style={{
                              margin: "0",
                              color: "var(--text-secondary)",
                              fontSize: "14px",
                            }}
                          >
                            {formatTimestamp(post.timestamp)}
                          </p>
                        </div>

                        <div
                          style={{ margin: "0 0 15px 0", lineHeight: "1.5" }}
                        >
                          {renderPostContent(post.content, post.hashtags)}
                        </div>

                        {post.attachments && post.attachments.length > 0 && (
                          <div
                            style={{
                              height: "200px",
                              background: "rgba(255, 255, 255, 0.05)",
                              borderRadius: "8px",
                              marginBottom: "15px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "var(--text-secondary)",
                            }}
                          >
                            [Image: {post.attachments[0]}]
                          </div>
                        )}

                        {post.sources && post.sources.length > 0 && (
                          <div
                            style={{
                              background: "rgba(46, 213, 115, 0.05)",
                              border: "1px solid rgba(46, 213, 115, 0.2)",
                              padding: "10px 15px",
                              borderRadius: "8px",
                              marginBottom: "15px",
                            }}
                          >
                            <p
                              style={{
                                margin: "0 0 5px 0",
                                fontWeight: "bold",
                                fontSize: "14px",
                                color: "#2ed573",
                              }}
                            >
                              VERIFIED SOURCES:
                            </p>
                            {post.sources.map((source, index) => (
                              <p
                                key={index}
                                style={{
                                  margin:
                                    index === post.sources.length - 1
                                      ? "0"
                                      : "0 0 5px 0",
                                  fontSize: "14px",
                                }}
                              >
                                • {source}
                              </p>
                            ))}
                          </div>
                        )}

                        {post.hashtags && post.hashtags.length > 0 && (
                          <div style={{ marginBottom: "15px" }}>
                            {post.hashtags.map((hashtag, index) => (
                              <span
                                key={index}
                                onClick={() => handleHashtagClick(hashtag)}
                                style={{
                                  display: "inline-block",
                                  margin: "0 5px 5px 0",
                                  padding: "3px 8px",
                                  background: "rgba(12, 170, 170, 0.1)",
                                  borderRadius: "15px",
                                  fontSize: "14px",
                                  color: "var(--accent-primary)",
                                  cursor: "pointer",
                                }}
                              >
                                #{hashtag}
                              </span>
                            ))}
                          </div>
                        )}

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div style={{ display: "flex", gap: "20px" }}>
                            <button
                              onClick={() => handleReply(post.id)}
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
                              💬 {post.replies}
                            </button>
                            <button
                              onClick={() => handleRepost(post.id)}
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
                              🔄 {post.reposts}
                            </button>
                            <button
                              onClick={() => handleLike(post.id)}
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
                              ❤️ {post.likes}
                            </button>
                          </div>
                          <button
                            style={{
                              background: "transparent",
                              border: "none",
                              color: "var(--text-secondary)",
                              cursor: "pointer",
                            }}
                          >
                            🔗
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{ textAlign: "center", padding: "30px 0" }}>
                      <p>No posts found matching your criteria.</p>
                      <button
                        onClick={() => {
                          setActiveTab("feed");
                          setActiveHashtag(null);
                          setFilteredPosts(posts);
                        }}
                        style={{
                          marginTop: "15px",
                          padding: "8px 15px",
                          background: "var(--accent-primary)",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Reset Filters
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {activeTab === "search" && (
            <div className="search-results">
              <h3 style={{ marginBottom: "20px" }}>
                Search Results for "{searchTerm}"
              </h3>
              {searchResults.length > 0 ? (
                searchResults.map((post) => (
                  <div
                    key={`search-${post.id}`}
                    className="card"
                    style={{
                      marginBottom: "20px",
                      padding: "20px",
                      backgroundColor: "#1a1a1a",
                      borderRadius: "8px",
                      border: post.verified
                        ? "1px solid rgba(46, 213, 115, 0.3)"
                        : "1px solid var(--border-color)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "15px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            background: "rgba(255, 255, 255, 0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: "10px",
                          }}
                        >
                          👤
                        </div>
                        <div>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <p style={{ margin: "0", fontWeight: "bold" }}>
                              {post.user}
                            </p>
                            {post.verified && (
                              <span
                                style={{
                                  marginLeft: "5px",
                                  color: "#2ed573",
                                  fontSize: "14px",
                                }}
                              >
                                ✓
                              </span>
                            )}
                          </div>
                          <p
                            style={{
                              margin: "0",
                              color: "var(--text-secondary)",
                              fontSize: "14px",
                            }}
                          >
                            {post.handle}
                          </p>
                        </div>
                      </div>
                      <p
                        style={{
                          margin: "0",
                          color: "var(--text-secondary)",
                          fontSize: "14px",
                        }}
                      >
                        {formatTimestamp(post.timestamp)}
                      </p>
                    </div>

                    <div style={{ margin: "0 0 15px 0", lineHeight: "1.5" }}>
                      {renderPostContent(post.content, post.hashtags)}
                    </div>

                    {post.attachments && post.attachments.length > 0 && (
                      <div
                        style={{
                          height: "200px",
                          background: "rgba(255, 255, 255, 0.05)",
                          borderRadius: "8px",
                          marginBottom: "15px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--text-secondary)",
                        }}
                      >
                        [Image: {post.attachments[0]}]
                      </div>
                    )}

                    {post.hashtags && post.hashtags.length > 0 && (
                      <div style={{ marginBottom: "15px" }}>
                        {post.hashtags.map((hashtag, index) => (
                          <span
                            key={index}
                            onClick={() => handleHashtagClick(hashtag)}
                            style={{
                              display: "inline-block",
                              margin: "0 5px 5px 0",
                              padding: "3px 8px",
                              background: "rgba(12, 170, 170, 0.1)",
                              borderRadius: "15px",
                              fontSize: "14px",
                              color: "var(--accent-primary)",
                              cursor: "pointer",
                            }}
                          >
                            #{hashtag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "flex", gap: "20px" }}>
                        <button
                          onClick={() => handleReply(post.id)}
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
                          💬 {post.replies}
                        </button>
                        <button
                          onClick={() => handleRepost(post.id)}
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
                          🔄 {post.reposts}
                        </button>
                        <button
                          onClick={() => handleLike(post.id)}
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
                          ❤️ {post.likes}
                        </button>
                      </div>
                      <button
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "var(--text-secondary)",
                          cursor: "pointer",
                        }}
                      >
                        🔗
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: "center", padding: "30px 0" }}>
                  <p>No results found for "{searchTerm}".</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "trending" && (
            <div className="trending-feed">
              <div
                className="card"
                style={{
                  marginBottom: "30px",
                  padding: "20px",
                  backgroundColor: "#1a1a1a",
                  borderRadius: "8px",
                }}
              >
                <h3 style={{ marginBottom: "20px" }}>Trending Topics</h3>
                {trendingTopics.map((topic, index) => (
                  <div
                    key={topic.id}
                    style={{
                      marginBottom:
                        topic.id === trendingTopics.length ? "0" : "15px",
                      padding: "10px 0",
                      borderBottom:
                        topic.id === trendingTopics.length
                          ? "none"
                          : "1px solid rgba(255, 255, 255, 0.1)",
                      cursor: "pointer",
                    }}
                    onClick={() => handleHashtagClick(topic.hashtag)}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h4 style={{ margin: "0 0 5px 0" }}>{topic.name}</h4>
                      <span
                        style={{
                          color: topic.trend === "up" ? "#2ed573" : "#ff4757",
                          fontSize: "14px",
                        }}
                      >
                        {topic.trend === "up" ? "↑" : "↓"}
                      </span>
                    </div>
                    <p
                      style={{
                        margin: "0",
                        color: "var(--text-secondary)",
                        fontSize: "14px",
                      }}
                    >
                      {topic.count}
                    </p>
                  </div>
                ))}
              </div>

              {/* Display some posts related to trending topics */}
              {posts.slice(0, 3).map((post) => (
                <div
                  key={`trending-${post.id}`}
                  className="card"
                  style={{
                    marginBottom: "20px",
                    padding: "20px",
                    backgroundColor: "#1a1a1a",
                    borderRadius: "8px",
                    border: post.verified
                      ? "1px solid rgba(46, 213, 115, 0.3)"
                      : "1px solid var(--border-color)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "15px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          background: "rgba(255, 255, 255, 0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: "10px",
                        }}
                      >
                        👤
                      </div>
                      <div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <p style={{ margin: "0", fontWeight: "bold" }}>
                            {post.user}
                          </p>
                          {post.verified && (
                            <span
                              style={{
                                marginLeft: "5px",
                                color: "#2ed573",
                                fontSize: "14px",
                              }}
                            >
                              ✓
                            </span>
                          )}
                        </div>
                        <p
                          style={{
                            margin: "0",
                            color: "var(--text-secondary)",
                            fontSize: "14px",
                          }}
                        >
                          {post.handle}
                        </p>
                      </div>
                    </div>
                    <p
                      style={{
                        margin: "0",
                        color: "var(--text-secondary)",
                        fontSize: "14px",
                      }}
                    >
                      {formatTimestamp(post.timestamp)}
                    </p>
                  </div>

                  <div style={{ margin: "0 0 15px 0", lineHeight: "1.5" }}>
                    {renderPostContent(post.content, post.hashtags)}
                  </div>

                  {post.hashtags && post.hashtags.length > 0 && (
                    <div style={{ marginBottom: "15px" }}>
                      {post.hashtags.map((hashtag, index) => (
                        <span
                          key={index}
                          onClick={() => handleHashtagClick(hashtag)}
                          style={{
                            display: "inline-block",
                            margin: "0 5px 5px 0",
                            padding: "3px 8px",
                            background: "rgba(12, 170, 170, 0.1)",
                            borderRadius: "15px",
                            fontSize: "14px",
                            color: "var(--accent-primary)",
                            cursor: "pointer",
                          }}
                        >
                          #{hashtag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ display: "flex", gap: "20px" }}>
                      <button
                        onClick={() => handleReply(post.id)}
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
                        💬 {post.replies}
                      </button>
                      <button
                        onClick={() => handleRepost(post.id)}
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
                        🔄 {post.reposts}
                      </button>
                      <button
                        onClick={() => handleLike(post.id)}
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
                        ❤️ {post.likes}
                      </button>
                    </div>
                    <button
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "var(--text-secondary)",
                        cursor: "pointer",
                      }}
                    >
                      🔗
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "news" && (
            <div className="news-feed">
              {newsArticles.map((article) => (
                <div
                  key={article.id}
                  className="card"
                  style={{
                    marginBottom: "20px",
                    padding: "20px",
                    backgroundColor: "#1a1a1a",
                    borderRadius: "8px",
                    border: article.verified
                      ? "1px solid rgba(46, 213, 115, 0.3)"
                      : "1px solid var(--border-color)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "15px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          background: "rgba(255, 255, 255, 0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: "10px",
                          fontSize: "20px",
                        }}
                      >
                        📰
                      </div>
                      <div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <p style={{ margin: "0", fontWeight: "bold" }}>
                            {article.source}
                          </p>
                          {article.verified && (
                            <span
                              style={{
                                marginLeft: "5px",
                                color: "#2ed573",
                                fontSize: "14px",
                              }}
                            >
                              ✓
                            </span>
                          )}
                        </div>
                        <p
                          style={{
                            margin: "0",
                            color: "var(--text-secondary)",
                            fontSize: "14px",
                          }}
                        >
                          {formatTimestamp(article.timestamp)}
                        </p>
                      </div>
                    </div>
                    <button
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "var(--text-secondary)",
                        cursor: "pointer",
                        fontSize: "18px",
                      }}
                    >
                      ⋯
                    </button>
                  </div>

                  <h4 style={{ margin: "0 0 15px 0", lineHeight: "1.4" }}>
                    {article.title}
                  </h4>

                  <div
                    style={{
                      height: "180px",
                      background: "rgba(255, 255, 255, 0.05)",
                      borderRadius: "8px",
                      marginBottom: "15px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--text-secondary)",
                    }}
                  >
                    [Article Cover Image]
                  </div>

                  {article.hashtags && article.hashtags.length > 0 && (
                    <div style={{ marginBottom: "15px" }}>
                      {article.hashtags.map((hashtag, index) => (
                        <span
                          key={index}
                          onClick={() => handleHashtagClick(hashtag)}
                          style={{
                            display: "inline-block",
                            margin: "0 5px 5px 0",
                            padding: "3px 8px",
                            background: "rgba(12, 170, 170, 0.1)",
                            borderRadius: "15px",
                            fontSize: "14px",
                            color: "var(--accent-primary)",
                            cursor: "pointer",
                          }}
                        >
                          #{hashtag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ display: "flex", gap: "20px" }}>
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
                        💬 Comment
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
                        🔄 Share
                      </button>
                    </div>
                    <button
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "var(--text-secondary)",
                        cursor: "pointer",
                      }}
                    >
                      🔗
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div
          className="right-sidebar"
          style={{ width: "300px", padding: "30px 20px" }}
        >
          {/* Notifications */}
          <div
            className="card"
            style={{
              marginBottom: "20px",
              backgroundColor: "#1a1a1a",
              borderRadius: "8px",
              padding: "15px",
            }}
          >
            <h3 style={{ marginBottom: "15px" }}>NOTIFICATIONS</h3>

            {notifications.length > 0 ? (
              <div className="notifications-list">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="notification-item"
                    style={{
                      background: notification.read
                        ? "transparent"
                        : "rgba(0, 112, 243, 0.05)",
                      borderRadius: "8px",
                      padding: "10px",
                      marginBottom: "10px",
                      borderLeft:
                        notification.type === "alert"
                          ? "3px solid #ff4757"
                          : notification.type === "warning"
                          ? "3px solid #ffa502"
                          : notification.type === "success"
                          ? "3px solid #2ed573"
                          : "3px solid #0070f3",
                    }}
                  >
                    <p style={{ margin: "0", fontSize: "14px" }}>
                      {notification.message}
                    </p>
                    <p
                      style={{
                        margin: "5px 0 0 0",
                        fontSize: "12px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {formatTimestamp(notification.timestamp)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No notifications</p>
            )}
          </div>

          {/* Data Sources Settings */}
          <div
            className="card"
            style={{
              marginBottom: "20px",
              backgroundColor: "#1a1a1a",
              borderRadius: "8px",
              padding: "15px",
            }}
          >
            <h3 style={{ marginBottom: "15px" }}>DATA SOURCES</h3>

            <div className="data-sources-list">
              <div
                className="data-source-toggle"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <input
                    type="checkbox"
                    id="social-media"
                    checked={dataSourcesSettings.socialMedia}
                    onChange={() => toggleDataSource("socialMedia")}
                    style={{ accentColor: "var(--accent-primary)" }}
                  />
                  <label htmlFor="social-media">Social Media</label>
                </div>
                <span
                  style={{
                    display: "inline-block",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: dataSourcesSettings.socialMedia
                      ? "var(--accent-secondary)"
                      : "var(--text-secondary)",
                  }}
                ></span>
              </div>

              <div
                className="data-source-toggle"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <input
                    type="checkbox"
                    id="independent-journalists"
                    checked={dataSourcesSettings.independentJournalists}
                    onChange={() => toggleDataSource("independentJournalists")}
                    style={{ accentColor: "var(--accent-primary)" }}
                  />
                  <label htmlFor="independent-journalists">
                    Independent Journalists
                  </label>
                </div>
                <span
                  style={{
                    display: "inline-block",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: dataSourcesSettings.independentJournalists
                      ? "var(--accent-secondary)"
                      : "var(--text-secondary)",
                  }}
                ></span>
              </div>

              <div
                className="data-source-toggle"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <input
                    type="checkbox"
                    id="research-papers"
                    checked={dataSourcesSettings.researchPapers}
                    onChange={() => toggleDataSource("researchPapers")}
                    style={{ accentColor: "var(--accent-primary)" }}
                  />
                  <label htmlFor="research-papers">Research Papers</label>
                </div>
                <span
                  style={{
                    display: "inline-block",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: dataSourcesSettings.researchPapers
                      ? "var(--accent-secondary)"
                      : "var(--text-secondary)",
                  }}
                ></span>
              </div>

              <div
                className="data-source-toggle"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <input
                    type="checkbox"
                    id="declassified-docs"
                    checked={dataSourcesSettings.declassifiedDocs}
                    onChange={() => toggleDataSource("declassifiedDocs")}
                    style={{ accentColor: "var(--accent-primary)" }}
                  />
                  <label htmlFor="declassified-docs">
                    Declassified Documents
                  </label>
                </div>
                <span
                  style={{
                    display: "inline-block",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: dataSourcesSettings.declassifiedDocs
                      ? "var(--accent-secondary)"
                      : "var(--text-secondary)",
                  }}
                ></span>
              </div>

              <div
                className="data-source-toggle"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <input
                    type="checkbox"
                    id="leaked-files"
                    checked={dataSourcesSettings.leakedFiles}
                    onChange={() => toggleDataSource("leakedFiles")}
                    style={{ accentColor: "var(--accent-primary)" }}
                  />
                  <label htmlFor="leaked-files">Leaked Files</label>
                </div>
                <span
                  style={{
                    display: "inline-block",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: dataSourcesSettings.leakedFiles
                      ? "var(--accent-secondary)"
                      : "var(--text-secondary)",
                  }}
                ></span>
              </div>

              <div
                className="data-source-toggle"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <input
                    type="checkbox"
                    id="whistleblowers"
                    checked={dataSourcesSettings.whistleblowers}
                    onChange={() => toggleDataSource("whistleblowers")}
                    style={{ accentColor: "var(--accent-primary)" }}
                  />
                  <label htmlFor="whistleblowers">Whistleblowers</label>
                </div>
                <span
                  style={{
                    display: "inline-block",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: dataSourcesSettings.whistleblowers
                      ? "var(--accent-secondary)"
                      : "var(--text-secondary)",
                  }}
                ></span>
              </div>
            </div>
          </div>

          {/* Trending Topics */}
          <div
            className="card"
            style={{
              backgroundColor: "#1a1a1a",
              borderRadius: "8px",
              padding: "15px",
            }}
          >
            <h3 style={{ marginBottom: "15px" }}>TRENDING TOPICS</h3>
            {trendingTopics.slice(0, 3).map((topic, index) => (
              <div
                key={topic.id}
                style={{
                  padding: "10px 0",
                  borderBottom:
                    index === 2 ? "none" : "1px solid rgba(255, 255, 255, 0.1)",
                  cursor: "pointer",
                }}
                onClick={() => handleHashtagClick(topic.hashtag)}
              >
                <p style={{ margin: "0 0 3px 0", fontWeight: "bold" }}>
                  #{topic.hashtag}
                </p>
                <p
                  style={{
                    margin: "0",
                    fontSize: "14px",
                    color: "var(--text-secondary)",
                  }}
                >
                  {topic.count}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        :root {
          --accent-primary: #0ca;
          --accent-secondary: #2ed573;
          --text-primary: #f1f1f1;
          --text-secondary: #a0a0a0;
          --border-color: #333;
        }
        
        body {
          margin: 0;
          background-color: #121212;
          color: var(--text-primary);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
        
        h1, h2, h3, h4, h5, h6 {
          color: var(--text-primary);
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default OpenCommunity;
