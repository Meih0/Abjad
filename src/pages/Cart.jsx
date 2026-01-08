import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Trash2, Plus, Minus, CreditCard, Wallet, MapPin, Gift, Tag, CheckCircle, X, ArrowRight, Package, Truck } from 'lucide-react';

// Hawaz Brand Colors
const COLORS = {
  growth: '#005143',
  innovation: '#41E661',
  clarity: '#FEF5E8',
  depth: '#121B22',
  strategy: '#F47D42'
};

// Initial cart items with Saudi context
const INITIAL_CART = [
  {
    id: 1,
    type: 'service',
    name: 'Deep Home Cleaning',
    nameAr: 'تنظيف شامل للمنزل',
    provider: 'نظافة الرياض - CleanPro',
    price: 450,
    quantity: 1,
    date: '2024-01-15',
    time: '10:00 AM',
    image: '🧹',
    category: 'cleaning'
  },
  {
    id: 2,
    type: 'service',
    name: 'AC Maintenance',
    nameAr: 'صيانة المكيفات',
    provider: 'صيانة الأجهزة - TechFix',
    price: 280,
    quantity: 2,
    date: '2024-01-16',
    time: '2:00 PM',
    image: '❄️',
    category: 'maintenance'
  },
  {
    id: 3,
    type: 'product',
    name: 'Smart Home Security Camera',
    nameAr: 'كاميرا أمان ذكية',
    provider: 'Abjad Store',
    price: 850,
    quantity: 1,
    image: '📹',
    category: 'product'
  }
];

const PROMO_CODES = {
  'ABJAD10': { discount: 10, type: 'percentage', description: '10% off your order' },
  'WELCOME50': { discount: 50, type: 'fixed', description: 'SAR 50 off' },
  'PREMIUM': { discount: 15, type: 'percentage', description: '15% off for premium members' }
};

