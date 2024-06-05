import { TiDeleteOutline } from "react-icons/ti";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import Swal from "sweetalert2";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

const NoteCard = ({ item, refetch }) => {
  const { _id, noteDetails, studentEmail, noteTitle } = item;
  const axiosSecure = useAxiosSecure();

  const handleDeleteNote = (_id) => {

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
        axiosSecure.delete(`/delete-notes/${_id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Delete Successful",
              showConfirmButton: false,
              timer: 1500,
            });
            refetch();
          }
        });
      }
    });
   
  };

  return (
    <div>
      <div className="w-full  px-4 py-3 bg-[#023551] rounded-md shadow-md ">
        <div className="flex justify-between">
          <span className="px-3 py-1 text-xs text-blue-800  bg-blue-200 rounded-full dark:bg-blue-300 dark:text-blue-900">
            {studentEmail}
          </span>
          <TiDeleteOutline
            onClick={() => handleDeleteNote(_id)}
            className="text-white cursor-pointer text-4xl"
          />
        </div>

        <div>
          <h1 className="mt-2 text-lg font-semibold text-gray-800 dark:text-white">
            {noteTitle}
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {noteDetails}
          </p>
        </div>
      </div>
    </div>
  );
};

NoteCard.propTypes = {
  refetch: PropTypes.any,
  item: PropTypes.object,
};
export default NoteCard;
