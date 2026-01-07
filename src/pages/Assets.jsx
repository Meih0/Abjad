import React, { useState } from 'react';
import { Package, Camera, Calendar, DollarSign, AlertCircle, CheckCircle, Upload, X } from 'lucide-react';

// Simulated OCR extraction (in real app, this would call backend API with Tesseract/AWS Textract)
const simulateOCR = (file) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate extracted data
      const mockData = {
        item_name: 'Samsung AC 1.5 Ton',
        purchase_date: '2024-01-15',
        total_amount: 45000,
        vendor: 'Electronics Store',
        warranty_months: 24,
        category: 'ac' // auto-detect category for maintenance scheduling
      };
      resolve(mockData);
    }, 2000);
  });
};

const ASSET_CATEGORIES = {
  ac: { icon: '❄️', maintenanceInterval: 90, color: 'blue' },
  fridge: { icon: '🧊', maintenanceInterval: 180, color: 'cyan' },
  washing_machine: { icon: '🧺', maintenanceInterval: 90, color: 'purple' },
  tv: { icon: '📺', maintenanceInterval: 365, color: 'pink' },
  other: { icon: '📦', maintenanceInterval: 180, color: 'gray' }
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
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Scan Receipt</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!preview ? (
          <label className="block">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all">
              <Camera className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p className="text-gray-600 mb-2">Click to upload receipt</p>
              <p className="text-sm text-gray-400">JPG, PNG up to 10MB</p>
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
            <img src={preview} alt="Receipt" className="w-full rounded-xl" />
            {scanning && (
              <div className="text-center">
                <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-2"></div>
                <p className="text-sm text-gray-600">Extracting data with OCR...</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Assets() {
  const [assets, setAssets] = useState([
    {
      id: 1,
      name: 'LG Refrigerator',
      category: 'fridge',
      purchaseDate: '2023-06-15',
      amount: 35000,
      warrantyExpiry: '2025-06-15',
      room: 'Kitchen',
      nextMaintenance: '2024-08-15'
    },
    {
      id: 2,
      name: 'Daikin AC 1.5 Ton',
      category: 'ac',
      purchaseDate: '2023-12-01',
      amount: 42000,
      warrantyExpiry: '2025-12-01',
      room: 'Bedroom 1',
      nextMaintenance: '2024-05-01'
    }
  ]);
  const [showScanner, setShowScanner] = useState(false);

  const handleScanComplete = (data) => {
    const newAsset = {
      id: assets.length + 1,
      name: data.item_name,
      category: data.category,
      purchaseDate: data.purchase_date,
      amount: data.total_amount,
      warrantyExpiry: new Date(
        new Date(data.purchase_date).getTime() + data.warranty_months * 30 * 24 * 60 * 60 * 1000
      ).toISOString().split('T')[0],
      room: 'Not assigned',
      nextMaintenance: data.nextMaintenance
    };

    setAssets([...assets, newAsset]);
    setShowScanner(false);
  };

  const getWarrantyStatus = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysLeft = Math.floor((expiry - today) / (1000 * 60 * 60 * 24));

    if (daysLeft < 0) return { label: 'Expired', color: 'red', icon: AlertCircle };
    if (daysLeft < 30) return { label: `${daysLeft} days left`, color: 'orange', icon: AlertCircle };
    return { label: 'Active', color: 'green', icon: CheckCircle };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Asset Management</h1>
          <p className="text-gray-600">Track appliances with OCR receipt scanning</p>
        </div>
        <button
          onClick={() => setShowScanner(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-all"
        >
          <Camera className="w-5 h-5" />
          Scan Receipt
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {assets.map((asset) => {
          const category = ASSET_CATEGORIES[asset.category] || ASSET_CATEGORIES.other;
          const warranty = getWarrantyStatus(asset.warrantyExpiry);
          const WarrantyIcon = warranty.icon;

          return (
            <div key={asset.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 bg-${category.color}-100 rounded-xl flex items-center justify-center text-2xl`}>
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold">{asset.name}</h3>
                    <p className="text-sm text-gray-600">{asset.room}</p>
                  </div>
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 bg-${warranty.color}-100 text-${warranty.color}-700 rounded-full text-xs`}>
                  <WarrantyIcon className="w-3 h-3" />
                  {warranty.label}
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  Purchased: {new Date(asset.purchaseDate).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <DollarSign className="w-4 h-4" />
                  Amount: ₹{asset.amount.toLocaleString()}
                </div>
                {asset.nextMaintenance && (
                  <div className="flex items-center gap-2 text-orange-600 bg-orange-50 px-2 py-1 rounded">
                    <AlertCircle className="w-4 h-4" />
                    Next maintenance: {new Date(asset.nextMaintenance).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {assets.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-600 mb-4">No assets added yet</p>
          <button
            onClick={() => setShowScanner(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700"
          >
            Add Your First Asset
          </button>
        </div>
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
