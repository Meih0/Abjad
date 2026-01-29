/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createHome = /* GraphQL */ `
  mutation CreateHome(
    $input: CreateHomeInput!
    $condition: ModelHomeConditionInput
  ) {
    createHome(input: $input, condition: $condition) {
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
export const updateHome = /* GraphQL */ `
  mutation UpdateHome(
    $input: UpdateHomeInput!
    $condition: ModelHomeConditionInput
  ) {
    updateHome(input: $input, condition: $condition) {
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
export const deleteHome = /* GraphQL */ `
  mutation DeleteHome(
    $input: DeleteHomeInput!
    $condition: ModelHomeConditionInput
  ) {
    deleteHome(input: $input, condition: $condition) {
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
export const createHomeMember = /* GraphQL */ `
  mutation CreateHomeMember(
    $input: CreateHomeMemberInput!
    $condition: ModelHomeMemberConditionInput
  ) {
    createHomeMember(input: $input, condition: $condition) {
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
export const updateHomeMember = /* GraphQL */ `
  mutation UpdateHomeMember(
    $input: UpdateHomeMemberInput!
    $condition: ModelHomeMemberConditionInput
  ) {
    updateHomeMember(input: $input, condition: $condition) {
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
export const deleteHomeMember = /* GraphQL */ `
  mutation DeleteHomeMember(
    $input: DeleteHomeMemberInput!
    $condition: ModelHomeMemberConditionInput
  ) {
    deleteHomeMember(input: $input, condition: $condition) {
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
export const createHomeInvite = /* GraphQL */ `
  mutation CreateHomeInvite(
    $input: CreateHomeInviteInput!
    $condition: ModelHomeInviteConditionInput
  ) {
    createHomeInvite(input: $input, condition: $condition) {
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
export const updateHomeInvite = /* GraphQL */ `
  mutation UpdateHomeInvite(
    $input: UpdateHomeInviteInput!
    $condition: ModelHomeInviteConditionInput
  ) {
    updateHomeInvite(input: $input, condition: $condition) {
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
export const deleteHomeInvite = /* GraphQL */ `
  mutation DeleteHomeInvite(
    $input: DeleteHomeInviteInput!
    $condition: ModelHomeInviteConditionInput
  ) {
    deleteHomeInvite(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createRoom = /* GraphQL */ `
  mutation CreateRoom(
    $input: CreateRoomInput!
    $condition: ModelRoomConditionInput
  ) {
    createRoom(input: $input, condition: $condition) {
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
export const updateRoom = /* GraphQL */ `
  mutation UpdateRoom(
    $input: UpdateRoomInput!
    $condition: ModelRoomConditionInput
  ) {
    updateRoom(input: $input, condition: $condition) {
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
export const deleteRoom = /* GraphQL */ `
  mutation DeleteRoom(
    $input: DeleteRoomInput!
    $condition: ModelRoomConditionInput
  ) {
    deleteRoom(input: $input, condition: $condition) {
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
export const createTask = /* GraphQL */ `
  mutation CreateTask(
    $input: CreateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    createTask(input: $input, condition: $condition) {
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
export const updateTask = /* GraphQL */ `
  mutation UpdateTask(
    $input: UpdateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    updateTask(input: $input, condition: $condition) {
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
export const deleteTask = /* GraphQL */ `
  mutation DeleteTask(
    $input: DeleteTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    deleteTask(input: $input, condition: $condition) {
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
export const createHouseholdTask = /* GraphQL */ `
  mutation CreateHouseholdTask(
    $input: CreateHouseholdTaskInput!
    $condition: ModelHouseholdTaskConditionInput
  ) {
    createHouseholdTask(input: $input, condition: $condition) {
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
export const updateHouseholdTask = /* GraphQL */ `
  mutation UpdateHouseholdTask(
    $input: UpdateHouseholdTaskInput!
    $condition: ModelHouseholdTaskConditionInput
  ) {
    updateHouseholdTask(input: $input, condition: $condition) {
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
export const deleteHouseholdTask = /* GraphQL */ `
  mutation DeleteHouseholdTask(
    $input: DeleteHouseholdTaskInput!
    $condition: ModelHouseholdTaskConditionInput
  ) {
    deleteHouseholdTask(input: $input, condition: $condition) {
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
export const createTicket = /* GraphQL */ `
  mutation CreateTicket(
    $input: CreateTicketInput!
    $condition: ModelTicketConditionInput
  ) {
    createTicket(input: $input, condition: $condition) {
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
export const updateTicket = /* GraphQL */ `
  mutation UpdateTicket(
    $input: UpdateTicketInput!
    $condition: ModelTicketConditionInput
  ) {
    updateTicket(input: $input, condition: $condition) {
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
export const deleteTicket = /* GraphQL */ `
  mutation DeleteTicket(
    $input: DeleteTicketInput!
    $condition: ModelTicketConditionInput
  ) {
    deleteTicket(input: $input, condition: $condition) {
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
export const createAsset = /* GraphQL */ `
  mutation CreateAsset(
    $input: CreateAssetInput!
    $condition: ModelAssetConditionInput
  ) {
    createAsset(input: $input, condition: $condition) {
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
export const updateAsset = /* GraphQL */ `
  mutation UpdateAsset(
    $input: UpdateAssetInput!
    $condition: ModelAssetConditionInput
  ) {
    updateAsset(input: $input, condition: $condition) {
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
export const deleteAsset = /* GraphQL */ `
  mutation DeleteAsset(
    $input: DeleteAssetInput!
    $condition: ModelAssetConditionInput
  ) {
    deleteAsset(input: $input, condition: $condition) {
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
export const createBooking = /* GraphQL */ `
  mutation CreateBooking(
    $input: CreateBookingInput!
    $condition: ModelBookingConditionInput
  ) {
    createBooking(input: $input, condition: $condition) {
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
export const updateBooking = /* GraphQL */ `
  mutation UpdateBooking(
    $input: UpdateBookingInput!
    $condition: ModelBookingConditionInput
  ) {
    updateBooking(input: $input, condition: $condition) {
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
export const deleteBooking = /* GraphQL */ `
  mutation DeleteBooking(
    $input: DeleteBookingInput!
    $condition: ModelBookingConditionInput
  ) {
    deleteBooking(input: $input, condition: $condition) {
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
