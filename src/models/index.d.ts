import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";





type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
  };
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly nameAr?: string | null;
  readonly phone?: string | null;
  readonly role: string;
  readonly avatar?: string | null;
  readonly canViewBills?: boolean | null;
  readonly canManageMembers?: boolean | null;
  readonly rooms?: (Room | null)[] | null;
  readonly tasks?: (Task | null)[] | null;
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
  readonly role: string;
  readonly avatar?: string | null;
  readonly canViewBills?: boolean | null;
  readonly canManageMembers?: boolean | null;
  readonly rooms: AsyncCollection<Room>;
  readonly tasks: AsyncCollection<Task>;
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
  readonly userId: string;
  readonly name: string;
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
  readonly userId: string;
  readonly name: string;
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
  readonly roomId: string;
  readonly assignedTo: string;
  readonly title: string;
  readonly type: string;
  readonly status: string;
  readonly priority: string;
  readonly estimatedTime?: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

type LazyTask = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Task, 'id'>;
  };
  readonly id: string;
  readonly roomId: string;
  readonly assignedTo: string;
  readonly title: string;
  readonly type: string;
  readonly status: string;
  readonly priority: string;
  readonly estimatedTime?: string | null;
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
  readonly userId: string;
  readonly title: string;
  readonly titleAr?: string | null;
  readonly type: string;
  readonly assignedTo: string;
  readonly dueDate: string;
  readonly amount?: number | null;
  readonly priority: string;
  readonly status: string;
  readonly provider?: string | null;
  readonly notes?: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

type LazyHouseholdTask = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<HouseholdTask, 'id'>;
  };
  readonly id: string;
  readonly userId: string;
  readonly title: string;
  readonly titleAr?: string | null;
  readonly type: string;
  readonly assignedTo: string;
  readonly dueDate: string;
  readonly amount?: number | null;
  readonly priority: string;
  readonly status: string;
  readonly provider?: string | null;
  readonly notes?: string | null;
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
  readonly userId: string;
  readonly fromUser: string;
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
  readonly userId: string;
  readonly fromUser: string;
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
  readonly userId: string;
  readonly name: string;
  readonly nameAr?: string | null;
  readonly category: string;
  readonly location: string;
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
  readonly userId: string;
  readonly name: string;
  readonly nameAr?: string | null;
  readonly category: string;
  readonly location: string;
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
  readonly userId: string;
  readonly serviceId: string;
  readonly serviceName: string;
  readonly date: string;
  readonly time: string;
  readonly price: number;
  readonly status: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

type LazyBooking = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Booking, 'id'>;
  };
  readonly id: string;
  readonly userId: string;
  readonly serviceId: string;
  readonly serviceName: string;
  readonly date: string;
  readonly time: string;
  readonly price: number;
  readonly status: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export declare type Booking = LazyLoading extends LazyLoadingDisabled ? EagerBooking : LazyBooking

export declare const Booking: (new (init: ModelInit<Booking>) => Booking) & {
  copyOf(source: Booking, mutator: (draft: MutableModel<Booking>) => MutableModel<Booking> | void): Booking;
}