import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ClipboardList, CheckCircle, Clock, User, ChevronRight, Plus, X,
  Calendar, MapPin, Tag, TrendingUp, Sparkles, Filter, Search
} from 'lucide-react';

// Hawaz Brand Colors
const COLORS = {
  growth: '#005143',
  innovation: '#41E661',
  clarity: '#FEF5E8',
  depth: '#121B22',
  strategy: '#F47D42'
};

const INITIAL_TASKS = [
  {
    id: 1,
    title: 'Clean AC filters - Living Room',
    room: 'Living Room',
    assignee: 'نظافة الرياض',
    assigneeEn: 'Riyadh CleanPro',
    dueDate: '2024-01-09',
    dueTime: '2:00 PM',
    status: 'pending',
    category: 'cleaning',
    priority: 'high',
    estimatedCost: 150
  },
  {
    id: 2,
    title: 'Fix leaking kitchen faucet',
    room: 'Kitchen',
    assignee: 'السباك الماهر',
    assigneeEn: 'Al-Sabbak Al-Mahir',
    dueDate: '2024-01-09',
    dueTime: '4:00 PM',
    status: 'in-progress',
    category: 'maintenance',
    priority: 'high',
    estimatedCost: 250
  },
  {
    id: 3,
    title: 'Replace bedroom light bulbs',
    room: 'Bedroom 1',
    assignee: 'SparkPro',
    assigneeEn: 'SparkPro Electrical',
    dueDate: '2024-01-10',
    dueTime: '10:00 AM',
    status: 'pending',
    category: 'electrical',
    priority: 'medium',
    estimatedCost: 80
  },
  {
    id: 4,
    title: 'Deep clean countertops',
    room: 'Kitchen',
    assignee: 'You',
    assigneeEn: 'You',
    dueDate: '2024-01-08',
    dueTime: '6:00 PM',
    status: 'completed',
    category: 'cleaning',
    priority: 'low',
    estimatedCost: 0
  },
  {
    id: 5,
    title: 'Garden maintenance & watering',
    room: 'Garden',
    assignee: 'حدائق الجنة',
    assigneeEn: 'Hadaiq Al-Jannah',
    dueDate: '2024-01-11',
    dueTime: '7:00 AM',
    status: 'pending',
    category: 'gardening',
    priority: 'medium',
    estimatedCost: 300
  },
  {
    id: 6,
    title: 'Monthly pest control inspection',
    room: 'Entire Home',
    assignee: 'مكافحة الآفات',
    assigneeEn: 'Advanced Pest Control',
    dueDate: '2024-01-12',
    dueTime: '3:00 PM',
    status: 'pending',
    category: 'pest-control',
    priority: 'medium',
    estimatedCost: 450
  }
];

