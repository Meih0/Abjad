import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, UserPlus, X, Check, Clock, DollarSign, ShoppingCart, Baby,
  Zap, Wifi, Droplet, Phone, Car, Heart, Edit, Trash2, Calendar,
  CheckCircle, AlertCircle, Home, Briefcase, GraduationCap, Crown
} from 'lucide-react';

// Hawaz Brand Colors
const COLORS = {
  growth: '#005143',
  innovation: '#41E661',
  clarity: '#FEF5E8',
  depth: '#121B22',
  strategy: '#F47D42'
};

// Family members and staff
const INITIAL_MEMBERS = [
  {
    id: 1,
    name: 'Fulan AlFulani',
    nameAr: 'فلان الفلاني',
    role: 'husband',
    avatar: '👨‍💼',
    phone: '+966 50 123 4567',
    responsibilities: ['Living Room', 'Kitchen'],
    tasks: 2
  },
  {
    id: 2,
    name: 'Allan AlAlani',
    nameAr: 'علان العلاني',
    role: 'wife',
    avatar: '👩‍💼',
    phone: '+966 50 765 4321',
    responsibilities: ['Bedroom 1', 'Bathroom'],
    tasks: 3
  },
  {
    id: 3,
    name: 'Fatima (Maid)',
    nameAr: 'فاطمة (خادمة)',
    role: 'maid',
    avatar: '👩‍🍳',
    phone: '+966 55 999 8888',
    responsibilities: ['All Rooms', 'Kitchen', 'Bathroom'],
    tasks: 5,
    salary: 2000,
    nextPayment: '2026-02-01'
  }
];

// Household tasks
const INITIAL_HOUSEHOLD_TASKS = [
  {
    id: 1,
    title: 'Buy groceries for the week',
    titleAr: 'شراء البقالة للأسبوع',
    type: 'groceries',
    assignedTo: 2,
    dueDate: '2026-01-10',
    priority: 'high',
    status: 'pending',
    notes: 'Don\'t forget milk and eggs'
  },
  {
    id: 2,
    title: 'Pay electricity bill',
    titleAr: 'دفع فاتورة الكهرباء',
    type: 'bill',
    assignedTo: 1,
    dueDate: '2026-01-15',
    amount: 450,
    priority: 'high',
    status: 'pending',
    provider: 'SEC'
  },
  {
    id: 3,
    title: 'Sign Ahmed up for kindergarten',
    titleAr: 'تسجيل أحمد في الروضة',
    type: 'kids',
    assignedTo: 2,
    dueDate: '2026-01-12',
    priority: 'urgent',
    status: 'in-progress',
    notes: 'Al-Faisal International School'
  },
  {
    id: 4,
    title: 'Pay fiber optic internet bill',
    titleAr: 'دفع فاتورة الإنترنت',
    type: 'bill',
    assignedTo: 1,
    dueDate: '2026-01-20',
    amount: 299,
    priority: 'medium',
    status: 'pending',
    provider: 'STC Fiber'
  },
  {
    id: 5,
    title: 'Car maintenance appointment',
    titleAr: 'موعد صيانة السيارة',
    type: 'other',
    assignedTo: 1,
    dueDate: '2026-01-18',
    priority: 'medium',
    status: 'pending',
    notes: 'Oil change + tire rotation'
  },
  {
    id: 6,
    title: 'Pay water bill',
    titleAr: 'دفع فاتورة المياه',
    type: 'bill',
    assignedTo: 1,
    dueDate: '2026-01-25',
    amount: 120,
    priority: 'low',
    status: 'pending',
    provider: 'Water Authority'
  }
];

