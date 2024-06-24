


import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useTutor = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: isTutor,
    isLoading: isTutorLoading,
    error,
  } = useQuery({
    queryKey: ["tutor"],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/tutor/${user.email}`);
      return res.data?.tutor;
    },
  });

  console.log("useTutor", { isTutor, isTutorLoading, error, user });

  return { isTutor, isTutorLoading, error };
};

export default useTutor;
