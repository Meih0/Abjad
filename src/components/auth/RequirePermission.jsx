import React from 'react';
import { useHome } from '../../contexts/HomeContext';
import { Lock } from 'lucide-react';

/**
 * RequirePermission - Conditionally render children based on user permissions
 *
 * Usage:
 * <RequirePermission permission="canViewBills">
 *   <BillsSection />
 * </RequirePermission>
 *
 * With custom fallback:
 * <RequirePermission permission="canManageMembers" fallback={<p>Access denied</p>}>
 *   <MemberManagement />
 * </RequirePermission>
 *
 * Multiple permissions (all required):
 * <RequirePermission permissions={["canViewTasks", "canCreateTasks"]}>
 *   <TaskCreator />
 * </RequirePermission>
 *
 * Any of multiple permissions:
 * <RequirePermission permissions={["canViewAllTasks", "canViewAssignedTasks"]} requireAll={false}>
 *   <TaskList />
 * </RequirePermission>
 */
export default function RequirePermission({
  permission,
  permissions = [],
  requireAll = true,
  fallback = null,
  showLocked = false,
  children
}) {
  const { hasPermission, isOwner, hasHome } = useHome();

  // If no home, don't show anything
  if (!hasHome) {
    return fallback;
  }

  // Owners always have access
  if (isOwner) {
    return children;
  }

  // Check single permission
  if (permission) {
    if (hasPermission(permission)) {
      return children;
    }
    return showLocked ? <LockedContent /> : fallback;
  }

  // Check multiple permissions
  if (permissions.length > 0) {
    const hasAccess = requireAll
      ? permissions.every(p => hasPermission(p))
      : permissions.some(p => hasPermission(p));

    if (hasAccess) {
      return children;
    }
    return showLocked ? <LockedContent /> : fallback;
  }

  // No permissions specified, show children
  return children;
}

/**
 * Default locked content component
 */
function LockedContent() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="w-16 h-16 bg-[#005143]/10 rounded-full flex items-center justify-center mb-4">
        <Lock className="w-8 h-8 text-[#005143]/50" />
      </div>
      <h3 className="text-lg font-semibold text-[#005143]/70 mb-2">
        Access Restricted
      </h3>
      <p className="text-sm text-[#005143]/50 max-w-xs">
        You don't have permission to view this content. Contact a home owner if you need access.
      </p>
    </div>
  );
}

/**
 * Hook version for more complex conditional logic
 */
export function usePermission(permission) {
  const { hasPermission, isOwner } = useHome();
  return isOwner || hasPermission(permission);
}

/**
 * HOC version for wrapping entire components
 */
export function withPermission(WrappedComponent, permission, FallbackComponent = null) {
  return function PermissionWrapper(props) {
    return (
      <RequirePermission permission={permission} fallback={FallbackComponent ? <FallbackComponent {...props} /> : null}>
        <WrappedComponent {...props} />
      </RequirePermission>
    );
  };
}
