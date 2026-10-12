import React, { useState } from 'react';
import { 
  Shield, 
  Server, 
  Terminal, 
  Cpu, 
  Radio, 
  Activity, 
  Lock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Info,
  Zap,
  Layers,
  ArrowDown,
  ArrowRight,
  RefreshCw
} from 'lucide-react';

export default function ArchitectureDiagram() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [isMTLSEnabled, setIsMTLSEnabled] = useState(true);
  const [activeTraffic, setActiveTraffic] = useState('normal'); // 'normal', 'attack', 'blocked'

  const nodes = [
    {
      id: 'pfsense',
      name: 'pfSense Firewall',
      type: 'Gateway Router',
      vlan: 'Gateway Matrix',
      ip: '192.168.x.1',
      status: 'Active',
      color: 'from-blue-600 to-cyan-600',
      icon: Shield,
      details: 'Central stateful firewall router providing DHCP, NAT, Suricata inline inspection, and strict least-privilege VLAN routing policies.'
    },
    {
      id: 'kali',
      name: 'Kali Linux',
      type: 'Security Testing',
      vlan: 'Admin VLAN (192.168.10.0/24)',
      ip: '192.168.10.10',
      status: 'Authorized Tester',
      color: 'from-rose-600 to-orange-600',
      icon: Terminal,
      details: 'Authorized security audit host equipped with Nmap, Wireshark, Metasploit, and custom Python mTLS verification tools.'
    },
    {
      id: 'mqtt',
      name: 'Mosquitto Broker',
      type: 'MQTT Message Broker',
      vlan: 'Server VLAN (192.168.20.0/24)',
      ip: '192.168.20.20',
      status: 'Active (TLS 8883)',
      color: 'from-emerald-600 to-teal-600',
      icon: Radio,
      details: 'Mosquitto MQTT broker enforcing mTLS (require_certificate true) on port 8883 and topic-level ACL authorization.'
    },
    {
      id: 'wazuh',
      name: 'Wazuh SIEM & FIM',
      type: 'Central Log Analyst',
      vlan: 'Server VLAN (192.168.20.0/24)',
      ip: '192.168.20.30',
      status: 'Active Monitoring',
      color: 'from-purple-600 to-indigo-600',
      icon: Activity,
      details: 'Central SIEM ingesting Suricata IDS eve.json, Mosquitto authentication logs, and monitoring /opt/iot/firmware/ with syscheck FIM.'
    },
    {
      id: 'suricata',
      name: 'Suricata IDS',
      type: 'Network Intrusion Detection',
      vlan: 'Server & Gateway Inline',
      ip: 'Inline 192.168.20.1',
      status: 'Active Inspection',
      color: 'from-amber-600 to-yellow-600',
      icon: Zap,
      details: 'Deep packet inspection engine looking for Nmap port scans, unauthorized subnets access, and anomalous MQTT payloads.'
    },
    {
      id: 'iot001',
      name: 'IoT-001 (Temp)',
      type: 'Temperature Sensor',
      vlan: 'IoT VLAN (192.168.30.0/24)',
      ip: '192.168.30.101',
      status: 'Reporting Telemetry',
      color: 'from-cyan-600 to-blue-600',
      icon: Cpu,
      details: 'Simulated Python temperature sensor publishing JSON telemetry to home/livingroom/temperature using device cert iot-001.crt.'
    },
    {
      id: 'iot002',
      name: 'IoT-002 (Motion)',
      type: 'Motion Detector',
      vlan: 'IoT VLAN (192.168.30.0/24)',
      ip: '192.168.30.102',
      status: 'Reporting Telemetry',
      color: 'from-cyan-600 to-blue-600',
      icon: Cpu,
      details: 'Simulated motion sensor publishing trigger events to home/livingroom/motion using device cert iot-002.crt.'
    },
    {
      id: 'iot003',
      name: 'IoT-003 (Door)',
      type: 'Door Sensor Lock',
      vlan: 'IoT VLAN (192.168.30.0/24)',
      ip: '192.168.30.103',
      status: 'Reporting Telemetry',
      color: 'from-cyan-600 to-blue-600',
      icon: Cpu,
      details: 'Simulated door lock status sensor publishing state updates to home/frontdoor/status using device cert iot-003.crt.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Control Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-heading text-white flex items-center space-x-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <span>Virtual Network Architecture & Traffic Visualizer</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Interactive multi-VLAN layout with pfSense Firewall, Server & IoT Segments
          </p>
        </div>

        {/* Interactive Controls */}
        <div className="flex items-center space-x-3">
          {/* mTLS Mode Switcher */}
          <button
            onClick={() => setIsMTLSEnabled(!isMTLSEnabled)}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all border ${
              isMTLSEnabled
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40 glow-emerald'
                : 'bg-rose-500/10 text-rose-400 border-rose-500/40 glow-rose'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{isMTLSEnabled ? 'mTLS 8883 (ENCRYPTED)' : 'Plaintext 1883 (UNSECURE)'}</span>
          </button>

          {/* Traffic Simulation Selector */}
          <div className="flex bg-slate-900 rounded-xl p-1 border border-slate-800">
            <button
              onClick={() => setActiveTraffic('normal')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                activeTraffic === 'normal' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Normal Telemetry
            </button>
            <button
              onClick={() => setActiveTraffic('attack')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                activeTraffic === 'attack' ? 'bg-rose-500 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Nmap Scan (T06)
            </button>
            <button
              onClick={() => setActiveTraffic('blocked')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                activeTraffic === 'blocked' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              VLAN Cross-Talk (T02)
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Diagram Canvas */}
      <div className="relative rounded-2xl glass-panel p-6 border border-slate-800 overflow-hidden min-h-[560px] bg-slate-950">
        
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none"></div>

        {/* Internet WAN Gateway */}
        <div className="flex justify-center mb-6">
          <div className="px-6 py-2 rounded-xl bg-slate-900 border border-slate-700 text-center font-mono text-xs text-slate-300 shadow-md">
            <span>INTERNET / EXTERNAL WAN</span>
          </div>
        </div>

        {/* Central Router Node: pfSense Firewall */}
        <div className="flex justify-center mb-8">
          <div 
            onClick={() => setSelectedNode(nodes.find(n => n.id === 'pfsense'))}
            className="group relative cursor-pointer px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-900/80 to-cyan-900/80 border border-cyan-500/50 shadow-xl shadow-cyan-500/10 hover:border-cyan-400 transition-all text-center max-w-xs"
          >
            <div className="flex items-center justify-center space-x-2">
              <Shield className="w-6 h-6 text-cyan-400 animate-pulse-glow" />
              <span className="font-heading font-extrabold text-white text-base">pfSense Firewall</span>
            </div>
            <p className="text-[11px] font-mono text-cyan-300 mt-1">Gateway Router (192.168.x.1)</p>
            <div className="mt-2 flex items-center justify-center space-x-2 text-[10px] font-mono text-slate-400">
              <span>VLAN Router</span>
              <span>•</span>
              <span className="text-emerald-400">Filtering Active</span>
            </div>
          </div>
        </div>

        {/* Network Segments Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">

          {/* ADMIN VLAN (192.168.10.0/24) */}
          <div className="rounded-xl bg-slate-900/40 border border-rose-900/40 p-4 relative">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-rose-900/30">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span className="font-mono font-bold text-xs text-rose-300">ADMIN VLAN</span>
              </div>
              <span className="font-mono text-[11px] text-slate-500">192.168.10.0/24</span>
            </div>

            {/* Kali Linux Node */}
            <div 
              onClick={() => setSelectedNode(nodes.find(n => n.id === 'kali'))}
              className="p-4 rounded-xl bg-slate-900/80 border border-rose-800/40 hover:border-rose-500 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Terminal className="w-5 h-5 text-rose-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="font-heading font-bold text-sm text-slate-100">Kali Linux</div>
                    <div className="text-[11px] font-mono text-rose-400">192.168.10.10</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20">
                  TESTER
                </span>
              </div>
            </div>

            {/* Traffic indicator overlay */}
            {activeTraffic === 'attack' && (
              <div className="mt-3 p-2 rounded bg-rose-500/20 border border-rose-500/40 text-[11px] font-mono text-rose-200 animate-pulse flex items-center justify-between">
                <span>Sending Nmap Scan...</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            )}
          </div>

          {/* SERVER VLAN (192.168.20.0/24) */}
          <div className="rounded-xl bg-slate-900/40 border border-purple-900/40 p-4 relative">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-purple-900/30">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                <span className="font-mono font-bold text-xs text-purple-300">SERVER VLAN</span>
              </div>
              <span className="font-mono text-[11px] text-slate-500">192.168.20.0/24</span>
            </div>

            <div className="space-y-3">
              {/* Mosquitto MQTT Broker */}
              <div 
                onClick={() => setSelectedNode(nodes.find(n => n.id === 'mqtt'))}
                className="p-3.5 rounded-xl bg-slate-900/80 border border-emerald-800/40 hover:border-emerald-500 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Radio className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="font-heading font-bold text-sm text-slate-100">Mosquitto MQTT</div>
                      <div className="text-[11px] font-mono text-emerald-400">192.168.20.20</div>
                    </div>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                    isMTLSEnabled ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                  }`}>
                    {isMTLSEnabled ? 'PORT 8883' : 'PORT 1883'}
                  </span>
                </div>
              </div>

              {/* Wazuh SIEM */}
              <div 
                onClick={() => setSelectedNode(nodes.find(n => n.id === 'wazuh'))}
                className="p-3.5 rounded-xl bg-slate-900/80 border border-purple-800/40 hover:border-purple-500 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Activity className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="font-heading font-bold text-sm text-slate-100">Wazuh SIEM</div>
                      <div className="text-[11px] font-mono text-purple-400">192.168.20.30</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                    SOC
                  </span>
                </div>
              </div>

              {/* Suricata IDS */}
              <div 
                onClick={() => setSelectedNode(nodes.find(n => n.id === 'suricata'))}
                className="p-3.5 rounded-xl bg-slate-900/80 border border-amber-800/40 hover:border-amber-500 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Zap className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="font-heading font-bold text-sm text-slate-100">Suricata IDS</div>
                      <div className="text-[11px] font-mono text-amber-400">eve.json Log Stream</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    IDS
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* IOT VLAN (192.168.30.0/24) */}
          <div className="rounded-xl bg-slate-900/40 border border-cyan-900/40 p-4 relative">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-cyan-900/30">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span>
                <span className="font-mono font-bold text-xs text-cyan-300">IoT VLAN</span>
              </div>
              <span className="font-mono text-[11px] text-slate-500">192.168.30.0/24</span>
            </div>

            <div className="space-y-3">
              {['iot001', 'iot002', 'iot003'].map((id) => {
                const device = nodes.find(n => n.id === id);
                return (
                  <div 
                    key={id}
                    onClick={() => setSelectedNode(device)}
                    className="p-3.5 rounded-xl bg-slate-900/80 border border-cyan-800/40 hover:border-cyan-400 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Cpu className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                        <div>
                          <div className="font-heading font-bold text-sm text-slate-100">{device.name}</div>
                          <div className="text-[11px] font-mono text-cyan-400">{device.ip}</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                        {isMTLSEnabled ? 'mTLS CERT' : 'UNSECURE'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Traffic Status Indicator */}
            {activeTraffic === 'blocked' && (
              <div className="mt-3 p-2 rounded bg-amber-500/20 border border-amber-500/40 text-[11px] font-mono text-amber-200 flex items-center justify-between">
                <span className="flex items-center space-x-1">
                  <XCircle className="w-3.5 h-3.5 text-rose-400" />
                  <span>IoT to Admin BLOCKED by pfSense</span>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Legend Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 font-mono gap-4">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span>Encrypted mTLS (8883)</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
              <span>Denied Cross-VLAN Traffic</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
              <span>SOC Alert Ingest</span>
            </span>
          </div>
          <div>Click any node to view configuration details & security policies</div>
        </div>
      </div>

      {/* Selected Node Detail Side Drawer Modal */}
      {selectedNode && (
        <div className="glass-panel p-6 rounded-2xl border border-cyan-500/30 animate-fadeIn relative">
          <button 
            onClick={() => setSelectedNode(null)}
            className="absolute top-4 right-4 text-slate-400 hover:text-white text-xs font-mono p-1 rounded bg-slate-800"
          >
            ✕ CLOSE
          </button>

          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30">
              <selectedNode.icon className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-white">{selectedNode.name}</h3>
              <p className="text-xs font-mono text-cyan-400">{selectedNode.vlan} • {selectedNode.ip}</p>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800 mb-4">
            {selectedNode.details}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-500 block uppercase text-[10px]">Node Type</span>
              <span className="text-slate-200 font-bold">{selectedNode.type}</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-500 block uppercase text-[10px]">Current Status</span>
              <span className="text-emerald-400 font-bold">{selectedNode.status}</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-500 block uppercase text-[10px]">Assigned Segment</span>
              <span className="text-cyan-300 font-bold">{selectedNode.ip}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
