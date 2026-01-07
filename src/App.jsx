import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import DigitalTwin from './pages/DigitalTwin';
import Assets from './pages/Assets';
import Tasks from './pages/Tasks';
import Marketplace from './pages/Marketplace';
import { Home, Map, Package, ClipboardList, Store, Menu, X } from 'lucide-react';

function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/digital-twin', icon: Map, label: 'Digital Twin' },
    { path: '/assets', icon: Package, label: 'Assets' },
    { path: '/tasks', icon: ClipboardList, label: 'Tasks' },
    { path: '/marketplace', icon: Store, label: 'Marketplace' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 flex-col p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <Home className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Home Twin</h1>
        </div>

        <div className="space-y-2">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive(path)
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Home className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-lg font-bold">Home Twin</h1>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-40 pt-16">
          <nav className="p-4 space-y-2">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
                  isActive(path)
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}

function HomePage() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <h1 className="text-4xl font-bold mb-2">Welcome to Home Twin</h1>
        <p className="text-lg opacity-90">Your Smart Home Management System</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Assets', value: '12', color: 'blue' },
          { label: 'Pending Tasks', value: '3', color: 'orange' },
          { label: 'Active Services', value: '2', color: 'green' },
          { label: 'Rooms', value: '8', color: 'purple' }
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">{label}</p>
            <p className={`text-3xl font-bold text-${color}-600`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/assets" className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all">
            <Package className="w-8 h-8 text-blue-600 mb-2" />
            <h3 className="font-semibold">Add New Asset</h3>
            <p className="text-sm text-gray-600">Scan receipt with OCR</p>
          </Link>
          <Link to="/digital-twin" className="p-4 border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all">
            <Map className="w-8 h-8 text-purple-600 mb-2" />
            <h3 className="font-semibold">View Floor Plan</h3>
            <p className="text-sm text-gray-600">Interactive digital twin</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router basename="/Abjad">
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="md:ml-64 p-4 md:p-8 pt-20 md:pt-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/digital-twin" element={<DigitalTwin />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
      </div>
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
