import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, CheckCircle, Clock, Trash2, Edit2, Filter } from 'lucide-react';
import { fetchTasks, fetchUserTasks, addTask, completeTask, removeTask, fetchRooms } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const COLORS = {
  growth: '#005143',
  innovation: '#41E661',
  clarity: '#FEF5E8',
  depth: '#121B22'
};

export default function TasksReal() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState('all');
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    type: 'cleaning',
    priority: 'medium',
    roomId: ''
  });

  // Fetch tasks
  const { data: tasks = [], isLoading: tasksLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks
  });

  // Fetch rooms for dropdown
  const { data: rooms = [] } = useQuery({
    queryKey: ['rooms'],
    queryFn: fetchRooms
  });

  // Add task mutation
  const addTaskMutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
      setShowAddTask(false);
      setNewTask({ title: '', type: 'cleaning', priority: 'medium', roomId: '' });
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

  function handleAddTask() {
    if (!newTask.title.trim()) return;
    addTaskMutation.mutate({
      ...newTask,
      assignedTo: user.userId,
      status: 'pending',
      estimatedTime: '30 mins'
    });
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length
  };

  function getTaskIcon(status) {
    if (status === 'completed') return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (status === 'in-progress') return <Clock className="w-5 h-5 text-blue-600" />;
    return <Clock className="w-5 h-5 text-gray-400" />;
  }

  function getPriorityColor(priority) {
    if (priority === 'urgent') return '#FF0000';
    if (priority === 'high') return '#FF6B6B';
    if (priority === 'medium') return '#FFA500';
    return '#4CAF50';
  }

  if (tasksLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: COLORS.clarity }}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-[#005143] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 lg:pb-8" style={{ backgroundColor: COLORS.clarity }}>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold" style={{ color: COLORS.depth }}>
                My Tasks
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                {stats.pending} pending • {stats.completed} completed
              </p>
            </div>
            <button
              onClick={() => setShowAddTask(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-white transition-all hover:shadow-lg"
              style={{ backgroundColor: COLORS.growth }}
            >
              <Plus className="w-5 h-5" />
              Add Task
            </button>
          </div>

          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { key: 'all', label: 'All', count: stats.total },
              { key: 'pending', label: 'Pending', count: stats.pending },
              { key: 'in-progress', label: 'In Progress', count: stats.inProgress },
              { key: 'completed', label: 'Completed', count: stats.completed }
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setFilter(item.key)}
                className={`px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition-all ${
                  filter === item.key ? 'text-white' : 'text-gray-600 bg-white border-2 border-gray-200'
                }`}
                style={filter === item.key ? { backgroundColor: COLORS.growth } : {}}
              >
                {item.label} ({item.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: COLORS.depth }}>
              {filter === 'all' ? 'No Tasks Yet' : `No ${filter} tasks`}
            </h2>
            <p className="text-gray-600 mb-6">
              {filter === 'all' ? 'Create your first task to get started' : 'All caught up!'}
            </p>
            {filter === 'all' && (
              <button
                onClick={() => setShowAddTask(true)}
                className="px-6 py-3 rounded-xl font-semibold text-white"
                style={{ backgroundColor: COLORS.growth }}
              >
                Create Task
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {getTaskIcon(task.status)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold" style={{ color: COLORS.depth }}>
                          {task.title}
                        </h3>
                        <div className="flex items-center gap-3 mt-1 flex-wrap">
                          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 capitalize">
                            {task.type}
                          </span>
                          <span
                            className="text-xs px-2 py-1 rounded-full text-white capitalize"
                            style={{ backgroundColor: getPriorityColor(task.priority) }}
                          >
                            {task.priority}
                          </span>
                          <span className="text-xs text-gray-500">
                            {task.estimatedTime || '30 mins'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {task.status !== 'completed' && (
                          <button
                            onClick={() => completeTaskMutation.mutate(task.id)}
                            disabled={completeTaskMutation.isPending}
                            className="p-2 rounded-xl hover:bg-green-50 transition-colors"
                            title="Mark as complete"
                          >
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteTaskMutation.mutate(task.id)}
                          disabled={deleteTaskMutation.isPending}
                          className="p-2 rounded-xl hover:bg-red-50 transition-colors"
                          title="Delete task"
                        >
                          <Trash2 className="w-5 h-5 text-red-600" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="capitalize">
                        {task.status === 'in-progress' ? 'In Progress' : task.status}
                      </span>
                      {task.roomId && rooms.find(r => r.id === task.roomId) && (
                        <>
                          <span>•</span>
                          <span>{rooms.find(r => r.id === task.roomId)?.name}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Add Task Modal */}
      <AnimatePresence>
        {showAddTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddTask(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 p-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{ color: COLORS.depth }}>Add New Task</h2>
                <button
                  onClick={() => setShowAddTask(false)}
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
                    placeholder="e.g., Clean kitchen counters"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#005143] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Room (Optional)</label>
                  <select
                    value={newTask.roomId}
                    onChange={(e) => setNewTask({ ...newTask, roomId: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#005143] focus:outline-none"
                  >
                    <option value="">No specific room</option>
                    {rooms.map(room => (
                      <option key={room.id} value={room.id}>{room.name}</option>
                    ))}
                  </select>
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
