import React, { useState } from 'react';
import { 
  Activity, 
  ShieldAlert, 
  Search, 
  Lock, 
  RotateCcw, 
  CheckCircle, 
  ArrowRight,
  AlertTriangle,
  Play,
  Terminal,
  FileText
} from 'lucide-react';
import { INCIDENT_STEPS } from '../data/labData';

export default function IncidentResponseSim() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const nextStep = () => {
    if (activeStepIndex < INCIDENT_STEPS.length - 1) {
      setActiveStepIndex(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (activeStepIndex > 0) {
      setActiveStepIndex(prev => prev - 1);
    }
  };

  const resetIncident = () => {
    setActiveStepIndex(0);
  };

  const current = INCIDENT_STEPS[activeStepIndex];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-heading text-white flex items-center space-x-2">
            <Activity className="w-5 h-5 text-rose-400" />
            <span>Interactive Cyber Incident Response Simulator (Phase 16)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Simulate a compromised IoT device (IoT-001) lifecycle: Detect, Investigate, Contain, Eradicate, Recover
          </p>
        </div>

        <button
          onClick={resetIncident}
          className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white flex items-center space-x-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restart Incident Workflow</span>
        </button>
      </div>

      {/* 6-Step Visual Timeline */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {INCIDENT_STEPS.map((s, idx) => {
            const isActive = idx === activeStepIndex;
            const isDone = idx < activeStepIndex;

            return (
              <button
                key={s.step}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-3 rounded-xl border font-mono text-xs text-center transition-all ${
                  isActive
                    ? 'bg-rose-500/20 border-rose-500 text-white glow-rose font-bold'
                    : isDone
                    ? 'bg-slate-900 border-emerald-500/40 text-emerald-300'
                    : 'bg-slate-950/60 border-slate-800 text-slate-500'
                }`}
              >
                <div className="text-[10px] uppercase text-slate-400 mb-1">Step {idx + 1}</div>
                <div className="truncate">{s.step.split('. ')[1]}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Step Detailed Action Card */}
      <div className="glass-panel p-6 rounded-2xl border border-rose-900/40 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 font-bold font-mono">
              0{activeStepIndex + 1}
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-lg text-white">{current.step}</h3>
              <p className="text-xs font-mono text-rose-400">Target Node: IoT-001 (192.168.30.101)</p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-500/10 text-rose-300 border border-rose-500/30">
            {current.status}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-900 text-sm text-slate-200 leading-relaxed font-sans">
          {current.action}
        </div>

        {/* Step-specific Command & Artifact Evidence Preview */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-900 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-400 uppercase">SOC Terminal Action / Rule Trigger</span>
            <span className="text-[10px] font-mono text-cyan-400">SOC Operations</span>
          </div>

          <pre className="p-3 rounded-lg bg-slate-900 text-xs font-mono text-cyan-300 overflow-x-auto">
{activeStepIndex === 0 ? `# Suricata EVE JSON Alert
{"timestamp":"2026-09-18T16:00:00","event_type":"alert","src_ip":"192.168.30.101","dest_ip":"192.168.20.20","alert":{"signature":"ET SCAN Nmap SYN Scan"}}` :
activeStepIndex === 1 ? `# SOC Log Correlation (Wazuh SIEM)
/var/ossec/bin/wazuh-control status
grep "192.168.30.101" /var/ossec/logs/alerts/alerts.log` :
activeStepIndex === 2 ? `# pfSense Quarantine Rule Execution
easyrule block LAN 192.168.30.101
pfctl -d; pfctl -e # Apply isolation table` :
activeStepIndex === 3 ? `# Firmware Verification & Cert Revocation
openssl dgst -sha256 -verify firmware_public.key -signature firmware.sig /opt/iot/firmware_v1.bin
openssl ca -revoke /etc/ssl/certs/iot-001.crt` :
activeStepIndex === 4 ? `# Flash Authentic Firmware & Issue New Certificate
openssl req -new -key iot-001-new.key -out iot-001-new.csr
openssl ca -in iot-001-new.csr -out iot-001-new.crt
systemctl restart mosquitto` :
`# Document Lessons Learned
cat << 'EOF' > documentation/monitoring-ir.md
## Incident Summary IoT-001 Compromise
- Root Cause: Weak baseline credentials prior to Phase 7 mTLS enforcement.
- Resolution: mTLS client cert required + Wazuh FIM auto-quarantine.
EOF`}
          </pre>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            onClick={prevStep}
            disabled={activeStepIndex === 0}
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white disabled:opacity-40 cursor-pointer"
          >
            ← Previous Step
          </button>

          <button
            onClick={nextStep}
            disabled={activeStepIndex === INCIDENT_STEPS.length - 1}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 text-white font-mono text-xs font-bold shadow-lg shadow-rose-500/20 hover:brightness-110 disabled:opacity-40 cursor-pointer"
          >
            Next IR Phase →
          </button>
        </div>
      </div>
    </div>
  );
}
