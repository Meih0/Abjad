/**
 * ENHANCED ASSETS PAGE - Example Implementation
 *
 * This file demonstrates how to apply all the enhancements to the Assets page.
 * Compare with Assets.js to see the improvements.
 *
 * Key Enhancements:
 * 1. PropTypes for type safety
 * 2. Custom hooks (useToast, useDebounce, useMediaQuery)
 * 3. Constants from centralized file
 * 4. Loading skeletons instead of basic loading
 * 5. Empty and error states
 * 6. Improved error handling with user-friendly messages
 * 7. Accessibility improvements (ARIA labels, keyboard navigation)
 * 8. Performance optimization with React.memo
 * 9. Form validation
 * 10. Better UX with toast notifications
 */

import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Plus, Camera, Calendar, Search, Filter } from 'lucide-react';

// UI Components
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// Custom Components
import ReceiptScanner from '@/components/ocr/ReceiptScanner';
import { SkeletonGrid } from '@/components/LoadingSkeleton';
import EmptyState from '@/components/EmptyState';
import ErrorState from '@/components/ErrorState';

// Custom Hooks
import { useToast } from '@/hooks/useToast';
import { useDebounce } from '@/hooks/useDebounce';
import { useBreakpoint } from '@/hooks/useMediaQuery';

// Utilities
import {
  ASSET_TYPE_ICONS,
  ASSET_STATUS_COLORS,
  SUCCESS_MESSAGES,
  ANIMATION_VARIANTS,
} from '@/utils/constants';
import { getWarrantyStatus, formatDate, parseApiError, calculateProgress } from '@/utils/helpers';

