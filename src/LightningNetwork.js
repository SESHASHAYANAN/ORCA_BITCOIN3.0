import React, { useState, useRef, useEffect, useContext } from "react";
import WalletContext from "./WalletContext";
// Add OpenStreetMap libraries
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
  Polyline,
  LayersControl,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// CSS for animations and styling
const mapStyles = `
  .node-marker {
    transition: all 0.3s ease-in-out;
  }
  .node-marker:hover {
    transform: scale(1.2);
  }
  .network-connection {
    stroke-dasharray: 5;
    animation: dash 30s linear infinite;
  }
  @keyframes dash {
    to {
      stroke-dashoffset: 1000;
    }
  }
  .map-container .leaflet-container {
    background: #0d1117;
    border-radius: 8px;
  }
  .node-popup .leaflet-popup-content-wrapper {
    background: rgba(22, 27, 34, 0.95);
    color: white;
    border-radius: 8px;
    border: 1px solid var(--border-color);
  }
  .node-popup .leaflet-popup-tip {
    background: rgba(22, 27, 34, 0.95);
  }
  .mining-stat {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }
  .mining-stat-icon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    font-size: 12px;
  }
  .node-detail-transition {
    transition: all 0.3s ease;
  }
  .node-pulse {
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(0, 112, 243, 0.7);
    }
    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(0, 112, 243, 0);
    }
    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(0, 112, 243, 0);
    }
  }
  .fade-in {
    animation: fadeIn 0.5s ease-in;
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .slide-in {
    animation: slideIn 0.3s ease-out;
  }
  @keyframes slideIn {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  .network-stats-card {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    padding: 10px;
    transition: all 0.3s ease;
  }
  .network-stats-card:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
`;

