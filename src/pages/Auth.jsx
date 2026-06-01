import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntent } from '../App';

export default function Auth() {
  const navigate = useNavigate();
  const { addNotification } = useIntent();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    
    // Simulate successful authentication
    addNotification(`Authenticated user: ${email}`);
    navigate('/dashboard');
  };

  return (
    <div className="bg-[#050505] text-[#e5e2e1] min-h-screen relative font-body-md flex items-center justify-center p-6">
      {/* Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#b0c6ff]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#00dbe9]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="glass-panel w-full max-w-md p-8 rounded-3xl border border-white/10 shadow-2xl relative z-10 space-y-6">
        <div className="text-center">
          <span 
            onClick={() => navigate('/')} 
            className="font-display-lg text-2xl font-black text-[#b0c6ff] tracking-tighter drop-shadow-[0_0_8px_rgba(176,198,255,0.4)] cursor-pointer"
          >
            ResumeFlow
          </span>
          <p className="text-xs text-[#c2c6d8] mt-2">
            {isLogin ? 'Enter intent recovery portal' : 'Create new security node'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-label-mono text-[#c2c6d8] uppercase mb-1 tracking-wider">Email Address</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="architect@resumeflow.io"
              className="w-full bg-[#1c1b1b] border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[#b0c6ff] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-label-mono text-[#c2c6d8] uppercase mb-1 tracking-wider">Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#1c1b1b] border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[#b0c6ff] focus:outline-none"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full py-4 electric-flow text-[#002d6f] font-bold rounded-xl active:scale-[0.98] transition-transform text-sm cursor-pointer mt-2"
          >
            {isLogin ? 'Establish Uplink' : 'Initialize Node'}
          </button>
        </form>

        <div className="text-center pt-2">
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-xs text-[#c2c6d8] hover:text-[#b0c6ff] transition-colors"
          >
            {isLogin ? "Don't have a node? Register here" : "Already have a node? Log in"}
          </button>
        </div>
      </div>
    </div>
  );
}
