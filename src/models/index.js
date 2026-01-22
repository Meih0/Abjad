// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, Room, Task, HouseholdTask, Ticket, Asset, Booking } = initSchema(schema);

export {
  User,
  Room,
  Task,
  HouseholdTask,
  Ticket,
  Asset,
  Booking
};