import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, X, User, Clock, Plus, CheckCircle, Wrench, Sparkles, ClipboardList } from 'lucide-react';

// Hawaz Brand Colors
const COLORS = {
  growth: '#005143',
  innovation: '#41E661',
  clarity: '#FEF5E8',
  depth: '#121B22',
  strategy: '#F47D42'
};

// Room data with coordinates and status - with example tasks
const initialRooms = [
  {
    id: 1,
    name: 'Living Room',
    x: 50,
    y: 50,
    width: 200,
    height: 150,
    status: 'active',
    tasks: [
      { id: 101, title: 'Clean AC filters', type: 'cleaning', assignee: 'CleanPro Services', estimatedTime: '30 mins', status: 'pending', createdAt: '2024-01-08T10:00:00Z' },
      { id: 102, title: 'Vacuum carpet', type: 'cleaning', assignee: 'Maid Service', estimatedTime: '45 mins', status: 'in-progress', createdAt: '2024-01-08T09:00:00Z' }
    ]
  },
  {
    id: 2,
    name: 'Kitchen',
    x: 270,
    y: 50,
    width: 180,
    height: 150,
    status: 'active',
    tasks: [
      { id: 201, title: 'Fix leaking faucet', type: 'maintenance', assignee: 'HandyFix Pro', estimatedTime: '1 hour', status: 'pending', createdAt: '2024-01-08T08:30:00Z' },
      { id: 202, title: 'Deep clean countertops', type: 'cleaning', assignee: 'CleanPro Services', estimatedTime: '20 mins', status: 'completed', createdAt: '2024-01-07T14:00:00Z' }
    ]
  },
  {
    id: 3,
    name: 'Bedroom 1',
    x: 50,
    y: 220,
    width: 150,
    height: 130,
    status: 'normal',
    tasks: [
      { id: 301, title: 'Organize closet', type: 'cleaning', assignee: 'Home Organizer', estimatedTime: '2 hours', status: 'completed', createdAt: '2024-01-06T10:00:00Z' }
    ]
  },
  {
    id: 4,
    name: 'Bedroom 2',
    x: 220,
    y: 220,
    width: 150,
    height: 130,
    status: 'active',
    tasks: [
      { id: 401, title: 'Replace light bulb', type: 'maintenance', assignee: 'Electrician', estimatedTime: '15 mins', status: 'pending', createdAt: '2024-01-08T11:00:00Z' }
    ]
  },
  {
    id: 5,
    name: 'Bathroom',
    x: 390,
    y: 220,
    width: 100,
    height: 130,
    status: 'normal',
    tasks: []
  },
];

function AddTaskModal({ room, onClose, onAdd }) {
  const [taskData, setTaskData] = useState({
    title: '',
    type: 'cleaning',
    assignee: '',
    estimatedTime: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskData.title && taskData.assignee) {
      onAdd({
        ...taskData,
        id: Date.now(),
        status: 'pending',
        createdAt: new Date().toISOString()
      });
      onClose();
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
                <h2 className="text-xl font-bold" style={{ color: COLORS.depth }}>Add New Task</h2>
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
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all"
                style={{ focusRingColor: COLORS.innovation }}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.depth }}>
                Task Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTaskData({ ...taskData, type: 'cleaning' })}
                  className={`p-4 rounded-2xl border-2 transition-all ${
                    taskData.type === 'cleaning'
                      ? 'border-transparent shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={taskData.type === 'cleaning' ? { backgroundColor: `${COLORS.innovation}20`, borderColor: COLORS.innovation } : {}}
                >
                  <Sparkles className="w-6 h-6 mx-auto mb-2" style={{ color: taskData.type === 'cleaning' ? COLORS.growth : '#9ca3af' }} />
                  <p className={`text-sm font-semibold ${taskData.type === 'cleaning' ? '' : 'text-gray-600'}`}
                    style={taskData.type === 'cleaning' ? { color: COLORS.growth } : {}}>
                    Cleaning
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => setTaskData({ ...taskData, type: 'maintenance' })}
                  className={`p-4 rounded-2xl border-2 transition-all ${
                    taskData.type === 'maintenance'
                      ? 'border-transparent shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={taskData.type === 'maintenance' ? { backgroundColor: `${COLORS.strategy}20`, borderColor: COLORS.strategy } : {}}
                >
                  <Wrench className="w-6 h-6 mx-auto mb-2" style={{ color: taskData.type === 'maintenance' ? COLORS.strategy : '#9ca3af' }} />
                  <p className={`text-sm font-semibold ${taskData.type === 'maintenance' ? '' : 'text-gray-600'}`}
                    style={taskData.type === 'maintenance' ? { color: COLORS.strategy } : {}}>
                    Maintenance
                  </p>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.depth }}>
                Assign To
              </label>
              <input
                type="text"
                value={taskData.assignee}
                onChange={(e) => setTaskData({ ...taskData, assignee: e.target.value })}
                placeholder="Worker name or service provider"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all"
                required
              />
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
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg"
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

