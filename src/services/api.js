import { generateClient } from 'aws-amplify/api';

const client = generateClient();

// ==========================================
// GRAPHQL QUERIES & MUTATIONS
// ==========================================

// Rooms
export const listRoomsByHome = /* GraphQL */ `
  query ListRoomsByHome($homeId: ID!) {
    roomsByHomeId(homeId: $homeId) {
      items {
        id
        homeId
        homeOwners
        name
        nameAr
        x
        y
        width
        height
        status
        createdAt
        updatedAt
      }
    }
  }
`;

export const createRoomMutation = /* GraphQL */ `
  mutation CreateRoom($input: CreateRoomInput!) {
    createRoom(input: $input) {
      id
      homeId
      homeOwners
      name
      nameAr
      x
      y
      width
      height
      status
      createdAt
      updatedAt
    }
  }
`;

export const updateRoomMutation = /* GraphQL */ `
  mutation UpdateRoom($input: UpdateRoomInput!) {
    updateRoom(input: $input) {
      id
      name
      nameAr
      x
      y
      width
      height
      status
      updatedAt
    }
  }
`;

export const deleteRoomMutation = /* GraphQL */ `
  mutation DeleteRoom($input: DeleteRoomInput!) {
    deleteRoom(input: $input) {
      id
    }
  }
`;

// Tasks
export const listTasksByHome = /* GraphQL */ `
  query ListTasksByHome($homeId: ID!) {
    tasksByHomeId(homeId: $homeId) {
      items {
        id
        homeId
        homeOwners
        roomId
        assignedTo
        assignedToName
        createdBy
        title
        titleAr
        type
        status
        priority
        estimatedTime
        dueDate
        completedAt
        completedBy
        notes
        createdAt
        updatedAt
      }
    }
  }
`;

export const listTasksByAssignee = /* GraphQL */ `
  query ListTasksByAssignee($assignedTo: ID!) {
    tasksByAssignedTo(assignedTo: $assignedTo) {
      items {
        id
        homeId
        homeOwners
        roomId
        assignedTo
        assignedToName
        createdBy
        title
        titleAr
        type
        status
        priority
        estimatedTime
        dueDate
        completedAt
        completedBy
        notes
        createdAt
        updatedAt
      }
    }
  }
`;

export const createTaskMutation = /* GraphQL */ `
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
      homeId
      homeOwners
      roomId
      assignedTo
      assignedToName
      createdBy
      title
      titleAr
      type
      status
      priority
      estimatedTime
      dueDate
      notes
      createdAt
      updatedAt
    }
  }
`;

export const updateTaskMutation = /* GraphQL */ `
  mutation UpdateTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      id
      status
      completedAt
      completedBy
      updatedAt
    }
  }
`;

export const deleteTaskMutation = /* GraphQL */ `
  mutation DeleteTask($input: DeleteTaskInput!) {
    deleteTask(input: $input) {
      id
    }
  }
`;

// Household Tasks
export const listHouseholdTasksByHome = /* GraphQL */ `
  query ListHouseholdTasksByHome($homeId: ID!) {
    householdTasksByHomeId(homeId: $homeId) {
      items {
        id
        homeId
        homeOwners
        title
        titleAr
        type
        assignedTo
        assignedToName
        dueDate
        amount
        priority
        status
        provider
        notes
        isFinancial
        createdAt
        updatedAt
      }
    }
  }
`;

export const createHouseholdTaskMutation = /* GraphQL */ `
  mutation CreateHouseholdTask($input: CreateHouseholdTaskInput!) {
    createHouseholdTask(input: $input) {
      id
      homeId
      title
      titleAr
      type
      assignedTo
      dueDate
      amount
      priority
      status
      provider
      notes
      isFinancial
      createdAt
    }
  }
`;

export const updateHouseholdTaskMutation = /* GraphQL */ `
  mutation UpdateHouseholdTask($input: UpdateHouseholdTaskInput!) {
    updateHouseholdTask(input: $input) {
      id
      status
      updatedAt
    }
  }
`;

export const deleteHouseholdTaskMutation = /* GraphQL */ `
  mutation DeleteHouseholdTask($input: DeleteHouseholdTaskInput!) {
    deleteHouseholdTask(input: $input) {
      id
    }
  }
`;

// Tickets
export const listTicketsByHome = /* GraphQL */ `
  query ListTicketsByHome($homeId: ID!) {
    ticketsByHomeId(homeId: $homeId) {
      items {
        id
        homeId
        homeOwners
        fromUser
        fromUserName
        title
        description
        status
        priority
        createdAt
        updatedAt
      }
    }
  }
`;

export const createTicketMutation = /* GraphQL */ `
  mutation CreateTicket($input: CreateTicketInput!) {
    createTicket(input: $input) {
      id
      homeId
      fromUser
      fromUserName
      title
      description
      status
      priority
      createdAt
    }
  }
`;

export const updateTicketMutation = /* GraphQL */ `
  mutation UpdateTicket($input: UpdateTicketInput!) {
    updateTicket(input: $input) {
      id
      status
      updatedAt
    }
  }
`;

