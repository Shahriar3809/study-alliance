import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import SeeMaterialTutor from "../../../Components/Tutor/SeeMaterialTutor";
import AllMaterialsCard from "../../../Components/Admin/AllMaterialsCard";


const AllMaterials = () => {

    const axiosSecure = useAxiosSecure();
    // const {user} = useAuth()
    const { data: allMaterials = [], refetch } = useQuery({
      queryKey: ["materialOfAdmin"],
      queryFn: async () => {
        const res = await axiosSecure.get(`/admin/all-materials`);
        return res.data;
      },
    });
    console.log(allMaterials)
     return (
      <div>
        <h1 className="text-3xl font-bold text-center p-5  bg-[#083344] mb-6 text-white">
          View All of Materials
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {allMaterials.map((item) => (
            <AllMaterialsCard
              key={item._id}
              item={item}
              refetch={refetch}
            ></AllMaterialsCard>
          ))}
        </div>
      </div>
    );
};

export default AllMaterials;



