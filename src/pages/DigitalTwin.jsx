import { useState, useRef, useCallback, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, X, Clock, Plus, CheckCircle, ClipboardList,
  Users, DollarSign, ShoppingCart, Baby, AlertCircle, Send, MessageSquare,
  RefreshCw, Pencil, Trash2, Layout,
  Move, GripVertical, Sofa, Bed, Bath, Monitor, Car, UtensilsCrossed,
  Armchair, WashingMachine, Loader2
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useHome } from '../contexts/HomeContext';
import {
  fetchRooms, addRoom, updateRoom, removeRoom,
  fetchTasks, addTask, completeTask, removeTask,
  fetchHouseholdTasks, addHouseholdTask, updateHouseholdTask,
  fetchTickets, addTicket, updateTicket
} from '../services/api';

// Hawaz Brand Colors
const COLORS = {
  growth: '#005143',
  innovation: '#41E661',
  clarity: '#FEF5E8',
  depth: '#121B22',
  strategy: '#F47D42'
};

// Room types for the palette
const ROOM_TYPES = [
  { type: 'living', name: 'Living Room', icon: Sofa, defaultSize: { w: 180, h: 140 }, color: '#005143' },
  { type: 'kitchen', name: 'Kitchen', icon: UtensilsCrossed, defaultSize: { w: 160, h: 130 }, color: '#F47D42' },
  { type: 'bedroom', name: 'Bedroom', icon: Bed, defaultSize: { w: 140, h: 120 }, color: '#6366f1' },
  { type: 'bathroom', name: 'Bathroom', icon: Bath, defaultSize: { w: 100, h: 100 }, color: '#0ea5e9' },
  { type: 'office', name: 'Office', icon: Monitor, defaultSize: { w: 120, h: 110 }, color: '#8b5cf6' },
  { type: 'dining', name: 'Dining Room', icon: Armchair, defaultSize: { w: 140, h: 120 }, color: '#ec4899' },
  { type: 'laundry', name: 'Laundry', icon: WashingMachine, defaultSize: { w: 90, h: 90 }, color: '#14b8a6' },
  { type: 'garage', name: 'Garage', icon: Car, defaultSize: { w: 180, h: 160 }, color: '#64748b' },
];

// Preset floor plan layouts
const PRESET_LAYOUTS = {
  empty: { name: 'Empty Canvas', rooms: [] },
  studio: {
    name: 'Studio Apartment',
    rooms: [
      { name: 'Living/Bedroom', type: 'living', x: 40, y: 40, width: 200, height: 180 },
      { name: 'Kitchen', type: 'kitchen', x: 260, y: 40, width: 140, height: 100 },
      { name: 'Bathroom', type: 'bathroom', x: 260, y: 160, width: 100, height: 80 },
    ]
  },
  oneBedroom: {
    name: '1 Bedroom',
    rooms: [
      { name: 'Living Room', type: 'living', x: 40, y: 40, width: 180, height: 140 },
      { name: 'Kitchen', type: 'kitchen', x: 240, y: 40, width: 140, height: 100 },
      { name: 'Bedroom', type: 'bedroom', x: 40, y: 200, width: 150, height: 130 },
      { name: 'Bathroom', type: 'bathroom', x: 210, y: 200, width: 100, height: 100 },
    ]
  },
  twoBedroom: {
    name: '2 Bedroom',
    rooms: [
      { name: 'Living Room', type: 'living', x: 40, y: 40, width: 200, height: 150 },
      { name: 'Kitchen', type: 'kitchen', x: 260, y: 40, width: 150, height: 120 },
      { name: 'Bedroom 1', type: 'bedroom', x: 40, y: 210, width: 140, height: 120 },
      { name: 'Bedroom 2', type: 'bedroom', x: 200, y: 210, width: 140, height: 120 },
      { name: 'Bathroom', type: 'bathroom', x: 360, y: 180, width: 100, height: 100 },
    ]
  },
  familyHome: {
    name: 'Family Home',
    rooms: [
      { name: 'Living Room', type: 'living', x: 40, y: 40, width: 180, height: 130 },
      { name: 'Kitchen', type: 'kitchen', x: 240, y: 40, width: 140, height: 100 },
      { name: 'Dining Room', type: 'dining', x: 400, y: 40, width: 120, height: 100 },
      { name: 'Master Bedroom', type: 'bedroom', x: 40, y: 190, width: 150, height: 120 },
      { name: 'Bedroom 2', type: 'bedroom', x: 210, y: 190, width: 130, height: 110 },
      { name: 'Bedroom 3', type: 'bedroom', x: 360, y: 190, width: 130, height: 110 },
      { name: 'Bathroom 1', type: 'bathroom', x: 240, y: 320, width: 90, height: 80 },
      { name: 'Bathroom 2', type: 'bathroom', x: 350, y: 320, width: 90, height: 80 },
    ]
  }
};

const GRID_SIZE = 10;
const MIN_ROOM_SIZE = 60;

// Loading component
function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: COLORS.clarity }}>
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" style={{ color: COLORS.growth }} />
        <p className="text-gray-600 font-semibold">Loading your home...</p>
      </div>
    </div>
  );
}

// No home state
function NoHomeState() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: COLORS.clarity }}>
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Home className="w-12 h-12" style={{ color: COLORS.growth }} />
        </div>
        <h2 className="text-2xl font-bold mb-3" style={{ color: COLORS.depth }}>No Home Setup</h2>
        <p className="text-gray-600 mb-6">
          Create or join a home to start using the Digital Twin feature.
        </p>
        <a
          href="/home"
          className="inline-block px-6 py-3 rounded-xl font-semibold text-white transition-all hover:shadow-lg"
          style={{ backgroundColor: COLORS.growth }}
        >
          Setup Your Home
        </a>
      </div>
    </div>
  );
}

