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
        return { fees: fees };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const fee = parseInt(result.value.fees);
        console.log(fee);
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
      html:
        
        '<textarea id="rejectionReason" class="swal2-textarea" placeholder="Enter rejection reason"></textarea>' +
        '<br/>' + 
       
        '<textarea id="feedback" class="swal2-textarea" placeholder="Enter feedback"></textarea>',
      preConfirm: () => {
        const rejectionReason =
          Swal.getPopup().querySelector("#rejectionReason").value;
        const feedback = Swal.getPopup().querySelector("#feedback").value;

        if (!rejectionReason || !feedback) {
          Swal.showValidationMessage("Both fields are required");
        }
        return { rejectionReason, feedback };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { rejectionReason, feedback } = result.value;

        axiosSecure
          .patch(`/all-session/admin/${_id}`, {
            status: "rejected",
            rejectionReason,
            feedback,
          })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                title: "Rejected!",
                text: "The session has been rejected.",
                icon: "success",
              });
            }
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
      <div className=" text-white px-3 md:px-8 py-4 rounded-lg shadow-lg bg-sky-900">
        <div className="flex items-center justify-between">
          <div className="">
            <p className="text-base font-bold text-gray-300 ">{tutorName}</p>
            <p className="text-sm text-gray-400">{tutorEmail}</p>
          </div>
          <a
            className={`px-3 py-2 text-sm font-bold text-gray-100 transition-colors duration-300 transform  ${
              status === "rejected" ? "bg-red-600 " : "bg-green-600 "
            } ${status === "pending" && "bg-yellow-700 "} rounded cursor-pointer`}
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
            {description}
          </p>
        </div>
        <hr />
        <div className="py-3">
          <div className="flex justify-between">
            <p>Reg Start: {startDate}</p>
            <p>Class Start{classStartDate}</p>
          </div>
          <br />
          <div className="flex justify-between">
            <p>Reg End{endDate}</p>
            <p>Class End{classEndDate}</p>
          </div>
        </div>
        <hr />
        <br />
        <div className="flex justify-between">
          <p className="p-1 bg-sky-700 my-1 rounded-lg w-36 text-center">
            Duration: {duration}
          </p>
          <p className="p-1 bg-sky-700 my-1 rounded-lg w-20 text-center">
            Fee: {fee}
          </p>
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
  item: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default SessionCardForAdmin;
