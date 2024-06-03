import PropTypes from "prop-types";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const SessionCardForAdmin = ({ item, refetch }) => {
  const {
    _id,
    title,
    tutorName,
    tutorEmail,
    description,
    startDate,
    endDate,
    classStartDate,
    classEndDate,
    duration,
    fee,
    status,
  } = item;
  const axiosSecure = useAxiosSecure();

  const handleApprove = (_id) => {
    Swal.fire({
      title: "Specify the Amount",
      html:
        '<label for="fee">Session Fee:</label>' +
        '<input id="fee" class="swal2-input" type="number" placeholder="$ If free, write 0">',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Approve",
      preConfirm: () => {
        const fees = Swal.getPopup().querySelector("#fee").value;
        
        if (!fees) {
          Swal.showValidationMessage("Fee is required");
        }
        return {  fees: fees };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const fee = parseInt(result.value.fees);
        console.log(fee)
        // Server
        axiosSecure
          .patch(`/all-session/admin/${_id}`, { status: "approved", fee: fee })
          .then((res) => {
            // console.log(res.data);
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Session Approved",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      }
    });
  };

  const handleReject = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/all-session/admin/${_id}`, { status: "rejected" })
          .then((res) => {
            console.log(res.data);
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Session Approved",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const handleDeleteSession = (_id) => {
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

        axiosSecure.delete(`/all-session/admin/${_id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            refetch();

            Swal.fire({
              title: "Deleted!",
              text: "This session has been deleted.",
              icon: "success",
            });
          }
        });


        
      }
    });
  };

  return (
    <div>
      <div className=" text-white px-8 py-4 rounded-lg shadow-lg bg-sky-900">
        <div className="flex items-center justify-between">
          <div className="">
            <p className="text-base font-bold text-gray-300 ">{tutorName}</p>
            <p className="text-sm text-gray-400">{tutorEmail}</p>
          </div>
          <a
            className="px-3 py-2 text-sm font-bold text-gray-100 transition-colors duration-300 transform  bg-black rounded cursor-pointer "
            role="button"
          >
            {status}
          </a>
        </div>

        <div className="mt-2">
          <a
            href="#"
            className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline"
            role="link"
          >
            {title}
          </a>
          <p className="mt-2 text-gray-600 text-justify dark:text-gray-300">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora
            expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos
            enim reprehenderit nisi, accusamus delectus nihil quis facere in
            modi ratione libero!
            {description}
          </p>
        </div>
        <hr />
        <div className="py-3">
          <div className="flex justify-between">
            <p>Reg Start: {startDate}</p>
            <p>Class Start{classStartDate}</p>
          </div>
          <div className="flex justify-between">
            <p>Reg End{endDate}</p>
            <p>Class End{classEndDate}</p>
          </div>
        </div>
        <hr />
        <div>
          <p>Duration: {duration}</p>
          <p>Fee: {fee}</p>
        </div>
        {status === "pending" ? (
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={() => handleApprove(_id)}
              className=" btn text-white font-bold bg-green-500 py-2 px-4   hover:bg-green-600 border-none rounded-md "
            >
              Approve
            </button>

            <div
              className="flex items-center"
              onClick={() => handleReject(_id)}
            >
              <button className=" btn text-black font-bold bg-yellow-500 py-2 px-6   hover:bg-yellow-600 border-none rounded-md ">
                Reject
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={() => handleApprove(_id)}
              className=" btn text-white font-bold bg-green-700 py-2 px-4   hover:bg-green-600 border-none rounded-md "
            >
              Update
            </button>

            <div className="flex items-center">
              <button
                onClick={() => handleDeleteSession(_id)}
                className=" btn text-white font-bold bg-red-500 py-2 px-6   hover:bg-red-600 border-none rounded-md "
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

SessionCardForAdmin.propTypes = {
  item: PropTypes.object,
  refetch: PropTypes.any,
};

export default SessionCardForAdmin;
