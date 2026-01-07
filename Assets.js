import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Plus, Camera, AlertCircle, Calendar, DollarSign, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { format, isPast, isFuture, differenceInDays } from 'date-fns';
import ReceiptScanner from '@/components/ocr/ReceiptScanner';

const ASSET_TYPE_ICONS = {
  ac: '❄️',
  fridge: '🧊',
  washing_machine: '🧺',
  dryer: '🌀',
  dishwasher: '🍽️',
  oven: '🔥',
  microwave: '📡',
  water_heater: '🚿',
  hvac: '🌡️',
  furniture: '🛋️',
  electronics: '📺',
  other: '📦'
};

const STATUS_COLORS = {
  active: 'bg-green-100 text-green-700',
  needs_maintenance: 'bg-amber-100 text-amber-700',
  under_repair: 'bg-blue-100 text-blue-700',
  replaced: 'bg-gray-100 text-gray-500'
};

export default function Assets() {
  const [showScanner, setShowScanner] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const queryClient = useQueryClient();

  const { data: assets = [], isLoading } = useQuery({
    queryKey: ['assets'],
    queryFn: () => base44.entities.Asset.list('-created_date')
  });

  const { data: rooms = [] } = useQuery({
    queryKey: ['rooms'],
    queryFn: () => base44.entities.Room.list()
  });

  const handleAssetCreated = () => {
    queryClient.invalidateQueries(['assets']);
    queryClient.invalidateQueries(['tasks']);
    setShowScanner(false);
  };

  const getRoomName = (roomId) => {
    const room = rooms.find(r => r.id === roomId);
    return room?.name || 'Unassigned';
  };

  const getWarrantyStatus = (expiryDate) => {
    if (!expiryDate) return null;
    const expiry = new Date(expiryDate);
    const daysLeft = differenceInDays(expiry, new Date());
    
    if (isPast(expiry)) {
      return { label: 'Expired', color: 'bg-red-100 text-red-700' };
    } else if (daysLeft <= 30) {
      return { label: `${daysLeft} days left`, color: 'bg-amber-100 text-amber-700' };
    } else {
      return { label: 'Active', color: 'bg-green-100 text-green-700' };
    }
  };

  // Stats
  const totalValue = assets.reduce((sum, a) => sum + (a.purchase_amount || 0), 0);
  const needsMaintenance = assets.filter(a => a.status === 'needs_maintenance').length;
  const expiringWarranties = assets.filter(a => {
    if (!a.warranty_expiry) return false;
    const daysLeft = differenceInDays(new Date(a.warranty_expiry), new Date());
    return daysLeft > 0 && daysLeft <= 30;
  }).length;

  return (
    <div className="min-h-screen bg-[#FEF5E8]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-[#005143] rounded-2xl flex items-center justify-center shadow-lg">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Assets</h1>
                <p className="text-sm text-gray-500 font-medium">{assets.length} registered items</p>
              </div>
            </div>

            <Button 
              className="bg-gray-900 hover:bg-gray-800"
              onClick={() => setShowScanner(true)}
            >
              <Camera className="h-4 w-4 mr-2" />
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
              <p className="text-2xl font-bold text-gray-900">${totalValue.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Needs Maintenance</p>
              <p className="text-2xl font-bold text-amber-600">{needsMaintenance}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Expiring Warranties</p>
              <p className="text-2xl font-bold text-red-600">{expiringWarranties}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-5 py-6">
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-xl p-4 animate-pulse">
                <div className="h-12 w-12 bg-gray-100 rounded-xl mb-3" />
                <div className="h-4 w-32 bg-gray-100 rounded mb-2" />
                <div className="h-3 w-24 bg-gray-100 rounded" />
              </div>
            ))}
          </div>
        ) : assets.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-12 text-center"
          >
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Package className="h-10 w-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Assets Yet</h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Start by scanning a receipt to automatically register your appliances and set up maintenance schedules.
            </p>
            <Button 
              size="lg"
              className="bg-gray-900 hover:bg-gray-800"
              onClick={() => setShowScanner(true)}
            >
              <Camera className="h-5 w-5 mr-2" />
              Scan Your First Receipt
            </Button>
          </motion.div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {assets.map((asset, index) => {
                const warrantyStatus = getWarrantyStatus(asset.warranty_expiry);
                return (
                  <motion.div
                    key={asset.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedAsset(asset)}
                  >
                    <Card className="cursor-pointer hover:shadow-md transition-shadow border-0 shadow-sm">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center text-3xl shrink-0">
                            {ASSET_TYPE_ICONS[asset.asset_type] || '📦'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 truncate">{asset.name}</h3>
                            <p className="text-sm text-gray-500 capitalize">
                              {asset.asset_type?.replace('_', ' ')}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              📍 {getRoomName(asset.room_id)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mt-4 flex-wrap">
                          <Badge className={STATUS_COLORS[asset.status]}>
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
                            <Calendar className="h-4 w-4" />
                            Next maintenance: {format(new Date(asset.next_maintenance_date), 'MMM d, yyyy')}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
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

              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="font-medium">{getRoomName(selectedAsset.room_id)}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Purchase Date</p>
                    <p className="font-medium">
                      {selectedAsset.purchase_date 
                        ? format(new Date(selectedAsset.purchase_date), 'MMM d, yyyy')
                        : 'N/A'}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Purchase Amount</p>
                    <p className="font-medium">
                      {selectedAsset.purchase_amount 
                        ? `$${selectedAsset.purchase_amount.toLocaleString()}`
                        : 'N/A'}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Vendor</p>
                    <p className="font-medium">{selectedAsset.vendor || 'N/A'}</p>
                  </div>
                </div>

                {(selectedAsset.model_number || selectedAsset.serial_number) && (
                  <div className="border-t border-gray-100 pt-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Product Info</h4>
                    <div className="space-y-2 text-sm">
                      {selectedAsset.model_number && (
                        <p className="text-gray-600">Model: {selectedAsset.model_number}</p>
                      )}
                      {selectedAsset.serial_number && (
                        <p className="text-gray-600">Serial: {selectedAsset.serial_number}</p>
                      )}
                    </div>
                  </div>
                )}

                {selectedAsset.warranty_expiry && (
                  <div className="border-t border-gray-100 pt-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Warranty</h4>
                    <div className="flex items-center gap-2">
                      {(() => {
                        const status = getWarrantyStatus(selectedAsset.warranty_expiry);
                        return status && (
                          <Badge className={status.color}>{status.label}</Badge>
                        );
                      })()}
                      <span className="text-sm text-gray-600">
                        Expires {format(new Date(selectedAsset.warranty_expiry), 'MMM d, yyyy')}
                      </span>
                    </div>
                  </div>
                )}

                {selectedAsset.receipt_url && (
                  <Button variant="outline" className="w-full" asChild>
                    <a href={selectedAsset.receipt_url} target="_blank" rel="noopener noreferrer">
                      View Receipt
                    </a>
                  </Button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}