import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntent } from '../App';

export default function Dashboard() {
  const navigate = useNavigate();
  const { journeys, sessions, activeSessions, resumeJourney, snoozeJourney, deleteJourney, completeJourney } = useIntent();

  const activeJourneys = journeys.filter(j => j.status === 'interrupted' || j.status === 'active');
  
  // SVG network nodes simulation
  const [activeNode, setActiveNode] = useState(null);

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Learning': return 'bg-[#b0c6ff]/20 text-[#b0c6ff] border-[#b0c6ff]/30';
      case 'Coding': return 'bg-[#ecb2ff]/20 text-[#ecb2ff] border-[#ecb2ff]/30';
      case 'Documentation': return 'bg-[#7df4ff]/20 text-[#7df4ff] border-[#7df4ff]/30';
      case 'Shopping': return 'bg-[#00dbe9]/20 text-[#00dbe9] border-[#00dbe9]/30';
      default: return 'bg-[#00a0aa]/20 text-[#00a0aa] border-[#00a0aa]/30';
    }
  };

  const getProgressColor = (category) => {
    switch (category) {
      case 'Learning': return 'bg-gradient-to-r from-[#b0c6ff] to-[#568dff]';
      case 'Coding': return 'bg-gradient-to-r from-[#ecb2ff] to-[#cf5cff]';
      case 'Documentation': return 'bg-gradient-to-r from-[#7df4ff] to-[#00dbe9]';
      default: return 'bg-gradient-to-r from-[#00dbe9] to-[#00a0aa]';
    }
  };

  const formatDuration = (seconds) => {
    if (!seconds) return '0s';
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

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

        {/* Live Active Sessions (6 cols) */}
        <div className="md:col-span-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-headline-lg text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#00dbe9] rounded-full animate-ping"></span>
              Active Sessions
            </h3>
            <span className="font-label-mono text-[10px] text-[#00dbe9] tracking-widest">LIVE TELEMETRY</span>
          </div>
          
          {activeSessions.length === 0 ? (
            <div className="glass-panel p-8 rounded-2xl border border-white/5 text-center space-y-3">
              <span className="material-symbols-outlined text-4xl text-[#c2c6d8]/30">explore</span>
              <p className="text-sm text-[#c2c6d8]">No active browser sessions tracked.</p>
              <p className="text-xs text-[#c2c6d8]/60 max-w-xs mx-auto">Verify Developer Mode is enabled and the extension is loaded on active research tabs.</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
              {activeSessions.map(session => (
                <div key={session.id || session.tabId} className="glass-card rounded-xl p-4 border border-white/5 flex gap-4 hover:border-[#00dbe9]/30 transition-all relative overflow-hidden group">
                  {session.isTracking && (
                    <div className="absolute top-0 right-0 h-[2px] w-24 bg-[#00dbe9] animate-pulse"></div>
                  )}
                  <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                    <span className="material-symbols-outlined text-[#00dbe9]">
                      {session.category === 'Coding' ? 'code' : session.category === 'Learning' ? 'school' : session.category === 'Documentation' ? 'description' : 'explore'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[8px] font-label-mono tracking-widest border ${getCategoryColor(session.category)}`}>
                          {session.category.toUpperCase()}
                        </span>
                        <span className="text-[10px] text-[#00dbe9] font-label-mono flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-[#00dbe9] rounded-full animate-pulse"></span>
                          {formatDuration(session.elapsedSeconds || Math.round((Date.now() - session.startTime) / 1000))}
                        </span>
                      </div>
                      <h4 className="font-headline-md text-sm font-semibold text-white truncate mt-1.5">{session.tab_title}</h4>
                    </div>
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/5">
                      <span className="text-[10px] text-[#c2c6d8]/80 truncate flex-1 font-mono">{session.tab_url}</span>
                      <div className="flex items-center gap-1 font-label-mono text-[9px] text-[#c2c6d8] shrink-0">
                        <span>Scroll:</span>
                        <span className="text-[#00dbe9] font-bold">{session.scrollPosition || 0}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Saved Cards / Journeys (6 cols) */}
        <div className="md:col-span-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-headline-lg text-lg font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-[#b0c6ff] text-xl">bookmark</span>
              Saved Journey Cards
            </h3>
            <button 
              onClick={() => navigate('/journeys')}
              className="text-xs text-[#b0c6ff] hover:underline font-label-mono uppercase tracking-wider"
            >
              View All
            </button>
          </div>
          
          {journeys.length === 0 ? (
            <div className="glass-panel p-8 rounded-2xl border border-white/5 text-center space-y-3">
              <span className="material-symbols-outlined text-4xl text-[#c2c6d8]/30">workspaces</span>
              <p className="text-sm text-[#c2c6d8]">No saved journey cards.</p>
              <p className="text-xs text-[#c2c6d8]/60 max-w-xs mx-auto">Journeys will register here immediately once captured by the extension or started manually.</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
              {journeys.slice(0, 4).map(journey => (
                <div key={journey.id} className="glass-card rounded-xl p-4 flex gap-4 border border-white/5 relative overflow-hidden group hover:border-[#b0c6ff]/30 transition-all">
                  {/* Thumbnail / Category block */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden relative bg-white/5 shrink-0 border border-white/10">
                    <img src={journey.thumbnail_url} className="w-full h-full object-cover opacity-50" alt="" />
                    <div className="absolute inset-0 bg-[#050505]/40"></div>
                  </div>
                  
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[8px] font-label-mono tracking-widest border ${getCategoryColor(journey.category)}`}>
                          {journey.category.toUpperCase()}
                        </span>
                        <span className="text-[9px] text-[#c2c6d8]/60 truncate font-mono">
                          {journey.start_url ? new URL(journey.start_url).hostname.replace('www.', '') : ''}
                        </span>
                      </div>
                      <h4 className="font-headline-md text-sm font-semibold text-white truncate mt-1.5">{journey.title}</h4>
                    </div>
                    
                    <div className="mt-2.5 flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className={`h-full ${getProgressColor(journey.category)}`} style={{ width: `${journey.progressPct}%` }}></div>
                        </div>
                      </div>
                      <span className="text-[10px] font-label-mono text-[#b0c6ff] shrink-0 font-bold">{journey.progressPct}%</span>
                    </div>
                  </div>
                  
                  {/* Actions Column */}
                  <div className="flex flex-col justify-center gap-2 shrink-0 border-l border-white/5 pl-3">
                    {journey.status !== 'completed' ? (
                      <button 
                        onClick={() => resumeJourney(journey.id)} 
                        className="p-1.5 bg-[#b0c6ff] text-[#002d6f] rounded-lg hover:brightness-110 transition-all cursor-pointer flex items-center justify-center" 
                        title="Resume Journey"
                      >
                        <span className="material-symbols-outlined text-sm font-bold">play_arrow</span>
                      </button>
                    ) : (
                      <div className="p-1.5 text-green-400 flex items-center justify-center" title="Completed">
                        <span className="material-symbols-outlined text-sm">check_circle</span>
                      </div>
                    )}
                    <button 
                      onClick={() => deleteJourney(journey.id)} 
                      className="p-1.5 bg-white/5 text-[#c2c6d8] hover:text-[#ffb4ab] rounded-lg hover:bg-white/10 transition-all cursor-pointer flex items-center justify-center" 
                      title="Delete Journey"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

