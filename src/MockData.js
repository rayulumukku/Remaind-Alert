// ResumeFlow Mock Data Service (Fallback storage when Supabase is not connected)

export const MOCK_CATEGORIES = [
  { id: 'cat-1', name: 'Learning', icon_key: 'school', color_hex: '#b0c6ff' },
  { id: 'cat-2', name: 'Coding', icon_key: 'code', color_hex: '#ecb2ff' },
  { id: 'cat-3', name: 'Documentation', icon_key: 'description', color_hex: '#7df4ff' },
  { id: 'cat-4', name: 'Shopping', icon_key: 'shopping_bag', color_hex: '#00dbe9' },
  { id: 'cat-5', name: 'Research', icon_key: 'explore', color_hex: '#00a0aa' }
];

export const INITIAL_JOURNEYS = [
  {
    id: 'j-1',
    title: 'React Hooks Mastery: Concurrent UI Patterns',
    start_url: 'https://youtube.com/watch?v=react-hooks-concurrent',
    category_id: 'cat-1',
    category: 'Learning',
    status: 'interrupted',
    progress_pct: 68,
    thumbnail_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=300&auto=format&fit=crop',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    last_active_at: new Date(Date.now() - 22 * 60000).toISOString(), // 22 mins ago
    tags: ['React', 'Hooks', 'Vite']
  },
  {
    id: 'j-2',
    title: 'Nvidia RTX 5090 vs 4090 Benchmarks',
    start_url: 'https://www.youtube.com/watch?v=rtx5090-vs-4090',
    category_id: 'cat-4',
    category: 'Shopping',
    status: 'interrupted',
    progress_pct: 30,
    thumbnail_url: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=300&auto=format&fit=crop',
    created_at: new Date(Date.now() - 3600000 * 6).toISOString(), // 6 hours ago
    last_active_at: new Date(Date.now() - 4 * 3600000).toISOString(), // 4 hours ago
    tags: ['GPU', 'Hardware', 'Gaming']
  },
  {
    id: 'j-3',
    title: 'Kubernetes Cluster Config & YAML Specs',
    start_url: 'https://github.com/kubernetes/kubernetes',
    category_id: 'cat-2',
    category: 'Coding',
    status: 'resumed',
    progress_pct: 85,
    thumbnail_url: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=300&auto=format&fit=crop',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    last_active_at: new Date(Date.now() - 3600000 * 12).toISOString(),
    tags: ['K8s', 'DevOps', 'YAML']
  },
  {
    id: 'j-4',
    title: 'Next-Gen UX Systems & Spatial Design',
    start_url: 'https://docs.google.com/document/d/spatial-ui',
    category_id: 'cat-5',
    category: 'Research',
    status: 'active',
    progress_pct: 50,
    thumbnail_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=300&auto=format&fit=crop',
    created_at: new Date(Date.now() - 300000).toISOString(), // 5 mins ago
    last_active_at: new Date(Date.now() - 180000).toISOString(), // 3 mins ago
    tags: ['UX', 'VR', 'Figma']
  }
];

export const INITIAL_SESSIONS = [
  {
    id: 's-1',
    journey_id: 'j-1',
    tab_url: 'https://youtube.com/watch?v=react-hooks-concurrent',
    tab_title: 'React Hooks Mastery - Concurrent Rendering Options',
    duration_seconds: 1420,
    metadata: { scroll_position: 68, interaction_count: 42 },
    created_at: new Date(Date.now() - 25 * 60000).toISOString()
  },
  {
    id: 's-2',
    journey_id: 'j-1',
    tab_url: 'https://react.dev/reference/react/useTransition',
    tab_title: 'useTransition - React Docs Reference API',
    duration_seconds: 480,
    metadata: { scroll_position: 90, interaction_count: 15 },
    created_at: new Date(Date.now() - 15 * 60000).toISOString()
  },
  {
    id: 's-3',
    journey_id: 'j-2',
    tab_url: 'https://www.youtube.com/watch?v=rtx5090-vs-4090',
    tab_title: 'Nvidia RTX 5090 & 5080 Specs & GPU Performance Leaks',
    duration_seconds: 960,
    metadata: { scroll_position: 30, interaction_count: 24 },
    created_at: new Date(Date.now() - 4 * 3600000).toISOString()
  },
  {
    id: 's-4',
    journey_id: 'j-3',
    tab_url: 'https://github.com/kubernetes/kubernetes',
    tab_title: 'kubernetes/kubernetes: Production-Grade Container Scheduling',
    duration_seconds: 2400,
    metadata: { scroll_position: 85, interaction_count: 120 },
    created_at: new Date(Date.now() - 12 * 3600000).toISOString()
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'n-1',
    journey_id: 'j-1',
    message: 'You paused your Learning journey midway: "React Hooks Mastery"',
    type: 'browser',
    sent_at: new Date(Date.now() - 2 * 3600000).toISOString(),
    read_at: null
  },
  {
    id: 'n-2',
    journey_id: 'j-2',
    message: 'You were comparing gaming laptops 4 hours ago.',
    type: 'mobile_push',
    sent_at: new Date(Date.now() - 4 * 3600000).toISOString(),
    read_at: new Date(Date.now() - 3.8 * 3600000).toISOString()
  }
];

// LocalStorage helpers to simulate database operations in Mock Mode
export const getLocalData = (key, fallback) => {
  const data = localStorage.getItem(`resumeflow_${key}`);
  if (!data) {
    localStorage.setItem(`resumeflow_${key}`, JSON.stringify(fallback));
    return fallback;
  }
  return JSON.parse(data);
};

export const saveLocalData = (key, data) => {
  localStorage.setItem(`resumeflow_${key}`, JSON.stringify(data));
};
