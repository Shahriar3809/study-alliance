import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SessionCardForAdmin from "../../../Components/Admin/SessionCardForAdmin";
// import { FaUsersCog } from "react-icons/fa";


const AllSession = () => {
    const axiosSecure = useAxiosSecure()
    const {data=[], refetch} = useQuery({
        queryKey: ['allSession'],
        queryFn: async()=> {
            const {data} = await axiosSecure.get('/all-session')
            return data
        }
    })


// console.log(data)



    return (
      <>
        <div>
            <h1 className="text-3xl font-bold p-5 text-center bg-sky-950 text-white mb-3 rounded-t-lg ">All Study Session: {data.length}</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {data.map((item) => (
              <SessionCardForAdmin
                key={item._id}
                item={item}
                refetch={refetch}
              ></SessionCardForAdmin>
            ))}
          </div>
        </div>
      </>
    );
};

export default AllSession;


