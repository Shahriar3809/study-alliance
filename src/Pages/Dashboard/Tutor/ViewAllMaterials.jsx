import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import SeeMaterialTutor from "../../../Components/Tutor/SeeMaterialTutor";
// import {  useState } from "react";
// import useAxiosPublic from "../../../Hooks/useAxiosPublic";


const ViewAllMaterials = () => {
    const axiosSecure = useAxiosSecure();
  
    const {user} = useAuth()

    
    const { data: allMaterials = [], refetch } = useQuery({
      queryKey: ["materialOfTutor"],
      queryFn: async () => {
        const res = await axiosSecure.get(`/my-materials/${user?.email}`);
        return res.data;
      },
    });
  
  

    return (
      <>
        <div>
          <h1 className="text-3xl font-bold text-center p-5  bg-[#083344] mb-6 text-white">
            View All of your Materials
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {allMaterials.map((item) => (
              <SeeMaterialTutor
                key={item._id}
                item={item}
                refetch={refetch}
              ></SeeMaterialTutor>
            ))}
          </div>
        </div>
       
      </>
    );
};

export default ViewAllMaterials;