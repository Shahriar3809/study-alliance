import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import AllMaterialsCard from "../../../Components/Admin/AllMaterialsCard";
import { useState } from "react";

const itemsPerPage = 3;

const AllMaterials = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(0);

  const {
    data: item = {},
    isLoading: isLoadingCount,
  } = useQuery({
    queryKey: ["count"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/item-count`);
      return res.data;
    },
  });

  const {
    data: allMaterials = [],
    isLoading: isLoadingMaterials,
    refetch,
  } = useQuery({
    queryKey: ["materialOfAdmin", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/admin/all-materials?page=${currentPage}&limit=${itemsPerPage}`
      );
      return res.data;
    },
  });

  const numberOfPages = Math.ceil((item.count || 0) / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  const handleNextPage = () => {
    if (currentPage < numberOfPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (isLoadingCount || isLoadingMaterials) {
    return <div></div>;
  }


  return (
    <div>
      <h1 className="text-3xl font-bold text-center p-5 bg-[#083344] mb-6 text-white">
        View All of Materials
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {allMaterials.map((item) => (
          <AllMaterialsCard key={item._id} item={item} refetch={refetch} />
        ))}
      </div>
      <div className="flex justify-center items-center mt-5">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
          className="btn bg-sky-900 text-white mx-2"
        >
          Previous
        </button>
        {pages.map((page) => (
          <button
            className={
              currentPage === page
                ? "bg-sky-900 text-white btn mx-1"
                : "btn mx-1"
            }
            onClick={() => setCurrentPage(page)}
            key={page}
          >
            {page + 1}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          disabled={currentPage === numberOfPages - 1}
          className="btn bg-sky-900 text-white mx-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllMaterials;
