import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Home, Sparkles, Shield, Clock, CheckCircle, Users, Building2, TrendingUp, Award } from 'lucide-react';

// Hawaz Brand Colors
const COLORS = {
  growth: '#005143',
  innovation: '#41E661',
  clarity: '#FEF5E8',
  depth: '#121B22',
  strategy: '#F47D42'
};

// Animated Counter Component
function AnimatedCounter({ end, duration = 2, suffix = '' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

function Landing() {
  const features = [
    {
      icon: Home,
      title: 'Digital Twin',
      titleAr: 'التوأم الرقمي',
      description: 'Interactive floor plan with real-time task tracking',
      descriptionAr: 'مخطط تفاعلي للمنزل مع تتبع المهام لحظياً'
    },
    {
      icon: Sparkles,
      title: 'Smart Management',
      titleAr: 'إدارة ذكية',
      description: 'Simplified scheduling and comprehensive asset tracking',
      descriptionAr: 'جدولة مبسطة وتتبع شامل للأصول'
    },
    {
      icon: Shield,
      title: 'Trusted Partners',
      titleAr: 'شركاء موثوقون',
      description: 'Verified service providers across Saudi Arabia',
      descriptionAr: 'مزودو خدمات معتمدون في جميع أنحاء المملكة'
    },
    {
      icon: Clock,
      title: 'Save Time',
      titleAr: 'وفّر الوقت',
      description: 'Streamline your home maintenance',
      descriptionAr: 'تبسيط صيانة منزلك'
    }
  ];

  const coreValues = [
    {
      title: 'Excellence',
      titleAr: 'التميز',
      description: 'We deliver world-class home management solutions',
      descriptionAr: 'نقدم حلول إدارة منزلية عالمية المستوى',
      color: COLORS.growth
    },
    {
      title: 'Innovation',
      titleAr: 'الابتكار',
      description: 'Leveraging cutting-edge digital twin technology',
      descriptionAr: 'نستفيد من تقنية التوأم الرقمي المتطورة',
      color: COLORS.innovation
    },
    {
      title: 'Trust',
      titleAr: 'الثقة',
      description: 'Building lasting relationships with homeowners',
      descriptionAr: 'بناء علاقات دائمة مع أصحاب المنازل',
      color: COLORS.strategy
    }
  ];

  const methodology = [
    {
      number: 'أ',
      title: 'Assess',
      titleAr: 'تقييم',
      description: 'Create your digital home twin and catalog all assets',
      descriptionAr: 'إنشاء توأم منزلك الرقمي وتصنيف جميع الأصول'
    },
    {
      number: 'ب',
      title: 'Build',
      titleAr: 'بناء',
      description: 'Structure maintenance schedules and task workflows',
      descriptionAr: 'تنظيم جداول الصيانة وسير عمل المهام'
    },
    {
      number: 'ج',
      title: 'Connect',
      titleAr: 'ربط',
      description: 'Access verified service providers in your area',
      descriptionAr: 'الوصول إلى مزودي خدمات معتمدين في منطقتك'
    },
    {
      number: 'د',
      title: 'Deliver',
      titleAr: 'تنفيذ',
      description: 'Experience seamless home management and peace of mind',
      descriptionAr: 'تجربة إدارة منزلية سلسة وراحة البال'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Inspired by Hawaz.sa */}
      <section className="relative overflow-hidden min-h-screen flex items-center" style={{ backgroundColor: COLORS.growth }}>
        {/* Subtle Pattern Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, ${COLORS.innovation} 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-5 py-20 md:py-32 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Logo and Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-10"
              >
                <div className="bg-white rounded-3xl p-8 shadow-2xl inline-block">
                  <img
                    src="/Abjad/images/Full Abjad Logo.png"
                    alt="Abjad Logo"
                    className="h-20 md:h-28 w-auto"
                  />
                </div>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              >
                <span className="block mb-3" dir="rtl">أبجديات إدارة المنزل</span>
                <span className="block text-3xl md:text-5xl lg:text-6xl" style={{ color: COLORS.innovation }}>
                  The Fundamentals of Home Management
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-lg md:text-xl text-white/80 mb-8 max-w-xl leading-relaxed"
              >
                Master your home with digital twin technology, smart task management,
                and trusted service providers across Saudi Arabia.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 relative z-20"
              >
                <Link to="/home">
                  <button
                    className="group font-bold text-lg px-8 py-4 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-3 justify-center w-full sm:w-auto"
                    style={{ backgroundColor: COLORS.innovation, color: COLORS.depth }}
                  >
                    ابدأ الآن | Get Started
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </motion.div>

              {/* Hawaz Subsidiary Badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="mt-12 flex items-center gap-3"
              >
                <div className="h-px w-12 bg-white/30" />
                <p className="text-white/60 text-sm font-medium">A subsidiary of</p>
                <img src="/Abjad/images/Hawaz Logo.png" alt="Hawaz Consulting" className="h-7 opacity-90" />
              </motion.div>
            </motion.div>

            {/* Right Column - Stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { value: 500, suffix: '+', label: 'Homes Managed', labelAr: 'منزل تحت الإدارة' },
                { value: 95, suffix: '%', label: 'Satisfaction Rate', labelAr: 'معدل الرضا' },
                { value: 1200, suffix: '+', label: 'Tasks Completed', labelAr: 'مهمة مكتملة' },
                { value: 50, suffix: '+', label: 'Trusted Partners', labelAr: 'شريك موثوق' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: COLORS.innovation }}>
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-white/90 font-semibold text-sm">{stat.label}</div>
                  <div className="text-white/60 text-xs mt-1" dir="rtl">{stat.labelAr}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Modern Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path
              d="M0,64 C240,100 480,120 720,100 C960,80 1200,40 1440,64 L1440,120 L0,120 Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block mb-6">
                <span className="text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full" style={{ backgroundColor: COLORS.clarity, color: COLORS.growth }}>
                  من نحن | About Us
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: COLORS.depth }}>
                <span className="block mb-2" dir="rtl">نعلّمك الأبجديات</span>
                <span className="block">We Teach the ABCs</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Just as "أبجد" represents the fundamental building blocks of the Arabic language,
                Abjad provides the essential foundation for mastering home management.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed" dir="rtl">
                كما تمثل "أبجد" الأساسيات الأولى للغة العربية، توفر أبجد الأساس الضروري لإتقان إدارة المنزل.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 gap-6"
            >
              {[
                { icon: Award, text: 'Saudi Arabia\'s premier home management platform', textAr: 'منصة إدارة المنازل الرائدة في المملكة' },
                { icon: Building2, text: 'Powered by Hawaz Consulting expertise', textAr: 'مدعومة بخبرة استشارات هواز' },
                { icon: CheckCircle, text: 'Comprehensive digital twin technology', textAr: 'تقنية التوأم الرقمي الشاملة' }
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300"
                  style={{ backgroundColor: index === 1 ? COLORS.clarity : 'white' }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: COLORS.growth }}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1" style={{ color: COLORS.depth }}>{item.text}</p>
                    <p className="text-sm text-gray-600" dir="rtl">{item.textAr}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 md:py-28" style={{ backgroundColor: COLORS.clarity }}>
        <div className="max-w-7xl mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-6">
              <span className="text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full bg-white" style={{ color: COLORS.growth }}>
                قيمنا | Our Values
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: COLORS.depth }}>
              <span className="block mb-2" dir="rtl">القيم الأساسية</span>
              <span className="block">Core Principles</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md"
                  style={{ backgroundColor: value.color }}
                >
                  <div className="text-2xl font-bold text-white">{index + 1}</div>
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: COLORS.depth }}>
                  {value.title}
                  <span className="block text-lg mt-1 opacity-70" dir="rtl">{value.titleAr}</span>
                </h3>
                <p className="text-gray-600 mb-3">{value.description}</p>
                <p className="text-gray-600 text-sm" dir="rtl">{value.descriptionAr}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-6">
              <span className="text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full" style={{ backgroundColor: COLORS.clarity, color: COLORS.growth }}>
                المميزات | Features
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: COLORS.depth }}>
              <span className="block mb-2" dir="rtl">لماذا تختار أبجد؟</span>
              <span className="block">Why Choose Abjad?</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to master home management in one comprehensive platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-gray-100 hover:border-gray-200"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-md"
                  style={{ backgroundColor: COLORS.growth }}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: COLORS.depth }}>
                  {feature.title}
                  <span className="block text-sm mt-1 opacity-70" dir="rtl">{feature.titleAr}</span>
                </h3>
                <p className="text-gray-600 text-sm mb-2">{feature.description}</p>
                <p className="text-gray-600 text-xs" dir="rtl">{feature.descriptionAr}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section - The ABC Process */}
      <section className="relative overflow-hidden py-20 md:py-28" style={{ backgroundColor: COLORS.growth }}>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, ${COLORS.innovation} 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-5 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-6">
              <span className="text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white">
                منهجيتنا | Our Methodology
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="block mb-2" dir="rtl">منهجية أبجد</span>
              <span className="block">The Abjad Process</span>
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Learn the fundamentals step by step - من الألف إلى الياء
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {methodology.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="text-center"
              >
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 h-full">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg text-3xl font-bold"
                    style={{ backgroundColor: COLORS.innovation, color: COLORS.depth }}
                  >
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {step.title}
                    <span className="block text-lg mt-1 opacity-80" dir="rtl">{step.titleAr}</span>
                  </h3>
                  <p className="text-white/70 mb-3">{step.description}</p>
                  <p className="text-white/60 text-sm" dir="rtl">{step.descriptionAr}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16 relative z-20"
          >
            <Link to="/home">
              <button
                className="group font-bold text-xl px-10 py-5 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center gap-3"
                style={{ backgroundColor: COLORS.innovation, color: COLORS.depth }}
              >
                <span>ابدأ التعلم | Start Learning</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-5 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <img
                src="/Abjad/images/Full Abjad Logo.png"
                alt="Abjad Logo"
                className="h-16 w-auto mb-6"
              />
              <p className="text-gray-600 mb-4">
                Master the fundamentals of home management with Saudi Arabia's premier digital platform.
              </p>
              <p className="text-gray-600 text-sm" dir="rtl">
                إتقان أساسيات إدارة المنزل مع المنصة الرقمية الرائدة في المملكة.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4" style={{ color: COLORS.depth }}>Quick Links</h4>
              <ul className="space-y-2">
                {['Home', 'Digital Twin', 'Assets', 'Tasks', 'Marketplace'].map((item) => (
                  <li key={item}>
                    <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="text-gray-600 hover:text-gray-900 transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4" style={{ color: COLORS.depth }}>About</h4>
              <p className="text-gray-600 mb-4">A subsidiary of Hawaz Consulting, bringing world-class management solutions to Saudi homes.</p>
              <img src="/Abjad/images/Hawaz Logo.png" alt="Hawaz Consulting" className="h-8 opacity-90" />
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-sm">
              © 2024 Abjad. All rights reserved.
            </p>
            <img src="/Abjad/images/Hawaz Logo.png" alt="Hawaz Consulting" className="h-6 opacity-80" />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
