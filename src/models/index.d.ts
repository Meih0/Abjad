import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";

export enum HomeRole {
  OWNER = "OWNER",
  CHILD = "CHILD",
  MAID = "MAID",
  DRIVER = "DRIVER"
}

export enum InviteStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  EXPIRED = "EXPIRED",
  CANCELLED = "CANCELLED"
}

export enum MemberStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE"
}

type EagerMemberPermissions = {
  readonly canViewAllTasks: boolean;
  readonly canViewAssignedTasks: boolean;
  readonly canCreateTasks: boolean;
  readonly canCompleteTasks: boolean;
  readonly canAssignTasks: boolean;
  readonly canViewBills: boolean;
  readonly canManageBills: boolean;
  readonly canViewAssets: boolean;
  readonly canManageAssets: boolean;
  readonly canViewBookings: boolean;
  readonly canCreateBookings: boolean;
  readonly canViewAllBookings: boolean;
  readonly canManageMembers: boolean;
  readonly canViewRooms: boolean;
  readonly canManageRooms: boolean;
}

type LazyMemberPermissions = {
  readonly canViewAllTasks: boolean;
  readonly canViewAssignedTasks: boolean;
  readonly canCreateTasks: boolean;
  readonly canCompleteTasks: boolean;
  readonly canAssignTasks: boolean;
  readonly canViewBills: boolean;
  readonly canManageBills: boolean;
  readonly canViewAssets: boolean;
  readonly canManageAssets: boolean;
  readonly canViewBookings: boolean;
  readonly canCreateBookings: boolean;
  readonly canViewAllBookings: boolean;
  readonly canManageMembers: boolean;
  readonly canViewRooms: boolean;
  readonly canManageRooms: boolean;
}

export declare type MemberPermissions = LazyLoading extends LazyLoadingDisabled ? EagerMemberPermissions : LazyMemberPermissions

export declare const MemberPermissions: (new (init: ModelInit<MemberPermissions>) => MemberPermissions)

type EagerHome = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Home, 'id'>;
  };
  readonly id: string;
  readonly name: string;
  readonly nameAr?: string | null;
  readonly owners: string[];
  readonly inviteCode?: string | null;
  readonly inviteCodeExpiry?: string | null;
  readonly maxMembers?: number | null;
  readonly createdBy: string;
  readonly members?: (HomeMember | null)[] | null;
  readonly invites?: (HomeInvite | null)[] | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

type LazyHome = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Home, 'id'>;
  };
  readonly id: string;
  readonly name: string;
  readonly nameAr?: string | null;
  readonly owners: string[];
  readonly inviteCode?: string | null;
  readonly inviteCodeExpiry?: string | null;
  readonly maxMembers?: number | null;
  readonly createdBy: string;
  readonly members: AsyncCollection<HomeMember>;
  readonly invites: AsyncCollection<HomeInvite>;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export declare type Home = LazyLoading extends LazyLoadingDisabled ? EagerHome : LazyHome

export declare const Home: (new (init: ModelInit<Home>) => Home) & {
  copyOf(source: Home, mutator: (draft: MutableModel<Home>) => MutableModel<Home> | void): Home;
}

type EagerHomeMember = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<HomeMember, 'id'>;
  };
  readonly id: string;
  readonly homeId: string;
  readonly visibleToMembers?: boolean | null;
  readonly userId: string;
  readonly cognitoUsername: string;
  readonly email: string;
  readonly name: string;
  readonly nameAr?: string | null;
  readonly phone?: string | null;
  readonly avatar?: string | null;
  readonly role: HomeRole | keyof typeof HomeRole;
  readonly permissions: MemberPermissions;
  readonly homeOwners: string[];
  readonly invitedBy?: string | null;
  readonly invitedAt?: string | null;
  readonly acceptedAt?: string | null;
  readonly status: MemberStatus | keyof typeof MemberStatus;
  readonly createdAt: string;
  readonly updatedAt: string;
}

type LazyHomeMember = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<HomeMember, 'id'>;
  };
  readonly id: string;
  readonly homeId: string;
  readonly visibleToMembers?: boolean | null;
  readonly userId: string;
  readonly cognitoUsername: string;
  readonly email: string;
  readonly name: string;
  readonly nameAr?: string | null;
  readonly phone?: string | null;
  readonly avatar?: string | null;
  readonly role: HomeRole | keyof typeof HomeRole;
  readonly permissions: MemberPermissions;
  readonly homeOwners: string[];
  readonly invitedBy?: string | null;
  readonly invitedAt?: string | null;
  readonly acceptedAt?: string | null;
  readonly status: MemberStatus | keyof typeof MemberStatus;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export declare type HomeMember = LazyLoading extends LazyLoadingDisabled ? EagerHomeMember : LazyHomeMember

