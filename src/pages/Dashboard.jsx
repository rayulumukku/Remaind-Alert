import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntent } from '../App';

export default function Dashboard() {
  const navigate = useNavigate();
  const { journeys, sessions, resumeJourney } = useIntent();

  const activeJourneys = journeys.filter(j => j.status === 'interrupted' || j.status === 'active');
  const recentSessions = sessions.slice(0, 3);

  // SVG network nodes simulation
  const [activeNode, setActiveNode] = useState(null);

  return (
    <div className="space-y-8">
      {/* Nexus Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-display-lg text-3xl font-black text-white leading-none">Nexus Command</h2>
          <p className="font-body-md text-sm text-[#c2c6d8] mt-2">
            System status: <span className="text-[#00dbe9] font-bold">Optimal</span> • {activeJourneys.length} Interrupted Intent Mappings
          </p>
        </div>
        <div className="flex gap-2">
          <div className="px-4 py-2 glass-panel rounded-lg flex items-center gap-2 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-[#00dbe9] animate-pulse"></span>
            <span className="font-label-mono text-[10px] text-[#00dbe9] uppercase tracking-widest">LIVE UPLINK ACTIVE</span>
          </div>
        </div>
      </section>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Chart (8 cols) */}
        <div className="md:col-span-8 glass-panel rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#b0c6ff] to-[#00dbe9] opacity-50"></div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline-lg text-base font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-[#b0c6ff]">timeline</span>
              Temporal Focus Loads
            </h3>
            <div className="flex gap-1.5 bg-white/5 p-1 rounded-lg border border-white/5">
              <span className="font-label-mono text-[9px] px-2 py-0.5 bg-white/5 rounded text-white cursor-pointer">24H</span>
              <span className="font-label-mono text-[9px] px-2 py-0.5 text-[#c2c6d8] hover:text-white cursor-pointer">7D</span>
            </div>
          </div>

          <div className="h-56 flex items-end gap-3 group-hover:opacity-90 transition-opacity">
            <div className="flex-1 bg-[#b0c6ff]/20 rounded-t h-[75%] relative group/bar">
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity font-label-mono text-[10px] text-[#b0c6ff]">75%</div>
            </div>
            <div className="flex-1 bg-[#b0c6ff]/40 rounded-t h-[50%] relative group/bar">
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity font-label-mono text-[10px] text-[#b0c6ff]">50%</div>
            </div>
            <div className="flex-1 bg-[#b0c6ff]/20 rounded-t h-[65%] relative group/bar">
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity font-label-mono text-[10px] text-[#b0c6ff]">65%</div>
            </div>
            <div className="flex-1 bg-[#b0c6ff]/60 rounded-t h-[95%] relative group/bar">
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity font-label-mono text-[10px] text-[#b0c6ff]">95%</div>
            </div>
            <div className="flex-1 bg-[#b0c6ff]/30 rounded-t h-[80%] relative group/bar">
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity font-label-mono text-[10px] text-[#b0c6ff]">80%</div>
            </div>
            <div className="flex-1 bg-[#b0c6ff]/10 rounded-t h-[35%] relative group/bar">
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity font-label-mono text-[10px] text-[#b0c6ff]">35%</div>
            </div>
            <div className="flex-1 bg-[#b0c6ff]/50 rounded-t h-[85%] relative group/bar">
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity font-label-mono text-[10px] text-[#b0c6ff]">85%</div>
            </div>
          </div>

          <div className="mt-4 flex justify-between border-t border-white/5 pt-4">
            <div className="text-center">
              <p className="font-label-mono text-[9px] text-[#c2c6d8] uppercase">Focus load</p>
              <p className="text-base font-bold text-[#b0c6ff] mt-0.5">85 hrs/week</p>
            </div>
            <div className="text-center">
              <p className="font-label-mono text-[9px] text-[#c2c6d8] uppercase">Latency</p>
              <p className="text-base font-bold text-[#00dbe9] mt-0.5">14ms</p>
            </div>
            <div className="text-center">
              <p className="font-label-mono text-[9px] text-[#c2c6d8] uppercase">Recovery rate</p>
              <p className="text-base font-bold text-[#ecb2ff] mt-0.5">99.2%</p>
            </div>
          </div>
        </div>

        {/* Dynamic Node Cluster (4 cols) */}
        <div className="md:col-span-4 glass-panel rounded-2xl p-6 node-link-canvas relative flex flex-col justify-between overflow-hidden">
          <div>
            <h3 className="font-headline-lg text-base font-bold text-white mb-1">Session Clusters</h3>
            <p className="font-body-sm text-[11px] text-[#c2c6d8]">Dynamic tab association mapping</p>
          </div>

          {/* SVG Node Diagram */}
          <div className="flex-1 flex items-center justify-center relative min-h-[160px]">
            <div className="absolute inset-0 flex items-center justify-center opacity-70">
              <svg className="w-full h-full p-4" viewBox="0 0 200 200">
                <line x1="100" y1="100" x2="40" y2="50" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="2 2" />
                <line x1="100" y1="100" x2="160" y2="60" stroke="#ffffff" strokeWidth="0.5" />
                <line x1="100" y1="100" x2="70" y2="150" stroke="#ffffff" strokeWidth="0.5" />
                <line x1="100" y1="100" x2="150" y2="140" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="4 4" />

                <circle cx="100" cy="100" r="10" fill="#b0c6ff" className="cursor-pointer" onClick={() => setActiveNode('React Core')} />
                <circle cx="40" cy="50" r="6" fill="#00dbe9" className="cursor-pointer" onClick={() => setActiveNode('Vite Docs')} />
                <circle cx="160" cy="60" r="8" fill="#ecb2ff" className="cursor-pointer" onClick={() => setActiveNode('Github Repo')} />
                <circle cx="70" cy="150" r="5" fill="#00dbe9" className="cursor-pointer" onClick={() => setActiveNode('Chrome API')} />
                <circle cx="150" cy="140" r="7" fill="#b0c6ff" className="cursor-pointer" onClick={() => setActiveNode('Stack Overflow')} />
              </svg>
            </div>
            
            <div className="relative z-10 glass-panel px-3 py-1.5 rounded border border-[#b0c6ff]/20 text-center pointer-events-none">
              <span className="font-label-mono text-[9px] text-[#b0c6ff] uppercase tracking-wider block">
                {activeNode ? `Active: ${activeNode}` : 'SCANNING TELEMETRY...'}
              </span>
            </div>
          </div>

          <button 
            onClick={() => setActiveNode(null)}
            className="w-full py-2 border border-white/10 rounded-lg font-label-mono text-[#c2c6d8] hover:bg-white/5 transition-all text-[10px] tracking-widest cursor-pointer"
          >
            RECALIBRATE NODES
          </button>
        </div>

        {/* Neural stream / Activity feed (6 cols) */}
        <div className="md:col-span-6 space-y-4">
          <h3 className="font-headline-lg text-lg font-bold text-white">Neural stream</h3>
          
          {recentSessions.length === 0 ? (
            <p className="text-sm text-[#c2c6d8] py-8 text-center glass-panel rounded-2xl">No recent sessions mapped.</p>
          ) : (
            recentSessions.map(session => {
              const categoryColors = {
                Learning: 'text-[#b0c6ff]',
                Coding: 'text-[#ecb2ff]',
                Documentation: 'text-[#7df4ff]',
                Shopping: 'text-[#00dbe9]',
                Research: 'text-[#00a0aa]'
              };
              return (
                <div key={session.id} className="glass-panel p-4 rounded-xl flex gap-4 hover:border-[#b0c6ff]/30 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <span className={`material-symbols-outlined ${categoryColors[session.category] || 'text-[#b0c6ff]'}`}>
                      merge
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-body-md font-semibold text-sm truncate text-white">{session.tab_title}</h4>
                      <span className="font-label-mono text-[9px] text-[#c2c6d8] shrink-0">
                        {new Date(session.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="font-body-sm text-xs text-[#c2c6d8] truncate mt-1">{session.tab_url}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Quick Actions & API Utilization (6 cols) */}
        <div className="md:col-span-6 space-y-6">
          <h3 className="font-headline-lg text-lg font-bold text-white">Quick Telemetry Controls</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div 
              onClick={() => navigate('/timeline')}
              className="glass-panel p-4 rounded-xl group cursor-pointer hover:border-[#b0c6ff]/50 transition-all"
            >
              <span className="material-symbols-outlined text-[#b0c6ff] mb-2 group-hover:scale-110 transition-transform">timeline</span>
              <p className="font-body-md font-medium text-white text-sm">Resume stream</p>
              <p className="font-body-sm text-xs text-[#c2c6d8]">Access tab maps</p>
            </div>
            
            <div 
              onClick={() => navigate('/analytics')}
              className="glass-panel p-4 rounded-xl group cursor-pointer hover:border-[#00dbe9]/50 transition-all"
            >
              <span className="material-symbols-outlined text-[#00dbe9] mb-2 group-hover:scale-110 transition-transform">analytics</span>
              <p className="font-body-md font-medium text-white text-sm">Flow Analytics</p>
              <p className="font-body-sm text-xs text-[#c2c6d8]">Examine heatmaps</p>
            </div>
          </div>

          <div className="bg-[#201f1f] rounded-xl p-4 border border-white/5 relative overflow-hidden">
            <h4 className="font-label-mono text-[9px] text-[#c2c6d8] uppercase mb-4 tracking-widest">Active System Signals</h4>
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-label-mono">
                  <span>EXTENSION_UPLINK</span>
                  <span className="text-[#b0c6ff]">85%</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-[#b0c6ff]" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-label-mono">
                  <span>INACTIVITY_ENGINE</span>
                  <span className="text-[#00dbe9]">100%</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-[#00dbe9]" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
