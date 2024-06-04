import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";


const SessionDetailsPage = () => {
const {id} = useParams()
const axiosPublic = useAxiosPublic()
const { data: sessionDetails = [] } = useQuery({
  queryKey: ["sessionDetails"],
  queryFn: async () => {
    const res = await axiosPublic.get(`/session-details/${id}`);
    return res.data;
  },
});

console.log(sessionDetails)
    return (
        <div>
            Details
        </div>
    );
};

export default SessionDetailsPage;