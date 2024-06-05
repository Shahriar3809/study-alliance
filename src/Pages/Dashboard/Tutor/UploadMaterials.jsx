import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import ApprovedSessionCard from "../../../Components/Tutor/ApprovedSessionCard";
// import SessionCard from "../../../Components/Tutor/SessionCard";


const UploadMaterials = () => {

const {user} = useAuth();

const axiosSecure = useAxiosSecure();

const { data: approvedSession = [] } = useQuery({
  queryKey: ["myApprovedSessions"],
  queryFn: async () => {
    const res = await axiosSecure.get(`/my-approved-session/${user?.email}`);
    return res.data;
  },
});

console.log(approvedSession)
    return (
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {approvedSession && approvedSession.map((item) => (
          <ApprovedSessionCard
            key={item._id}
            item={item}
            // refetch={refetch}
          ></ApprovedSessionCard>
        ))}
      </div>
    );
};

export default UploadMaterials;