import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Journeys from './pages/Journeys';
import Timeline from './pages/Timeline';
import Analytics from './pages/Analytics';
import Auth from './pages/Auth';
import Settings from './pages/Settings';
import { getLocalData, saveLocalData, INITIAL_JOURNEYS, INITIAL_SESSIONS, INITIAL_NOTIFICATIONS } from './MockData';

// Create Global Intent Context
const IntentContext = createContext();

export const useIntent = () => useContext(IntentContext);

export default function App() {
  const [journeys, setJourneys] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState({ email: 'architect@resumeflow.io' }); // Simulate logged-in user
  const [supabaseConnected, setSupabaseConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    // 1. Check if Supabase keys exist in sync storage (simulated via localStorage for web interface)
    const sbUrl = localStorage.getItem('supabase_url');
    const sbKey = localStorage.getItem('supabase_key');
    
    if (sbUrl && sbKey) {
      setSupabaseConnected(true);
    }
    
    // 2. Load Local / Mock Data
    const localJourneys = getLocalData('journeys', INITIAL_JOURNEYS);
    const localSessions = getLocalData('sessions', INITIAL_SESSIONS);
    const localNotifs = getLocalData('notifications', INITIAL_NOTIFICATIONS);
    
    setJourneys(localJourneys);
    setSessions(localSessions);
    setNotifications(localNotifs);
    setLoading(false);

    // 3. Try to sync active extension state
    const extId = localStorage.getItem('extension_id') || 'lghdfjdhckejdksjldkfjsldfkjsldfk';
    if (window.chrome && window.chrome.runtime && window.chrome.runtime.sendMessage) {
      window.chrome.runtime.sendMessage(extId, { action: 'getSavedData' }, (response) => {
        const err = window.chrome.runtime.lastError;
        if (!err && response) {
          if (response.savedJourneys && response.savedJourneys.length > 0) {
            setJourneys(response.savedJourneys);
          }
          if (response.sessionLogs && response.sessionLogs.length > 0) {
            setSessions(response.sessionLogs);
          }
        }
      });
    }
  }, []);

  // Update localStorage and Chrome extension when state updates
  useEffect(() => {
    if (journeys.length > 0) {
      saveLocalData('journeys', journeys);
      const extId = localStorage.getItem('extension_id') || 'lghdfjdhckejdksjldkfjsldfkjsldfk';
      if (window.chrome && window.chrome.runtime && window.chrome.runtime.sendMessage) {
        window.chrome.runtime.sendMessage(extId, {
          action: 'updateJourneys',
          journeys: journeys
        }, () => {
          const err = window.chrome.runtime.lastError;
        });
      }
    }
  }, [journeys]);

  useEffect(() => {
    if (sessions.length > 0) saveLocalData('sessions', sessions);
  }, [sessions]);

  useEffect(() => {
    if (notifications.length > 0) saveLocalData('notifications', notifications);
  }, [notifications]);

  // Operations
  const resumeJourney = (id) => {
    setJourneys(prev => prev.map(j => 
      j.id === id ? { ...j, status: 'resumed', lastActiveAt: new Date().toISOString() } : j
    ));
    // Trigger notification
    addNotification(`Resumed flow: "${journeys.find(j => j.id === id)?.title}"`);
  };

  const snoozeJourney = (id) => {
    setJourneys(prev => prev.map(j => 
      j.id === id ? { ...j, status: 'interrupted', lastActiveAt: new Date().toISOString() } : j
    ));
    addNotification(`Snoozed notifications for: "${journeys.find(j => j.id === id)?.title}"`);
  };

  const deleteJourney = (id) => {
    setJourneys(prev => prev.filter(j => j.id !== id));
    setSessions(prev => prev.filter(s => s.journey_id !== id));
  };

  const completeJourney = (id) => {
    setJourneys(prev => prev.map(j => 
      j.id === id ? { ...j, status: 'completed', progressPct: 100 } : j
    ));
    addNotification(`Completed journey: "${journeys.find(j => j.id === id)?.title}"!`);
  };

  const addNewJourney = (title, url, category, tags = []) => {
    const newJ = {
      id: 'j-' + Math.random().toString(36).substring(2, 9),
      title,
      start_url: url,
      category,
      status: 'active',
      progress_pct: 0,
      thumbnail_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=300&auto=format&fit=crop',
      created_at: new Date().toISOString(),
      last_active_at: new Date().toISOString(),
      tags
    };
    setJourneys(prev => [newJ, ...prev]);
    
    // Add initial session
    const newS = {
      id: 's-' + Math.random().toString(36).substring(2, 9),
      journey_id: newJ.id,
      tab_url: url,
      tab_title: title,
      duration_seconds: 0,
      metadata: { scroll_position: 0, interaction_count: 0 },
      created_at: new Date().toISOString()
    };
    setSessions(prev => [newS, ...prev]);
    addNotification(`Started journey: "${title}"`);
    return newJ;
  };

  const addNotification = (message) => {
    const newN = {
      id: 'n-' + Math.random().toString(36).substring(2, 9),
      message,
      type: 'browser',
      sent_at: new Date().toISOString(),
      read_at: null
    };
    setNotifications(prev => [newN, ...prev]);
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read_at: new Date().toISOString() })));
  };

  const configureSupabase = (url, key) => {
    if (url && key) {
      localStorage.setItem('supabase_url', url);
      localStorage.setItem('supabase_key', key);
      setSupabaseConnected(true);
      addNotification("Connected to live Supabase server!");
    } else {
      localStorage.removeItem('supabase_url');
      localStorage.removeItem('supabase_key');
      setSupabaseConnected(false);
      addNotification("Disconnected Supabase. Running in offline Mock Mode.");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#050505] text-[#b0c6ff]">
        <div className="flex flex-col items-center gap-4">
          <span className="material-symbols-outlined text-[48px] animate-spin">autorenew</span>
          <span className="font-label-mono text-sm tracking-widest">INITIALIZING TELEMETRY...</span>
        </div>
      </div>
    );
  }

  return (
    <IntentContext.Provider value={{
      journeys,
      sessions,
      notifications,
      user,
      supabaseConnected,
      resumeJourney,
      snoozeJourney,
      deleteJourney,
      completeJourney,
      addNewJourney,
      addNotification,
      markAllNotificationsRead,
      configureSupabase
    }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/settings" element={<Navbar><Settings /></Navbar>} />
          
          {/* Dashboard and related layout nested inside Navbar */}
          <Route path="/dashboard" element={<Navbar><Dashboard /></Navbar>} />
          <Route path="/journeys" element={<Navbar><Journeys /></Navbar>} />
          <Route path="/timeline" element={<Navbar><Timeline /></Navbar>} />
          <Route path="/analytics" element={<Navbar><Analytics /></Navbar>} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </IntentContext.Provider>
  );
}
