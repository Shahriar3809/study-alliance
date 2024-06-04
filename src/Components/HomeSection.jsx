// import { useQuery } from "@tanstack/react-query";
// import HomeSessionCard from "./HomeSessionCard";
// import useAxiosSecure from "../Hooks/useAxiosSecure";

// const HomeSection = () => {
//     const axiosSecure = useAxiosSecure()
//     const { data: approvedData = [] } = useQuery({
//       queryKey: ["approvedSessionForHome"],
//       queryFn: async () => {
//         const { data } = await axiosSecure.get("/all-approved-session");
//         return data;
//       },
//     });
//     console.log(approvedData)
//     return (
//         <div>
//             Home Section
//             <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5">
//                 {
//                     approvedData.map(item=> <HomeSessionCard key={item._id} item={item}></HomeSessionCard>)
//                 }
//             </div>
//         </div>
//     );
// };

// export default HomeSection;






import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import HomeSessionCard from "./HomeSessionCard";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const HomeSection = () => {
  const axiosSecure = useAxiosSecure();
  const [showAll, setShowAll] = useState(false);

  const {
    data: approvedData = [],
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["approvedSessionForHome", showAll],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/all-approved-session?limit=${showAll ? 0 : 7}`
      );
      return data;
    },
    keepPreviousData: true, // Keeps the previous data while fetching new data
  });

  const handleShowAll = () => {
    setShowAll(true);
    refetch();
  };


  return (
    <div>
      <h2 className="text-5xl font-bold text-center py-5 mt-10 text-[#132e3d]">
        See all Our <span className=" underline text-[#337193]">Session</span> bellow
      </h2>
      <p className="text-center font-semibold mb-8">
        You can purchase any course bellow using Stripe Payment
      </p>
      <hr className="mb-10 border-2 border-dashed " />
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8">
        {(showAll ? approvedData : approvedData.slice(0, 6)).map((item) => (
          <HomeSessionCard key={item._id} item={item} />
        ))}
      </div>
      {approvedData.length === 7 && !showAll && (
        <div className="w-[250px] mx-auto">
          <button
            onClick={handleShowAll}
            className="bg-[#075985] hover:bg-[#1973a3]  text-white font-bold px-4 py-4 rounded-lg mt-8 w-full "
          >
            See All Sessions
          </button>
        </div>
      )}
      {isFetching && (
        <div className="mt-4">
          <div className="spinner flex justify-center items-center">
            <span className="loading loading-ring text-center mt-20 loading-lg"></span>
          </div>{" "}
        </div>
      )}
    </div>
  );
};

export default HomeSection;
