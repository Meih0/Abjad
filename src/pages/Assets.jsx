import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Camera, Calendar, DollarSign, AlertCircle, CheckCircle, Upload, X, Zap, Droplet, Wind, Tv } from 'lucide-react';

// Hawaz Brand Colors
const COLORS = {
  growth: '#005143',
  innovation: '#41E661',
  clarity: '#FEF5E8',
  depth: '#121B22',
  strategy: '#F47D42'
};

// Simulated OCR extraction (in real app, this would call backend API with Tesseract/AWS Textract)
const simulateOCR = (file) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate extracted data
      const mockData = {
        item_name: 'Samsung AC 1.5 Ton',
        purchase_date: '2024-01-15',
        total_amount: 4500,
        vendor: 'Extra Stores Riyadh',
        warranty_months: 24,
        category: 'ac' // auto-detect category for maintenance scheduling
      };
      resolve(mockData);
    }, 2500);
  });
};

const ASSET_CATEGORIES = {
  ac: { icon: Wind, maintenanceInterval: 90, color: COLORS.growth, name: 'Air Conditioning' },
  fridge: { icon: Droplet, maintenanceInterval: 180, color: '#3B82F6', name: 'Refrigerator' },
  washing_machine: { icon: Droplet, maintenanceInterval: 90, color: '#8B5CF6', name: 'Washing Machine' },
  tv: { icon: Tv, maintenanceInterval: 365, color: COLORS.strategy, name: 'Television' },
  other: { icon: Package, maintenanceInterval: 180, color: '#6B7280', name: 'Other' }
};

