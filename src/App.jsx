import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Overview from './components/Overview';
import ArchitectureDiagram from './components/ArchitectureDiagram';
import IoTDeviceSimulator from './components/IoTDeviceSimulator';
import FirmwareLab from './components/FirmwareLab';
import FirewallACLMatrix from './components/FirewallACLMatrix';
import IncidentResponseSim from './components/IncidentResponseSim';
import PhasesRoadmap from './components/PhasesRoadmap';
import SecurityTestsSuite from './components/SecurityTestsSuite';
import FullGuideViewer from './components/FullGuideViewer';
import { LAB_PHASES } from './data/labData';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Initialize completed tasks state from localStorage
  const [completedTasks, setCompletedTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('iot_lab_completed_tasks');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  // Save to localStorage when completedTasks changes
  useEffect(() => {
    try {
      localStorage.setItem('iot_lab_completed_tasks', JSON.stringify(completedTasks));
    } catch (e) {
      console.error(e);
    }
  }, [completedTasks]);

  const toggleTask = (taskId) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  // Calculate overall progress percentage across all phases
  const totalTasksCount = LAB_PHASES.reduce((acc, phase) => acc + phase.doneWhen.length, 0);
  const completedTasksCount = Object.values(completedTasks).filter(Boolean).length;
  const progressPercent = totalTasksCount > 0 
    ? Math.round((completedTasksCount / totalTasksCount) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Top Navbar */}
      <Navbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        progressPercent={progressPercent}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <Overview setActiveTab={setActiveTab} progressPercent={progressPercent} />
        )}
        {activeTab === 'architecture' && (
          <ArchitectureDiagram />
        )}
        {activeTab === 'iot-simulator' && (
          <IoTDeviceSimulator />
        )}
        {activeTab === 'firmware' && (
          <FirmwareLab />
        )}
        {activeTab === 'firewall-acl' && (
          <FirewallACLMatrix />
        )}
        {activeTab === 'incident-response' && (
          <IncidentResponseSim />
        )}
        {activeTab === 'phases' && (
          <PhasesRoadmap 
            completedTasks={completedTasks} 
            toggleTask={toggleTask}
            searchQuery={searchQuery}
          />
        )}
        {activeTab === 'security-tests' && (
          <SecurityTestsSuite searchQuery={searchQuery} />
        )}
        {activeTab === 'full-guide' && (
          <FullGuideViewer searchQuery={searchQuery} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span className="text-slate-400 font-bold">IoT Smart Home Security Project</span> — Antigravity Master Lab Portal
          </div>
          <div className="flex items-center space-x-4 text-[11px]">
            <span>pfSense 2.7</span>
            <span>•</span>
            <span>Mosquitto MQTT v5</span>
            <span>•</span>
            <span>Suricata IDS</span>
            <span>•</span>
            <span>Wazuh v4.7 SIEM</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