function LightningNetwork() {
  const { wallet, balance, exchangeRates } = useContext(WalletContext);
  const mapRef = useRef(null);
  const [activeTab, setActiveTab] = useState("map");
  const [mapMode, setMapMode] = useState("user");
  const [selectedNode, setSelectedNode] = useState(null);
  const [showNodeDetails, setShowNodeDetails] = useState(false);
  const [rentMode, setRentMode] = useState("rent"); // 'rent' or 'provide'
  const [nodeType, setNodeType] = useState("high"); // 'high', 'mid', 'low', 'poor'
  const [duration, setDuration] = useState("10"); // in minutes
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [transactionResult, setTransactionResult] = useState(null);
  const [networkStats, setNetworkStats] = useState({
    connectedNodes: 22,
    totalPower: "487 TFLOPS",
    activeJobs: 8,
    avgLatency: "35 ms",
    blockchainSize: "423 GB",
    hashRate: "249 EH/s",
    difficulty: "67.4 T",
    poolDistribution: {
      "Foundry USA": "28.7%",
      AntPool: "19.2%",
      F2Pool: "13.5%",
      "Binance Pool": "11.8%",
      ViaBTC: "8.9%",
      Others: "17.9%",
    },
  });
  const [myNodes, setMyNodes] = useState([]);
  const [myJobs, setMyJobs] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [mapLayer, setMapLayer] = useState("street"); // "street", "satellite", or "terrain"
  const [showAnimations, setShowAnimations] = useState(true);
  const [showMinerDetails, setShowMinerDetails] = useState(false);

  // Add a style element for custom CSS
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = mapStyles;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Fix for Leaflet icon issue in webpack
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    });
  }, []);

  // Generate network nodes
  useEffect(() => {
    const generateNodes = () => {
      const nodeTypes = ["high", "mid", "low", "poor"];
      const nodeStatuses = ["active", "idle"];
      const miningAlgorithms = [
        "SHA-256",
        "Scrypt",
        "X11",
        "Ethash",
        "Equihash",
      ];
      const coolingMethods = [
        "Air Cooled",
        "Liquid Cooled",
        "Immersion Cooled",
        "Hybrid Cooling",
      ];
      const powerSources = [
        "Grid",
        "Solar",
        "Hydro",
        "Wind",
        "Mixed Renewable",
      ];
      const securityFeatures = [
        "Multi-sig",
        "Cold Storage",
        "Hardware Security",
        "Firewall",
      ];

      const locations = [
        { name: "New York", lat: 40.7128, lng: -74.006 },
        { name: "San Francisco", lat: 37.7749, lng: -122.4194 },
        { name: "Chicago", lat: 41.8781, lng: -87.6298 },
        { name: "Seattle", lat: 47.6062, lng: -122.3321 },
        { name: "Austin", lat: 30.2672, lng: -97.7431 },
        { name: "Miami", lat: 25.7617, lng: -80.1918 },
        { name: "Boston", lat: 42.3601, lng: -71.0589 },
        { name: "Denver", lat: 39.7392, lng: -104.9903 },
        { name: "Los Angeles", lat: 34.0522, lng: -118.2437 },
        { name: "Atlanta", lat: 33.749, lng: -84.388 },
        { name: "Dallas", lat: 32.7767, lng: -96.797 },
        { name: "Phoenix", lat: 33.4484, lng: -112.074 },
        { name: "Las Vegas", lat: 36.1699, lng: -115.1398 },
        { name: "Portland", lat: 45.5051, lng: -122.675 },
        { name: "Philadelphia", lat: 39.9526, lng: -75.1652 },
        { name: "Toronto", lat: 43.6532, lng: -79.3832 },
        { name: "Montreal", lat: 45.5017, lng: -73.5673 },
        { name: "Vancouver", lat: 49.2827, lng: -123.1207 },
        { name: "London", lat: 51.5074, lng: -0.1278 },
        { name: "Paris", lat: 48.8566, lng: 2.3522 },
        { name: "Berlin", lat: 52.52, lng: 13.405 },
        { name: "Tokyo", lat: 35.6762, lng: 139.6503 },
      ];

      // Generate array of nodes with random properties
      const nodesData = locations.map((location, index) => {
        const type = nodeTypes[Math.floor(Math.random() * nodeTypes.length)];
        const status =
          nodeStatuses[Math.floor(Math.random() * nodeStatuses.length)];
        const gpuModel =
          type === "high"
            ? "NVIDIA RTX 4090"
            : type === "mid"
            ? "NVIDIA RTX 3080"
            : type === "low"
            ? "AMD Radeon RX 6700 XT"
            : "NVIDIA GTX 1660";
        const cpuModel =
          type === "high"
            ? "AMD Ryzen 9 5950X"
            : type === "mid"
            ? "Intel Core i7-12700K"
            : type === "low"
            ? "AMD Ryzen 5 5600X"
            : "Intel Core i5-10400";
        const memory =
          type === "high"
            ? "64GB DDR5"
            : type === "mid"
            ? "32GB DDR4"
            : type === "low"
            ? "16GB DDR4"
            : "8GB DDR4";
        const storage =
          type === "high"
            ? "2TB NVMe SSD"
            : type === "mid"
            ? "1TB NVMe SSD"
            : type === "low"
            ? "500GB SSD"
            : "256GB SSD";
        const price =
          type === "high" ? 20 : type === "mid" ? 15 : type === "low" ? 10 : 5;
        const latency =
          type === "high"
            ? "15ms"
            : type === "mid"
            ? "25ms"
            : type === "low"
            ? "35ms"
            : "50ms";

        // Additional mining-specific attributes
        const hashPower =
          type === "high"
            ? `${(Math.random() * 150 + 350).toFixed(1)} TH/s`
            : type === "mid"
            ? `${(Math.random() * 100 + 150).toFixed(1)} TH/s`
            : type === "low"
            ? `${(Math.random() * 50 + 50).toFixed(1)} TH/s`
            : `${(Math.random() * 20 + 10).toFixed(1)} TH/s`;

        const powerConsumption =
          type === "high"
            ? `${(Math.random() * 500 + 2000).toFixed(0)} W`
            : type === "mid"
            ? `${(Math.random() * 300 + 1200).toFixed(0)} W`
            : type === "low"
            ? `${(Math.random() * 200 + 700).toFixed(0)} W`
            : `${(Math.random() * 100 + 300).toFixed(0)} W`;

        const efficiency =
          type === "high"
            ? `${(Math.random() * 5 + 30).toFixed(1)} J/TH`
            : type === "mid"
            ? `${(Math.random() * 10 + 38).toFixed(1)} J/TH`
            : type === "low"
            ? `${(Math.random() * 15 + 45).toFixed(1)} J/TH`
            : `${(Math.random() * 20 + 55).toFixed(1)} J/TH`;

        const uptime = `${(Math.random() * 5 + 95).toFixed(1)}%`;
        const blocks = Math.floor(Math.random() * 150);
        const miningPool =
          Math.random() > 0.5
            ? "Foundry USA"
            : Math.random() > 0.5
            ? "AntPool"
            : "F2Pool";
        const algorithm =
          miningAlgorithms[Math.floor(Math.random() * miningAlgorithms.length)];
        const cooling =
          coolingMethods[Math.floor(Math.random() * coolingMethods.length)];
        const energySource =
          powerSources[Math.floor(Math.random() * powerSources.length)];
        const security =
          securityFeatures[Math.floor(Math.random() * securityFeatures.length)];

        return {
          id: index + 1,
          name: `Node-${index + 1}-${type.toUpperCase()}`,
          location: location.name,
          lat: location.lat,
          lng: location.lng,
          type: type,
          status: status,
          gpuModel: gpuModel,
          cpuModel: cpuModel,
          memory: memory,
          storage: storage,
          price: price,
          latency: latency,
          power:
            type === "high"
              ? "35 TFLOPS"
              : type === "mid"
              ? "25 TFLOPS"
              : type === "low"
              ? "15 TFLOPS"
              : "8 TFLOPS",
          owner: Math.random() > 0.7 ? "You" : "Network",
          connections: [],
          // Mining-specific details
          hashPower: hashPower,
          powerConsumption: powerConsumption,
          efficiency: efficiency,
          uptime: uptime,
          blocksFound: blocks,
          miningPool: miningPool,
          algorithm: algorithm,
          cooling: cooling,
          energySource: energySource,
          security: security,
          earnings24h: `$${(Math.random() * type === "high"
            ? 50
            : type === "mid"
            ? 30
            : type === "low"
            ? 15
            : 5
          ).toFixed(2)}`,
          lastActiveTime: new Date(Date.now() - Math.random() * 86400000),
        };
      });

      // Add random connections between nodes (to create a network)
      nodesData.forEach((node) => {
        // Each node connects to 2-5 other nodes
        const connectionCount = Math.floor(Math.random() * 4) + 2;
        const connectionIndices = [];

        for (let i = 0; i < connectionCount; i++) {
          let targetIndex;
          do {
            targetIndex = Math.floor(Math.random() * nodesData.length);
          } while (
            targetIndex === node.id - 1 ||
            connectionIndices.includes(targetIndex)
          );

          connectionIndices.push(targetIndex);
          node.connections.push(nodesData[targetIndex].id);
        }
      });

      setNodes(nodesData);

      // Set my nodes - any nodes where owner is 'You'
      const myNodesData = nodesData.filter((node) => node.owner === "You");
      setMyNodes(myNodesData);
    };

    generateNodes();

    // Generate some mock jobs
    const generateJobs = () => {
      const jobTypes = [
        "AI Training",
        "Rendering",
        "Data Analysis",
        "Scientific Computation",
      ];
      const jobStatuses = ["running", "completed", "queued"];

      const jobs = [];

      for (let i = 0; i < 5; i++) {
        const jobType = jobTypes[Math.floor(Math.random() * jobTypes.length)];
        const status =
          jobStatuses[Math.floor(Math.random() * jobStatuses.length)];
        const startTime = new Date(Date.now() - Math.random() * 86400000 * 3); // Random time in the last 3 days
        const duration = Math.floor(Math.random() * 120) + 10; // 10-130 minutes
        const endTime =
          status === "completed"
            ? new Date(startTime.getTime() + duration * 60000)
            : null;
        const nodesUsed = Math.floor(Math.random() * 5) + 1;
        const cost = (
          (nodesUsed * (Math.random() * 15 + 5) * duration) /
          60
        ).toFixed(2);

        jobs.push({
          id: i + 1,
          type: jobType,
          description: `${jobType} job #${i + 1}`,
          status: status,
          startTime: startTime,
          endTime: endTime,
          duration: duration,
          progress:
            status === "completed"
              ? 100
              : status === "running"
              ? Math.floor(Math.random() * 90) + 10
              : 0,
          nodesUsed: nodesUsed,
          cost: cost,
          bitcoinCost: (cost / (exchangeRates?.usd || 40000)).toFixed(8),
        });
      }

      setMyJobs(jobs);
    };

    generateJobs();
  }, [exchangeRates]);

  // Get node color based on type
  const getNodeColor = (type) => {
    switch (type) {
      case "high":
        return "#7928ca"; // Purple for high-end
      case "mid":
        return "#0070f3"; // Blue for mid-tier
      case "low":
        return "#f5a623"; // Orange for low-tier
      case "poor":
        return "#ff4757"; // Red for poor
      default:
        return "#0070f3";
    }
  };

  // This part replaces the canvas-based map with OpenStreetMap
  const mapCenter = mapMode === "user" ? [39.8283, -98.5795] : [20, 0]; // USA center vs World center
  const mapZoom = mapMode === "user" ? 4 : 2; // Closer zoom for USA, wider for world

  // Handle node rental
  const handleRentNode = async () => {
    setProcessing(true);

    try {
      // Simulate transaction to lightning network
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Calculate cost based on node type and duration
      const nodeTypePrice =
        nodeType === "high"
          ? 20
          : nodeType === "mid"
          ? 15
          : nodeType === "low"
          ? 10
          : 5;

      const durationHours = parseInt(duration) / 60;
      const totalCost = nodeTypePrice * durationHours;

      // Convert to BTC
      const costInBTC = totalCost / (exchangeRates?.usd || 40000);

      if (rentMode === "rent") {
        // Create a new job entry
        const newJob = {
          id: Date.now(),
          type: "Computing",
          description: `${nodeType.toUpperCase()} node rental`,
          status: "running",
          startTime: new Date(),
          endTime: new Date(Date.now() + parseInt(duration) * 60000),
          duration: parseInt(duration),
          progress: 0,
          nodesUsed: 1,
          cost: totalCost.toFixed(2),
          bitcoinCost: costInBTC.toFixed(8),
        };

        setMyJobs([newJob, ...myJobs]);

        // Create a virtual node entry that shows we're using a rented node
        const newNode = {
          id: Date.now(),
          name: `Rented-${nodeType.toUpperCase()}-${Math.floor(
            Math.random() * 1000
          )}`,
          location: "Global Network",
          type: nodeType,
          status: "active",
          gpuModel:
            nodeType === "high"
              ? "NVIDIA RTX 4090"
              : nodeType === "mid"
              ? "NVIDIA RTX 3080"
              : nodeType === "low"
              ? "AMD Radeon RX 6700 XT"
              : "NVIDIA GTX 1660",
          cpuModel:
            nodeType === "high"
              ? "AMD Ryzen 9 5950X"
              : nodeType === "mid"
              ? "Intel Core i7-12700K"
              : nodeType === "low"
              ? "AMD Ryzen 5 5600X"
              : "Intel Core i5-10400",
          memory:
            nodeType === "high"
              ? "64GB DDR5"
              : nodeType === "mid"
              ? "32GB DDR4"
              : nodeType === "low"
              ? "16GB DDR4"
              : "8GB DDR4",
          storage:
            nodeType === "high"
              ? "2TB NVMe SSD"
              : nodeType === "mid"
              ? "1TB NVMe SSD"
              : nodeType === "low"
              ? "500GB SSD"
              : "256GB SSD",
          price: nodeTypePrice,
          latency:
            nodeType === "high"
              ? "15ms"
              : nodeType === "mid"
              ? "25ms"
              : nodeType === "low"
              ? "35ms"
              : "50ms",
          power:
            nodeType === "high"
              ? "35 TFLOPS"
              : nodeType === "mid"
              ? "25 TFLOPS"
              : nodeType === "low"
              ? "15 TFLOPS"
              : "8 TFLOPS",
          owner: "Rented",
          rented: true,
          rentalEnd: new Date(Date.now() + parseInt(duration) * 60000),
        };

        // Update network stats
        setNetworkStats({
          ...networkStats,
          connectedNodes: networkStats.connectedNodes + 1,
          activeJobs: networkStats.activeJobs + 1,
        });

        setTransactionResult({
          success: true,
          message: "Node rental successful!",
          details: {
            type: nodeType,
            duration: `${duration} minutes`,
            cost: `$${totalCost.toFixed(2)} (${costInBTC.toFixed(8)} BTC)`,
            job: newJob,
          },
        });
      } else {
        // Providing a node to the network
        // First, simulate hardware detection
        const detectedHardware = {
          gpuModel: "NVIDIA RTX 3080",
          cpuModel: "AMD Ryzen 7 5800X",
          memory: "32GB DDR4",
          storage: "1TB NVMe SSD",
          type: "mid",
          power: "25 TFLOPS",
        };

        // Create a new node
        const newNode = {
          id: Date.now(),
          name: `Node-${Math.floor(
            Math.random() * 1000
          )}-${detectedHardware.type.toUpperCase()}`,
          location: "Your Location",
          lat: 37.7749, // Default to San Francisco for example
          lng: -122.4194,
          type: detectedHardware.type,
          status: "active",
          gpuModel: detectedHardware.gpuModel,
          cpuModel: detectedHardware.cpuModel,
          memory: detectedHardware.memory,
          storage: detectedHardware.storage,
          price: 15, // Mid-tier price
          latency: "25ms",
          power: detectedHardware.power,
          owner: "You",
          provided: true,
          provideEnd: new Date(Date.now() + parseInt(duration) * 60000),
          hashPower: "175.5 TH/s",
          powerConsumption: "1350 W",
          efficiency: "38.5 J/TH",
          uptime: "99.7%",
          blocksFound: 0,
          miningPool: "Foundry USA",
          algorithm: "SHA-256",
          cooling: "Air Cooled",
          energySource: "Grid",
          security: "Multi-sig",
          earnings24h: "$0.00",
          lastActiveTime: new Date(),
        };

        setMyNodes([...myNodes, newNode]);

        // Update network stats
        setNetworkStats({
          ...networkStats,
          connectedNodes: networkStats.connectedNodes + 1,
          totalPower: `${parseInt(networkStats.totalPower) + 25} TFLOPS`,
        });

        // Calculate earnings based on node type and duration
        const earnings = 15 * (parseInt(duration) / 60); // $15/hour for mid-tier
        const earningsInBTC = earnings / (exchangeRates?.usd || 40000);

        setTransactionResult({
          success: true,
          message: "Your node has been added to the Lightning Network!",
          details: {
            type: detectedHardware.type,
            duration: `${duration} minutes`,
            earnings: `$${earnings.toFixed(2)} (${earningsInBTC.toFixed(
              8
            )} BTC)`,
            node: newNode,
          },
        });
      }

      setShowConfirmation(false);
    } catch (error) {
      setTransactionResult({
        success: false,
        message:
          error.message || "Failed to process request. Please try again.",
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="lightning-network-container">
      <h1 style={{ marginBottom: "30px" }}>Lightning Network</h1>

      <div
        className="lightning-tabs"
        style={{
          display: "flex",
          borderBottom: "1px solid var(--border-color)",
          marginBottom: "30px",
        }}
      >
        <button
          className={`tab ${activeTab === "map" ? "active" : ""}`}
          onClick={() => setActiveTab("map")}
          style={{
            padding: "10px 20px",
            background: "transparent",
            border: "none",
            borderBottom:
              activeTab === "map"
                ? "2px solid var(--accent-primary)"
                : "2px solid transparent",
            color:
              activeTab === "map"
                ? "var(--accent-primary)"
                : "var(--text-primary)",
            cursor: "pointer",
            fontWeight: activeTab === "map" ? "bold" : "normal",
            transition: "all 0.3s ease",
          }}
        >
          Network Map
        </button>
        <button
          className={`tab ${activeTab === "rent" ? "active" : ""}`}
          onClick={() => setActiveTab("rent")}
          style={{
            padding: "10px 20px",
            background: "transparent",
            border: "none",
            borderBottom:
              activeTab === "rent"
                ? "2px solid var(--accent-primary)"
                : "2px solid transparent",
            color:
              activeTab === "rent"
                ? "var(--accent-primary)"
                : "var(--text-primary)",
            cursor: "pointer",
            fontWeight: activeTab === "rent" ? "bold" : "normal",
            transition: "all 0.3s ease",
          }}
        >
          Rent/Provide
        </button>
        <button
          className={`tab ${activeTab === "manage" ? "active" : ""}`}
          onClick={() => setActiveTab("manage")}
          style={{
            padding: "10px 20px",
            background: "transparent",
            border: "none",
            borderBottom:
              activeTab === "manage"
                ? "2px solid var(--accent-primary)"
                : "2px solid transparent",
            color:
              activeTab === "manage"
                ? "var(--accent-primary)"
                : "var(--text-primary)",
            cursor: "pointer",
            fontWeight: activeTab === "manage" ? "bold" : "normal",
            transition: "all 0.3s ease",
          }}
        >
          Manage
        </button>
      </div>

      {activeTab === "map" && (
        <div className="map-tab fade-in">
          <div
            className="map-controls"
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <div
              className="view-modes"
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <button
                className={`mode-btn ${mapMode === "user" ? "active" : ""}`}
                onClick={() => setMapMode("user")}
                style={{
                  padding: "8px 15px",
                  background:
                    mapMode === "user"
                      ? "var(--accent-primary)"
                      : "rgba(255, 255, 255, 0.05)",
                  border: "none",
                  borderRadius: "8px",
                  color: mapMode === "user" ? "white" : "var(--text-primary)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                Your Network
              </button>
              <button
                className={`mode-btn ${mapMode === "global" ? "active" : ""}`}
                onClick={() => setMapMode("global")}
                style={{
                  padding: "8px 15px",
                  background:
                    mapMode === "global"
                      ? "var(--accent-primary)"
                      : "rgba(255, 255, 255, 0.05)",
                  border: "none",
                  borderRadius: "8px",
                  color: mapMode === "global" ? "white" : "var(--text-primary)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                Global Network
              </button>
            </div>

            <div
              className="network-stats"
              style={{
                display: "flex",
                gap: "15px",
              }}
            >
              <div
                className="network-stats-card"
                style={{ textAlign: "center" }}
              >
                <p
                  style={{
                    margin: "0",
                    fontSize: "14px",
                    color: "var(--text-secondary)",
                  }}
                >
                  Nodes
                </p>
                <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                  {networkStats.connectedNodes}
                </p>
              </div>
              <div
                className="network-stats-card"
                style={{ textAlign: "center" }}
              >
                <p
                  style={{
                    margin: "0",
                    fontSize: "14px",
                    color: "var(--text-secondary)",
                  }}
                >
                  Power
                </p>
                <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                  {networkStats.totalPower}
                </p>
              </div>
              <div
                className="network-stats-card"
                style={{ textAlign: "center" }}
              >
                <p
                  style={{
                    margin: "0",
                    fontSize: "14px",
                    color: "var(--text-secondary)",
                  }}
                >
                  Jobs
                </p>
                <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                  {networkStats.activeJobs}
                </p>
              </div>
              <div
                className="network-stats-card"
                style={{ textAlign: "center" }}
              >
                <p
                  style={{
                    margin: "0",
                    fontSize: "14px",
                    color: "var(--text-secondary)",
                  }}
                >
                  Latency
                </p>
                <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                  {networkStats.avgLatency}
                </p>
              </div>
              <div
                className="network-stats-card"
                style={{ textAlign: "center" }}
              >
                <p
                  style={{
                    margin: "0",
                    fontSize: "14px",
                    color: "var(--text-secondary)",
                  }}
                >
                  Hash Rate
                </p>
                <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                  {networkStats.hashRate}
                </p>
              </div>
            </div>
          </div>

          <div
            className="map-container card"
            style={{ height: "500px", position: "relative" }}
          >
            {/* OpenStreetMap Integration */}
            <div style={{ height: "100%", width: "100%" }}>
              <MapContainer
                center={mapCenter}
                zoom={mapZoom}
                style={{ height: "100%", width: "100%" }}
                zoomControl={true}
                ref={mapRef}
                className="map-container"
              >
                <LayersControl position="topright">
                  <LayersControl.BaseLayer checked name="Street Map">
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                  </LayersControl.BaseLayer>
                  <LayersControl.BaseLayer name="Satellite">
                    <TileLayer
                      attribution="&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
                      url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    />
                  </LayersControl.BaseLayer>
                  <LayersControl.BaseLayer name="Terrain">
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                    />
                  </LayersControl.BaseLayer>
                </LayersControl>

                {/* Node Connections (Lines between nodes) */}
                {nodes
                  .filter(
                    (node) =>
                      mapMode === "global" ||
                      (mapMode === "user" && node.owner === "You")
                  )
                  .map((node) =>
                    node.connections.map((connectionId) => {
                      const connectedNode = nodes.find(
                        (n) => n.id === connectionId
                      );
                      if (
                        connectedNode &&
                        (mapMode === "global" || connectedNode.owner === "You")
                      ) {
                        return (
                          <Polyline
                            key={`${node.id}-${connectionId}`}
                            positions={[
                              [node.lat, node.lng],
                              [connectedNode.lat, connectedNode.lng],
                            ]}
                            color={getNodeColor(node.type)}
                            opacity={0.3}
                            weight={1}
                            className={
                              showAnimations ? "network-connection" : ""
                            }
                            dashOffset={5}
                          />
                        );
                      }
                      return null;
                    })
                  )}

                {/* Map Nodes */}
                {nodes
                  .filter(
                    (node) =>
                      mapMode === "global" ||
                      (mapMode === "user" && node.owner === "You")
                  )
                  .map((node) => (
                    <CircleMarker
                      key={node.id}
                      center={[node.lat, node.lng]}
                      radius={node.status === "active" ? 8 : 6}
                      fillColor={getNodeColor(node.type)}
                      color={
                        node.owner === "You"
                          ? "#00ff95"
                          : getNodeColor(node.type)
                      }
                      weight={node.owner === "You" ? 2 : 1}
                      fillOpacity={0.8}
                      className={`node-marker ${
                        node.status === "active" && showAnimations
                          ? "node-pulse"
                          : ""
                      }`}
                      eventHandlers={{
                        click: () => {
                          setSelectedNode(node);
                          setShowNodeDetails(true);
                        },
                      }}
                    >
                      <Tooltip className="node-popup">
                        <div>
                          <h4 style={{ margin: "0 0 5px 0" }}>{node.name}</h4>
                          <p style={{ margin: "0 0 3px 0" }}>
                            Location: {node.location}
                          </p>
                          <p style={{ margin: "0 0 3px 0" }}>
                            Type: {node.type} ({node.status})
                          </p>
                          <p style={{ margin: "0 0 3px 0" }}>
                            Owner: {node.owner}
                          </p>
                          <p style={{ margin: "0 0 3px 0" }}>
                            Hash Power: {node.hashPower}
                          </p>
                          <p style={{ margin: "0" }}>Click for more details</p>
                        </div>
                      </Tooltip>
                    </CircleMarker>
                  ))}
              </MapContainer>
            </div>

            <div
              className="map-legend"
              style={{
                position: "absolute",
                bottom: "20px",
                left: "20px",
                background: "rgba(0, 0, 0, 0.7)",
                padding: "10px",
                borderRadius: "8px",
                zIndex: 1000,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "5px",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "#7928ca",
                    marginRight: "5px",
                  }}
                ></span>
                <span>High-end Node</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "5px",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "#0070f3",
                    marginRight: "5px",
                  }}
                ></span>
                <span>Mid-tier Node</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "5px",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "#f5a623",
                    marginRight: "5px",
                  }}
                ></span>
                <span>Low-tier Node</span>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span
                  style={{
                    display: "inline-block",
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "#ff4757",
                    marginRight: "5px",
                  }}
                ></span>
                <span>Basic Node</span>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <div
              className="node-tips"
              style={{
                color: "var(--text-secondary)",
                fontSize: "14px",
              }}
            >
              Click on any node to view details. Active nodes are larger.
            </div>

            <div className="map-options">
              <button
                onClick={() => setShowAnimations(!showAnimations)}
                style={{
                  background: "transparent",
                  border: "1px solid var(--border-color)",
                  borderRadius: "6px",
                  padding: "5px 10px",
                  color: "var(--text-primary)",
                  cursor: "pointer",
                  fontSize: "14px",
                  transition: "all 0.3s ease",
                }}
              >
                {showAnimations ? "Disable Animations" : "Enable Animations"}
              </button>
              <button
                onClick={() => setShowMinerDetails(!showMinerDetails)}
                style={{
                  background: "transparent",
                  border: "1px solid var(--border-color)",
                  borderRadius: "6px",
                  padding: "5px 10px",
                  color: "var(--text-primary)",
                  cursor: "pointer",
                  fontSize: "14px",
                  marginLeft: "10px",
                  transition: "all 0.3s ease",
                }}
              >
                {showMinerDetails ? "Hide Mining Stats" : "Show Mining Stats"}
              </button>
            </div>
          </div>

          {/* Mining Stats Panel */}
          {showMinerDetails && (
            <div
              className="mining-stats-panel slide-in card"
              style={{ marginTop: "20px", padding: "20px" }}
            >
              <h3 style={{ marginBottom: "15px" }}>
                Lightning Network Mining Stats
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "20px",
                }}
              >
                <div>
                  <h4 style={{ marginBottom: "10px" }}>Network Overview</h4>
                  <div className="mining-stat">
                    <div
                      className="mining-stat-icon"
                      style={{ background: "rgba(0, 112, 243, 0.2)" }}
                    >
                      ⚡
                    </div>
                    <div>
                      <p
                        style={{
                          margin: "0",
                          fontSize: "14px",
                          color: "var(--text-secondary)",
                        }}
                      >
                        Network Hash Rate
                      </p>
                      <p style={{ margin: "0", fontWeight: "bold" }}>
                        {networkStats.hashRate}
                      </p>
                    </div>
                  </div>
                  <div className="mining-stat">
                    <div
                      className="mining-stat-icon"
                      style={{ background: "rgba(121, 40, 202, 0.2)" }}
                    >
                      🔗
                    </div>
                    <div>
                      <p
                        style={{
                          margin: "0",
                          fontSize: "14px",
                          color: "var(--text-secondary)",
                        }}
                      >
                        Difficulty
                      </p>
                      <p style={{ margin: "0", fontWeight: "bold" }}>
                        {networkStats.difficulty}
                      </p>
                    </div>
                  </div>
                  <div className="mining-stat">
                    <div
                      className="mining-stat-icon"
                      style={{ background: "rgba(245, 166, 35, 0.2)" }}
                    >
                      💾
                    </div>
                    <div>
                      <p
                        style={{
                          margin: "0",
                          fontSize: "14px",
                          color: "var(--text-secondary)",
                        }}
                      >
                        Blockchain Size
                      </p>
                      <p style={{ margin: "0", fontWeight: "bold" }}>
                        {networkStats.blockchainSize}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 style={{ marginBottom: "10px" }}>Mining Pools</h4>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    {Object.entries(networkStats.poolDistribution).map(
                      ([pool, percentage]) => (
                        <div
                          key={pool}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <div style={{ flex: 1 }}>{pool}</div>
                          <div
                            style={{
                              width: "200px",
                              height: "8px",
                              background: "rgba(255, 255, 255, 0.1)",
                              borderRadius: "4px",
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                height: "100%",
                                width: percentage,
                                background:
                                  pool === "Foundry USA"
                                    ? "#7928ca"
                                    : pool === "AntPool"
                                    ? "#0070f3"
                                    : pool === "F2Pool"
                                    ? "#f5a623"
                                    : pool === "Binance Pool"
                                    ? "#00ff95"
                                    : pool === "ViaBTC"
                                    ? "#ff4757"
                                    : "#888",
                                borderRadius: "4px",
                              }}
                            ></div>
                          </div>
                          <div style={{ width: "50px", textAlign: "right" }}>
                            {percentage}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <h4 style={{ marginBottom: "10px" }}>
                    Miner Types Distribution
                  </h4>
                  <div className="mining-stat">
                    <div
                      className="mining-stat-icon"
                      style={{ background: "rgba(121, 40, 202, 0.2)" }}
                    >
                      H
                    </div>
                    <div>
                      <p
                        style={{
                          margin: "0",
                          fontSize: "14px",
                          color: "var(--text-secondary)",
                        }}
                      >
                        High-End Miners
                      </p>
                      <p style={{ margin: "0", fontWeight: "bold" }}>
                        {nodes.filter((n) => n.type === "high").length} nodes
                      </p>
                    </div>
                  </div>
                  <div className="mining-stat">
                    <div
                      className="mining-stat-icon"
                      style={{ background: "rgba(0, 112, 243, 0.2)" }}
                    >
                      M
                    </div>
                    <div>
                      <p
                        style={{
                          margin: "0",
                          fontSize: "14px",
                          color: "var(--text-secondary)",
                        }}
                      >
                        Mid-Tier Miners
                      </p>
                      <p style={{ margin: "0", fontWeight: "bold" }}>
                        {nodes.filter((n) => n.type === "mid").length} nodes
                      </p>
                    </div>
                  </div>
                  <div className="mining-stat">
                    <div
                      className="mining-stat-icon"
                      style={{ background: "rgba(245, 166, 35, 0.2)" }}
                    >
                      L
                    </div>
                    <div>
                      <p
                        style={{
                          margin: "0",
                          fontSize: "14px",
                          color: "var(--text-secondary)",
                        }}
                      >
                        Low-Tier Miners
                      </p>
                      <p style={{ margin: "0", fontWeight: "bold" }}>
                        {nodes.filter((n) => n.type === "low").length} nodes
                      </p>
                    </div>
                  </div>
                  <div className="mining-stat">
                    <div
                      className="mining-stat-icon"
                      style={{ background: "rgba(255, 71, 87, 0.2)" }}
                    >
                      B
                    </div>
                    <div>
                      <p
                        style={{
                          margin: "0",
                          fontSize: "14px",
                          color: "var(--text-secondary)",
                        }}
                      >
                        Basic Miners
                      </p>
                      <p style={{ margin: "0", fontWeight: "bold" }}>
                        {nodes.filter((n) => n.type === "poor").length} nodes
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "rent" && (
        <div className="rent-tab fade-in">
          <div className="card" style={{ marginBottom: "30px" }}>
            <h3 style={{ marginBottom: "20px" }}>
              Lightning Network Computing
            </h3>
            <p style={{ marginBottom: "20px" }}>
              Join the decentralized computing revolution. Rent computing power
              for your tasks or provide your unused GPU power to earn Bitcoin.
            </p>

            <div
              className="rent-options"
              style={{
                display: "flex",
                gap: "20px",
                marginBottom: "30px",
              }}
            >
              <div
                className={`rent-option ${rentMode === "rent" ? "active" : ""}`}
                style={{
                  flex: 1,
                  background:
                    rentMode === "rent"
                      ? "rgba(0, 112, 243, 0.1)"
                      : "rgba(255, 255, 255, 0.05)",
                  borderRadius: "8px",
                  padding: "20px",
                  cursor: "pointer",
                  border:
                    rentMode === "rent"
                      ? "1px solid var(--accent-primary)"
                      : "1px solid var(--border-color)",
                  transition: "transform 0.2s ease",
                }}
                onClick={() => setRentMode("rent")}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-5px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <div
                  style={{
                    fontSize: "32px",
                    marginBottom: "10px",
                    textAlign: "center",
                  }}
                >
                  ⚡
                </div>
                <h3 style={{ textAlign: "center", marginBottom: "15px" }}>
                  Rent Computing Power
                </h3>
                <p style={{ color: "var(--text-secondary)" }}>
                  Access high-performance GPUs for AI training, rendering, and
                  scientific computations. Pay only for what you use.
                </p>
                <div
                  style={{
                    marginTop: "15px",
                    textAlign: "center",
                    padding: "10px",
                    background: "rgba(0, 112, 243, 0.05)",
                    borderRadius: "8px",
                  }}
                >
                  <p style={{ margin: "0", fontWeight: "bold" }}>
                    Starting at $5/hour
                  </p>
                  <p
                    style={{
                      margin: "5px 0 0 0",
                      fontSize: "14px",
                      color: "var(--text-secondary)",
                    }}
                  >
                    Pay with Bitcoin
                  </p>
                </div>
              </div>

              <div
                className={`provide-option ${
                  rentMode === "provide" ? "active" : ""
                }`}
                style={{
                  flex: 1,
                  background:
                    rentMode === "provide"
                      ? "rgba(0, 255, 149, 0.1)"
                      : "rgba(255, 255, 255, 0.05)",
                  borderRadius: "8px",
                  padding: "20px",
                  cursor: "pointer",
                  border:
                    rentMode === "provide"
                      ? "1px solid var(--accent-secondary)"
                      : "1px solid var(--border-color)",
                  transition: "transform 0.2s ease",
                }}
                onClick={() => setRentMode("provide")}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-5px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <div
                  style={{
                    fontSize: "32px",
                    marginBottom: "10px",
                    textAlign: "center",
                  }}
                >
                  💰
                </div>
                <h3 style={{ textAlign: "center", marginBottom: "15px" }}>
                  Provide Your GPU
                </h3>
                <p style={{ color: "var(--text-secondary)" }}>
                  Share your unused GPU power and earn Bitcoin. Your computer
                  works for you while you're away.
                </p>
                <div
                  style={{
                    marginTop: "15px",
                    textAlign: "center",
                    padding: "10px",
                    background: "rgba(0, 255, 149, 0.05)",
                    borderRadius: "8px",
                  }}
                >
                  <p style={{ margin: "0", fontWeight: "bold" }}>
                    Earn up to $20/hour
                  </p>
                  <p
                    style={{
                      margin: "5px 0 0 0",
                      fontSize: "14px",
                      color: "var(--text-secondary)",
                    }}
                  >
                    Paid in Bitcoin
                  </p>
                </div>
              </div>
            </div>

            {rentMode === "rent" ? (
              <div className="rent-form slide-in">
                <h3 style={{ marginBottom: "20px" }}>Rent a Computing Node</h3>

                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "10px" }}>
                    Node Type
                  </label>
                  <div
                    className="node-types"
                    style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
                  >
                    <button
                      type="button"
                      className={nodeType === "high" ? "active" : ""}
                      onClick={() => setNodeType("high")}
                      style={{
                        padding: "10px 15px",
                        background:
                          nodeType === "high"
                            ? "rgba(121, 40, 202, 0.2)"
                            : "rgba(255, 255, 255, 0.05)",
                        border:
                          nodeType === "high"
                            ? "1px solid #7928ca"
                            : "1px solid var(--border-color)",
                        borderRadius: "8px",
                        cursor: "pointer",
                        color:
                          nodeType === "high"
                            ? "#7928ca"
                            : "var(--text-primary)",
                        flex: "1",
                        minWidth: "120px",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <div style={{ textAlign: "center" }}>
                        <p style={{ margin: "0", fontWeight: "bold" }}>
                          High-End
                        </p>
                        <p
                          style={{
                            margin: "5px 0 0 0",
                            fontSize: "12px",
                            color: "var(--text-secondary)",
                          }}
                        >
                          $20/hour
                        </p>
                        <p style={{ margin: "5px 0 0 0", fontSize: "12px" }}>
                          RTX 4090
                        </p>
                      </div>
                    </button>

                    <button
                      type="button"
                      className={nodeType === "mid" ? "active" : ""}
                      onClick={() => setNodeType("mid")}
                      style={{
                        padding: "10px 15px",
                        background:
                          nodeType === "mid"
                            ? "rgba(0, 112, 243, 0.2)"
                            : "rgba(255, 255, 255, 0.05)",
                        border:
                          nodeType === "mid"
                            ? "1px solid #0070f3"
                            : "1px solid var(--border-color)",
                        borderRadius: "8px",
                        cursor: "pointer",
                        color:
                          nodeType === "mid"
                            ? "#0070f3"
                            : "var(--text-primary)",
                        flex: "1",
                        minWidth: "120px",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <div style={{ textAlign: "center" }}>
                        <p style={{ margin: "0", fontWeight: "bold" }}>
                          Mid-Tier
                        </p>
                        <p
                          style={{
                            margin: "5px 0 0 0",
                            fontSize: "12px",
                            color: "var(--text-secondary)",
                          }}
                        >
                          $15/hour
                        </p>
                        <p style={{ margin: "5px 0 0 0", fontSize: "12px" }}>
                          RTX 3080
                        </p>
                      </div>
                    </button>

                    <button
                      type="button"
                      className={nodeType === "low" ? "active" : ""}
                      onClick={() => setNodeType("low")}
                      style={{
                        padding: "10px 15px",
                        background:
                          nodeType === "low"
                            ? "rgba(245, 166, 35, 0.2)"
                            : "rgba(255, 255, 255, 0.05)",
                        border:
                          nodeType === "low"
                            ? "1px solid #f5a623"
                            : "1px solid var(--border-color)",
                        borderRadius: "8px",
                        cursor: "pointer",
                        color:
                          nodeType === "low"
                            ? "#f5a623"
                            : "var(--text-primary)",
                        flex: "1",
                        minWidth: "120px",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <div style={{ textAlign: "center" }}>
                        <p style={{ margin: "0", fontWeight: "bold" }}>
                          Low-Tier
                        </p>
                        <p
                          style={{
                            margin: "5px 0 0 0",
                            fontSize: "12px",
                            color: "var(--text-secondary)",
                          }}
                        >
                          $10/hour
                        </p>
                        <p style={{ margin: "5px 0 0 0", fontSize: "12px" }}>
                          RX 6700 XT
                        </p>
                      </div>
                    </button>

                    <button
                      type="button"
                      className={nodeType === "poor" ? "active" : ""}
                      onClick={() => setNodeType("poor")}
                      style={{
                        padding: "10px 15px",
                        background:
                          nodeType === "poor"
                            ? "rgba(255, 71, 87, 0.2)"
                            : "rgba(255, 255, 255, 0.05)",
                        border:
                          nodeType === "poor"
                            ? "1px solid #ff4757"
                            : "1px solid var(--border-color)",
                        borderRadius: "8px",
                        cursor: "pointer",
                        color:
                          nodeType === "poor"
                            ? "#ff4757"
                            : "var(--text-primary)",
                        flex: "1",
                        minWidth: "120px",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <div style={{ textAlign: "center" }}>
                        <p style={{ margin: "0", fontWeight: "bold" }}>Basic</p>
                        <p
                          style={{
                            margin: "5px 0 0 0",
                            fontSize: "12px",
                            color: "var(--text-secondary)",
                          }}
                        >
                          $5/hour
                        </p>
                        <p style={{ margin: "5px 0 0 0", fontSize: "12px" }}>
                          GTX 1660
                        </p>
                      </div>
                    </button>
                  </div>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "5px" }}>
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    min="10"
                    max="1440"
                    step="10"
                    placeholder="Enter duration in minutes"
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid var(--border-color)",
                      borderRadius: "8px",
                      padding: "10px",
                      width: "100%",
                      color: "var(--text-primary)",
                      transition: "all 0.3s ease",
                    }}
                  />
                  <p
                    style={{
                      margin: "5px 0 0 0",
                      fontSize: "14px",
                      color: "var(--text-secondary)",
                    }}
                  >
                    Minimum: 10 minutes, Maximum: 24 hours
                  </p>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "5px" }}>
                    Cost Estimate
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
                      <p style={{ margin: "0" }}>Node Type:</p>
                      <p style={{ margin: "0", textTransform: "capitalize" }}>
                        {nodeType}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                      }}
                    >
                      <p style={{ margin: "0" }}>Hourly Rate:</p>
                      <p style={{ margin: "0" }}>
                        $
                        {nodeType === "high"
                          ? "20"
                          : nodeType === "mid"
                          ? "15"
                          : nodeType === "low"
                          ? "10"
                          : "5"}
                        /hour
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                      }}
                    >
                      <p style={{ margin: "0" }}>Duration:</p>
                      <p style={{ margin: "0" }}>{duration} minutes</p>
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
                        Total Cost:
                      </p>
                      <div style={{ textAlign: "right" }}>
                        <p style={{ margin: "0", fontWeight: "bold" }}>
                          $
                          {(
                            (nodeType === "high"
                              ? 20
                              : nodeType === "mid"
                              ? 15
                              : nodeType === "low"
                              ? 10
                              : 5) *
                            (parseInt(duration) / 60)
                          ).toFixed(2)}
                        </p>
                        <p
                          style={{
                            margin: "5px 0 0 0",
                            fontSize: "14px",
                            color: "var(--text-secondary)",
                          }}
                        >
                          {(
                            ((nodeType === "high"
                              ? 20
                              : nodeType === "mid"
                              ? 15
                              : nodeType === "low"
                              ? 10
                              : 5) *
                              (parseInt(duration) / 60)) /
                            (exchangeRates?.usd || 40000)
                          ).toFixed(8)}{" "}
                          BTC
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowConfirmation(true)}
                  disabled={!duration || parseInt(duration) < 10 || processing}
                  className="btn"
                  style={{
                    width: "100%",
                    transition: "all 0.3s ease",
                    transform:
                      duration && parseInt(duration) >= 10 && !processing
                        ? "scale(1)"
                        : "scale(0.98)",
                    opacity:
                      duration && parseInt(duration) >= 10 && !processing
                        ? 1
                        : 0.7,
                  }}
                >
                  {processing ? "Processing..." : "Rent Node"}
                </button>
              </div>
            ) : (
              <div className="provide-form slide-in">
                <h3 style={{ marginBottom: "20px" }}>
                  Provide Your Computing Power
                </h3>

                <div
                  style={{
                    background: "rgba(0, 255, 149, 0.1)",
                    borderRadius: "8px",
                    padding: "15px",
                    marginBottom: "20px",
                    border: "1px solid var(--accent-secondary)",
                  }}
                >
                  <h4
                    style={{
                      marginBottom: "10px",
                      color: "var(--accent-secondary)",
                    }}
                  >
                    Hardware Detection
                  </h4>
                  <p style={{ marginBottom: "15px" }}>
                    We've detected the following hardware on your system:
                  </p>
                  <div style={{ marginBottom: "10px" }}>
                    <p
                      style={{
                        margin: "0",
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      GPU:
                    </p>
                    <p style={{ margin: "0", fontWeight: "bold" }}>
                      NVIDIA RTX 3080
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
                      CPU:
                    </p>
                    <p style={{ margin: "0", fontWeight: "bold" }}>
                      AMD Ryzen 7 5800X
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
                      Memory:
                    </p>
                    <p style={{ margin: "0", fontWeight: "bold" }}>32GB DDR4</p>
                  </div>
                  <div style={{ marginBottom: "10px" }}>
                    <p
                      style={{
                        margin: "0",
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      Storage:
                    </p>
                    <p style={{ margin: "0", fontWeight: "bold" }}>
                      1TB NVMe SSD
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
                      Estimated Performance:
                    </p>
                    <p style={{ margin: "0", fontWeight: "bold" }}>25 TFLOPS</p>
                  </div>
                  <div style={{ marginBottom: "10px" }}>
                    <p
                      style={{
                        margin: "0",
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      Mining Capability:
                    </p>
                    <p style={{ margin: "0", fontWeight: "bold" }}>
                      175.5 TH/s
                    </p>
                  </div>
                  <div style={{ marginBottom: "0" }}>
                    <p
                      style={{
                        margin: "0",
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      Estimated Earnings:
                    </p>
                    <p
                      style={{
                        margin: "0",
                        fontWeight: "bold",
                        color: "var(--accent-secondary)",
                      }}
                    >
                      $15 per hour
                    </p>
                  </div>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "5px" }}>
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    min="10"
                    max="1440"
                    step="10"
                    placeholder="Enter duration in minutes"
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid var(--border-color)",
                      borderRadius: "8px",
                      padding: "10px",
                      width: "100%",
                      color: "var(--text-primary)",
                      transition: "all 0.3s ease",
                    }}
                  />
                  <p
                    style={{
                      margin: "5px 0 0 0",
                      fontSize: "14px",
                      color: "var(--text-secondary)",
                    }}
                  >
                    Minimum: 10 minutes, Maximum: 24 hours
                  </p>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "5px" }}>
                    Earnings Estimate
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
                      <p style={{ margin: "0" }}>Node Type:</p>
                      <p style={{ margin: "0" }}>Mid-Tier (Detected)</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                      }}
                    >
                      <p style={{ margin: "0" }}>Hourly Rate:</p>
                      <p style={{ margin: "0" }}>$15/hour</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                      }}
                    >
                      <p style={{ margin: "0" }}>Duration:</p>
                      <p style={{ margin: "0" }}>{duration} minutes</p>
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
                        Total Earnings:
                      </p>
                      <div style={{ textAlign: "right" }}>
                        <p
                          style={{
                            margin: "0",
                            fontWeight: "bold",
                            color: "var(--accent-secondary)",
                          }}
                        >
                          ${(15 * (parseInt(duration) / 60)).toFixed(2)}
                        </p>
                        <p
                          style={{
                            margin: "5px 0 0 0",
                            fontSize: "14px",
                            color: "var(--text-secondary)",
                          }}
                        >
                          {(
                            (15 * (parseInt(duration) / 60)) /
                            (exchangeRates?.usd || 40000)
                          ).toFixed(8)}{" "}
                          BTC
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <p
                  style={{
                    color: "var(--text-secondary)",
                    marginBottom: "20px",
                    fontSize: "14px",
                  }}
                >
                  Note: Your computer will be utilized by the Lightning Network
                  during the specified duration. Make sure you have a stable
                  internet connection and power supply.
                </p>

                <button
                  onClick={() => setShowConfirmation(true)}
                  disabled={!duration || parseInt(duration) < 10 || processing}
                  className="btn"
                  style={{
                    width: "100%",
                    background: "var(--accent-secondary)",
                    transition: "all 0.3s ease",
                    transform:
                      duration && parseInt(duration) >= 10 && !processing
                        ? "scale(1)"
                        : "scale(0.98)",
                    opacity:
                      duration && parseInt(duration) >= 10 && !processing
                        ? 1
                        : 0.7,
                  }}
                >
                  {processing ? "Processing..." : "Provide Node"}
                </button>
              </div>
            )}
          </div>

          {transactionResult && (
            <div
              className={`transaction-result ${
                transactionResult.success ? "success" : "error"
              } fade-in`}
              style={{
                padding: "20px",
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
              <h3 style={{ marginBottom: "15px" }}>
                {transactionResult.success ? "Success!" : "Error!"}
              </h3>
              <p style={{ marginBottom: "15px" }}>
                {transactionResult.message}
              </p>

              {transactionResult.success && transactionResult.details && (
                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                    padding: "15px",
                  }}
                >
                  <h4 style={{ marginBottom: "10px" }}>
                    {rentMode === "rent" ? "Rental Details" : "Node Details"}
                  </h4>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                  >
                    <p style={{ margin: "0" }}>Node Type:</p>
                    <p style={{ margin: "0", textTransform: "capitalize" }}>
                      {transactionResult.details.type}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                  >
                    <p style={{ margin: "0" }}>Duration:</p>
                    <p style={{ margin: "0" }}>
                      {transactionResult.details.duration}
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
                      {rentMode === "rent" ? "Cost:" : "Earnings:"}
                    </p>
                    <p style={{ margin: "0" }}>
                      {transactionResult.details.cost ||
                        transactionResult.details.earnings}
                    </p>
                  </div>
                  {rentMode === "rent" && (
                    <button
                      className="btn"
                      style={{ width: "100%", marginTop: "15px" }}
                      onClick={() => setActiveTab("manage")}
                    >
                      Manage Your Computing Job
                    </button>
                  )}
                  {rentMode === "provide" && (
                    <button
                      className="btn"
                      style={{
                        width: "100%",
                        marginTop: "15px",
                        background: "var(--accent-secondary)",
                      }}
                      onClick={() => setActiveTab("manage")}
                    >
                      Manage Your Node
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {activeTab === "manage" && (
        <div className="manage-tab fade-in">
          <div
            className="grid-container"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: "30px",
            }}
          >
            <div className="card">
              <h3 style={{ marginBottom: "20px" }}>My Nodes</h3>

              {myNodes.length > 0 ? (
                <div className="my-nodes-list">
                  {myNodes.map((node) => (
                    <div
                      key={node.id}
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        borderRadius: "8px",
                        padding: "15px",
                        marginBottom: "15px",
                        transition: "all 0.3s ease",
                      }}
                      className="node-detail-transition"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-5px)";
                        e.currentTarget.style.boxShadow =
                          "0 5px 15px rgba(0, 0, 0, 0.2)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
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
                          <h4 style={{ margin: "0 0 5px 0" }}>{node.name}</h4>
                          <p
                            style={{
                              margin: "0",
                              fontSize: "14px",
                              color: "var(--text-secondary)",
                            }}
                          >
                            {node.gpuModel}
                          </p>
                        </div>
                        <span
                          style={{
                            background:
                              node.status === "active"
                                ? "rgba(0, 255, 149, 0.1)"
                                : "rgba(255, 255, 255, 0.1)",
                            color:
                              node.status === "active"
                                ? "var(--accent-secondary)"
                                : "var(--text-primary)",
                            borderRadius: "20px",
                            padding: "2px 8px",
                            fontSize: "12px",
                            textTransform: "capitalize",
                          }}
                        >
                          {node.status}
                        </span>
                      </div>

                      <div
                        style={{
                          margin: "15px 0",
                          display: "grid",
                          gridTemplateColumns: "repeat(2, 1fr)",
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
                            Type
                          </p>
                          <p
                            style={{
                              margin: "5px 0 0 0",
                              textTransform: "capitalize",
                            }}
                          >
                            {node.type}
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
                            Hash Power
                          </p>
                          <p style={{ margin: "5px 0 0 0" }}>
                            {node.hashPower || "25 TH/s"}
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
                            Earnings Rate
                          </p>
                          <p style={{ margin: "5px 0 0 0" }}>
                            ${node.price}/hour
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
                            Blocks Found
                          </p>
                          <p style={{ margin: "5px 0 0 0" }}>
                            {node.blocksFound || "0"}
                          </p>
                        </div>
                      </div>

                      {node.provided && node.provideEnd && (
                        <div
                          style={{
                            background: "rgba(0, 255, 149, 0.05)",
                            borderRadius: "8px",
                            padding: "10px",
                            marginBottom: "15px",
                          }}
                        >
                          <p style={{ margin: "0", fontSize: "14px" }}>
                            Status:{" "}
                            <span style={{ color: "var(--accent-secondary)" }}>
                              Providing to Network
                            </span>
                          </p>
                          <p style={{ margin: "5px 0 0 0", fontSize: "14px" }}>
                            End Time: {node.provideEnd.toLocaleTimeString()}
                          </p>
                        </div>
                      )}

                      {node.rented && node.rentalEnd && (
                        <div
                          style={{
                            background: "rgba(0, 112, 243, 0.05)",
                            borderRadius: "8px",
                            padding: "10px",
                            marginBottom: "15px",
                          }}
                        >
                          <p style={{ margin: "0", fontSize: "14px" }}>
                            Status:{" "}
                            <span style={{ color: "var(--accent-primary)" }}>
                              Rented
                            </span>
                          </p>
                          <p style={{ margin: "5px 0 0 0", fontSize: "14px" }}>
                            End Time: {node.rentalEnd.toLocaleTimeString()}
                          </p>
                        </div>
                      )}

                      <button
                        className="btn btn-outline"
                        style={{ width: "100%" }}
                      >
                        {node.status === "active" ? "Disconnect" : "Connect"}{" "}
                        Node
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <p style={{ marginBottom: "15px" }}>
                    You don't have any nodes in the network
                  </p>
                  <button
                    className="btn"
                    onClick={() => {
                      setActiveTab("rent");
                      setRentMode("provide");
                    }}
                  >
                    Provide a Node
                  </button>
                </div>
              )}
            </div>

            <div className="card">
              <h3 style={{ marginBottom: "20px" }}>My Computing Jobs</h3>

              {myJobs.length > 0 ? (
                <div className="my-jobs-list">
                  {myJobs.map((job) => (
                    <div
                      key={job.id}
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        borderRadius: "8px",
                        padding: "15px",
                        marginBottom: "15px",
                        transition: "all 0.3s ease",
                      }}
                      className="node-detail-transition"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-5px)";
                        e.currentTarget.style.boxShadow =
                          "0 5px 15px rgba(0, 0, 0, 0.2)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
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
                          <h4 style={{ margin: "0 0 5px 0" }}>
                            {job.description}
                          </h4>
                          <p
                            style={{
                              margin: "0",
                              fontSize: "14px",
                              color: "var(--text-secondary)",
                            }}
                          >
                            {job.type}
                          </p>
                        </div>
                        <span
                          style={{
                            background:
                              job.status === "running"
                                ? "rgba(0, 112, 243, 0.1)"
                                : job.status === "completed"
                                ? "rgba(0, 255, 149, 0.1)"
                                : "rgba(255, 184, 0, 0.1)",
                            color:
                              job.status === "running"
                                ? "var(--accent-primary)"
                                : job.status === "completed"
                                ? "var(--accent-secondary)"
                                : "var(--accent-warning)",
                            borderRadius: "20px",
                            padding: "2px 8px",
                            fontSize: "12px",
                            textTransform: "capitalize",
                          }}
                        >
                          {job.status}
                        </span>
                      </div>

                      {job.status === "running" && (
                        <div style={{ margin: "15px 0" }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: "5px",
                            }}
                          >
                            <span style={{ fontSize: "14px" }}>Progress:</span>
                            <span style={{ fontSize: "14px" }}>
                              {job.progress}%
                            </span>
                          </div>
                          <div
                            style={{
                              height: "8px",
                              background: "rgba(255, 255, 255, 0.1)",
                              borderRadius: "4px",
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                height: "100%",
                                width: `${job.progress}%`,
                                background: "var(--accent-primary)",
                                borderRadius: "4px",
                                transition: "width 1s ease-in-out",
                              }}
                            ></div>
                          </div>
                        </div>
                      )}

                      <div
                        style={{
                          margin: "15px 0",
                          display: "grid",
                          gridTemplateColumns: "repeat(2, 1fr)",
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
                            Start Time
                          </p>
                          <p style={{ margin: "5px 0 0 0" }}>
                            {job.startTime.toLocaleString()}
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
                            {job.status === "completed"
                              ? "End Time"
                              : "Duration"}
                          </p>
                          <p style={{ margin: "5px 0 0 0" }}>
                            {job.status === "completed"
                              ? job.endTime.toLocaleString()
                              : `${job.duration} minutes`}
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
                            Nodes Used
                          </p>
                          <p style={{ margin: "5px 0 0 0" }}>{job.nodesUsed}</p>
                        </div>
                        <div>
                          <p
                            style={{
                              margin: "0",
                              fontSize: "12px",
                              color: "var(--text-secondary)",
                            }}
                          >
                            Cost
                          </p>
                          <p style={{ margin: "5px 0 0 0" }}>${job.cost}</p>
                        </div>
                      </div>

                      {job.status === "running" && (
                        <button
                          className="btn btn-outline"
                          style={{ width: "100%" }}
                        >
                          Stop Job
                        </button>
                      )}

                      {job.status === "completed" && (
                        <button
                          className="btn btn-outline"
                          style={{ width: "100%" }}
                        >
                          View Results
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <p style={{ marginBottom: "15px" }}>
                    You don't have any computing jobs
                  </p>
                  <button
                    className="btn"
                    onClick={() => {
                      setActiveTab("rent");
                      setRentMode("rent");
                    }}
                  >
                    Rent Computing Power
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Node Details Modal */}
      {showNodeDetails && selectedNode && (
        <div
          className="node-details-modal fade-in"
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
            className="card slide-in"
            style={{
              maxWidth: "600px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
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
              <div>
                <h3 style={{ marginBottom: "5px" }}>{selectedNode.name}</h3>
                <p style={{ margin: "0", color: "var(--text-secondary)" }}>
                  Location: {selectedNode.location}
                </p>
              </div>
              <button
                onClick={() => setShowNodeDetails(false)}
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
              className="node-specs"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: "8px",
                padding: "15px",
                marginBottom: "20px",
              }}
            >
              <h4 style={{ marginBottom: "15px" }}>Node Specifications</h4>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "15px",
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
                    Type
                  </p>
                  <p
                    style={{
                      margin: "5px 0 0 0",
                      textTransform: "capitalize",
                      fontWeight: "bold",
                    }}
                  >
                    {selectedNode.type}
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
                    Status
                  </p>
                  <p
                    style={{
                      margin: "5px 0 0 0",
                      textTransform: "capitalize",
                      fontWeight: "bold",
                    }}
                  >
                    {selectedNode.status}
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
                    GPU
                  </p>
                  <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                    {selectedNode.gpuModel}
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
                    CPU
                  </p>
                  <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                    {selectedNode.cpuModel}
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
                    Memory
                  </p>
                  <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                    {selectedNode.memory}
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
                    Storage
                  </p>
                  <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                    {selectedNode.storage}
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
                    Power
                  </p>
                  <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                    {selectedNode.power}
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
                    Latency
                  </p>
                  <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                    {selectedNode.latency}
                  </p>
                </div>
              </div>
            </div>

            {/* Mining-specific details */}
            <div
              className="mining-stats"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: "8px",
                padding: "15px",
                marginBottom: "20px",
              }}
            >
              <h4 style={{ marginBottom: "15px" }}>Mining Capabilities</h4>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "15px",
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
                    Hash Power
                  </p>
                  <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                    {selectedNode.hashPower}
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
                    Power Consumption
                  </p>
                  <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                    {selectedNode.powerConsumption}
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
                    Efficiency
                  </p>
                  <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                    {selectedNode.efficiency}
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
                    Uptime
                  </p>
                  <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                    {selectedNode.uptime}
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
                    Mining Algorithm
                  </p>
                  <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                    {selectedNode.algorithm}
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
                    Mining Pool
                  </p>
                  <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                    {selectedNode.miningPool}
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
                    Cooling System
                  </p>
                  <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                    {selectedNode.cooling}
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
                    Energy Source
                  </p>
                  <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                    {selectedNode.energySource}
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
                    Blocks Found
                  </p>
                  <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                    {selectedNode.blocksFound}
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
                    24h Earnings
                  </p>
                  <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                    {selectedNode.earnings24h}
                  </p>
                </div>
              </div>
            </div>

            <div className="node-connections" style={{ marginBottom: "20px" }}>
              <h4 style={{ marginBottom: "10px" }}>Network Connections</h4>
              <p>
                This node is connected to {selectedNode.connections.length}{" "}
                other nodes in the network.
              </p>
            </div>

            <div
              className="node-pricing"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: "8px",
                padding: "15px",
                marginBottom: "20px",
              }}
            >
              <h4 style={{ marginBottom: "10px" }}>Pricing</h4>
              <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                ${selectedNode.price}/hour
              </p>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
                {(selectedNode.price / (exchangeRates?.usd || 40000)).toFixed(
                  8
                )}{" "}
                BTC/hour
              </p>
            </div>

            {selectedNode.status === "idle" && selectedNode.owner !== "You" && (
              <button
                className="btn"
                style={{ width: "100%" }}
                onClick={() => {
                  setShowNodeDetails(false);
                  setActiveTab("rent");
                  setRentMode("rent");
                  setNodeType(selectedNode.type);
                }}
              >
                Rent This Node
              </button>
            )}

            {selectedNode.owner === "You" && (
              <button
                className="btn"
                style={{ width: "100%" }}
                onClick={() => {
                  setShowNodeDetails(false);
                  setActiveTab("manage");
                }}
              >
                Manage This Node
              </button>
            )}
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div
          className="confirmation-modal fade-in"
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
            className="card slide-in"
            style={{
              maxWidth: "500px",
              width: "100%",
            }}
          >
            <h3 style={{ marginBottom: "20px" }}>
              {rentMode === "rent"
                ? "Confirm Rental"
                : "Confirm Node Provision"}
            </h3>

            <p style={{ marginBottom: "15px" }}>
              {rentMode === "rent"
                ? `You are about to rent a ${nodeType}-tier computing node for ${duration} minutes.`
                : `You are about to provide your computing power to the Lightning Network for ${duration} minutes.`}
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
                <p style={{ margin: "0" }}>Node Type:</p>
                <p style={{ margin: "0", textTransform: "capitalize" }}>
                  {rentMode === "rent" ? nodeType : "Mid-Tier (Detected)"}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <p style={{ margin: "0" }}>Duration:</p>
                <p style={{ margin: "0" }}>{duration} minutes</p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <p style={{ margin: "0" }}>Rate:</p>
                <p style={{ margin: "0" }}>
                  $
                  {rentMode === "rent"
                    ? nodeType === "high"
                      ? "20"
                      : nodeType === "mid"
                      ? "15"
                      : nodeType === "low"
                      ? "10"
                      : "5"
                    : "15"}
                  /hour
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
                  {rentMode === "rent" ? "Total Cost:" : "Total Earnings:"}
                </p>
                <div style={{ textAlign: "right" }}>
                  <p style={{ margin: "0", fontWeight: "bold" }}>
                    $
                    {rentMode === "rent"
                      ? (
                          (nodeType === "high"
                            ? 20
                            : nodeType === "mid"
                            ? 15
                            : nodeType === "low"
                            ? 10
                            : 5) *
                          (parseInt(duration) / 60)
                        ).toFixed(2)
                      : (15 * (parseInt(duration) / 60)).toFixed(2)}
                  </p>
                  <p
                    style={{
                      margin: "5px 0 0 0",
                      fontSize: "14px",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {rentMode === "rent"
                      ? (
                          ((nodeType === "high"
                            ? 20
                            : nodeType === "mid"
                            ? 15
                            : nodeType === "low"
                            ? 10
                            : 5) *
                            (parseInt(duration) / 60)) /
                          (exchangeRates?.usd || 40000)
                        ).toFixed(8)
                      : (
                          (15 * (parseInt(duration) / 60)) /
                          (exchangeRates?.usd || 40000)
                        ).toFixed(8)}{" "}
                    BTC
                  </p>
                </div>
              </div>
            </div>

            {rentMode === "provide" && (
              <div
                style={{
                  background: "rgba(255, 184, 0, 0.1)",
                  color: "var(--accent-warning)",
                  borderRadius: "8px",
                  padding: "15px",
                  marginBottom: "20px",
                  fontSize: "14px",
                }}
              >
                <p style={{ margin: "0" }}>
                  <strong>Note:</strong> Your computer will be utilized by the
                  Lightning Network during this time. CPU and GPU resources will
                  be allocated to network tasks, which may impact system
                  performance.
                </p>
              </div>
            )}

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => setShowConfirmation(false)}
                className="btn btn-outline"
                style={{ flex: 1, transition: "all 0.3s ease" }}
              >
                Cancel
              </button>
              <button
                onClick={handleRentNode}
                className="btn"
                style={{
                  flex: 1,
                  background:
                    rentMode === "rent"
                      ? "var(--accent-primary)"
                      : "var(--accent-secondary)",
                  transition: "all 0.3s ease",
                }}
                disabled={processing}
              >
                {processing
                  ? "Processing..."
                  : rentMode === "rent"
                  ? "Confirm Rental"
                  : "Confirm Provision"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LightningNetwork;
