import { Navigate, Outlet } from "react-router-dom";
import { KEY_TOKEN } from "../service/LocalStorageService";

const ProtectedRoutes = () => {
  const token = localStorage.getItem(KEY_TOKEN);

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
