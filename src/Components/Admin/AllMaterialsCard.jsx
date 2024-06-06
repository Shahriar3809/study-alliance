import PropTypes from "prop-types";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import { Link } from "react-router-dom";


const AllMaterialsCard = ({ item, refetch }) => {
  const { _id, image, link, materialsTitle } = item;
  const handleClick = () => {
    // You can add any additional actions here before redirecting
    // For example, logging analytics events
    console.log("Link clicked:", link);
  };

  const axiosSecure = useAxiosSecure();

  const handleDeleteMaterial = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(_id);
        axiosSecure.delete(`/materials/tutor/${_id}`).then((res) => {
          // console.log(res.data);
          if (res.data.deletedCount > 0) {
            refetch();

            Swal.fire({
              title: "Deleted!",
              text: "This Material has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };


  return (
    <div>
      <div className="flex flex-col overflow-hidden border-2 bg-[#083344] rounded-lg  shadow-2xl">
        <div className="w-full h-[350px] relative">
          <img src={image} alt="" className="w-full h-full" />
          <p className="text-white bg-[#082f49] border-white border-y-4 border-l-4 text-xl absolute top-5 right-0 py-3 pl-4 pr-2 rounded-l-full font-bold">
            Material Banner
          </p>
        </div>

        <div className="w-full p-4 md:p-4 space-y-2">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            {materialsTitle}
          </h1>
          <h1 className="text-lg font-bold text-gray-700 dark:text-gray-200 md:text-xl">
            <p className="">
              See the link to see Materials: <br />
              <a
                href={link}
                onClick={handleClick}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-sm hover:text-green-500 text-blue-600"
              >
                {link}
              </a>
            </p>
          </h1>
          <div className="flex justify-between mt-3 item-center">
            <button
              onClick={() => handleDeleteMaterial(_id)}
              className="px-3 rounded-md py-4 bg-yellow-600 text-black font-bold"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <div>
        
      </div>
    </div>
  );
};

AllMaterialsCard.propTypes = {
  item: PropTypes.object,
  refetch: PropTypes.any,
};
export default AllMaterialsCard;
