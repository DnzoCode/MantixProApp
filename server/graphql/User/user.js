import { gql } from "graphql-tag";
import User from "../../models/UserModel/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

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
    login(email: String!, password: String!): User
  }
  type User {
    _id: ID
    name: String
    email: String
    password: String
    role: String
    token: String
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
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({
        name,
        email,
        password: hashedPassword,
        role,
      });
      const token = jwt.sign(
        {
          user_id: user._id,
          name,
          email,
          role,
        },
        "UNSAFE_STRING",
        { expiresIn: "4h" }
      );
      user.token = token;
      const saveUser = await user.save();
      return saveUser;
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error("Usuario y/o password incorrectos");
      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword || user.email !== email)
        throw new Error("Usuario y/o password incorrectos");

      const token = jwt.sign(
        {
          user_id: user._id,
          name: user.name,
          email,
          role: user.role,
        },
        "UNSAFE_STRING",
        { expiresIn: "4h" }
      );

      // const serialized = serialize("userToken", token, {
      //   httpOnly: true,
      //   secure: false,
      //   sameSite: "strict",
      //   maxAge: 1000 * 60 * 60 * 24 * 30,
      //   path: "/",
      // });
      user.token = token;

      return user;
    },
  },
};
