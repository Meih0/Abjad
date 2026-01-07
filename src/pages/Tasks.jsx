import React, { useState } from 'react';
import { ClipboardList, CheckCircle, Clock, User, ChevronRight } from 'lucide-react';

export default function Tasks() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Clean Living Room', room: 'Living Room', assignee: 'You', dueTime: '2:00 PM', status: 'pending' },
    { id: 2, title: 'AC Filter Replacement', room: 'Bedroom 1', assignee: 'You', dueTime: '4:00 PM', status: 'pending' },
    { id: 3, title: 'Kitchen Deep Clean', room: 'Kitchen', assignee: 'You', dueTime: '5:30 PM', status: 'pending' },
    { id: 4, title: 'Window Washing', room: 'Living Room', assignee: 'You', dueTime: '6:00 PM', status: 'completed' }
  ]);

  const [swipedTask, setSwipedTask] = useState(null);

  const handleSwipe = (taskId, direction) => {
    if (direction === 'right') {
      setTasks(tasks.map(t => t.id === taskId ? { ...t, status: 'completed' } : t));
      setSwipedTask(null);
    }
  };

  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const completedTasks = tasks.filter(t => t.status === 'completed');
  const progress = tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">My Tasks</h1>
        <p className="text-gray-600">Swipe right to complete tasks</p>
      </div>

      {/* Progress Card */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm opacity-90">Today's Progress</p>
            <p className="text-3xl font-bold">{Math.round(progress)}%</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{completedTasks.length}/{tasks.length}</p>
            <p className="text-sm opacity-90">Tasks Completed</p>
          </div>
        </div>
        <div className="w-full bg-white/20 rounded-full h-3">
          <div
            className="bg-white h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Pending Tasks */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Pending Tasks ({pendingTasks.length})</h2>
        <div className="space-y-3">
          {pendingTasks.map((task) => (
            <div
              key={task.id}
              className="relative overflow-hidden"
              onTouchStart={(e) => {
                const touch = e.touches[0];
                setSwipedTask({ id: task.id, startX: touch.clientX });
              }}
              onTouchMove={(e) => {
                if (swipedTask?.id === task.id) {
                  const touch = e.touches[0];
                  const diff = touch.clientX - swipedTask.startX;
                  if (diff > 0) {
                    e.currentTarget.style.transform = `translateX(${Math.min(diff, 150)}px)`;
                  }
                }
              }}
              onTouchEnd={(e) => {
                if (swipedTask?.id === task.id) {
                  const diff = e.changedTouches[0].clientX - swipedTask.startX;
                  if (diff > 100) {
                    handleSwipe(task.id, 'right');
                  }
                  e.currentTarget.style.transform = 'translateX(0)';
                }
              }}
            >
              {/* Swipe background */}
              <div className="absolute inset-0 bg-green-500 flex items-center px-6">
                <CheckCircle className="w-6 h-6 text-white" />
                <span className="ml-2 text-white font-semibold">Complete</span>
              </div>

              {/* Task card */}
              <div className="relative bg-white rounded-xl p-4 border border-gray-200 cursor-pointer hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{task.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {task.room}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {task.dueTime}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSwipe(task.id, 'right')}
                    className="md:flex hidden items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Complete
                  </button>
                  <ChevronRight className="md:hidden w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {pendingTasks.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
            <p className="text-gray-600">All tasks completed! Great job! 🎉</p>
          </div>
        )}
      </div>

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-600">Completed ({completedTasks.length})</h2>
          <div className="space-y-2">
            {completedTasks.map((task) => (
              <div key={task.id} className="bg-gray-50 rounded-xl p-4 opacity-60">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div className="flex-1">
                    <h3 className="font-medium line-through">{task.title}</h3>
                    <p className="text-sm text-gray-600">{task.room}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mobile hint */}
      <div className="md:hidden text-center text-sm text-gray-500 py-4">
        👉 Swipe right on tasks to complete them
      </div>
    </div>
  );
}
