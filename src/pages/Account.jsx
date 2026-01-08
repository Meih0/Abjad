import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Settings, CreditCard, MapPin, Bell, Shield, Heart, Gift, LogOut,
  Edit, Save, X, Camera, Trophy, Star, Package, Clock, ChevronRight,
  Wallet, Smartphone, Mail, Phone, Globe, Moon, Sun, Volume2, Award, Download
} from 'lucide-react';

// Hawaz Brand Colors
const COLORS = {
  growth: '#005143',
  innovation: '#41E661',
  clarity: '#FEF5E8',
  depth: '#121B22',
  strategy: '#F47D42'
};

const ORDER_HISTORY = [
  {
    id: 'ORD-2024-001',
    date: '2024-01-05',
    items: ['Deep Cleaning', 'AC Maintenance'],
    total: 730,
    status: 'completed',
    rating: 5
  },
  {
    id: 'ORD-2024-002',
    date: '2024-01-03',
    items: ['Plumbing Repair', 'Electrical Fix'],
    total: 450,
    status: 'completed',
    rating: 4
  },
  {
    id: 'ORD-2023-156',
    date: '2023-12-28',
    items: ['Home Security Camera'],
    total: 850,
    status: 'delivered',
    rating: 5
  }
];

const SAVED_ADDRESSES = [
  {
    id: 1,
    label: 'Home',
    labelAr: 'المنزل',
    address: 'King Fahd Road, Al Olaya District',
    city: 'Riyadh',
    isDefault: true
  },
  {
    id: 2,
    label: 'Office',
    labelAr: 'المكتب',
    address: 'Prince Sultan Street, Al Malqa',
    city: 'Riyadh',
    isDefault: false
  }
];

const SAVED_CARDS = [
  {
    id: 1,
    type: 'Mada',
    last4: '4532',
    expiry: '12/26',
    isDefault: true
  },
  {
    id: 2,
    type: 'Visa',
    last4: '8901',
    expiry: '08/25',
    isDefault: false
  }
];

