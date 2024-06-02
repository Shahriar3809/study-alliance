import { createBrowserRouter } from "react-router-dom";
import Main from "../LayOuts/Main";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Pages/Home";
import Dashboard from "../LayOuts/Dashboard";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers";
import AllSession from "../Pages/Dashboard/Admin/AllSession";
import AllMaterials from "../Pages/Dashboard/Admin/AllMaterials";

import AllTutorSession from "../Pages/Dashboard/Tutor/AllTutorSession";
import UploadMaterials from "../Pages/Dashboard/Tutor/UploadMaterials";
import CreateStudySession from "../Pages/Dashboard/Tutor/CreateStudySession";
import ViewAllMaterials from "../Pages/Dashboard/Tutor/ViewAllMaterials";
import ViewAllNotes from "../Pages/Dashboard/Tutor/ViewAllNotes";

import MyPersonalBookedSession from "../Pages/Dashboard/Student/MyPersonalBookedSession";
import MyPersonalAllMaterials from "../Pages/Dashboard/Student/MyPersonalAllMaterials";
import CreateNote from "../Pages/Dashboard/Student/CreateNote";
import ManageNotes from "../Pages/Dashboard/Student/ManageNotes";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import TutorRoute from "./TutorRoute";

 const router = createBrowserRouter([
   {
     path: "/",
     element: <Main></Main>,
     children: [
       {
         path: "/",
         element: <Home></Home>,
       },
       {
         path: "/login",
         element: <Login></Login>,
       },
       {
         path: "/register",
         element: <Register></Register>,
       },
     ],
   },

   {
     path: "dashboard",
     element: <Dashboard></Dashboard>,
     children: [
       // User
       {
         path: "/dashboard/user/my-booked-session",
         element: (
           <PrivateRoute>
             <MyPersonalBookedSession></MyPersonalBookedSession>
           </PrivateRoute>
         ),
       },
       {
         path: "/dashboard/user/create-note",
         element: (
           <PrivateRoute>
             <CreateNote></CreateNote>
           </PrivateRoute>
         ),
       },
       {
         path: "/dashboard/user/manage-notes",
         element: (
           <PrivateRoute>
             <ManageNotes></ManageNotes>
           </PrivateRoute>
         ),
       },
       {
         path: "/dashboard/user/all-materials",
         element: (
           <PrivateRoute>
             <MyPersonalAllMaterials></MyPersonalAllMaterials>
           </PrivateRoute>
         ),
       },

       //  Tutor
       {
         path: "/dashboard/tutor/create-study-session",
         element: (
           <TutorRoute>
             <CreateStudySession></CreateStudySession>
           </TutorRoute>
         ),
       },

       {
         path: "/dashboard/tutor/view-all-session",
         element: (
           <TutorRoute>
             <AllTutorSession></AllTutorSession>
           </TutorRoute>
         ),
       },
       {
         path: "/dashboard/tutor/upload-materials",
         element: <UploadMaterials></UploadMaterials>,
       },
       {
         path: "/dashboard/tutor/my-all-materials",
         element: (
           <TutorRoute>
             <ViewAllMaterials></ViewAllMaterials>
           </TutorRoute>
         ),
       },
       {
         path: "/dashboard/tutor/all-notes",
         element: (
           <TutorRoute>
             <ViewAllNotes></ViewAllNotes>
           </TutorRoute>
         ),
       },

       //  Admin
       {
         path: "all-users",
         element: (
           <AdminRoute>
             <AllUsers></AllUsers>
           </AdminRoute>
         ),
       },
       {
         path: "all-study-session",
         element: (
           <AdminRoute>
             <AllSession></AllSession>
           </AdminRoute>
         ),
       },
       {
         path: "all-materials",
         element: (
           <AdminRoute>
             <AllMaterials></AllMaterials>
           </AdminRoute>
         ),
       },
     ],
   },
 ]);

export default router;