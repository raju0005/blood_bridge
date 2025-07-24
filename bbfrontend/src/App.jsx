import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import toast, { Toaster } from "react-hot-toast";
import BackButton from "./components/GeneralComponents/BackButton";
import { useLocation } from "react-router-dom";
const App = () => {
  const location = useLocation();
  return (
    <>
      <div>
        <Toaster
          toastOptions={{
            className: "text-md md:text-lg",
          }}
          position="top-center"
          reverseOrder={true}
        />
      </div>
      <Header />
      <main className="mx-auto">
        {location.pathname !== "/" && <BackButton />}
        <Outlet />
      </main>
    </>
  );
};

export default App;
