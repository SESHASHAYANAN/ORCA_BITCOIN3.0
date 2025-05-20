import React, { useState, useEffect, useContext, useRef } from "react";
import WalletContext from "./WalletContext";

function AITools() {
  const { wallet, balance, exchangeRates } = useContext(WalletContext);
  const [activeTab, setActiveTab] = useState("models");
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedTool, setSelectedTool] = useState(null);
  const [training, setTraining] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [hyperParameters, setHyperParameters] = useState({
    learningRate: 0.001,
    batchSize: 32,
    epochs: 10,
    warmupSteps: 1000,
  });
  const [trainingMetrics, setTrainingMetrics] = useState({
    trainingLoss: 0,
    validationLoss: 0,
    accuracy: 0,
    timeRemaining: 0,
  });
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [trainingLogs, setTrainingLogs] = useState([]);
  const [finalMetrics, setFinalMetrics] = useState({
    finalLoss: 0,
    modelSize: 0,
    trainingTime: 0,
  });
  const logsEndRef = useRef(null);
  const [paymentConfirmation, setPaymentConfirmation] = useState(false);
  const [aiModelsData, setAiModelsData] = useState([]);
  const [aiToolsData, setAiToolsData] = useState([]);
  const [showModelDetails, setShowModelDetails] = useState(false);
  const [modelWithConfirmation, setModelWithConfirmation] = useState(null);

  // Scroll to bottom of logs
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [trainingLogs]);

  // Generate AI models data
  useEffect(() => {
    const generateModelsData = () => {
      return [
        {
          id: 1,
          name: "Whisper",
          creator: "OpenAI",
          description:
            "General-purpose speech recognition model. Can transcribe, translate, and identify languages.",
          capabilities: [
            "Multilingual speech recognition",
            "Audio transcription",
            "Language detection",
            "Translation",
          ],
          type: "Speech",
          size: "Small: 39M params to Large: 1.5B params",
          price: 0.0008,
          license: "MIT",
          training: {
            supported: false,
          },
        },
        {
          id: 2,
          name: "Stable Diffusion",
          creator: "Stability AI",
          description:
            "Text-to-image generation model capable of producing high-quality images from text descriptions.",
          capabilities: [
            "Image generation",
            "Image editing",
            "Image-to-image translation",
            "Inpainting",
          ],
          type: "Image",
          size: "1.5B parameters",
          price: 0.0015,
          license: "Apache 2.0",
          training: {
            supported: true,
            pricePerHour: 0.005,
          },
        },
        {
          id: 3,
          name: "Llama 2",
          creator: "Meta",
          description:
            "Large language model for text generation and understanding, with variations in model sizes.",
          capabilities: [
            "Text generation",
            "Question answering",
            "Code completion",
            "Language understanding",
          ],
          type: "Language",
          size: "7B to 70B parameters",
          price: 0.001,
          license: "MIT",
          training: {
            supported: true,
            pricePerHour: 0.006,
          },
        },
        {
          id: 4,
          name: "BLOOM",
          creator: "Hugging Face",
          description:
            "Multilingual large language model trained on 46 natural languages and 13 programming languages.",
          capabilities: [
            "Multilingual text generation",
            "Code generation",
            "Translation",
          ],
          type: "Language",
          size: "176B parameters",
          price: 0.0018,
          license: "Apache 2.0",
          training: {
            supported: true,
            pricePerHour: 0.008,
          },
        },
        {
          id: 5,
          name: "YOLOv8",
          creator: "Ultralytics",
          description:
            "Real-time object detection and image segmentation model.",
          capabilities: [
            "Object detection",
            "Image segmentation",
            "Pose estimation",
          ],
          type: "Vision",
          size: "Variable (3.2M to 43.7M parameters)",
          price: 0.0006,
          license: "MIT",
          training: {
            supported: true,
            pricePerHour: 0.003,
          },
        },
        {
          id: 6,
          name: "GPT-J",
          creator: "EleutherAI",
          description:
            "Large-scale language model trained on the Pile dataset.",
          capabilities: [
            "Text generation",
            "Question answering",
            "Task completion",
          ],
          type: "Language",
          size: "6B parameters",
          price: 0.0012,
          license: "Apache 2.0",
          training: {
            supported: true,
            pricePerHour: 0.004,
          },
        },
        {
          id: 7,
          name: "CLIP",
          creator: "OpenAI",
          description:
            "Neural network trained on a variety of image-text pairs, connecting vision and language.",
          capabilities: [
            "Image classification",
            "Zero-shot learning",
            "Image-text matching",
          ],
          type: "Vision",
          size: "63M to 354M parameters",
          price: 0.0009,
          license: "MIT",
          training: {
            supported: false,
          },
        },
        {
          id: 8,
          name: "Segment Anything",
          creator: "Meta AI",
          description:
            "Foundation model for image segmentation that can segment any object in an image.",
          capabilities: [
            "Object segmentation",
            "Interactive segmentation",
            "Zero-shot segmentation",
          ],
          type: "Vision",
          size: "308M parameters",
          price: 0.0012,
          license: "Apache 2.0",
          training: {
            supported: true,
            pricePerHour: 0.004,
          },
        },
        {
          id: 9,
          name: "Falcon",
          creator: "Technology Innovation Institute",
          description:
            "Large language model trained on massive datasets with strong performance across tasks.",
          capabilities: [
            "Text generation",
            "Code generation",
            "Reasoning",
            "Task completion",
          ],
          type: "Language",
          size: "7B to 40B parameters",
          price: 0.0014,
          license: "Apache 2.0",
          training: {
            supported: true,
            pricePerHour: 0.005,
          },
        },
        {
          id: 10,
          name: "MusicGen",
          creator: "Meta AI",
          description:
            "Music generation model capable of creating high-quality music from text descriptions.",
          capabilities: [
            "Music generation",
            "Audio synthesis",
            "Text-to-music",
          ],
          type: "Speech",
          size: "1.5B parameters",
          price: 0.0016,
          license: "MIT",
          training: {
            supported: false,
          },
        },
        {
          id: 11,
          name: "ControlNet",
          creator: "Stanford University",
          description:
            "Neural network structure to control diffusion models with conditional inputs.",
          capabilities: [
            "Controlled image generation",
            "Edge detection",
            "Pose estimation",
          ],
          type: "Image",
          size: "1.9B parameters",
          price: 0.0017,
          license: "Apache 2.0",
          training: {
            supported: true,
            pricePerHour: 0.007,
          },
        },
        {
          id: 12,
          name: "DINOv2",
          creator: "Meta AI",
          description:
            "Self-supervised vision transformer for learning visual features.",
          capabilities: [
            "Image classification",
            "Feature extraction",
            "Transfer learning",
          ],
          type: "Vision",
          size: "300M parameters",
          price: 0.0011,
          license: "Apache 2.0",
          training: {
            supported: true,
            pricePerHour: 0.004,
          },
        },
      ];
    };

    const generateToolsData = () => {
      return [
        {
          id: 1,
          name: "AI Model Training",
          description:
            "Train your own AI models with custom datasets and parameters",
          icon: "🧠",
          tags: ["Training", "Custom Models"],
          bitcoinPrice: 0.005,
          features: [
            "Support for various model architectures",
            "Hyperparameter optimization",
            "Real-time training metrics",
            "Checkpointing and model export",
          ],
        },
        {
          id: 2,
          name: "Fine-tune BLOOM",
          description: "Fine-tune BLOOM models for specific tasks and domains",
          icon: "🌸",
          tags: ["NLP", "Fine-tuning"],
          bitcoinPrice: 0.003,
          features: [
            "Few-shot learning support",
            "Task-specific optimization",
            "Custom vocabulary extension",
            "Performance metrics tracking",
          ],
          specs: {
            modelSize: "176B parameters",
            trainingType: "Few-shot learning",
            hardwareRequirements: "16GB+ GPU",
            framework: "Hugging Face Transformers",
          },
        },
        {
          id: 3,
          name: "Autonomous Agents",
          description: "Create and deploy autonomous agents on NEAR blockchain",
          icon: "🤖",
          tags: ["Agents", "Blockchain"],
          bitcoinPrice: 0.004,
          features: [
            "Smart Contract Based agents",
            "Rust/Assembly Script support",
            "NEAR Social integration",
            "Real-time monitoring",
          ],
          specs: {
            agentType: "Smart Contract Based",
            language: "Rust/Assembly/Script",
            integration: "NEAR Social",
            monitoring: "Real-time",
            reliability: "99.9%",
            response: "150ms",
            uptime: "24/7",
            security: "Audited",
          },
        },
        {
          id: 4,
          name: "On-chain Analytics",
          description: "AI-powered analytics for on-chain activities",
          icon: "📊",
          tags: ["Analytics", "Blockchain"],
          bitcoinPrice: 0.0025,
          features: [
            "Real-time + Historical analysis",
            "Multiple chain support",
            "Custom trained ML models",
            "Continuous updates",
          ],
          specs: {
            analysisType: "Real-time + Historical",
            dataSources: "Multiple chains",
            mlModels: "Custom trained",
            updates: "Continuous",
            precision: "98%",
            coverage: "100%",
            latency: "<1s",
            accuracy: "97%",
          },
        },
      ];
    };

    setAiModelsData(generateModelsData());
    setAiToolsData(generateToolsData());
  }, []);

  // Generate datasets
  const datasets = [
    {
      id: 1,
      name: "Common Crawl",
      description: "Web crawl data for language models",
      size: "850GB",
      type: "Text",
    },
    {
      id: 2,
      name: "WikiText",
      description: "Wikipedia text for language modeling",
      size: "103MB",
      type: "Text",
    },
    {
      id: 3,
      name: "ImageNet",
      description: "Image database for visual recognition",
      size: "150GB",
      type: "Image",
    },
    {
      id: 4,
      name: "COCO",
      description: "Common Objects in Context for detection",
      size: "25GB",
      type: "Image",
    },
    {
      id: 5,
      name: "LibriSpeech",
      description: "Read English speech",
      size: "60GB",
      type: "Audio",
    },
    {
      id: 6,
      name: "Custom Upload",
      description: "Upload your own dataset",
      size: "Variable",
      type: "Any",
    },
  ];

  // Add a log message
  const addLog = (message, type = "info") => {
    const timestamp = new Date().toLocaleTimeString();
    setTrainingLogs((prevLogs) => [...prevLogs, { message, type, timestamp }]);
  };

  // Handle starting the training process
  const handleStartTraining = () => {
    if (!selectedDataset) {
      addLog("Please select a dataset first", "error");
      return;
    }

    setTraining(true);
    setTrainingProgress(0);
    setTrainingMetrics({
      trainingLoss: 2.5,
      validationLoss: 2.8,
      accuracy: 10,
      timeRemaining: 120,
    });
    addLog(
      `Training started on ${selectedModel.name} with ${selectedDataset.name} dataset`,
      "success"
    );
    addLog("Initializing model and loading dataset...", "info");

    // Simulate training progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      setTrainingProgress(progress);

      // Update metrics
      setTrainingMetrics((prev) => ({
        trainingLoss: Math.max(0.1, prev.trainingLoss - 0.01),
        validationLoss: Math.max(0.15, prev.validationLoss - 0.008),
        accuracy: Math.min(99, prev.accuracy + 0.5),
        timeRemaining: Math.max(0, prev.timeRemaining - 1),
      }));

      // Add logs periodically
      if (progress % 10 === 0) {
        addLog(`Training progress: ${progress}% complete`, "info");
      }

      if (progress % 25 === 0) {
        addLog(`Checkpointing model at iteration ${progress * 10}`, "info");
      }

      if (progress >= 100) {
        clearInterval(interval);
        setTraining(false);
        addLog("Training completed successfully!", "success");
        setFinalMetrics({
          finalLoss: 0.5 + Math.random() * 0.5,
          modelSize: (1.5 + Math.random() * 3).toFixed(1),
          trainingTime: 120 + Math.floor(Math.random() * 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  };

  // Handle saving a checkpoint
  const handleSaveCheckpoint = () => {
    addLog("Saving checkpoint...", "info");
    setTimeout(() => {
      addLog("Checkpoint saved successfully!", "success");
    }, 1000);
  };

  // Handle exporting the model
  const handleExportModel = () => {
    addLog("Exporting model...", "info");
    setTimeout(() => {
      addLog("Model exported successfully!", "success");
    }, 1500);
  };

  // Handle saving metrics
  const handleSaveMetrics = () => {
    addLog("Saving metrics...", "info");
    setTimeout(() => {
      addLog("Metrics saved successfully!", "success");
    }, 1000);
  };

  // Handle confirming payment
  const handleConfirmPayment = () => {
    setPaymentConfirmation(false);

    if (modelWithConfirmation) {
      setSelectedModel(modelWithConfirmation);
      setModelWithConfirmation(null);
      setShowModelDetails(true);
      addLog(`Selected model: ${modelWithConfirmation.name}`, "info");
    } else if (selectedTool) {
      addLog(`Purchased tool: ${selectedTool.name}`, "success");
      // Here would be the logic to access the tool
    }
  };

  // Filter models by type
  const filterModelsByType = (type) => {
    if (type === "all") {
      return aiModelsData;
    }
    return aiModelsData.filter(
      (model) => model.type.toLowerCase() === type.toLowerCase()
    );
  };

  return (
    <div className="ai-tools-container">
      <h1 style={{ marginBottom: "30px" }}>AI Tools</h1>

      <div
        className="ai-tabs"
        style={{
          display: "flex",
          borderBottom: "1px solid var(--border-color)",
          marginBottom: "30px",
        }}
      >
        <button
          className={`tab ${activeTab === "models" ? "active" : ""}`}
          onClick={() => setActiveTab("models")}
          style={{
            padding: "10px 20px",
            background: "transparent",
            border: "none",
            borderBottom:
              activeTab === "models"
                ? "2px solid var(--accent-primary)"
                : "2px solid transparent",
            color:
              activeTab === "models"
                ? "var(--accent-primary)"
                : "var(--text-primary)",
            cursor: "pointer",
            fontWeight: activeTab === "models" ? "bold" : "normal",
          }}
        >
          AI Models
        </button>
        <button
          className={`tab ${activeTab === "training" ? "active" : ""}`}
          onClick={() => setActiveTab("training")}
          style={{
            padding: "10px 20px",
            background: "transparent",
            border: "none",
            borderBottom:
              activeTab === "training"
                ? "2px solid var(--accent-primary)"
                : "2px solid transparent",
            color:
              activeTab === "training"
                ? "var(--accent-primary)"
                : "var(--text-primary)",
            cursor: "pointer",
            fontWeight: activeTab === "training" ? "bold" : "normal",
          }}
        >
          Model Training
        </button>
        <button
          className={`tab ${activeTab === "tools" ? "active" : ""}`}
          onClick={() => setActiveTab("tools")}
          style={{
            padding: "10px 20px",
            background: "transparent",
            border: "none",
            borderBottom:
              activeTab === "tools"
                ? "2px solid var(--accent-primary)"
                : "2px solid transparent",
            color:
              activeTab === "tools"
                ? "var(--accent-primary)"
                : "var(--text-primary)",
            cursor: "pointer",
            fontWeight: activeTab === "tools" ? "bold" : "normal",
          }}
        >
          AI Tools
        </button>
      </div>

      {activeTab === "models" && (
        <div className="models-tab">
          <div
            className="models-filter"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginBottom: "30px",
              flexWrap: "wrap",
            }}
          >
            {["all", "language", "vision", "speech", "image"].map(
              (category) => (
                <button
                  key={category}
                  onClick={() => {}}
                  style={{
                    padding: "8px 15px",
                    background:
                      category === "all"
                        ? "var(--accent-primary)"
                        : "rgba(255, 255, 255, 0.05)",
                    border: "none",
                    borderRadius: "20px",
                    color: category === "all" ? "white" : "var(--text-primary)",
                    cursor: "pointer",
                    textTransform: "capitalize",
                  }}
                >
                  {category}
                </button>
              )
            )}
          </div>

          <div
            className="models-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {filterModelsByType("all").map((model) => (
              <div
                key={model.id}
                className="model-card card"
                style={{
                  cursor: "pointer",
                  transition: "transform 0.2s ease",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
                onClick={() => {
                  setModelWithConfirmation(model);
                  setPaymentConfirmation(true);
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-5px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <div>
                  <h3
                    style={{
                      marginBottom: "5px",
                      color: "var(--accent-primary)",
                    }}
                  >
                    {model.name}
                  </h3>
                  <p
                    style={{
                      margin: "0 0 10px 0",
                      color: "var(--text-secondary)",
                      fontSize: "14px",
                    }}
                  >
                    by {model.creator}
                  </p>
                  <p style={{ marginBottom: "15px" }}>{model.description}</p>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "5px",
                    marginBottom: "15px",
                  }}
                >
                  {model.capabilities.map((capability, index) => (
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
                      {capability}
                    </span>
                  ))}
                </div>

                <div style={{ marginTop: "auto" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderTop: "1px solid var(--border-color)",
                      paddingTop: "15px",
                    }}
                  >
                    <span
                      style={{
                        background: "rgba(0, 255, 149, 0.1)",
                        color: "var(--accent-secondary)",
                        borderRadius: "20px",
                        padding: "2px 8px",
                        fontSize: "12px",
                      }}
                    >
                      {model.license}
                    </span>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ margin: "0", fontWeight: "bold" }}>
                        {model.price.toFixed(4)} BTC
                      </p>
                      <p
                        style={{
                          margin: "5px 0 0 0",
                          fontSize: "12px",
                          color: "var(--text-secondary)",
                        }}
                      >
                        ≈ $
                        {(model.price * (exchangeRates?.usd || 40000)).toFixed(
                          2
                        )}
                      </p>
                    </div>
                  </div>

                  <button
                    className="btn"
                    style={{ width: "100%", marginTop: "15px" }}
                  >
                    Use Model
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "training" && (
        <div className="training-tab">
          <div
            className="training-layout"
            style={{
              display: "grid",
              gridTemplateColumns: selectedModel ? "300px 1fr" : "1fr",
              gap: "30px",
            }}
          >
            {!selectedModel ? (
              <div
                className="card"
                style={{ textAlign: "center", padding: "40px 20px" }}
              >
                <h3 style={{ marginBottom: "15px" }}>
                  Select a Model to Train
                </h3>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    marginBottom: "20px",
                  }}
                >
                  Choose a model from the AI Models tab to begin training.
                </p>
                <button className="btn" onClick={() => setActiveTab("models")}>
                  Browse AI Models
                </button>
              </div>
            ) : (
              <>
                <div className="training-sidebar">
                  <div className="card" style={{ marginBottom: "20px" }}>
                    <h3 style={{ marginBottom: "15px" }}>Training Steps</h3>

                    <div className="steps-list">
                      <div
                        className={`step ${selectedDataset ? "active" : ""}`}
                        style={{
                          padding: "10px",
                          borderRadius: "8px",
                          background: selectedDataset
                            ? "rgba(0, 112, 243, 0.1)"
                            : "rgba(255, 255, 255, 0.05)",
                          marginBottom: "10px",
                          borderLeft: selectedDataset
                            ? "3px solid var(--accent-primary)"
                            : "3px solid transparent",
                        }}
                      >
                        <h4 style={{ margin: "0" }}>1. Select Dataset</h4>
                        {selectedDataset && (
                          <p
                            style={{
                              margin: "5px 0 0 0",
                              fontSize: "14px",
                              color: "var(--text-secondary)",
                            }}
                          >
                            {selectedDataset.name} selected
                          </p>
                        )}
                      </div>

                      <div
                        className={`step ${hyperParameters ? "active" : ""}`}
                        style={{
                          padding: "10px",
                          borderRadius: "8px",
                          background: "rgba(255, 255, 255, 0.05)",
                          marginBottom: "10px",
                          borderLeft: "3px solid transparent",
                        }}
                      >
                        <h4 style={{ margin: "0" }}>2. Configure Parameters</h4>
                      </div>

                      <div
                        className={`step ${
                          training || trainingProgress > 0 ? "active" : ""
                        }`}
                        style={{
                          padding: "10px",
                          borderRadius: "8px",
                          background:
                            training || trainingProgress > 0
                              ? "rgba(0, 112, 243, 0.1)"
                              : "rgba(255, 255, 255, 0.05)",
                          marginBottom: "10px",
                          borderLeft:
                            training || trainingProgress > 0
                              ? "3px solid var(--accent-primary)"
                              : "3px solid transparent",
                        }}
                      >
                        <h4 style={{ margin: "0" }}>3. Train Model</h4>
                        {trainingProgress > 0 && (
                          <p
                            style={{
                              margin: "5px 0 0 0",
                              fontSize: "14px",
                              color: "var(--text-secondary)",
                            }}
                          >
                            {trainingProgress}% Complete
                          </p>
                        )}
                      </div>

                      <div
                        className={`step ${
                          trainingProgress === 100 ? "active" : ""
                        }`}
                        style={{
                          padding: "10px",
                          borderRadius: "8px",
                          background:
                            trainingProgress === 100
                              ? "rgba(0, 112, 243, 0.1)"
                              : "rgba(255, 255, 255, 0.05)",
                          borderLeft:
                            trainingProgress === 100
                              ? "3px solid var(--accent-primary)"
                              : "3px solid transparent",
                        }}
                      >
                        <h4 style={{ margin: "0" }}>4. Export Results</h4>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <h3 style={{ marginBottom: "15px" }}>Selected Model</h3>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                        marginBottom: "15px",
                      }}
                    >
                      <div
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "15px",
                          background: "var(--gradient-primary)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "24px",
                          fontWeight: "bold",
                          color: "white",
                        }}
                      >
                        {selectedModel.name.substring(0, 2)}
                      </div>
                      <div>
                        <h4
                          style={{
                            margin: "0",
                            color: "var(--accent-primary)",
                          }}
                        >
                          {selectedModel.name}
                        </h4>
                        <p
                          style={{
                            margin: "5px 0 0 0",
                            fontSize: "14px",
                            color: "var(--text-secondary)",
                          }}
                        >
                          by {selectedModel.creator}
                        </p>
                      </div>
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                      <h4 style={{ marginBottom: "10px", fontSize: "16px" }}>
                        Model Details
                      </h4>
                      <div style={{ fontSize: "14px" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "5px",
                          }}
                        >
                          <span style={{ color: "var(--text-secondary)" }}>
                            Type:
                          </span>
                          <span>{selectedModel.type}</span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "5px",
                          }}
                        >
                          <span style={{ color: "var(--text-secondary)" }}>
                            Size:
                          </span>
                          <span>{selectedModel.size}</span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <span style={{ color: "var(--text-secondary)" }}>
                            License:
                          </span>
                          <span>{selectedModel.license}</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                      <h4 style={{ marginBottom: "10px", fontSize: "16px" }}>
                        Training Cost
                      </h4>
                      <div style={{ fontSize: "14px" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "5px",
                          }}
                        >
                          <span style={{ color: "var(--text-secondary)" }}>
                            Per Hour:
                          </span>
                          <span>
                            {selectedModel.training?.pricePerHour || 0.005} BTC
                          </span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <span style={{ color: "var(--text-secondary)" }}>
                            Estimated Total:
                          </span>
                          <span>
                            {(
                              (selectedModel.training?.pricePerHour || 0.005) *
                              2
                            ).toFixed(4)}{" "}
                            BTC
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      className="btn btn-outline"
                      style={{ width: "100%" }}
                      onClick={() => {
                        setSelectedModel(null);
                        setSelectedDataset(null);
                        setTrainingProgress(0);
                        setTrainingLogs([]);
                      }}
                    >
                      Cancel Training
                    </button>
                  </div>
                </div>

                <div className="training-main">
                  <div className="card" style={{ marginBottom: "30px" }}>
                    <h3 style={{ marginBottom: "20px" }}>Dataset Selection</h3>

                    <div
                      className="datasets-grid"
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fill, minmax(250px, 1fr))",
                        gap: "15px",
                      }}
                    >
                      {datasets.map((dataset) => (
                        <div
                          key={dataset.id}
                          className={`dataset-card ${
                            selectedDataset && selectedDataset.id === dataset.id
                              ? "selected"
                              : ""
                          }`}
                          style={{
                            background:
                              selectedDataset &&
                              selectedDataset.id === dataset.id
                                ? "rgba(0, 112, 243, 0.1)"
                                : "rgba(255, 255, 255, 0.05)",
                            borderRadius: "8px",
                            padding: "15px",
                            border:
                              selectedDataset &&
                              selectedDataset.id === dataset.id
                                ? "1px solid var(--accent-primary)"
                                : "1px solid var(--border-color)",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setSelectedDataset(dataset);
                            addLog(`Selected dataset: ${dataset.name}`, "info");
                          }}
                        >
                          <h4 style={{ marginBottom: "10px" }}>
                            {dataset.name}
                          </h4>
                          <p
                            style={{
                              color: "var(--text-secondary)",
                              fontSize: "14px",
                              marginBottom: "15px",
                            }}
                          >
                            {dataset.description}
                          </p>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              fontSize: "14px",
                            }}
                          >
                            <span>Size: {dataset.size}</span>
                            <span>Type: {dataset.type}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="card" style={{ marginBottom: "30px" }}>
                    <h3 style={{ marginBottom: "20px" }}>Hyperparameters</h3>

                    <div
                      className="parameters-grid"
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fill, minmax(250px, 1fr))",
                        gap: "20px",
                      }}
                    >
                      <div>
                        <label
                          style={{ display: "block", marginBottom: "5px" }}
                        >
                          Learning Rate
                        </label>
                        <input
                          type="number"
                          value={hyperParameters.learningRate}
                          onChange={(e) =>
                            setHyperParameters({
                              ...hyperParameters,
                              learningRate: e.target.value,
                            })
                          }
                          step="0.0001"
                          min="0.0001"
                          max="0.1"
                          style={{
                            background: "rgba(255, 255, 255, 0.05)",
                            border: "1px solid var(--border-color)",
                            borderRadius: "8px",
                            padding: "10px",
                            color: "var(--text-primary)",
                            width: "100%",
                          }}
                        />
                      </div>

                      <div>
                        <label
                          style={{ display: "block", marginBottom: "5px" }}
                        >
                          Batch Size
                        </label>
                        <input
                          type="number"
                          value={hyperParameters.batchSize}
                          onChange={(e) =>
                            setHyperParameters({
                              ...hyperParameters,
                              batchSize: parseInt(e.target.value),
                            })
                          }
                          step="8"
                          min="8"
                          max="256"
                          style={{
                            background: "rgba(255, 255, 255, 0.05)",
                            border: "1px solid var(--border-color)",
                            borderRadius: "8px",
                            padding: "10px",
                            color: "var(--text-primary)",
                            width: "100%",
                          }}
                        />
                      </div>

                      <div>
                        <label
                          style={{ display: "block", marginBottom: "5px" }}
                        >
                          Epochs
                        </label>
                        <input
                          type="number"
                          value={hyperParameters.epochs}
                          onChange={(e) =>
                            setHyperParameters({
                              ...hyperParameters,
                              epochs: parseInt(e.target.value),
                            })
                          }
                          step="1"
                          min="1"
                          max="100"
                          style={{
                            background: "rgba(255, 255, 255, 0.05)",
                            border: "1px solid var(--border-color)",
                            borderRadius: "8px",
                            padding: "10px",
                            color: "var(--text-primary)",
                            width: "100%",
                          }}
                        />
                      </div>

                      <div>
                        <label
                          style={{ display: "block", marginBottom: "5px" }}
                        >
                          Warmup Steps
                        </label>
                        <input
                          type="number"
                          value={hyperParameters.warmupSteps}
                          onChange={(e) =>
                            setHyperParameters({
                              ...hyperParameters,
                              warmupSteps: parseInt(e.target.value),
                            })
                          }
                          step="100"
                          min="0"
                          max="10000"
                          style={{
                            background: "rgba(255, 255, 255, 0.05)",
                            border: "1px solid var(--border-color)",
                            borderRadius: "8px",
                            padding: "10px",
                            color: "var(--text-primary)",
                            width: "100%",
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <h3 style={{ marginBottom: "20px" }}>Training Progress</h3>

                    <div
                      className="training-controls"
                      style={{
                        display: "flex",
                        gap: "15px",
                        marginBottom: "20px",
                      }}
                    >
                      <button
                        className="btn"
                        style={{ flex: 1 }}
                        onClick={handleStartTraining}
                        disabled={training || !selectedDataset}
                      >
                        {training ? (
                          <span>Training in Progress...</span>
                        ) : (
                          <span>Start Training</span>
                        )}
                      </button>

                      <button
                        className="btn btn-outline"
                        style={{ flex: 1 }}
                        onClick={handleSaveCheckpoint}
                        disabled={!training && trainingProgress === 0}
                      >
                        Save Checkpoint
                      </button>
                    </div>

                    {(training || trainingProgress > 0) && (
                      <>
                        <div style={{ marginBottom: "20px" }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: "5px",
                            }}
                          >
                            <span>Progress:</span>
                            <span>{trainingProgress}%</span>
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
                                width: `${trainingProgress}%`,
                                background: "var(--gradient-primary)",
                                borderRadius: "4px",
                              }}
                            ></div>
                          </div>
                        </div>

                        <div
                          className="metrics-grid"
                          style={{
                            display: "grid",
                            gridTemplateColumns:
                              "repeat(auto-fit, minmax(150px, 1fr))",
                            gap: "15px",
                            marginBottom: "20px",
                          }}
                        >
                          <div
                            style={{
                              background: "rgba(255, 255, 255, 0.05)",
                              borderRadius: "8px",
                              padding: "15px",
                              textAlign: "center",
                            }}
                          >
                            <p
                              style={{
                                margin: "0",
                                color: "var(--text-secondary)",
                                fontSize: "14px",
                              }}
                            >
                              Training Loss
                            </p>
                            <p
                              style={{
                                margin: "10px 0 0 0",
                                fontWeight: "bold",
                                fontSize: "20px",
                              }}
                            >
                              {trainingMetrics.trainingLoss.toFixed(4)}
                            </p>
                          </div>

                          <div
                            style={{
                              background: "rgba(255, 255, 255, 0.05)",
                              borderRadius: "8px",
                              padding: "15px",
                              textAlign: "center",
                            }}
                          >
                            <p
                              style={{
                                margin: "0",
                                color: "var(--text-secondary)",
                                fontSize: "14px",
                              }}
                            >
                              Validation Loss
                            </p>
                            <p
                              style={{
                                margin: "10px 0 0 0",
                                fontWeight: "bold",
                                fontSize: "20px",
                              }}
                            >
                              {trainingMetrics.validationLoss.toFixed(4)}
                            </p>
                          </div>

                          <div
                            style={{
                              background: "rgba(255, 255, 255, 0.05)",
                              borderRadius: "8px",
                              padding: "15px",
                              textAlign: "center",
                            }}
                          >
                            <p
                              style={{
                                margin: "0",
                                color: "var(--text-secondary)",
                                fontSize: "14px",
                              }}
                            >
                              Accuracy
                            </p>
                            <p
                              style={{
                                margin: "10px 0 0 0",
                                fontWeight: "bold",
                                fontSize: "20px",
                              }}
                            >
                              {trainingMetrics.accuracy.toFixed(2)}%
                            </p>
                          </div>

                          <div
                            style={{
                              background: "rgba(255, 255, 255, 0.05)",
                              borderRadius: "8px",
                              padding: "15px",
                              textAlign: "center",
                            }}
                          >
                            <p
                              style={{
                                margin: "0",
                                color: "var(--text-secondary)",
                                fontSize: "14px",
                              }}
                            >
                              Time Remaining
                            </p>
                            <p
                              style={{
                                margin: "10px 0 0 0",
                                fontWeight: "bold",
                                fontSize: "20px",
                              }}
                            >
                              {trainingMetrics.timeRemaining}s
                            </p>
                          </div>
                        </div>
                      </>
                    )}

                    {trainingProgress === 100 && (
                      <div
                        className="training-results"
                        style={{ marginBottom: "20px" }}
                      >
                        <h3 style={{ marginBottom: "15px" }}>
                          Training Results
                        </h3>

                        <div
                          className="results-grid"
                          style={{
                            display: "grid",
                            gridTemplateColumns:
                              "repeat(auto-fit, minmax(150px, 1fr))",
                            gap: "15px",
                            marginBottom: "20px",
                          }}
                        >
                          <div
                            style={{
                              background: "rgba(255, 255, 255, 0.05)",
                              borderRadius: "8px",
                              padding: "15px",
                              textAlign: "center",
                            }}
                          >
                            <p
                              style={{
                                margin: "0",
                                color: "var(--text-secondary)",
                                fontSize: "14px",
                              }}
                            >
                              Final Loss
                            </p>
                            <p
                              style={{
                                margin: "10px 0 0 0",
                                fontWeight: "bold",
                                fontSize: "20px",
                              }}
                            >
                              {finalMetrics.finalLoss.toFixed(4)}
                            </p>
                          </div>

                          <div
                            style={{
                              background: "rgba(255, 255, 255, 0.05)",
                              borderRadius: "8px",
                              padding: "15px",
                              textAlign: "center",
                            }}
                          >
                            <p
                              style={{
                                margin: "0",
                                color: "var(--text-secondary)",
                                fontSize: "14px",
                              }}
                            >
                              Model Size
                            </p>
                            <p
                              style={{
                                margin: "10px 0 0 0",
                                fontWeight: "bold",
                                fontSize: "20px",
                              }}
                            >
                              {finalMetrics.modelSize} GB
                            </p>
                          </div>

                          <div
                            style={{
                              background: "rgba(255, 255, 255, 0.05)",
                              borderRadius: "8px",
                              padding: "15px",
                              textAlign: "center",
                            }}
                          >
                            <p
                              style={{
                                margin: "0",
                                color: "var(--text-secondary)",
                                fontSize: "14px",
                              }}
                            >
                              Training Time
                            </p>
                            <p
                              style={{
                                margin: "10px 0 0 0",
                                fontWeight: "bold",
                                fontSize: "20px",
                              }}
                            >
                              {finalMetrics.trainingTime}s
                            </p>
                          </div>
                        </div>

                        <div style={{ display: "flex", gap: "15px" }}>
                          <button
                            className="btn"
                            style={{ flex: 1 }}
                            onClick={handleExportModel}
                          >
                            Export Model
                          </button>

                          <button
                            className="btn btn-outline"
                            style={{ flex: 1 }}
                            onClick={handleSaveMetrics}
                          >
                            Save Metrics
                          </button>
                        </div>
                      </div>
                    )}

                    <div
                      className="training-logs"
                      style={{
                        background: "#0D0D0D",
                        borderRadius: "8px",
                        padding: "15px",
                        height: "300px",
                        overflowY: "auto",
                        fontFamily: "monospace",
                      }}
                    >
                      {trainingLogs.map((log, index) => (
                        <div
                          key={index}
                          className={`log-entry ${log.type}`}
                          style={{
                            marginBottom: "5px",
                            color:
                              log.type === "error"
                                ? "#ff4757"
                                : log.type === "success"
                                ? "#2ed573"
                                : "var(--text-primary)",
                          }}
                        >
                          [{log.timestamp}] {log.message}
                        </div>
                      ))}
                      <div ref={logsEndRef} />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {activeTab === "tools" && (
        <div className="tools-tab">
          <div
            className="tools-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {aiToolsData.map((tool) => (
              <div
                key={tool.id}
                className="tool-card card"
                style={{
                  cursor: "pointer",
                  transition: "transform 0.2s ease",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
                onClick={() => {
                  setSelectedTool(tool);
                  setPaymentConfirmation(true);
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-5px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <span style={{ fontSize: "32px" }}>{tool.icon}</span>
                    <h3 style={{ margin: "0" }}>{tool.name}</h3>
                  </div>

                  <p style={{ marginBottom: "15px" }}>{tool.description}</p>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "5px",
                      marginBottom: "15px",
                    }}
                  >
                    {tool.tags.map((tag, index) => (
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
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div style={{ marginBottom: "15px" }}>
                    <h4 style={{ marginBottom: "10px", fontSize: "16px" }}>
                      Features
                    </h4>
                    <ul
                      style={{
                        paddingLeft: "20px",
                        color: "var(--text-secondary)",
                        fontSize: "14px",
                      }}
                    >
                      {tool.features.map((feature, index) => (
                        <li key={index} style={{ marginBottom: "5px" }}>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div style={{ marginTop: "auto" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderTop: "1px solid var(--border-color)",
                      paddingTop: "15px",
                    }}
                  >
                    <span
                      style={{
                        color: "var(--text-secondary)",
                        fontSize: "14px",
                      }}
                    >
                      Price per use:
                    </span>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ margin: "0", fontWeight: "bold" }}>
                        {tool.bitcoinPrice.toFixed(4)} BTC
                      </p>
                      <p
                        style={{
                          margin: "5px 0 0 0",
                          fontSize: "12px",
                          color: "var(--text-secondary)",
                        }}
                      >
                        ≈ $
                        {(
                          tool.bitcoinPrice * (exchangeRates?.usd || 40000)
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <button
                    className="btn"
                    style={{ width: "100%", marginTop: "15px" }}
                  >
                    Use Tool
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showModelDetails && selectedModel && (
        <div
          className="model-details-modal"
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
                alignItems: "flex-start",
                marginBottom: "20px",
              }}
            >
              <div>
                <h2
                  style={{
                    marginBottom: "5px",
                    color: "var(--accent-primary)",
                  }}
                >
                  {selectedModel.name}
                </h2>
                <p style={{ margin: "0", color: "var(--text-secondary)" }}>
                  by {selectedModel.creator}
                </p>
              </div>
              <button
                onClick={() => setShowModelDetails(false)}
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

            <p style={{ marginBottom: "20px" }}>{selectedModel.description}</p>

            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ marginBottom: "15px" }}>Capabilities</h3>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                {selectedModel.capabilities.map((capability, index) => (
                  <span
                    key={index}
                    style={{
                      background: "rgba(0, 112, 243, 0.1)",
                      color: "var(--accent-primary)",
                      borderRadius: "20px",
                      padding: "8px 15px",
                      fontSize: "14px",
                    }}
                  >
                    {capability}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ marginBottom: "15px" }}>Model Details</h3>
              <div
                className="model-specs"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  borderRadius: "8px",
                  padding: "15px",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "15px",
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
                      Model Type
                    </p>
                    <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                      {selectedModel.type}
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
                      Size
                    </p>
                    <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                      {selectedModel.size}
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
                      License
                    </p>
                    <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                      {selectedModel.license}
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
                      Price
                    </p>
                    <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>
                      {selectedModel.price.toFixed(4)} BTC
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "15px" }}>
              <button
                className="btn"
                style={{ flex: 1 }}
                onClick={() => {
                  setShowModelDetails(false);
                  setActiveTab("training");
                }}
              >
                Train Model
              </button>

              <button
                className="btn btn-outline"
                style={{ flex: 1 }}
                onClick={() => setShowModelDetails(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {paymentConfirmation && (
        <div
          className="payment-confirmation-modal"
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
              You are about to purchase{" "}
              {modelWithConfirmation
                ? `access to ${modelWithConfirmation.name}`
                : selectedTool
                ? `the ${selectedTool.name} tool`
                : ""}
              .
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
                <p style={{ margin: "0" }}>Item:</p>
                <p style={{ margin: "0", fontWeight: "bold" }}>
                  {modelWithConfirmation
                    ? modelWithConfirmation.name
                    : selectedTool
                    ? selectedTool.name
                    : ""}
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
                  {modelWithConfirmation ? modelWithConfirmation.type : "Tool"}
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
                <p style={{ margin: "0", fontWeight: "bold" }}>Total:</p>
                <div style={{ textAlign: "right" }}>
                  <p style={{ margin: "0", fontWeight: "bold" }}>
                    {modelWithConfirmation
                      ? modelWithConfirmation.price.toFixed(4)
                      : selectedTool
                      ? selectedTool.bitcoinPrice.toFixed(4)
                      : 0}{" "}
                    BTC
                  </p>
                  <p
                    style={{
                      margin: "5px 0 0 0",
                      fontSize: "14px",
                      color: "var(--text-secondary)",
                    }}
                  >
                    ≈ $
                    {modelWithConfirmation
                      ? (
                          modelWithConfirmation.price *
                          (exchangeRates?.usd || 40000)
                        ).toFixed(2)
                      : selectedTool
                      ? (
                          selectedTool.bitcoinPrice *
                          (exchangeRates?.usd || 40000)
                        ).toFixed(2)
                      : "0.00"}
                  </p>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => {
                  setPaymentConfirmation(false);
                  setModelWithConfirmation(null);
                }}
                className="btn btn-outline"
                style={{ flex: 1 }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPayment}
                className="btn"
                style={{ flex: 1 }}
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add styling for animations */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .loading-spinner {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default AITools;