function AddMemberModal({ onClose, onAdd }) {
  const [memberData, setMemberData] = useState({
    name: '',
    nameAr: '',
    role: 'family',
    phone: '+966 ',
    avatar: '👤',
    salary: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (memberData.name) {
      onAdd({
        ...memberData,
        id: Date.now(),
        responsibilities: [],
        tasks: 0,
        salary: memberData.role === 'maid' ? parseInt(memberData.salary) : undefined
      });
      onClose();
    }
  };

  const avatars = ['👨‍💼', '👩‍💼', '👨', '👩', '👦', '👧', '👴', '👵', '👩‍🍳', '👨‍🔧'];

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
        className="bg-white rounded-3xl w-full max-w-md mx-4 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold" style={{ color: COLORS.depth }}>Add Member</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.depth }}>Avatar</label>
              <div className="grid grid-cols-5 gap-2">
                {avatars.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setMemberData({ ...memberData, avatar: emoji })}
                    className={`text-3xl p-3 rounded-2xl transition-all ${
                      memberData.avatar === emoji ? 'bg-green-100 scale-110' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.depth }}>Name</label>
                <input
                  type="text"
                  value={memberData.name}
                  onChange={(e) => setMemberData({ ...memberData, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.depth }}>الاسم</label>
                <input
                  type="text"
                  value={memberData.nameAr}
                  onChange={(e) => setMemberData({ ...memberData, nameAr: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0"
                  dir="rtl"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.depth }}>Role</label>
              <select
                value={memberData.role}
                onChange={(e) => setMemberData({ ...memberData, role: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0"
              >
                <option value="husband">Husband</option>
                <option value="wife">Wife</option>
                <option value="son">Son</option>
                <option value="daughter">Daughter</option>
                <option value="family">Family Member</option>
                <option value="maid">Maid</option>
                <option value="driver">Driver</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.depth }}>Phone</label>
              <input
                type="tel"
                value={memberData.phone}
                onChange={(e) => setMemberData({ ...memberData, phone: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0"
              />
            </div>

            {memberData.role === 'maid' && (
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.depth }}>Monthly Salary (SAR)</label>
                <input
                  type="number"
                  value={memberData.salary}
                  onChange={(e) => setMemberData({ ...memberData, salary: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0"
                  placeholder="2000"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 rounded-2xl font-bold text-white transition-all active:scale-95"
              style={{ backgroundColor: COLORS.growth }}
            >
              Add Member
            </button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}

function AddTaskModal({ members, onClose, onAdd }) {
  const [taskData, setTaskData] = useState({
    title: '',
    titleAr: '',
    type: 'bill',
    assignedTo: members[0]?.id || 1,
    dueDate: '',
    priority: 'medium',
    amount: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskData.title && taskData.dueDate) {
      onAdd({
        ...taskData,
        id: Date.now(),
        status: 'pending',
        amount: taskData.amount ? parseFloat(taskData.amount) : undefined
      });
      onClose();
    }
  };

  const taskTypes = [
    { value: 'bill', label: 'Bill Payment', icon: DollarSign, color: COLORS.strategy },
    { value: 'groceries', label: 'Groceries', icon: ShoppingCart, color: COLORS.innovation },
    { value: 'kids', label: 'Kids', icon: Baby, color: '#FF69B4' },
    { value: 'other', label: 'Other', icon: Home, color: COLORS.growth }
  ];

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
        className="bg-white rounded-3xl w-full max-w-md mx-4 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold" style={{ color: COLORS.depth }}>Add Household Task</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.depth }}>Task Type</label>
              <div className="grid grid-cols-2 gap-3">
                {taskTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setTaskData({ ...taskData, type: type.value })}
                    className={`p-4 rounded-2xl border-2 transition-all ${
                      taskData.type === type.value ? 'border-transparent shadow-lg' : 'border-gray-200'
                    }`}
                    style={taskData.type === type.value ? { backgroundColor: `${type.color}20` } : {}}
                  >
                    <type.icon className="w-6 h-6 mx-auto mb-2" style={{ color: type.color }} />
                    <p className="text-sm font-semibold">{type.label}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.depth }}>Title</label>
                <input
                  type="text"
                  value={taskData.title}
                  onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.depth }}>العنوان</label>
                <input
                  type="text"
                  value={taskData.titleAr}
                  onChange={(e) => setTaskData({ ...taskData, titleAr: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0"
                  dir="rtl"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.depth }}>Assign To</label>
                <select
                  value={taskData.assignedTo}
                  onChange={(e) => setTaskData({ ...taskData, assignedTo: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0"
                >
                  {members.map((member) => (
                    <option key={member.id} value={member.id}>{member.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.depth }}>Priority</label>
                <select
                  value={taskData.priority}
                  onChange={(e) => setTaskData({ ...taskData, priority: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.depth }}>Due Date</label>
                <input
                  type="date"
                  value={taskData.dueDate}
                  onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0"
                  required
                />
              </div>
              {taskData.type === 'bill' && (
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.depth }}>Amount (SAR)</label>
                  <input
                    type="number"
                    value={taskData.amount}
                    onChange={(e) => setTaskData({ ...taskData, amount: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0"
                    placeholder="450"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.depth }}>Notes</label>
              <textarea
                value={taskData.notes}
                onChange={(e) => setTaskData({ ...taskData, notes: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0"
                rows="3"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl font-bold text-white transition-all active:scale-95"
              style={{ backgroundColor: COLORS.growth }}
            >
              Add Task
            </button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Household() {
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [householdTasks, setHouseholdTasks] = useState(INITIAL_HOUSEHOLD_TASKS);
  const [showAddMember, setShowAddMember] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [filter, setFilter] = useState('all');

  const addMember = (memberData) => {
    setMembers([...members, memberData]);
  };

  const addTask = (taskData) => {
    setHouseholdTasks([...householdTasks, taskData]);
  };

  const toggleTaskStatus = (taskId) => {
    setHouseholdTasks(householdTasks.map(task =>
      task.id === taskId
        ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
        : task
    ));
  };

  const getTaskIcon = (type) => {
    switch (type) {
      case 'bill': return DollarSign;
      case 'groceries': return ShoppingCart;
      case 'kids': return Baby;
      default: return Home;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return '#ef4444';
      case 'high': return COLORS.strategy;
      case 'medium': return '#f59e0b';
      case 'low': return '#94a3b8';
      default: return COLORS.growth;
    }
  };

  const filteredTasks = filter === 'all'
    ? householdTasks
    : householdTasks.filter(task => task.status === filter);

  const totalBills = householdTasks
    .filter(t => t.type === 'bill' && t.status === 'pending')
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  return (
    <div className="min-h-screen p-4 md:p-8 pb-24 lg:pb-8" style={{ backgroundColor: COLORS.clarity }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold mb-2" style={{ color: COLORS.depth }}>
          Household Management | إدارة المنزل
        </h1>
        <p className="text-gray-600">Manage family members, staff, and household tasks</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-4 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${COLORS.growth}20` }}>
              <Users className="w-5 h-5" style={{ color: COLORS.growth }} />
            </div>
          </div>
          <p className="text-2xl font-bold" style={{ color: COLORS.depth }}>{members.length}</p>
          <p className="text-xs text-gray-600 font-medium">Total Members</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.05 }}
          className="bg-white rounded-2xl p-4 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${COLORS.strategy}20` }}>
              <DollarSign className="w-5 h-5" style={{ color: COLORS.strategy }} />
            </div>
          </div>
          <p className="text-2xl font-bold" style={{ color: COLORS.depth }}>SAR {totalBills}</p>
          <p className="text-xs text-gray-600 font-medium">Pending Bills</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-4 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-100">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold" style={{ color: COLORS.depth }}>
            {householdTasks.filter(t => t.status === 'pending').length}
          </p>
          <p className="text-xs text-gray-600 font-medium">Active Tasks</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl p-4 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-green-100">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-bold" style={{ color: COLORS.depth }}>
            {householdTasks.filter(t => t.status === 'completed').length}
          </p>
          <p className="text-xs text-gray-600 font-medium">Completed</p>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Members Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold" style={{ color: COLORS.depth }}>Family & Staff</h2>
              <button
                onClick={() => setShowAddMember(true)}
                className="p-2 rounded-xl transition-all active:scale-95"
                style={{ backgroundColor: COLORS.innovation }}
              >
                <UserPlus className="w-5 h-5" style={{ color: COLORS.growth }} />
              </button>
            </div>

            <div className="space-y-3">
              {members.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 rounded-2xl border-2 border-gray-100 hover:border-gray-200 transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-4xl">{member.avatar}</div>
                    <div className="flex-1">
                      <h3 className="font-bold" style={{ color: COLORS.depth }}>{member.name}</h3>
                      <p className="text-xs text-gray-500" dir="rtl">{member.nameAr}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs font-semibold capitalize">
                          {member.role}
                        </span>
                        <span className="text-xs text-gray-500">{member.tasks} tasks</span>
                      </div>
                    </div>
                  </div>

                  {member.salary && (
                    <div className="pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Salary</span>
                        <span className="font-bold" style={{ color: COLORS.growth }}>SAR {member.salary}/mo</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold" style={{ color: COLORS.depth }}>Household Tasks</h2>
              <button
                onClick={() => setShowAddTask(true)}
                className="px-4 py-2 rounded-xl font-semibold text-white transition-all active:scale-95"
                style={{ backgroundColor: COLORS.growth }}
              >
                + Add Task
              </button>
            </div>

            {/* Filter */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {['all', 'pending', 'in-progress', 'completed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition-all ${
                    filter === status ? 'text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                  style={filter === status ? { backgroundColor: COLORS.growth } : {}}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                </button>
              ))}
            </div>

            {/* Tasks List */}
            <div className="space-y-3">
              <AnimatePresence>
                {filteredTasks.map((task, index) => {
                  const Icon = getTaskIcon(task.type);
                  const assignee = members.find(m => m.id === task.assignedTo);

                  return (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ delay: index * 0.05 }}
                      className={`p-5 rounded-2xl border-2 transition-all ${
                        task.status === 'completed' ? 'opacity-60 border-green-200 bg-green-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: getPriorityColor(task.priority) + '20' }}
                        >
                          <Icon className="w-6 h-6" style={{ color: getPriorityColor(task.priority) }} />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h3 className="font-bold text-lg" style={{ color: COLORS.depth }}>{task.title}</h3>
                              {task.titleAr && <p className="text-sm text-gray-500" dir="rtl">{task.titleAr}</p>}
                            </div>
                            <button
                              onClick={() => toggleTaskStatus(task.id)}
                              className={`p-2 rounded-xl transition-all ${
                                task.status === 'completed' ? 'bg-green-100' : 'hover:bg-gray-100'
                              }`}
                            >
                              {task.status === 'completed' ? (
                                <CheckCircle className="w-6 h-6 text-green-600" />
                              ) : (
                                <Check className="w-6 h-6 text-gray-400" />
                              )}
                            </button>
                          </div>

                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <div className="flex items-center gap-2">
                              <div className="text-lg">{assignee?.avatar}</div>
                              <span className="text-sm font-semibold text-gray-700">{assignee?.name}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <Calendar className="w-4 h-4" />
                              {task.dueDate}
                            </div>
                            <span
                              className="px-3 py-1 rounded-full text-xs font-bold text-white"
                              style={{ backgroundColor: getPriorityColor(task.priority) }}
                            >
                              {task.priority.toUpperCase()}
                            </span>
                          </div>

                          {task.amount && (
                            <div className="flex items-center gap-2 mb-2">
                              <DollarSign className="w-4 h-4 text-gray-500" />
                              <span className="font-bold text-lg" style={{ color: COLORS.growth }}>SAR {task.amount}</span>
                              {task.provider && <span className="text-sm text-gray-500">• {task.provider}</span>}
                            </div>
                          )}

                          {task.notes && (
                            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">{task.notes}</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {filteredTasks.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">No tasks in this category</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showAddMember && (
          <AddMemberModal
            onClose={() => setShowAddMember(false)}
            onAdd={addMember}
          />
        )}
        {showAddTask && (
          <AddTaskModal
            members={members}
            onClose={() => setShowAddTask(false)}
            onAdd={addTask}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
