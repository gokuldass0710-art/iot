import React, { useState } from 'react';
import { 
  CheckSquare, 
  Square, 
  ChevronDown, 
  ChevronRight, 
  Filter, 
  Sparkles,
  Layers,
  Terminal,
  Activity,
  Shield,
  FileText
} from 'lucide-react';
import { LAB_PHASES } from '../data/labData';

export default function PhasesRoadmap({ completedTasks, toggleTask, searchQuery }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedPhases, setExpandedPhases] = useState([0, 1, 6, 7]);

  const categories = ['All', 'Infrastructure', 'IoT', 'Security', 'Monitoring', 'Testing'];

  const toggleExpand = (phaseId) => {
    setExpandedPhases(prev =>
      prev.includes(phaseId) ? prev.filter(id => id !== phaseId) : [...prev, phaseId]
    );
  };

  const filteredPhases = LAB_PHASES.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.doneWhen.some(item => item.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header & Category Filters */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-heading text-white flex items-center space-x-2">
            <CheckSquare className="w-5 h-5 text-cyan-400" />
            <span>17-Phase Implementation Roadmap & Progress Tracker</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Track phase objectives, verification criteria, and task completion state
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Phases Accordion Cards */}
      <div className="space-y-4">
        {filteredPhases.map((phase) => {
          const isExpanded = expandedPhases.includes(phase.id);
          const totalItems = phase.doneWhen.length;
          const completedInPhase = phase.doneWhen.filter((_, idx) => 
            completedTasks[`phase_${phase.id}_item_${idx}`]
          ).length;
          const phasePercent = Math.round((completedInPhase / totalItems) * 100);

          return (
            <div 
              key={phase.id} 
              className="glass-panel rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-all overflow-hidden"
            >
              {/* Phase Summary Bar */}
              <div 
                onClick={() => toggleExpand(phase.id)}
                className="p-5 cursor-pointer flex flex-wrap items-center justify-between gap-4 bg-slate-900/40 hover:bg-slate-900/80 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-1 rounded text-slate-400">
                    {isExpanded ? <ChevronDown className="w-5 h-5 text-cyan-400" /> : <ChevronRight className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-heading font-bold text-base text-white">{phase.title}</h3>
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-800 text-cyan-300 border border-slate-700">
                        {phase.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{phase.description}</p>
                  </div>
                </div>

                {/* Progress Mini Meter */}
                <div className="flex items-center space-x-3 ml-auto">
                  <div className="text-right font-mono text-xs">
                    <span className="text-cyan-400 font-bold">{completedInPhase}/{totalItems}</span>
                    <span className="text-slate-500 text-[10px] block">Tasks Done</span>
                  </div>
                  <div className="w-16 bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-cyan-400 h-full rounded-full transition-all duration-300"
                      style={{ width: `${phasePercent}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Phase Expanded Checklist */}
              {isExpanded && (
                <div className="p-5 border-t border-slate-800/60 bg-slate-950/60 space-y-3 animate-fadeIn">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    VERIFICATION CHECKLIST ("DONE WHEN"):
                  </div>

                  <div className="space-y-2">
                    {phase.doneWhen.map((criterion, idx) => {
                      const taskId = `phase_${phase.id}_item_${idx}`;
                      const isChecked = !!completedTasks[taskId];

                      return (
                        <div 
                          key={idx}
                          onClick={() => toggleTask(taskId)}
                          className={`flex items-start space-x-3 p-3 rounded-xl border transition-all cursor-pointer ${
                            isChecked
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-slate-200'
                              : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <div className="mt-0.5">
                            {isChecked ? (
                              <CheckSquare className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-600" />
                            )}
                          </div>
                          <span className={`text-xs font-mono leading-relaxed ${isChecked ? 'line-through text-slate-400' : ''}`}>
                            {criterion}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
