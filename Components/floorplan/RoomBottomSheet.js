import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Clock, CheckCircle2, AlertCircle, Wrench, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { format } from 'date-fns';

const TASK_ICONS = {
  cleaning: Sparkles,
  maintenance: Wrench,
  repair: Wrench,
  inspection: CheckCircle2,
  delivery: Clock,
  other: AlertCircle
};

const PRIORITY_COLORS = {
  low: 'bg-slate-100 text-slate-700',
  medium: 'bg-blue-100 text-blue-700',
  high: 'bg-orange-100 text-orange-700',
  urgent: 'bg-red-100 text-red-700'
};

const STATUS_COLORS = {
  pending: 'bg-amber-100 text-amber-800',
  in_progress: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-gray-100 text-gray-600'
};

export default function RoomBottomSheet({ room, tasks, isOpen, onClose, onTaskAction }) {
  const roomTasks = tasks.filter(t => t.room_id === room?.id);
  const activeTasks = roomTasks.filter(t => ['pending', 'in_progress'].includes(t.status));
  const completedTasks = roomTasks.filter(t => t.status === 'completed');
  const progress = roomTasks.length > 0 
    ? Math.round((completedTasks.length / roomTasks.length) * 100) 
    : 0;

  return (
    <AnimatePresence>
      {isOpen && room && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[85vh] overflow-hidden"
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </div>

            {/* Header */}
            <div className="px-6 pb-4 border-b border-gray-100">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{room.name}</h2>
                  <p className="text-sm text-gray-500 capitalize mt-0.5">
                    {room.room_type?.replace('_', ' ')} • Floor {room.floor || 1}
                  </p>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Status Badge */}
              {room.status && room.status !== 'idle' && (
                <div className="flex items-center gap-2 mt-3">
                  <Badge className={`${STATUS_COLORS[room.status]} px-3 py-1`}>
                    {room.status === 'cleaning' && <Sparkles className="h-3 w-3 mr-1" />}
                    {room.status === 'maintenance' && <Wrench className="h-3 w-3 mr-1" />}
                    {room.status.replace('_', ' ')}
                  </Badge>
                  {room.assigned_worker && (
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <User className="h-3.5 w-3.5" />
                      {room.assigned_worker}
                    </span>
                  )}
                </div>
              )}

              {/* Progress */}
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Task Progress</span>
                  <span className="font-semibold text-gray-900">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-gray-500 mt-1">
                  {completedTasks.length} of {roomTasks.length} tasks completed
                </p>
              </div>
            </div>

            {/* Tasks List */}
            <div className="overflow-y-auto max-h-[50vh] px-6 py-4">
              {activeTasks.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">No active tasks</p>
                  <p className="text-sm text-gray-400 mt-1">This room is all caught up!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Active Tasks ({activeTasks.length})
                  </h3>
                  {activeTasks.map((task) => {
                    const Icon = TASK_ICONS[task.task_type] || AlertCircle;
                    return (
                      <motion.div
                        key={task.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-50 rounded-xl p-4 border border-gray-100"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${
                            task.status === 'in_progress' ? 'bg-blue-100' : 'bg-amber-100'
                          }`}>
                            <Icon className={`h-5 w-5 ${
                              task.status === 'in_progress' ? 'text-blue-600' : 'text-amber-600'
                            }`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="font-semibold text-gray-900">{task.title}</h4>
                              <Badge className={PRIORITY_COLORS[task.priority]} variant="secondary">
                                {task.priority}
                              </Badge>
                            </div>
                            {task.description && (
                              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                {task.description}
                              </p>
                            )}
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                              {task.assigned_name && (
                                <span className="flex items-center gap-1">
                                  <User className="h-3 w-3" />
                                  {task.assigned_name}
                                </span>
                              )}
                              {task.due_date && (
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  Due {format(new Date(task.due_date), 'MMM d')}
                                </span>
                              )}
                            </div>

                            {/* Status Indicator */}
                            {task.status === 'in_progress' && task.assigned_name && (
                              <div className="mt-3 flex items-center gap-2 text-sm">
                                <motion.div
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ duration: 1.5, repeat: Infinity }}
                                  className="h-2 w-2 rounded-full bg-green-500"
                                />
                                <span className="text-green-700 font-medium">
                                  {task.assigned_name}: {task.task_type} in progress
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={onClose}>
                  Close
                </Button>
                <Button 
                  className="flex-1 bg-gray-900 hover:bg-gray-800"
                  onClick={() => onTaskAction && onTaskAction('add', room)}
                >
                  Add Task
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}