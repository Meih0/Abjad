import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Mail,
  Shield,
  Trash2,
  Edit2,
  X,
  Check,
  Loader2,
  Crown,
  Baby,
  Sparkles,
  Car,
  Clock,
  ChevronDown
} from 'lucide-react';
import { useHome, DEFAULT_PERMISSIONS } from '../../contexts/HomeContext';

const ROLE_CONFIG = {
  OWNER: {
    label: 'Owner',
    icon: Crown,
    color: 'bg-[#41E661]/20 text-[#005143]',
    description: 'Full access to all features'
  },
  CHILD: {
    label: 'Child',
    icon: Baby,
    color: 'bg-blue-100 text-blue-700',
    description: 'Limited access, can complete assigned tasks'
  },
  MAID: {
    label: 'Maid',
    icon: Sparkles,
    color: 'bg-purple-100 text-purple-700',
    description: 'Access to cleaning tasks and rooms'
  },
  DRIVER: {
    label: 'Driver',
    icon: Car,
    color: 'bg-orange-100 text-orange-700',
    description: 'Access to driving tasks and transport bookings'
  }
};

const PERMISSION_LABELS = {
  canViewAllTasks: 'View all tasks',
  canViewAssignedTasks: 'View assigned tasks',
  canCreateTasks: 'Create tasks',
  canCompleteTasks: 'Complete tasks',
  canAssignTasks: 'Assign tasks to others',
  canViewBills: 'View bills & finances',
  canManageBills: 'Manage bills & finances',
  canViewAssets: 'View assets',
  canManageAssets: 'Manage assets',
  canViewBookings: 'View bookings',
  canCreateBookings: 'Create bookings',
  canViewAllBookings: 'View all bookings',
  canManageMembers: 'Manage home members',
  canViewRooms: 'View rooms',
  canManageRooms: 'Manage rooms'
};

