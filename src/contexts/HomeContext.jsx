import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { generateClient } from 'aws-amplify/api';
import { useAuth } from './AuthContext';

// Lazy initialize client to ensure Amplify is configured first
let client = null;
function getClient() {
  if (!client) {
    client = generateClient();
  }
  return client;
}

const HomeContext = createContext();

export function useHome() {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error('useHome must be used within HomeProvider');
  }
  return context;
}

// Default permissions by role
const DEFAULT_PERMISSIONS = {
  OWNER: {
    canViewAllTasks: true,
    canViewAssignedTasks: true,
    canCreateTasks: true,
    canCompleteTasks: true,
    canAssignTasks: true,
    canViewBills: true,
    canManageBills: true,
    canViewAssets: true,
    canManageAssets: true,
    canViewBookings: true,
    canCreateBookings: true,
    canViewAllBookings: true,
    canManageMembers: true,
    canViewRooms: true,
    canManageRooms: true
  },
  CHILD: {
    canViewAllTasks: false,
    canViewAssignedTasks: true,
    canCreateTasks: false,
    canCompleteTasks: true,
    canAssignTasks: false,
    canViewBills: false,
    canManageBills: false,
    canViewAssets: true,
    canManageAssets: false,
    canViewBookings: true,
    canCreateBookings: false,
    canViewAllBookings: false,
    canManageMembers: false,
    canViewRooms: true,
    canManageRooms: false
  },
  MAID: {
    canViewAllTasks: false,
    canViewAssignedTasks: true,
    canCreateTasks: false,
    canCompleteTasks: true,
    canAssignTasks: false,
    canViewBills: false,
    canManageBills: false,
    canViewAssets: true,
    canManageAssets: false,
    canViewBookings: false,
    canCreateBookings: false,
    canViewAllBookings: false,
    canManageMembers: false,
    canViewRooms: true,
    canManageRooms: false
  },
  DRIVER: {
    canViewAllTasks: false,
    canViewAssignedTasks: true,
    canCreateTasks: false,
    canCompleteTasks: true,
    canAssignTasks: false,
    canViewBills: false,
    canManageBills: false,
    canViewAssets: false,
    canManageAssets: false,
    canViewBookings: true,
    canCreateBookings: false,
    canViewAllBookings: false,
    canManageMembers: false,
    canViewRooms: false,
    canManageRooms: false
  }
};

// GraphQL Queries
const listHomeMembersByUser = /* GraphQL */ `
  query ListHomeMembersByUser($userId: ID!) {
    homeMembersByUserId(userId: $userId, filter: { status: { eq: ACTIVE } }) {
      items {
        id
        homeId
        userId
        cognitoUsername
        email
        name
        nameAr
        phone
        avatar
        role
        permissions {
          canViewAllTasks
          canViewAssignedTasks
          canCreateTasks
          canCompleteTasks
          canAssignTasks
          canViewBills
          canManageBills
          canViewAssets
          canManageAssets
          canViewBookings
          canCreateBookings
          canViewAllBookings
          canManageMembers
          canViewRooms
          canManageRooms
        }
        homeOwners
        status
        createdAt
      }
    }
  }
`;

const getHomeQuery = /* GraphQL */ `
  query GetHome($id: ID!) {
    getHome(id: $id) {
      id
      name
      nameAr
      owners
      inviteCode
      inviteCodeExpiry
      maxMembers
      createdBy
      createdAt
      updatedAt
    }
  }
`;

const listHomeMembersByHome = /* GraphQL */ `
  query ListHomeMembersByHome($homeId: ID!) {
    homeMembersByHomeId(homeId: $homeId) {
      items {
        id
        homeId
        userId
        cognitoUsername
        email
        name
        nameAr
        phone
        avatar
        role
        permissions {
          canViewAllTasks
          canViewAssignedTasks
          canCreateTasks
          canCompleteTasks
          canAssignTasks
          canViewBills
          canManageBills
          canViewAssets
          canManageAssets
          canViewBookings
          canCreateBookings
          canViewAllBookings
          canManageMembers
          canViewRooms
          canManageRooms
        }
        status
        invitedAt
        acceptedAt
        createdAt
      }
    }
  }
`;

