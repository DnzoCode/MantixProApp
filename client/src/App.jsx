import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Layout from "./Components/Global/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Event from "./pages/Event/Event";
import User from "./pages/User/User";
import { baseUrl } from "./composables/useConfig";

const client = new ApolloClient({
  uri: baseUrl,
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Layout>
            {/* Definición de rutas */}
            <Routes>
              <Route path="/calendar" element={<Event />} />
              <Route path="/users" element={<User />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ApolloProvider>
    </>
  );
}