export declare const HomeMember: (new (init: ModelInit<HomeMember>) => HomeMember) & {
  copyOf(source: HomeMember, mutator: (draft: MutableModel<HomeMember>) => MutableModel<HomeMember> | void): HomeMember;
}

type EagerHomeInvite = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<HomeInvite, 'id'>;
  };
  readonly id: string;
  readonly homeId: string;
  readonly homeName: string;
  readonly email: string;
  readonly role: HomeRole | keyof typeof HomeRole;
  readonly homeOwners: string[];
  readonly invitedBy: string;
  readonly invitedByName?: string | null;
  readonly status: InviteStatus | keyof typeof InviteStatus;
  readonly expiresAt: string;
  readonly customPermissions?: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

type LazyHomeInvite = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<HomeInvite, 'id'>;
  };
  readonly id: string;
  readonly homeId: string;
  readonly homeName: string;
  readonly email: string;
  readonly role: HomeRole | keyof typeof HomeRole;
  readonly homeOwners: string[];
  readonly invitedBy: string;
  readonly invitedByName?: string | null;
  readonly status: InviteStatus | keyof typeof InviteStatus;
  readonly expiresAt: string;
  readonly customPermissions?: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export declare type HomeInvite = LazyLoading extends LazyLoadingDisabled ? EagerHomeInvite : LazyHomeInvite

export declare const HomeInvite: (new (init: ModelInit<HomeInvite>) => HomeInvite) & {
  copyOf(source: HomeInvite, mutator: (draft: MutableModel<HomeInvite>) => MutableModel<HomeInvite> | void): HomeInvite;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
  };
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly nameAr?: string | null;
  readonly phone?: string | null;
  readonly avatar?: string | null;
  readonly currentHomeId?: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
  };
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly nameAr?: string | null;
  readonly phone?: string | null;
  readonly avatar?: string | null;
  readonly currentHomeId?: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerRoom = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Room, 'id'>;
  };
  readonly id: string;
  readonly homeId: string;
  readonly homeOwners: string[];
  readonly name: string;
  readonly nameAr?: string | null;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly status: string;
  readonly tasks?: (Task | null)[] | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

type LazyRoom = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Room, 'id'>;
  };
  readonly id: string;
  readonly homeId: string;
  readonly homeOwners: string[];
  readonly name: string;
  readonly nameAr?: string | null;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly status: string;
  readonly tasks: AsyncCollection<Task>;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export declare type Room = LazyLoading extends LazyLoadingDisabled ? EagerRoom : LazyRoom

export declare const Room: (new (init: ModelInit<Room>) => Room) & {
  copyOf(source: Room, mutator: (draft: MutableModel<Room>) => MutableModel<Room> | void): Room;
}

type EagerTask = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Task, 'id'>;
  };
  readonly id: string;
  readonly homeId: string;
  readonly homeOwners: string[];
  readonly roomId?: string | null;
  readonly assignedTo?: string | null;
  readonly assignedToName?: string | null;
  readonly createdBy: string;
  readonly title: string;
  readonly titleAr?: string | null;
  readonly type: string;
  readonly status: string;
  readonly priority: string;
  readonly estimatedTime?: string | null;
  readonly dueDate?: string | null;
  readonly completedAt?: string | null;
  readonly completedBy?: string | null;
  readonly notes?: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

type LazyTask = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Task, 'id'>;
  };
  readonly id: string;
  readonly homeId: string;
  readonly homeOwners: string[];
  readonly roomId?: string | null;
  readonly assignedTo?: string | null;
  readonly assignedToName?: string | null;
  readonly createdBy: string;
  readonly title: string;
  readonly titleAr?: string | null;
  readonly type: string;
  readonly status: string;
  readonly priority: string;
  readonly estimatedTime?: string | null;
  readonly dueDate?: string | null;
  readonly completedAt?: string | null;
  readonly completedBy?: string | null;
  readonly notes?: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export declare type Task = LazyLoading extends LazyLoadingDisabled ? EagerTask : LazyTask

export declare const Task: (new (init: ModelInit<Task>) => Task) & {
  copyOf(source: Task, mutator: (draft: MutableModel<Task>) => MutableModel<Task> | void): Task;
}

