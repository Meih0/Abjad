import React from 'react';
import { motion } from 'framer-motion';

const ROOM_COLORS = {
  bedroom: '#E8F4FD',
  bathroom: '#E3F2FD',
  kitchen: '#FFF3E0',
  living_room: '#F3E5F5',
  dining_room: '#E8F5E9',
  office: '#FFF8E1',
  garage: '#ECEFF1',
  storage: '#F5F5F5',
  laundry: '#E1F5FE',
  other: '#FAFAFA'
};

const STATUS_GLOW = {
  idle: 'none',
  occupied: '0 0 20px rgba(33, 150, 243, 0.4)',
  maintenance: '0 0 25px rgba(255, 152, 0, 0.6)',
  cleaning: '0 0 25px rgba(255, 152, 0, 0.6)'
};

export default function FloorPlanSVG({ rooms, tasks, onRoomClick, selectedRoomId }) {
  const getRoomTaskCount = (roomId) => {
    return tasks.filter(t => t.room_id === roomId && t.status !== 'completed').length;
  };

  const hasActiveTasks = (roomId) => {
    return tasks.some(t => t.room_id === roomId && ['pending', 'in_progress'].includes(t.status));
  };

  return (
    <svg 
      viewBox="0 0 800 600" 
      className="w-full h-full"
      style={{ maxHeight: '60vh' }}
    >
      <defs>
        <filter id="glow-orange" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="shadow">
          <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.1"/>
        </filter>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f0f0f0" strokeWidth="0.5"/>
        </pattern>
      </defs>

      {/* Background Grid */}
      <rect width="100%" height="100%" fill="url(#grid)" />
      
      {/* Floor Plan Border */}
      <rect 
        x="40" y="40" 
        width="720" height="520" 
        fill="none" 
        stroke="#1a1a1a" 
        strokeWidth="3"
        rx="4"
      />

      {/* Rooms */}
      {rooms.map((room) => {
        const coords = room.coordinates || { x: 50, y: 50, width: 150, height: 120 };
        const isActive = hasActiveTasks(room.id);
        const isSelected = selectedRoomId === room.id;
        const taskCount = getRoomTaskCount(room.id);
        const baseColor = room.color || ROOM_COLORS[room.room_type] || '#FAFAFA';

        return (
          <g 
            key={room.id} 
            onClick={() => onRoomClick(room)}
            style={{ cursor: 'pointer' }}
          >
            {/* Room Rectangle */}
            <motion.rect
              x={coords.x}
              y={coords.y}
              width={coords.width}
              height={coords.height}
              fill={isActive ? '#FFF8E1' : baseColor}
              stroke={isSelected ? '#1976D2' : isActive ? '#FF9800' : '#333'}
              strokeWidth={isSelected ? 3 : isActive ? 2.5 : 1.5}
              rx="4"
              filter={isActive ? 'url(#glow-orange)' : 'url(#shadow)'}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                fill: isActive ? ['#FFF8E1', '#FFECB3', '#FFF8E1'] : baseColor
              }}
              transition={{ 
                duration: 0.3,
                fill: isActive ? { duration: 2, repeat: Infinity } : { duration: 0 }
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            />

            {/* Room Name */}
            <text
              x={coords.x + coords.width / 2}
              y={coords.y + coords.height / 2 - 8}
              textAnchor="middle"
              className="text-xs font-semibold fill-gray-800 pointer-events-none select-none"
              style={{ fontSize: '12px', fontWeight: 600 }}
            >
              {room.name}
            </text>

            {/* Room Type */}
            <text
              x={coords.x + coords.width / 2}
              y={coords.y + coords.height / 2 + 8}
              textAnchor="middle"
              className="fill-gray-500 pointer-events-none select-none"
              style={{ fontSize: '10px' }}
            >
              {room.room_type?.replace('_', ' ')}
            </text>

            {/* Task Badge */}
            {taskCount > 0 && (
              <g>
                <motion.circle
                  cx={coords.x + coords.width - 15}
                  cy={coords.y + 15}
                  r="12"
                  fill="#FF5722"
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <text
                  x={coords.x + coords.width - 15}
                  y={coords.y + 19}
                  textAnchor="middle"
                  fill="white"
                  style={{ fontSize: '10px', fontWeight: 700 }}
                  className="pointer-events-none select-none"
                >
                  {taskCount}
                </text>
              </g>
            )}

            {/* Status Indicator */}
            {room.status && room.status !== 'idle' && (
              <g>
                <circle
                  cx={coords.x + 15}
                  cy={coords.y + 15}
                  r="6"
                  fill={room.status === 'cleaning' ? '#4CAF50' : room.status === 'maintenance' ? '#FF9800' : '#2196F3'}
                />
                <motion.circle
                  cx={coords.x + 15}
                  cy={coords.y + 15}
                  r="6"
                  fill="none"
                  stroke={room.status === 'cleaning' ? '#4CAF50' : room.status === 'maintenance' ? '#FF9800' : '#2196F3'}
                  strokeWidth="2"
                  initial={{ r: 6, opacity: 1 }}
                  animate={{ r: 12, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </g>
            )}
          </g>
        );
      })}

      {/* Legend */}
      <g transform="translate(50, 520)">
        <rect x="0" y="0" width="12" height="12" fill="#FFF8E1" stroke="#FF9800" strokeWidth="2" rx="2"/>
        <text x="18" y="10" style={{ fontSize: '10px' }} fill="#666">Active Tasks</text>
        
        <circle cx="100" cy="6" r="5" fill="#4CAF50"/>
        <text x="110" y="10" style={{ fontSize: '10px' }} fill="#666">Cleaning</text>
        
        <circle cx="170" cy="6" r="5" fill="#FF9800"/>
        <text x="180" y="10" style={{ fontSize: '10px' }} fill="#666">Maintenance</text>
        
        <circle cx="260" cy="6" r="5" fill="#2196F3"/>
        <text x="270" y="10" style={{ fontSize: '10px' }} fill="#666">Occupied</text>
      </g>
    </svg>
  );
}