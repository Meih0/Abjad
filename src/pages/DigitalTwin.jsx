import React, { useState } from 'react';
import { Home, X, User, Clock, AlertCircle } from 'lucide-react';

// Room data with coordinates and status
const ROOMS = [
  { id: 1, name: 'Living Room', x: 50, y: 50, width: 200, height: 150, status: 'active', tasks: 2 },
  { id: 2, name: 'Kitchen', x: 270, y: 50, width: 180, height: 150, status: 'pending', tasks: 1 },
  { id: 3, name: 'Bedroom 1', x: 50, y: 220, width: 150, height: 130, status: 'normal', tasks: 0 },
  { id: 4, name: 'Bedroom 2', x: 220, y: 220, width: 150, height: 130, status: 'active', tasks: 1 },
  { id: 5, name: 'Bathroom', x: 390, y: 220, width: 100, height: 130, status: 'normal', tasks: 0 },
];

const TASKS_DATA = {
  1: [
    { id: 1, title: 'Vacuum cleaning', assignee: 'Maid Service', status: 'in-progress', time: '30 mins' },
    { id: 2, title: 'Window cleaning', assignee: 'Cleaning Crew', status: 'pending', time: '1 hour' }
  ],
  2: [
    { id: 3, title: 'AC maintenance', assignee: 'HVAC Tech', status: 'in-progress', time: '2 hours' }
  ],
  4: [
    { id: 4, title: 'Furniture assembly', assignee: 'Handyman', status: 'pending', time: '45 mins' }
  ]
};

function RoomBottomSheet({ room, onClose }) {
  const tasks = TASKS_DATA[room.id] || [];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center md:justify-center" onClick={onClose}>
      <div
        className="bg-white rounded-t-3xl md:rounded-2xl w-full md:max-w-lg max-h-[80vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Home className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{room.name}</h2>
                <p className="text-sm text-gray-600">{tasks.length} active tasks</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          {tasks.length > 0 ? (
            <div className="space-y-3">
              {tasks.map((task) => (
                <div key={task.id} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold">{task.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      task.status === 'in-progress'
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {task.assignee}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {task.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <AlertCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No active tasks in this room</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DigitalTwin() {
  const [selectedRoom, setSelectedRoom] = useState(null);

  const getRoomColor = (status) => {
    switch (status) {
      case 'active':
        return '#3b82f6'; // blue
      case 'pending':
        return '#f97316'; // orange - glowing for pending tasks
      case 'normal':
      default:
        return '#e5e7eb'; // gray
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Digital Twin</h1>
        <p className="text-gray-600">Interactive floor plan of your home</p>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <div className="mb-4">
          <h2 className="font-semibold mb-2">Legend</h2>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span>Active Tasks</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span>Pending Tasks</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
              <span>No Tasks</span>
            </div>
          </div>
        </div>

        {/* SVG Floor Plan */}
        <div className="bg-gray-50 rounded-xl p-4 overflow-auto">
          <svg
            viewBox="0 0 550 400"
            className="w-full max-w-3xl mx-auto"
            style={{ minHeight: '400px' }}
          >
            {/* Floor boundary */}
            <rect
              x="20"
              y="20"
              width="510"
              height="360"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="3"
            />

            {/* Rooms */}
            {ROOMS.map((room) => (
              <g key={room.id}>
                <rect
                  x={room.x}
                  y={room.y}
                  width={room.width}
                  height={room.height}
                  fill={getRoomColor(room.status)}
                  stroke="#64748b"
                  strokeWidth="2"
                  rx="8"
                  className="cursor-pointer hover:opacity-80 transition-all"
                  onClick={() => setSelectedRoom(room)}
                  style={{
                    filter: room.status === 'pending' ? 'drop-shadow(0 0 10px #f97316)' : 'none'
                  }}
                />
                <text
                  x={room.x + room.width / 2}
                  y={room.y + room.height / 2}
                  textAnchor="middle"
                  fill={room.status === 'normal' ? '#1f2937' : '#ffffff'}
                  fontSize="14"
                  fontWeight="600"
                  className="pointer-events-none"
                >
                  {room.name}
                </text>
                {room.tasks > 0 && (
                  <circle
                    cx={room.x + room.width - 15}
                    cy={room.y + 15}
                    r="12"
                    fill="#ef4444"
                    className="pointer-events-none"
                  />
                )}
                {room.tasks > 0 && (
                  <text
                    x={room.x + room.width - 15}
                    y={room.y + 20}
                    textAnchor="middle"
                    fill="white"
                    fontSize="12"
                    fontWeight="bold"
                    className="pointer-events-none"
                  >
                    {room.tasks}
                  </text>
                )}
              </g>
            ))}
          </svg>
        </div>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Click on any room to view active tasks and assigned workers
        </p>
      </div>

      {selectedRoom && (
        <RoomBottomSheet
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
        />
      )}
    </div>
  );
}
