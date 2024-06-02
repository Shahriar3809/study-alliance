import { useQuery } from "@tanstack/react-query";
import SessionCard from "../../../Components/Tutor/SessionCard";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const AllTutorSession = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

     const { data: mySession = [], refetch } = useQuery({
       queryKey: ['MySession'],
       queryFn: async () => {
         const res = await axiosSecure.get(`/my-session/${user?.email}`);
         return res.data;
       },
     });

     console.log(mySession);
    return (
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {mySession.map((item) => (
          <SessionCard key={item._id} session={item} refetch={refetch}></SessionCard>
        ))}
      </div>
    );
};

export default AllTutorSession;