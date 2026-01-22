import { useAuth } from '../contexts/AuthContext';
import { useLocation } from 'react-router-dom';

export default function Debug() {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: '#FEF5E8' }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8" style={{ color: '#121B22' }}>Debug Info</h1>

        <div className="bg-white rounded-3xl shadow-xl p-6 mb-4">
          <h2 className="text-xl font-bold mb-4">Auth Status</h2>
          <div className="space-y-2 font-mono text-sm">
            <p><strong>Loading:</strong> {loading ? 'true' : 'false'}</p>
            <p><strong>Authenticated:</strong> {isAuthenticated ? 'true' : 'false'}</p>
            <p><strong>User:</strong> {user ? 'Logged in' : 'Not logged in'}</p>
          </div>
        </div>

        {user && (
          <div className="bg-white rounded-3xl shadow-xl p-6 mb-4">
            <h2 className="text-xl font-bold mb-4">User Data</h2>
            <pre className="bg-gray-100 p-4 rounded-xl overflow-auto">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-xl p-6 mb-4">
          <h2 className="text-xl font-bold mb-4">Route Info</h2>
          <div className="space-y-2 font-mono text-sm">
            <p><strong>Current Path:</strong> {location.pathname}</p>
            <p><strong>Search:</strong> {location.search || 'none'}</p>
            <p><strong>Hash:</strong> {location.hash || 'none'}</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6">
          <h2 className="text-xl font-bold mb-4">Environment</h2>
          <div className="space-y-2 font-mono text-sm">
            <p><strong>Host:</strong> {window.location.host}</p>
            <p><strong>Protocol:</strong> {window.location.protocol}</p>
            <p><strong>Full URL:</strong> {window.location.href}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
