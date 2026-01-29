/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getHome = /* GraphQL */ `
  query GetHome($id: ID!) {
    getHome(id: $id) {
      id
      name
      nameAr
      owners
      inviteCode
      inviteCodeExpiry
      maxMembers
      createdBy
      members {
        nextToken
        startedAt
        __typename
      }
      invites {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listHomes = /* GraphQL */ `
  query ListHomes(
    $filter: ModelHomeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHomes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        nameAr
        owners
        inviteCode
        inviteCodeExpiry
        maxMembers
        createdBy
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncHomes = /* GraphQL */ `
  query SyncHomes(
    $filter: ModelHomeFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncHomes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        nameAr
        owners
        inviteCode
        inviteCodeExpiry
        maxMembers
        createdBy
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getHomeMember = /* GraphQL */ `
  query GetHomeMember($id: ID!) {
    getHomeMember(id: $id) {
      id
      homeId
      visibleToMembers
      userId
      cognitoUsername
      email
      name
      nameAr
      phone
      avatar
      role
      permissions {
        canViewAllTasks
        canViewAssignedTasks
        canCreateTasks
        canCompleteTasks
        canAssignTasks
        canViewBills
        canManageBills
        canViewAssets
        canManageAssets
        canViewBookings
        canCreateBookings
        canViewAllBookings
        canManageMembers
        canViewRooms
        canManageRooms
        __typename
      }
      homeOwners
      invitedBy
      invitedAt
      acceptedAt
      status
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const listHomeMembers = /* GraphQL */ `
  query ListHomeMembers(
    $filter: ModelHomeMemberFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHomeMembers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        homeId
        visibleToMembers
        userId
        cognitoUsername
        email
        name
        nameAr
        phone
        avatar
        role
        homeOwners
        invitedBy
        invitedAt
        acceptedAt
        status
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncHomeMembers = /* GraphQL */ `
  query SyncHomeMembers(
    $filter: ModelHomeMemberFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncHomeMembers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        homeId
        visibleToMembers
        userId
        cognitoUsername
        email
        name
        nameAr
        phone
        avatar
        role
        homeOwners
        invitedBy
        invitedAt
        acceptedAt
        status
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const homeMembersByHomeId = /* GraphQL */ `
  query HomeMembersByHomeId(
    $homeId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelHomeMemberFilterInput
    $limit: Int
    $nextToken: String
  ) {
    homeMembersByHomeId(
      homeId: $homeId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        homeId
        visibleToMembers
        userId
        cognitoUsername
        email
        name
        nameAr
        phone
        avatar
        role
        homeOwners
        invitedBy
        invitedAt
        acceptedAt
        status
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const homeMembersByUserId = /* GraphQL */ `
  query HomeMembersByUserId(
    $userId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelHomeMemberFilterInput
    $limit: Int
    $nextToken: String
  ) {
    homeMembersByUserId(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        homeId
        visibleToMembers
        userId
        cognitoUsername
        email
        name
        nameAr
        phone
        avatar
        role
        homeOwners
        invitedBy
        invitedAt
        acceptedAt
        status
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getHomeInvite = /* GraphQL */ `
  query GetHomeInvite($id: ID!) {
    getHomeInvite(id: $id) {
      id
      homeId
      homeName
      email
      role
      homeOwners
      invitedBy
      invitedByName
      status
      expiresAt
      customPermissions
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listHomeInvites = /* GraphQL */ `
  query ListHomeInvites(
    $filter: ModelHomeInviteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHomeInvites(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        homeId
        homeName
        email
        role
        homeOwners
        invitedBy
        invitedByName
        status
        expiresAt
        customPermissions
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncHomeInvites = /* GraphQL */ `
  query SyncHomeInvites(
    $filter: ModelHomeInviteFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncHomeInvites(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        homeId
        homeName
        email
        role
        homeOwners
        invitedBy
        invitedByName
        status
        expiresAt
        customPermissions
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const homeInvitesByHomeId = /* GraphQL */ `
  query HomeInvitesByHomeId(
    $homeId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelHomeInviteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    homeInvitesByHomeId(
      homeId: $homeId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        homeId
        homeName
        email
        role
        homeOwners
        invitedBy
        invitedByName
        status
        expiresAt
        customPermissions
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const homeInvitesByEmail = /* GraphQL */ `
  query HomeInvitesByEmail(
    $email: String!
    $sortDirection: ModelSortDirection
    $filter: ModelHomeInviteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    homeInvitesByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        homeId
        homeName
        email
        role
        homeOwners
        invitedBy
        invitedByName
        status
        expiresAt
        customPermissions
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      name
      nameAr
      phone
      avatar
      currentHomeId
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        name
        nameAr
        phone
        avatar
        currentHomeId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        email
        name
        nameAr
        phone
        avatar
        currentHomeId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getRoom = /* GraphQL */ `
  query GetRoom($id: ID!) {
    getRoom(id: $id) {
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
      tasks {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listRooms = /* GraphQL */ `
  query ListRooms(
    $filter: ModelRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncRooms = /* GraphQL */ `
  query SyncRooms(
    $filter: ModelRoomFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncRooms(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const roomsByHomeId = /* GraphQL */ `
  query RoomsByHomeId(
    $homeId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    roomsByHomeId(
      homeId: $homeId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getTask = /* GraphQL */ `
  query GetTask($id: ID!) {
    getTask(id: $id) {
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
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listTasks = /* GraphQL */ `
  query ListTasks(
    $filter: ModelTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncTasks = /* GraphQL */ `
  query SyncTasks(
    $filter: ModelTaskFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTasks(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const tasksByHomeId = /* GraphQL */ `
  query TasksByHomeId(
    $homeId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    tasksByHomeId(
      homeId: $homeId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const tasksByRoomId = /* GraphQL */ `
  query TasksByRoomId(
    $roomId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    tasksByRoomId(
      roomId: $roomId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const tasksByAssignedTo = /* GraphQL */ `
  query TasksByAssignedTo(
    $assignedTo: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    tasksByAssignedTo(
      assignedTo: $assignedTo
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getHouseholdTask = /* GraphQL */ `
  query GetHouseholdTask($id: ID!) {
    getHouseholdTask(id: $id) {
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
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listHouseholdTasks = /* GraphQL */ `
  query ListHouseholdTasks(
    $filter: ModelHouseholdTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHouseholdTasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncHouseholdTasks = /* GraphQL */ `
  query SyncHouseholdTasks(
    $filter: ModelHouseholdTaskFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncHouseholdTasks(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const householdTasksByHomeId = /* GraphQL */ `
  query HouseholdTasksByHomeId(
    $homeId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelHouseholdTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    householdTasksByHomeId(
      homeId: $homeId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getTicket = /* GraphQL */ `
  query GetTicket($id: ID!) {
    getTicket(id: $id) {
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
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listTickets = /* GraphQL */ `
  query ListTickets(
    $filter: ModelTicketFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTickets(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncTickets = /* GraphQL */ `
  query SyncTickets(
    $filter: ModelTicketFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTickets(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const ticketsByHomeId = /* GraphQL */ `
  query TicketsByHomeId(
    $homeId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTicketFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ticketsByHomeId(
      homeId: $homeId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getAsset = /* GraphQL */ `
  query GetAsset($id: ID!) {
    getAsset(id: $id) {
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
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listAssets = /* GraphQL */ `
  query ListAssets(
    $filter: ModelAssetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAssets(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncAssets = /* GraphQL */ `
  query SyncAssets(
    $filter: ModelAssetFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAssets(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const assetsByHomeId = /* GraphQL */ `
  query AssetsByHomeId(
    $homeId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelAssetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    assetsByHomeId(
      homeId: $homeId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getBooking = /* GraphQL */ `
  query GetBooking($id: ID!) {
    getBooking(id: $id) {
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
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listBookings = /* GraphQL */ `
  query ListBookings(
    $filter: ModelBookingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBookings(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncBookings = /* GraphQL */ `
  query SyncBookings(
    $filter: ModelBookingFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncBookings(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const bookingsByHomeId = /* GraphQL */ `
  query BookingsByHomeId(
    $homeId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelBookingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    bookingsByHomeId(
      homeId: $homeId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
