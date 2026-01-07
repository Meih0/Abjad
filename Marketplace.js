import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Store, Search, Filter, Plus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ServiceCard from '@/components/marketplace/ServiceCard';

const SERVICE_TYPES = [
  { value: 'all', label: 'All Services' },
  { value: 'plumbing', label: 'Plumbing' },
  { value: 'electrical', label: 'Electrical' },
  { value: 'hvac', label: 'HVAC' },
  { value: 'cleaning', label: 'Cleaning' },
  { value: 'appliance_repair', label: 'Appliance Repair' },
  { value: 'pest_control', label: 'Pest Control' },
  { value: 'landscaping', label: 'Landscaping' },
  { value: 'painting', label: 'Painting' },
  { value: 'general_maintenance', label: 'General Maintenance' }
];

// Sample providers for demo
const SAMPLE_PROVIDERS = [
  {
    name: 'QuickFix Plumbing',
    service_type: 'plumbing',
    description: 'Professional plumbing services with 24/7 emergency support',
    base_price: 85,
    price_unit: 'per_hour',
    rating: 4.8,
    total_reviews: 234,
    response_time: '< 1 hour',
    availability: 'available'
  },
  {
    name: 'BrightSpark Electrical',
    service_type: 'electrical',
    description: 'Licensed electricians for all residential needs',
    base_price: 95,
    price_unit: 'per_hour',
    rating: 4.9,
    total_reviews: 189,
    response_time: '< 2 hours',
    availability: 'available'
  },
  {
    name: 'CoolAir HVAC',
    service_type: 'hvac',
    description: 'AC repair, installation, and maintenance specialists',
    base_price: 120,
    price_unit: 'per_visit',
    rating: 4.7,
    total_reviews: 156,
    response_time: 'Same day',
    availability: 'busy'
  },
  {
    name: 'SparkleClean Pro',
    service_type: 'cleaning',
    description: 'Deep cleaning and regular maintenance services',
    base_price: 65,
    price_unit: 'per_hour',
    rating: 4.6,
    total_reviews: 312,
    response_time: 'Next day',
    availability: 'available'
  },
  {
    name: 'ApplianceFix Masters',
    service_type: 'appliance_repair',
    description: 'Expert repair for all major appliances',
    base_price: 75,
    price_unit: 'per_visit',
    rating: 4.5,
    total_reviews: 98,
    response_time: '< 4 hours',
    availability: 'available'
  },
  {
    name: 'GreenScape Gardens',
    service_type: 'landscaping',
    description: 'Professional landscaping and lawn care',
    base_price: 150,
    price_unit: 'per_visit',
    rating: 4.8,
    total_reviews: 67,
    response_time: '24 hours',
    availability: 'available'
  }
];

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [isCreatingSamples, setIsCreatingSamples] = useState(false);
  const queryClient = useQueryClient();

  const { data: providers = [], isLoading } = useQuery({
    queryKey: ['service-providers'],
    queryFn: () => base44.entities.ServiceProvider.list()
  });

  const { data: rooms = [] } = useQuery({
    queryKey: ['rooms'],
    queryFn: () => base44.entities.Room.list()
  });

  const handleBookingComplete = () => {
    queryClient.invalidateQueries(['bookings']);
  };

  const createSampleProviders = async () => {
    setIsCreatingSamples(true);
    try {
      await base44.entities.ServiceProvider.bulkCreate(SAMPLE_PROVIDERS);
      queryClient.invalidateQueries(['service-providers']);
    } finally {
      setIsCreatingSamples(false);
    }
  };

  // Filter providers
  const filteredProviders = providers.filter(p => {
    const matchesSearch = !searchQuery || 
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || p.service_type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-[#FEF5E8]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-[#41E661] rounded-2xl flex items-center justify-center shadow-lg">
                <Store className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Marketplace</h1>
                <p className="text-sm text-gray-500 font-medium">{providers.length} service providers</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search & Filters */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search providers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SERVICE_TYPES.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-5 py-6">
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
                <div className="h-16 w-16 bg-gray-100 rounded-2xl mb-4" />
                <div className="h-5 w-40 bg-gray-100 rounded mb-2" />
                <div className="h-4 w-24 bg-gray-100 rounded mb-4" />
                <div className="h-3 w-full bg-gray-100 rounded mb-2" />
                <div className="h-3 w-3/4 bg-gray-100 rounded" />
              </div>
            ))}
          </div>
        ) : providers.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-12 text-center"
          >
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Store className="h-10 w-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Service Providers</h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Get started by adding some sample service providers to the marketplace.
            </p>
            <Button 
              size="lg"
              className="bg-gray-900 hover:bg-gray-800"
              onClick={createSampleProviders}
              disabled={isCreatingSamples}
            >
              {isCreatingSamples ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5 mr-2" />
                  Add Sample Providers
                </>
              )}
            </Button>
          </motion.div>
        ) : filteredProviders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500">No providers match your search criteria.</p>
            <Button 
              variant="link" 
              onClick={() => { setSearchQuery(''); setSelectedType('all'); }}
            >
              Clear filters
            </Button>
          </motion.div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProviders.map((provider, index) => (
              <motion.div
                key={provider.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ServiceCard
                  provider={provider}
                  rooms={rooms}
                  onBookingComplete={handleBookingComplete}
                />
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}