function UserSwitcher({ currentMember, members, onSwitch }) {
  const [showMenu, setShowMenu] = useState(false);

  if (!currentMember) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-3 p-3 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all active:scale-95"
      >
        <div className="text-2xl">{currentMember.avatar || '👤'}</div>
        <div className="text-left">
          <p className="font-bold text-sm" style={{ color: COLORS.depth }}>{currentMember.name}</p>
          <p className="text-xs text-gray-500 capitalize">{currentMember.role?.toLowerCase()}</p>
        </div>
        <RefreshCw className="w-4 h-4 text-gray-400" />
      </button>

      <AnimatePresence>
        {showMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setShowMenu(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full mt-2 left-0 bg-white rounded-2xl shadow-2xl p-3 z-50 min-w-[250px]"
            >
              <p className="text-xs font-semibold text-gray-500 px-3 mb-2">Switch View</p>
              {members.map((member) => (
                <button
                  key={member.id}
                  onClick={() => {
                    onSwitch(member);
                    setShowMenu(false);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                    currentMember.id === member.id
                      ? 'bg-green-50'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="text-2xl">{member.avatar || '👤'}</div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-sm" style={{ color: COLORS.depth }}>{member.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{member.role?.toLowerCase()}</p>
                  </div>
                  {currentMember.id === member.id && (
                    <CheckCircle className="w-5 h-5" style={{ color: COLORS.innovation }} />
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function TicketModal({ currentMember, homeId, homeOwners, onClose, onSubmit }) {
  const [ticketData, setTicketData] = useState({
    title: '',
    description: '',
    priority: 'medium'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (ticketData.title && ticketData.description) {
      setIsSubmitting(true);
      try {
        await onSubmit({
          ...ticketData,
          fromUser: currentMember.userId,
          fromUserName: currentMember.name,
          status: 'open'
        });
        onClose();
      } catch (error) {
        console.error('Error creating ticket:', error);
      } finally {
        setIsSubmitting(false);
      }
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
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-3xl w-full max-w-md mx-4 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: COLORS.strategy + '20' }}>
                <AlertCircle className="w-6 h-6" style={{ color: COLORS.strategy }} />
              </div>
              <div>
                <h2 className="text-xl font-bold" style={{ color: COLORS.depth }}>Report Issue</h2>
                <p className="text-sm text-gray-500">رفع تذكرة</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.depth }}>
                Issue Title
              </label>
              <input
                type="text"
                value={ticketData.title}
                onChange={(e) => setTicketData({ ...ticketData, title: e.target.value })}
                placeholder="e.g., Broken vacuum cleaner"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.depth }}>
                Description
              </label>
              <textarea
                value={ticketData.description}
                onChange={(e) => setTicketData({ ...ticketData, description: e.target.value })}
                placeholder="Describe the problem..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0"
                rows="4"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.depth }}>
                Priority
              </label>
              <select
                value={ticketData.priority}
                onChange={(e) => setTicketData({ ...ticketData, priority: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl font-bold text-white transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
              style={{ backgroundColor: COLORS.strategy }}
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
            </button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}

function AddTaskModal({ room, members, currentMember, homeId, homeOwners, onClose, onAdd }) {
  const [taskData, setTaskData] = useState({
    title: '',
    type: 'cleaning',
    assignedTo: currentMember?.userId || '',
    assignedToName: currentMember?.name || '',
    estimatedTime: '',
    priority: 'medium'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAssigneeChange = (e) => {
    const selectedMember = members.find(m => m.userId === e.target.value);
    setTaskData({
      ...taskData,
      assignedTo: e.target.value,
      assignedToName: selectedMember?.name || ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (taskData.title) {
      setIsSubmitting(true);
      try {
        await onAdd({
          roomId: room.id,
          ...taskData,
          status: 'pending'
        });
        onClose();
      } catch (error) {
        console.error('Error adding task:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
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
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: COLORS.innovation }}>
                <Plus className="w-6 h-6" style={{ color: COLORS.growth }} />
              </div>
              <div>
                <h2 className="text-xl font-bold" style={{ color: COLORS.depth }}>Add Task</h2>
                <p className="text-sm text-gray-500">{room.name}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.depth }}>
                Task Title
              </label>
              <input
                type="text"
                value={taskData.title}
                onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                placeholder="e.g., Clean AC filters"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.depth }}>
                  Task Type
                </label>
                <select
                  value={taskData.type}
                  onChange={(e) => setTaskData({ ...taskData, type: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0"
                >
                  <option value="cleaning">Cleaning</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.depth }}>
                  Priority
                </label>
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

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.depth }}>
                Assign To
              </label>
              <select
                value={taskData.assignedTo}
                onChange={handleAssigneeChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0"
              >
                <option value="">Select member...</option>
                {members.map((member) => (
                  <option key={member.id} value={member.userId}>
                    {member.avatar || '👤'} {member.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.depth }}>
                Estimated Time
              </label>
              <input
                type="text"
                value={taskData.estimatedTime}
                onChange={(e) => setTaskData({ ...taskData, estimatedTime: e.target.value })}
                placeholder="e.g., 1 hour, 30 mins"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl font-bold text-white transition-all active:scale-95 disabled:opacity-50"
              style={{ backgroundColor: COLORS.growth }}
            >
              {isSubmitting ? 'Adding...' : 'Add Task'}
            </button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}

function RoomBottomSheet({ room, tasks, members, currentMember, homeId, homeOwners, onClose, onAddTask, onCompleteTask }) {
  const [showAddModal, setShowAddModal] = useState(false);

  // Get tasks for this room
  const roomTasks = tasks.filter(t => t.roomId === room.id);

  // Filter tasks based on user role
  const canViewAllTasks = currentMember?.permissions?.canViewAllTasks;
  const visibleTasks = canViewAllTasks
    ? roomTasks
    : roomTasks.filter(t => t.assignedTo === currentMember?.userId);

  const canCreateTasks = currentMember?.permissions?.canCreateTasks;
  const canCompleteTasks = currentMember?.permissions?.canCompleteTasks;

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center md:justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-white rounded-t-3xl md:rounded-3xl w-full md:max-w-lg max-h-[85vh] overflow-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: COLORS.growth }}>
                    <Home className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold" style={{ color: COLORS.depth }}>{room.name}</h2>
                    <p className="text-sm text-gray-600">
                      {visibleTasks.length} {visibleTasks.length === 1 ? 'task' : 'tasks'}
                      {!canViewAllTasks && ' assigned to you'}
                    </p>
                  </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {canCreateTasks && (
                <button
                  onClick={() => setShowAddModal(true)}
                  className="w-full mb-4 py-3 rounded-2xl font-semibold transition-all shadow-lg text-white"
                  style={{ backgroundColor: COLORS.innovation, color: COLORS.growth }}
                >
                  <Plus className="w-5 h-5 inline-block mr-2" />
                  Add New Task
                </button>
              )}

              {visibleTasks.length > 0 ? (
                <div className="space-y-3">
                  {visibleTasks.map((task) => {
                    const assignee = members.find(m => m.userId === task.assignedTo);
                    const getPriorityColor = (priority) => {
                      switch (priority) {
                        case 'urgent': return '#ef4444';
                        case 'high': return COLORS.strategy;
                        case 'medium': return '#f59e0b';
                        default: return '#94a3b8';
                      }
                    };

                    return (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-4 rounded-2xl border-2 transition-all"
                        style={{
                          backgroundColor: task.status === 'completed' ? `${COLORS.innovation}10` : '#f9fafb',
                          borderColor: task.status === 'completed' ? COLORS.innovation : '#e5e7eb'
                        }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold" style={{ color: COLORS.depth }}>{task.title}</h3>
                              <span
                                className="px-2 py-0.5 rounded-full text-xs font-bold text-white"
                                style={{ backgroundColor: getPriorityColor(task.priority) }}
                              >
                                {task.priority?.toUpperCase()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`px-3 py-1 text-xs rounded-full font-semibold`}
                                style={{
                                  backgroundColor: task.type === 'cleaning' ? `${COLORS.innovation}20` : `${COLORS.strategy}20`,
                                  color: task.type === 'cleaning' ? COLORS.growth : COLORS.strategy
                                }}>
                                {task.type === 'cleaning' ? '🧹 Cleaning' : '🔧 Maintenance'}
                              </span>
                              <span className={`px-3 py-1 text-xs rounded-full font-semibold ${
                                task.status === 'completed'
                                  ? 'bg-green-100 text-green-700'
                                  : task.status === 'in-progress'
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-gray-200 text-gray-700'
                              }`}>
                                {task.status === 'completed' ? '✓ Completed' : task.status === 'in-progress' ? '⋯ In Progress' : '○ Pending'}
                              </span>
                            </div>
                          </div>
                          {task.status !== 'completed' && canCompleteTasks && task.assignedTo === currentMember?.userId && (
                            <button
                              onClick={() => onCompleteTask(task.id)}
                              className="ml-2 p-2 rounded-xl transition-all hover:bg-green-100"
                              style={{ color: COLORS.innovation }}
                            >
                              <CheckCircle className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <div className="text-lg">{assignee?.avatar || '👤'}</div>
                            {assignee?.name || task.assignedToName || 'Unassigned'}
                          </div>
                          {task.estimatedTime && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {task.estimatedTime}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                    <Home className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">
                    {!canViewAllTasks ? 'No tasks assigned to you in this room' : 'No tasks in this room'}
                  </p>
                  {canCreateTasks && (
                    <p className="text-sm text-gray-400 mt-1">Add a task to get started</p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {showAddModal && (
        <AddTaskModal
          room={room}
          members={members}
          currentMember={currentMember}
          homeId={homeId}
          homeOwners={homeOwners}
          onClose={() => setShowAddModal(false)}
          onAdd={onAddTask}
        />
      )}
    </>
  );
}

// Room Palette Component
function RoomPalette({ onAddRoom, isAdding }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-lg h-fit">
      <h3 className="font-bold text-sm mb-3 flex items-center gap-2" style={{ color: COLORS.depth }}>
        <GripVertical className="w-4 h-4" />
        Add Rooms
      </h3>
      <div className="space-y-2">
        {ROOM_TYPES.map((roomType) => {
          const Icon = roomType.icon;
          return (
            <motion.button
              key={roomType.type}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onAddRoom(roomType)}
              disabled={isAdding}
              className="w-full flex items-center gap-3 p-3 rounded-xl border-2 border-gray-200 hover:border-green-400 hover:bg-green-50 transition-all cursor-pointer disabled:opacity-50"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: roomType.color + '20' }}
              >
                <Icon className="w-5 h-5" style={{ color: roomType.color }} />
              </div>
              <span className="font-medium text-sm" style={{ color: COLORS.depth }}>
                {roomType.name}
              </span>
              <Plus className="w-4 h-4 ml-auto text-gray-400" />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// Preset Selector Modal
function PresetSelector({ onSelect, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-3xl w-full max-w-md mx-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: COLORS.innovation }}>
                <Layout className="w-6 h-6" style={{ color: COLORS.growth }} />
              </div>
              <div>
                <h2 className="text-xl font-bold" style={{ color: COLORS.depth }}>Choose Layout</h2>
                <p className="text-sm text-gray-500">Start with a template</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3">
            {Object.entries(PRESET_LAYOUTS).map(([key, preset]) => (
              <motion.button
                key={key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onSelect(preset.rooms);
                  onClose();
                }}
                className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-gray-200 hover:border-green-400 hover:bg-green-50 transition-all text-left"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gray-100">
                  <Home className="w-6 h-6" style={{ color: COLORS.growth }} />
                </div>
                <div className="flex-1">
                  <p className="font-bold" style={{ color: COLORS.depth }}>{preset.name}</p>
                  <p className="text-sm text-gray-500">
                    {preset.rooms.length === 0 ? 'Start from scratch' : `${preset.rooms.length} rooms`}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Floor Plan Editor Component
function FloorPlanEditor({ rooms, homeId, homeOwners, onDone, addRoomMutation, updateRoomMutation, deleteRoomMutation }) {
  const svgRef = useRef(null);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [dragState, setDragState] = useState(null);
  const [showPresets, setShowPresets] = useState(false);
  const [editingName, setEditingName] = useState(null);
  const [localRooms, setLocalRooms] = useState(rooms);

  useEffect(() => {
    setLocalRooms(rooms);
  }, [rooms]);

  const snapToGrid = (value) => Math.round(value / GRID_SIZE) * GRID_SIZE;

  const addRoom = async (roomType) => {
    const newRoom = {
      name: roomType.name,
      x: snapToGrid(50 + Math.random() * 100),
      y: snapToGrid(50 + Math.random() * 100),
      width: roomType.defaultSize.w,
      height: roomType.defaultSize.h,
      status: 'active'
    };

    try {
      await addRoomMutation.mutateAsync({ roomData: newRoom, homeId, homeOwners });
    } catch (error) {
      console.error('Error adding room:', error);
    }
  };

  const handleDeleteRoom = async (roomId) => {
    try {
      await deleteRoomMutation.mutateAsync(roomId);
      setSelectedRoomId(null);
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };

  const handleUpdateRoom = async (roomId, updates) => {
    try {
      await updateRoomMutation.mutateAsync({ roomId, roomData: updates });
    } catch (error) {
      console.error('Error updating room:', error);
    }
  };

  const loadPreset = async (presetRooms) => {
    // Delete all existing rooms first
    for (const room of localRooms) {
      try {
        await deleteRoomMutation.mutateAsync(room.id);
      } catch (error) {
        console.error('Error deleting room:', error);
      }
    }

    // Add preset rooms
    for (const room of presetRooms) {
      try {
        // Exclude 'type' field as it's not in the GraphQL schema
        const { type, ...roomData } = room;
        await addRoomMutation.mutateAsync({
          roomData: { ...roomData, status: 'active' },
          homeId,
          homeOwners
        });
      } catch (error) {
        console.error('Error adding preset room:', error);
      }
    }
    setSelectedRoomId(null);
  };

  const getMousePosition = (e) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();
    const viewBox = svg.viewBox.baseVal;
    return {
      x: ((e.clientX - rect.left) / rect.width) * viewBox.width,
      y: ((e.clientY - rect.top) / rect.height) * viewBox.height
    };
  };

  const handleMouseDown = (e, roomId, type = 'move', corner = null) => {
    e.stopPropagation();
    const pos = getMousePosition(e);
    const room = localRooms.find(r => r.id === roomId);
    setDragState({
      roomId,
      type,
      corner,
      startX: pos.x,
      startY: pos.y,
      originalRoom: { ...room }
    });
    setSelectedRoomId(roomId);
  };

  const handleMouseMove = useCallback((e) => {
    if (!dragState) return;

    const pos = getMousePosition(e);
    const dx = pos.x - dragState.startX;
    const dy = pos.y - dragState.startY;
    const room = dragState.originalRoom;

    setLocalRooms(prevRooms => prevRooms.map(r => {
      if (r.id !== dragState.roomId) return r;

      if (dragState.type === 'move') {
        return {
          ...r,
          x: snapToGrid(Math.max(25, Math.min(490 - r.width, room.x + dx))),
          y: snapToGrid(Math.max(25, Math.min(370 - r.height, room.y + dy)))
        };
      } else if (dragState.type === 'resize') {
        let newX = r.x, newY = r.y, newW = r.width, newH = r.height;

        if (dragState.corner.includes('e')) {
          newW = snapToGrid(Math.max(MIN_ROOM_SIZE, room.width + dx));
        }
        if (dragState.corner.includes('w')) {
          const newWidth = snapToGrid(Math.max(MIN_ROOM_SIZE, room.width - dx));
          newX = snapToGrid(room.x + room.width - newWidth);
          newW = newWidth;
        }
        if (dragState.corner.includes('s')) {
          newH = snapToGrid(Math.max(MIN_ROOM_SIZE, room.height + dy));
        }
        if (dragState.corner.includes('n')) {
          const newHeight = snapToGrid(Math.max(MIN_ROOM_SIZE, room.height - dy));
          newY = snapToGrid(room.y + room.height - newHeight);
          newH = newHeight;
        }

        return { ...r, x: newX, y: newY, width: newW, height: newH };
      }
      return r;
    }));
  }, [dragState]);

  const handleMouseUp = useCallback(async () => {
    if (dragState) {
      const room = localRooms.find(r => r.id === dragState.roomId);
      if (room) {
        await handleUpdateRoom(room.id, {
          x: room.x,
          y: room.y,
          width: room.width,
          height: room.height
        });
      }
      setDragState(null);
    }
  }, [dragState, localRooms]);

  useEffect(() => {
    if (dragState) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragState, handleMouseMove, handleMouseUp]);

  const selectedRoom = localRooms.find(r => r.id === selectedRoomId);

  const getRoomColor = (room) => {
    return ROOM_TYPES.find(rt => rt.type === room.type)?.color || COLORS.growth;
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Left: Room Palette */}
      <div className="lg:w-56 flex-shrink-0">
        <RoomPalette onAddRoom={addRoom} isAdding={addRoomMutation.isPending} />
      </div>

      {/* Center: Canvas */}
      <div className="flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-4 shadow-xl"
        >
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowPresets(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all"
              >
                <Layout className="w-4 h-4" style={{ color: COLORS.depth }} />
                <span className="text-sm font-medium" style={{ color: COLORS.depth }}>Presets</span>
              </button>
            </div>
            <button
              onClick={onDone}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-white transition-all active:scale-95"
              style={{ backgroundColor: COLORS.growth }}
            >
              <CheckCircle className="w-5 h-5" />
              Done
            </button>
          </div>

          {/* SVG Canvas */}
          <div
            className="rounded-2xl p-2 overflow-hidden cursor-crosshair"
            style={{ backgroundColor: COLORS.clarity }}
          >
            <svg
              ref={svgRef}
              viewBox="0 0 550 420"
              className="w-full max-w-4xl mx-auto"
              style={{ aspectRatio: '550/420', maxHeight: '55vh' }}
              onClick={() => setSelectedRoomId(null)}
            >
              {/* Grid pattern */}
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Floor boundary */}
              <rect
                x="20"
                y="20"
                width="510"
                height="380"
                fill="white"
                stroke={COLORS.depth}
                strokeWidth="3"
                rx="12"
                strokeDasharray="10 5"
              />

              {/* Empty state */}
              {localRooms.length === 0 && (
                <text
                  x="275"
                  y="210"
                  textAnchor="middle"
                  fill="#9ca3af"
                  fontSize="16"
                  fontWeight="500"
                >
                  Click a room type to add it here
                </text>
              )}

              {/* Rooms */}
              {localRooms.map((room) => {
                const isSelected = selectedRoomId === room.id;
                const roomColor = getRoomColor(room);

                return (
                  <g key={room.id}>
                    {/* Room rectangle */}
                    <rect
                      x={room.x}
                      y={room.y}
                      width={room.width}
                      height={room.height}
                      fill={roomColor}
                      stroke={isSelected ? COLORS.innovation : COLORS.depth}
                      strokeWidth={isSelected ? 4 : 2}
                      rx="8"
                      className="cursor-move"
                      onMouseDown={(e) => handleMouseDown(e, room.id, 'move')}
                      style={{
                        filter: isSelected ? `drop-shadow(0 0 8px ${COLORS.innovation})` : 'none'
                      }}
                    />

                    {/* Room name */}
                    <text
                      x={room.x + room.width / 2}
                      y={room.y + room.height / 2}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="13"
                      fontWeight="bold"
                      className="pointer-events-none select-none"
                    >
                      {room.name}
                    </text>

                    {/* Resize handles (when selected) */}
                    {isSelected && (
                      <>
                        {/* Corner handles */}
                        {['nw', 'ne', 'sw', 'se'].map((corner) => {
                          const cx = corner.includes('w') ? room.x : room.x + room.width;
                          const cy = corner.includes('n') ? room.y : room.y + room.height;
                          return (
                            <circle
                              key={corner}
                              cx={cx}
                              cy={cy}
                              r="8"
                              fill={COLORS.innovation}
                              stroke="white"
                              strokeWidth="2"
                              className="cursor-nwse-resize"
                              onMouseDown={(e) => handleMouseDown(e, room.id, 'resize', corner)}
                            />
                          );
                        })}
                        {/* Delete button */}
                        <g
                          className="cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteRoom(room.id);
                          }}
                        >
                          <circle
                            cx={room.x + room.width - 12}
                            cy={room.y + 12}
                            r="12"
                            fill="#ef4444"
                          />
                          <text
                            x={room.x + room.width - 12}
                            y={room.y + 17}
                            textAnchor="middle"
                            fill="white"
                            fontSize="14"
                            fontWeight="bold"
                          >
                            ×
                          </text>
                        </g>
                      </>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Room info bar */}
          {selectedRoom && (
            <div className="mt-4 p-3 bg-gray-50 rounded-xl flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Move className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {Math.round(selectedRoom.width)} × {Math.round(selectedRoom.height)}
                </span>
              </div>
              <div className="flex-1">
                {editingName === selectedRoom.id ? (
                  <input
                    type="text"
                    defaultValue={selectedRoom.name}
                    autoFocus
                    className="px-2 py-1 border-2 border-green-400 rounded-lg text-sm w-full max-w-[200px]"
                    onBlur={(e) => {
                      handleUpdateRoom(selectedRoom.id, { name: e.target.value });
                      setEditingName(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleUpdateRoom(selectedRoom.id, { name: e.target.value });
                        setEditingName(null);
                      }
                      if (e.key === 'Escape') setEditingName(null);
                    }}
                  />
                ) : (
                  <button
                    onClick={() => setEditingName(selectedRoom.id)}
                    className="flex items-center gap-2 text-sm font-medium hover:text-green-600 transition-colors"
                    style={{ color: COLORS.depth }}
                  >
                    <Pencil className="w-3 h-3" />
                    {selectedRoom.name}
                  </button>
                )}
              </div>
              <button
                onClick={() => handleDeleteRoom(selectedRoom.id)}
                className="flex items-center gap-1 px-3 py-1 rounded-lg bg-red-100 text-red-600 text-sm font-medium hover:bg-red-200 transition-all"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          )}

          <p className="text-xs text-gray-500 mt-3 text-center">
            Click room to select • Drag to move • Drag corners to resize • Double-click name to edit
          </p>
        </motion.div>
      </div>

      {/* Preset Modal */}
      <AnimatePresence>
        {showPresets && (
          <PresetSelector
            onSelect={loadPreset}
            onClose={() => setShowPresets(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function DigitalTwin() {
  const { user } = useAuth();
  const { currentHome, membership, members, homeId, homeOwners, loading: homeLoading, hasHome } = useHome();
  const queryClient = useQueryClient();

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [activeTab, setActiveTab] = useState('rooms');
  const [editMode, setEditMode] = useState(false);
  const [viewAsMember, setViewAsMember] = useState(null);

  // Current member (either actual membership or viewing as another member for owners)
  const currentMember = viewAsMember || membership;

  // Fetch rooms
  const { data: rooms = [], isLoading: roomsLoading } = useQuery({
    queryKey: ['rooms', homeId],
    queryFn: () => fetchRooms(homeId),
    enabled: !!homeId
  });

  // Fetch tasks
  const { data: tasks = [], isLoading: tasksLoading } = useQuery({
    queryKey: ['tasks', homeId],
    queryFn: () => fetchTasks(homeId),
    enabled: !!homeId
  });

  // Fetch household tasks
  const { data: householdTasks = [], isLoading: householdLoading } = useQuery({
    queryKey: ['householdTasks', homeId],
    queryFn: () => fetchHouseholdTasks(homeId),
    enabled: !!homeId && currentMember?.permissions?.canViewBills
  });

  // Fetch tickets
  const { data: tickets = [], isLoading: ticketsLoading } = useQuery({
    queryKey: ['tickets', homeId],
    queryFn: () => fetchTickets(homeId),
    enabled: !!homeId
  });

  // Mutations
  const addRoomMutation = useMutation({
    mutationFn: ({ roomData, homeId, homeOwners }) => addRoom(roomData, homeId, homeOwners),
    onSuccess: () => queryClient.invalidateQueries(['rooms', homeId])
  });

  const updateRoomMutation = useMutation({
    mutationFn: ({ roomId, roomData }) => updateRoom(roomId, roomData),
    onSuccess: () => queryClient.invalidateQueries(['rooms', homeId])
  });

  const deleteRoomMutation = useMutation({
    mutationFn: (roomId) => removeRoom(roomId),
    onSuccess: () => queryClient.invalidateQueries(['rooms', homeId])
  });

  const addTaskMutation = useMutation({
    mutationFn: (taskData) => addTask(taskData, homeId, homeOwners, user?.userId),
    onSuccess: () => queryClient.invalidateQueries(['tasks', homeId])
  });

  const completeTaskMutation = useMutation({
    mutationFn: (taskId) => completeTask(taskId, user?.userId),
    onSuccess: () => queryClient.invalidateQueries(['tasks', homeId])
  });

  const addTicketMutation = useMutation({
    mutationFn: (ticketData) => addTicket(ticketData, homeId, homeOwners),
    onSuccess: () => queryClient.invalidateQueries(['tickets', homeId])
  });

  // Loading states
  if (homeLoading) {
    return <LoadingScreen />;
  }

  if (!hasHome) {
    return <NoHomeState />;
  }

  const isLoading = roomsLoading || tasksLoading;

  if (isLoading) {
    return <LoadingScreen />;
  }

  // Get room tasks
  const getRoomTasks = (roomId) => tasks.filter(t => t.roomId === roomId);

  // Calculate stats
  const canViewAllTasks = currentMember?.permissions?.canViewAllTasks;
  const myTasks = canViewAllTasks
    ? tasks
    : tasks.filter(t => t.assignedTo === currentMember?.userId);
  const myActiveTasks = myTasks.filter(t => t.status !== 'completed').length;
  const myCompletedTasks = myTasks.filter(t => t.status === 'completed').length;

  const canViewBills = currentMember?.permissions?.canViewBills;
  const canManageRooms = currentMember?.permissions?.canManageRooms;
  const isOwner = membership?.role === 'OWNER';

  const getRoomColor = (room) => {
    const roomTasks = getRoomTasks(room.id);
    const activeTasks = canViewAllTasks
      ? roomTasks.filter(t => t.status !== 'completed').length
      : roomTasks.filter(t => t.assignedTo === currentMember?.userId && t.status !== 'completed').length;

    if (activeTasks > 0) {
      return ROOM_TYPES.find(rt => rt.type === room.type)?.color || COLORS.growth;
    }
    return '#e5e7eb';
  };

  const selectedRoomData = selectedRoom ? rooms.find(r => r.id === selectedRoom.id) : null;

  return (
    <div className="min-h-screen p-4 md:p-8 pb-24 lg:pb-8" style={{ backgroundColor: COLORS.clarity }}>
      {/* Header with User Switcher */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: COLORS.depth }}>Digital Twin</h1>
            <p className="text-gray-600">Interactive home management</p>
          </div>
          {isOwner && members.length > 1 && (
            <UserSwitcher
              currentMember={currentMember}
              members={members}
              onSwitch={setViewAsMember}
            />
          )}
        </div>

        {/* Staff actions - show ticket button for non-owners */}
        {!isOwner && (
          <button
            onClick={() => setShowTicketModal(true)}
            className="w-full py-3 px-4 rounded-2xl font-semibold text-white transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg"
            style={{ backgroundColor: COLORS.strategy }}
          >
            <AlertCircle className="w-5 h-5" />
            Report Issue to Family
          </button>
        )}
      </motion.div>

      {/* Mini Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-4 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${COLORS.growth}20` }}>
              <Home className="w-5 h-5" style={{ color: COLORS.growth }} />
            </div>
          </div>
          <p className="text-2xl font-bold" style={{ color: COLORS.depth }}>{rooms.length}</p>
          <p className="text-xs text-gray-600 font-medium">Total Rooms</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.05 }}
          className="bg-white rounded-2xl p-4 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${COLORS.innovation}20` }}>
              <ClipboardList className="w-5 h-5" style={{ color: COLORS.growth }} />
            </div>
          </div>
          <p className="text-2xl font-bold" style={{ color: COLORS.depth }}>{myActiveTasks}</p>
          <p className="text-xs text-gray-600 font-medium">
            {canViewAllTasks ? 'Active Tasks' : 'My Active Tasks'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-4 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-green-100">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-bold" style={{ color: COLORS.depth }}>{myCompletedTasks}</p>
          <p className="text-xs text-gray-600 font-medium">Completed</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl p-4 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${COLORS.strategy}20` }}>
              {isOwner ? (
                <Users className="w-5 h-5" style={{ color: COLORS.strategy }} />
              ) : (
                <MessageSquare className="w-5 h-5" style={{ color: COLORS.strategy }} />
              )}
            </div>
          </div>
          <p className="text-2xl font-bold" style={{ color: COLORS.depth }}>
            {isOwner ? members.length : tickets.filter(t => t.fromUser === currentMember?.userId).length}
          </p>
          <p className="text-xs text-gray-600 font-medium">
            {isOwner ? 'Team Members' : 'My Tickets'}
          </p>
        </motion.div>
      </div>

      {/* Tabs for users with bill access */}
      {canViewBills && (
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('rooms')}
            className={`px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition-all ${
              activeTab === 'rooms' ? 'text-white' : 'bg-white text-gray-700'
            }`}
            style={activeTab === 'rooms' ? { backgroundColor: COLORS.growth } : {}}
          >
            Rooms & Tasks
          </button>
          <button
            onClick={() => setActiveTab('bills')}
            className={`px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition-all ${
              activeTab === 'bills' ? 'text-white' : 'bg-white text-gray-700'
            }`}
            style={activeTab === 'bills' ? { backgroundColor: COLORS.growth } : {}}
          >
            Bills & Household
          </button>
          <button
            onClick={() => setActiveTab('tickets')}
            className={`px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition-all ${
              activeTab === 'tickets' ? 'text-white' : 'bg-white text-gray-700'
            }`}
            style={activeTab === 'tickets' ? { backgroundColor: COLORS.growth } : {}}
          >
            Tickets ({tickets.filter(t => t.status === 'open').length})
          </button>
        </div>
      )}

      {activeTab === 'rooms' && (
        <>
          {editMode ? (
            /* Edit Mode - Floor Plan Builder */
            <FloorPlanEditor
              rooms={rooms}
              homeId={homeId}
              homeOwners={homeOwners}
              onDone={() => setEditMode(false)}
              addRoomMutation={addRoomMutation}
              updateRoomMutation={updateRoomMutation}
              deleteRoomMutation={deleteRoomMutation}
            />
          ) : (
            /* View Mode - Interactive Floor Plan */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-6 shadow-xl"
            >
              {/* Edit Button */}
              {canManageRooms && (
                <div className="flex justify-end mb-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setEditMode(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all shadow-md"
                    style={{ backgroundColor: COLORS.innovation, color: COLORS.growth }}
                  >
                    <Pencil className="w-4 h-4" />
                    Edit Floor Plan
                  </motion.button>
                </div>
              )}

              <div className="rounded-2xl p-4 overflow-auto" style={{ backgroundColor: COLORS.clarity }}>
                <svg
                  viewBox="0 0 550 400"
                  className="w-full max-w-3xl mx-auto"
                  style={{ aspectRatio: '550/400', maxHeight: '60vh' }}
                >
                  {/* Floor boundary */}
                  <rect
                    x="20"
                    y="20"
                    width="510"
                    height="360"
                    fill="none"
                    stroke={COLORS.depth}
                    strokeWidth="3"
                    rx="12"
                  />

                  {/* Empty state */}
                  {rooms.length === 0 && (
                    <text
                      x="275"
                      y="200"
                      textAnchor="middle"
                      fill="#9ca3af"
                      fontSize="16"
                      fontWeight="500"
                    >
                      No rooms yet. Click "Edit Floor Plan" to add rooms.
                    </text>
                  )}

                  {/* Rooms */}
                  {rooms.map((room) => {
                    const roomTasks = getRoomTasks(room.id);
                    const activeTasks = canViewAllTasks
                      ? roomTasks.filter(t => t.status !== 'completed').length
                      : roomTasks.filter(t => t.assignedTo === currentMember?.userId && t.status !== 'completed').length;

                    const roomColor = getRoomColor(room);

                    return (
                      <g key={room.id}>
                        <rect
                          x={room.x}
                          y={room.y}
                          width={room.width}
                          height={room.height}
                          fill={roomColor}
                          stroke={COLORS.depth}
                          strokeWidth="2"
                          rx="12"
                          className="cursor-pointer hover:opacity-80 active:opacity-60 transition-opacity"
                          onClick={() => setSelectedRoom(room)}
                          style={{
                            filter: activeTasks > 0 ? `drop-shadow(0 0 12px ${COLORS.innovation})` : 'none'
                          }}
                        />
                        <text
                          x={room.x + room.width / 2}
                          y={room.y + room.height / 2 - 5}
                          textAnchor="middle"
                          fill={activeTasks > 0 ? '#ffffff' : COLORS.depth}
                          className="pointer-events-none text-sm md:text-base font-bold"
                          style={{ fontSize: '0.875rem' }}
                        >
                          {room.name}
                        </text>
                        <text
                          x={room.x + room.width / 2}
                          y={room.y + room.height / 2 + 15}
                          textAnchor="middle"
                          fill={activeTasks > 0 ? '#ffffff' : '#9ca3af'}
                          className="pointer-events-none text-xs md:text-sm font-semibold"
                          style={{ fontSize: '0.75rem' }}
                        >
                          {activeTasks > 0 ? `${activeTasks} ${activeTasks === 1 ? 'task' : 'tasks'}` : 'No tasks'}
                        </text>
                        {activeTasks > 0 && (
                          <>
                            <circle
                              cx={room.x + room.width - 20}
                              cy={room.y + 20}
                              r="14"
                              fill={COLORS.innovation}
                              className="pointer-events-none"
                            />
                            <text
                              x={room.x + room.width - 20}
                              y={room.y + 26}
                              textAnchor="middle"
                              fill={COLORS.growth}
                              fontSize="13"
                              fontWeight="bold"
                              className="pointer-events-none"
                            >
                              {activeTasks}
                            </text>
                          </>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>

              <p className="text-sm text-gray-600 mt-6 text-center font-medium">
                {rooms.length > 0 ? (
                  <>Click on any room to view and manage tasks{!canViewAllTasks && ' assigned to you'}</>
                ) : (
                  <>Start by adding rooms to your floor plan</>
                )}
              </p>
            </motion.div>
          )}
        </>
      )}

      {activeTab === 'bills' && canViewBills && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 shadow-lg"
        >
          <h2 className="text-xl font-bold mb-4" style={{ color: COLORS.depth }}>Household Tasks & Bills</h2>
          {householdLoading ? (
            <div className="text-center py-8">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" style={{ color: COLORS.growth }} />
              <p className="text-gray-500">Loading...</p>
            </div>
          ) : householdTasks.length > 0 ? (
            <div className="space-y-3">
              {householdTasks.map((task) => {
                const assignee = members.find(m => m.userId === task.assignedTo);
                const getIcon = (type) => {
                  switch (type) {
                    case 'bill': return DollarSign;
                    case 'groceries': return ShoppingCart;
                    case 'kids': return Baby;
                    default: return Home;
                  }
                };
                const Icon = getIcon(task.type);

                return (
                  <div key={task.id} className="p-4 rounded-2xl border-2 border-gray-200">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: COLORS.strategy + '20' }}>
                        <Icon className="w-6 h-6" style={{ color: COLORS.strategy }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold" style={{ color: COLORS.depth }}>{task.title}</h3>
                        {task.titleAr && <p className="text-sm text-gray-500" dir="rtl">{task.titleAr}</p>}
                        <div className="flex items-center gap-2 mt-2">
                          <div className="text-sm">{assignee?.avatar || '👤'} {assignee?.name || task.assignedToName}</div>
                          {task.dueDate && <span className="text-xs text-gray-500">• Due: {task.dueDate}</span>}
                          {task.amount && (
                            <span className="font-bold" style={{ color: COLORS.growth }}>• SAR {task.amount}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center py-8 text-gray-500">No household tasks yet</p>
          )}
        </motion.div>
      )}

      {activeTab === 'tickets' && canViewBills && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 shadow-lg"
        >
          <h2 className="text-xl font-bold mb-4" style={{ color: COLORS.depth }}>Staff Tickets</h2>
          {ticketsLoading ? (
            <div className="text-center py-8">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" style={{ color: COLORS.growth }} />
              <p className="text-gray-500">Loading...</p>
            </div>
          ) : tickets.length > 0 ? (
            <div className="space-y-3">
              {tickets.map((ticket) => {
                const reporter = members.find(m => m.userId === ticket.fromUser);
                return (
                  <div key={ticket.id} className="p-4 rounded-2xl border-2 border-gray-200">
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">{reporter?.avatar || '👤'}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold" style={{ color: COLORS.depth }}>{ticket.title}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                            ticket.status === 'open' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                          }`}>
                            {ticket.status?.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{ticket.description}</p>
                        <p className="text-xs text-gray-500">From: {reporter?.name || ticket.fromUserName}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center py-8 text-gray-500">No tickets yet</p>
          )}
        </motion.div>
      )}

      {selectedRoomData && (
        <RoomBottomSheet
          room={selectedRoomData}
          tasks={tasks}
          members={members}
          currentMember={currentMember}
          homeId={homeId}
          homeOwners={homeOwners}
          onClose={() => setSelectedRoom(null)}
          onAddTask={(taskData) => addTaskMutation.mutateAsync(taskData)}
          onCompleteTask={(taskId) => completeTaskMutation.mutateAsync(taskId)}
        />
      )}

      <AnimatePresence>
        {showTicketModal && (
          <TicketModal
            currentMember={currentMember}
            homeId={homeId}
            homeOwners={homeOwners}
            onClose={() => setShowTicketModal(false)}
            onSubmit={(ticketData) => addTicketMutation.mutateAsync(ticketData)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
