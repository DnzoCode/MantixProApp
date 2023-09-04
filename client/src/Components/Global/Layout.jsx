import React from "react";
import Sidebar from "./SideBar/Sidebar";
import NavBar from "./NavBar/NavBar";

function Layout({ children }) {
  return (
    <>
      <div className="bg-dark-purple flex">
        <Sidebar />

        <main className="bg-primary-gray w-full rounded-tl-3xl rounded-bl-3xl p-5">
          <NavBar />
          {children}
        </main>
      </div>
    </>
  );
}

export default Layout;
