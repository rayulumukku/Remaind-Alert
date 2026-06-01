import React, { useState } from 'react';
import { useIntent } from '../App';

export default function Journeys() {
  const { journeys, resumeJourney, snoozeJourney, deleteJourney, completeJourney } = useIntent();
  const [filter, setFilter] = useState('all');

  const filteredJourneys = journeys.filter(j => {
    if (filter === 'all') return true;
    return j.status === filter;
  });

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

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-display-lg text-3xl font-black text-white mb-2">Saved Journeys</h1>
          <p className="text-[#c2c6d8] text-sm max-w-xl">
            Pickup exactly where you left off. Your interrupted digital journeys are cataloged and queued for recovery.
          </p>
        </div>
        
        {/* Filters */}
        <div className="flex gap-2">
          {['all', 'interrupted', 'resumed', 'completed'].map(status => (
            <button 
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-label-mono text-[10px] uppercase border transition-all cursor-pointer ${
                filter === status 
                  ? 'bg-white/10 border-white/20 text-[#b0c6ff]' 
                  : 'bg-[#201f1f] border-white/5 text-[#c2c6d8] hover:border-white/10'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Journeys Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJourneys.length === 0 ? (
          <div className="col-span-full py-16 text-center glass-panel rounded-2xl">
            <span className="material-symbols-outlined text-4xl text-[#c2c6d8]/40 mb-2">workspaces</span>
            <p className="text-sm text-[#c2c6d8]">No journeys found matching status "{filter}".</p>
          </div>
        ) : (
          filteredJourneys.map(journey => (
            <div key={journey.id} className="glass-card rounded-2xl overflow-hidden flex flex-col group border border-white/5">
              {/* Thumbnail header */}
              <div className="relative h-44 overflow-hidden">
                <img 
                  alt={journey.title} 
                  className="w-full h-full object-cover blur-sm scale-110 group-hover:scale-100 transition-transform duration-700 opacity-60" 
                  src={journey.thumbnail_url}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent"></div>
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`px-3 py-0.5 rounded-full font-label-mono text-[9px] tracking-widest border ${getCategoryColor(journey.category)}`}>
                    {journey.category.toUpperCase()}
                  </span>
                  <span className="bg-[#131313]/60 backdrop-blur-md text-[#c2c6d8] px-3 py-0.5 rounded-full font-label-mono text-[9px] border border-white/10 uppercase">
                    {new URL(journey.start_url).hostname.replace('www.', '')}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-headline-lg text-base font-bold text-white leading-tight truncate">
                    {journey.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#c2c6d8] flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">schedule</span>
                      Active: {new Date(journey.last_active_at).toLocaleDateString()}
                    </span>
                    <span className="text-[#b0c6ff] font-label-mono text-[10px] tracking-widest uppercase">
                      {journey.progress_pct}% complete
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getProgressColor(journey.category)} transition-all duration-1000`} 
                      style={{ width: `${journey.progress_pct}%` }}
                    ></div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between gap-3">
                  {journey.status !== 'completed' ? (
                    <button 
                      onClick={() => resumeJourney(journey.id)}
                      className="flex-1 electric-flow text-[#002d6f] font-bold py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-all text-xs cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">play_arrow</span>
                      <span className="font-label-mono">RESUME</span>
                    </button>
                  ) : (
                    <div className="flex-1 py-2 px-4 rounded-lg bg-[#b0c6ff]/10 text-[#b0c6ff] font-label-mono text-center text-xs border border-[#b0c6ff]/20">
                      COMPLETED
                    </div>
                  )}

                  <div className="flex gap-2">
                    {journey.status !== 'completed' && (
                      <>
                        <button 
                          onClick={() => snoozeJourney(journey.id)}
                          className="p-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-[#c2c6d8] hover:text-[#00dbe9] border border-white/5 transition-colors cursor-pointer" 
                          title="Snooze Reminder"
                        >
                          <span className="material-symbols-outlined text-base">snooze</span>
                        </button>
                        <button 
                          onClick={() => completeJourney(journey.id)}
                          className="p-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-[#c2c6d8] hover:text-[#b0c6ff] border border-white/5 transition-colors cursor-pointer" 
                          title="Mark Complete"
                        >
                          <span className="material-symbols-outlined text-base">check_circle</span>
                        </button>
                      </>
                    )}
                    <button 
                      onClick={() => deleteJourney(journey.id)}
                      className="p-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-[#c2c6d8] hover:text-[#ffb4ab] border border-white/5 transition-colors cursor-pointer" 
                      title="Delete Journey"
                    >
                      <span className="material-symbols-outlined text-base">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
