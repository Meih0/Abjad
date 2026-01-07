import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { CheckCircle, Clock, AlertCircle, ChevronRight, Camera, MapPin } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

const PRIORITY_COLORS = {
  low: { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200' },
  medium: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
  high: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200' },
  urgent: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' }
};

const TASK_TYPE_ICONS = {
  cleaning: '🧹',
  maintenance: '🔧',
  repair: '🛠️',
  inspection: '🔍',
  delivery: '📦',
  other: '📋'
};

function SwipeableTask({ task, onComplete, onTap, rooms }) {
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  const background = useTransform(
    x,
    [-150, 0, 150],
    ['#22c55e', '#ffffff', '#22c55e']
  );
  const checkOpacity = useTransform(x, [-150, -50, 0], [1, 0.5, 0]);
  const checkScale = useTransform(x, [-150, -75, 0], [1, 0.8, 0.5]);

  const room = rooms?.find(r => r.id === task.room_id);
  const priority = PRIORITY_COLORS[task.priority] || PRIORITY_COLORS.medium;

  const handleDragEnd = (event, info) => {
    setIsDragging(false);
    if (info.offset.x < -100) {
      onComplete(task);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-xl">
      {/* Background (revealed on swipe) */}
      <div className="absolute inset-0 bg-green-500 flex items-center justify-start px-6">
        <motion.div
          style={{ opacity: checkOpacity, scale: checkScale }}
          className="flex items-center gap-2 text-white"
        >
          <CheckCircle className="h-6 w-6" />
          <span className="font-semibold">Complete</span>
        </motion.div>
      </div>

      {/* Draggable Card */}
      <motion.div
        drag="x"
        dragConstraints={{ left: -150, right: 0 }}
        dragElastic={0.1}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        style={{ x, backgroundColor: background }}
        onClick={() => !isDragging && onTap(task)}
        className="relative bg-white border border-gray-100 rounded-xl p-4 cursor-grab active:cursor-grabbing"
      >
        <div className="flex items-start gap-3">
          {/* Task Type Icon */}
          <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl shrink-0">
            {TASK_TYPE_ICONS[task.task_type] || '📋'}
          </div>

          {/* Task Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-gray-900 line-clamp-1">{task.title}</h3>
              <ChevronRight className="h-5 w-5 text-gray-400 shrink-0" />
            </div>

            {task.description && (
              <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{task.description}</p>
            )}

            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <Badge className={`${priority.bg} ${priority.text} ${priority.border} border text-xs`}>
                {task.priority}
              </Badge>
              
              {room && (
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {room.name}
                </span>
              )}

              {task.due_date && (
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {format(new Date(task.due_date), 'MMM d')}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Swipe Hint */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none">
          ← Swipe to complete
        </div>
      </motion.div>
    </div>
  );
}

export default function TaskChecklist({ tasks, rooms, onTaskComplete, onTaskTap, currentUser }) {
  const userTasks = tasks.filter(t => 
    t.assigned_to === currentUser?.email && t.status !== 'completed'
  );
  const completedTasks = tasks.filter(t => 
    t.assigned_to === currentUser?.email && t.status === 'completed'
  );
  const totalAssigned = userTasks.length + completedTasks.length;
  const progress = totalAssigned > 0 
    ? Math.round((completedTasks.length / totalAssigned) * 100) 
    : 0;

  // Group tasks by priority
  const urgentTasks = userTasks.filter(t => t.priority === 'urgent');
  const highTasks = userTasks.filter(t => t.priority === 'high');
  const otherTasks = userTasks.filter(t => !['urgent', 'high'].includes(t.priority));

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="bg-[#005143] rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-gray-400 text-sm">Today's Progress</p>
            <h2 className="text-3xl font-bold mt-1">{progress}%</h2>
          </div>
          <div className="w-16 h-16 rounded-full border-4 border-gray-700 flex items-center justify-center relative">
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-gray-700"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                className="text-[#41E661]"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: progress / 100 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                style={{
                  strokeDasharray: '251.2',
                  strokeDashoffset: 0
                }}
              />
            </svg>
            <span className="text-lg font-bold">{completedTasks.length}</span>
          </div>
        </div>

        <Progress value={progress} className="h-2 bg-gray-700" />

        <div className="flex justify-between mt-3 text-sm">
          <span className="text-gray-400">{completedTasks.length} completed</span>
          <span className="text-gray-400">{userTasks.length} remaining</span>
        </div>
      </div>

      {/* Task Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-red-50 rounded-xl p-4 text-center">
          <AlertCircle className="h-5 w-5 text-red-500 mx-auto mb-1" />
          <p className="text-2xl font-bold text-red-700">{urgentTasks.length}</p>
          <p className="text-xs text-red-600">Urgent</p>
        </div>
        <div className="bg-orange-50 rounded-xl p-4 text-center">
          <Clock className="h-5 w-5 text-orange-500 mx-auto mb-1" />
          <p className="text-2xl font-bold text-orange-700">{highTasks.length}</p>
          <p className="text-xs text-orange-600">High Priority</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4 text-center">
          <CheckCircle className="h-5 w-5 text-green-500 mx-auto mb-1" />
          <p className="text-2xl font-bold text-green-700">{completedTasks.length}</p>
          <p className="text-xs text-green-600">Completed</p>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {/* Urgent Tasks */}
        {urgentTasks.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-red-600 uppercase tracking-wider mb-3 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Urgent ({urgentTasks.length})
            </h3>
            <div className="space-y-2">
              <AnimatePresence>
                {urgentTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                  >
                    <SwipeableTask
                      task={task}
                      rooms={rooms}
                      onComplete={onTaskComplete}
                      onTap={onTaskTap}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* High Priority Tasks */}
        {highTasks.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-orange-600 uppercase tracking-wider mb-3">
              High Priority ({highTasks.length})
            </h3>
            <div className="space-y-2">
              <AnimatePresence>
                {highTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                  >
                    <SwipeableTask
                      task={task}
                      rooms={rooms}
                      onComplete={onTaskComplete}
                      onTap={onTaskTap}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Other Tasks */}
        {otherTasks.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Other Tasks ({otherTasks.length})
            </h3>
            <div className="space-y-2">
              <AnimatePresence>
                {otherTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                  >
                    <SwipeableTask
                      task={task}
                      rooms={rooms}
                      onComplete={onTaskComplete}
                      onTap={onTaskTap}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Empty State */}
        {userTasks.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">All caught up!</h3>
            <p className="text-gray-500 mt-1">No pending tasks assigned to you.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}