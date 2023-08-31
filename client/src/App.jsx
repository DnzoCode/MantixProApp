import Layout from "./Components/Global/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Event from "./pages/Event/Event";
import User from "./pages/User/User";
export default function App() {
  return (
    <>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/calendar" element={<Event />} />
            <Route path="/users" element={<User />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </>
  );
}
