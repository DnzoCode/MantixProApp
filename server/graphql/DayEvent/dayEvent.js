import { gql } from "graphql-tag";
import DayEvent from "../../models/DayEventModel/DayEvent.js";
import Day from "../../models/DayModel/Day.js";
import Event from "../../models/EventModel/Event.js";

export const dayEventsTypeDefs = gql`
  extend type Query {
    dayEvents: [DayEvent]
  }

  type Mutation {
    createDayEvent(day_id: ID, event_id: ID): DayEvent
  }

  type DayEvent {
    _id: ID
    day_id: ID
    event_id: ID
  }
`;

export const eventResolver = {
  Query: {
    dayEvents: async () => await DayEvent.find(),
  },
  Mutation: {
    createDayEvent: async (_, { day_id, event_id }) => {
      const dayEvent = new DayEvent({
        day_id,
        event_id,
      });
      await dayEvent.save();
      return dayEvent;
    },
  },
  Event: {
    day_id: async (parent) => await Day.findById(parent.day_id),
    event_id: async (parent) => await Event.findById(parent.event_id),
  },
};
