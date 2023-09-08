import Sidebar from "./SideBar/Sidebar";
import NavBar from "./NavBar/NavBar";
import LoadPage from "./LoadPage";
function Layout({ children }) {
  return (
    <>
      <div className="bg-dark-purple flex w-screen h-screen ">
        <Sidebar />

        <main className="bg-primary-gray w-full  rounded-tl-3xl rounded-bl-3xl p-5  overflow-auto">
          {/* Muestra LoadPage si isLoadPageActive es true */}
          <NavBar />
          {children}
        </main>
      </div>
    </>
  );
}

export default Layout;
