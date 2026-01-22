# ✅ Frontend Integration Complete!

## 🎉 What I Just Did For You

I've set up the complete AWS backend integration for your Abjad app. Here's everything that's now ready to use:

---

## 📁 Files Created

### 1. **AWS Credentials** (PRIVATE)
- 📄 `AWS_CREDENTIALS.md` - Your GraphQL endpoint and API key

### 2. **Configuration**
- 📄 `src/config/amplify.js` - Amplify configuration
- 📄 `src/main.jsx` - Updated to import Amplify config

### 3. **Services**
- 📄 `src/services/api.js` - Complete API service layer
- 📄 `src/services/storage.js` - S3 file upload/download

---

## 🚀 How to Use the API in Your Components

### Example 1: Fetch and Display Rooms

```javascript
import { fetchRooms } from '../services/api';
import { useState, useEffect } from 'react';

function DigitalTwin() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRooms();
  }, []);

  async function loadRooms() {
    try {
      const data = await fetchRooms();
      setRooms(data);
    } catch (error) {
      console.error('Failed to load rooms:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {rooms.map(room => (
        <div key={room.id}>{room.name}</div>
      ))}
    </div>
  );
}
```

### Example 2: Create a New Task

```javascript
import { addTask } from '../services/api';

async function handleCreateTask() {
  try {
    const newTask = await addTask({
      roomId: 'room-123',
      title: 'Clean AC filters',
      type: 'cleaning',
      status: 'pending',
      priority: 'high',
      assignedTo: 'user-456',
      estimatedTime: '30 mins'
    });

    console.log('Task created:', newTask);
    // Update UI with new task
  } catch (error) {
    console.error('Failed to create task:', error);
  }
}
```

### Example 3: Upload a Receipt

```javascript
import { uploadReceipt } from '../services/storage';

async function handleFileUpload(file, assetId) {
  try {
    const url = await uploadReceipt(file, assetId);
    console.log('Receipt uploaded:', url);
    // Save URL to database
  } catch (error) {
    console.error('Failed to upload:', error);
  }
}

// In your component:
<input
  type="file"
  onChange={(e) => handleFileUpload(e.target.files[0], 'asset-123')}
  accept="image/*,application/pdf"
/>
```

### Example 4: Complete a Task

```javascript
import { completeTask } from '../services/api';

async function markTaskDone(taskId) {
  try {
    await completeTask(taskId);
    console.log('Task completed!');
    // Refresh task list
  } catch (error) {
    console.error('Failed to complete task:', error);
  }
}
```

---

## 🔧 Available API Functions

### Rooms
- `fetchRooms()` - Get all rooms
- `addRoom(roomData)` - Create new room

### Tasks
- `fetchTasks(roomId?)` - Get all tasks (optional: filter by room)
- `fetchUserTasks(userId)` - Get tasks for specific user
- `addTask(taskData)` - Create new task
- `completeTask(taskId)` - Mark task as completed
- `removeTask(taskId)` - Delete task

### Household Tasks
- `fetchHouseholdTasks()` - Get bills, groceries, etc.
- `addHouseholdTask(taskData)` - Create new household task

### Tickets
- `fetchTickets()` - Get all support tickets
- `addTicket(ticketData)` - Create new ticket

### Assets
- `fetchAssets()` - Get all assets
- `addAsset(assetData)` - Create new asset

### Bookings
- `fetchBookings()` - Get all service bookings
- `addBooking(bookingData)` - Create new booking

### Storage (S3)
- `uploadReceipt(file, assetId)` - Upload receipt image
- `uploadFile(file, folder)` - Upload any file
- `deleteFile(fileKey)` - Delete file
- `getFileUrl(fileKey)` - Get file URL

---

## 🎯 Next Steps to Make It Fully Functional

### Step 1: Add Authentication (IMPORTANT!)

Right now, your API is using an API Key (temporary). You need Cognito:

```bash
amplify add auth
# Choose: Default configuration
# Sign in: Email
# No advanced settings

amplify push
```

This will:
- Enable user sign-up/login
- Secure your API
- Enable multi-user support

### Step 2: Update Components to Use Real Data

Example for Digital Twin:

```javascript
// OLD (Mock data):
const [rooms, setRooms] = useState(initialRooms);

// NEW (Real API):
import { fetchRooms, addTask, completeTask } from '../services/api';

const [rooms, setRooms] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  async function loadData() {
    try {
      const roomsData = await fetchRooms();
      setRooms(roomsData);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }
  loadData();
}, []);
```

### Step 3: Handle Loading & Error States

```javascript
function Component() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const result = await fetchRooms();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <div>{/* Your UI */}</div>;
}
```

---

## 🔐 Security Notes

### What's Already Secure:
- ✅ All data stored in DynamoDB (encrypted at rest)
- ✅ HTTPS for all API calls
- ✅ S3 files are private by default
- ✅ GraphQL schema has owner-based auth rules

### What You Need to Do:
1. **Never commit** `aws-exports.js` to git
2. **Add to `.gitignore`**:
   ```
   src/aws-exports.js
   AWS_CREDENTIALS.md
   amplify/
   .amplify/
   ```

3. **Add Cognito authentication** (see Step 1 above)

---

## 📊 Data Structure Examples

### Room Object
```javascript
{
  id: "uuid-123",
  userId: "user-456",
  name: "Living Room",
  x: 50,
  y: 50,
  width: 200,
  height: 150,
  status: "active",
  createdAt: "2026-01-12T00:00:00Z",
  updatedAt: "2026-01-12T00:00:00Z"
}
```