export default function MemberManagement() {
  const {
    currentHome,
    membership,
    members,
    pendingInvites,
    isOwner,
    inviteMember,
    updateMemberPermissions,
    updateMemberRole,
    removeMember,
    getDefaultPermissions
  } = useHome();

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Invite form state
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('CHILD');

  // Edit form state
  const [editRole, setEditRole] = useState('');
  const [editPermissions, setEditPermissions] = useState({});

  function openEditModal(member) {
    setSelectedMember(member);
    setEditRole(member.role);
    setEditPermissions({ ...member.permissions });
    setShowEditModal(true);
    setError('');
  }

  async function handleInvite(e) {
    e.preventDefault();
    if (!inviteEmail.trim()) {
      setError('Please enter an email address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await inviteMember(inviteEmail.trim(), inviteRole);
      setSuccess(`Invitation sent to ${inviteEmail}`);
      setInviteEmail('');
      setInviteRole('CHILD');
      setTimeout(() => {
        setShowInviteModal(false);
        setSuccess('');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to send invitation');
    } finally {
      setLoading(false);
    }
  }

  async function handleSavePermissions() {
    if (!selectedMember) return;

    setLoading(true);
    setError('');

    try {
      // Update role if changed
      if (editRole !== selectedMember.role) {
        await updateMemberRole(selectedMember.id, editRole);
      }

      // Update permissions if changed
      const permissionsChanged = Object.keys(editPermissions).some(
        key => editPermissions[key] !== selectedMember.permissions[key]
      );

      if (permissionsChanged) {
        await updateMemberPermissions(selectedMember.id, editPermissions);
      }

      setSuccess('Member updated successfully');
      setTimeout(() => {
        setShowEditModal(false);
        setSelectedMember(null);
        setSuccess('');
      }, 1500);
    } catch (err) {
      setError(err.message || 'Failed to update member');
    } finally {
      setLoading(false);
    }
  }

  async function handleRemoveMember(member) {
    if (!confirm(`Are you sure you want to remove ${member.name} from the home?`)) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      await removeMember(member.id);
      setSuccess(`${member.name} has been removed`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to remove member');
    } finally {
      setLoading(false);
    }
  }

  function handleRoleChange(newRole) {
    setEditRole(newRole);
    // Apply default permissions for the new role
    setEditPermissions(getDefaultPermissions(newRole));
  }

  function togglePermission(permission) {
    setEditPermissions(prev => ({
      ...prev,
      [permission]: !prev[permission]
    }));
  }

  if (!currentHome) {
    return (
      <div className="p-6 text-center text-[#005143]/60">
        No home selected
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#005143]">Home Members</h2>
          <p className="text-[#005143]/60 text-sm mt-1">
            {members.length} of {currentHome.maxMembers || 10} members
          </p>
        </div>
        {isOwner && (
          <button
            onClick={() => {
              setShowInviteModal(true);
              setError('');
              setSuccess('');
            }}
            className="flex items-center gap-2 px-4 py-2 bg-[#41E661] text-[#005143] rounded-xl font-medium hover:bg-[#41E661]/90 transition-all"
          >
            <UserPlus className="w-5 h-5" />
            Invite Member
          </button>
        )}
      </div>

      {/* Messages */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
          {success}
        </div>
      )}

      {/* Members List */}
      <div className="space-y-3">
        {members.map((member) => {
          const roleConfig = ROLE_CONFIG[member.role];
          const RoleIcon = roleConfig?.icon || Users;
          const isCurrentUser = member.userId === membership?.userId;

          return (
            <div
              key={member.id}
              className="bg-white rounded-2xl p-4 border border-[#005143]/10 flex items-center gap-4"
            >
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-[#005143]/10 flex items-center justify-center flex-shrink-0">
                {member.avatar ? (
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-lg font-semibold text-[#005143]">
                    {member.name?.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-[#005143] truncate">
                    {member.name}
                  </h3>
                  {isCurrentUser && (
                    <span className="text-xs bg-[#005143]/10 text-[#005143] px-2 py-0.5 rounded-full">
                      You
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#005143]/60 truncate">{member.email}</p>
              </div>

              {/* Role Badge */}
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${roleConfig?.color}`}>
                <RoleIcon className="w-4 h-4" />
                <span className="text-sm font-medium">{roleConfig?.label}</span>
              </div>

              {/* Actions (only for owners, and not for self) */}
              {isOwner && !isCurrentUser && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(member)}
                    className="p-2 hover:bg-[#005143]/10 rounded-lg transition-all"
                    title="Edit permissions"
                  >
                    <Edit2 className="w-5 h-5 text-[#005143]" />
                  </button>
                  <button
                    onClick={() => handleRemoveMember(member)}
                    disabled={loading}
                    className="p-2 hover:bg-red-50 rounded-lg transition-all"
                    title="Remove member"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Pending Invites */}
      {isOwner && pendingInvites.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-[#005143] mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Pending Invitations ({pendingInvites.length})
          </h3>
          <div className="space-y-3">
            {pendingInvites.map((invite) => {
              const roleConfig = ROLE_CONFIG[invite.role];
              return (
                <div
                  key={invite.id}
                  className="bg-[#005143]/5 rounded-xl p-4 flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-[#005143]/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#005143]" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-[#005143]">{invite.email}</p>
                    <p className="text-sm text-[#005143]/60">
                      Expires {new Date(invite.expiresAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${roleConfig?.color}`}>
                    {roleConfig?.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#005143]">Invite Member</h3>
              <button
                onClick={() => setShowInviteModal(false)}
                className="p-2 hover:bg-[#005143]/10 rounded-lg"
              >
                <X className="w-5 h-5 text-[#005143]" />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm flex items-center gap-2">
                <Check className="w-5 h-5" />
                {success}
              </div>
            )}

            <form onSubmit={handleInvite} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#005143] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="member@example.com"
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#005143]/20 focus:border-[#005143] outline-none"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#005143] mb-2">
                  Role
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(ROLE_CONFIG).map(([role, config]) => {
                    const RoleIcon = config.icon;
                    return (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setInviteRole(role)}
                        disabled={role === 'OWNER' && members.filter(m => m.role === 'OWNER').length >= 3}
                        className={`p-3 rounded-xl border-2 text-left transition-all ${
                          inviteRole === role
                            ? 'border-[#005143] bg-[#005143]/5'
                            : 'border-[#005143]/20 hover:border-[#005143]/40'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <RoleIcon className="w-4 h-4 text-[#005143]" />
                          <span className="font-medium text-[#005143]">{config.label}</span>
                        </div>
                        <p className="text-xs text-[#005143]/60">{config.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !inviteEmail.trim()}
                className="w-full py-3 bg-[#005143] text-white rounded-xl font-medium hover:bg-[#005143]/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    Send Invitation
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Permissions Modal */}
      {showEditModal && selectedMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 my-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-[#005143]">Edit Member</h3>
                <p className="text-sm text-[#005143]/60">{selectedMember.name}</p>
              </div>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedMember(null);
                }}
                className="p-2 hover:bg-[#005143]/10 rounded-lg"
              >
                <X className="w-5 h-5 text-[#005143]" />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm flex items-center gap-2">
                <Check className="w-5 h-5" />
                {success}
              </div>
            )}

            <div className="space-y-6">
              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-[#005143] mb-2">
                  Role
                </label>
                <div className="relative">
                  <select
                    value={editRole}
                    onChange={(e) => handleRoleChange(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#005143]/20 focus:border-[#005143] outline-none appearance-none bg-white"
                    disabled={loading}
                  >
                    {Object.entries(ROLE_CONFIG).map(([role, config]) => (
                      <option
                        key={role}
                        value={role}
                        disabled={role === 'OWNER' && members.filter(m => m.role === 'OWNER').length >= 3 && selectedMember.role !== 'OWNER'}
                      >
                        {config.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#005143]/50 pointer-events-none" />
                </div>
              </div>

              {/* Permissions */}
              <div>
                <label className="block text-sm font-medium text-[#005143] mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Permissions
                </label>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {Object.entries(PERMISSION_LABELS).map(([permission, label]) => (
                    <label
                      key={permission}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#005143]/5 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={editPermissions[permission] || false}
                        onChange={() => togglePermission(permission)}
                        disabled={loading}
                        className="w-5 h-5 rounded border-2 border-[#005143]/30 text-[#005143] focus:ring-[#005143]"
                      />
                      <span className="text-[#005143]">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedMember(null);
                  }}
                  disabled={loading}
                  className="flex-1 py-3 border-2 border-[#005143]/20 text-[#005143] rounded-xl font-medium hover:bg-[#005143]/5 transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePermissions}
                  disabled={loading}
                  className="flex-1 py-3 bg-[#005143] text-white rounded-xl font-medium hover:bg-[#005143]/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Check className="w-5 h-5" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