function CheckoutModal({ cart, subtotal, discount, onClose, onComplete }) {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const totalAmount = subtotal - discount;

  const handlePlaceOrder = () => {
    const orderNum = `ORD-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;
    setOrderNumber(orderNum);
    setOrderPlaced(true);
    setTimeout(() => {
      onComplete(orderNum);
    }, 3000);
  };

  if (orderPlaced) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center"
            style={{ backgroundColor: COLORS.innovation }}
          >
            <CheckCircle className="w-16 h-16 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold mb-2" style={{ color: COLORS.depth }}>تم! Order Placed!</h2>
          <p className="text-gray-600 mb-2">Your order has been confirmed successfully</p>
          <p className="text-sm text-gray-500 mb-4" dir="rtl">تم تأكيد طلبك بنجاح</p>
          <div className="bg-gray-100 rounded-xl p-3">
            <p className="text-xs text-gray-500 mb-1">Order Number</p>
            <p className="font-mono font-bold text-lg" style={{ color: COLORS.growth }}>{orderNumber}</p>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-3xl w-full max-w-2xl mx-4 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100 sticky top-0 bg-white z-10 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold" style={{ color: COLORS.depth }}>Checkout</h2>
              <p className="text-sm text-gray-500">Step {step} of 3</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex gap-2 mt-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className="flex-1 h-2 rounded-full transition-all"
                style={{ backgroundColor: s <= step ? COLORS.growth : '#e5e7eb' }}
              />
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-bold text-lg mb-4" style={{ color: COLORS.depth }}>Delivery Address</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Full Name | الاسم الكامل"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0"
                />
                <input
                  type="text"
                  placeholder="Phone Number | رقم الهاتف"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0"
                  defaultValue="+966"
                />
                <input
                  type="text"
                  placeholder="Street Address | عنوان الشارع"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="City | المدينة"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0"
                    defaultValue="Riyadh"
                  />
                  <input
                    type="text"
                    placeholder="Postal Code | الرمز البريدي"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-bold text-lg mb-4" style={{ color: COLORS.depth }}>Payment Method</h3>
              <div className="space-y-3">
                {[
                  { id: 'card', icon: CreditCard, label: 'Credit/Debit Card', labelAr: 'بطاقة ائتمان' },
                  { id: 'mada', icon: CreditCard, label: 'Mada Card', labelAr: 'بطاقة مدى' },
                  { id: 'wallet', icon: Wallet, label: 'Apple Pay / STC Pay', labelAr: 'أبل باي / STC باي' },
                  { id: 'cash', icon: Package, label: 'Cash on Delivery', labelAr: 'الدفع عند الاستلام' }
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-3 ${
                      paymentMethod === method.id
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: paymentMethod === method.id ? COLORS.growth : COLORS.clarity }}
                    >
                      <method.icon className="w-6 h-6" style={{ color: paymentMethod === method.id ? 'white' : COLORS.growth }} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold" style={{ color: COLORS.depth }}>{method.label}</p>
                      <p className="text-xs text-gray-500" dir="rtl">{method.labelAr}</p>
                    </div>
                    {paymentMethod === method.id && (
                      <CheckCircle className="w-5 h-5" style={{ color: COLORS.growth }} />
                    )}
                  </button>
                ))}
              </div>

              {(paymentMethod === 'card' || paymentMethod === 'mada') && (
                <div className="mt-4 space-y-3 p-4 bg-gray-50 rounded-2xl">
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-bold text-lg mb-4" style={{ color: COLORS.depth }}>Order Summary</h3>

              {/* Order Items */}
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="text-3xl">{item.image}</div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm" style={{ color: COLORS.depth }}>{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold" style={{ color: COLORS.growth }}>SAR {item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="border-t-2 border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">SAR {subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span className="font-semibold">-SAR {discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">VAT (15%)</span>
                  <span className="font-semibold">SAR {(totalAmount * 0.15).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span style={{ color: COLORS.growth }}>SAR {(totalAmount * 1.15).toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-3xl flex gap-3">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 px-6 py-4 rounded-2xl border-2 font-semibold transition-all active:scale-95"
              style={{ borderColor: COLORS.growth, color: COLORS.growth }}
            >
              Back
            </button>
          )}
          <button
            onClick={() => step === 3 ? handlePlaceOrder() : setStep(step + 1)}
            className="flex-1 px-6 py-4 rounded-2xl font-semibold text-white transition-all active:scale-95 flex items-center justify-center gap-2"
            style={{ backgroundColor: COLORS.growth }}
          >
            {step === 3 ? 'Place Order' : 'Continue'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Cart() {
  const [cart, setCart] = useState(INITIAL_CART);
  const [savedForLater, setSavedForLater] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = appliedPromo
    ? appliedPromo.type === 'percentage'
      ? (subtotal * appliedPromo.discount) / 100
      : appliedPromo.discount
    : 0;
  const total = subtotal - discount;

  const updateQuantity = (id, change) => {
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    ));
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const saveForLater = (id) => {
    const item = cart.find(item => item.id === id);
    if (item) {
      setSavedForLater([...savedForLater, item]);
      setCart(cart.filter(item => item.id !== id));
    }
  };

  const moveToCart = (id) => {
    const item = savedForLater.find(item => item.id === id);
    if (item) {
      setCart([...cart, item]);
      setSavedForLater(savedForLater.filter(item => item.id !== id));
    }
  };

  const applyPromoCode = () => {
    const promo = PROMO_CODES[promoCode.toUpperCase()];
    if (promo) {
      setAppliedPromo(promo);
    }
  };

  const handleCheckoutComplete = (orderNum) => {
    setShowCheckout(false);
    setCart([]);
    setAppliedPromo(null);
    // You could save the order to account history here
  };

  return (
    <div className="min-h-screen p-4 md:p-8 pb-24 lg:pb-8" style={{ backgroundColor: COLORS.clarity }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold mb-2" style={{ color: COLORS.depth }}>
          Shopping Cart | عربة التسوق
        </h1>
        <p className="text-gray-600">{cart.length} items in your cart</p>
      </motion.div>

      {cart.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-12 text-center shadow-lg"
        >
          <ShoppingCart className="w-24 h-24 mx-auto mb-4 text-gray-300" />
          <h2 className="text-2xl font-bold mb-2" style={{ color: COLORS.depth }}>Your cart is empty</h2>
          <p className="text-gray-600 mb-6">عربة التسوق فارغة</p>
          <p className="text-gray-500">Start adding services and products!</p>
        </motion.div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cart.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="flex gap-4">
                    {/* Item Image */}
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-md flex-shrink-0"
                      style={{ backgroundColor: COLORS.clarity }}
                    >
                      {item.image}
                    </div>

                    {/* Item Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg" style={{ color: COLORS.depth }}>{item.name}</h3>
                          <p className="text-sm text-gray-500" dir="rtl">{item.nameAr}</p>
                          <p className="text-xs text-gray-400 mt-1">{item.provider}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => saveForLater(item.id)}
                            className="p-2 hover:bg-blue-50 rounded-xl transition-colors group"
                            title="Save for later"
                          >
                            <Package className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 hover:bg-red-50 rounded-xl transition-colors group"
                            title="Remove"
                          >
                            <Trash2 className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
                          </button>
                        </div>
                      </div>

                      {item.date && (
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                          <MapPin className="w-4 h-4" />
                          <span>{item.date} at {item.time}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center border-2 border-gray-200 hover:border-gray-300 transition-colors active:scale-95"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors active:scale-95"
                            style={{ backgroundColor: COLORS.growth }}
                          >
                            <Plus className="w-4 h-4 text-white" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-2xl font-bold" style={{ color: COLORS.growth }}>
                            SAR {item.price * item.quantity}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-xs text-gray-500">SAR {item.price} each</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Saved for Later */}
            {savedForLater.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4" style={{ color: COLORS.depth }}>
                  Saved for Later ({savedForLater.length})
                </h2>
                <div className="space-y-3">
                  {savedForLater.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-white/60 rounded-3xl p-4 shadow-md"
                    >
                      <div className="flex gap-3">
                        <div
                          className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                          style={{ backgroundColor: COLORS.clarity }}
                        >
                          {item.image}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold" style={{ color: COLORS.depth }}>{item.name}</h3>
                          <p className="text-sm text-gray-600">SAR {item.price}</p>
                        </div>
                        <button
                          onClick={() => moveToCart(item.id)}
                          className="px-4 py-2 rounded-xl font-semibold text-sm transition-all active:scale-95 text-white"
                          style={{ backgroundColor: COLORS.growth }}
                        >
                          Move to Cart
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            {/* Promo Code */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-5 h-5" style={{ color: COLORS.growth }} />
                <h3 className="font-bold" style={{ color: COLORS.depth }}>Promo Code</h3>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0"
                />
                <button
                  onClick={applyPromoCode}
                  className="px-6 py-3 rounded-xl font-semibold text-white transition-all active:scale-95"
                  style={{ backgroundColor: COLORS.growth }}
                >
                  Apply
                </button>
              </div>
              {appliedPromo && (
                <div className="mt-3 p-3 bg-green-50 rounded-xl flex items-center gap-2">
                  <Gift className="w-5 h-5 text-green-600" />
                  <p className="text-sm text-green-700 font-medium">{appliedPromo.description}</p>
                </div>
              )}
              <div className="mt-3 text-xs text-gray-500">
                Try: <span className="font-mono bg-gray-100 px-2 py-1 rounded">ABJAD10</span>
              </div>
            </motion.div>

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl p-6 shadow-lg sticky top-4"
            >
              <h3 className="font-bold text-lg mb-4" style={{ color: COLORS.depth }}>Order Summary</h3>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">SAR {subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-semibold">-SAR {discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>VAT (15%)</span>
                  <span className="font-semibold">SAR {(total * 0.15).toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t-2 border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Total</span>
                  <div className="text-right">
                    <p className="text-3xl font-bold" style={{ color: COLORS.growth }}>
                      SAR {(total * 1.15).toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">Including VAT</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowCheckout(true)}
                className="w-full py-4 rounded-2xl font-bold text-white transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg"
                style={{ backgroundColor: COLORS.growth }}
              >
                <ShoppingCart className="w-5 h-5" />
                Proceed to Checkout
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                <Truck className="w-4 h-4" />
                <span>Free delivery on orders over SAR 200</span>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      <AnimatePresence>
        {showCheckout && (
          <CheckoutModal
            cart={cart}
            subtotal={subtotal}
            discount={discount}
            onClose={() => setShowCheckout(false)}
            onComplete={handleCheckoutComplete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Cart;
