import React, { useState } from 'react';
import {
  Radio,
  Lock,
  Unlock,
  Cpu,
  Terminal,
  Activity,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Play,
  RotateCcw,
  ShieldCheck,
  Zap,
  FileCode
} from 'lucide-react';
import { IOT_DEVICES } from '../data/labData';

export default function IoTDeviceSimulator() {
  const [selectedDevice, setSelectedDevice] = useState(IOT_DEVICES[0]);
  const [useMTLS, setUseMTLS] = useState(true);
  const [logs, setLogs] = useState([
    { id: 1, time: new Date().toLocaleTimeString(), type: 'info', text: 'MQTT Simulator initialized. Waiting for telemetry burst...' }
  ]);
  const [packetStream, setPacketStream] = useState([]);
  const [isPublishing, setIsPublishing] = useState(false);
  const [tempValue, setTempValue] = useState(24.5);

  const handlePublish = () => {
    setIsPublishing(true);
    const timestamp = new Date().toLocaleTimeString();
    const currentTemp = (20 + Math.random() * 12).toFixed(1);
    setTempValue(parseFloat(currentTemp));

    let payload = {
      device_id: selectedDevice.id.toLowerCase(),
      timestamp: Date.now(),
      topic: selectedDevice.topic
    };

    if (selectedDevice.id === 'IoT-001') {
      payload.temperature = parseFloat(currentTemp);
      payload.unit = 'C';
    } else if (selectedDevice.id === 'IoT-002') {
      payload.motion_detected = Math.random() > 0.4;
    } else {
      payload.door_state = Math.random() > 0.5 ? 'LOCKED' : 'UNLOCKED';
      payload.tamper_alert = false;
    }

    const payloadStr = JSON.stringify(payload);
    fetch("http://localhost:3001/api/mqtt/publish", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic: selectedDevice.topic,
        payload,
      }),
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "MQTT publish failed");
        }

        console.log("[MQTT] Published successfully:", data);
      })
      .catch((error) => {
        console.error("[MQTT] Publish error:", error);
      });
    setTimeout(() => {
      if (useMTLS) {
        setLogs(prev => [
          { id: Date.now(), time: timestamp, type: 'success', text: `[TLS 8883] Certificate ${selectedDevice.cert} verified. Handshake completed.` },
          { id: Date.now() + 1, time: timestamp, type: 'info', text: `[mTLS] Encrypted payload published to ${selectedDevice.topic}` },
          ...prev
        ]);

        setPacketStream(prev => [
          {
            id: Date.now(),
            port: 8883,
            tls: true,
            hex: '16 03 03 00 4b 01 00 00 47 03 03 5e 9d 3a 4f ... [ENCRYPTED APPLICATION DATA]',
            payload: '🔒 ENCRYPTED TLS 1.3 CIPHERTEXT (Payload hidden from eavesdroppers)'
          },
          ...prev.slice(0, 4)
        ]);
      } else {
        setLogs(prev => [
          { id: Date.now(), time: timestamp, type: 'warning', text: `[TCP 1883] PLAINTEXT publishing without certificate authentication!` },
          { id: Date.now() + 1, time: timestamp, type: 'danger', text: `[PLAINTEXT] ${payloadStr}` },
          ...prev
        ]);

        setPacketStream(prev => [
          {
            id: Date.now(),
            port: 1883,
            tls: false,
            hex: '30 2f 00 1a 68 6f 6d 65 2f 6c 69 76 69 6e 67 72 6f 6f 6d ...',
            payload: payloadStr
          },
          ...prev.slice(0, 4)
        ]);
      }
      setIsPublishing(false);
    }, 400);
  };

  const clearConsole = () => {
    setLogs([]);
    setPacketStream([]);
  };

  return (
    <div className="space-y-6">
      {/* Simulator Control Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-heading text-white flex items-center space-x-2">
            <Radio className="w-5 h-5 text-cyan-400" />
            <span>Interactive IoT Device Telemetry & mTLS Simulator</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Test simulated Python IoT devices publishing to Mosquitto over TCP 1883 vs TLS 8883
          </p>
        </div>

        {/* Security Mode Switcher */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setUseMTLS(!useMTLS)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${useMTLS
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40 glow-emerald'
              : 'bg-rose-500/10 text-rose-400 border-rose-500/40 glow-rose'
              }`}
          >
            {useMTLS ? <Lock className="w-4 h-4 text-emerald-400" /> : <Unlock className="w-4 h-4 text-rose-400" />}
            <span>{useMTLS ? 'SECURE mTLS (PORT 8883)' : 'UNSECURE PLAINTEXT (PORT 1883)'}</span>
          </button>
        </div>
      </div>

      {/* Simulator Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Column 1: Device Controls & Python Code Preview */}
        <div className="space-y-6">
          <div className="glass-panel p-5 rounded-2xl border border-slate-800">
            <h3 className="font-heading font-bold text-white text-sm mb-4 flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Select Active IoT Node</span>
            </h3>

            <div className="space-y-3">
              {IOT_DEVICES.map((dev) => (
                <button
                  key={dev.id}
                  onClick={() => setSelectedDevice(dev)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${selectedDevice.id === dev.id
                    ? 'bg-cyan-500/15 border-cyan-500/50 text-white shadow-md'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                >
                  <div>
                    <div className="font-bold text-xs font-mono text-cyan-300">{dev.id}</div>
                    <div className="text-xs font-medium text-slate-200 mt-0.5">{dev.name}</div>
                    <div className="text-[10px] font-mono text-slate-500 mt-1">{dev.topic}</div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {dev.cert}
                  </span>
                </button>
              ))}
            </div>

            {/* Trigger Button */}
            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className="mt-5 w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-slate-950 text-xs font-mono uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/20 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>{isPublishing ? 'Transmitting...' : 'Send Telemetry Burst'}</span>
            </button>
          </div>

          {/* Python Device Code Preview Card */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-heading font-bold text-white text-xs flex items-center space-x-2">
                <FileCode className="w-4 h-4 text-purple-400" />
                <span>Simulated Python Snippet</span>
              </h3>
              <span className="text-[10px] font-mono text-slate-500">Paho-MQTT</span>
            </div>

            <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-900 text-[11px] font-mono text-cyan-300 overflow-x-auto leading-relaxed">
              {useMTLS ? `import paho.mqtt.client as mqtt

client = mqtt.Client(client_id="${selectedDevice.id.toLowerCase()}")
client.tls_set(
    ca_certs="pki/ca.crt",
    certfile="pki/${selectedDevice.cert}",
    keyfile="pki/${selectedDevice.id.toLowerCase()}.key"
)
client.connect("192.168.20.20", 8883)
client.publish("${selectedDevice.topic}", payload)` : `import paho.mqtt.client as mqtt

# ⚠️ PLAINTEXT MODE (INSECURE)
client = mqtt.Client(client_id="${selectedDevice.id.toLowerCase()}")
client.connect("192.168.20.20", 1883)
client.publish("${selectedDevice.topic}", payload)`}
            </pre>
          </div>
        </div>

        {/* Column 2 & 3: Live Terminal & Wireshark Packet Inspection */}
        <div className="lg:col-span-2 space-y-6">

          {/* Terminal Logs Output */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="font-mono font-bold text-xs text-slate-200">MQTT BROKER CONSOLE LOGS</span>
              </div>
              <button
                onClick={clearConsole}
                className="text-[10px] font-mono text-slate-500 hover:text-slate-300 flex items-center space-x-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Clear</span>
              </button>
            </div>

            <div className="h-48 overflow-y-auto font-mono text-xs space-y-2 p-3 bg-slate-950 rounded-xl border border-slate-900">
              {logs.length === 0 ? (
                <div className="text-slate-600 italic">No telemetry logs recorded. Click "Send Telemetry Burst" above.</div>
              ) : (
                logs.map((log) => (
                  <div key={log.id} className="flex items-start space-x-2">
                    <span className="text-slate-500 text-[10px]">{log.time}</span>
                    <span className={
                      log.type === 'success' ? 'text-emerald-400 font-semibold' :
                        log.type === 'warning' ? 'text-amber-400 font-semibold' :
                          log.type === 'danger' ? 'text-rose-400 font-bold' : 'text-slate-300'
                    }>
                      {log.text}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Packet Inspector (Wireshark Simulation) */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-purple-400" />
                <span className="font-mono font-bold text-xs text-slate-200">WIRESHARK PACKET CAPTURE INSPECTOR</span>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${useMTLS ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                }`}>
                {useMTLS ? 'TLS 1.3 CIPHERTEXT ENCRYPTED' : '⚠️ UNENCRYPTED PLAINTEXT EXPOSED'}
              </span>
            </div>

            <div className="space-y-3">
              {packetStream.length === 0 ? (
                <div className="p-8 text-center text-slate-600 font-mono text-xs border border-dashed border-slate-800 rounded-xl">
                  Waiting for network traffic capture...
                </div>
              ) : (
                packetStream.map((pkt) => (
                  <div
                    key={pkt.id}
                    className={`p-4 rounded-xl border font-mono text-xs space-y-2 ${pkt.tls
                      ? 'bg-slate-900/60 border-emerald-800/40 text-emerald-300'
                      : 'bg-rose-950/20 border-rose-800/50 text-rose-300'
                      }`}
                  >
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Destination: 192.168.20.20:{pkt.port}</span>
                      <span className="font-bold">{pkt.tls ? 'TLSv1.3 Application Data' : 'MQTT Publish Message'}</span>
                    </div>

                    <div className="p-2 bg-slate-950 rounded border border-slate-900 text-[10px] text-slate-500 overflow-x-auto">
                      HEX: {pkt.hex}
                    </div>

                    <div className="p-2.5 rounded bg-slate-950/80 border border-slate-800 text-xs font-semibold">
                      PAYLOAD: {pkt.payload}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
