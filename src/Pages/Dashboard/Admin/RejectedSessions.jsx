import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import RejectedCard from "../../../Components/Admin/RejectedCard";


const RejectedSessions = () => {

    const axiosSecure = useAxiosSecure()
    const {data:rejectedSession=[]} = useQuery({
        queryKey: ['rejectedSession'],
        queryFn: async()=> {
            const {data} = await axiosSecure.get('/rejected-session');
            return data
        }
    })

console.log(rejectedSession)
    return (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {
                rejectedSession.map(item=> <RejectedCard item={item} key={item._id}></RejectedCard>)
            }
        </div>
    );
};

export default RejectedSessions;