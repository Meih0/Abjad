/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateHome = /* GraphQL */ `
  subscription OnCreateHome($filter: ModelSubscriptionHomeFilterInput) {
    onCreateHome(filter: $filter) {
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
export const onUpdateHome = /* GraphQL */ `
  subscription OnUpdateHome($filter: ModelSubscriptionHomeFilterInput) {
    onUpdateHome(filter: $filter) {
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
export const onDeleteHome = /* GraphQL */ `
  subscription OnDeleteHome($filter: ModelSubscriptionHomeFilterInput) {
    onDeleteHome(filter: $filter) {
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
export const onCreateHomeMember = /* GraphQL */ `
  subscription OnCreateHomeMember(
    $filter: ModelSubscriptionHomeMemberFilterInput
    $owner: String
  ) {
    onCreateHomeMember(filter: $filter, owner: $owner) {
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
export const onUpdateHomeMember = /* GraphQL */ `
  subscription OnUpdateHomeMember(
    $filter: ModelSubscriptionHomeMemberFilterInput
    $owner: String
  ) {
    onUpdateHomeMember(filter: $filter, owner: $owner) {
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
export const onDeleteHomeMember = /* GraphQL */ `
  subscription OnDeleteHomeMember(
    $filter: ModelSubscriptionHomeMemberFilterInput
    $owner: String
  ) {
    onDeleteHomeMember(filter: $filter, owner: $owner) {
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
export const onCreateHomeInvite = /* GraphQL */ `
  subscription OnCreateHomeInvite(
    $filter: ModelSubscriptionHomeInviteFilterInput
  ) {
    onCreateHomeInvite(filter: $filter) {
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
export const onUpdateHomeInvite = /* GraphQL */ `
  subscription OnUpdateHomeInvite(
    $filter: ModelSubscriptionHomeInviteFilterInput
  ) {
    onUpdateHomeInvite(filter: $filter) {
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
export const onDeleteHomeInvite = /* GraphQL */ `
  subscription OnDeleteHomeInvite(
    $filter: ModelSubscriptionHomeInviteFilterInput
  ) {
    onDeleteHomeInvite(filter: $filter) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onCreateUser(filter: $filter, owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onUpdateUser(filter: $filter, owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onDeleteUser(filter: $filter, owner: $owner) {
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
export const onCreateRoom = /* GraphQL */ `
  subscription OnCreateRoom($filter: ModelSubscriptionRoomFilterInput) {
    onCreateRoom(filter: $filter) {
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
export const onUpdateRoom = /* GraphQL */ `
  subscription OnUpdateRoom($filter: ModelSubscriptionRoomFilterInput) {
    onUpdateRoom(filter: $filter) {
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
export const onDeleteRoom = /* GraphQL */ `
  subscription OnDeleteRoom($filter: ModelSubscriptionRoomFilterInput) {
    onDeleteRoom(filter: $filter) {
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
export const onCreateTask = /* GraphQL */ `
  subscription OnCreateTask($filter: ModelSubscriptionTaskFilterInput) {
    onCreateTask(filter: $filter) {
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
export const onUpdateTask = /* GraphQL */ `
  subscription OnUpdateTask($filter: ModelSubscriptionTaskFilterInput) {
    onUpdateTask(filter: $filter) {
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
export const onDeleteTask = /* GraphQL */ `
  subscription OnDeleteTask($filter: ModelSubscriptionTaskFilterInput) {
    onDeleteTask(filter: $filter) {
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
export const onCreateHouseholdTask = /* GraphQL */ `
  subscription OnCreateHouseholdTask(
    $filter: ModelSubscriptionHouseholdTaskFilterInput
  ) {
    onCreateHouseholdTask(filter: $filter) {
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
export const onUpdateHouseholdTask = /* GraphQL */ `
  subscription OnUpdateHouseholdTask(
    $filter: ModelSubscriptionHouseholdTaskFilterInput
  ) {
    onUpdateHouseholdTask(filter: $filter) {
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
export const onDeleteHouseholdTask = /* GraphQL */ `
  subscription OnDeleteHouseholdTask(
    $filter: ModelSubscriptionHouseholdTaskFilterInput
  ) {
    onDeleteHouseholdTask(filter: $filter) {
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
export const onCreateTicket = /* GraphQL */ `
  subscription OnCreateTicket($filter: ModelSubscriptionTicketFilterInput) {
    onCreateTicket(filter: $filter) {
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
export const onUpdateTicket = /* GraphQL */ `
  subscription OnUpdateTicket($filter: ModelSubscriptionTicketFilterInput) {
    onUpdateTicket(filter: $filter) {
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
export const onDeleteTicket = /* GraphQL */ `
  subscription OnDeleteTicket($filter: ModelSubscriptionTicketFilterInput) {
    onDeleteTicket(filter: $filter) {
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
export const onCreateAsset = /* GraphQL */ `
  subscription OnCreateAsset($filter: ModelSubscriptionAssetFilterInput) {
    onCreateAsset(filter: $filter) {
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
export const onUpdateAsset = /* GraphQL */ `
  subscription OnUpdateAsset($filter: ModelSubscriptionAssetFilterInput) {
    onUpdateAsset(filter: $filter) {
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
export const onDeleteAsset = /* GraphQL */ `
  subscription OnDeleteAsset($filter: ModelSubscriptionAssetFilterInput) {
    onDeleteAsset(filter: $filter) {
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
export const onCreateBooking = /* GraphQL */ `
  subscription OnCreateBooking($filter: ModelSubscriptionBookingFilterInput) {
    onCreateBooking(filter: $filter) {
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
export const onUpdateBooking = /* GraphQL */ `
  subscription OnUpdateBooking($filter: ModelSubscriptionBookingFilterInput) {
    onUpdateBooking(filter: $filter) {
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
export const onDeleteBooking = /* GraphQL */ `
  subscription OnDeleteBooking($filter: ModelSubscriptionBookingFilterInput) {
    onDeleteBooking(filter: $filter) {
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
