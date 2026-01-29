import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Users, Mail, Check, X, Loader2, ArrowRight } from 'lucide-react';
import { useHome } from '../../contexts/HomeContext';
import { useAuth } from '../../contexts/AuthContext';

export default function HomeSetup() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    userInvites,
    createHome,
    acceptInvite,
    declineInvite,
    loading: homeLoading
  } = useHome();

  const [mode, setMode] = useState(userInvites.length > 0 ? 'invites' : 'create');
  const [homeName, setHomeName] = useState('');
  const [homeNameAr, setHomeNameAr] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [processingInvite, setProcessingInvite] = useState(null);

  async function handleCreateHome(e) {
    e.preventDefault();
    if (!homeName.trim()) {
      setError('Please enter a home name');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await createHome(homeName.trim(), homeNameAr.trim() || null);
      navigate('/home');
    } catch (err) {
      setError(err.message || 'Failed to create home');
    } finally {
      setLoading(false);
    }
  }

  async function handleAcceptInvite(inviteId) {
    setProcessingInvite(inviteId);
    setError('');

    try {
      await acceptInvite(inviteId);
      navigate('/home');
    } catch (err) {
      setError(err.message || 'Failed to accept invitation');
    } finally {
      setProcessingInvite(null);
    }
  }

  async function handleDeclineInvite(inviteId) {
    setProcessingInvite(inviteId);
    setError('');

    try {
      await declineInvite(inviteId);
    } catch (err) {
      setError(err.message || 'Failed to decline invitation');
    } finally {
      setProcessingInvite(null);
    }
  }

  if (homeLoading) {
    return (
      <div className="min-h-screen bg-[#FEF5E8] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#005143] mx-auto mb-4" />
          <p className="text-[#005143]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FEF5E8] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-[#005143] rounded-full flex items-center justify-center mx-auto mb-4">
            <Home className="w-10 h-10 text-[#41E661]" />
          </div>
          <h1 className="text-3xl font-bold text-[#005143] mb-2">Welcome to Abjad</h1>
          <p className="text-[#005143]/70">
            {user?.name ? `Hi ${user.name}!` : 'Hi!'} Let's set up your home
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Mode Tabs (if user has invites) */}
        {userInvites.length > 0 && (
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setMode('invites')}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                mode === 'invites'
                  ? 'bg-[#005143] text-white'
                  : 'bg-white text-[#005143] hover:bg-[#005143]/10'
              }`}
            >
              <Mail className="w-4 h-4" />
              Invitations ({userInvites.length})
            </button>
            <button
              onClick={() => setMode('create')}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                mode === 'create'
                  ? 'bg-[#005143] text-white'
                  : 'bg-white text-[#005143] hover:bg-[#005143]/10'
              }`}
            >
              <Home className="w-4 h-4" />
              Create New
            </button>
          </div>
        )}

        {/* Invitations List */}
        {mode === 'invites' && userInvites.length > 0 && (
          <div className="space-y-4">
            <p className="text-[#005143]/70 text-sm mb-4">
              You have been invited to join the following homes:
            </p>
            {userInvites.map((invite) => (
              <div
                key={invite.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-[#005143]/10"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#005143]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Home className="w-6 h-6 text-[#005143]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#005143] text-lg">
                      {invite.homeName}
                    </h3>
                    <p className="text-[#005143]/60 text-sm mt-1">
                      Invited by {invite.invitedByName || 'Unknown'}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        invite.role === 'OWNER'
                          ? 'bg-[#41E661]/20 text-[#005143]'
                          : invite.role === 'CHILD'
                          ? 'bg-blue-100 text-blue-700'
                          : invite.role === 'MAID'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {invite.role}
                      </span>
                      <span className="text-xs text-[#005143]/50">
                        Expires {new Date(invite.expiresAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-4 pt-4 border-t border-[#005143]/10">
                  <button
                    onClick={() => handleDeclineInvite(invite.id)}
                    disabled={processingInvite === invite.id}
                    className="flex-1 py-2 px-4 rounded-xl font-medium border-2 border-[#005143]/20 text-[#005143] hover:bg-[#005143]/5 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {processingInvite === invite.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <X className="w-4 h-4" />
                        Decline
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleAcceptInvite(invite.id)}
                    disabled={processingInvite === invite.id}
                    className="flex-1 py-2 px-4 rounded-xl font-medium bg-[#41E661] text-[#005143] hover:bg-[#41E661]/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {processingInvite === invite.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        Accept
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create Home Form */}
        {mode === 'create' && (
          <form onSubmit={handleCreateHome} className="bg-white rounded-2xl p-6 shadow-sm border border-[#005143]/10">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#005143] mb-2">
                  Home Name *
                </label>
                <input
                  type="text"
                  value={homeName}
                  onChange={(e) => setHomeName(e.target.value)}
                  placeholder="e.g., Smith Family Home"
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#005143]/20 focus:border-[#005143] outline-none transition-all text-[#005143]"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#005143] mb-2">
                  Home Name (Arabic) <span className="text-[#005143]/50">- Optional</span>
                </label>
                <input
                  type="text"
                  value={homeNameAr}
                  onChange={(e) => setHomeNameAr(e.target.value)}
                  placeholder="e.g., بيت عائلة سميث"
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#005143]/20 focus:border-[#005143] outline-none transition-all text-[#005143] text-right"
                  dir="rtl"
                  disabled={loading}
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading || !homeName.trim()}
                  className="w-full py-4 rounded-xl font-semibold bg-[#005143] text-white hover:bg-[#005143]/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Create Home
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="mt-6 p-4 bg-[#005143]/5 rounded-xl">
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-[#005143] mt-0.5" />
                <div className="text-sm text-[#005143]/70">
                  <p className="font-medium text-[#005143] mb-1">As the home owner, you can:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Invite family members and staff</li>
                    <li>Assign roles (Child, Maid, Driver)</li>
                    <li>Manage permissions for each member</li>
                    <li>Have up to 3 owners and 10 total members</li>
                  </ul>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