function Account() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    push: true,
    marketing: false
  });

  const [profileData, setProfileData] = useState({
    name: 'Rayan Al-Masad',
    nameAr: 'ريان المسعد',
    email: 'rayan.almasad@example.com',
    phone: '+966 50 123 4567',
    language: 'en',
    avatar: '👨‍💼'
  });

  const loyaltyPoints = 2450;
  const membershipTier = 'Gold';

  const tabs = [
    { id: 'profile', icon: User, label: 'Profile', labelAr: 'الملف الشخصي', badge: null },
    { id: 'orders', icon: Package, label: 'Orders', labelAr: 'الطلبات', badge: ORDER_HISTORY.length },
    { id: 'payments', icon: CreditCard, label: 'Payments', labelAr: 'المدفوعات', badge: null },
    { id: 'addresses', icon: MapPin, label: 'Addresses', labelAr: 'العناوين', badge: null },
    { id: 'rewards', icon: Gift, label: 'Rewards', labelAr: 'المكافآت', badge: null },
    { id: 'settings', icon: Settings, label: 'Settings', labelAr: 'الإعدادات', badge: notifications.email || notifications.sms ? '!' : null }
  ];

  return (
    <div className="min-h-screen p-4 md:p-8 pb-24 lg:pb-8" style={{ backgroundColor: COLORS.clarity }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold mb-2" style={{ color: COLORS.depth }}>
          My Account | حسابي
        </h1>
        <p className="text-gray-600">Manage your profile, orders, and settings</p>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl p-6 shadow-lg mb-4"
          >
            <div className="text-center">
              <div
                className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-5xl shadow-lg"
                style={{ backgroundColor: COLORS.clarity }}
              >
                {profileData.avatar}
              </div>
              <h2 className="font-bold text-xl mb-1" style={{ color: COLORS.depth }}>{profileData.name}</h2>
              <p className="text-sm text-gray-500 mb-3" dir="rtl">{profileData.nameAr}</p>

              {/* Membership Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: COLORS.innovation }}>
                <Trophy className="w-4 h-4 text-white" />
                <span className="font-bold text-white text-sm">{membershipTier} Member</span>
              </div>
            </div>
          </motion.div>

          {/* Navigation Tabs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-4 shadow-lg space-y-1"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all relative ${
                  activeTab === tab.id
                    ? 'text-white'
                    : 'hover:bg-gray-50'
                }`}
                style={activeTab === tab.id ? { backgroundColor: COLORS.growth } : {}}
              >
                <tab.icon className="w-5 h-5" />
                <span className="flex-1 text-left font-semibold text-sm">{tab.label}</span>
                {tab.badge && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-500 text-white">
                    {tab.badge}
                  </span>
                )}
                {activeTab === tab.id && <ChevronRight className="w-4 h-4" />}
              </button>
            ))}

            <div className="pt-4 border-t border-gray-200">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-red-50 transition-all text-red-600">
                <LogOut className="w-5 h-5" />
                <span className="flex-1 text-left font-semibold text-sm">Logout</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-3xl p-6 md:p-8 shadow-lg"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold" style={{ color: COLORS.depth }}>Profile Information</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-4 py-2 rounded-xl font-semibold transition-all active:scale-95 flex items-center gap-2"
                    style={{ backgroundColor: isEditing ? COLORS.strategy : COLORS.growth, color: 'white' }}
                  >
                    {isEditing ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                    {isEditing ? 'Cancel' : 'Edit'}
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.depth }}>
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profileData.name}
                        disabled={!isEditing}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0 disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.depth }}>
                        الاسم بالعربي
                      </label>
                      <input
                        type="text"
                        value={profileData.nameAr}
                        disabled={!isEditing}
                        dir="rtl"
                        onChange={(e) => setProfileData({ ...profileData, nameAr: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0 disabled:bg-gray-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.depth }}>
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={profileData.email}
                        disabled={!isEditing}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0 disabled:bg-gray-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.depth }}>
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={profileData.phone}
                        disabled={!isEditing}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0 disabled:bg-gray-50"
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <button
                      onClick={() => setIsEditing(false)}
                      className="w-full py-4 rounded-2xl font-bold text-white transition-all active:scale-95 flex items-center justify-center gap-2"
                      style={{ backgroundColor: COLORS.growth }}
                    >
                      <Save className="w-5 h-5" />
                      Save Changes
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'orders' && (
              <motion.div
                key="orders"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="bg-white rounded-3xl p-6 shadow-lg mb-4">
                  <h2 className="text-2xl font-bold mb-2" style={{ color: COLORS.depth }}>Order History</h2>
                  <p className="text-gray-600">سجل طلباتك السابقة</p>
                </div>

                {ORDER_HISTORY.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="font-bold text-lg" style={{ color: COLORS.depth }}>{order.id}</p>
                        <p className="text-sm text-gray-500">{order.date}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4"
                            fill={i < order.rating ? COLORS.innovation : 'none'}
                            stroke={i < order.rating ? COLORS.innovation : '#d1d5db'}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      {order.items.map((item, i) => (
                        <p key={i} className="text-sm text-gray-600">• {item}</p>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2">
                        <span
                          className="px-4 py-2 rounded-full text-sm font-semibold"
                          style={{
                            backgroundColor: order.status === 'completed' ? `${COLORS.innovation}20` : `${COLORS.strategy}20`,
                            color: order.status === 'completed' ? COLORS.growth : COLORS.strategy
                          }}
                        >
                          {order.status}
                        </span>
                        {order.status === 'completed' && (
                          <button
                            onClick={() => {
                              // Simulate invoice download
                              alert(`Downloading invoice for ${order.id}`);
                            }}
                            className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                            title="Download Invoice"
                          >
                            <Download className="w-5 h-5" style={{ color: COLORS.growth }} />
                          </button>
                        )}
                      </div>
                      <p className="text-xl font-bold" style={{ color: COLORS.growth }}>SAR {order.total}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'payments' && (
              <motion.div
                key="payments"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="bg-white rounded-3xl p-6 shadow-lg mb-4">
                  <h2 className="text-2xl font-bold mb-2" style={{ color: COLORS.depth }}>Payment Methods</h2>
                  <p className="text-gray-600">وسائل الدفع المحفوظة</p>
                </div>

                {SAVED_CARDS.map((card, index) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center"
                          style={{ backgroundColor: COLORS.clarity }}
                        >
                          <CreditCard className="w-7 h-7" style={{ color: COLORS.growth }} />
                        </div>
                        <div>
                          <p className="font-bold" style={{ color: COLORS.depth }}>
                            {card.type} •••• {card.last4}
                          </p>
                          <p className="text-sm text-gray-500">Expires {card.expiry}</p>
                        </div>
                      </div>
                      {card.isDefault && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          Default
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}

                <button
                  className="w-full py-4 rounded-2xl font-bold border-2 border-dashed transition-all active:scale-95"
                  style={{ borderColor: COLORS.growth, color: COLORS.growth }}
                >
                  + Add New Card
                </button>
              </motion.div>
            )}

            {activeTab === 'addresses' && (
              <motion.div
                key="addresses"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="bg-white rounded-3xl p-6 shadow-lg mb-4">
                  <h2 className="text-2xl font-bold mb-2" style={{ color: COLORS.depth }}>Saved Addresses</h2>
                  <p className="text-gray-600">العناوين المحفوظة</p>
                </div>

                {SAVED_ADDRESSES.map((address, index) => (
                  <motion.div
                    key={address.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: COLORS.clarity }}
                        >
                          <MapPin className="w-7 h-7" style={{ color: COLORS.growth }} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-bold" style={{ color: COLORS.depth }}>{address.label}</p>
                            <span className="text-sm text-gray-500" dir="rtl">• {address.labelAr}</span>
                          </div>
                          <p className="text-gray-600 mb-1">{address.address}</p>
                          <p className="text-sm text-gray-500">{address.city}</p>
                        </div>
                      </div>
                      {address.isDefault && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          Default
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}

                <button
                  className="w-full py-4 rounded-2xl font-bold border-2 border-dashed transition-all active:scale-95"
                  style={{ borderColor: COLORS.growth, color: COLORS.growth }}
                >
                  + Add New Address
                </button>
              </motion.div>
            )}

            {activeTab === 'rewards' && (
              <motion.div
                key="rewards"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                {/* Loyalty Points Card */}
                <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-3xl p-8 shadow-xl text-white">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-sm opacity-80 mb-1">Your Points</p>
                      <p className="text-5xl font-bold">{loyaltyPoints.toLocaleString()}</p>
                    </div>
                    <Trophy className="w-16 h-16 opacity-80" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-80">Member Status</p>
                      <p className="text-xl font-bold">{membershipTier}</p>
                    </div>
                    <button className="px-6 py-3 bg-white text-green-700 rounded-xl font-semibold active:scale-95 transition-all">
                      Redeem
                    </button>
                  </div>
                </div>

                {/* Available Rewards */}
                <div className="bg-white rounded-3xl p-6 shadow-lg">
                  <h3 className="font-bold text-lg mb-4" style={{ color: COLORS.depth }}>Available Rewards</h3>
                  <div className="space-y-3">
                    {[
                      { points: 500, reward: '10% off next service', icon: '🎁' },
                      { points: 1000, reward: 'Free AC cleaning', icon: '❄️' },
                      { points: 2000, reward: 'Premium membership upgrade', icon: '⭐' }
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 rounded-2xl border-2 border-gray-200 hover:border-green-500 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{item.icon}</span>
                          <div>
                            <p className="font-semibold" style={{ color: COLORS.depth }}>{item.reward}</p>
                            <p className="text-sm text-gray-500">{item.points} points</p>
                          </div>
                        </div>
                        <button
                          disabled={loyaltyPoints < item.points}
                          className="px-4 py-2 rounded-xl font-semibold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{
                            backgroundColor: loyaltyPoints >= item.points ? COLORS.growth : '#e5e7eb',
                            color: loyaltyPoints >= item.points ? 'white' : '#9ca3af'
                          }}
                        >
                          Claim
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="bg-white rounded-3xl p-6 shadow-lg mb-4">
                  <h2 className="text-2xl font-bold mb-2" style={{ color: COLORS.depth }}>Settings</h2>
                  <p className="text-gray-600">الإعدادات</p>
                </div>

                {/* Notifications */}
                <div className="bg-white rounded-3xl p-6 shadow-lg">
                  <h3 className="font-bold text-lg mb-4" style={{ color: COLORS.depth }}>Notifications</h3>
                  <div className="space-y-4">
                    {Object.entries(notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold capitalize" style={{ color: COLORS.depth }}>{key} Notifications</p>
                          <p className="text-sm text-gray-500">Receive {key} updates</p>
                        </div>
                        <button
                          onClick={() => setNotifications({ ...notifications, [key]: !value })}
                          className={`relative w-14 h-8 rounded-full transition-all ${
                            value ? '' : 'bg-gray-300'
                          }`}
                          style={value ? { backgroundColor: COLORS.growth } : {}}
                        >
                          <div
                            className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all ${
                              value ? 'right-1' : 'left-1'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* App Preferences */}
                <div className="bg-white rounded-3xl p-6 shadow-lg">
                  <h3 className="font-bold text-lg mb-4" style={{ color: COLORS.depth }}>App Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="font-semibold" style={{ color: COLORS.depth }}>Language</p>
                          <p className="text-sm text-gray-500">اللغة</p>
                        </div>
                      </div>
                      <select className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0">
                        <option value="en">English</option>
                        <option value="ar">العربية</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {darkMode ? <Moon className="w-5 h-5 text-gray-600" /> : <Sun className="w-5 h-5 text-gray-600" />}
                        <div>
                          <p className="font-semibold" style={{ color: COLORS.depth }}>Dark Mode</p>
                          <p className="text-sm text-gray-500">الوضع الليلي</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setDarkMode(!darkMode)}
                        className={`relative w-14 h-8 rounded-full transition-all ${
                          darkMode ? '' : 'bg-gray-300'
                        }`}
                        style={darkMode ? { backgroundColor: COLORS.growth } : {}}
                      >
                        <div
                          className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all ${
                            darkMode ? 'right-1' : 'left-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Account;
