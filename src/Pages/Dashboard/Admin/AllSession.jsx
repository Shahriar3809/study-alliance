import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SessionCardForAdmin from "../../../Components/Admin/SessionCardForAdmin";
import { useState } from "react";

const itemsPerPage = 4;

const AllSession = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(0);

  const {
    data = {},
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allSession", currentPage],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/all-session?page=${currentPage}&limit=${itemsPerPage}`
      );
      return data;
    },
  });

  const numberOfPages = Math.ceil((data.totalSessions || 0) / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  if (isLoading) {
    return <div></div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold p-5 text-center bg-sky-950 text-white mb-3 rounded-t-lg">
          All Study Sessions: {data.totalSessions}
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {data.sessions.map((item) => (
            <SessionCardForAdmin key={item._id} item={item} refetch={refetch} />
          ))}
        </div>
        <div className="flex justify-center items-center mt-5">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
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
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, numberOfPages - 1))
            }
            disabled={currentPage === numberOfPages - 1}
            className="btn bg-sky-900 text-white mx-2"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default AllSession;
