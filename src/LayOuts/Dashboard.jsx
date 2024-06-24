import { FaBook,  FaHome, FaList, FaListAlt,  FaUsers, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import "../App.css";
import useTutor from "../Hooks/useTutor";
import { IoMdClose } from "react-icons/io";
import useAuth from "../Hooks/useAuth";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

const Dashboard = () => {
  const {user} = useAuth()
    const {isAdmin} = useAdmin();
    const {isTutor} = useTutor();
   const [isOpen, setIsOpen] = useState(true)
  //  console.log(user)
  //  console.log(isAdmin)
  //  console.log(isTutor)
    return (
      <div className=" flex ">
        <div className=" text-white min-h-screen p-3 bg-[#083344]">
          <div onClick={() => setIsOpen(!isOpen)} className="text-xl md:hidden   p-1 rounded-full text-right">
            {isOpen ? <IoMdClose /> : <FaBars />}
          </div>
          <ul
            className={`menu dashboard space-y-1 text-base  ${
              isOpen || "hidden md:block"
            }`}
          >
            {user && !isAdmin && !isTutor && (
              <>
                <li>
                  <NavLink to="/dashboard/user/my-booked-session">
                    <FaHome />
                    My Booked Session
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/user/create-note">
                    <FaUtensils />
                    Create Note
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/user/manage-notes">
                    <FaUtensils />
                    Manage Personal Notes
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/user/all-materials">
                    <FaList />
                    View All Materials
                  </NavLink>
                </li>
              </>
            )}

            {isTutor === true && (
              <>
                <li>
                  <NavLink to="/dashboard/tutor/create-study-session">
                    <FaHome />
                    Create Study Session
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/tutor/view-all-session">
                    <FaUtensils />
                    View All My Session
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/tutor/upload-materials">
                    <FaUtensils />
                    Upload Materials
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/tutor/my-all-materials">
                    <FaList />
                    View All My Materials
                  </NavLink>
                </li>
              </>
            )}
            {isAdmin === true && (
              <>
                {" "}
                <li>
                  <NavLink to="/dashboard/all-users">
                    <FaUsers />
                    All Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/all-study-session">
                    <FaBook />
                    All Study Session
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/all-materials">
                    <FaListAlt />
                    All Materials
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/all-rejected-session">
                    <FaListAlt />
                    Rejected Sessions
                  </NavLink>
                </li>
              </>
            )}

            {/* For EveryOne */}
            <div className="divider divider-warning">Or</div>
            <li>
              <NavLink to="/">
                <FaHome />
                Home
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="flex-1  p-2 lg:p-8">
          <Outlet></Outlet>
        </div>
      </div>
    );
};

export default Dashboard;




