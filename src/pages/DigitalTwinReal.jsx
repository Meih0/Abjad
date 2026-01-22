import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Trash2, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { fetchRooms, addRoom, fetchTasks, addTask, completeTask, removeTask } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const COLORS = {
  growth: '#005143',
  innovation: '#41E661',
  clarity: '#FEF5E8',
  depth: '#121B22'
};

export default function DigitalTwinReal() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [newRoom, setNewRoom] = useState({ name: '', x: 50, y: 50, width: 200, height: 150 });
  const [newTask, setNewTask] = useState({ title: '', type: 'cleaning', priority: 'medium' });

  // Fetch rooms
  const { data: rooms = [], isLoading: roomsLoading } = useQuery({
    queryKey: ['rooms'],
    queryFn: fetchRooms
  });

  // Fetch tasks
  const { data: tasks = [], isLoading: tasksLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks
  });

  // Add room mutation
  const addRoomMutation = useMutation({
    mutationFn: addRoom,
    onSuccess: () => {
      queryClient.invalidateQueries(['rooms']);
      setShowAddRoom(false);
      setNewRoom({ name: '', x: 50, y: 50, width: 200, height: 150 });
    }
  });

  // Add task mutation
  const addTaskMutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
      setShowAddTask(false);
      setSelectedRoom(null);
      setNewTask({ title: '', type: 'cleaning', priority: 'medium' });
    }
  });

  // Complete task mutation
  const completeTaskMutation = useMutation({
    mutationFn: completeTask,
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
    }
  });

  // Delete task mutation
  const deleteTaskMutation = useMutation({
    mutationFn: removeTask,
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
    }
  });

  function handleAddRoom() {
    if (!newRoom.name.trim()) return;
    addRoomMutation.mutate({
      ...newRoom,
      status: 'active'
    });
  }

  function handleAddTask() {
    if (!newTask.title.trim() || !selectedRoom) return;
    addTaskMutation.mutate({
      roomId: selectedRoom.id,
      assignedTo: user.userId,
      title: newTask.title,
      type: newTask.type,
      status: 'pending',
      priority: newTask.priority,
      estimatedTime: '30 mins'
    });
  }

  function getRoomTasks(roomId) {
    return tasks.filter(task => task.roomId === roomId);
  }

  function getTaskColor(status) {
    if (status === 'completed') return COLORS.innovation;
    if (status === 'in-progress') return '#FFA500';
    return '#FF6B6B';
  }

  if (roomsLoading || tasksLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: COLORS.clarity }}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-[#005143] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading your home...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 lg:pb-8" style={{ backgroundColor: COLORS.clarity }}>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold" style={{ color: COLORS.depth }}>
                Digital Twin
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                {rooms.length} rooms • {tasks.filter(t => t.status === 'pending').length} pending tasks
              </p>
            </div>
            <button
              onClick={() => setShowAddRoom(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-white transition-all hover:shadow-lg"
              style={{ backgroundColor: COLORS.growth }}
            >
              <Plus className="w-5 h-5" />
              Add Room
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {rooms.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: COLORS.depth }}>No Rooms Yet</h2>
            <p className="text-gray-600 mb-6">Start by adding your first room to the digital twin</p>
            <button
              onClick={() => setShowAddRoom(true)}
              className="px-6 py-3 rounded-xl font-semibold text-white"
              style={{ backgroundColor: COLORS.growth }}
            >
              Add Your First Room
            </button>
          </div>
        ) : (
          <>
            {/* SVG Floor Plan */}
            <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
              <h2 className="text-xl font-bold mb-4" style={{ color: COLORS.depth }}>Floor Plan</h2>
              <svg
                viewBox="0 0 600 400"
                className="w-full border-2 border-gray-200 rounded-2xl"
                style={{ aspectRatio: '600/400', maxHeight: '60vh' }}
              >
                <rect width="600" height="400" fill="#FEF5E8" />

                {rooms.map((room) => {
                  const roomTasks = getRoomTasks(room.id);
                  const pendingTasks = roomTasks.filter(t => t.status === 'pending').length;

                  return (
                    <g key={room.id}>
                      <rect
                        x={room.x}
                        y={room.y}
                        width={room.width}
                        height={room.height}
                        fill={COLORS.growth}
                        fillOpacity="0.1"
                        stroke={COLORS.growth}
                        strokeWidth="2"
                        className="cursor-pointer hover:fill-opacity-20 transition-all"
                        onClick={() => {
                          setSelectedRoom(room);
                          setShowAddTask(true);
                        }}
                      />
                      <text
                        x={room.x + room.width / 2}
                        y={room.y + room.height / 2 - 10}
                        textAnchor="middle"
                        className="text-sm font-bold pointer-events-none"
                        fill={COLORS.depth}
                      >
                        {room.name}
                      </text>
                      {pendingTasks > 0 && (
                        <circle
                          cx={room.x + room.width - 15}
                          cy={room.y + 15}
                          r="12"
                          fill="#FF6B6B"
                        />
                      )}
                      {pendingTasks > 0 && (
                        <text
                          x={room.x + room.width - 15}
                          y={room.y + 20}
                          textAnchor="middle"
                          className="text-xs font-bold pointer-events-none"
                          fill="white"
                        >
                          {pendingTasks}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Rooms List */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rooms.map((room) => {
                const roomTasks = getRoomTasks(room.id);
                return (
                  <div key={room.id} className="bg-white rounded-3xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold" style={{ color: COLORS.depth }}>{room.name}</h3>
                      <button
                        onClick={() => {
                          setSelectedRoom(room);
                          setShowAddTask(true);
                        }}
                        className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="w-5 h-5" style={{ color: COLORS.growth }} />
                      </button>
                    </div>

                    {roomTasks.length === 0 ? (
                      <p className="text-gray-400 text-sm">No tasks yet</p>
                    ) : (
                      <div className="space-y-2">
                        {roomTasks.map((task) => (
                          <div
                            key={task.id}
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                          >
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: getTaskColor(task.status) }}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{task.title}</p>
                              <p className="text-xs text-gray-500 capitalize">{task.type}</p>
                            </div>
                            {task.status !== 'completed' && (
                              <button
                                onClick={() => completeTaskMutation.mutate(task.id)}
                                className="p-1.5 rounded-lg hover:bg-green-100 transition-colors"
                              >
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              </button>
                            )}
                            <button
                              onClick={() => deleteTaskMutation.mutate(task.id)}
                              className="p-1.5 rounded-lg hover:bg-red-100 transition-colors"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Add Room Modal */}
      <AnimatePresence>
        {showAddRoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddRoom(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{ color: COLORS.depth }}>Add Room</h2>
                <button
                  onClick={() => setShowAddRoom(false)}
                  className="p-2 rounded-xl hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Room Name</label>
                  <input
                    type="text"
                    value={newRoom.name}
                    onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                    placeholder="e.g., Living Room"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#005143] focus:outline-none"
                  />
                </div>

                <button
                  onClick={handleAddRoom}
                  disabled={!newRoom.name.trim() || addRoomMutation.isPending}
                  className="w-full py-3 rounded-xl font-bold text-white disabled:opacity-50"
                  style={{ backgroundColor: COLORS.growth }}
                >
                  {addRoomMutation.isPending ? 'Adding...' : 'Add Room'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Task Modal */}
      <AnimatePresence>
        {showAddTask && selectedRoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => { setShowAddTask(false); setSelectedRoom(null); }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{ color: COLORS.depth }}>
                  Add Task to {selectedRoom.name}
                </h2>
                <button
                  onClick={() => { setShowAddTask(false); setSelectedRoom(null); }}
                  className="p-2 rounded-xl hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Task Title</label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="e.g., Clean AC filters"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#005143] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Type</label>
                  <select
                    value={newTask.type}
                    onChange={(e) => setNewTask({ ...newTask, type: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#005143] focus:outline-none"
                  >
                    <option value="cleaning">Cleaning</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="inspection">Inspection</option>
                    <option value="repair">Repair</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#005143] focus:outline-none"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <button
                  onClick={handleAddTask}
                  disabled={!newTask.title.trim() || addTaskMutation.isPending}
                  className="w-full py-3 rounded-xl font-bold text-white disabled:opacity-50"
                  style={{ backgroundColor: COLORS.growth }}
                >
                  {addTaskMutation.isPending ? 'Adding...' : 'Add Task'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
