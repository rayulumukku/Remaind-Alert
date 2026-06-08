import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState('');

  useEffect(() => {
    document.title = "ResumeFlow | Intent Recovery System";
  }, []);

  const handleLaunch = () => {
    navigate('/dashboard');
  };

  return (
    <div className="bg-[#050505] text-[#e5e2e1] min-h-screen relative font-body-md">
      {/* Decorative Blobs */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#b0c6ff]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#00dbe9]/5 rounded-full blur-[120px] pointer-events-none" style={{ animationDelay: '2s' }}></div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#050505]/70 backdrop-blur-2xl border-b border-white/10 shadow-2xl">
        <div className="flex justify-between items-center h-16 px-6 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-8">
            <span className="font-headline-lg text-headline-lg font-bold text-[#b0c6ff] drop-shadow-[0_0_8px_rgba(176,198,255,0.4)] flex items-center gap-2">
              <img src="/src/assets/logo.png" className="w-6 h-6 object-contain" alt="" />
              ResumeFlow
            </span>
            <nav className="hidden md:flex items-center gap-6">
              <a className="font-label-mono text-xs text-[#b0c6ff] border-b-2 border-[#b0c6ff] hover:text-[#b0c6ff] transition-colors duration-200" href="#">Home</a>
              <a className="font-label-mono text-xs text-[#c2c6d8] hover:text-[#b0c6ff] transition-colors duration-200" href="#features">Features</a>
              <a className="font-label-mono text-xs text-[#c2c6d8] hover:text-[#b0c6ff] transition-colors duration-200" href="#flow">Flow</a>
              <a className="font-label-mono text-xs text-[#c2c6d8] hover:text-[#b0c6ff] transition-colors duration-200" href="#pricing">Pricing</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={handleLaunch} className="hidden md:flex px-4 py-2 font-label-mono text-xs text-[#b0c6ff] hover:bg-[#b0c6ff]/10 rounded transition-all cursor-pointer">Sign In</button>
            <button onClick={handleLaunch} className="px-6 py-2 electric-flow font-label-mono text-xs text-[#002d6f] rounded font-bold scale-105 active:scale-95 transition-transform cursor-pointer">Get Started</button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="pt-16 max-w-7xl mx-auto w-full">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden px-6 text-center">
          <div className="relative z-10 max-w-4xl space-y-6">
            <h1 className="font-display-lg text-4xl md:text-6xl mb-stack-sm tracking-tighter leading-tight font-black">
              <span className="block text-white">Flow State,</span>
              <span className="text-[#b0c6ff] glow-text">Found.</span>
            </h1>
            <p className="font-body-md text-sm md:text-base text-[#c2c6d8] max-w-2xl mx-auto leading-relaxed">
              The hyper-performance Intent Recovery System. Reconnect with interrupted digital journeys, track developer context, and sustain peak productivity.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <button onClick={handleLaunch} className="px-8 py-4 electric-flow text-[#002d6f] rounded font-bold flex items-center gap-2 group transition-all cursor-pointer">
                Launch Dashboard
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
              <a href="#features" className="px-8 py-4 glass-panel text-[#e5e2e1] rounded font-bold border border-white/10 hover:border-[#b0c6ff]/50 transition-all text-sm no-underline">
                Explore Features
              </a>
            </div>
          </div>

          {/* Interactive Screen Preview */}
          <div className="relative z-10 mt-16 w-full max-w-5xl px-4">
            <div className="glass-panel rounded-xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/10">
              <div className="h-8 bg-[#2a2a2a] flex items-center px-4 gap-2 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#93000a]/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ecb2ff]/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#b0c6ff]/50"></div>
                </div>
                <div className="mx-auto w-1/3 h-4 bg-[#131313] rounded-full flex items-center px-3">
                  <div className="w-full h-1 bg-white/5 rounded-full"></div>
                </div>
              </div>
              <div className="relative aspect-video">
                <img 
                  alt="Dashboard preview" 
                  className="w-full h-full object-cover grayscale-[0.2]" 
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"
                />
                
                {/* Floating telemetry indicators */}
                <div className="absolute top-1/4 -right-6 w-56 p-4 glass-panel rounded-lg hidden md:block transform rotate-3 hover:rotate-0 transition-transform cursor-pointer">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-[#b0c6ff]">insights</span>
                    <span className="font-label-mono text-[10px] text-white">Momentum Index</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[85%] bg-[#b0c6ff]"></div>
                  </div>
                  <p className="text-[9px] mt-2 text-[#c2c6d8] font-label-mono">85% Optimization Achieved</p>
                </div>

                <div className="absolute bottom-10 -left-6 w-48 p-4 glass-panel rounded-lg hidden md:block transform -rotate-3 hover:rotate-0 transition-transform cursor-pointer">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-[#00dbe9]">rocket_launch</span>
                    <span className="font-label-mono text-[10px] text-white">Sync uplink</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded bg-[#131313] flex items-center justify-center border border-white/5">
                      <span className="material-symbols-outlined text-xs">phone_iphone</span>
                    </div>
                    <div className="w-8 h-8 rounded bg-[#131313] flex items-center justify-center border border-white/5">
                      <span className="material-symbols-outlined text-xs">laptop_mac</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="py-20 px-6 max-w-7xl mx-auto w-full" id="features">
          <div className="mb-12">
            <h2 className="font-headline-lg text-2xl md:text-3xl text-white mb-2 font-bold">Architected for Focus</h2>
            <p className="text-[#c2c6d8] max-w-xl text-sm">Every detail is optimized to minimize digital distraction and restore interrupted workflows.</p>
          </div>
          
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-8 h-80 glass-panel rounded-xl p-8 relative overflow-hidden group">
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <span className="material-symbols-outlined text-[#b0c6ff] text-4xl mb-4">grid_view</span>
                  <h3 className="font-headline-lg text-xl font-bold mb-2">Unified Dashboard</h3>
                  <p className="text-[#c2c6d8] max-w-md text-sm leading-relaxed">
                    Track all active tabs, learning timelines, and comparative researches in one centralized glassmorphic control center.
                  </p>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#b0c6ff]/10 to-transparent pointer-events-none"></div>
            </div>

            <div className="col-span-12 md:col-span-4 h-80 glass-panel rounded-xl p-8 flex flex-col justify-end">
              <span className="material-symbols-outlined text-[#00dbe9] text-4xl mb-4">lock</span>
              <h3 className="font-headline-lg text-lg font-bold mb-2">Vault Security</h3>
              <p className="text-[#c2c6d8] text-xs leading-relaxed">
                Your browsing history remains localized. Encrypted storage backups ensure strict user privacy.
              </p>
            </div>

            <div className="col-span-12 md:col-span-4 h-80 glass-panel rounded-xl p-8 flex flex-col justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#ecb2ff]/10 flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-[#ecb2ff] text-3xl">hub</span>
              </div>
              <h3 className="font-headline-lg text-lg font-bold mb-2">Session Clusters</h3>
              <p className="text-[#c2c6d8] text-xs leading-relaxed">
                Connect related YouTube videos, GitHub repositories, and API docs into single cohesive journeys.
              </p>
            </div>

            <div className="col-span-12 md:col-span-8 h-80 glass-panel rounded-xl p-8 bg-[#b0c6ff]/5 relative overflow-hidden">
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <h3 className="font-headline-lg text-xl font-bold mb-2">Command Center</h3>
                  <p className="text-[#c2c6d8] max-w-sm text-sm">
                    Search and query tab metrics or resume saved journeys with keyboard shortcuts.
                  </p>
                </div>
                <div className="w-full max-w-md mx-auto bg-[#353534] rounded-lg p-3 flex items-center gap-3 border border-white/10 shadow-2xl">
                  <span className="material-symbols-outlined text-[#c2c6d8]">search</span>
                  <span className="font-label-mono text-xs text-[#c2c6d8] opacity-50">Search projects, files, or nodes...</span>
                  <kbd className="ml-auto px-2 py-1 bg-[#131313] rounded text-[10px] font-label-mono text-[#c2c6d8]">⌘K</kbd>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works (Timeline) */}
        <section className="py-20 bg-[#0e0e0e]/40 border-y border-white/5" id="flow">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-display-lg text-2xl md:text-3xl text-white font-bold">The Intent Flow</h2>
              <p className="text-[#c2c6d8] text-sm">How ResumeFlow keeps your workflow uninterrupted.</p>
            </div>
            
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#b0c6ff]/50 via-[#b0c6ff]/10 to-transparent"></div>
              
              {/* Stage 1 */}
              <div className="flex flex-col md:flex-row items-center justify-between mb-16 relative z-10">
                <div className="w-full md:w-[45%] text-right pr-0 md:pr-12 mb-4 md:mb-0">
                  <span className="font-label-mono text-xs text-[#b0c6ff] mb-1 block uppercase tracking-widest">Stage 01</span>
                  <h3 className="font-headline-lg text-lg font-semibold text-white mb-2">Passive Capture</h3>
                  <p className="text-[#c2c6d8] text-xs leading-relaxed">
                    The background extension monitors tab active durations and user scroll metrics without interfering in your work.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full electric-flow flex items-center justify-center border-4 border-[#050505] shadow-[0_0_15px_rgba(176,198,255,0.6)]">
                  <span className="material-symbols-outlined text-[#002d6f] text-sm">sync</span>
                </div>
                <div className="w-full md:w-[45%] pl-0 md:pl-12"></div>
              </div>

              {/* Stage 2 */}
              <div className="flex flex-col md:flex-row-reverse items-center justify-between mb-16 relative z-10">
                <div className="w-full md:w-[45%] text-left pl-0 md:pl-12 mb-4 md:mb-0">
                  <span className="font-label-mono text-xs text-[#00dbe9] mb-1 block uppercase tracking-widest">Stage 02</span>
                  <h3 className="font-headline-lg text-lg font-semibold text-white mb-2">Intent Mapping</h3>
                  <p className="text-[#c2c6d8] text-xs leading-relaxed">
                    Auto-categorization maps site interactions to coding, learning, or shopping, clustering related resources together.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#050505] border-2 border-[#00dbe9] flex items-center justify-center shadow-[0_0_15px_rgba(0,219,233,0.3)]">
                  <span className="material-symbols-outlined text-[#00dbe9] text-sm">auto_awesome</span>
                </div>
                <div className="w-full md:w-[45%] pr-0 md:pr-12"></div>
              </div>

              {/* Stage 3 */}
              <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
                <div className="w-full md:w-[45%] text-right pr-0 md:pr-12 mb-4 md:mb-0">
                  <span className="font-label-mono text-xs text-[#ecb2ff] mb-1 block uppercase tracking-widest">Stage 03</span>
                  <h3 className="font-headline-lg text-lg font-semibold text-white mb-2">Smart Reminders</h3>
                  <p className="text-[#c2c6d8] text-xs leading-relaxed">
                    If you step away beyond thresholds, push notifications alert you. Resuming tabs automatically clears the alarm.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#050505] border-2 border-[#ecb2ff] flex items-center justify-center shadow-[0_0_15px_rgba(236,178,255,0.3)]">
                  <span className="material-symbols-outlined text-[#ecb2ff] text-sm">trending_up</span>
                </div>
                <div className="w-full md:w-[45%] pl-0 md:pl-12"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 px-6 max-w-7xl mx-auto w-full" id="pricing">
          <div className="text-center mb-16">
            <h2 className="font-display-lg text-2xl md:text-3xl text-white font-bold">Access the OS</h2>
            <p className="text-[#c2c6d8] text-sm">Upgrade to high-performance telemetry.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
            <div className="glass-panel rounded-xl p-8 border-white/5">
              <span className="font-label-mono text-xs text-[#c2c6d8] uppercase mb-2 block">Explorer</span>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-display-lg text-3xl font-bold text-white">$0</span>
                <span className="text-[#c2c6d8] text-xs">/mo</span>
              </div>
              <ul className="space-y-4 mb-8 text-xs text-[#c2c6d8]">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#b0c6ff]">done</span> Local Dashboard Tracking
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#b0c6ff]">done</span> Extension Integration
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#b0c6ff]">done</span> 3 Saved Journeys limit
                </li>
              </ul>
              <button onClick={handleLaunch} className="w-full py-3 rounded border border-white/10 hover:bg-white/5 transition-all font-label-mono text-xs text-white cursor-pointer">Launch Free</button>
            </div>

            <div className="glass-panel rounded-xl p-8 border-[#b0c6ff]/30 relative overflow-hidden shadow-[0_0_50px_rgba(176,198,255,0.15)]">
              <div className="absolute top-0 right-0 px-4 py-1 electric-flow text-[9px] font-label-mono font-bold uppercase text-[#002d6f]">Popular</div>
              <span className="font-label-mono text-xs text-[#b0c6ff] uppercase mb-2 block">Architect</span>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-display-lg text-5xl font-bold text-[#b0c6ff] glow-text">$19</span>
                <span className="text-[#c2c6d8] text-xs">/mo</span>
              </div>
              <ul className="space-y-4 mb-8 text-xs text-[#e5e2e1]">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#b0c6ff]">done</span> Unlimited Journeys
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#b0c6ff]">done</span> Cross-Device Push Sync
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#b0c6ff]">done</span> Real-time Network Graphs
                </li>
              </ul>
              <button onClick={handleLaunch} className="w-full py-4 electric-flow text-[#002d6f] rounded font-bold shadow-lg transition-all font-label-mono text-xs cursor-pointer">Go Pro</button>
            </div>

            <div className="glass-panel rounded-xl p-8 border-white/5">
              <span className="font-label-mono text-xs text-[#c2c6d8] uppercase mb-2 block">Enterprise</span>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-display-lg text-3xl font-bold text-white">Custom</span>
              </div>
              <ul className="space-y-4 mb-8 text-xs text-[#c2c6d8]">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#b0c6ff]">done</span> Dedicated Clusters
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#b0c6ff]">done</span> SSO & Security Hardening
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#b0c6ff]">done</span> 24/7 Priority Support
                </li>
              </ul>
              <button onClick={handleLaunch} className="w-full py-3 rounded border border-white/10 hover:bg-white/5 transition-all font-label-mono text-xs text-white cursor-pointer">Contact Sales</button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6">
          <div className="glass-panel rounded-3xl p-12 text-center relative overflow-hidden border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#b0c6ff]/10 via-transparent to-[#00dbe9]/10 pointer-events-none"></div>
            <div className="relative z-10 space-y-6">
              <h2 className="font-display-lg text-3xl font-bold text-white">Ready to recover focus?</h2>
              <p className="text-[#c2c6d8] max-w-xl mx-auto text-sm leading-relaxed">
                Connect your browser extension with the SaaS telemetry and resume your digital journeys without friction.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email..." 
                  className="bg-[#353534] border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#b0c6ff] text-sm w-full"
                />
                <button onClick={handleLaunch} className="px-6 py-3 electric-flow text-[#002d6f] rounded font-bold shrink-0 cursor-pointer">Request Invitation</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0e0e0e] border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <span className="font-headline-lg text-base font-bold text-[#b0c6ff] flex items-center gap-2">
              <img src="/src/assets/logo.png" className="w-5 h-5 object-contain" alt="" />
              ResumeFlow
            </span>
            <p className="text-[#c2c6d8] text-xs mt-1">Intent recovery for high-momentum teams.</p>
          </div>
          <span className="font-label-mono text-[10px] text-[#c2c6d8]/40">© 2026 RESUMEFLOW. ALL RIGHTS RESERVED.</span>
        </div>
      </footer>
    </div>
  );
}