// Assets
export const listAssetsByHome = /* GraphQL */ `
  query ListAssetsByHome($homeId: ID!) {
    assetsByHomeId(homeId: $homeId) {
      items {
        id
        homeId
        homeOwners
        name
        nameAr
        category
        location
        roomId
        purchaseDate
        warranty
        value
        receiptUrl
        createdAt
        updatedAt
      }
    }
  }
`;

export const createAssetMutation = /* GraphQL */ `
  mutation CreateAsset($input: CreateAssetInput!) {
    createAsset(input: $input) {
      id
      homeId
      name
      nameAr
      category
      location
      roomId
      purchaseDate
      warranty
      value
      receiptUrl
      createdAt
    }
  }
`;

export const updateAssetMutation = /* GraphQL */ `
  mutation UpdateAsset($input: UpdateAssetInput!) {
    updateAsset(input: $input) {
      id
      name
      category
      location
      value
      updatedAt
    }
  }
`;

export const deleteAssetMutation = /* GraphQL */ `
  mutation DeleteAsset($input: DeleteAssetInput!) {
    deleteAsset(input: $input) {
      id
    }
  }
`;

// Bookings
export const listBookingsByHome = /* GraphQL */ `
  query ListBookingsByHome($homeId: ID!) {
    bookingsByHomeId(homeId: $homeId) {
      items {
        id
        homeId
        homeOwners
        bookedBy
        bookedByName
        serviceId
        serviceName
        serviceType
        date
        time
        price
        status
        notes
        createdAt
        updatedAt
      }
    }
  }
`;

export const createBookingMutation = /* GraphQL */ `
  mutation CreateBooking($input: CreateBookingInput!) {
    createBooking(input: $input) {
      id
      homeId
      bookedBy
      bookedByName
      serviceName
      serviceType
      date
      time
      price
      status
      notes
      createdAt
    }
  }
`;

export const updateBookingMutation = /* GraphQL */ `
  mutation UpdateBooking($input: UpdateBookingInput!) {
    updateBooking(input: $input) {
      id
      status
      updatedAt
    }
  }
`;

// ==========================================
// API FUNCTIONS
// ==========================================

