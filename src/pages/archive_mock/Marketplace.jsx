import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Store, Star, Clock, Phone, CheckCircle, X, MapPin, Award, TrendingUp, Sparkles } from 'lucide-react';

// Hawaz Brand Colors
const COLORS = {
  growth: '#005143',
  innovation: '#41E661',
  clarity: '#FEF5E8',
  depth: '#121B22',
  strategy: '#F47D42'
};

const SERVICES = [
  {
    id: 1,
    provider_name: 'نظافة الرياض - Riyadh CleanPro',
    service_type: 'تنظيف شامل - Deep Cleaning',
    rating: 4.9,
    reviews: 487,
    base_price: 350,
    duration: '2-3 hours',
    phone: '+966 50 123 4567',
    location: 'Riyadh, KSA',
    image: '🧹',
    verified: true,
    specialty: 'Residential & Commercial'
  },
  {
    id: 2,
    provider_name: 'بناء الأحلام - Binaa Al-Ahlam',
    service_type: 'صيانة وبناء - Maintenance & Construction',
    rating: 4.8,
    reviews: 312,
    base_price: 500,
    duration: '2-4 hours',
    phone: '+966 50 234 5678',
    location: 'Jeddah, KSA',
    image: '🔨',
    verified: true,
    specialty: 'Home Repairs & Renovations'
  },
  {
    id: 3,
    provider_name: 'CoolBreeze HVAC المملكة',
    service_type: 'صيانة التكييف - AC Maintenance',
    rating: 4.9,
    reviews: 523,
    base_price: 280,
    duration: '1-2 hours',
    phone: '+966 50 345 6789',
    location: 'Dammam, KSA',
    image: '❄️',
    verified: true,
    specialty: 'AC Installation & Service'
  },
  {
    id: 4,
    provider_name: 'السباك الماهر - Al-Sabbak Al-Mahir',
    service_type: 'سباكة - Plumbing Services',
    rating: 4.7,
    reviews: 298,
    base_price: 250,
    duration: '1-2 hours',
    phone: '+966 50 456 7890',
    location: 'Riyadh, KSA',
    image: '🔧',
    verified: true,
    specialty: 'Emergency & Regular Plumbing'
  },
  {
    id: 5,
    provider_name: 'SparkPro الكهرباء الذكية',
    service_type: 'كهرباء - Electrical Work',
    rating: 4.9,
    reviews: 419,
    base_price: 300,
    duration: '1-3 hours',
    phone: '+966 50 567 8901',
    location: 'Riyadh, KSA',
    image: '⚡',
    verified: true,
    specialty: 'Smart Home & Electrical'
  },
  {
    id: 6,
    provider_name: 'حدائق الجنة - Hadaiq Al-Jannah',
    service_type: 'تنسيق حدائق - Landscaping',
    rating: 4.8,
    reviews: 267,
    base_price: 400,
    duration: '2-3 hours',
    phone: '+966 50 678 9012',
    location: 'Jeddah, KSA',
    image: '🌿',
    verified: true,
    specialty: 'Garden Design & Maintenance'
  },
  {
    id: 7,
    provider_name: 'مكافحة الآفات المتقدمة - Advanced Pest Control',
    service_type: 'مكافحة حشرات - Pest Control',
    rating: 4.9,
    reviews: 381,
    base_price: 450,
    duration: '2-4 hours',
    phone: '+966 50 789 0123',
    location: 'Riyadh, KSA',
    image: '🐛',
    verified: true,
    specialty: 'Eco-Friendly Solutions'
  },
  {
    id: 8,
    provider_name: 'دهانات الفن الراقي - Elite Paint Masters',
    service_type: 'دهانات وديكور - Painting & Decor',
    rating: 4.8,
    reviews: 203,
    base_price: 600,
    duration: '4-8 hours',
    phone: '+966 50 890 1234',
    location: 'Riyadh, KSA',
    image: '🎨',
    verified: true,
    specialty: 'Interior & Exterior Painting'
  }
];

