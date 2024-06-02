import { Link, NavLink } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAdmin from "../Hooks/useAdmin";
import useTutor from "../Hooks/useTutor";



const Navbar = () => {
    const {user, logOut} = useAuth();
    const {isAdmin} = useAdmin();
    const {isTutor} = useTutor();
    // console.log(isAdmin)
    // console.log(isTutor)
  const navItem = (
    <>
      {" "}
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? " lg:px-5 lg:py-3  rounded-[4px] text-white font-bold text-base bg-[#164e63]"
              : ""
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
      {user && !isAdmin && !isTutor && (
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? " lg:px-5 lg:py-3  rounded-[4px] text-white font-bold text-base bg-[#164e63]"
                : ""
            }
            to="/dashboard/user/my-booked-session"
          >
            Dashboard
          </NavLink>
        </li>
      )}
      {user && isTutor === true && (
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? " lg:px-5 lg:py-3  rounded-[4px] text-white font-bold text-base bg-[#164e63]"
                : ""
            }
            to="/dashboard/tutor/create-study-session"
          >
            Dashboard
          </NavLink>
        </li>
      )}
      {user && isAdmin === true && (
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? " lg:px-5 lg:py-3  rounded-[4px] text-white font-bold text-base bg-[#164e63]"
                : ""
            }
            to="/dashboard/all-users"
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

   const handleLogOut = () => {
     logOut()
       .then((res) => {
         console.log(res);
       })
       .catch((err) => {
         console.log(err);
       });
   };


  return (
    <div className="navbar">
      <div className="navbar-start ">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navItem}
          </ul>
        </div>
        <div className="md:w-[35px] mx-2">
          <img
            src="https://i.ibb.co/n1kRmfW/404377439-324399690349828-596219030528986936-n.jpg"
            alt=""
            className="w-full"
          />
        </div>
        <Link
          to="/"
          className="md:text-3xl uppercase text-[#164e63] font-extrabold"
        >
          Study Alliance
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="flex font-semibold gap-3">{navItem}</ul>
      </div>
      <div className="navbar-end flex gap-3">
        {user ? (
          <Link
            onClick={handleLogOut}
            className=" lg:px-5 lg:py-3 p-2 rounded-[4px] text-white font-bold text-base bg-[#164e63]"
          >
            Log Out
          </Link>
        ) : (
          <Link
            to={"/login"}
            className="lg:px-5 lg:py-3 p-2  rounded-[4px] text-white font-bold text-base bg-[#164e63]"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;