import React from 'react';
import { 
  Shield, 
  Cpu, 
  Layers, 
  Terminal, 
  Activity, 
  FileText, 
  CheckSquare, 
  Lock, 
  Radio, 
  Sliders,
  Search,
  Sparkles
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, searchQuery, setSearchQuery, progressPercent }) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: Shield },
    { id: 'architecture', label: 'Lab Topology', icon: Layers },
    { id: 'iot-simulator', label: 'mTLS Simulator', icon: Radio },
    { id: 'firmware', label: 'Firmware & Boot', icon: Lock },
    { id: 'firewall-acl', label: 'Firewall & ACLs', icon: Sliders },
    { id: 'incident-response', label: 'Threat & IR Lab', icon: Activity },
    { id: 'phases', label: 'Phases & Roadmap', icon: CheckSquare },
    { id: 'security-tests', label: 'Tests (T01-T08)', icon: Terminal },
    { id: 'full-guide', label: 'Master Guide', icon: FileText }
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Lab Status */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('overview')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1px] shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-cyan-400 animate-pulse-glow" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-heading font-extrabold text-lg text-white tracking-wide">
                  ANTIGRAVITY <span className="text-gradient-cyan">IoT LAB</span>
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping mr-1.5"></span>
                  LIVE LAB
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">IoT Smart Home Security Operations Portal</p>
            </div>
          </div>

          {/* Search bar & Progress meter */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search guide, commands, tests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 bg-slate-900/80 border border-slate-700/60 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono"
              />
            </div>

            {/* Progress Badge */}
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Completion</span>
                <span className="text-xs font-bold text-cyan-400 font-mono">{progressPercent}%</span>
              </div>
              <div className="w-12 bg-slate-800 h-1.5 rounded-full overflow-hidden ml-1">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <nav className="flex space-x-1 overflow-x-auto no-scrollbar py-2 border-t border-slate-800/60">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
