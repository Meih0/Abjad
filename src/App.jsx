import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Landing from './pages/Landing';
import DigitalTwin from './pages/DigitalTwin';
import Assets from './pages/Assets';
import Tasks from './pages/Tasks';
import Marketplace from './pages/Marketplace';
import { Home, Map, Package, ClipboardList, Store, Menu, X, User, ChevronRight, CheckCircle, Clock, Wrench, AlertCircle } from 'lucide-react';

// Hawaz Brand Colors
const COLORS = {
  growth: '#005143',      // Primary dark green
  innovation: '#41E661',  // Bright green
  clarity: '#FEF5E8',     // Cream
  depth: '#121B22'        // Dark charcoal
};

function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/digital-twin', icon: Map, label: 'Digital Twin' },
    { path: '/assets', icon: Package, label: 'Assets' },
    { path: '/tasks', icon: ClipboardList, label: 'Tasks' },
    { path: '/marketplace', icon: Store, label: 'Marketplace' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>{`
        :root {
          --growth: #005143;
          --innovation: #41E661;
          --clarity: #FEF5E8;
          --depth: #121B22;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif;
          background: #FEF5E8;
        }

        /* Hide scrollbars for cleaner app feel */
        ::-webkit-scrollbar {
          display: none;
        }

        * {
          -ms-overflow-style: none;
          scrollbar-width: none;
          -webkit-tap-highlight-color: transparent;
        }

        /* App-like smooth transitions */
        * {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        button:active {
          transform: scale(0.96);
        }
      `}</style>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-white z-50 lg:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Sidebar Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden">
                      <img src="/Abjad/images/Abjad Logo.png" alt="Abjad" className="w-full h-full object-contain" />
                    </div>
                    <span className="font-bold" style={{ color: COLORS.depth }}>Abjad</span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Nav Items */}
                <nav className="flex-1 p-4 space-y-1">
                  {navItems.map((item) => {
                    const active = isActive(item.path);
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                          active ? 'text-white' : 'text-gray-600 hover:bg-gray-100'
                        }`}
                        style={active ? { backgroundColor: COLORS.growth } : {}}
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>

                {/* User Section */}
                <div className="p-4 border-t border-gray-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate" style={{ color: COLORS.depth }}>Demo User</p>
                      <p className="text-sm text-gray-500 truncate">demo@hometwin.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-100 flex-col z-30">
        {/* Logo */}
        <div className="flex items-center gap-3 p-6 border-b border-gray-100">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden">
            <img src="/Abjad/images/Abjad Logo.png" alt="Abjad" className="w-full h-full object-contain" />
          </div>
          <span className="font-bold text-lg" style={{ color: COLORS.depth }}>Abjad</span>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  active ? 'text-white' : 'text-gray-600 hover:bg-[#FEF5E8]'
                }`}
                style={active ? { backgroundColor: COLORS.growth } : {}}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-gray-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate" style={{ color: COLORS.depth }}>Demo User</p>
              <p className="text-xs text-gray-500 truncate">demo@hometwin.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation - App Style */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200/50 lg:hidden z-30">
        <div className="flex items-center justify-around px-2 pt-2 pb-6">
          {navItems.slice(0, 5).map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center gap-1.5 px-2 py-1.5 min-w-[60px]"
              >
                <div className={`relative p-2 rounded-2xl transition-all ${
                  active ? '' : 'bg-transparent'
                }`}
                style={active ? { backgroundColor: COLORS.growth } : {}}
                >
                  <item.icon className={`h-5 w-5 ${active ? 'text-white' : 'text-gray-400'}`} />
                  {active && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-2xl -z-10"
                      style={{ backgroundColor: COLORS.growth }}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </div>
                <span className={`text-[10px] font-semibold transition-colors ${
                  active ? '' : 'text-gray-400'
                }`}
                style={active ? { color: COLORS.depth } : {}}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

function HomePage() {
  // Mock data for demo
  const [stats] = useState({
    rooms: 8,
    activeTasks: 5,
    assets: 12,
    completedToday: 3,
    overallProgress: 65,
    completedTasks: 13,
    totalTasks: 20
  });

  const [recentTasks] = useState([
    { id: 1, title: 'Fix leaking kitchen faucet', type: 'maintenance', status: 'completed' },
    { id: 2, title: 'Clean AC filters', type: 'cleaning', status: 'in_progress' },
    { id: 3, title: 'Replace living room light bulb', type: 'maintenance', status: 'pending' },
    { id: 4, title: 'Monthly pest control', type: 'cleaning', status: 'completed' },
    { id: 5, title: 'Inspect electrical panel', type: 'inspection', status: 'pending' }
  ]);

  const navItems = [
    {
      name: 'Digital Twin',
      path: '/digital-twin',
      icon: Map,
      color: COLORS.growth,
      description: 'Interactive floor plan'
    },
    {
      name: 'My Tasks',
      path: '/tasks',
      icon: ClipboardList,
      color: COLORS.innovation,
      description: 'Task assignments'
    },
    {
      name: 'Assets',
      path: '/assets',
      icon: Package,
      color: COLORS.growth,
      description: 'Appliances & items'
    },
    {
      name: 'Marketplace',
      path: '/marketplace',
      icon: Store,
      color: COLORS.innovation,
      description: 'Service providers'
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.clarity }}>
      {/* Header - App Style */}
      <header className="relative overflow-hidden" style={{ backgroundColor: COLORS.growth }}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6TTI0IDM2YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-20" />
        <div className="max-w-6xl mx-auto px-5 pt-12 pb-8 relative">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-white/80 text-sm font-medium mb-1">Welcome back</p>
              <h1 className="text-3xl font-bold tracking-tight text-white">Demo User 👋</h1>
              <p className="text-white/70 text-sm mt-1 font-medium" dir="rtl">أبجديات إدارة المنزل</p>
            </div>
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg p-2">
              <img src="/Abjad/images/Abjad Logo.png" alt="Abjad" className="w-full h-full object-contain" />
            </div>
          </div>

          {/* Quick Stats - Card Style */}
          <div className="grid grid-cols-2 gap-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="backdrop-blur-xl rounded-3xl p-4 shadow-lg border"
              style={{ backgroundColor: `${COLORS.innovation}33`, borderColor: `${COLORS.innovation}4D` }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${COLORS.innovation}4D` }}>
                  <Map className="h-4 w-4 text-white" />
                </div>
              </div>
              <p className="text-3xl font-bold text-white">{stats.rooms}</p>
              <p className="text-white/90 text-sm font-medium">Rooms</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="bg-white/15 backdrop-blur-xl rounded-3xl p-4 shadow-lg"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                  <ClipboardList className="h-4 w-4 text-white" />
                </div>
              </div>
              <p className="text-3xl font-bold text-white">{stats.activeTasks}</p>
              <p className="text-white/90 text-sm font-medium">Active Tasks</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/15 backdrop-blur-xl rounded-3xl p-4 shadow-lg"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                  <Package className="h-4 w-4 text-white" />
                </div>
              </div>
              <p className="text-3xl font-bold text-white">{stats.assets}</p>
              <p className="text-white/90 text-sm font-medium">Assets</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white/15 backdrop-blur-xl rounded-3xl p-4 shadow-lg"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
              </div>
              <p className="text-3xl font-bold text-white">{stats.completedToday}</p>
              <p className="text-white/90 text-sm font-medium">Done Today</p>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-5 -mt-4 pb-24 lg:pb-8">
        {/* Progress Card - App Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-white to-gray-50 shadow-xl border-0 mb-5 rounded-3xl overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-gray-500 text-sm font-medium">Your Progress</p>
                <h2 className="text-3xl font-bold text-gray-900 mt-1">{stats.overallProgress}%</h2>
              </div>
              <div className="relative w-16 h-16">
                <svg className="w-16 h-16 transform -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="#f0f0f0"
                    strokeWidth="6"
                    fill="none"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="url(#gradient)"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${stats.overallProgress * 1.76} 176`}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={COLORS.growth} />
                      <stop offset="100%" stopColor={COLORS.innovation} />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="bg-gray-100 rounded-2xl h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stats.overallProgress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full rounded-2xl"
                style={{ backgroundColor: COLORS.innovation }}
              />
            </div>
            <p className="text-sm text-gray-500 mt-3 font-medium">
              {stats.completedTasks} of {stats.totalTasks} tasks completed
            </p>
          </div>
        </motion.div>

        {/* Navigation Grid - Modern Cards */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 px-1">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={item.path}>
                  <div className="bg-white hover:shadow-2xl active:scale-95 transition-all cursor-pointer border-0 shadow-lg rounded-3xl h-full overflow-hidden">
                    <div className="p-5">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 shadow-lg" style={{ backgroundColor: item.color }}>
                        <item.icon className="h-7 w-7 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900 text-base">{item.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Alerts Section - Modern Style */}
        <h3 className="text-lg font-bold text-gray-900 mb-4 px-1">Attention Needed</h3>
        <div className="grid md:grid-cols-2 gap-3 mb-6">
          {/* Urgent Tasks */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="border-0 shadow-xl rounded-3xl overflow-hidden text-white" style={{ backgroundColor: COLORS.depth }}>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold">Urgent Tasks</h3>
                    <p className="text-sm text-white/80">2 items need attention</p>
                  </div>
                  <ChevronRight className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <div className="bg-white/10 backdrop-blur rounded-2xl p-3">
                    <p className="font-medium text-sm">Clean AC filters</p>
                    <p className="text-xs text-white/70 mt-1">📍 Living Room</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-2xl p-3">
                    <p className="font-medium text-sm">Fix leaking faucet</p>
                    <p className="text-xs text-white/70 mt-1">📍 Kitchen</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Maintenance Alerts */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="border-0 shadow-xl rounded-3xl overflow-hidden text-white" style={{ backgroundColor: COLORS.growth }}>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                    <Wrench className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold">Maintenance</h3>
                    <p className="text-sm text-white/80">2 items due soon</p>
                  </div>
                  <ChevronRight className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <div className="bg-white/10 backdrop-blur rounded-2xl p-3">
                    <p className="font-medium text-sm">Samsung AC Service</p>
                    <p className="text-xs text-white/70 mt-1 capitalize">Air Conditioning</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-2xl p-3">
                    <p className="font-medium text-sm">Water Heater Checkup</p>
                    <p className="text-xs text-white/70 mt-1 capitalize">Appliance</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <h3 className="text-lg font-bold text-gray-900 mb-4 px-1">Recent Activity</h3>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border-0 shadow-lg mb-6 rounded-3xl"
        >
          <div className="p-5">
            <div className="space-y-2.5">
              {recentTasks.map((task, idx) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center gap-3 p-3.5 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm`}
                    style={{
                      backgroundColor: task.status === 'completed' ? COLORS.innovation : task.status === 'in_progress' ? COLORS.growth : '#d1d5db'
                    }}
                  >
                    {task.status === 'completed' ? (
                      <CheckCircle className="h-5 w-5 text-white" />
                    ) : task.status === 'in_progress' ? (
                      <Clock className="h-5 w-5 text-white" />
                    ) : (
                      <Clock className="h-5 w-5 text-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">
                      {task.title}
                    </p>
                    <p className="text-xs text-gray-500 capitalize font-medium">
                      {task.type.replace('_', ' ')}
                    </p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    task.status === 'completed'
                      ? 'bg-green-100 text-green-700'
                      : task.status === 'in_progress'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    {task.status === 'completed' ? '✓' : task.status === 'in_progress' ? '...' : '○'}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.clarity }}>
      {!isLandingPage && <Navigation />}
      <main className={!isLandingPage ? "lg:ml-64" : ""}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/digital-twin" element={<DigitalTwin />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router basename="/Abjad">
      <AppContent />
    </Router>
  );
}

// Add error boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div className="p-8 text-center"><h1 className="text-2xl font-bold">Something went wrong</h1><p>Please refresh the page.</p></div>;
    }
    return this.props.children;
  }
}

function AppWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}

export default AppWithErrorBoundary;
