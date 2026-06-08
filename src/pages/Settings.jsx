import React, { useState } from 'react';
import { useIntent } from '../App';

export default function Settings() {
  const { supabaseConnected, configureSupabase, addNotification } = useIntent();

  const [sbUrl, setSbUrl] = useState(localStorage.getItem('supabase_url') || import.meta.env.VITE_SUPABASE_URL || '');
  const [sbKey, setSbKey] = useState(localStorage.getItem('supabase_key') || import.meta.env.VITE_SUPABASE_KEY || '');
  const [extId, setExtId] = useState(localStorage.getItem('extension_id') || import.meta.env.VITE_EXTENSION_ID || 'lghdfjdhckejdksjldkfjsldfkjsldfk');
  
  const [notifBrowser, setNotifBrowser] = useState(true);
  const [notifMobile, setNotifMobile] = useState(true);
  const [notifEmail, setNotifEmail] = useState(false);

  const [inactivityLimit, setInactivityLimit] = useState('7200');
  const [excludedDomainList, setExcludedDomainList] = useState('chrome://, edge://, localhost:3000');

  const handleSaveSettings = (e) => {
    e.preventDefault();
    // Configure Supabase
    configureSupabase(sbUrl, sbKey);
    localStorage.setItem('extension_id', extId);
    
    // Sync credentials to Chrome Extension via custom event or direct runtime
    if (extId && typeof window !== 'undefined') {
      try {
        if (window.chrome && window.chrome.runtime && window.chrome.runtime.sendMessage) {
          window.chrome.runtime.sendMessage(extId, {
            action: 'syncCredentials',
            url: sbUrl,
            key: sbKey
          }, (response) => {
            const err = window.chrome.runtime.lastError;
            if (err) {
              console.warn("Direct extension sync not allowed. Falling back to event trigger.");
              // Trigger custom event fallback
              triggerEventSync();
            } else if (response && response.success) {
              addNotification("Extension credentials sync complete.");
            }
          });
        } else {
          triggerEventSync();
        }
      } catch (err) {
        triggerEventSync();
      }
    } else {
      addNotification("System configurations updated.");
    }
  };

  const triggerEventSync = () => {
    const event = new CustomEvent('RESUMEFLOW_SYNC_CREDS', {
      detail: { url: sbUrl, key: sbKey }
    });
    window.dispatchEvent(event);
    addNotification("Telemetry configs updated.");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display-lg text-3xl font-black text-white mb-2">System Settings</h1>
        <p className="text-[#c2c6d8] text-sm">Configure telemetry uplinks, inactivity engines, and notification endpoints.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left column settings form (8 cols) */}
        <form onSubmit={handleSaveSettings} className="md:col-span-8 space-y-6">
          
          {/* Supabase connection */}
          <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
            <h3 className="font-headline-lg text-base font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-[#b0c6ff]">database</span>
              Supabase Telemetry Sync
            </h3>
            <p className="text-xs text-[#c2c6d8] leading-relaxed">
              Sync saved tab metrics with a live Supabase server instance. When Supabase configuration is active, the extension and dashboard push updates in real-time.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-label-mono text-[#c2c6d8] uppercase mb-1 tracking-wider">API Endpoint URL</label>
                <input 
                  type="text"
                  value={sbUrl}
                  onChange={(e) => setSbUrl(e.target.value)}
                  placeholder="https://your-project.supabase.co"
                  className="w-full bg-[#1c1b1b] border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-[#b0c6ff] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-label-mono text-[#c2c6d8] uppercase mb-1 tracking-wider">Service Anon Key</label>
                <input 
                  type="password"
                  value={sbKey}
                  onChange={(e) => setSbKey(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsIn..."
                  className="w-full bg-[#1c1b1b] border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-[#b0c6ff] focus:outline-none"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-xs">
              <span className={`w-2 h-2 rounded-full ${supabaseConnected ? 'bg-[#00dbe9] glow-accent' : 'bg-[#ffb4ab]'}`}></span>
              <span className="text-[#c2c6d8]">
                Status: {supabaseConnected ? 'Uplink Established' : 'Offline Mock Mode Active'}
              </span>
            </div>
          </div>

          {/* Inactivity parameters */}
          <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
            <h3 className="font-headline-lg text-base font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00dbe9]">timer</span>
              Inactivity Engine Parameters
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-label-mono text-[#c2c6d8] uppercase mb-1 tracking-wider">Default Inactivity Limit</label>
                <select 
                  value={inactivityLimit}
                  onChange={(e) => setInactivityLimit(e.target.value)}
                  className="w-full bg-[#1c1b1b] border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-[#b0c6ff] focus:outline-none text-[#e5e2e1]"
                >
                  <option value="1800">30 minutes</option>
                  <option value="3600">1 hour</option>
                  <option value="7200">2 hours</option>
                  <option value="86400">24 hours</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-label-mono text-[#c2c6d8] uppercase mb-1 tracking-wider">Excluded Domains</label>
                <input 
                  type="text"
                  value={excludedDomainList}
                  onChange={(e) => setExcludedDomainList(e.target.value)}
                  className="w-full bg-[#1c1b1b] border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-[#b0c6ff] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button 
            type="submit"
            className="px-8 py-3.5 electric-flow text-[#002d6f] font-bold rounded-xl active:scale-[0.98] transition-transform text-sm cursor-pointer"
          >
            Save Configuration
          </button>
        </form>

        {/* Right column notifications (4 cols) */}
        <div className="md:col-span-4 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
            <h3 className="font-headline-lg text-base font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ecb2ff]">notifications_active</span>
              Notification Endpoints
            </h3>
            
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs text-[#c2c6d8]">Browser Push Notifications</span>
                <input 
                  type="checkbox" 
                  checked={notifBrowser} 
                  onChange={(e) => setNotifBrowser(e.target.checked)}
                  className="rounded bg-[#1c1b1b] border-white/10 text-[#b0c6ff] focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs text-[#c2c6d8]">Mobile App Notifications</span>
                <input 
                  type="checkbox" 
                  checked={notifMobile} 
                  onChange={(e) => setNotifMobile(e.target.checked)}
                  className="rounded bg-[#1c1b1b] border-white/10 text-[#b0c6ff] focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs text-[#c2c6d8]">Email Summaries</span>
                <input 
                  type="checkbox" 
                  checked={notifEmail} 
                  onChange={(e) => setNotifEmail(e.target.checked)}
                  className="rounded bg-[#1c1b1b] border-white/10 text-[#b0c6ff] focus:ring-0"
                />
              </label>
            </div>
          </div>
          
          <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-2">
            <h4 className="font-label-mono text-[9px] text-[#c2c6d8] uppercase tracking-widest">Extension Integration ID</h4>
            <input 
              type="text"
              value={extId}
              onChange={(e) => setExtId(e.target.value)}
              className="w-full bg-[#1c1b1b] border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-[#b0c6ff] focus:border-[#b0c6ff] focus:outline-none"
              placeholder="Paste Chrome Extension ID here..."
            />
            <p className="text-[10px] text-[#c2c6d8]/60 mt-2">Enter your unpacked Extension ID here to link settings changes automatically.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
