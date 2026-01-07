import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, FileText, Loader2, CheckCircle, AlertCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { base44 } from '@/api/base44Client';
import { format, addDays, addMonths } from 'date-fns';

// Maintenance intervals for auto-scheduling
const MAINTENANCE_INTERVALS = {
  ac: { days: 90, description: 'AC filter cleaning and inspection' },
  fridge: { days: 180, description: 'Refrigerator coil cleaning and check' },
  washing_machine: { days: 120, description: 'Washing machine maintenance' },
  dryer: { days: 90, description: 'Dryer vent cleaning' },
  dishwasher: { days: 180, description: 'Dishwasher inspection' },
  water_heater: { days: 365, description: 'Water heater flush and inspection' },
  hvac: { days: 180, description: 'HVAC system maintenance' }
};

export default function ReceiptScanner({ rooms, onAssetCreated, onClose }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [editedData, setEditedData] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
      setExtractedData(null);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const processReceipt = async () => {
    if (!file) return;
    
    setIsProcessing(true);
    setError(null);

    try {
      // Upload file first
      const { file_url } = await base44.integrations.Core.UploadFile({ file });

      // Extract data using LLM with OCR
      const extractionResult = await base44.integrations.Core.ExtractDataFromUploadedFile({
        file_url,
        json_schema: {
          type: 'object',
          properties: {
            item_name: { type: 'string', description: 'Name of the purchased item/appliance' },
            purchase_date: { type: 'string', description: 'Date of purchase in YYYY-MM-DD format' },
            total_amount: { type: 'number', description: 'Total purchase amount' },
            vendor: { type: 'string', description: 'Store or vendor name' },
            model_number: { type: 'string', description: 'Model number if visible' },
            serial_number: { type: 'string', description: 'Serial number if visible' },
            warranty_period_months: { type: 'number', description: 'Warranty period in months if mentioned' }
          },
          required: ['item_name', 'total_amount']
        }
      });

      if (extractionResult.status === 'error') {
        throw new Error(extractionResult.details || 'Failed to extract data');
      }

      const data = extractionResult.output;
      
      // Detect asset type from item name
      const itemNameLower = (data.item_name || '').toLowerCase();
      let detectedType = 'other';
      
      if (itemNameLower.includes('ac') || itemNameLower.includes('air conditioner') || itemNameLower.includes('a/c')) {
        detectedType = 'ac';
      } else if (itemNameLower.includes('fridge') || itemNameLower.includes('refrigerator')) {
        detectedType = 'fridge';
      } else if (itemNameLower.includes('washing machine') || itemNameLower.includes('washer')) {
        detectedType = 'washing_machine';
      } else if (itemNameLower.includes('dryer')) {
        detectedType = 'dryer';
      } else if (itemNameLower.includes('dishwasher')) {
        detectedType = 'dishwasher';
      } else if (itemNameLower.includes('oven') || itemNameLower.includes('stove') || itemNameLower.includes('range')) {
        detectedType = 'oven';
      } else if (itemNameLower.includes('microwave')) {
        detectedType = 'microwave';
      } else if (itemNameLower.includes('water heater') || itemNameLower.includes('boiler')) {
        detectedType = 'water_heater';
      } else if (itemNameLower.includes('hvac') || itemNameLower.includes('furnace') || itemNameLower.includes('heating')) {
        detectedType = 'hvac';
      }

      // Calculate warranty expiry
      const warrantyMonths = data.warranty_period_months || 12;
      const purchaseDate = data.purchase_date || format(new Date(), 'yyyy-MM-dd');
      const warrantyExpiry = format(addMonths(new Date(purchaseDate), warrantyMonths), 'yyyy-MM-dd');

      // Calculate next maintenance date
      const maintenanceConfig = MAINTENANCE_INTERVALS[detectedType];
      const nextMaintenance = maintenanceConfig 
        ? format(addDays(new Date(purchaseDate), maintenanceConfig.days), 'yyyy-MM-dd')
        : null;

      const processedData = {
        ...data,
        asset_type: detectedType,
        receipt_url: file_url,
        warranty_expiry: warrantyExpiry,
        next_maintenance_date: nextMaintenance,
        maintenance_interval_days: maintenanceConfig?.days,
        room_id: ''
      };

      setExtractedData(processedData);
      setEditedData(processedData);
    } catch (err) {
      setError(err.message || 'Failed to process receipt');
    } finally {
      setIsProcessing(false);
    }
  };

  const saveAsset = async () => {
    if (!editedData) return;
    
    setIsProcessing(true);
    try {
      // Create the asset
      const asset = await base44.entities.Asset.create({
        name: editedData.item_name,
        asset_type: editedData.asset_type,
        room_id: editedData.room_id,
        purchase_date: editedData.purchase_date,
        warranty_expiry: editedData.warranty_expiry,
        purchase_amount: editedData.total_amount,
        vendor: editedData.vendor,
        receipt_url: editedData.receipt_url,
        model_number: editedData.model_number,
        serial_number: editedData.serial_number,
        maintenance_interval_days: editedData.maintenance_interval_days,
        next_maintenance_date: editedData.next_maintenance_date,
        status: 'active'
      });

      // Auto-create maintenance task if applicable
      const maintenanceConfig = MAINTENANCE_INTERVALS[editedData.asset_type];
      if (maintenanceConfig && editedData.room_id) {
        await base44.entities.Task.create({
          title: `Scheduled Maintenance: ${editedData.item_name}`,
          description: maintenanceConfig.description,
          task_type: 'maintenance',
          room_id: editedData.room_id,
          asset_id: asset.id,
          priority: 'medium',
          status: 'pending',
          due_date: editedData.next_maintenance_date
        });
      }

      setSuccess(true);
      if (onAssetCreated) {
        onAssetCreated(asset);
      }
      
      // Reset after short delay
      setTimeout(() => {
        setFile(null);
        setPreview(null);
        setExtractedData(null);
        setEditedData(null);
        setSuccess(false);
        if (onClose) onClose();
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to save asset');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <AnimatePresence mode="wait">
        {!extractedData && !success && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors">
              <CardContent className="p-8">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {!preview ? (
                  <div 
                    className="text-center cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Camera className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">Upload Receipt</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Take a photo or upload an image of your receipt
                    </p>
                    <div className="flex gap-3 justify-center">
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Choose File
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      <img 
                        src={preview} 
                        alt="Receipt preview" 
                        className="w-full max-h-64 object-contain rounded-lg"
                      />
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute top-2 right-2 rounded-full"
                        onClick={() => {
                          setFile(null);
                          setPreview(null);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Change
                      </Button>
                      <Button 
                        className="flex-1 bg-gray-900 hover:bg-gray-800"
                        onClick={processReceipt}
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <FileText className="h-4 w-4 mr-2" />
                            Extract Data
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Extracted Data Form */}
        {extractedData && !success && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-3 rounded-lg">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Data extracted successfully!</span>
            </div>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label>Item Name</Label>
                    <Input
                      value={editedData?.item_name || ''}
                      onChange={(e) => setEditedData({ ...editedData, item_name: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label>Asset Type</Label>
                    <Select
                      value={editedData?.asset_type || 'other'}
                      onValueChange={(value) => setEditedData({ ...editedData, asset_type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ac">AC / Air Conditioner</SelectItem>
                        <SelectItem value="fridge">Refrigerator</SelectItem>
                        <SelectItem value="washing_machine">Washing Machine</SelectItem>
                        <SelectItem value="dryer">Dryer</SelectItem>
                        <SelectItem value="dishwasher">Dishwasher</SelectItem>
                        <SelectItem value="oven">Oven / Stove</SelectItem>
                        <SelectItem value="microwave">Microwave</SelectItem>
                        <SelectItem value="water_heater">Water Heater</SelectItem>
                        <SelectItem value="hvac">HVAC System</SelectItem>
                        <SelectItem value="furniture">Furniture</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Room</Label>
                    <Select
                      value={editedData?.room_id || ''}
                      onValueChange={(value) => setEditedData({ ...editedData, room_id: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select room" />
                      </SelectTrigger>
                      <SelectContent>
                        {rooms.map((room) => (
                          <SelectItem key={room.id} value={room.id}>
                            {room.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Purchase Date</Label>
                    <Input
                      type="date"
                      value={editedData?.purchase_date || ''}
                      onChange={(e) => setEditedData({ ...editedData, purchase_date: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label>Total Amount</Label>
                    <Input
                      type="number"
                      value={editedData?.total_amount || ''}
                      onChange={(e) => setEditedData({ ...editedData, total_amount: parseFloat(e.target.value) })}
                    />
                  </div>

                  <div className="col-span-2">
                    <Label>Vendor</Label>
                    <Input
                      value={editedData?.vendor || ''}
                      onChange={(e) => setEditedData({ ...editedData, vendor: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label>Model Number</Label>
                    <Input
                      value={editedData?.model_number || ''}
                      onChange={(e) => setEditedData({ ...editedData, model_number: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label>Serial Number</Label>
                    <Input
                      value={editedData?.serial_number || ''}
                      onChange={(e) => setEditedData({ ...editedData, serial_number: e.target.value })}
                    />
                  </div>
                </div>

                {/* Auto-maintenance notice */}
                {MAINTENANCE_INTERVALS[editedData?.asset_type] && (
                  <div className="bg-blue-50 text-blue-800 px-4 py-3 rounded-lg text-sm">
                    <p className="font-medium">Automatic Maintenance Scheduling</p>
                    <p className="mt-1">
                      A maintenance task will be automatically created for {MAINTENANCE_INTERVALS[editedData.asset_type].description} 
                      every {MAINTENANCE_INTERVALS[editedData.asset_type].days} days.
                    </p>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {
                      setExtractedData(null);
                      setEditedData(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="flex-1 bg-gray-900 hover:bg-gray-800"
                    onClick={saveAsset}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Save Asset'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Success State */}
        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 15 }}
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle className="h-10 w-10 text-green-600" />
            </motion.div>
            <h3 className="text-xl font-bold text-gray-900">Asset Added Successfully!</h3>
            <p className="text-gray-500 mt-1">Your asset has been registered with maintenance scheduling.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-lg"
        >
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </motion.div>
      )}
    </div>
  );
}