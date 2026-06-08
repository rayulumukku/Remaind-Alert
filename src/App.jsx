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
import { getLocalData, saveLocalData, INITIAL_JOURNEYS, INITIAL_SESSIONS, INITIAL_NOTIFICATIONS, INITIAL_ACTIVE_SESSIONS } from './MockData';

// Create Global Intent Context
const IntentContext = createContext();

export const useIntent = () => useContext(IntentContext);

export default function App() {
  const [journeys, setJourneys] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [activeSessions, setActiveSessions] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState({ email: 'architect@resumeflow.io' }); // Simulate logged-in user
  const [supabaseConnected, setSupabaseConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch real-time data from Supabase
  const fetchSupabaseData = async (url, key) => {
    if (!url || !key) return;
    try {
      const headers = {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json'
      };

      // 1. Fetch journeys with joined category names
      const journeysRes = await fetch(`${url}/rest/v1/journeys?select=*,categories(name)&order=last_active_at.desc`, { headers });
      if (journeysRes.ok) {
        const data = await journeysRes.json();
        const mapped = data.map(item => ({
          ...item,
          category: item.categories ? item.categories.name : 'Research',
          progressPct: item.progress_pct || 0
        }));
        setJourneys(mapped);
      }

      // 2. Fetch sessions
      const sessionsRes = await fetch(`${url}/rest/v1/sessions?select=*,journeys(title,category_id,categories(name))&order=created_at.desc`, { headers });
      if (sessionsRes.ok) {
        const data = await sessionsRes.json();
        const mapped = data.map(item => ({
          ...item,
          category: item.journeys?.categories?.name || 'Research'
        }));
        setSessions(mapped);
      }

      // 3. Fetch notifications
      const notificationsRes = await fetch(`${url}/rest/v1/notifications?select=*&order=sent_at.desc`, { headers });
      if (notificationsRes.ok) {
        const data = await notificationsRes.json();
        setNotifications(data);
      }
    } catch (err) {
      console.error("Failed to fetch Supabase telemetry:", err);
    }
  };

  // Load initial data
  useEffect(() => {
    const sbUrl = localStorage.getItem('supabase_url');
    const sbKey = localStorage.getItem('supabase_key');
    
    if (sbUrl && sbKey) {
      setSupabaseConnected(true);
      fetchSupabaseData(sbUrl, sbKey);
    } else {
      // Clear data to enforce no mock data
      setJourneys([]);
      setSessions([]);
      setNotifications([]);
      setActiveSessions([]);
    }
    setLoading(false);

    // Try to sync active extension state
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
          if (response.activeSessions && response.activeSessions.length > 0) {
            setActiveSessions(response.activeSessions);
          }
        }
      });
    }
  }, []);

  // Update Chrome extension when state updates (only sync journeys to extension storage)
  useEffect(() => {
    if (journeys.length > 0) {
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

  // Listen for live broadcasts from content script
  useEffect(() => {
    const handleLiveUpdate = (e) => {
      const data = e.detail;
      if (data) {
        if (data.savedJourneys) {
          const mapped = data.savedJourneys.map(item => ({
            ...item,
            category: item.category || 'Research',
            progressPct: item.progressPct || item.progress_pct || 0
          }));
          setJourneys(mapped);
        }
        if (data.sessionLogs) setSessions(data.sessionLogs);
        if (data.activeSessions) setActiveSessions(data.activeSessions);
      }
    };
    window.addEventListener('RESUMEFLOW_DASHBOARD_UPDATE', handleLiveUpdate);
    return () => {
      window.removeEventListener('RESUMEFLOW_DASHBOARD_UPDATE', handleLiveUpdate);
    };
  }, []);

  // Operations
  const resumeJourney = async (id) => {
    if (supabaseConnected) {
      const url = localStorage.getItem('supabase_url');
      const key = localStorage.getItem('supabase_key');
      const headers = {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json'
      };
      await fetch(`${url}/rest/v1/journeys?id=eq.${id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ status: 'resumed', last_active_at: new Date().toISOString() })
      });
      fetchSupabaseData(url, key);
    } else {
      setJourneys(prev => prev.map(j => 
        j.id === id ? { ...j, status: 'resumed', lastActiveAt: new Date().toISOString() } : j
      ));
    }
    addNotification(`Resumed flow: "${journeys.find(j => j.id === id)?.title || 'Selected Journey'}"`);
  };

  const snoozeJourney = async (id) => {
    if (supabaseConnected) {
      const url = localStorage.getItem('supabase_url');
      const key = localStorage.getItem('supabase_key');
      const headers = {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json'
      };
      await fetch(`${url}/rest/v1/journeys?id=eq.${id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ status: 'interrupted', last_active_at: new Date().toISOString() })
      });
      fetchSupabaseData(url, key);
    } else {
      setJourneys(prev => prev.map(j => 
        j.id === id ? { ...j, status: 'interrupted', lastActiveAt: new Date().toISOString() } : j
      ));
    }
    addNotification(`Snoozed notifications for: "${journeys.find(j => j.id === id)?.title || 'Selected Journey'}"`);
  };

  const deleteJourney = async (id) => {
    if (supabaseConnected) {
      const url = localStorage.getItem('supabase_url');
      const key = localStorage.getItem('supabase_key');
      const headers = {
        'apikey': key,
        'Authorization': `Bearer ${key}`
      };
      await fetch(`${url}/rest/v1/journeys?id=eq.${id}`, {
        method: 'DELETE',
        headers
      });
      fetchSupabaseData(url, key);
    } else {
      setJourneys(prev => prev.filter(j => j.id !== id));
      setSessions(prev => prev.filter(s => s.journey_id !== id));
    }
  };

  const completeJourney = async (id) => {
    if (supabaseConnected) {
      const url = localStorage.getItem('supabase_url');
      const key = localStorage.getItem('supabase_key');
      const headers = {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json'
      };
      await fetch(`${url}/rest/v1/journeys?id=eq.${id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ status: 'completed', progress_pct: 100 })
      });
      fetchSupabaseData(url, key);
    } else {
      setJourneys(prev => prev.map(j => 
        j.id === id ? { ...j, status: 'completed', progressPct: 100 } : j
      ));
    }
    addNotification(`Completed journey: "${journeys.find(j => j.id === id)?.title || 'Selected Journey'}"!`);
  };

  const addNewJourney = async (title, url, category, tags = []) => {
    if (supabaseConnected) {
      const sbUrl = localStorage.getItem('supabase_url');
      const sbKey = localStorage.getItem('supabase_key');
      const headers = {
        'apikey': sbKey,
        'Authorization': `Bearer ${sbKey}`,
        'Content-Type': 'application/json'
      };
      
      try {
        const catRes = await fetch(`${sbUrl}/rest/v1/categories?select=id,name`, { headers });
        const categories = await catRes.json();
        const matched = categories.find(c => c.name.toLowerCase() === category.toLowerCase());
        const categoryId = matched ? matched.id : null;

        const res = await fetch(`${sbUrl}/rest/v1/journeys`, {
          method: 'POST',
          headers: {
            ...headers,
            'Prefer': 'return=representation'
          },
          body: JSON.stringify({
            title,
            start_url: url,
            status: 'active',
            progress_pct: 0,
            thumbnail_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=300&auto=format&fit=crop',
            category_id: categoryId,
            tags
          })
        });

        if (res.ok) {
          const inserted = await res.json();
          const newJ = inserted[0];

          await fetch(`${sbUrl}/rest/v1/sessions`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
              journey_id: newJ.id,
              tab_url: url,
              tab_title: title,
              duration_seconds: 0,
              metadata: { scroll_position: 0, interaction_count: 0 }
            })
          });

          fetchSupabaseData(sbUrl, sbKey);
          addNotification(`Started journey: "${title}"`);
          return newJ;
        }
      } catch (err) {
        console.error("Failed to add new journey to Supabase:", err);
      }
    } else {
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
    }
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
      activeSessions,
      setActiveSessions,
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