### Task Object
```javascript
{
  id: "task-789",
  roomId: "room-123",
  assignedTo: "user-456",
  title: "Clean AC filters",
  type: "cleaning",
  status: "pending", // or "in-progress", "completed"
  priority: "high",  // or "urgent", "medium", "low"
  estimatedTime: "30 mins",
  createdAt: "2026-01-12T00:00:00Z",
  updatedAt: "2026-01-12T00:00:00Z"
}
```

### Asset Object
```javascript
{
  id: "asset-abc",
  userId: "user-456",
  name: "Samsung Refrigerator",
  nameAr: "ثلاجة سامسونج",
  category: "appliance",
  location: "Kitchen",
  purchaseDate: "2025-01-01",
  warranty: "2027-01-01",
  value: 3500,
  receiptUrl: "https://s3.../receipts/asset-abc-12345.jpg",
  createdAt: "2026-01-12T00:00:00Z",
  updatedAt: "2026-01-12T00:00:00Z"
}
```

---

## 🧪 Testing Your Setup

### Test 1: Verify Amplify is Configured

```bash
# Start your dev server
npm run dev

# Open browser console, should see no errors
# Check Network tab for API calls
```

### Test 2: Test API Connection

Create a test component:

```javascript
import { fetchRooms } from './services/api';

function TestComponent() {
  const testAPI = async () => {
    try {
      const rooms = await fetchRooms();
      console.log('✅ API works!', rooms);
    } catch (error) {
      console.error('❌ API error:', error);
    }
  };

  return <button onClick={testAPI}>Test API</button>;
}
```

### Test 3: Test S3 Upload

```javascript
import { uploadFile } from './services/storage';

function TestUpload() {
  const testUpload = async (e) => {
    const file = e.target.files[0];
    try {
      const url = await uploadFile(file, 'test');
      console.log('✅ Upload works!', url);
    } catch (error) {
      console.error('❌ Upload error:', error);
    }
  };

  return <input type="file" onChange={testUpload} />;
}
```

---

## 🐛 Common Issues & Solutions

### Issue: "Unable to find Amplify configuration"
**Solution:** Make sure `src/config/amplify.js` is imported in `main.jsx`

### Issue: "GraphQL error: Unauthorized"
**Solution:** You need to add Cognito auth:
```bash
amplify add auth
amplify push
```

### Issue: "Network error"
**Solution:** Check your AWS credentials in `AWS_CREDENTIALS.md`

### Issue: "CORS error"
**Solution:** API Gateway CORS is auto-configured by Amplify, but verify in AWS Console

---

## 💡 Pro Tips

### 1. Use React Query for Better Data Management

```bash
npm install @tanstack/react-query
```

```javascript
import { useQuery } from '@tanstack/react-query';
import { fetchRooms } from './services/api';

function DigitalTwin() {
  const { data: rooms, isLoading, error } = useQuery({
    queryKey: ['rooms'],
    queryFn: fetchRooms
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{/* Render rooms */}</div>;
}
```

### 2. Create a Custom Hook for API Calls

```javascript
// src/hooks/useRooms.js
import { useState, useEffect } from 'react';
import { fetchRooms } from '../services/api';

export function useRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchRooms();
        setRooms(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { rooms, loading, error };
}

// Usage:
function Component() {
  const { rooms, loading, error } = useRooms();
  // ...
}
```

### 3. Add Optimistic UI Updates

```javascript
async function handleCompleteTask(taskId) {
  // Update UI immediately
  setTasks(tasks.map(t =>
    t.id === taskId ? { ...t, status: 'completed' } : t
  ));

  try {
    // Sync with backend
    await completeTask(taskId);
  } catch (error) {
    // Rollback on error
    console.error('Failed to complete task:', error);
    // Refresh from backend
    const updatedTasks = await fetchTasks();
    setTasks(updatedTasks);
  }
}
```

---

## 📈 Performance Optimization

### 1. Implement Caching

```javascript
const cache = new Map();

export async function fetchRoomsWithCache() {
  const cacheKey = 'rooms';
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < 5 * 60 * 1000) {
    return cached.data; // Return cached data if less than 5 mins old
  }

  const data = await fetchRooms();
  cache.set(cacheKey, { data, timestamp: Date.now() });
  return data;
}
```

### 2. Batch API Calls

Instead of calling `fetchTasks()` multiple times, combine into one query:

```javascript
// ❌ BAD: Multiple calls
const room1Tasks = await fetchTasks('room-1');
const room2Tasks = await fetchTasks('room-2');
const room3Tasks = await fetchTasks('room-3');

// ✅ GOOD: Single call
const allTasks = await fetchTasks();
const room1Tasks = allTasks.filter(t => t.roomId === 'room-1');
const room2Tasks = allTasks.filter(t => t.roomId === 'room-2');
const room3Tasks = allTasks.filter(t => t.roomId === 'room-3');
```

---

## ✅ Checklist: Integration Complete

- [x] AWS Amplify installed
- [x] Amplify configured in React
- [x] API service layer created
- [x] Storage service created
- [x] GraphQL schema deployed
- [x] S3 bucket created
- [ ] **Authentication added** (Your next step!)
- [ ] Components updated to use real data
- [ ] Tested locally

---

## 🚀 You're Ready!

Everything is set up and ready to use. Your next steps:

1. **Add authentication:** `amplify add auth` then `amplify push`
2. **Start replacing mock data** with real API calls (one component at a time)
3. **Test everything** locally with `npm run dev`
4. **Deploy** with `amplify publish`

Need help? Check out:
- `BACKEND_INTEGRATION.md` - More code examples
- `AWS_SETUP_GUIDE.md` - Complete AWS guide
- `AWS_NEXT_STEPS.md` - What to do after auth

**You've got this!** 🎉
