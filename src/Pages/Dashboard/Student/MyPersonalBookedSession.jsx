import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import MySessionCardStudent from "../../../Components/Student/MySessionCardStudent";


const MyPersonalBookedSession = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()


     const { data: myBookedSessionData = [] } = useQuery({
       queryKey: ["myBookedSession"],
       queryFn: async () => {
         const { data } = await axiosSecure.get(`/my-booked-session/${user?.email}`);
         return data;
       },
     });

     console.log(myBookedSessionData)


    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
           {
            myBookedSessionData.map(item=> <MySessionCardStudent key={item._id} item={item}></MySessionCardStudent>)
           }
        </div>
    );
};

export default MyPersonalBookedSession;