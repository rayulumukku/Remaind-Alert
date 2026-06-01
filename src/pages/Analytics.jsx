import React, { useState, useEffect } from 'react';
import { useIntent } from '../App';

export default function Analytics() {
  const { journeys, notifications } = useIntent();

  // Focus telemetry mock logs
  const [logs, setLogs] = useState([
    { time: '14:02:11', msg: 'Candidate intent mapping stabilized.' },
    { time: '14:02:45', msg: 'Intent fragment RX-4 recovered.' },
    { time: '14:03:02', msg: 'Warning: Inactivity threshold detected in Node B.', isWarn: true },
    { time: '14:03:15', msg: 'Ping response: 12ms. Connection healthy.' }
  ]);

  // Simulate new logs arriving
  useEffect(() => {
    const logMessages = [
      'Syncing telemetry with core node...',
      'Encryption handshake completed.',
      'Focus shifted to documentation reference.',
      'Active cache cleared for completed workflows.',
      'Signal heartbeats verified on tabId #3492.'
    ];

    const timer = setInterval(() => {
      const now = new Date();
      const timeString = now.toTimeString().split(' ')[0];
      const newEntry = {
        time: timeString,
        msg: logMessages[Math.floor(Math.random() * logMessages.length)]
      };
      
      setLogs(prev => {
        const next = [...prev, newEntry];
        if (next.length > 5) next.shift(); // keep 5 logs maximum
        return next;
      });
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const totalRecovered = 2842;
  const focusPercentage = 75;
  const strokeDashoffset = 251 - (focusPercentage / 100 * 251);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="font-display-lg text-3xl font-black text-white">System Intelligence</h1>
          <p className="text-[#c2c6d8] text-sm mt-1">Telemetry telemetry for session integrity and candidate focus retention.</p>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6">
        
        {/* Total Journeys Recovered (2 cols) */}
        <div className="glass-card md:col-span-2 p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden group border border-white/5">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-[80px]" style={{ fontVariationSettings: "'FILL' 1" }}>autorenew</span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#00dbe9] glow-accent animate-pulse"></span>
              <span className="font-label-mono text-[9px] text-[#00dbe9] uppercase tracking-widest">Real-time Recovery</span>
            </div>
            <h3 className="font-label-mono text-[#c2c6d8] uppercase text-[10px] tracking-wider">Total Journeys Recovered</h3>
            <div className="flex items-baseline gap-4 mt-2">
              <span className="font-headline-lg text-4xl font-bold text-white">{totalRecovered}</span>
              <span className="font-label-mono text-[#b0c6ff] text-xs font-semibold">+12.4% vs last period</span>
            </div>
          </div>
          
          <div className="mt-8 h-12 w-full flex items-end gap-1.5">
            <div className="flex-1 bg-[#00dbe9]/10 rounded-t-sm h-[40%]"></div>
            <div className="flex-1 bg-[#00dbe9]/15 rounded-t-sm h-[60%]"></div>
            <div className="flex-1 bg-[#00dbe9]/20 rounded-t-sm h-[80%]"></div>
            <div className="flex-1 bg-[#00dbe9]/30 rounded-t-sm h-[55%]"></div>
            <div className="flex-1 bg-[#00dbe9]/40 rounded-t-sm h-[90%]"></div>
            <div className="flex-1 bg-[#00dbe9]/60 rounded-t-sm h-[100%]"></div>
          </div>
        </div>

        {/* Focus Hours Progress Ring (1 col) */}
        <div className="glass-card md:col-span-1 p-6 rounded-2xl flex flex-col justify-between border border-white/5">
          <div>
            <h3 className="font-label-mono text-[#c2c6d8] uppercase text-[10px] tracking-wider mb-4">Focus Index</h3>
            <div className="relative w-full aspect-square flex items-center justify-center max-w-[120px] mx-auto">
              <svg className="w-full h-full transform -rotate-90">
                <circle className="text-white/5" cx="50%" cy="50%" fill="transparent" r="40%" stroke="currentColor" strokeWidth="4"></circle>
                <circle 
                  className="text-[#00dbe9] drop-shadow-[0_0_8px_rgba(0,219,233,0.4)]" 
                  cx="50%" 
                  cy="50%" 
                  fill="transparent" 
                  r="40%" 
                  stroke="currentColor" 
                  strokeDasharray="251" 
                  strokeDashoffset={strokeDashoffset} 
                  strokeWidth="5"
                  style={{ transition: 'stroke-dashoffset 1s ease' }}
                ></circle>
              </svg>
              <div className="absolute text-center">
                <span className="block font-headline-lg text-lg font-bold text-white leading-none">{focusPercentage}%</span>
                <span className="block font-label-mono text-[8px] text-[#c2c6d8] mt-1">OPTIMIZED</span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-between text-[10px] font-label-mono text-[#c2c6d8]">
            <span>Optimal</span>
            <span className="text-[#00dbe9]">Active Sync</span>
          </div>
        </div>

        {/* Integrity Gauge (1 col) */}
        <div className="glass-card md:col-span-1 p-6 rounded-2xl flex flex-col border border-white/5">
          <h3 className="font-label-mono text-[#c2c6d8] uppercase text-[10px] tracking-wider mb-6">Session Integrity</h3>
          <div className="flex-1 flex flex-col justify-between space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-label-mono">
                <span className="text-[#c2c6d8]">Resumed</span>
                <span className="text-white font-bold">82%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-[#b0c6ff] rounded-full" style={{ width: '82%' }}></div>
              </div>
            </div>
            
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-label-mono">
                <span className="text-[#c2c6d8]">Interrupted</span>
                <span className="text-white font-bold">18%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-[#ffb4ab] rounded-full" style={{ width: '18%' }}></div>
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-4 mt-auto">
              <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-[10px] text-[#c2c6d8] leading-normal">
                <span className="font-bold text-[#00dbe9] block mb-0.5">AI INSIGHT</span>
                Interruptions peak during late afternoon. Scheduling adaptive timers.
              </div>
            </div>
          </div>
        </div>

        {/* Heatmap (3 cols) */}
        <div className="glass-card md:col-span-3 p-6 rounded-2xl overflow-hidden relative border border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-label-mono text-[#c2c6d8] uppercase text-[10px] tracking-wider">Hourly Inactivity Intensity Heatmap</h3>
            <div className="flex items-center gap-3 text-xs font-label-mono">
              <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded bg-[#00dbe9]/10"></div> Low</div>
              <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded bg-[#00dbe9]/60"></div> Peak</div>
            </div>
          </div>
          
          <div className="grid grid-cols-12 gap-1.5 h-24">
            {/* Hour cells */}
            {Array.from({ length: 36 }).map((_, i) => {
              const weights = [10, 20, 40, 10, 5, 30, 80, 60, 90, 40, 20, 10, 30, 50, 70, 90, 40, 20, 10, 15, 30, 60, 40, 10];
              const w = weights[i % weights.length];
              return (
                <div 
                  key={i} 
                  className="rounded-sm transition-colors duration-500 hover:brightness-125"
                  style={{
                    backgroundColor: `rgba(0, 219, 233, ${w / 100})`
                  }}
                  title={`Hour ${i % 24}:00 - Intensity: ${w}%`}
                ></div>
              );
            })}
          </div>
          <div className="flex justify-between mt-3 font-label-mono text-[9px] text-[#c2c6d8] opacity-60">
            <span>00:00</span><span>08:00</span><span>12:00</span><span>16:00</span><span>20:00</span><span>23:59</span>
          </div>
        </div>

        {/* Live Signal Log (1 col) */}
        <div className="glass-card md:col-span-1 p-6 rounded-2xl flex flex-col border border-white/5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-label-mono text-[#c2c6d8] uppercase text-[10px] tracking-wider">Uplink logs</h3>
            <span className="material-symbols-outlined text-sm text-[#00dbe9] animate-pulse">sensors</span>
          </div>
          <div className="flex-1 space-y-3 font-label-mono text-[10px]">
            {logs.map((log, i) => (
              <div key={i} className="flex items-start gap-2 leading-relaxed border-b border-white/5 pb-1">
                <span className="text-[#b0c6ff] opacity-60 shrink-0">{log.time}</span>
                <span className={log.isWarn ? 'text-[#ffb4ab]' : 'text-[#c2c6d8]'}>{log.msg}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Smart Inactivity Monitor Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-white/5">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#ffb4ab]">warning</span>
              <h3 className="font-label-mono text-[#c2c6d8] uppercase text-[10px] tracking-wider">Smart Inactivity Monitor</h3>
            </div>
            <span className="bg-[#ffb4ab]/15 text-[#ffb4ab] border border-[#ffb4ab]/30 text-[9px] font-bold px-2 py-0.5 rounded uppercase">High Risk Detected</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col justify-center border-r border-white/5 pr-6">
              <p className="font-headline-lg text-lg text-white font-bold">Concentration drop-off</p>
              <p className="text-[#c2c6d8] text-xs mt-1">14:00 - 16:00 window of high fatigue</p>
              <div className="mt-6 flex items-center gap-4">
                <div className="bg-[#ffb4ab]/10 p-3 rounded-lg border border-[#ffb4ab]/20">
                  <span className="material-symbols-outlined text-[#ffb4ab]">timer_off</span>
                </div>
                <div>
                  <p className="text-white font-bold text-sm">42% Increase</p>
                  <p className="text-[#c2c6d8] text-[10px]">Unresolved session probability</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 flex flex-col justify-center">
              <p className="font-label-mono text-[9px] text-[#c2c6d8]/60 uppercase tracking-widest">Active Mitigation Engines</p>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00dbe9] text-[16px]">bolt</span>
                  <span>Auto-Save Telemetry</span>
                </div>
                <span className="text-[#00dbe9] font-bold">ACTIVE</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#c2c6d8] text-[16px]">notifications_active</span>
                  <span>Push Engagement Alerts</span>
                </div>
                <span className="text-[#c2c6d8] font-bold">IDLE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Supabase Connection Setup Box */}
        <div className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col justify-between">
          <div>
            <h3 className="font-label-mono text-[#c2c6d8] uppercase text-[10px] tracking-wider mb-2">Supabase Sync Connection</h3>
            <p className="text-xs text-[#c2c6d8] leading-relaxed">
              Sync your tracking extension with a live Supabase server instance. If left blank, the system operates in offline **Mock Mode**.
            </p>
          </div>
          
          <div className="space-y-3 mt-4">
            <input 
              type="text" 
              placeholder="Supabase API URL" 
              className="w-full bg-[#1c1b1b] border border-white/10 rounded-lg px-3 py-2 text-xs focus:border-[#b0c6ff] focus:outline-none"
              defaultValue={localStorage.getItem('supabase_url') || ''}
              id="sbUrlInput"
            />
            <input 
              type="password" 
              placeholder="Supabase Anon/Service Key" 
              className="w-full bg-[#1c1b1b] border border-white/10 rounded-lg px-3 py-2 text-xs focus:border-[#b0c6ff] focus:outline-none"
              defaultValue={localStorage.getItem('supabase_key') || ''}
              id="sbKeyInput"
            />
          </div>

          <button 
            onClick={() => {
              const url = document.getElementById('sbUrlInput').value;
              const key = document.getElementById('sbKeyInput').value;
              if (url && key) {
                localStorage.setItem('supabase_url', url);
                localStorage.setItem('supabase_key', key);
                alert('Connected to Supabase. Uplink established.');
              } else {
                localStorage.removeItem('supabase_url');
                localStorage.removeItem('supabase_key');
                alert('Disconnected. Switched to offline Mock Mode.');
              }
              window.location.reload();
            }}
            className="w-full mt-4 bg-[#b0c6ff] text-[#002d6f] py-2.5 rounded-lg font-bold text-xs hover:brightness-110 active:scale-95 transition-all cursor-pointer font-label-mono"
          >
            ESTABLISH CONNECTION
          </button>
        </div>
      </div>
    </div>
  );
}
