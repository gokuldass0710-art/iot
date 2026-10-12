const mqtt = require("mqtt");
const fs = require("fs");
const path = require("path");

const brokerUrl = process.env.MQTT_BROKER_URL;

const certDir = path.join(__dirname, "certs");

const client = mqtt.connect(brokerUrl, {
  clientId: `antigravity-portal-${Date.now()}`,

  ca: fs.readFileSync(path.join(certDir, "ca.crt")),
  cert: fs.readFileSync(path.join(certDir, "iot-001.crt")),
  key: fs.readFileSync(path.join(certDir, "iot-001.key")),

  rejectUnauthorized: true,

  reconnectPeriod: 5000,
});

const mqttState = {
  connected: false,
  lastTopic: null,
  lastMessage: null,
  lastError: null,
};

client.on("connect", () => {
  mqttState.connected = true;
  mqttState.lastError = null;

  console.log(`[MQTT] Connected to ${brokerUrl} using mTLS`);

  client.subscribe("home/livingroom/temperature", (error) => {
    if (error) {
      mqttState.lastError = error.message;
      console.error("[MQTT] Subscribe error:", error.message);
      return;
    }

    console.log(
      "[MQTT] Subscribed to home/livingroom/temperature"
    );
  });
});

client.on("message", (topic, message) => {
  mqttState.lastTopic = topic;
  mqttState.lastMessage = message.toString();

  console.log(
    `[MQTT] ${topic} -> ${message.toString()}`
  );
});

client.on("error", (error) => {
  mqttState.connected = false;
  mqttState.lastError = error.message;

  console.error("[MQTT] Error:", error.message);
});

client.on("close", () => {
  mqttState.connected = false;
  console.log("[MQTT] Connection closed");
});

function getMqttState() {
  return mqttState;
}

function publish(topic, payload) {
  return new Promise((resolve, reject) => {
    client.publish(
      topic,
      payload,
      { qos: 0 },
      (error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      }
    );
  });
}

module.exports = {
  getMqttState,
  publish,
};