const createHomeMutation = /* GraphQL */ `
  mutation CreateHome($input: CreateHomeInput!) {
    createHome(input: $input) {
      id
      name
      nameAr
      owners
      inviteCode
      maxMembers
      createdBy
      createdAt
    }
  }
`;

const createHomeMemberMutation = /* GraphQL */ `
  mutation CreateHomeMember($input: CreateHomeMemberInput!) {
    createHomeMember(input: $input) {
      id
      homeId
      userId
      cognitoUsername
      email
      name
      role
      permissions {
        canViewAllTasks
        canViewAssignedTasks
        canCreateTasks
        canCompleteTasks
        canAssignTasks
        canViewBills
        canManageBills
        canViewAssets
        canManageAssets
        canViewBookings
        canCreateBookings
        canViewAllBookings
        canManageMembers
        canViewRooms
        canManageRooms
      }
      status
      createdAt
    }
  }
`;

const updateHomeMemberMutation = /* GraphQL */ `
  mutation UpdateHomeMember($input: UpdateHomeMemberInput!) {
    updateHomeMember(input: $input) {
      id
      role
      permissions {
        canViewAllTasks
        canViewAssignedTasks
        canCreateTasks
        canCompleteTasks
        canAssignTasks
        canViewBills
        canManageBills
        canViewAssets
        canManageAssets
        canViewBookings
        canCreateBookings
        canViewAllBookings
        canManageMembers
        canViewRooms
        canManageRooms
      }
      status
      updatedAt
    }
  }
`;

const deleteHomeMemberMutation = /* GraphQL */ `
  mutation DeleteHomeMember($input: DeleteHomeMemberInput!) {
    deleteHomeMember(input: $input) {
      id
    }
  }
`;

const createHomeInviteMutation = /* GraphQL */ `
  mutation CreateHomeInvite($input: CreateHomeInviteInput!) {
    createHomeInvite(input: $input) {
      id
      homeId
      homeName
      email
      role
      status
      expiresAt
      createdAt
    }
  }
`;

const listHomeInvitesByEmail = /* GraphQL */ `
  query ListHomeInvitesByEmail($email: String!) {
    homeInvitesByEmail(email: $email, filter: { status: { eq: PENDING } }) {
      items {
        id
        homeId
        homeName
        email
        role
        invitedByName
        status
        expiresAt
        customPermissions
        createdAt
      }
    }
  }
`;

const updateHomeInviteMutation = /* GraphQL */ `
  mutation UpdateHomeInvite($input: UpdateHomeInviteInput!) {
    updateHomeInvite(input: $input) {
      id
      status
      updatedAt
    }
  }
`;

const listHomeInvitesByHome = /* GraphQL */ `
  query ListHomeInvitesByHome($homeId: ID!) {
    homeInvitesByHomeId(homeId: $homeId) {
      items {
        id
        homeId
        homeName
        email
        role
        invitedByName
        status
        expiresAt
        createdAt
      }
    }
  }
`;

