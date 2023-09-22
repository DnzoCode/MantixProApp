import { gql } from "graphql-tag";
import { GraphQLScalarType, Kind } from "graphql";
import Day from "../../models/DayModel/Day.js";

const resolverMap = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(+ast.value); // ast value is always in string format
      }
      return null;
    },
  }),
};
export const dayTypeDefs = gql`
  scalar Date
  extend type Query {
    days: [Day]
    validarFechaAnterior(date: Date!): Day
  }

  type Mutation {
    createDay(date: Date, isClosed: Boolean): Day
  }

  type Day {
    _id: ID
    date: Date
    isClosed: Boolean
    createdAt: String
    updatedAt: String
  }
`;

export const dayResolver = {
  Query: {
    days: async () => await Day.find(),
    validarFechaAnterior: async (_, { date }) => {
      const day = await Day.findOne({ date: { $lt: date } });
      return day;
    },
  },
  Mutation: {
    createDay: async (_, { date, isClosed }) => {
      const existingDay = await Day.findOne({ date });
      if (existingDay) {
        return;
      }
      const day = new Day({
        date,
        isClosed,
      });
      const saveDay = await day.save();
      return saveDay;
    },
  },
};
