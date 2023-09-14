import Sidebar from "./SideBar/Sidebar";
import NavBar from "./NavBar/NavBar";
import LoadPage from "./LoadPage";
import { Toaster } from "sonner";
function Layout({ children, loading }) {
  return (
    <>
      <Toaster richColors closeButton position="top-right" expand={false} />
      <div className="bg-dark-purple flex w-screen h-screen ">
        <Sidebar />

        <main className="bg-primary-gray w-full  rounded-tl-3xl rounded-bl-3xl p-5  overflow-auto">
          {/* Muestra LoadPage si isLoadPageActive es true */}
          {loading ? (
            <LoadPage />
          ) : (
            <>
              <NavBar />
              {children}
            </>
          )}
        </main>
      </div>
    </>
  );
}

export default Layout;
