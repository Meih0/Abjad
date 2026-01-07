import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, Phone, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { base44 } from '@/api/base44Client';
import { format } from 'date-fns';

const SERVICE_TYPE_ICONS = {
  plumbing: '🔧',
  electrical: '⚡',
  hvac: '❄️',
  cleaning: '🧹',
  appliance_repair: '🔌',
  pest_control: '🐜',
  landscaping: '🌿',
  painting: '🎨',
  general_maintenance: '🛠️'
};

const AVAILABILITY_COLORS = {
  available: 'bg-green-100 text-green-700',
  busy: 'bg-amber-100 text-amber-700',
  offline: 'bg-gray-100 text-gray-500'
};

export default function ServiceCard({ provider, rooms, onBookingComplete }) {
  const [showBooking, setShowBooking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingData, setBookingData] = useState({
    scheduled_date: '',
    scheduled_time: '',
    room_id: '',
    description: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleBook = async () => {
    setIsProcessing(true);
    try {
      const booking = await base44.entities.Booking.create({
        provider_id: provider.id,
        provider_name: provider.name,
        service_type: provider.service_type,
        scheduled_date: bookingData.scheduled_date,
        scheduled_time: bookingData.scheduled_time,
        room_id: bookingData.room_id,
        description: bookingData.description,
        total_amount: provider.base_price,
        status: 'pending',
        payment_status: 'pending'
      });

      setBookingSuccess(true);
      if (onBookingComplete) {
        onBookingComplete(booking);
      }

      setTimeout(() => {
        setShowBooking(false);
        setBookingSuccess(false);
        setBookingData({
          scheduled_date: '',
          scheduled_time: '',
          room_id: '',
          description: ''
        });
      }, 2000);
    } catch (err) {
      console.error('Booking failed:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`}
      />
    ));
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
        <CardContent className="p-0">
          {/* Header with Icon */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 relative">
            <div className="flex items-start justify-between">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-3xl">
                {SERVICE_TYPE_ICONS[provider.service_type] || '🛠️'}
              </div>
              <Badge className={`${AVAILABILITY_COLORS[provider.availability || 'available']} border-0`}>
                {provider.availability || 'Available'}
              </Badge>
            </div>

            {/* Logo overlay if exists */}
            {provider.logo_url && (
              <img 
                src={provider.logo_url} 
                alt={provider.name}
                className="absolute top-4 right-4 w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
              />
            )}
          </div>

          {/* Content */}
          <div className="p-5 space-y-4">
            {/* Provider Info */}
            <div>
              <h3 className="font-bold text-lg text-gray-900">{provider.name}</h3>
              <p className="text-sm text-gray-500 capitalize">
                {provider.service_type?.replace('_', ' ')}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {renderStars(provider.rating || 0)}
              </div>
              <span className="text-sm font-medium text-gray-700">
                {provider.rating?.toFixed(1) || 'N/A'}
              </span>
              {provider.total_reviews > 0 && (
                <span className="text-sm text-gray-400">
                  ({provider.total_reviews} reviews)
                </span>
              )}
            </div>

            {/* Description */}
            {provider.description && (
              <p className="text-sm text-gray-600 line-clamp-2">
                {provider.description}
              </p>
            )}

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              {provider.response_time && (
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {provider.response_time}
                </span>
              )}
              {provider.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  Contact
                </span>
              )}
            </div>

            {/* Price & CTA */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div>
                <span className="text-2xl font-bold text-gray-900">
                  ${provider.base_price}
                </span>
                <span className="text-sm text-gray-500 ml-1">
                  /{provider.price_unit?.replace('per_', '') || 'visit'}
                </span>
              </div>
              <Button 
                className="bg-gray-900 hover:bg-gray-800 px-6"
                onClick={() => setShowBooking(true)}
                disabled={provider.availability === 'offline'}
              >
                Book Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking Dialog */}
      <Dialog open={showBooking} onOpenChange={setShowBooking}>
        <DialogContent className="sm:max-w-md">
          {!bookingSuccess ? (
            <>
              <DialogHeader>
                <DialogTitle>Book Service</DialogTitle>
                <DialogDescription>
                  Schedule an appointment with {provider.name}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                {/* Provider Summary */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-xl shadow-sm">
                    {SERVICE_TYPE_ICONS[provider.service_type] || '🛠️'}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{provider.name}</p>
                    <p className="text-sm text-gray-500">
                      ${provider.base_price} / {provider.price_unit?.replace('per_', '') || 'visit'}
                    </p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Date</Label>
                      <Input
                        type="date"
                        min={format(new Date(), 'yyyy-MM-dd')}
                        value={bookingData.scheduled_date}
                        onChange={(e) => setBookingData({ ...bookingData, scheduled_date: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Time</Label>
                      <Select
                        value={bookingData.scheduled_time}
                        onValueChange={(value) => setBookingData({ ...bookingData, scheduled_time: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="09:00">9:00 AM</SelectItem>
                          <SelectItem value="10:00">10:00 AM</SelectItem>
                          <SelectItem value="11:00">11:00 AM</SelectItem>
                          <SelectItem value="12:00">12:00 PM</SelectItem>
                          <SelectItem value="13:00">1:00 PM</SelectItem>
                          <SelectItem value="14:00">2:00 PM</SelectItem>
                          <SelectItem value="15:00">3:00 PM</SelectItem>
                          <SelectItem value="16:00">4:00 PM</SelectItem>
                          <SelectItem value="17:00">5:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>Room / Location</Label>
                    <Select
                      value={bookingData.room_id}
                      onValueChange={(value) => setBookingData({ ...bookingData, room_id: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select room" />
                      </SelectTrigger>
                      <SelectContent>
                        {rooms?.map((room) => (
                          <SelectItem key={room.id} value={room.id}>
                            {room.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Description (Optional)</Label>
                    <Textarea
                      placeholder="Describe the issue or service needed..."
                      value={bookingData.description}
                      onChange={(e) => setBookingData({ ...bookingData, description: e.target.value })}
                      rows={3}
                    />
                  </div>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between p-4 bg-gray-900 text-white rounded-xl">
                  <span className="font-medium">Total</span>
                  <span className="text-xl font-bold">${provider.base_price}</span>
                </div>

                {/* Payment Notice */}
                <p className="text-xs text-gray-500 text-center">
                  Payment will be collected upon service completion
                </p>
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowBooking(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1 bg-gray-900 hover:bg-gray-800"
                  onClick={handleBook}
                  disabled={isProcessing || !bookingData.scheduled_date || !bookingData.scheduled_time}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Booking...
                    </>
                  ) : (
                    'Confirm Booking'
                  )}
                </Button>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 15 }}
                className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle className="h-8 w-8 text-green-600" />
              </motion.div>
              <h3 className="text-lg font-bold text-gray-900">Booking Confirmed!</h3>
              <p className="text-gray-500 mt-1">
                {provider.name} will contact you shortly
              </p>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}