import { gql } from "graphql-tag";
import Group from "../../models/GroupModel/Group.js";

export const groupTypeDefs = gql`
  extend type Query {
    groups: [Group]
  }

  type Mutation {
    createGroup(group_name: String): Group
  }

  type Group {
    group_name: String
    createdAt: String
    updatedAt: String
  }
`;

export const groupResolver = {
  Query: {
    groups: async () => await groupResolver.find(),
  },
  Mutation: {
    createGroup: async (_, { group_name }) => {
      const group = new Group({ group_name });
      const saveGroup = await group.save();
      return saveGroup;
    },
  },
};
