import React, { useState } from 'react';
import { 
  Sliders, 
  Shield, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Play, 
  Lock, 
  Terminal,
  Radio
} from 'lucide-react';
import { FIREWALL_RULES, IOT_DEVICES } from '../data/labData';

export default function FirewallACLMatrix() {
  const [testSource, setTestSource] = useState('IoT VLAN');
  const [testDest, setTestDest] = useState('Admin VLAN');
  const [testResult, setTestResult] = useState(null);

  const sources = ['Admin VLAN', 'IoT VLAN', 'Guest Network'];
  const destinations = ['MQTT Broker (8883)', 'Admin VLAN', 'Internet WAN', 'home/admin/config (ACL)', 'home/livingroom/temperature (ACL)'];

  const evaluateRule = () => {
    if (testSource === 'IoT VLAN' && testDest === 'Admin VLAN') {
      setTestResult({
        status: 'DENIED',
        color: 'text-rose-400 bg-rose-500/10 border-rose-500/40',
        rule: 'pfSense Rule #104: Block IoT_VLAN to Admin_VLAN',
        reason: 'Prevents lateral movement if an IoT device is compromised. Zero Trust isolation.'
      });
    } else if (testSource === 'IoT VLAN' && testDest === 'MQTT Broker (8883)') {
      setTestResult({
        status: 'ALLOWED',
        color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/40',
        rule: 'pfSense Rule #101: Allow IoT_VLAN to MQTT_Server on TCP 8883',
        reason: 'Authorized telemetry ingest over encrypted mTLS listener.'
      });
    } else if (testSource === 'Guest Network' && testDest === 'Admin VLAN') {
      setTestResult({
        status: 'DENIED',
        color: 'text-rose-400 bg-rose-500/10 border-rose-500/40',
        rule: 'pfSense Rule #201: Block Guest_VLAN to Admin_VLAN',
        reason: 'Guest network strict boundary enforcement.'
      });
    } else if (testDest === 'home/admin/config (ACL)') {
      setTestResult({
        status: 'DENIED (ACL VIOLATION)',
        color: 'text-rose-400 bg-rose-500/10 border-rose-500/40',
        rule: 'Mosquitto ACL Rule: pattern readwrite home/%u/#',
        reason: 'IoT-001 does not possess write privileges for administrative topics.'
      });
    } else {
      setTestResult({
        status: 'ALLOWED',
        color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/40',
        rule: 'Standard Permissive Rule',
        reason: 'Traffic conforms to designated network policy.'
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800">
        <h2 className="text-xl font-bold font-heading text-white flex items-center space-x-2">
          <Sliders className="w-5 h-5 text-cyan-400" />
          <span>pfSense Firewall Policy & Mosquitto RBAC ACL Matrix</span>
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Enforce least-privilege network segmentation rules and topic-level authorization ACLs
        </p>
      </div>

      {/* Interactive Rule Tester Sandbox */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800">
        <h3 className="font-heading font-bold text-white text-base mb-4 flex items-center space-x-2">
          <Shield className="w-5 h-5 text-cyan-400" />
          <span>Interactive Connectivity & ACL Simulator</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-2">SOURCE SUBNET / NODE</label>
            <select
              value={testSource}
              onChange={(e) => setTestSource(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              {sources.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-2">DESTINATION / TOPIC</label>
            <select
              value={testDest}
              onChange={(e) => setTestDest(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              {destinations.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={evaluateRule}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-slate-950 text-xs font-mono uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/20 hover:brightness-110 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Evaluate Policy</span>
            </button>
          </div>
        </div>

        {/* Evaluation Result */}
        {testResult && (
          <div className={`p-4 rounded-xl border font-mono text-xs ${testResult.color} animate-fadeIn`}>
            <div className="font-bold text-sm mb-1">EVALUATION RESULT: {testResult.status}</div>
            <div className="text-slate-200 mt-1">{testResult.rule}</div>
            <p className="text-slate-400 text-[11px] mt-1">{testResult.reason}</p>
          </div>
        )}
      </div>

      {/* pfSense Firewall Policy Table */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800">
        <h3 className="font-heading font-bold text-white text-base mb-4 flex items-center space-x-2">
          <Shield className="w-5 h-5 text-emerald-400" />
          <span>pfSense Master Firewall Policy Table</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-3 px-4">SOURCE</th>
                <th className="py-3 px-4">DESTINATION</th>
                <th className="py-3 px-4">SERVICE / PORT</th>
                <th className="py-3 px-4">POLICY ACTION</th>
                <th className="py-3 px-4">RATIONALE / SECURITY INTENT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {FIREWALL_RULES.map((rule, i) => (
                <tr key={i} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-200">{rule.source}</td>
                  <td className="py-3 px-4 text-slate-300">{rule.dest}</td>
                  <td className="py-3 px-4 text-cyan-400">{rule.service}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center space-x-1 font-bold ${rule.color}`}>
                      <span>{rule.result}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-400 text-[11px] font-sans">{rule.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mosquitto Topic ACL Rules Table */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800">
        <h3 className="font-heading font-bold text-white text-base mb-4 flex items-center space-x-2">
          <Radio className="w-5 h-5 text-purple-400" />
          <span>Mosquitto Topic-Level Access Control List (ACL)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {IOT_DEVICES.map((dev) => (
            <div key={dev.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 font-mono text-xs">
              <div className="font-bold text-cyan-300">{dev.id} ({dev.name})</div>
              <div className="text-[11px] text-slate-400 mt-1">CN = {dev.id.toLowerCase()}</div>

              <div className="mt-3 p-2.5 rounded bg-slate-950 border border-slate-900 text-emerald-400 text-[11px]">
                {dev.acl}
              </div>

              <div className="mt-2 p-2.5 rounded bg-slate-950 border border-slate-900 text-rose-400 text-[11px]">
                DENY WRITE home/admin/#
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
