import {  useParams } from "react-router-dom";
// import SeeMaterialTutor from "../../../Components/Tutor/SeeMaterialTutor";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import MaterialsCardForStudent from "../../../Components/Student/MaterialsCardForStudent";


const ViewAllMaterialsStudent = () => {
    const {sessionId} = useParams()
    const axiosSecure = useAxiosSecure();
    // const { user } = useAuth();
    const { data: allMaterials = [] } = useQuery({
      queryKey: ["materialOfTutor"],
      queryFn: async () => {
        const res = await axiosSecure.get(
          `/materials-for-this-session/${sessionId}`
        );
        return res.data;
      },
    });
    console.log(allMaterials);
    return (
      <div>
        <h1 className="text-3xl  text-center  font-bold  p-5  bg-[#083344] mb-6 text-white">
          View All of your Materials
         
        </h1>

        <div className="grid grid-cols-1 p-3 lg:grid-cols-3 gap-5">
          {allMaterials.map((item) => (
            <MaterialsCardForStudent
              key={item._id}
              item={item}
            ></MaterialsCardForStudent>
          ))}
        </div>
      </div>
    );
};

export default ViewAllMaterialsStudent;