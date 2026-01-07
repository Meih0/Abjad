import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList, CheckCircle, Loader2 } from 'lucide-react';
import TaskChecklist from '@/components/tasks/TaskChecklist';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function MyTasks() {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [completionNotes, setCompletionNotes] = useState('');
  const [isCompleting, setIsCompleting] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    base44.auth.me().then(setCurrentUser).catch(() => {});
  }, []);

  const { data: tasks = [], isLoading: tasksLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => base44.entities.Task.list()
  });

  const { data: rooms = [] } = useQuery({
    queryKey: ['rooms'],
    queryFn: () => base44.entities.Room.list()
  });

  const completeTaskMutation = useMutation({
    mutationFn: async ({ taskId, notes }) => {
      await base44.entities.Task.update(taskId, {
        status: 'completed',
        completed_at: new Date().toISOString(),
        notes: notes || undefined
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
      setSelectedTask(null);
      setCompletionNotes('');
    }
  });

  const handleTaskComplete = async (task) => {
    // Quick complete via swipe
    completeTaskMutation.mutate({ taskId: task.id });
  };

  const handleTaskTap = (task) => {
    setSelectedTask(task);
  };

  const confirmComplete = async () => {
    if (!selectedTask) return;
    setIsCompleting(true);
    try {
      await completeTaskMutation.mutateAsync({ 
        taskId: selectedTask.id, 
        notes: completionNotes 
      });
    } finally {
      setIsCompleting(false);
    }
  };

  if (tasksLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FEF5E8]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-30 shadow-sm">
        <div className="max-w-2xl mx-auto px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-[#41E661] rounded-2xl flex items-center justify-center shadow-lg">
              <ClipboardList className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">My Tasks</h1>
              <p className="text-sm text-gray-500 font-medium">
                {currentUser?.full_name || 'Worker'}'s assignments
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-5 py-6">
        <TaskChecklist
          tasks={tasks}
          rooms={rooms}
          currentUser={currentUser}
          onTaskComplete={handleTaskComplete}
          onTaskTap={handleTaskTap}
        />
      </main>

      {/* Task Detail / Complete Dialog */}
      <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Task</DialogTitle>
          </DialogHeader>

          {selectedTask && (
            <div className="space-y-4 py-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900">{selectedTask.title}</h3>
                {selectedTask.description && (
                  <p className="text-sm text-gray-600 mt-1">{selectedTask.description}</p>
                )}
              </div>

              <div>
                <Label>Completion Notes (Optional)</Label>
                <Textarea
                  placeholder="Add any notes about the completed task..."
                  value={completionNotes}
                  onChange={(e) => setCompletionNotes(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setSelectedTask(null)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={confirmComplete}
                  disabled={isCompleting}
                >
                  {isCompleting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Completing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark Complete
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}