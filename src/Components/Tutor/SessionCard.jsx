import PropTypes from "prop-types";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const SessionCard = ({ session, refetch }) => {
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
    feedback,
    rejectionReason,
  } = session;
  console.log(fee)
  const axiosSecure = useAxiosSecure()

    const handleRequestAgain = (_id) => {
      Swal.fire({
        title: "Are you sure?",
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Request Again!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure
            .patch(`/req-session/admin/${_id}`, { status: "pending" })
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
            refetch()
          Swal.fire({
            title: "Send!",
            text: "Your request has been send",
            icon: "success",
          });
        }
      });
    };


  return (
    <div className=" bg-gray-100 shadow-lg rounded-lg overflow-hidden mt-6 border border-gray-200">
      <div className="bg-[#0e516c] text-white px-6 py-4">
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <div className="px-6 py-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <span className="block text-gray-700 text-sm font-semibold mb-1">
            Tutor Name:
          </span>
          <p className="text-gray-900">{tutorName}</p>
        </div>

        <div>
          <span className="block text-gray-700 text-sm font-semibold mb-1">
            Tutor Email:
          </span>
          <p className="text-gray-900">{tutorEmail}</p>
        </div>

        <div>
          <span className="block text-gray-700 text-sm font-semibold mb-1">
            Session Description:
          </span>
          <p className="text-gray-900">{description}</p>
        </div>

        <div>
          <span className="block text-gray-700 text-sm font-semibold mb-1">
            Registration Start Date:
          </span>
          <p className="text-gray-900">{startDate}</p>
        </div>

        <div>
          <span className="block text-gray-700 text-sm font-semibold mb-1">
            Registration End Date:
          </span>
          <p className="text-gray-900">{endDate}</p>
        </div>

        <div>
          <span className="block text-gray-700 text-sm font-semibold mb-1">
            Class Start Date:
          </span>
          <p className="text-gray-900">{classStartDate}</p>
        </div>

        <div>
          <span className="block text-gray-700 text-sm font-semibold mb-1">
            Class End Date:
          </span>
          <p className="text-gray-900">{classEndDate}</p>
        </div>

        <div>
          <span className="block text-gray-700 text-sm font-semibold mb-1">
            Session Duration:
          </span>
          <p className="text-gray-900">{duration}</p>
        </div>

        <div>
          <span className="block text-gray-700 text-sm font-semibold mb-1">
            Registration Fee:
          </span>
          <p className="text-gray-900">₹ {fee}</p>
        </div>

        <div>
          <span className="block text-gray-700 text-sm font-semibold mb-1">
            Status:
          </span>
          <p className="text-gray-900">{status}</p>
        </div>
        <div>
          {status === "rejected" ? (
            <>
              <span className="block text-gray-700 text-sm font-semibold mb-1">
                Rejection Reason:
              </span>
              <p className="text-gray-900">{rejectionReason}</p>
            </>
          ) : (
            <></>
          )}
        </div>
        <div>
          {status === "rejected" ? (
            <>
              <span className="block text-gray-700 text-sm font-semibold mb-1">
                Feedback:
              </span>
              <p className="text-gray-900">{feedback}</p>
            </>
          ) : (
            <></>
          )}
        </div>
        <div>
          {status === "rejected" ? (
            <button
              onClick={() => handleRequestAgain(_id)}
              className="btn btn-primary"
            >
              Request Again
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

SessionCard.propTypes = {
  session: PropTypes.any,
  refetch: PropTypes.any,
};
export default SessionCard;