type EagerHouseholdTask = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<HouseholdTask, 'id'>;
  };
  readonly id: string;
  readonly homeId: string;
  readonly homeOwners: string[];
  readonly title: string;
  readonly titleAr?: string | null;
  readonly type: string;
  readonly assignedTo?: string | null;
  readonly assignedToName?: string | null;
  readonly dueDate: string;
  readonly amount?: number | null;
  readonly priority: string;
  readonly status: string;
  readonly provider?: string | null;
  readonly notes?: string | null;
  readonly isFinancial?: boolean | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

type LazyHouseholdTask = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<HouseholdTask, 'id'>;
  };
  readonly id: string;
  readonly homeId: string;
  readonly homeOwners: string[];
  readonly title: string;
  readonly titleAr?: string | null;
  readonly type: string;
  readonly assignedTo?: string | null;
  readonly assignedToName?: string | null;
  readonly dueDate: string;
  readonly amount?: number | null;
  readonly priority: string;
  readonly status: string;
  readonly provider?: string | null;
  readonly notes?: string | null;
  readonly isFinancial?: boolean | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export declare type HouseholdTask = LazyLoading extends LazyLoadingDisabled ? EagerHouseholdTask : LazyHouseholdTask

export declare const HouseholdTask: (new (init: ModelInit<HouseholdTask>) => HouseholdTask) & {
  copyOf(source: HouseholdTask, mutator: (draft: MutableModel<HouseholdTask>) => MutableModel<HouseholdTask> | void): HouseholdTask;
}

type EagerTicket = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Ticket, 'id'>;
  };
  readonly id: string;
  readonly homeId: string;
  readonly homeOwners: string[];
  readonly fromUser: string;
  readonly fromUserName?: string | null;
  readonly title: string;
  readonly description: string;
  readonly status: string;
  readonly priority: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

type LazyTicket = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Ticket, 'id'>;
  };
  readonly id: string;
  readonly homeId: string;
  readonly homeOwners: string[];
  readonly fromUser: string;
  readonly fromUserName?: string | null;
  readonly title: string;
  readonly description: string;
  readonly status: string;
  readonly priority: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export declare type Ticket = LazyLoading extends LazyLoadingDisabled ? EagerTicket : LazyTicket

export declare const Ticket: (new (init: ModelInit<Ticket>) => Ticket) & {
  copyOf(source: Ticket, mutator: (draft: MutableModel<Ticket>) => MutableModel<Ticket> | void): Ticket;
}

type EagerAsset = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Asset, 'id'>;
  };
  readonly id: string;
  readonly homeId: string;
  readonly homeOwners: string[];
  readonly name: string;
  readonly nameAr?: string | null;
  readonly category: string;
  readonly location: string;
  readonly roomId?: string | null;
  readonly purchaseDate?: string | null;
  readonly warranty?: string | null;
  readonly value?: number | null;
  readonly receiptUrl?: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

type LazyAsset = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Asset, 'id'>;
  };
  readonly id: string;
  readonly homeId: string;
  readonly homeOwners: string[];
  readonly name: string;
  readonly nameAr?: string | null;
  readonly category: string;
  readonly location: string;
  readonly roomId?: string | null;
  readonly purchaseDate?: string | null;
  readonly warranty?: string | null;
  readonly value?: number | null;
  readonly receiptUrl?: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export declare type Asset = LazyLoading extends LazyLoadingDisabled ? EagerAsset : LazyAsset

export declare const Asset: (new (init: ModelInit<Asset>) => Asset) & {
  copyOf(source: Asset, mutator: (draft: MutableModel<Asset>) => MutableModel<Asset> | void): Asset;
}

type EagerBooking = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Booking, 'id'>;
  };
  readonly id: string;
  readonly homeId: string;
  readonly homeOwners: string[];
  readonly bookedBy: string;
  readonly bookedByName?: string | null;
  readonly serviceId: string;
  readonly serviceName: string;
  readonly serviceType?: string | null;
  readonly date: string;
  readonly time: string;
  readonly price: number;
  readonly status: string;
  readonly notes?: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

type LazyBooking = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Booking, 'id'>;
  };
  readonly id: string;
  readonly homeId: string;
  readonly homeOwners: string[];
  readonly bookedBy: string;
  readonly bookedByName?: string | null;
  readonly serviceId: string;
  readonly serviceName: string;
  readonly serviceType?: string | null;
  readonly date: string;
  readonly time: string;
  readonly price: number;
  readonly status: string;
  readonly notes?: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export declare type Booking = LazyLoading extends LazyLoadingDisabled ? EagerBooking : LazyBooking

export declare const Booking: (new (init: ModelInit<Booking>) => Booking) & {
  copyOf(source: Booking, mutator: (draft: MutableModel<Booking>) => MutableModel<Booking> | void): Booking;
}