// Memoized Asset Card Component
const AssetCard = React.memo(({ asset, rooms, onClick }) => {
  const warrantyStatus = getWarrantyStatus(asset.warranty_expiry);
  const roomName = rooms.find(r => r.id === asset.room_id)?.name || 'Unassigned';

  return (
    <motion.div
      {...ANIMATION_VARIANTS.fadeIn}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className="cursor-pointer hover:shadow-md transition-shadow border-0 shadow-sm"
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && onClick()}
        aria-label={`View details for ${asset.name}`}
      >
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div
              className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center text-3xl shrink-0"
              aria-hidden="true"
            >
              {ASSET_TYPE_ICONS[asset.asset_type] || '📦'}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">{asset.name}</h3>
              <p className="text-sm text-gray-500 capitalize">
                {asset.asset_type?.replace('_', ' ')}
              </p>
              <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                <span aria-label="Location">📍</span> {roomName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4 flex-wrap">
            <Badge className={ASSET_STATUS_COLORS[asset.status]}>
              {asset.status?.replace('_', ' ')}
            </Badge>
            {warrantyStatus && (
              <Badge className={warrantyStatus.color}>
                Warranty: {warrantyStatus.label}
              </Badge>
            )}
          </div>

          {asset.next_maintenance_date && (
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <span>Next maintenance: {formatDate(asset.next_maintenance_date)}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
});

AssetCard.propTypes = {
  asset: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    asset_type: PropTypes.string.isRequired,
    room_id: PropTypes.string,
    status: PropTypes.string,
    warranty_expiry: PropTypes.string,
    next_maintenance_date: PropTypes.string,
  }).isRequired,
  rooms: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};

AssetCard.displayName = 'AssetCard';

// Main Assets Component
export default function AssetsEnhanced() {
  const [showScanner, setShowScanner] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { isMobile } = useBreakpoint();
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Fetch assets with error handling
  const {
    data: assets = [],
    isLoading: assetsLoading,
    error: assetsError,
    refetch: refetchAssets,
  } = useQuery({
    queryKey: ['assets'],
    queryFn: async () => {
      try {
        return await base44.entities.Asset.list('-created_date');
      } catch (error) {
        throw new Error(parseApiError(error));
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Fetch rooms
  const { data: rooms = [] } = useQuery({
    queryKey: ['rooms'],
    queryFn: () => base44.entities.Room.list(),
  });

  // Delete asset mutation (example)
  const deleteAssetMutation = useMutation({
    mutationFn: (assetId) => base44.entities.Asset.delete(assetId),
    onSuccess: () => {
      queryClient.invalidateQueries(['assets']);
      toast.success('Asset deleted successfully!');
      setSelectedAsset(null);
    },
    onError: (error) => {
      toast.error(parseApiError(error));
    },
  });

  // Handle asset creation with toast notification
  const handleAssetCreated = useCallback(() => {
    queryClient.invalidateQueries(['assets']);
    queryClient.invalidateQueries(['tasks']);
    setShowScanner(false);
    toast.success(SUCCESS_MESSAGES.ASSET_CREATED);
  }, [queryClient, toast]);

  // Filtered and searched assets (memoized for performance)
  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const matchesSearch =
        !debouncedSearch ||
        asset.name?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        asset.asset_type?.toLowerCase().includes(debouncedSearch.toLowerCase());

      const matchesFilter = statusFilter === 'all' || asset.status === statusFilter;

      return matchesSearch && matchesFilter;
    });
  }, [assets, debouncedSearch, statusFilter]);

  // Calculate stats (memoized)
  const stats = useMemo(() => {
    const totalValue = assets.reduce((sum, a) => sum + (a.purchase_amount || 0), 0);
    const needsMaintenance = assets.filter((a) => a.status === 'needs_maintenance').length;
    const expiringWarranties = assets.filter((a) => {
      if (!a.warranty_expiry) return false;
      const status = getWarrantyStatus(a.warranty_expiry);
      return status && status.label !== 'Expired' && status.label !== 'Active';
    }).length;

    return { totalValue, needsMaintenance, expiringWarranties };
  }, [assets]);

  // Handle keyboard shortcuts
  React.useEffect(() => {
    const handleKeyPress = (e) => {
      // Cmd/Ctrl + K to open scanner
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowScanner(true);
      }
      // Escape to close modals
      if (e.key === 'Escape') {
        setShowScanner(false);
        setSelectedAsset(null);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Loading state with skeleton
  if (assetsLoading) {
    return (
      <div className="min-h-screen bg-[#FEF5E8]">
        <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-30 shadow-sm">
          <div className="max-w-6xl mx-auto px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-[#005143] rounded-2xl flex items-center justify-center shadow-lg">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Assets</h1>
                <p className="text-sm text-gray-500 font-medium">Loading...</p>
              </div>
            </div>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-5 py-6">
          <SkeletonGrid count={6} columns={3} />
        </main>
      </div>
    );
  }

  // Error state
  if (assetsError) {
    return (
      <div className="min-h-screen bg-[#FEF5E8] flex items-center justify-center p-4">
        <ErrorState
          error={assetsError}
          onRetry={refetchAssets}
          title="Failed to load assets"
          showDetails={true}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FEF5E8]">
      {/* Header */}
      <header
        className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-30 shadow-sm"
        role="banner"
      >
        <div className="max-w-6xl mx-auto px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 bg-[#005143] rounded-2xl flex items-center justify-center shadow-lg"
                aria-hidden="true"
              >
                <Package className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Assets</h1>
                <p className="text-sm text-gray-500 font-medium">
                  {assets.length} registered item{assets.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>

            <Button
              className="bg-gray-900 hover:bg-gray-800"
              onClick={() => setShowScanner(true)}
              aria-label="Scan receipt to add new asset"
            >
              <Camera className="h-4 w-4 mr-2" aria-hidden="true" />
              Scan Receipt
            </Button>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-500">Total Value</p>
              <p className="text-2xl font-bold text-gray-900" aria-label={`Total value: ${stats.totalValue} dollars`}>
                ${stats.totalValue.toLocaleString()}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Needs Maintenance</p>
              <p className="text-2xl font-bold text-amber-600" aria-label={`${stats.needsMaintenance} assets need maintenance`}>
                {stats.needsMaintenance}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Expiring Warranties</p>
              <p className="text-2xl font-bold text-red-600" aria-label={`${stats.expiringWarranties} warranties expiring soon`}>
                {stats.expiringWarranties}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-5 py-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
                aria-hidden="true"
              />
              <Input
                placeholder="Search assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                aria-label="Search assets"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              aria-label="Filter by status"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="needs_maintenance">Needs Maintenance</option>
              <option value="under_repair">Under Repair</option>
              <option value="replaced">Replaced</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-5 py-6" role="main">
        {filteredAssets.length === 0 ? (
          <EmptyState
            icon={assets.length === 0 ? Package : Search}
            title={assets.length === 0 ? 'No Assets Yet' : 'No matching assets'}
            description={
              assets.length === 0
                ? 'Start by scanning a receipt to automatically register your appliances and set up maintenance schedules.'
                : 'Try adjusting your search or filter criteria.'
            }
            actionLabel={assets.length === 0 ? 'Scan Your First Receipt' : 'Clear Filters'}
            onAction={() => {
              if (assets.length === 0) {
                setShowScanner(true);
              } else {
                setSearchQuery('');
                setStatusFilter('all');
              }
            }}
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {filteredAssets.map((asset) => (
                <AssetCard
                  key={asset.id}
                  asset={asset}
                  rooms={rooms}
                  onClick={() => setSelectedAsset(asset)}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* Scanner Dialog */}
      <Dialog open={showScanner} onOpenChange={setShowScanner}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Asset</DialogTitle>
          </DialogHeader>
          <ReceiptScanner
            rooms={rooms}
            onAssetCreated={handleAssetCreated}
            onClose={() => setShowScanner(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Asset Detail Dialog */}
      <Dialog open={!!selectedAsset} onOpenChange={() => setSelectedAsset(null)}>
        <DialogContent className="sm:max-w-md">
          {selectedAsset && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                    {ASSET_TYPE_ICONS[selectedAsset.asset_type] || '📦'}
                  </div>
                  <div>
                    <DialogTitle>{selectedAsset.name}</DialogTitle>
                    <p className="text-sm text-gray-500 capitalize">
                      {selectedAsset.asset_type?.replace('_', ' ')}
                    </p>
                  </div>
                </div>
              </DialogHeader>
              {/* Add full asset details here */}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
