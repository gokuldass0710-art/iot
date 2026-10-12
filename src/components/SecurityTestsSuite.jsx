import React, { useState } from 'react';
import { 
  Terminal, 
  Copy, 
  Check, 
  ShieldCheck, 
  AlertCircle, 
  FileText, 
  ExternalLink,
  Search
} from 'lucide-react';
import { SECURITY_TESTS } from '../data/labData';

export default function SecurityTestsSuite({ searchQuery }) {
  const [copiedId, setCopiedId] = useState(null);
  const [testResults, setTestResults] = useState({});

  const copyCommand = (id, cmd) => {
    navigator.clipboard.writeText(cmd);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleTestStatus = (id) => {
    setTestResults(prev => ({
      ...prev,
      [id]: prev[id] === 'FAIL' ? 'PASS' : 'FAIL'
    }));
  };

  const filteredTests = SECURITY_TESTS.filter(t => 
    !searchQuery ||
    t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.command.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800">
        <h2 className="text-xl font-bold font-heading text-white flex items-center space-x-2">
          <Terminal className="w-5 h-5 text-cyan-400" />
          <span>Security Validation Test Suite (T01 — T08 Matrix)</span>
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Execute authorized security validation commands from Kali Linux and verify expected security controls
        </p>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTests.map((test) => {
          const currentStatus = testResults[test.id] || test.status;
          const isCopied = copiedId === test.id;

          return (
            <div 
              key={test.id} 
              className="glass-panel p-6 rounded-2xl border border-slate-800/80 hover:border-cyan-500/40 transition-all space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 font-mono text-xs font-bold text-cyan-300">
                    {test.id}
                  </span>
                  <h3 className="font-heading font-bold text-white text-base">{test.title}</h3>
                </div>

                <button
                  onClick={() => toggleTestStatus(test.id)}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all ${
                    currentStatus === 'PASS' 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                      : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                  }`}
                >
                  {currentStatus}
                </button>
              </div>

              <div className="text-xs font-mono text-slate-400">
                Target Node: <span className="text-slate-200 font-bold">{test.target}</span>
              </div>

              {/* Terminal Command Box */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-900 relative group">
                <div className="flex items-center justify-between mb-1.5 text-[10px] font-mono text-slate-500">
                  <span>CLI TEST COMMAND</span>
                  <button
                    onClick={() => copyCommand(test.id, test.command)}
                    className="text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 cursor-pointer"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
                  {test.command}
                </pre>
              </div>

              {/* Expected Result */}
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                <span className="font-mono text-slate-400 block mb-1 uppercase text-[10px]">Expected Security Result</span>
                <p className="text-slate-200 font-sans">{test.expected}</p>
              </div>

              {/* Evidence Naming Requirement */}
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-800">
                <span>Required Evidence File:</span>
                <span className="text-slate-300 font-bold">evidence/screenshots/{test.evidence}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
