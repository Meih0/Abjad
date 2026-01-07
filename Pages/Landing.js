import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  Package,
  ClipboardList,
  Map,
  Store,
  ArrowRight,
  Check,
  Zap,
  Shield,
  Smartphone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }
};

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Map,
      title: 'Digital Twin',
      description: 'Interactive 3D floor plan of your home with real-time asset tracking',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Package,
      title: 'Asset Management',
      description: 'Track all your appliances with OCR receipt scanning and warranty monitoring',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: ClipboardList,
      title: 'Smart Tasks',
      description: 'Automated maintenance schedules and task management for your home',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Store,
      title: 'Service Marketplace',
      description: 'Book trusted service providers for repairs and maintenance',
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  const benefits = [
    'Never miss warranty expiration dates',
    'Automatic maintenance reminders',
    'Track all home expenses in one place',
    'Quick access to service providers',
    'Visual home organization'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEF5E8] via-white to-[#FEF5E8]">
      {/* Hero Section */}
      <motion.header
        className="relative overflow-hidden"
        {...ANIMATION_VARIANTS.fadeIn}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-[#005143] to-[#41E661] rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
                <Home className="h-12 w-12 text-white" />
              </div>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Welcome to <span className="text-[#005143]">Home Twin</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Your intelligent home management system that keeps track of everything,
              so you don't have to.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                size="lg"
                className="bg-[#005143] hover:bg-[#003d33] text-white px-8 py-6 text-lg rounded-2xl shadow-xl"
                onClick={() => navigate('/home')}
              >
                Explore Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-[#005143] text-[#005143] hover:bg-[#005143] hover:text-white px-8 py-6 text-lg rounded-2xl"
                onClick={() => window.scrollTo({ top: document.getElementById('features').offsetTop, behavior: 'smooth' })}
              >
                Learn More
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#41E661] rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#005143] rounded-full opacity-20 blur-3xl"></div>
        </div>
      </motion.header>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Manage Your Home
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to make home management effortless
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-4`}>
                      <feature.icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-[#005143] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Why Choose Home Twin?
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-6 h-6 bg-[#41E661] rounded-full flex items-center justify-center shrink-0 mt-1">
                      <Check className="h-4 w-4 text-[#005143]" />
                    </div>
                    <p className="text-lg">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Zap, label: 'Fast & Easy', value: '100%' },
                { icon: Shield, label: 'Secure', value: '24/7' },
                { icon: Smartphone, label: 'Mobile Ready', value: 'Yes' },
                { icon: Home, label: 'Smart Home', value: 'AI' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <stat.icon className="h-8 w-8 mx-auto mb-3 text-[#41E661]" />
                  <p className="text-2xl font-bold mb-1">{stat.value}</p>
                  <p className="text-sm opacity-90">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#FEF5E8] to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Try the demo and see how Home Twin can transform your home management
            </p>
            <Button
              size="lg"
              className="bg-[#005143] hover:bg-[#003d33] text-white px-12 py-6 text-lg rounded-2xl shadow-xl"
              onClick={() => navigate('/home')}
            >
              Launch Demo App
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2026 Home Twin. Your intelligent home management companion.
          </p>
        </div>
      </footer>
    </div>
  );
}
