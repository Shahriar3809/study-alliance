import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useTutor = () => {
   const { user, loading } = useAuth();
   const axiosSecure = useAxiosSecure();
   const { data: isTutor, isPending: isTutorLoading } = useQuery({
     queryKey: ["tutor"],
     enabled: !loading,
     queryFn: async () => {
       const res = await axiosSecure.get(`/user/tutor/${user.email}`);
       return res.data?.tutor;
     },
   });
   return { isTutor, isTutorLoading };
};

export default useTutor;