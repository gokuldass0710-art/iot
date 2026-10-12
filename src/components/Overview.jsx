import React from 'react';
import { 
  Shield, 
  Layers, 
  Terminal, 
  Server, 
  Activity, 
  Lock, 
  Radio, 
  CheckCircle, 
  AlertTriangle, 
  ArrowRight,
  Sparkles,
  ExternalLink,
  Zap,
  Box,
  Key
} from 'lucide-react';
import { PROJECT_INFO, VM_PLAN, TOOLS_REFERENCE, NIST_REFERENCES } from '../data/labData';

export default function Overview({ setActiveTab, progressPercent }) {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl glass-panel p-8 border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-12 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Master Antigravity Virtual Security Lab</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight leading-tight">
            Securing Internet of Things (IoT) in <span className="text-gradient-cyan">Smart Home</span> Environments
          </h1>

          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            {PROJECT_INFO.objective}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('architecture')}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-semibold text-sm shadow-lg shadow-cyan-500/25 hover:brightness-110 transition-all cursor-pointer"
            >
              <Layers className="w-4 h-4" />
              <span>Explore Interactive Topology</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('iot-simulator')}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-slate-200 font-medium text-sm transition-all cursor-pointer"
            >
              <Radio className="w-4 h-4 text-cyan-400" />
              <span>Launch mTLS Simulator</span>
            </button>

            <button
              onClick={() => setActiveTab('full-guide')}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200 text-sm transition-all cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View Full Guide</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80">
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
            <div className="text-xs text-slate-400 font-mono uppercase">Implementation Phases</div>
            <div className="text-2xl font-bold font-heading text-cyan-400 mt-1">17 Phases</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Phase 0 to Phase 16</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
            <div className="text-xs text-slate-400 font-mono uppercase">Security Tests</div>
            <div className="text-2xl font-bold font-heading text-purple-400 mt-1">8 Tests</div>
            <div className="text-[11px] text-slate-500 mt-0.5">T01 - T08 Validation Matrix</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
            <div className="text-xs text-slate-400 font-mono uppercase">Virtual Infrastructure</div>
            <div className="text-2xl font-bold font-heading text-emerald-400 mt-1">5 Workstation VMs</div>
            <div className="text-[11px] text-slate-500 mt-0.5">pfSense, Kali, MQTT, Wazuh, IoT</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
            <div className="text-xs text-slate-400 font-mono uppercase">Security Baseline</div>
            <div className="text-2xl font-bold font-heading text-amber-400 mt-1">Zero Trust</div>
            <div className="text-[11px] text-slate-500 mt-0.5">mTLS + ACL + FIM + IDS</div>
          </div>
        </div>
      </div>

      {/* Project Lifecycle Flow */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800">
        <h2 className="text-lg font-bold font-heading text-white flex items-center space-x-2">
          <Zap className="w-5 h-5 text-cyan-400" />
          <span>Project Engineering Lifecycle</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">Continuous security assessment and iteration lifecycle</p>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
          {PROJECT_INFO.lifecycle.map((step, idx) => (
            <React.Fragment key={step}>
              <div className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs flex items-center justify-center font-bold">
                  {idx + 1}
                </span>
                <span className="text-xs font-semibold font-mono text-slate-200">{step}</span>
              </div>
              {idx < PROJECT_INFO.lifecycle.length - 1 && (
                <ArrowRight className="w-4 h-4 text-slate-600 hidden sm:block" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Separation of Responsibilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl glass-panel border border-slate-800 hover:border-cyan-500/40 transition-all">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-3">
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </div>
          <h3 className="font-heading font-bold text-white text-base">Antigravity Workspace</h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Source code, configuration files, diagrams, checklists, python simulators, PKI scripts, and documentation.
          </p>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-slate-800 hover:border-purple-500/40 transition-all">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mb-3">
            <Box className="w-5 h-5 text-purple-400" />
          </div>
          <h3 className="font-heading font-bold text-white text-base">VMware Workstation</h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Virtual laboratory host environment running pfSense, Ubuntu MQTT, Wazuh SIEM, and simulated nodes.
          </p>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-slate-800 hover:border-rose-500/40 transition-all">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mb-3">
            <Terminal className="w-5 h-5 text-rose-400" />
          </div>
          <h3 className="font-heading font-bold text-white text-base">Kali Security Testing</h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Authorized security testing machine executing Nmap scans, mTLS certificate tests, and IDS triggers.
          </p>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-slate-800 hover:border-emerald-500/40 transition-all">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-3">
            <Activity className="w-5 h-5 text-emerald-400" />
          </div>
          <h3 className="font-heading font-bold text-white text-base">Wazuh & Suricata</h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Network Intrusion Detection System (IDS), File Integrity Monitoring (FIM), and SIEM alert dashboard.
          </p>
        </div>
      </div>

      {/* VM Plan Architecture Table */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold font-heading text-white flex items-center space-x-2">
              <Server className="w-5 h-5 text-cyan-400" />
              <span>Virtual Laboratory IP & VM Architecture Plan</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Isolated VLAN networks and IP layout</p>
          </div>
          <button 
            onClick={() => setActiveTab('architecture')}
            className="text-xs font-mono text-cyan-400 hover:underline flex items-center space-x-1"
          >
            <span>View Topology</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono">
                <th className="py-3 px-4 uppercase">Virtual Machine</th>
                <th className="py-3 px-4 uppercase">Purpose / Function</th>
                <th className="py-3 px-4 uppercase">Suggested IP</th>
                <th className="py-3 px-4 uppercase">Network Segment</th>
                <th className="py-3 px-4 uppercase text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {VM_PLAN.map((vm) => (
                <tr key={vm.name} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-200 flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                    <span>{vm.name}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-300 font-sans">{vm.purpose}</td>
                  <td className="py-3 px-4 text-cyan-400">{vm.ip}</td>
                  <td className="py-3 px-4 text-slate-400">{vm.network}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {vm.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Primary References & Compliance Baseline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-slate-800">
          <h2 className="text-lg font-bold font-heading text-white flex items-center space-x-2 mb-4">
            <Key className="w-5 h-5 text-purple-400" />
            <span>Cybersecurity Standards & References</span>
          </h2>
          <div className="space-y-3">
            {NIST_REFERENCES.map((ref) => (
              <div key={ref.code} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-cyan-300">{ref.code}</span>
                  <span className="text-[10px] text-slate-500 font-mono">Official Baseline</span>
                </div>
                <div className="text-xs font-semibold text-slate-200 mt-1">{ref.title}</div>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">{ref.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Tools Overview */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800">
          <h2 className="text-lg font-bold font-heading text-white flex items-center space-x-2 mb-4">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <span>Integrated Security Tooling Reference</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {TOOLS_REFERENCE.map((t) => (
              <div key={t.tool} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-slate-800 text-cyan-400 mt-0.5">
                  <Activity className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-200 font-mono">{t.tool}</div>
                  <div className="text-[11px] text-slate-400 leading-tight mt-0.5">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
