import { startApolloServer } from "./app.js";
import { connectDB } from "./db.js";
import { typeDefs, resolver } from "./graphql/schema.js";

connectDB();
startApolloServer(typeDefs, resolver);
