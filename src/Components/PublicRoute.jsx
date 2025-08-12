import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const PublicRoute = ({ children }) => {
  const userInfo = useSelector((state) => state.user.userInfo);

  if (userInfo) {
    return <Navigate to="/user-profile" replace />;
  }

  return children;
};

export default PublicRoute;