import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Event from "./pages/Event/Event";
import User from "./pages/User/User";
import { baseUrl } from "./composables/useConfig";
import Maintenance from "./pages/Maintenance/Maintenance";
import Login from "./pages/auth/Login/Login";
import Maquina from "./pages/Maquina/Maquina";
import Tecnico from "./pages/Tecnico/Tecnico";

const client = new ApolloClient({
  uri: baseUrl,
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <BrowserRouter>
          {/* Definición de rutas */}
          <Routes>
            <Route path="/calendar" element={<Event />} />
            <Route path="/users" element={<User />} />
            <Route path="/maintenance/add" element={<Maintenance />} />
            <Route path="/login" element={<Login />} />
            <Route path="/maquinas" element={<Maquina />} />
            <Route path="/tecnicos" element={<Tecnico />} />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </>
  );
}
