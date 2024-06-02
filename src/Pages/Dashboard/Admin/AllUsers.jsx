import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaUsersCog } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchName, setSearchName] = useState("");

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users", searchName],
    queryFn: async ({ queryKey }) => {
      const [, name] = queryKey;
      const res = await axiosSecure.get("/users", {
        params: { name },
      });
      return res.data;
    },
  });

  const handleSearch = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.elements.name.value;
    setSearchName(name);
    refetch();
  };
const handleChangeRole = (_id) => {
  Swal.fire({
    title: "Change Role",
    html:
      '<label for="role">Role:</label>' +
      '<select id="role" class="swal2-input">' +
      '<option value="" disabled selected>Select Role</option>' +
      '<option value="student">Student</option>' +
      '<option value="tutor">Tutor</option>' +
      '<option value="admin">Admin</option>' +
      "</select>",
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Submit",
    preConfirm: () => {
      const role = Swal.getPopup().querySelector("#role").value;
      if (!role) {
        Swal.showValidationMessage("You must select a role");
      }
      return { role: role };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const { role } = result.value;
      console.log("Selected role:", role);
      const updated = { role: role };
      axiosSecure.patch(`/users/admin/${_id}`, updated).then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Update Successful",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      });
    }
  });
};

  return (
    <div>
      <div className="my-3 px-5 bg-[#082f49] p-2 text-white rounded-t-md flex justify-between">
        <h2 className="text-3xl font-bold text-center items-center ">
          All User: {users.length}
        </h2>
        <form  onSubmit={handleSearch} className=" flex gap-2">
          <input
            type="text"
            name="name"
            placeholder="Search by name"
            className="input rounded-full input-bordered"
          />
          <button type="submit" className=" btn rounded-sm bg-sky-800 text-white border-none">
            Search
          </button>
        </form>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-[#083344] text-white">
            <tr className="text-base">
              <th>Name</th>
              <th>Email</th>
              <th className="text-center">Role</th>
              <th className="text-center">Update Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => (
              <tr key={item._id} className="text-white bg-[#02455e]">
                <td>
                  <p className="font-bold">{item?.name}</p>
                </td>
                <td>{item?.email}</td>
                <td className="text-center">
                  <span className="px-3 py-1 uppercase rounded-full border-gray-200 border-2 text-white-500 gap-x-2 font-bold bg-[#075985]">
                    {item?.role}
                  </span>
                </td>
                <th className="text-center">
                  <button className="rounded-[3px] p-1 bg-[#012c3b] btn-xs">
                    <FaUsersCog
                      onClick={() => handleChangeRole(item._id)}
                      className="text-2xl text-white-600 text-center cursor-pointer"
                    />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;

// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import { FaUsersCog } from "react-icons/fa";
// import Swal from "sweetalert2";

// const AllUsers = () => {
//   const axiosSecure = useAxiosSecure();
//   const { data: users=[], refetch } = useQuery({
//     queryKey: ["users"],
//     // enabled: !loading,
//     queryFn: async () => {
//       const res = await axiosSecure.get('/users');
//       return res.data;
//     },
//   });

// const handleChangeRole = (_id) => {
// Swal.fire({
//   title: "Borrow",
//   html:
//     '<label for="role">Role:</label>' +
//     '<select id="role" class="swal2-input">' +
//     '<option value="student">Student</option>' +
//     '<option value="tutor">Tutor</option>' +
//     '<option value="admin">Admin</option>' +
//     "</select>",
//   focusConfirm: false,
//   showCancelButton: true,
//   confirmButtonText: "Submit",
//   preConfirm: () => {
//     const role = Swal.getPopup().querySelector("#role").value;
//     return { role: role };
//   },
// }).then((result) => {
//   if (result.isConfirmed) {
//     const { role } = result.value;
//     console.log("Selected role:", role);
//     const updated = {
//       role: role,
//     }
//      axiosSecure.patch(`/users/admin/${_id}`, updated)
//      .then(res=> {
//       if(res.data.modifiedCount>0) {
//         Swal.fire({
//           position: "top-end",
//           icon: "success",
//           title: "Update Successful",
//           showConfirmButton: false,
//           timer: 1500,
//         });
//         refetch()
//       }
//      })

//   }
// });
// }

//   // console.log(users)
//   return (
//     <div>
//       <div>
//         <h2 className="text-3xl font-bold text-center my-3 bg-[#082f49] p-2 text-white rounded-t-md">
//           All User: {users.length}
//         </h2>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="table">
//           {/* head */}
//           <thead className="bg-[#083344] text-white">
//             <tr className="text-base">
//               <th>Name</th>
//               <th>Email</th>
//               <th className="text-center">Role</th>
//               <th className="text-center">Update Role</th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* row 1 */}
//             {users.map((item) => (
//               <tr key={item._id} className=" text-white bg-[#02455e]">
//                 <td>
//                   <p className="font-bold">{item?.name}</p>
//                 </td>
//                 <td>{item?.email}</td>
//                 <td className="text-center">
//                   <span className="px-3 py-1  uppercase rounded-full border-gray-200 border-2 text-white-500 gap-x-2 font-bold bg-[#075985]">
//                     {item?.role}
//                   </span>
//                 </td>
//                 <th className="text-center">
//                   <button className=" rounded-[3px] p-1 bg-[#012c3b] btn-xs">
//                     <FaUsersCog
//                       onClick={()=> handleChangeRole(item._id)}
//                       className="text-2xl text-white-600 text-center cursor-pointer"
//                     />
//                   </button>
//                 </th>
//               </tr>
//             ))}
//           </tbody>
//           {/* foot */}
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AllUsers;
