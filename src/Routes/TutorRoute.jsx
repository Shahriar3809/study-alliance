import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useTutor from "../Hooks/useTutor";


const TutorRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { isTutor, isTutorLoading } = useTutor();
  const location = useLocation();
  if (loading || isTutorLoading) {
    return (
      <div className="flex items-center justify-center pt-20">
        <span className="loading text-center loading-bars loading-lg"></span>
      </div>
    );
  }
  if (user && isTutor) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }}></Navigate>;
};
TutorRoute.propTypes = {
  children: PropTypes.any,
};
export default TutorRoute;
