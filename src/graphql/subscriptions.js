/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      role
      avatar
      canViewBills
      canManageMembers
      rooms {
        nextToken
        startedAt
        __typename
      }
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
      role
      avatar
      canViewBills
      canManageMembers
      rooms {
        nextToken
        startedAt
        __typename
      }
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
      role
      avatar
      canViewBills
      canManageMembers
      rooms {
        nextToken
        startedAt
        __typename
      }
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
      owner
      __typename
    }
  }
`;
export const onCreateRoom = /* GraphQL */ `
  subscription OnCreateRoom(
    $filter: ModelSubscriptionRoomFilterInput
    $owner: String
  ) {
    onCreateRoom(filter: $filter, owner: $owner) {
      id
      userId
      name
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
      owner
      __typename
    }
  }
`;
export const onUpdateRoom = /* GraphQL */ `
  subscription OnUpdateRoom(
    $filter: ModelSubscriptionRoomFilterInput
    $owner: String
  ) {
    onUpdateRoom(filter: $filter, owner: $owner) {
      id
      userId
      name
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
      owner
      __typename
    }
  }
`;
export const onDeleteRoom = /* GraphQL */ `
  subscription OnDeleteRoom(
    $filter: ModelSubscriptionRoomFilterInput
    $owner: String
  ) {
    onDeleteRoom(filter: $filter, owner: $owner) {
      id
      userId
      name
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
      owner
      __typename
    }
  }
`;
export const onCreateTask = /* GraphQL */ `
  subscription OnCreateTask(
    $filter: ModelSubscriptionTaskFilterInput
    $owner: String
  ) {
    onCreateTask(filter: $filter, owner: $owner) {
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
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const onUpdateTask = /* GraphQL */ `
  subscription OnUpdateTask(
    $filter: ModelSubscriptionTaskFilterInput
    $owner: String
  ) {
    onUpdateTask(filter: $filter, owner: $owner) {
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
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const onDeleteTask = /* GraphQL */ `
  subscription OnDeleteTask(
    $filter: ModelSubscriptionTaskFilterInput
    $owner: String
  ) {
    onDeleteTask(filter: $filter, owner: $owner) {
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
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const onCreateHouseholdTask = /* GraphQL */ `
  subscription OnCreateHouseholdTask(
    $filter: ModelSubscriptionHouseholdTaskFilterInput
    $owner: String
  ) {
    onCreateHouseholdTask(filter: $filter, owner: $owner) {
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
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const onUpdateHouseholdTask = /* GraphQL */ `
  subscription OnUpdateHouseholdTask(
    $filter: ModelSubscriptionHouseholdTaskFilterInput
    $owner: String
  ) {
    onUpdateHouseholdTask(filter: $filter, owner: $owner) {
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
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const onDeleteHouseholdTask = /* GraphQL */ `
  subscription OnDeleteHouseholdTask(
    $filter: ModelSubscriptionHouseholdTaskFilterInput
    $owner: String
  ) {
    onDeleteHouseholdTask(filter: $filter, owner: $owner) {
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
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const onCreateTicket = /* GraphQL */ `
  subscription OnCreateTicket(
    $filter: ModelSubscriptionTicketFilterInput
    $owner: String
  ) {
    onCreateTicket(filter: $filter, owner: $owner) {
      id
      userId
      fromUser
      title
      description
      status
      priority
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
export const onUpdateTicket = /* GraphQL */ `
  subscription OnUpdateTicket(
    $filter: ModelSubscriptionTicketFilterInput
    $owner: String
  ) {
    onUpdateTicket(filter: $filter, owner: $owner) {
      id
      userId
      fromUser
      title
      description
      status
      priority
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
export const onDeleteTicket = /* GraphQL */ `
  subscription OnDeleteTicket(
    $filter: ModelSubscriptionTicketFilterInput
    $owner: String
  ) {
    onDeleteTicket(filter: $filter, owner: $owner) {
      id
      userId
      fromUser
      title
      description
      status
      priority
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
export const onCreateAsset = /* GraphQL */ `
  subscription OnCreateAsset(
    $filter: ModelSubscriptionAssetFilterInput
    $owner: String
  ) {
    onCreateAsset(filter: $filter, owner: $owner) {
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
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const onUpdateAsset = /* GraphQL */ `
  subscription OnUpdateAsset(
    $filter: ModelSubscriptionAssetFilterInput
    $owner: String
  ) {
    onUpdateAsset(filter: $filter, owner: $owner) {
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
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const onDeleteAsset = /* GraphQL */ `
  subscription OnDeleteAsset(
    $filter: ModelSubscriptionAssetFilterInput
    $owner: String
  ) {
    onDeleteAsset(filter: $filter, owner: $owner) {
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
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const onCreateBooking = /* GraphQL */ `
  subscription OnCreateBooking(
    $filter: ModelSubscriptionBookingFilterInput
    $owner: String
  ) {
    onCreateBooking(filter: $filter, owner: $owner) {
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
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const onUpdateBooking = /* GraphQL */ `
  subscription OnUpdateBooking(
    $filter: ModelSubscriptionBookingFilterInput
    $owner: String
  ) {
    onUpdateBooking(filter: $filter, owner: $owner) {
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
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const onDeleteBooking = /* GraphQL */ `
  subscription OnDeleteBooking(
    $filter: ModelSubscriptionBookingFilterInput
    $owner: String
  ) {
    onDeleteBooking(filter: $filter, owner: $owner) {
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
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
