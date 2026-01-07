import React, { useState } from 'react';
import { Store, Star, DollarSign, Clock, Phone, CheckCircle, X } from 'lucide-react';

const SERVICES = [
  {
    id: 1,
    provider_name: 'CleanPro Services',
    service_type: 'Cleaning',
    rating: 4.8,
    reviews: 234,
    base_price: 500,
    duration: '2 hours',
    phone: '+91 98765 43210',
    image: '🧹'
  },
  {
    id: 2,
    provider_name: 'CoolTech HVAC',
    service_type: 'AC Maintenance',
    rating: 4.9,
    reviews: 189,
    base_price: 800,
    duration: '1.5 hours',
    phone: '+91 98765 43211',
    image: '❄️'
  },
  {
    id: 3,
    provider_name: 'HandyFix',
    service_type: 'Plumbing',
    rating: 4.7,
    reviews: 156,
    base_price: 600,
    duration: '1 hour',
    phone: '+91 98765 43212',
    image: '🔧'
  },
  {
    id: 4,
    provider_name: 'SparkElectric',
    service_type: 'Electrical',
    rating: 4.9,
    reviews: 201,
    base_price: 700,
    duration: '1 hour',
    phone: '+91 98765 43213',
    image: '⚡'
  },
  {
    id: 5,
    provider_name: 'GreenGarden',
    service_type: 'Gardening',
    rating: 4.6,
    reviews: 98,
    base_price: 450,
    duration: '2 hours',
    phone: '+91 98765 43214',
    image: '🌿'
  },
  {
    id: 6,
    provider_name: 'PestAway',
    service_type: 'Pest Control',
    rating: 4.8,
    reviews: 167,
    base_price: 1200,
    duration: '3 hours',
    phone: '+91 98765 43215',
    image: '🐛'
  }
];

function BookingModal({ service, onClose, onConfirm }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      onConfirm({
        service,
        date: selectedDate,
        time: selectedTime
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Book Service</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl">
              {service.image}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{service.provider_name}</h3>
              <p className="text-gray-600">{service.service_type}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Base Price</span>
              <span className="font-semibold">₹{service.base_price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Duration</span>
              <span className="font-semibold">{service.duration}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Select Date</label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Select Time</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                <option value="">Choose a time slot</option>
                <option value="09:00">09:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="14:00">02:00 PM</option>
                <option value="16:00">04:00 PM</option>
                <option value="18:00">06:00 PM</option>
              </select>
            </div>
          </div>
        </div>

        <button
          onClick={handleBooking}
          disabled={!selectedDate || !selectedTime}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
        >
          Confirm Booking - ₹{service.base_price}
        </button>
      </div>
    </div>
  );
}

export default function Marketplace() {
  const [selectedService, setSelectedService] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');

  const handleConfirmBooking = (booking) => {
    setBookings([...bookings, { ...booking, id: Date.now(), status: 'confirmed' }]);
    setSelectedService(null);
    alert('Booking confirmed! The service provider will contact you soon.');
  };

  const filteredServices = filter === 'all'
    ? SERVICES
    : SERVICES.filter(s => s.service_type.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Service Marketplace</h1>
        <p className="text-gray-600">Book trusted service providers</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['all', 'cleaning', 'ac', 'plumbing', 'electrical'].map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
              filter === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Service Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServices.map((service) => (
          <div key={service.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl">
                  {service.image}
                </div>
                <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-full">
                  <Star className="w-4 h-4 text-yellow-600 fill-yellow-600" />
                  <span className="text-sm font-semibold text-yellow-700">{service.rating}</span>
                  <span className="text-xs text-yellow-600">({service.reviews})</span>
                </div>
              </div>

              <h3 className="font-bold text-lg mb-1">{service.provider_name}</h3>
              <p className="text-gray-600 mb-4">{service.service_type}</p>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <DollarSign className="w-4 h-4" />
                  Starting from ₹{service.base_price}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  {service.duration}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  {service.phone}
                </div>
              </div>

              <button
                onClick={() => setSelectedService(service)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* My Bookings */}
      {bookings.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">My Bookings</h2>
          <div className="space-y-3">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-green-50 rounded-xl p-4 border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{booking.service.provider_name}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(booking.date).toLocaleDateString()} at {booking.time}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Confirmed</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
