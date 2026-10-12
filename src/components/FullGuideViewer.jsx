import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  BookOpen, 
  Copy, 
  Check, 
  ExternalLink,
  ChevronRight,
  Shield,
  Code
} from 'lucide-react';

export default function FullGuideViewer({ searchQuery }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const sections = [
    { id: "s1", title: "1. Purpose & Responsibilities", text: `Antigravity = project workspace, source code, configuration files, documentation, diagrams, checklists, and development assistance.\nVMware Workstation 17 Pro = virtual laboratory platform.\nKali Linux = authorized security testing.\npfSense = firewall & network segmentation gateway.\nMosquitto = MQTT broker with mTLS on port 8883.` },
    { id: "s2", title: "2. Project Objective & Lifecycle", text: `Build a controlled virtual smart-home environment and demonstrate IoT identification, authentication, authorization, mTLS encryption, firmware signing, Suricata IDS, and Wazuh SIEM.` },
    { id: "s4", title: "4. Network & Node Architecture", text: `Admin VLAN: 192.168.10.0/24 (Kali Linux 192.168.10.10)\nServer VLAN: 192.168.20.0/24 (MQTT Broker 192.168.20.20, Wazuh SIEM 192.168.20.30)\nIoT VLAN: 192.168.30.0/24 (IoT-001 192.168.30.101, IoT-002 192.168.30.102, IoT-003 192.168.30.103)` },
    { id: "s6", title: "6. Project Folder Structure", text: `IoT-Security-Project/\n├── LAB-SIMULATION.md\n├── PROJECT-STATUS.md\n├── architecture/\n├── iot-devices/\n├── mqtt/\n├── pki/\n├── firmware/\n├── suricata/\n├── wazuh/\n├── tests/\n└── evidence/` },
    { id: "s8", title: "8. Firewall Policy", text: `Admin -> Server: ALLOW\nAdmin -> IoT: ALLOW\nIoT -> MQTT: ALLOW (Port 8883)\nIoT -> Admin: DENY\nGuest -> IoT: DENY\nGuest -> Admin: DENY` },
    { id: "s10", title: "10. Firmware Integrity & Secure Boot", text: `openssl genrsa -out firmware_private.key 3072\nopenssl rsa -in firmware_private.key -pubout -out firmware_public.key\nopenssl dgst -sha256 -sign firmware_private.key -out firmware.sig firmware_v1.bin\nopenssl dgst -sha256 -verify firmware_public.key -signature firmware.sig firmware_v1.bin` },
    { id: "s13", title: "13 & 14. Wazuh SIEM & File Integrity Monitoring (FIM)", text: `Wazuh ingests Suricata eve.json alerts, Mosquitto authentication logs, and monitors /opt/iot/firmware/ with syscheck FIM.` },
    { id: "s16", title: "16. Incident Response Scenario", text: `1. Detection (Suricata / Wazuh Alert)\n2. Investigation (Log Correlation)\n3. Containment (pfSense Quarantine Rule)\n4. Eradication (Firmware Hash Verification & Cert Revocation)\n5. Recovery (Restore Authentic Firmware & Reissue Cert)\n6. Lessons Learned (Documentation)` },
    { id: "s20", title: "20. Operating Rules & Constraints", text: `Do NOT scan systems outside the lab.\nKeep private keys out of Git.\nAlways keep test evidence in evidence/ directory.` }
  ];

  const copySnippet = (idx, text) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const filteredSections = sections.filter(s =>
    !searchQuery ||
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800">
        <h2 className="text-xl font-bold font-heading text-white flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-cyan-400" />
          <span>Master Antigravity Project Guide Viewer</span>
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Authoritative technical specifications and lab setup guide from IoT_Smart_Home_Security_Antigravity_Lab_Guide.md
        </p>
      </div>

      {/* Sections Cards */}
      <div className="space-y-6">
        {filteredSections.map((sec, idx) => (
          <div key={sec.id} className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-lg text-white flex items-center space-x-2">
                <ChevronRight className="w-4 h-4 text-cyan-400" />
                <span>{sec.title}</span>
              </h3>

              <button
                onClick={() => copySnippet(idx, sec.text)}
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 cursor-pointer bg-slate-900 px-2.5 py-1 rounded border border-slate-800"
              >
                {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedIndex === idx ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-900">
              <pre className="text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed">
                {sec.text}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
