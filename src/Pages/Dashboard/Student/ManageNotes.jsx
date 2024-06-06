import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import NoteCard from "../../../Components/Student/NoteCard";


const ManageNotes = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
      const { data: allNotes = [], refetch } = useQuery({
        queryKey: ["allNotes"],
        queryFn: async () => {
          
          const res = await axiosSecure.get(`/my-notes/${user?.email}`);
          return res.data;
        },
      });
    //   console.log(allNotes, refetch)
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3">
            {allNotes.map(item=> <NoteCard refetch={refetch} key={item._id} item={item}></NoteCard>)}
        </div>
    );
};

export default ManageNotes;