// Generate a random invite code
function generateInviteCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export function HomeProvider({ children }) {
  const { user, isAuthenticated } = useAuth();
  const [currentHome, setCurrentHome] = useState(null);
  const [membership, setMembership] = useState(null);
  const [members, setMembers] = useState([]);
  const [pendingInvites, setPendingInvites] = useState([]);
  const [userInvites, setUserInvites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load home data when user authenticates
  const loadHomeData = useCallback(async () => {
    if (!user?.userId) {
      setCurrentHome(null);
      setMembership(null);
      setMembers([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Find user's home membership
      const memberResult = await getClient().graphql({
        query: listHomeMembersByUser,
        variables: { userId: user.userId }
      });

      const memberships = memberResult.data.homeMembersByUserId?.items || [];

      if (memberships.length === 0) {
        // User has no home, check for pending invites
        const inviteResult = await getClient().graphql({
          query: listHomeInvitesByEmail,
          variables: { email: user.email }
        });
        setUserInvites(inviteResult.data.homeInvitesByEmail?.items || []);
        setCurrentHome(null);
        setMembership(null);
        setMembers([]);
        setLoading(false);
        return;
      }

      // Get the first active membership (user can only be in one home for now)
      const activeMembership = memberships[0];
      setMembership(activeMembership);

      // Load the home details
      const homeResult = await getClient().graphql({
        query: getHomeQuery,
        variables: { id: activeMembership.homeId }
      });
      setCurrentHome(homeResult.data.getHome);

      // If user is an owner, load all members and pending invites
      if (activeMembership.role === 'OWNER') {
        const membersResult = await getClient().graphql({
          query: listHomeMembersByHome,
          variables: { homeId: activeMembership.homeId }
        });
        setMembers(membersResult.data.homeMembersByHomeId?.items || []);

        const invitesResult = await getClient().graphql({
          query: listHomeInvitesByHome,
          variables: { homeId: activeMembership.homeId }
        });
        setPendingInvites(
          (invitesResult.data.homeInvitesByHomeId?.items || [])
            .filter(invite => invite.status === 'PENDING')
        );
      }

    } catch (err) {
      console.error('Error loading home data:', err);
      setError(err.message || 'Failed to load home data');
    } finally {
      setLoading(false);
    }
  }, [user?.userId, user?.email]);

  useEffect(() => {
    if (isAuthenticated && user) {
      loadHomeData();
    } else {
      setCurrentHome(null);
      setMembership(null);
      setMembers([]);
      setPendingInvites([]);
      setUserInvites([]);
      setLoading(false);
    }
  }, [isAuthenticated, user, loadHomeData]);

  // Create a new home
  async function createHome(homeName, homeNameAr = null) {
    if (!user) throw new Error('Must be logged in to create a home');

    try {
      const inviteCode = generateInviteCode();
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 7); // Invite code valid for 7 days

      // Create the home
      const homeResult = await getClient().graphql({
        query: createHomeMutation,
        variables: {
          input: {
            name: homeName,
            nameAr: homeNameAr,
            owners: [user.username],
            inviteCode,
            inviteCodeExpiry: expiryDate.toISOString(),
            maxMembers: 10,
            createdBy: user.userId
          }
        }
      });

      const newHome = homeResult.data.createHome;

      // Create the owner membership
      const memberResult = await getClient().graphql({
        query: createHomeMemberMutation,
        variables: {
          input: {
            homeId: newHome.id,
            userId: user.userId,
            cognitoUsername: user.username,
            email: user.email,
            name: user.name,
            role: 'OWNER',
            permissions: DEFAULT_PERMISSIONS.OWNER,
            homeOwners: [user.username],
            status: 'ACTIVE',
            acceptedAt: new Date().toISOString()
          }
        }
      });

      setCurrentHome(newHome);
      setMembership(memberResult.data.createHomeMember);
      setMembers([memberResult.data.createHomeMember]);

      return newHome;
    } catch (err) {
      console.error('Error creating home:', err);
      throw new Error(err.message || 'Failed to create home');
    }
  }

  // Invite a member to the home
  async function inviteMember(email, role, customPermissions = null) {
    if (!currentHome) throw new Error('No home selected');
    if (!membership || membership.role !== 'OWNER') {
      throw new Error('Only owners can invite members');
    }

    // Check member limit
    if (members.length >= (currentHome.maxMembers || 10)) {
      throw new Error('Home has reached maximum member limit');
    }

    // Check owner limit for OWNER role
    if (role === 'OWNER') {
      const ownerCount = members.filter(m => m.role === 'OWNER').length;
      if (ownerCount >= 3) {
        throw new Error('Home can have maximum 3 owners');
      }
    }

    try {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 7); // Invite valid for 7 days

      const result = await getClient().graphql({
        query: createHomeInviteMutation,
        variables: {
          input: {
            homeId: currentHome.id,
            homeName: currentHome.name,
            email: email.toLowerCase(),
            role,
            homeOwners: currentHome.owners,
            invitedBy: user.userId,
            invitedByName: user.name,
            status: 'PENDING',
            expiresAt: expiryDate.toISOString(),
            customPermissions: customPermissions ? JSON.stringify(customPermissions) : null
          }
        }
      });

      const newInvite = result.data.createHomeInvite;
      setPendingInvites(prev => [...prev, newInvite]);

      return newInvite;
    } catch (err) {
      console.error('Error inviting member:', err);
      throw new Error(err.message || 'Failed to send invitation');
    }
  }

  // Accept an invitation
  async function acceptInvite(inviteId) {
    if (!user) throw new Error('Must be logged in to accept invitation');

    const invite = userInvites.find(inv => inv.id === inviteId);
    if (!invite) throw new Error('Invitation not found');

    if (new Date(invite.expiresAt) < new Date()) {
      throw new Error('Invitation has expired');
    }

    try {
      // Get the home to get current owners list
      const homeResult = await getClient().graphql({
        query: getHomeQuery,
        variables: { id: invite.homeId }
      });
      const home = homeResult.data.getHome;

      // Parse custom permissions if provided
      let permissions = DEFAULT_PERMISSIONS[invite.role];
      if (invite.customPermissions) {
        try {
          permissions = { ...permissions, ...JSON.parse(invite.customPermissions) };
        } catch (e) {
          console.warn('Failed to parse custom permissions:', e);
        }
      }

      // Create membership
      const memberResult = await getClient().graphql({
        query: createHomeMemberMutation,
        variables: {
          input: {
            homeId: invite.homeId,
            userId: user.userId,
            cognitoUsername: user.username,
            email: user.email,
            name: user.name,
            role: invite.role,
            permissions,
            homeOwners: home.owners,
            status: 'ACTIVE',
            invitedAt: invite.createdAt,
            acceptedAt: new Date().toISOString()
          }
        }
      });

      // Update invite status
      await getClient().graphql({
        query: updateHomeInviteMutation,
        variables: {
          input: {
            id: inviteId,
            status: 'ACCEPTED'
          }
        }
      });

      // Reload home data
      await loadHomeData();

      return memberResult.data.createHomeMember;
    } catch (err) {
      console.error('Error accepting invitation:', err);
      throw new Error(err.message || 'Failed to accept invitation');
    }
  }

  // Decline an invitation
  async function declineInvite(inviteId) {
    try {
      await getClient().graphql({
        query: updateHomeInviteMutation,
        variables: {
          input: {
            id: inviteId,
            status: 'CANCELLED'
          }
        }
      });

      setUserInvites(prev => prev.filter(inv => inv.id !== inviteId));
    } catch (err) {
      console.error('Error declining invitation:', err);
      throw new Error(err.message || 'Failed to decline invitation');
    }
  }

  // Update member permissions
  async function updateMemberPermissions(memberId, newPermissions) {
    if (!membership || membership.role !== 'OWNER') {
      throw new Error('Only owners can update permissions');
    }

    try {
      const result = await getClient().graphql({
        query: updateHomeMemberMutation,
        variables: {
          input: {
            id: memberId,
            permissions: newPermissions
          }
        }
      });

      // Update local state
      setMembers(prev => prev.map(m =>
        m.id === memberId
          ? { ...m, permissions: result.data.updateHomeMember.permissions }
          : m
      ));

      return result.data.updateHomeMember;
    } catch (err) {
      console.error('Error updating permissions:', err);
      throw new Error(err.message || 'Failed to update permissions');
    }
  }

  // Update member role
  async function updateMemberRole(memberId, newRole) {
    if (!membership || membership.role !== 'OWNER') {
      throw new Error('Only owners can update roles');
    }

    // Check owner limit
    if (newRole === 'OWNER') {
      const ownerCount = members.filter(m => m.role === 'OWNER').length;
      if (ownerCount >= 3) {
        throw new Error('Home can have maximum 3 owners');
      }
    }

    try {
      const result = await getClient().graphql({
        query: updateHomeMemberMutation,
        variables: {
          input: {
            id: memberId,
            role: newRole,
            permissions: DEFAULT_PERMISSIONS[newRole]
          }
        }
      });

      // Update local state
      setMembers(prev => prev.map(m =>
        m.id === memberId
          ? { ...m, role: newRole, permissions: result.data.updateHomeMember.permissions }
          : m
      ));

      return result.data.updateHomeMember;
    } catch (err) {
      console.error('Error updating role:', err);
      throw new Error(err.message || 'Failed to update role');
    }
  }

  // Remove a member from the home
  async function removeMember(memberId) {
    if (!membership || membership.role !== 'OWNER') {
      throw new Error('Only owners can remove members');
    }

    const memberToRemove = members.find(m => m.id === memberId);
    if (!memberToRemove) throw new Error('Member not found');

    // Cannot remove yourself if you're the only owner
    if (memberToRemove.role === 'OWNER') {
      const ownerCount = members.filter(m => m.role === 'OWNER').length;
      if (ownerCount <= 1) {
        throw new Error('Cannot remove the only owner. Transfer ownership first.');
      }
    }

    try {
      await getClient().graphql({
        query: deleteHomeMemberMutation,
        variables: {
          input: { id: memberId }
        }
      });

      setMembers(prev => prev.filter(m => m.id !== memberId));
    } catch (err) {
      console.error('Error removing member:', err);
      throw new Error(err.message || 'Failed to remove member');
    }
  }

  // Leave the home
  async function leaveHome() {
    if (!membership) throw new Error('Not a member of any home');

    // Cannot leave if you're the only owner
    if (membership.role === 'OWNER') {
      const ownerCount = members.filter(m => m.role === 'OWNER').length;
      if (ownerCount <= 1) {
        throw new Error('Cannot leave as the only owner. Transfer ownership first.');
      }
    }

    try {
      await getClient().graphql({
        query: deleteHomeMemberMutation,
        variables: {
          input: { id: membership.id }
        }
      });

      setCurrentHome(null);
      setMembership(null);
      setMembers([]);
      setPendingInvites([]);
    } catch (err) {
      console.error('Error leaving home:', err);
      throw new Error(err.message || 'Failed to leave home');
    }
  }

  // Check if user has a specific permission
  function hasPermission(permission) {
    if (!membership?.permissions) return false;
    return membership.permissions[permission] === true;
  }

  // Get default permissions for a role
  function getDefaultPermissions(role) {
    return DEFAULT_PERMISSIONS[role] || DEFAULT_PERMISSIONS.CHILD;
  }

  // Refresh home data
  async function refreshHomeData() {
    await loadHomeData();
  }

  const value = {
    // State
    currentHome,
    membership,
    members,
    pendingInvites,
    userInvites,
    loading,
    error,

    // Computed
    isOwner: membership?.role === 'OWNER',
    isHomeLoaded: !!currentHome,
    hasHome: !!membership,
    homeId: currentHome?.id,
    homeOwners: currentHome?.owners || [],

    // Functions
    createHome,
    inviteMember,
    acceptInvite,
    declineInvite,
    updateMemberPermissions,
    updateMemberRole,
    removeMember,
    leaveHome,
    hasPermission,
    getDefaultPermissions,
    refreshHomeData,

    // Constants
    DEFAULT_PERMISSIONS
  };

  return (
    <HomeContext.Provider value={value}>
      {children}
    </HomeContext.Provider>
  );
}

export { DEFAULT_PERMISSIONS };
