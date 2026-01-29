import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';

const COLORS = {
  growth: '#005143',
  innovation: '#41E661',
  clarity: '#FEF5E8',
  depth: '#121B22'
};

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated, loading: authLoading } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate('/home', { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate('/home');
    } catch (err) {
      setError(err.message || 'Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  }

  // Show loading while checking auth status
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: COLORS.clarity }}>
        <div className="w-8 h-8 border-4 border-[#005143] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Don't render form if already authenticated (redirect will happen via useEffect)
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ backgroundColor: COLORS.clarity }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-block bg-white rounded-3xl p-4 shadow-xl mb-4">
            <img src="/images/Full Abjad Logo.png" alt="Abjad" className="h-16 w-auto" />
          </div>
          <h1 className="text-3xl font-bold" style={{ color: COLORS.depth }}>Welcome Back!</h1>
          <p className="text-gray-600 mt-2" dir="rtl">أبجديات إدارة المنزل</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: COLORS.depth }}>Sign In</h2>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-2xl">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.depth }}>
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-[#005143] focus:outline-none transition-colors"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.depth }}>
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-2xl focus:border-[#005143] focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm font-semibold hover:underline"
                style={{ color: COLORS.growth }}
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-2xl font-bold text-white flex items-center justify-center gap-2 transition-all hover:shadow-lg disabled:opacity-50"
              style={{ backgroundColor: COLORS.growth }}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="font-bold hover:underline"
                style={{ color: COLORS.growth }}
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Landing */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
