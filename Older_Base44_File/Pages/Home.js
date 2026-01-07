import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { 
  Home as HomeIcon, 
  Map, 
  Package, 
  ClipboardList, 
  Store, 
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Clock,
  Wrench
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { format } from 'date-fns';

const NAV_ITEMS = [
  { 
    name: 'Digital Twin', 
    page: 'DigitalTwin', 
    icon: Map, 
    color: 'bg-[#005143]',
    description: 'Interactive floor plan'
  },
  { 
    name: 'My Tasks', 
    page: 'MyTasks', 
    icon: ClipboardList, 
    color: 'bg-[#41E661]',
    description: 'Task assignments'
  },
  { 
    name: 'Assets', 
    page: 'Assets', 
    icon: Package, 
    color: 'bg-[#005143]',
    description: 'Appliances & items'
  },
  { 
    name: 'Marketplace', 
    page: 'Marketplace', 
    icon: Store, 
    color: 'bg-[#41E661]',
    description: 'Service providers'
  },
];

export default function Home() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    base44.auth.me().then(setCurrentUser).catch(() => {});
  }, []);

  const { data: tasks = [] } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => base44.entities.Task.list()
  });

  const { data: rooms = [] } = useQuery({
    queryKey: ['rooms'],
    queryFn: () => base44.entities.Room.list()
  });

  const { data: assets = [] } = useQuery({
    queryKey: ['assets'],
    queryFn: () => base44.entities.Asset.list()
  });

  // Stats
  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const inProgressTasks = tasks.filter(t => t.status === 'in_progress');
  const completedToday = tasks.filter(t => 
    t.status === 'completed' && 
    t.completed_at && 
    format(new Date(t.completed_at), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
  );
  const urgentTasks = tasks.filter(t => t.priority === 'urgent' && t.status !== 'completed');
  const needsMaintenance = assets.filter(a => a.status === 'needs_maintenance');

  const totalTasks = tasks.filter(t => t.status !== 'cancelled').length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const overallProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#FEF5E8]">
      {/* Header - App Style */}
      <header className="bg-[#005143] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6TTI0IDM2YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-20" />
        <div className="max-w-6xl mx-auto px-5 pt-12 pb-8 relative">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-white/80 text-sm font-medium mb-1">Welcome back</p>
              <h1 className="text-3xl font-bold tracking-tight">
                {currentUser?.full_name?.split(' ')[0] || 'User'} 👋
              </h1>
            </div>
            <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-lg">
              <HomeIcon className="h-6 w-6" />
            </div>
          </div>

          {/* Quick Stats - Card Style */}
          <div className="grid grid-cols-2 gap-3">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#41E661]/20 backdrop-blur-xl rounded-3xl p-4 shadow-lg border border-[#41E661]/30"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-[#41E661]/30 rounded-xl flex items-center justify-center">
                  <Map className="h-4 w-4 text-white" />
                </div>
              </div>
              <p className="text-3xl font-bold">{rooms.length}</p>
              <p className="text-white/90 text-sm font-medium">Rooms</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="bg-white/15 backdrop-blur-xl rounded-3xl p-4 shadow-lg"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                  <ClipboardList className="h-4 w-4 text-white" />
                </div>
              </div>
              <p className="text-3xl font-bold">{pendingTasks.length + inProgressTasks.length}</p>
              <p className="text-white/90 text-sm font-medium">Active Tasks</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/15 backdrop-blur-xl rounded-3xl p-4 shadow-lg"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                  <Package className="h-4 w-4 text-white" />
                </div>
              </div>
              <p className="text-3xl font-bold">{assets.length}</p>
              <p className="text-white/90 text-sm font-medium">Assets</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white/15 backdrop-blur-xl rounded-3xl p-4 shadow-lg"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
              </div>
              <p className="text-3xl font-bold">{completedToday.length}</p>
              <p className="text-white/90 text-sm font-medium">Done Today</p>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-5 -mt-4">
        {/* Progress Card - App Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-gradient-to-br from-white to-gray-50 shadow-xl border-0 mb-5 rounded-3xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Your Progress</p>
                  <h2 className="text-3xl font-bold text-gray-900 mt-1">{overallProgress}%</h2>
                </div>
                <div className="relative w-16 h-16">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="#f0f0f0"
                      strokeWidth="6"
                      fill="none"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="url(#gradient)"
                      strokeWidth="6"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${overallProgress * 1.76} 176`}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#005143" />
                        <stop offset="100%" stopColor="#41E661" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className="bg-gray-100 rounded-2xl h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${overallProgress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-[#41E661] rounded-2xl"
                />
              </div>
              <p className="text-sm text-gray-500 mt-3 font-medium">
                {completedTasks} of {totalTasks} tasks completed
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation Grid - Modern Cards */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 px-1">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {NAV_ITEMS.map((item, index) => (
              <motion.div
                key={item.page}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={createPageUrl(item.page)}>
                  <Card className="bg-white hover:shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer border-0 shadow-lg rounded-3xl h-full overflow-hidden">
                    <CardContent className="p-5">
                      <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mb-3 shadow-lg`}>
                        <item.icon className="h-7 w-7 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900 text-base">{item.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Alerts Section - Modern Style */}
        {(urgentTasks.length > 0 || needsMaintenance.length > 0) && (
          <>
            <h3 className="text-lg font-bold text-gray-900 mb-4 px-1">Attention Needed</h3>
            <div className="grid md:grid-cols-2 gap-3 mb-6">
              {/* Urgent Tasks */}
              {urgentTasks.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Card className="bg-[#121B22] border-0 shadow-xl rounded-3xl overflow-hidden text-white">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                          <AlertCircle className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold">Urgent Tasks</h3>
                          <p className="text-sm text-white/80">{urgentTasks.length} items</p>
                        </div>
                        <ChevronRight className="h-5 w-5" />
                      </div>
                      <div className="space-y-2">
                        {urgentTasks.slice(0, 2).map(task => (
                          <div key={task.id} className="bg-white/10 backdrop-blur rounded-2xl p-3">
                            <p className="font-medium text-sm">{task.title}</p>
                            {task.room_id && (
                              <p className="text-xs text-white/70 mt-1">
                                📍 {rooms.find(r => r.id === task.room_id)?.name || 'Unknown'}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Maintenance Alerts */}
              {needsMaintenance.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Card className="bg-[#005143] border-0 shadow-xl rounded-3xl overflow-hidden text-white">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                          <Wrench className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold">Maintenance</h3>
                          <p className="text-sm text-white/80">{needsMaintenance.length} items</p>
                        </div>
                        <ChevronRight className="h-5 w-5" />
                      </div>
                      <div className="space-y-2">
                        {needsMaintenance.slice(0, 2).map(asset => (
                          <div key={asset.id} className="bg-white/10 backdrop-blur rounded-2xl p-3">
                            <p className="font-medium text-sm">{asset.name}</p>
                            <p className="text-xs text-white/70 mt-1 capitalize">
                              {asset.asset_type?.replace('_', ' ')}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </>
        )}

        {/* Recent Activity */}
        <h3 className="text-lg font-bold text-gray-900 mb-4 px-1">Recent Activity</h3>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-white border-0 shadow-lg mb-6 rounded-3xl">
            <CardContent className="p-5">
              {tasks.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-3">
                    <ClipboardList className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-sm font-medium">No tasks yet</p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {tasks.slice(0, 5).map((task, idx) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-center gap-3 p-3.5 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
                    >
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm ${
                        task.status === 'completed' 
                          ? 'bg-[#41E661]' 
                          : task.status === 'in_progress'
                          ? 'bg-[#005143]'
                          : 'bg-gray-300'
                      }`}>
                        {task.status === 'completed' ? (
                          <CheckCircle className="h-5 w-5 text-white" />
                        ) : task.status === 'in_progress' ? (
                          <Clock className="h-5 w-5 text-white" />
                        ) : (
                          <Clock className="h-5 w-5 text-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm truncate">
                          {task.title}
                        </p>
                        <p className="text-xs text-gray-500 capitalize font-medium">
                          {task.task_type?.replace('_', ' ')}
                        </p>
                      </div>
                      <Badge 
                        className={`rounded-full px-3 ${
                          task.status === 'completed' 
                            ? 'bg-green-100 text-green-700'
                            : task.status === 'in_progress'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {task.status === 'completed' ? '✓' : task.status === 'in_progress' ? '...' : '○'}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}