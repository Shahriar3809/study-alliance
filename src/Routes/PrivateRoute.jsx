
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../Hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return (
      <div className="flex items-center justify-center pt-20">
        <span className="loading text-center loading-bars loading-lg"></span>
      </div>
    );
  }
  // console.log(user)
  if (user) {
    return children;
  }
  console.log(location)
  return <Navigate to="/login" state={{ from: location }}></Navigate>;
};

PrivateRoute.propTypes = {
  children: PropTypes.any,
};

export default PrivateRoute;
