import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Map, 
  ClipboardList, 
  Package, 
  Store, 
  Menu, 
  X, 
  LogOut,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const NAV_ITEMS = [
  { name: 'Home', path: '/home', icon: Home },
  { name: 'Digital Twin', path: '/digital-twin', icon: Map },
  { name: 'My Tasks', path: '/my-tasks', icon: ClipboardList },
  { name: 'Assets', path: '/assets', icon: Package },
  { name: 'Marketplace', path: '/marketplace', icon: Store },
];

export default function Layout({ children, currentPageName }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: 'Demo User',
    email: 'demo@hometwin.com'
  });
  const location = useLocation();

  useEffect(() => {
    // Try to get Base44 user if available, otherwise use demo user
    if (typeof base44 !== 'undefined' && base44.auth) {
      base44.auth.me()
        .then(setCurrentUser)
        .catch(() => {
          // Keep demo user if Base44 fails
          console.log('Running in demo mode without Base44');
        });
    }
  }, []);

  const handleLogout = () => {
    base44.auth.logout();
  };

  // Hide bottom nav on certain pages if needed
  const showBottomNav = true;

  return (
    <div className="min-h-screen bg-gray-50">
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
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
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
                    <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
                      <Home className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-bold text-gray-900">Home Twin</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Nav Items */}
                <nav className="flex-1 p-4 space-y-1">
                  {NAV_ITEMS.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                          isActive
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    );
                  })}
                </nav>

                {/* User Section */}
                {currentUser && (
                  <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {currentUser.full_name || currentUser.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {currentUser.email}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-100 flex-col z-30">
        {/* Logo */}
        <div className="flex items-center gap-3 p-6 border-b border-gray-100">
        <div className="w-10 h-10 bg-[#005143] rounded-xl flex items-center justify-center">
        <Home className="h-5 w-5 text-white" />
        </div>
        <span className="font-bold text-[#121B22] text-lg">Home Twin</span>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive 
                    ? 'bg-[#005143] text-white' 
                    : 'text-gray-600 hover:bg-[#FEF5E8]'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        {currentUser && (
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-gray-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate text-sm">
                  {currentUser.full_name || currentUser.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {currentUser.email}
                </p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              className="w-full justify-start text-gray-500 hover:text-gray-900"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 pb-20 lg:pb-0">
        {children}
      </main>

      {/* Mobile Bottom Navigation - App Style */}
      {showBottomNav && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200/50 lg:hidden z-30">
          <div className="flex items-center justify-around px-2 pt-2 pb-6">
            {NAV_ITEMS.slice(0, 5).map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex flex-col items-center gap-1.5 px-2 py-1.5 min-w-[60px]"
                >
                  <div className={`relative p-2 rounded-2xl transition-all ${
                    isActive ? 'bg-[#005143]' : 'bg-transparent'
                  }`}>
                    <item.icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-[#005143] rounded-2xl -z-10"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </div>
                  <span className={`text-[10px] font-semibold transition-colors ${
                    isActive ? 'text-[#121B22]' : 'text-gray-400'
                  }`}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}

      {/* Mobile Menu Button (for pages with custom headers) */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-30 lg:hidden bg-white shadow-sm border border-gray-100"
        onClick={() => setSidebarOpen(true)}
        style={{ display: 'none' }} // Hidden by default, pages can show if needed
      >
        <Menu className="h-5 w-5" />
      </Button>
    </div>
  );
}