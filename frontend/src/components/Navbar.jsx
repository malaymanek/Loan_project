import React from 'react';
import { ShieldAlert, Activity, Database, Cpu, Sparkles, Server, Laptop } from 'lucide-react';
import metadata from '../data/modelMetadata.json';

export default function Navbar({ activeTab, setActiveTab, isBackendOnline, mode, onToggleMode }) {
  const tabs = [
    { id: 'assessment', label: 'Loan Assessment', icon: ShieldAlert },
    { id: 'explainability', label: 'XAI Risk Factors', icon: Sparkles },
    { id: 'insights', label: 'Model Performance', icon: Cpu },
    { id: 'batch', label: 'Batch Simulator', icon: Database },
  ];

  const metrics = metadata?.metrics;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Model Info */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('assessment')}>
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-black tracking-tight text-white">
                  Loan<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Guard</span> <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-cyan-400 border border-cyan-500/30">ML 2.0</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Loan Default Risk Assessment &bull; 88.53% Accuracy
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex space-x-1 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Backend Toggle & Status */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onToggleMode}
              title={mode === 'api' ? 'Using Flask Backend API' : 'Using In-Browser JS Engine'}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all text-slate-300 cursor-pointer"
            >
              {mode === 'api' ? (
                <>
                  <Server className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden lg:inline">Mode:</span>
                  <span className="text-emerald-400 font-semibold">Flask API</span>
                  <span className={`w-2 h-2 rounded-full ${isBackendOnline ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`}></span>
                </>
              ) : (
                <>
                  <Laptop className="w-3.5 h-3.5 text-purple-400" />
                  <span className="hidden lg:inline">Mode:</span>
                  <span className="text-purple-400 font-semibold">Browser JS</span>
                  <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                </>
              )}
            </button>

            <div className="hidden xl:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800/60 text-xs">
              <span className="text-slate-400">ROC-AUC:</span>
              <span className="text-cyan-400 font-bold">{(metrics?.roc_auc ? (metrics.roc_auc * 100).toFixed(1) : '75.3')}%</span>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="flex md:hidden space-x-1 pb-3 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