function BookingModal({ service, onClose, onConfirm }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      onConfirm({
        service,
        date: selectedDate,
        time: selectedTime,
        notes
      });
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-3xl max-w-lg w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold" style={{ color: COLORS.depth }}>Book Service</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center gap-4 mb-6 p-4 rounded-2xl" style={{ backgroundColor: `${COLORS.growth}10` }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg" style={{ backgroundColor: COLORS.growth }}>
                <span className="filter brightness-0 invert">{service.image}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg" style={{ color: COLORS.depth }}>{service.provider_name}</h3>
                <p className="text-gray-600 text-sm">{service.service_type}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold text-sm">{service.rating}</span>
                  <span className="text-xs text-gray-500">({service.reviews} reviews)</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-600 font-medium">Base Price</span>
                <span className="font-bold text-xl" style={{ color: COLORS.growth }}>
                  {service.base_price} SAR
                </span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-600 font-medium">Duration</span>
                <span className="font-semibold" style={{ color: COLORS.depth }}>{service.duration}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Location</span>
                <span className="font-semibold text-sm" style={{ color: COLORS.depth }}>{service.location}</span>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.depth }}>
                  Select Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0 transition-colors"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.depth }}>
                  Select Time
                </label>
                <select
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0 transition-colors"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                >
                  <option value="">Choose a time slot</option>
                  <option value="08:00">08:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="16:00">04:00 PM</option>
                  <option value="18:00">06:00 PM</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.depth }}>
                  Additional Notes (Optional)
                </label>
                <textarea
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0 transition-colors resize-none"
                  rows="3"
                  placeholder="Any specific requirements or details..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>

            <button
              onClick={handleBooking}
              disabled={!selectedDate || !selectedTime}
              className="w-full text-white py-4 rounded-2xl font-bold text-lg hover:opacity-90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all active:scale-95 shadow-lg"
              style={{ backgroundColor: !selectedDate || !selectedTime ? '#d1d5db' : COLORS.growth }}
            >
              Confirm Booking - {service.base_price} SAR
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Marketplace() {
  const [selectedService, setSelectedService] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');

  const handleConfirmBooking = (booking) => {
    setBookings([...bookings, { ...booking, id: Date.now(), status: 'confirmed' }]);
    setSelectedService(null);
  };

  const categories = [
    { id: 'all', label: 'All Services', icon: Store },
    { id: 'cleaning', label: 'Cleaning', icon: Sparkles },
    { id: 'ac', label: 'AC Service', icon: '❄️' },
    { id: 'maintenance', label: 'Maintenance', icon: '🔧' },
    { id: 'electrical', label: 'Electrical', icon: '⚡' }
  ];

  const filteredServices = filter === 'all'
    ? SERVICES
    : SERVICES.filter(s =>
        s.service_type.toLowerCase().includes(filter.toLowerCase()) ||
        s.specialty.toLowerCase().includes(filter.toLowerCase())
      );

  return (
    <div className="min-h-screen p-4 md:p-8 pb-24 lg:pb-8" style={{ backgroundColor: COLORS.clarity }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold mb-2" style={{ color: COLORS.depth }}>
          Service Marketplace
        </h1>
        <p className="text-gray-600">Book trusted service providers across Saudi Arabia</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-4 shadow-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${COLORS.growth}20` }}>
              <Store className="w-5 h-5" style={{ color: COLORS.growth }} />
            </div>
          </div>
          <p className="text-2xl font-bold" style={{ color: COLORS.depth }}>{SERVICES.length}</p>
          <p className="text-xs text-gray-600 font-medium">Providers</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl p-4 shadow-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-100">
              <Award className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
          <p className="text-2xl font-bold" style={{ color: COLORS.depth }}>100%</p>
          <p className="text-xs text-gray-600 font-medium">Verified</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-4 shadow-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${COLORS.innovation}20` }}>
              <TrendingUp className="w-5 h-5" style={{ color: COLORS.growth }} />
            </div>
          </div>
          <p className="text-2xl font-bold" style={{ color: COLORS.depth }}>4.8</p>
          <p className="text-xs text-gray-600 font-medium">Avg Rating</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-2xl p-4 shadow-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${COLORS.strategy}20` }}>
              <CheckCircle className="w-5 h-5" style={{ color: COLORS.strategy }} />
            </div>
          </div>
          <p className="text-2xl font-bold" style={{ color: COLORS.depth }}>{bookings.length}</p>
          <p className="text-xs text-gray-600 font-medium">Your Bookings</p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="overflow-x-auto pb-2 mb-6 -mx-5 px-5">
        <div className="flex gap-2 min-w-max md:min-w-0 md:flex-wrap">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(category.id)}
              className={`snap-start px-5 py-3 rounded-2xl whitespace-nowrap transition-all font-semibold shadow-md active:scale-95 ${
                filter === category.id
                  ? 'text-white'
                  : 'bg-white text-gray-700 hover:shadow-lg'
              }`}
              style={filter === category.id ? { backgroundColor: COLORS.growth } : {}}
            >
              {category.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Service Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6"
      >
        {filteredServices.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-3xl shadow-lg hover:shadow-xl active:scale-[0.99] transition-all duration-300 overflow-hidden group"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition-transform" style={{ backgroundColor: COLORS.growth }}>
                  <span className="filter brightness-0 invert">{service.image}</span>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {service.verified && (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full" style={{ backgroundColor: `${COLORS.innovation}20` }}>
                      <CheckCircle className="w-3 h-3" style={{ color: COLORS.growth }} />
                      <span className="text-xs font-semibold" style={{ color: COLORS.growth }}>Verified</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-bold text-yellow-700">{service.rating}</span>
                    <span className="text-xs text-yellow-600">({service.reviews})</span>
                  </div>
                </div>
              </div>

              <h3 className="font-bold text-lg mb-1" style={{ color: COLORS.depth }}>
                {service.provider_name}
              </h3>
              <p className="text-gray-600 text-sm mb-3">{service.service_type}</p>
              <p className="text-xs text-gray-500 mb-4 font-medium">{service.specialty}</p>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-600 font-medium">Starting from</span>
                  <span className="font-bold text-lg" style={{ color: COLORS.growth }}>
                    {service.base_price} SAR
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 px-1">
                  <Clock className="w-4 h-4" />
                  <span>{service.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 px-1">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{service.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 px-1">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm" dir="ltr">{service.phone}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedService(service)}
                className="w-full text-white py-3 rounded-2xl font-bold hover:opacity-90 transition-all active:scale-95 shadow-md"
                style={{ backgroundColor: COLORS.growth }}
              >
                Book Now
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* My Bookings */}
      {bookings.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <h2 className="text-2xl font-bold mb-4" style={{ color: COLORS.depth }}>My Bookings</h2>
          <div className="space-y-3">
            {bookings.map((booking) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-3xl p-5 shadow-lg border-2"
                style={{ borderColor: COLORS.innovation }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-md" style={{ backgroundColor: COLORS.growth }}>
                      <span className="filter brightness-0 invert">{booking.service.image}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg" style={{ color: COLORS.depth }}>
                        {booking.service.provider_name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {new Date(booking.date).toLocaleDateString('en-GB')} at {booking.time}
                      </p>
                      <p className="text-sm font-semibold" style={{ color: COLORS.growth }}>
                        {booking.service.base_price} SAR
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: `${COLORS.innovation}20` }}>
                    <CheckCircle className="w-5 h-5" style={{ color: COLORS.growth }} />
                    <span className="font-bold" style={{ color: COLORS.growth }}>Confirmed</span>
                  </div>
                </div>
                {booking.notes && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500 font-semibold mb-1">Notes:</p>
                    <p className="text-sm text-gray-700">{booking.notes}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {selectedService && (
        <BookingModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onConfirm={handleConfirmBooking}
        />
      )}
    </div>
  );
}
