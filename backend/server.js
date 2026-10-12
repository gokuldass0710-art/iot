require("dotenv").config();

const express = require("express");
const cors = require("cors");

const {
  getMqttState,
  publish,
} = require("./mqtt");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    service: "IoT Security Portal Backend",
    status: "online",
  });
});

app.get("/api/mqtt/status", (req, res) => {
  res.json(getMqttState());
});

app.post("/api/mqtt/publish", async (req, res) => {
  try {
    const { topic, payload } = req.body;

    if (!topic || payload === undefined) {
      return res.status(400).json({
        success: false,
        error: "topic and payload are required",
      });
    }

    const message =
      typeof payload === "string"
        ? payload
        : JSON.stringify(payload);

    await publish(topic, message);

    res.json({
      success: true,
      topic,
      payload: message,
    });
  } catch (error) {
    console.error("[API] MQTT publish error:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

const port = 3001;

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});