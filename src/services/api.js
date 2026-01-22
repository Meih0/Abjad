import { generateClient } from 'aws-amplify/api';

const client = generateClient();

// ==========================================
// GRAPHQL QUERIES & MUTATIONS
// ==========================================

// Rooms
export const listRooms = /* GraphQL */ `
  query ListRooms($filter: ModelRoomFilterInput, $limit: Int) {
    listRooms(filter: $filter, limit: $limit) {
      items {
        id
        userId
        name
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

export const createRoom = /* GraphQL */ `
  mutation CreateRoom($input: CreateRoomInput!) {
    createRoom(input: $input) {
      id
      userId
      name
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

// Tasks
export const listTasks = /* GraphQL */ `
  query ListTasks($filter: ModelTaskFilterInput) {
    listTasks(filter: $filter) {
      items {
        id
        roomId
        assignedTo
        title
        type
        status
        priority
        estimatedTime
        createdAt
        updatedAt
      }
    }
  }
`;

export const createTask = /* GraphQL */ `
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
      roomId
      assignedTo
      title
      type
      status
      priority
      estimatedTime
      createdAt
      updatedAt
    }
  }
`;

export const updateTask = /* GraphQL */ `
  mutation UpdateTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      id
      status
      updatedAt
    }
  }
`;

export const deleteTask = /* GraphQL */ `
  mutation DeleteTask($input: DeleteTaskInput!) {
    deleteTask(input: $input) {
      id
    }
  }
`;

// Household Tasks
export const listHouseholdTasks = /* GraphQL */ `
  query ListHouseholdTasks($filter: ModelHouseholdTaskFilterInput) {
    listHouseholdTasks(filter: $filter) {
      items {
        id
        userId
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
        createdAt
        updatedAt
      }
    }
  }
`;

export const createHouseholdTask = /* GraphQL */ `
  mutation CreateHouseholdTask($input: CreateHouseholdTaskInput!) {
    createHouseholdTask(input: $input) {
      id
      title
      type
      status
      createdAt
    }
  }
`;

// Tickets
export const listTickets = /* GraphQL */ `
  query ListTickets($filter: ModelTicketFilterInput) {
    listTickets(filter: $filter) {
      items {
        id
        userId
        fromUser
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

export const createTicket = /* GraphQL */ `
  mutation CreateTicket($input: CreateTicketInput!) {
    createTicket(input: $input) {
      id
      title
      description
      status
      priority
      createdAt
    }
  }
`;

// Assets
export const listAssets = /* GraphQL */ `
  query ListAssets($filter: ModelAssetFilterInput) {
    listAssets(filter: $filter) {
      items {
        id
        userId
        name
        nameAr
        category
        location
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

export const createAsset = /* GraphQL */ `
  mutation CreateAsset($input: CreateAssetInput!) {
    createAsset(input: $input) {
      id
      name
      category
      location
      value
      createdAt
    }
  }
`;

// Bookings
export const listBookings = /* GraphQL */ `
  query ListBookings($filter: ModelBookingFilterInput) {
    listBookings(filter: $filter) {
      items {
        id
        userId
        serviceId
        serviceName
        date
        time
        price
        status
        createdAt
        updatedAt
      }
    }
  }
`;

export const createBooking = /* GraphQL */ `
  mutation CreateBooking($input: CreateBookingInput!) {
    createBooking(input: $input) {
      id
      serviceName
      date
      time
      price
      status
      createdAt
    }
  }
`;

// ==========================================
// API FUNCTIONS
// ==========================================

// Rooms
export async function fetchRooms() {
  try {
    const result = await client.graphql({
      query: listRooms,
    });
    return result.data.listRooms.items;
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
}

export async function addRoom(roomData) {
  try {
    const result = await client.graphql({
      query: createRoom,
      variables: {
        input: roomData
      }
    });
    return result.data.createRoom;
  } catch (error) {
    console.error('Error creating room:', error);
    throw error;
  }
}

// Tasks
export async function fetchTasks(roomId = null) {
  try {
    const filter = roomId ? { roomId: { eq: roomId } } : undefined;
    const result = await client.graphql({
      query: listTasks,
      variables: { filter }
    });
    return result.data.listTasks.items;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
}

export async function fetchUserTasks(userId) {
  try {
    const result = await client.graphql({
      query: listTasks,
      variables: {
        filter: {
          assignedTo: { eq: userId }
        }
      }
    });
    return result.data.listTasks.items;
  } catch (error) {
    console.error('Error fetching user tasks:', error);
    throw error;
  }
}

export async function addTask(taskData) {
  try {
    const result = await client.graphql({
      query: createTask,
      variables: {
        input: taskData
      }
    });
    return result.data.createTask;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
}

export async function completeTask(taskId) {
  try {
    const result = await client.graphql({
      query: updateTask,
      variables: {
        input: {
          id: taskId,
          status: 'completed'
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
      query: deleteTask,
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
export async function fetchHouseholdTasks() {
  try {
    const result = await client.graphql({
      query: listHouseholdTasks,
    });
    return result.data.listHouseholdTasks.items;
  } catch (error) {
    console.error('Error fetching household tasks:', error);
    throw error;
  }
}

export async function addHouseholdTask(taskData) {
  try {
    const result = await client.graphql({
      query: createHouseholdTask,
      variables: {
        input: taskData
      }
    });
    return result.data.createHouseholdTask;
  } catch (error) {
    console.error('Error creating household task:', error);
    throw error;
  }
}

// Tickets
export async function fetchTickets() {
  try {
    const result = await client.graphql({
      query: listTickets,
    });
    return result.data.listTickets.items;
  } catch (error) {
    console.error('Error fetching tickets:', error);
    throw error;
  }
}

export async function addTicket(ticketData) {
  try {
    const result = await client.graphql({
      query: createTicket,
      variables: {
        input: ticketData
      }
    });
    return result.data.createTicket;
  } catch (error) {
    console.error('Error creating ticket:', error);
    throw error;
  }
}

// Assets
export async function fetchAssets() {
  try {
    const result = await client.graphql({
      query: listAssets,
    });
    return result.data.listAssets.items;
  } catch (error) {
    console.error('Error fetching assets:', error);
    throw error;
  }
}

export async function addAsset(assetData) {
  try {
    const result = await client.graphql({
      query: createAsset,
      variables: {
        input: assetData
      }
    });
    return result.data.createAsset;
  } catch (error) {
    console.error('Error creating asset:', error);
    throw error;
  }
}

// Bookings
export async function fetchBookings() {
  try {
    const result = await client.graphql({
      query: listBookings,
    });
    return result.data.listBookings.items;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
}

export async function addBooking(bookingData) {
  try {
    const result = await client.graphql({
      query: createBooking,
      variables: {
        input: bookingData
      }
    });
    return result.data.createBooking;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
}
