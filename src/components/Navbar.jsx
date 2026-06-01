import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useIntent } from '../App';

export default function Navbar({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { notifications, markAllNotificationsRead, addNewJourney } = useIntent();
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showNewJourneyModal, setShowNewJourneyModal] = useState(false);

  // Form states for new journey
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newCategory, setNewCategory] = useState('Learning');

  const unreadNotifs = notifications.filter(n => !n.read_at);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
    { name: 'Journeys', path: '/journeys', icon: 'rocket_launch' },
    { name: 'Timeline', path: '/timeline', icon: 'hub' },
    { name: 'Analytics', path: '/analytics', icon: 'insights' }
  ];

  const handleCreateJourney = (e) => {
    e.preventDefault();
    if (!newTitle || !newUrl) return;
    addNewJourney(newTitle, newUrl, newCategory);
    setNewTitle('');
    setNewUrl('');
    setShowNewJourneyModal(false);
    navigate('/journeys');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e2e1] antialiased">
      {/* 1. TopAppBar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#050505]/70 backdrop-blur-2xl border-b border-white/10 shadow-2xl flex justify-between items-center h-16 px-6">
        <div className="flex items-center gap-4">
          <span 
            className="font-headline-lg text-[20px] font-bold text-[#b0c6ff] cursor-pointer drop-shadow-[0_0_8px_rgba(176,198,255,0.4)]"
            onClick={() => navigate('/')}
          >
            ResumeFlow
          </span>
        </div>
        
        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#c2c6d8] text-sm">search</span>
            <input 
              className="w-full bg-[#1c1b1b] border border-white/5 rounded-lg py-1.5 pl-10 pr-4 font-body-sm text-[#e5e2e1] focus:outline-none focus:border-[#b0c6ff] transition-all" 
              placeholder="Search journeys or active signals..." 
              type="text"
            />
          </div>
        </div>

        {/* TopBar Actions */}
        <div className="flex items-center gap-6">
          {/* Notification bell */}
          <div className="relative">
            <button 
              className="material-symbols-outlined text-[#c2c6d8] hover:text-[#b0c6ff] transition-colors scale-105 active:scale-95 cursor-pointer relative"
              onClick={() => {
                setShowNotifMenu(!showNotifMenu);
                if (!showNotifMenu) markAllNotificationsRead();
              }}
            >
              notifications
              {unreadNotifs.length > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#00dbe9] rounded-full animate-pulse"></span>
              )}
            </button>

            {showNotifMenu && (
              <div className="absolute right-0 mt-3 w-80 glass-panel rounded-xl overflow-hidden shadow-2xl border border-white/10 z-[100] p-4 space-y-3">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <h4 className="font-label-mono text-xs text-[#b0c6ff] uppercase tracking-widest">Signal Alerts</h4>
                  <button className="text-[10px] text-[#c2c6d8] hover:underline" onClick={() => setShowNotifMenu(false)}>Close</button>
                </div>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <p className="text-[11px] text-[#c2c6d8] text-center py-4">No alert logs received.</p>
                  ) : (
                    notifications.map(n => (
                      <div key={n.id} className="p-2 bg-white/5 rounded-lg text-[11px] leading-relaxed border border-white/5">
                        <p className="text-[#e5e2e1]">{n.message}</p>
                        <span className="text-[9px] text-[#c2c6d8]/60 mt-1 block">
                          {new Date(n.sent_at).toLocaleTimeString()}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <button 
            className="material-symbols-outlined text-[#c2c6d8] hover:text-[#b0c6ff] transition-colors scale-105 active:scale-95 cursor-pointer"
            onClick={() => navigate('/auth')}
            title="Log Out"
          >
            logout
          </button>

          <button 
            className="p-2 text-on-surface-variant hover:text-primary transition-transform scale-105 active:scale-95 cursor-pointer"
            onClick={() => navigate('/settings')}
            title="Settings"
          >
            <span className="material-symbols-outlined">settings</span>
          </button>
          <div className="w-8 h-8 rounded-full bg-primary-container overflow-hidden border border-white/20 ml-2">
            <img alt="User profile" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop"/>
          </div>
        </div>
      </header>

      {/* 2. SideNavBar (Desktop Only) */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 z-40 bg-[#1c1b1b]/80 backdrop-blur-xl border-r border-white/5 flex-col p-6 pt-20 shadow-2xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-[#b0c6ff]/20 rounded flex items-center justify-center">
              <span className="material-symbols-outlined text-[#b0c6ff]">rebase_edit</span>
            </div>
            <div>
              <p className="font-headline-lg text-[14px] font-bold text-[#b0c6ff]">ResumeFlow</p>
              <p className="text-[9px] text-[#c2c6d8] uppercase tracking-widest">Intent Recovery Shell</p>
            </div>
          </div>

          <button 
            onClick={() => setShowNewJourneyModal(true)}
            className="w-full bg-[#b0c6ff] text-[#002d6f] py-2.5 rounded-lg font-body-sm font-semibold flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-[0_0_15px_rgba(176,198,255,0.3)] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            New Journey
          </button>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-300 group cursor-pointer ${
                  isActive 
                    ? 'bg-[#b0c6ff]/10 text-[#b0c6ff] border-r-2 border-[#b0c6ff] drop-shadow-[0_0_12px_rgba(0,219,233,0.3)]' 
                    : 'text-[#c2c6d8] hover:bg-white/5 hover:text-[#b0c6ff]'
                }`}
              >
                <span className={`material-symbols-outlined ${isActive ? 'fill-current' : ''}`}>
                  {item.icon}
                </span>
                <span className="font-body-md text-sm">{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-auto pt-4 border-t border-white/5 space-y-1">
          <div className="px-3 py-2 text-[10px] text-[#c2c6d8]/60 font-label-mono uppercase tracking-widest">Support Node</div>
          <a className="flex items-center gap-3 px-3 py-2 text-[#c2c6d8] hover:text-[#b0c6ff] transition-all text-xs" href="#support">
            <span className="material-symbols-outlined text-[16px]">help_outline</span>
            <span>Help Desk</span>
          </a>
        </div>
      </aside>

      {/* 3. Main Content Wrapper */}
      <main className="md:pl-64 pt-20 pb-24 md:pb-8 px-6 min-h-screen">
        {children}
      </main>

      {/* 4. BottomNavBar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 rounded-t-xl bg-[#201f1f]/90 backdrop-blur-lg border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] flex justify-around items-center h-16 pb-safe">
        {navItems.map(item => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center ${
                isActive ? 'text-[#b0c6ff] drop-shadow-[0_0_5px_rgba(176,198,255,0.6)]' : 'text-[#c2c6d8] hover:text-[#b0c6ff]'
              } active:scale-90 transition-transform duration-150 cursor-pointer`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-label-mono text-[9px] mt-0.5">{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* 5. New Journey Modal */}
      {showNewJourneyModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-md p-6 rounded-2xl border border-white/10 shadow-2xl relative">
            <button 
              className="absolute top-4 right-4 text-[#c2c6d8] hover:text-white"
              onClick={() => setShowNewJourneyModal(false)}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="font-headline-lg text-lg text-[#b0c6ff] mb-4">Start Digital Journey</h3>
            
            <form onSubmit={handleCreateJourney} className="space-y-4">
              <div>
                <label className="block text-xs font-label-mono text-[#c2c6d8] uppercase mb-1">Journey Title</label>
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Next.js Routing Documentation"
                  className="w-full bg-[#1c1b1b] border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-[#b0c6ff] focus:outline-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-xs font-label-mono text-[#c2c6d8] uppercase mb-1">Landing URL</label>
                <input 
                  type="url" 
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full bg-[#1c1b1b] border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-[#b0c6ff] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-label-mono text-[#c2c6d8] uppercase mb-1">Category</label>
                <select 
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-[#1c1b1b] border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-[#b0c6ff] focus:outline-none"
                >
                  <option value="Learning">Learning</option>
                  <option value="Coding">Coding</option>
                  <option value="Documentation">Documentation</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Research">Research</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full bg-[#b0c6ff] text-[#002d6f] py-3 rounded-xl font-bold hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-[#b0c6ff]/20 mt-2"
              >
                Initiate Journey
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
