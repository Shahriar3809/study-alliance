import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { MdUpload } from "react-icons/md";

const ApprovedSessionCard = ({ item }) => {
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
  console.log(item)
  return (
    <div>
      <div className=" bg-gray-100 shadow-lg rounded-lg overflow-hidden mt-6 border border-gray-200">
        <div className="bg-[#0e516c] text-white px-6 py-4">
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <div className=" px-1 md:px-6 py-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="block bg-gray-300 p-1 rounded-sm text-gray-700 text-sm font-semibold mb-1">
              Tutor Name:
            </span>
            <p className="text-gray-900">{tutorName}</p>
          </div>

          <div>
            <span className="block bg-gray-300 p-1 rounded-sm text-gray-700 text-sm font-semibold mb-1">
              Tutor Email:
            </span>
            <p className="text-gray-900">{tutorEmail}</p>
          </div>

          <div>
            <span className="block bg-gray-300 p-1 rounded-sm text-gray-700 text-sm font-semibold mb-1">
              Session Description:
            </span>
            <p className="text-gray-900">{description}</p>
          </div>

          <div>
            <span className="block bg-gray-300 p-1 rounded-sm text-gray-700 text-sm font-semibold mb-1">
              Registration Start Date:
            </span>
            <p className="text-gray-900">{startDate}</p>
          </div>

          <div>
            <span className="block bg-gray-300 p-1 rounded-sm text-gray-700 text-sm font-semibold mb-1">
              Registration End Date:
            </span>
            <p className="text-gray-900">{endDate}</p>
          </div>

          <div>
            <span className="block bg-gray-300 p-1 rounded-sm text-gray-700 text-sm font-semibold mb-1">
              Class Start Date:
            </span>
            <p className="text-gray-900">{classStartDate}</p>
          </div>

          <div>
            <span className="block bg-gray-300 p-1 rounded-sm text-gray-700 text-sm font-semibold mb-1">
              Class End Date:
            </span>
            <p className="text-gray-900">{classEndDate}</p>
          </div>

          <div>
            <span className="block bg-gray-300 p-1 rounded-sm text-gray-700 text-sm font-semibold mb-1">
              Session Duration:
            </span>
            <p className="text-gray-900">{duration}</p>
          </div>

          <div>
            <span className="block bg-gray-300 p-1 rounded-sm text-gray-700 text-sm font-semibold mb-1">
              Registration Fee:
            </span>
            <p className="text-gray-900">$ {fee}</p>
          </div>

          <div>
            <span className="block bg-gray-300 p-1 rounded-sm text-gray-700 text-sm font-semibold mb-1">
              Status:
            </span>
            <p className="text-gray-900">{status}</p>
          </div>
        </div>
        <div>
          <Link
            to={`/dashboard/tutor/upload-materials/${_id}`}
            className="btn w-full bg-sky-900 text-white rounded-lg"
          >
            <MdUpload className="text-xl" /> Upload Materials
          </Link>
        </div>
      </div>
    </div>
  );
};

ApprovedSessionCard.propTypes = {
  item: PropTypes.any,
  
};
export default ApprovedSessionCard;