function AddTaskModal({ onClose, onAdd }) {
  const [newTask, setNewTask] = useState({
    title: '',
    room: '',
    assignee: '',
    dueDate: '',
    dueTime: '',
    category: 'cleaning',
    priority: 'medium',
    estimatedCost: 0
  });

  const handleSubmit = () => {
    if (newTask.title && newTask.room && newTask.dueDate) {
      onAdd({
        ...newTask,
        id: Date.now(),
        status: 'pending',
        assigneeEn: newTask.assignee
      });
      onClose();
    }
  };

  return (
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
            <h2 className="text-2xl font-bold" style={{ color: COLORS.depth }}>Add New Task</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.depth }}>Task Title</label>
            <input
              type="text"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0 transition-colors"
              placeholder="e.g., Clean living room windows"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.depth }}>Room</label>
              <input
                type="text"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0 transition-colors"
                placeholder="Living Room"
                value={newTask.room}
                onChange={(e) => setNewTask({ ...newTask, room: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.depth }}>Category</label>
              <select
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0 transition-colors"
                value={newTask.category}
                onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
              >
                <option value="cleaning">Cleaning</option>
                <option value="maintenance">Maintenance</option>
                <option value="electrical">Electrical</option>
                <option value="plumbing">Plumbing</option>
                <option value="gardening">Gardening</option>
                <option value="pest-control">Pest Control</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.depth }}>Assignee</label>
            <input
              type="text"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0 transition-colors"
              placeholder="Service provider or 'You'"
              value={newTask.assignee}
              onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.depth }}>Due Date</label>
              <input
                type="date"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0 transition-colors"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.depth }}>Time</label>
              <input
                type="time"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0 transition-colors"
                value={newTask.dueTime}
                onChange={(e) => setNewTask({ ...newTask, dueTime: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.depth }}>Priority</label>
              <select
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0 transition-colors"
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.depth }}>Cost (SAR)</label>
              <input
                type="number"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0 transition-colors"
                placeholder="0"
                value={newTask.estimatedCost}
                onChange={(e) => setNewTask({ ...newTask, estimatedCost: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!newTask.title || !newTask.room || !newTask.dueDate}
            className="w-full text-white py-4 rounded-2xl font-bold text-lg hover:opacity-90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all active:scale-95 shadow-lg"
            style={{ backgroundColor: !newTask.title || !newTask.room || !newTask.dueDate ? '#d1d5db' : COLORS.growth }}
          >
            Add Task
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Tasks() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCompleteTask = (taskId) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: 'completed' } : t));
  };

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || task.status === filter;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.room.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
  const completedTasks = tasks.filter(t => t.status === 'completed');
  const progress = tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0;
  const totalEstimatedCost = pendingTasks.reduce((sum, task) => sum + task.estimatedCost, 0) +
                            inProgressTasks.reduce((sum, task) => sum + task.estimatedCost, 0);

  const getCategoryColor = (category) => {
    const colors = {
      cleaning: COLORS.innovation,
      maintenance: COLORS.strategy,
      electrical: '#FFB800',
      plumbing: '#0096FF',
      gardening: '#10B981',
      'pest-control': '#EF4444'
    };
    return colors[category] || COLORS.growth;
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      high: { bg: '#FEE2E2', text: '#991B1B', label: 'High' },
      medium: { bg: '#FEF3C7', text: '#92400E', label: 'Medium' },
      low: { bg: '#DBEAFE', text: '#1E40AF', label: 'Low' }
    };
    return badges[priority] || badges.medium;
  };

  return (
    <div className="min-h-screen p-4 md:p-8 pb-24 lg:pb-8" style={{ backgroundColor: COLORS.clarity }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: COLORS.depth }}>My Tasks</h1>
            <p className="text-gray-600">Manage your home maintenance and cleaning schedule</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl text-white font-bold shadow-lg hover:opacity-90 transition-all active:scale-95"
            style={{ backgroundColor: COLORS.growth }}
          >
            <Plus className="w-5 h-5" />
            <span className="hidden md:inline">Add Task</span>
          </button>
        </div>
      </motion.div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-4 shadow-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${COLORS.growth}20` }}>
              <ClipboardList className="w-5 h-5" style={{ color: COLORS.growth }} />
            </div>
          </div>
          <p className="text-2xl font-bold" style={{ color: COLORS.depth }}>{tasks.length}</p>
          <p className="text-xs text-gray-600 font-medium">Total Tasks</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl p-4 shadow-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${COLORS.innovation}20` }}>
              <TrendingUp className="w-5 h-5" style={{ color: COLORS.growth }} />
            </div>
          </div>
          <p className="text-2xl font-bold" style={{ color: COLORS.depth }}>{Math.round(progress)}%</p>
          <p className="text-xs text-gray-600 font-medium">Completion</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-4 shadow-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-green-100">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-bold" style={{ color: COLORS.depth }}>{completedTasks.length}</p>
          <p className="text-xs text-gray-600 font-medium">Completed</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-2xl p-4 shadow-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${COLORS.strategy}20` }}>
              <Sparkles className="w-5 h-5" style={{ color: COLORS.strategy }} />
            </div>
          </div>
          <p className="text-2xl font-bold" style={{ color: COLORS.depth }}>{totalEstimatedCost} SAR</p>
          <p className="text-xs text-gray-600 font-medium">Estimated Cost</p>
        </motion.div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-3xl p-4 shadow-lg mb-6">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0 transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="overflow-x-auto pb-2 -mb-2">
            <div className="flex gap-2 min-w-max md:min-w-0">
              {['all', 'pending', 'in-progress', 'completed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`snap-start px-4 py-3 rounded-xl font-semibold text-sm whitespace-nowrap transition-all duration-200 min-w-[100px] active:scale-95 ${
                    filter === status ? 'text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  style={filter === status ? { backgroundColor: COLORS.growth } : {}}
                >
                  {status === 'all' ? 'All' : status === 'in-progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredTasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-white rounded-3xl shadow-lg hover:shadow-xl active:scale-[0.99] transition-all overflow-hidden ${
                task.status === 'completed' ? 'opacity-60' : ''
              }`}
            >
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md"
                    style={{ backgroundColor: getCategoryColor(task.category) }}
                  >
                    <ClipboardList className="w-6 h-6 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className={`font-bold text-lg ${task.status === 'completed' ? 'line-through' : ''}`} style={{ color: COLORS.depth }}>
                        {task.title}
                      </h3>
                      {task.status !== 'completed' && (
                        <button
                          onClick={() => handleCompleteTask(task.id)}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl text-white font-semibold hover:opacity-90 transition-all active:scale-95"
                          style={{ backgroundColor: COLORS.innovation }}
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span className="hidden md:inline">Complete</span>
                        </button>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-sm mb-3">
                      <div className="flex items-center gap-1 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{task.room}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <User className="w-4 h-4" />
                        <span>{task.assigneeEn}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(task.dueDate).toLocaleDateString('en-GB')}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{task.dueTime}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-bold"
                        style={{
                          backgroundColor: getPriorityBadge(task.priority).bg,
                          color: getPriorityBadge(task.priority).text
                        }}
                      >
                        {getPriorityBadge(task.priority).label} Priority
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700">
                        {task.category.replace('-', ' ')}
                      </span>
                      {task.estimatedCost > 0 && (
                        <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: `${COLORS.growth}20`, color: COLORS.growth }}>
                          {task.estimatedCost} SAR
                        </span>
                      )}
                      {task.status === 'in-progress' && (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                          In Progress
                        </span>
                      )}
                      {task.status === 'completed' && (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                          ✓ Completed
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredTasks.length === 0 && (
          <div className="text-center py-12 bg-white rounded-3xl shadow-lg">
            <ClipboardList className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-600 font-medium">No tasks found</p>
            <p className="text-gray-500 text-sm mt-1">Try adjusting your filters or add a new task</p>
          </div>
        )}
      </div>

      {/* Add Task Modal */}
      <AnimatePresence>
        {showAddModal && (
          <AddTaskModal
            onClose={() => setShowAddModal(false)}
            onAdd={handleAddTask}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
