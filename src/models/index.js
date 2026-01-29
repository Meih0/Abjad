// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const HomeRole = {
  "OWNER": "OWNER",
  "CHILD": "CHILD",
  "MAID": "MAID",
  "DRIVER": "DRIVER"
};

const InviteStatus = {
  "PENDING": "PENDING",
  "ACCEPTED": "ACCEPTED",
  "EXPIRED": "EXPIRED",
  "CANCELLED": "CANCELLED"
};

const MemberStatus = {
  "PENDING": "PENDING",
  "ACTIVE": "ACTIVE",
  "INACTIVE": "INACTIVE"
};

const { Home, HomeMember, HomeInvite, User, Room, Task, HouseholdTask, Ticket, Asset, Booking, MemberPermissions } = initSchema(schema);

export {
  Home,
  HomeMember,
  HomeInvite,
  User,
  Room,
  Task,
  HouseholdTask,
  Ticket,
  Asset,
  Booking,
  HomeRole,
  InviteStatus,
  MemberStatus,
  MemberPermissions
};