function ReceiptScanner({ onScanComplete, onClose }) {
  const [scanning, setScanning] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);

    // Simulate OCR processing
    setScanning(true);
    const extractedData = await simulateOCR(file);
    setScanning(false);

    // Auto-create maintenance schedule
    if (extractedData.category === 'ac' || extractedData.category === 'fridge') {
      extractedData.nextMaintenance = new Date(
        Date.now() + ASSET_CATEGORIES[extractedData.category].maintenanceInterval * 24 * 60 * 60 * 1000
      ).toISOString().split('T')[0];
    }

    onScanComplete(extractedData);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: COLORS.innovation }}>
                  <Camera className="w-6 h-6" style={{ color: COLORS.growth }} />
                </div>
                <div>
                  <h2 className="text-xl font-bold" style={{ color: COLORS.depth }}>Scan Receipt</h2>
                  <p className="text-sm text-gray-500">Extract data automatically</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {!preview ? (
              <label className="block">
                <div className="border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer hover:border-transparent hover:shadow-lg transition-all"
                  style={{ borderColor: COLORS.innovation, backgroundColor: `${COLORS.innovation}10` }}>
                  <Camera className="w-16 h-16 mx-auto mb-4" style={{ color: COLORS.growth }} />
                  <p className="font-semibold mb-2" style={{ color: COLORS.depth }}>Click to upload receipt</p>
                  <p className="text-sm text-gray-500">JPG, PNG up to 10MB</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </label>
            ) : (
              <div className="space-y-4">
                <img src={preview} alt="Receipt" className="w-full rounded-2xl shadow-lg" />
                {scanning && (
                  <div className="text-center py-6">
                    <div className="inline-block w-12 h-12 border-4 rounded-full animate-spin mb-3"
                      style={{ borderColor: COLORS.innovation, borderTopColor: 'transparent' }}></div>
                    <p className="font-semibold" style={{ color: COLORS.depth }}>Extracting data with OCR...</p>
                    <p className="text-sm text-gray-500 mt-1">Analyzing receipt details</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Assets() {
  const [assets, setAssets] = useState([
    {
      id: 1,
      name: 'LG Refrigerator Double Door',
      category: 'fridge',
      purchaseDate: '2023-06-15',
      amount: 3500,
      warrantyExpiry: '2025-06-15',
      room: 'Kitchen',
      nextMaintenance: '2024-08-15',
      vendor: 'Jarir Bookstore'
    },
    {
      id: 2,
      name: 'Daikin Split AC 1.5 Ton',
      category: 'ac',
      purchaseDate: '2023-12-01',
      amount: 4200,
      warrantyExpiry: '2025-12-01',
      room: 'Bedroom 1',
      nextMaintenance: '2024-05-01',
      vendor: 'Extra Stores'
    },
    {
      id: 3,
      name: 'Samsung 55" Smart TV',
      category: 'tv',
      purchaseDate: '2023-08-20',
      amount: 2800,
      warrantyExpiry: '2025-08-20',
      room: 'Living Room',
      vendor: 'Extra Electronics'
    }
  ]);
  const [showScanner, setShowScanner] = useState(false);

  const handleScanComplete = (data) => {
    const newAsset = {
      id: Date.now(),
      name: data.item_name,
      category: data.category,
      purchaseDate: data.purchase_date,
      amount: data.total_amount,
      warrantyExpiry: new Date(
        new Date(data.purchase_date).getTime() + data.warranty_months * 30 * 24 * 60 * 60 * 1000
      ).toISOString().split('T')[0],
      room: 'Not assigned',
      nextMaintenance: data.nextMaintenance,
      vendor: data.vendor
    };

    setAssets([newAsset, ...assets]);
    setShowScanner(false);
  };

  const getWarrantyStatus = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysLeft = Math.floor((expiry - today) / (1000 * 60 * 60 * 24));

    if (daysLeft < 0) return { label: 'Expired', color: '#EF4444', bgColor: '#FEE2E2', icon: AlertCircle };
    if (daysLeft < 30) return { label: `${daysLeft} days left`, color: COLORS.strategy, bgColor: `${COLORS.strategy}20`, icon: AlertCircle };
    return { label: 'Active', color: COLORS.innovation, bgColor: `${COLORS.innovation}20`, icon: CheckCircle };
  };

  const getMaintenanceStatus = (maintenanceDate) => {
    if (!maintenanceDate) return null;
    const today = new Date();
    const maintenance = new Date(maintenanceDate);
    const daysUntil = Math.floor((maintenance - today) / (1000 * 60 * 60 * 24));

    if (daysUntil < 0) return { label: 'Overdue', color: '#EF4444', urgent: true };
    if (daysUntil <= 7) return { label: `Due in ${daysUntil} days`, color: COLORS.strategy, urgent: true };
    return { label: `Due ${maintenance.toLocaleDateString('en-SA')}`, color: '#6B7280', urgent: false };
  };

  const totalValue = assets.reduce((sum, asset) => sum + asset.amount, 0);
  const activeWarranties = assets.filter(a => new Date(a.warrantyExpiry) > new Date()).length;
  const maintenanceDue = assets.filter(a => {
    if (!a.nextMaintenance) return false;
    const status = getMaintenanceStatus(a.nextMaintenance);
    return status && status.urgent;
  }).length;

  return (
    <div className="min-h-screen p-4 md:p-8 pb-24 lg:pb-8" style={{ backgroundColor: COLORS.clarity }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: COLORS.depth }}>Asset Management</h1>
            <p className="text-gray-600">Track appliances with OCR receipt scanning</p>
          </div>
          <button
            onClick={() => setShowScanner(true)}
            className="flex items-center gap-2 text-white px-5 py-3 rounded-2xl hover:opacity-90 transition-all shadow-lg font-semibold"
            style={{ backgroundColor: COLORS.growth }}
          >
            <Camera className="w-5 h-5" />
            Scan Receipt
          </button>
        </div>
      </motion.div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-5 shadow-lg border-0"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${COLORS.growth}20` }}>
              <Package className="w-6 h-6" style={{ color: COLORS.growth }} />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Assets</p>
              <p className="text-2xl font-bold" style={{ color: COLORS.depth }}>{assets.length}</p>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Total Value: <span className="font-semibold" style={{ color: COLORS.growth }}>SAR {totalValue.toLocaleString()}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl p-5 shadow-lg border-0"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${COLORS.innovation}20` }}>
              <CheckCircle className="w-6 h-6" style={{ color: COLORS.growth }} />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Active Warranties</p>
              <p className="text-2xl font-bold" style={{ color: COLORS.depth }}>{activeWarranties}</p>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Out of {assets.length} total assets
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-5 shadow-lg border-0"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${COLORS.strategy}20` }}>
              <AlertCircle className="w-6 h-6" style={{ color: COLORS.strategy }} />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Maintenance Due</p>
              <p className="text-2xl font-bold" style={{ color: COLORS.depth }}>{maintenanceDue}</p>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Requires attention soon
          </div>
        </motion.div>
      </div>

      {/* Assets Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-xl font-bold mb-4" style={{ color: COLORS.depth }}>Your Assets</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assets.map((asset, index) => {
            const category = ASSET_CATEGORIES[asset.category] || ASSET_CATEGORIES.other;
            const warranty = getWarrantyStatus(asset.warrantyExpiry);
            const maintenance = getMaintenanceStatus(asset.nextMaintenance);
            const WarrantyIcon = warranty.icon;
            const CategoryIcon = category.icon;

            return (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-5 border-0 hover:shadow-xl transition-all shadow-lg"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg" style={{ backgroundColor: category.color }}>
                      <CategoryIcon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm" style={{ color: COLORS.depth }}>{asset.name}</h3>
                      <p className="text-xs text-gray-500">{asset.room}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs">Purchased: {new Date(asset.purchaseDate).toLocaleDateString('en-SA')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-xs font-semibold">SAR {asset.amount.toLocaleString()}</span>
                  </div>
                  {asset.vendor && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Package className="w-4 h-4" />
                      <span className="text-xs">{asset.vendor}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all" style={{ backgroundColor: warranty.bgColor }}>
                    <WarrantyIcon className="w-4 h-4" style={{ color: warranty.color }} />
                    <span className="text-xs font-semibold" style={{ color: warranty.color }}>
                      Warranty: {warranty.label}
                    </span>
                  </div>

                  {maintenance && (
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-xl ${
                      maintenance.urgent ? 'animate-pulse' : ''
                    }`} style={{ backgroundColor: `${maintenance.color}20` }}>
                      <AlertCircle className="w-4 h-4" style={{ color: maintenance.color }} />
                      <span className="text-xs font-semibold" style={{ color: maintenance.color }}>
                        {maintenance.label}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {assets.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <Package className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold mb-2" style={{ color: COLORS.depth }}>No assets added yet</h3>
          <p className="text-gray-600 mb-6">Scan your first receipt to get started</p>
          <button
            onClick={() => setShowScanner(true)}
            className="text-white px-6 py-3 rounded-2xl hover:opacity-90 shadow-lg font-semibold"
            style={{ backgroundColor: COLORS.growth }}
          >
            <Camera className="w-5 h-5 inline-block mr-2" />
            Add Your First Asset
          </button>
        </motion.div>
      )}

      {showScanner && (
        <ReceiptScanner
          onScanComplete={handleScanComplete}
          onClose={() => setShowScanner(false)}
        />
      )}
    </div>
  );
}