// Rooms
export async function fetchRooms(homeId) {
  if (!homeId) throw new Error('Home ID is required');
  try {
    const result = await client.graphql({
      query: listRoomsByHome,
      variables: { homeId }
    });
    return result.data.roomsByHomeId?.items || [];
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
}

export async function addRoom(roomData, homeId, homeOwners) {
  if (!homeId) throw new Error('Home ID is required');
  try {
    const result = await client.graphql({
      query: createRoomMutation,
      variables: {
        input: {
          ...roomData,
          homeId,
          homeOwners
        }
      }
    });
    return result.data.createRoom;
  } catch (error) {
    console.error('Error creating room:', error);
    throw error;
  }
}

export async function updateRoom(roomId, roomData) {
  try {
    const result = await client.graphql({
      query: updateRoomMutation,
      variables: {
        input: {
          id: roomId,
          ...roomData
        }
      }
    });
    return result.data.updateRoom;
  } catch (error) {
    console.error('Error updating room:', error);
    throw error;
  }
}

export async function removeRoom(roomId) {
  try {
    const result = await client.graphql({
      query: deleteRoomMutation,
      variables: {
        input: { id: roomId }
      }
    });
    return result.data.deleteRoom;
  } catch (error) {
    console.error('Error deleting room:', error);
    throw error;
  }
}

// Tasks
export async function fetchTasks(homeId) {
  if (!homeId) throw new Error('Home ID is required');
  try {
    const result = await client.graphql({
      query: listTasksByHome,
      variables: { homeId }
    });
    return result.data.tasksByHomeId?.items || [];
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
}

export async function fetchUserTasks(userId) {
  if (!userId) throw new Error('User ID is required');
  try {
    const result = await client.graphql({
      query: listTasksByAssignee,
      variables: { assignedTo: userId }
    });
    return result.data.tasksByAssignedTo?.items || [];
  } catch (error) {
    console.error('Error fetching user tasks:', error);
    throw error;
  }
}

export async function addTask(taskData, homeId, homeOwners, createdBy) {
  if (!homeId) throw new Error('Home ID is required');
  try {
    const result = await client.graphql({
      query: createTaskMutation,
      variables: {
        input: {
          ...taskData,
          homeId,
          homeOwners,
          createdBy
        }
      }
    });
    return result.data.createTask;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
}

export async function completeTask(taskId, completedBy) {
  try {
    const result = await client.graphql({
      query: updateTaskMutation,
      variables: {
        input: {
          id: taskId,
          status: 'completed',
          completedAt: new Date().toISOString(),
          completedBy
        }
      }
    });
    return result.data.updateTask;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
}

export async function updateTask(taskId, taskData) {
  try {
    const result = await client.graphql({
      query: updateTaskMutation,
      variables: {
        input: {
          id: taskId,
          ...taskData
        }
      }
    });
    return result.data.updateTask;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
}

export async function removeTask(taskId) {
  try {
    const result = await client.graphql({
      query: deleteTaskMutation,
      variables: {
        input: { id: taskId }
      }
    });
    return result.data.deleteTask;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
}

// Household Tasks
export async function fetchHouseholdTasks(homeId) {
  if (!homeId) throw new Error('Home ID is required');
  try {
    const result = await client.graphql({
      query: listHouseholdTasksByHome,
      variables: { homeId }
    });
    return result.data.householdTasksByHomeId?.items || [];
  } catch (error) {
    console.error('Error fetching household tasks:', error);
    throw error;
  }
}

export async function addHouseholdTask(taskData, homeId, homeOwners) {
  if (!homeId) throw new Error('Home ID is required');
  try {
    const result = await client.graphql({
      query: createHouseholdTaskMutation,
      variables: {
        input: {
          ...taskData,
          homeId,
          homeOwners
        }
      }
    });
    return result.data.createHouseholdTask;
  } catch (error) {
    console.error('Error creating household task:', error);
    throw error;
  }
}

export async function updateHouseholdTask(taskId, taskData) {
  try {
    const result = await client.graphql({
      query: updateHouseholdTaskMutation,
      variables: {
        input: {
          id: taskId,
          ...taskData
        }
      }
    });
    return result.data.updateHouseholdTask;
  } catch (error) {
    console.error('Error updating household task:', error);
    throw error;
  }
}

export async function removeHouseholdTask(taskId) {
  try {
    const result = await client.graphql({
      query: deleteHouseholdTaskMutation,
      variables: {
        input: { id: taskId }
      }
    });
    return result.data.deleteHouseholdTask;
  } catch (error) {
    console.error('Error deleting household task:', error);
    throw error;
  }
}

// Tickets
export async function fetchTickets(homeId) {
  if (!homeId) throw new Error('Home ID is required');
  try {
    const result = await client.graphql({
      query: listTicketsByHome,
      variables: { homeId }
    });
    return result.data.ticketsByHomeId?.items || [];
  } catch (error) {
    console.error('Error fetching tickets:', error);
    throw error;
  }
}

export async function addTicket(ticketData, homeId, homeOwners) {
  if (!homeId) throw new Error('Home ID is required');
  try {
    const result = await client.graphql({
      query: createTicketMutation,
      variables: {
        input: {
          ...ticketData,
          homeId,
          homeOwners
        }
      }
    });
    return result.data.createTicket;
  } catch (error) {
    console.error('Error creating ticket:', error);
    throw error;
  }
}

export async function updateTicket(ticketId, ticketData) {
  try {
    const result = await client.graphql({
      query: updateTicketMutation,
      variables: {
        input: {
          id: ticketId,
          ...ticketData
        }
      }
    });
    return result.data.updateTicket;
  } catch (error) {
    console.error('Error updating ticket:', error);
    throw error;
  }
}

// Assets
export async function fetchAssets(homeId) {
  if (!homeId) throw new Error('Home ID is required');
  try {
    const result = await client.graphql({
      query: listAssetsByHome,
      variables: { homeId }
    });
    return result.data.assetsByHomeId?.items || [];
  } catch (error) {
    console.error('Error fetching assets:', error);
    throw error;
  }
}

export async function addAsset(assetData, homeId, homeOwners) {
  if (!homeId) throw new Error('Home ID is required');
  try {
    const result = await client.graphql({
      query: createAssetMutation,
      variables: {
        input: {
          ...assetData,
          homeId,
          homeOwners
        }
      }
    });
    return result.data.createAsset;
  } catch (error) {
    console.error('Error creating asset:', error);
    throw error;
  }
}

export async function updateAsset(assetId, assetData) {
  try {
    const result = await client.graphql({
      query: updateAssetMutation,
      variables: {
        input: {
          id: assetId,
          ...assetData
        }
      }
    });
    return result.data.updateAsset;
  } catch (error) {
    console.error('Error updating asset:', error);
    throw error;
  }
}

export async function removeAsset(assetId) {
  try {
    const result = await client.graphql({
      query: deleteAssetMutation,
      variables: {
        input: { id: assetId }
      }
    });
    return result.data.deleteAsset;
  } catch (error) {
    console.error('Error deleting asset:', error);
    throw error;
  }
}

// Bookings
export async function fetchBookings(homeId) {
  if (!homeId) throw new Error('Home ID is required');
  try {
    const result = await client.graphql({
      query: listBookingsByHome,
      variables: { homeId }
    });
    return result.data.bookingsByHomeId?.items || [];
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
}

export async function addBooking(bookingData, homeId, homeOwners) {
  if (!homeId) throw new Error('Home ID is required');
  try {
    const result = await client.graphql({
      query: createBookingMutation,
      variables: {
        input: {
          ...bookingData,
          homeId,
          homeOwners
        }
      }
    });
    return result.data.createBooking;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
}

export async function updateBooking(bookingId, bookingData) {
  try {
    const result = await client.graphql({
      query: updateBookingMutation,
      variables: {
        input: {
          id: bookingId,
          ...bookingData
        }
      }
    });
    return result.data.updateBooking;
  } catch (error) {
    console.error('Error updating booking:', error);
    throw error;
  }
}