function RoomBottomSheet({ room, onClose, onAddTask, onCompleteTask }) {
  const [showAddModal, setShowAddModal] = useState(false);

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
                    <p className="text-sm text-gray-600">{room.tasks.length} {room.tasks.length === 1 ? 'task' : 'tasks'}</p>
                  </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <X className="w-5 w-5" />
                </button>
              </div>

              <button
                onClick={() => setShowAddModal(true)}
                className="w-full mb-4 py-3 rounded-2xl font-semibold transition-all shadow-lg text-white"
                style={{ backgroundColor: COLORS.innovation, color: COLORS.growth }}
              >
                <Plus className="w-5 h-5 inline-block mr-2" />
                Add New Task
              </button>

              {room.tasks.length > 0 ? (
                <div className="space-y-3">
                  {room.tasks.map((task) => (
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
                          <h3 className="font-semibold mb-1" style={{ color: COLORS.depth }}>{task.title}</h3>
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
                        {task.status !== 'completed' && (
                          <button
                            onClick={() => onCompleteTask(room.id, task.id)}
                            className="ml-2 p-2 rounded-xl transition-all hover:bg-green-100"
                            style={{ color: COLORS.innovation }}
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {task.assignee}
                        </div>
                        {task.estimatedTime && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {task.estimatedTime}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                    <Home className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">No tasks in this room</p>
                  <p className="text-sm text-gray-400 mt-1">Add a task to get started</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {showAddModal && (
        <AddTaskModal
          room={room}
          onClose={() => setShowAddModal(false)}
          onAdd={(taskData) => onAddTask(room.id, taskData)}
        />
      )}
    </>
  );
}

export default function DigitalTwin() {
  const [rooms, setRooms] = useState(initialRooms);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const addTaskToRoom = (roomId, taskData) => {
    setRooms(rooms.map(room => {
      if (room.id === roomId) {
        const updatedTasks = [...room.tasks, taskData];
        return {
          ...room,
          tasks: updatedTasks,
          status: updatedTasks.some(t => t.status !== 'completed') ? 'active' : 'normal'
        };
      }
      return room;
    }));
  };

  const completeTask = (roomId, taskId) => {
    setRooms(rooms.map(room => {
      if (room.id === roomId) {
        const updatedTasks = room.tasks.map(task =>
          task.id === taskId ? { ...task, status: 'completed' } : task
        );
        return {
          ...room,
          tasks: updatedTasks,
          status: updatedTasks.some(t => t.status !== 'completed') ? 'active' : 'normal'
        };
      }
      return room;
    }));
  };

  const getRoomColor = (room) => {
    const activeTasks = room.tasks.filter(t => t.status !== 'completed').length;
    if (activeTasks > 0) {
      return COLORS.growth;
    }
    return '#e5e7eb';
  };

  const selectedRoomData = selectedRoom ? rooms.find(r => r.id === selectedRoom.id) : null;

  // Calculate stats
  const totalTasks = rooms.reduce((sum, room) => sum + room.tasks.length, 0);
  const activeTasks = rooms.reduce((sum, room) => sum + room.tasks.filter(t => t.status !== 'completed').length, 0);
  const completedTasks = rooms.reduce((sum, room) => sum + room.tasks.filter(t => t.status === 'completed').length, 0);
  const activeRooms = rooms.filter(room => room.tasks.some(t => t.status !== 'completed')).length;

  return (
    <div className="min-h-screen p-4 md:p-8 pb-24 lg:pb-8" style={{ backgroundColor: COLORS.clarity }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold mb-2" style={{ color: COLORS.depth }}>Digital Twin</h1>
        <p className="text-gray-600">Interactive floor plan of your home</p>
      </motion.div>

      {/* Mini Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-4 shadow-lg border-0"
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
          transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl p-4 shadow-lg border-0"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${COLORS.innovation}20` }}>
              <ClipboardList className="w-5 h-5" style={{ color: COLORS.growth }} />
            </div>
          </div>
          <p className="text-2xl font-bold" style={{ color: COLORS.depth }}>{activeTasks}</p>
          <p className="text-xs text-gray-600 font-medium">Active Tasks</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-4 shadow-lg border-0"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-green-100">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-bold" style={{ color: COLORS.depth }}>{completedTasks}</p>
          <p className="text-xs text-gray-600 font-medium">Completed</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-2xl p-4 shadow-lg border-0"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${COLORS.strategy}20` }}>
              <Wrench className="w-5 h-5" style={{ color: COLORS.strategy }} />
            </div>
          </div>
          <p className="text-2xl font-bold" style={{ color: COLORS.depth }}>{activeRooms}</p>
          <p className="text-xs text-gray-600 font-medium">Active Rooms</p>
        </motion.div>
      </div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-6 mb-6 shadow-lg border-0"
      >
        <h2 className="font-semibold mb-4" style={{ color: COLORS.depth }}>Room Status</h2>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS.growth }}></div>
            <span className="font-medium text-gray-700">Active Tasks</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
            <span className="font-medium text-gray-700">No Tasks</span>
          </div>
        </div>
      </motion.div>

      {/* SVG Floor Plan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-3xl p-6 shadow-xl border-0"
      >
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

            {/* Rooms */}
            {rooms.map((room) => {
              const activeTasks = room.tasks.filter(t => t.status !== 'completed').length;
              return (
                <g key={room.id}>
                  <rect
                    x={room.x}
                    y={room.y}
                    width={room.width}
                    height={room.height}
                    fill={getRoomColor(room)}
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
          Click on any room to view and manage tasks
        </p>
      </motion.div>

      {selectedRoomData && (
        <RoomBottomSheet
          room={selectedRoomData}
          onClose={() => setSelectedRoom(null)}
          onAddTask={addTaskToRoom}
          onCompleteTask={completeTask}
        />
      )}
    </div>
  );
}
