import { Link, useParams } from "react-router-dom";
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
        <h1 className="text-3xl flex rounded-md justify-between font-bold text-center p-5  bg-[#083344] mb-6 text-white">
          <span>View All of your Materials</span>
          <Link to={-1} className="btn  bg-green-100">
            Go Back
          </Link>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
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