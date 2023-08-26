import { gql } from "graphql-tag";
import User from "../../models/UserModel/User.js";
import { hash } from "bcryptjs";

export const userTypeDefs = gql`
  extend type Query {
    users: [User]
    user(_id: ID!): User
  }
  extend type Mutation {
    createUser(
      name: String
      email: String
      password: String
      role: String
    ): User
  }
  type User {
    _id: ID
    name: String
    email: String
    password: String
    role: String
    createdAt: String
    updatedAt: String
  }
`;

export const userResolver = {
  Query: {
    users: async () => await User.find(),
    user: async (_, { _id }) => await User.findById(_id),
  },
  Mutation: {
    createUser: async (_, { name, email, password, role }) => {
      const exist = await User.find({ email });
      if (exist.length) throw new Error("Este email ya esta registrado");
      const hashedPassword = await hash(password, 12);
      const user = new User({
        name,
        email,
        password: hashedPassword,
        role,
        createdAt,
        updatedAt,
      });
      const saveUser = await user.save();
      return saveUser;
    },
  },
};
