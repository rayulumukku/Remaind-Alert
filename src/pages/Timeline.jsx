import React, { useState, useEffect } from 'react';
import { useIntent } from '../App';

export default function Timeline() {
  const { sessions, journeys, resumeJourney } = useIntent();
  const [selectedSession, setSelectedSession] = useState(null);

  useEffect(() => {
    document.title = "Timeline | ResumeFlow";
  }, []);

  const formatTime = (isoString) => {
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleDateString([], { month: 'short', day: '2-digit', year: 'numeric' });
  };

  const getSessionCategory = (journeyId) => {
    const journey = journeys.find(j => j.id === journeyId);
    return journey ? journey.category : 'Research';
  };

  return (
    <div className="space-y-8 relative overflow-hidden">
      {/* Filters and Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-stack-lg glass-panel p-4 rounded-xl border border-white/5">
        <div className="flex items-center gap-4">
          <h1 className="font-headline-lg text-xl font-bold text-white">Timeline View</h1>
          <div className="h-6 w-px bg-white/10 mx-2 hidden md:block"></div>
          <span className="text-xs text-[#c2c6d8] hidden md:inline">Showing chronological browsing patterns</span>
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <button className="px-4 py-2 border border-white/10 rounded-full font-label-mono text-[9px] text-[#c2c6d8] hover:border-[#b0c6ff] hover:text-[#b0c6ff] flex items-center gap-1.5 transition-all shrink-0 cursor-pointer">
            <span className="material-symbols-outlined text-xs">filter_list</span> FILTER: ALL_SESSIONS
          </button>
          <button className="px-4 py-2 border border-white/10 rounded-full font-label-mono text-[9px] text-[#c2c6d8] hover:border-[#00dbe9] hover:text-[#00dbe9] flex items-center gap-1.5 transition-all shrink-0 cursor-pointer">
            <span className="material-symbols-outlined text-xs">calendar_today</span> RANGE: 7_DAYS
          </button>
        </div>
      </div>

      {/* Timeline Container */}
      <div className="relative max-w-5xl mx-auto py-8">
        {/* Vertical Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 timeline-line opacity-30 hidden md:block"></div>

        {/* Timeline Entries */}
        <div className="space-y-12">
          {sessions.length === 0 ? (
            <p className="text-center text-sm text-[#c2c6d8] py-16">No session streams captured.</p>
          ) : (
            sessions.map((session, index) => {
              const isEven = index % 2 === 0;
              const category = getSessionCategory(session.journey_id);
              
              return (
                <div 
                  key={session.id} 
                  className={`relative flex flex-col md:flex-row items-center group cursor-pointer`}
                  onClick={() => setSelectedSession(session)}
                >
                  {/* Left Side (Desktop Only) */}
                  <div className={`flex-1 w-full md:pr-12 md:text-right hidden md:block ${isEven ? '' : 'order-3 text-left pl-12 pr-0'}`}>
                    <div className="font-label-mono text-[#00dbe9] text-[10px] mb-1">
                      {formatDate(session.created_at)} · {formatTime(session.created_at)}
                    </div>
                    <h3 className="font-headline-lg text-white text-base font-bold truncate">{session.tab_title}</h3>
                    <p className="text-[#c2c6d8] text-xs mt-2 opacity-60 line-clamp-2">{session.tab_url}</p>
                  </div>

                  {/* Central Node Icon */}
                  <div className="z-10 w-12 h-12 rounded-full glass-panel flex items-center justify-center border-2 border-[#b0c6ff]/40 glow-node relative animate-pulse-glow order-2">
                    <span className="material-symbols-outlined text-[#b0c6ff] text-sm">
                      {category === 'Learning' ? 'school' : category === 'Coding' ? 'code' : 'explore'}
                    </span>
                    <div className="absolute -inset-2 bg-[#b0c6ff]/10 rounded-full blur-md -z-10"></div>
                  </div>

                  {/* Right Side (Content for mobile & alternate desktop) */}
                  <div className={`flex-1 w-full md:pl-12 mt-4 md:mt-0 ${isEven ? 'order-3' : 'order-1 md:pr-12 md:pl-0 md:text-right'}`}>
                    <div className="md:hidden font-label-mono text-[#00dbe9] text-[10px] mb-1">
                      {formatDate(session.created_at)} · {formatTime(session.created_at)}
                    </div>
                    
                    <div className="glass-panel p-5 rounded-2xl group-hover:border-[#b0c6ff]/40 group-hover:shadow-[0_0_20px_rgba(176,198,255,0.15)] transition-all duration-500 overflow-hidden relative border border-white/5">
                      <div className="md:hidden">
                        <h3 className="font-headline-lg text-white text-base font-bold">{session.tab_title}</h3>
                        <p className="text-[#c2c6d8] text-xs mt-1 mb-4 truncate">{session.tab_url}</p>
                      </div>

                      <div className="flex gap-2 mb-4 justify-start md:group-hover:scale-102 transition-transform">
                        <div className="h-16 rounded bg-white/5 overflow-hidden flex-1 border border-white/5">
                          <img 
                            className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all" 
                            src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=150&auto=format&fit=crop" 
                            alt="Mock preview"
                          />
                        </div>
                      </div>

                      <div className="flex gap-2 items-center text-[10px]">
                        <span className="px-2 py-0.5 bg-[#b0c6ff]/10 text-[#b0c6ff] font-label-mono rounded uppercase">
                          {category}
                        </span>
                        <span className="text-[#c2c6d8] font-label-mono">
                          {session.duration_seconds > 0 ? `${Math.round(session.duration_seconds / 60)} mins active` : 'Just opened'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Side Over Detail Panel */}
      {selectedSession && (
        <div className="fixed inset-y-0 right-0 w-full md:w-[460px] z-[60] glass-panel transition-transform duration-500 shadow-[-20px_0_60px_rgba(0,0,0,0.8)] border-l border-white/10 flex flex-col">
          <div className="p-6 flex items-center justify-between border-b border-white/5">
            <h2 className="font-headline-lg text-lg font-bold text-[#b0c6ff] truncate w-64">Session Detail</h2>
            <button 
              className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer text-[#c2c6d8] hover:text-white" 
              onClick={() => setSelectedSession(null)}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="rounded-xl overflow-hidden aspect-video relative group border border-white/5">
              <img 
                className="w-full h-full object-cover" 
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop" 
                alt="Detail preview"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 bg-[#b0c6ff] text-[#002d6f] text-[9px] font-label-mono rounded-full uppercase tracking-wider">
                  {getSessionCategory(selectedSession.journey_id)}
                </span>
              </div>
            </div>

            <section className="space-y-2">
              <div className="font-label-mono text-[9px] text-[#c2c6d8] uppercase tracking-widest opacity-50">Active Path</div>
              <p className="text-white text-sm font-semibold leading-relaxed">{selectedSession.tab_title}</p>
              <p className="text-[#c2c6d8] text-xs font-mono break-all bg-white/5 p-3 rounded-lg border border-white/5">
                {selectedSession.tab_url}
              </p>
            </section>

            <section className="space-y-3">
              <div className="font-label-mono text-[9px] text-[#c2c6d8] uppercase tracking-widest opacity-50">Session Metrics</div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                  <div className="text-[#b0c6ff] font-display-lg text-lg font-bold">
                    {selectedSession.metadata?.scroll_position || 0}%
                  </div>
                  <div className="font-label-mono text-[8px] text-[#c2c6d8] opacity-60 mt-1 uppercase">Scroll depth</div>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                  <div className="text-[#00dbe9] font-display-lg text-lg font-bold">
                    {selectedSession.metadata?.interaction_count || 0}
                  </div>
                  <div className="font-label-mono text-[8px] text-[#c2c6d8] opacity-60 mt-1 uppercase">Interactions</div>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                  <div className="text-[#ecb2ff] font-display-lg text-lg font-bold">
                    {selectedSession.duration_seconds > 0 ? `${Math.round(selectedSession.duration_seconds / 60)}m` : '0m'}
                  </div>
                  <div className="font-label-mono text-[8px] text-[#c2c6d8] opacity-60 mt-1 uppercase">Dwell Time</div>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <div className="font-label-mono text-[9px] text-[#c2c6d8] uppercase tracking-widest opacity-50">Temporal Events</div>
              <div className="space-y-4 border-l border-white/10 ml-2 pl-6 text-xs">
                <div className="relative">
                  <div className="absolute -left-[30px] top-1 w-2.5 h-2.5 rounded-full bg-[#b0c6ff] glow-accent"></div>
                  <div className="text-white font-semibold">Intent Mapped</div>
                  <div className="text-[#c2c6d8] mt-0.5">Capturing telemetry for {getSessionCategory(selectedSession.journey_id)} page load.</div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[30px] top-1 w-2.5 h-2.5 rounded-full bg-white/20"></div>
                  <div className="text-white font-semibold">Interaction recorded</div>
                  <div className="text-[#c2c6d8] mt-0.5">User engaged with elements (clicks/scrolls logged).</div>
                </div>
              </div>
            </section>
          </div>

          <div className="p-6 bg-[#201f1f] border-t border-white/5 flex gap-3">
            <button 
              onClick={() => {
                resumeJourney(selectedSession.journey_id);
                setSelectedSession(null);
              }}
              className="flex-1 py-3 bg-[#b0c6ff] text-[#002d6f] font-label-mono rounded-xl hover:shadow-[0_0_15px_rgba(176,198,255,0.4)] transition-all font-bold cursor-pointer text-sm"
            >
              RESUME WORKFLOW
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
