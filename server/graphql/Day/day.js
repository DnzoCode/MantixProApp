import { gql } from "graphql-tag";
import Day from "../../models/DayModel/Day.js";

export const dayTypeDefs = gql`
  extend type Query {
    days: [Day]
  }

  type Mutation {
    createDay(date: String, isClosed: Boolean): Day
  }

  type Day {
    _id: ID
    date: String
    isClosed: Boolean
    createdAt: String
    updatedAt: String
  }
`;

export const dayResolver = {
  Query: {
    days: async () => await Day.find(),
  },
  Mutation: {
    createDay: async (_, { date, isClosed }) => {
      const day = new Day({
        date,
        isClosed,
      });
      const saveDay = await day.save();
      return saveDay;
    },
  },
};
