import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "../zustand/store";

const ProtectedRoutes = () => {
  const userInfo = useUserStore((state) => state.userInfo);

  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
