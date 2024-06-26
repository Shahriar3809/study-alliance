import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const MySessionCardStudent = ({ item, isButton }) => {
  const {
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
    sessionId,
  } = item;
  return (
    <div className=" bg-gray-100 shadow-lg rounded-lg text-sm overflow-hidden mt-6 border border-gray-200">
      <div className="bg-[#0e516c] text-white px-6 py-4">
        <h2 className="md:text-xl font-bold">{title}</h2>
      </div>
      <div className="px-2 py-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <span className="block text-gray-700 bg-gray-300 p-1 rounded-sm text-sm font-semibold mb-1">
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
        <br />
      </div>
      <div className="p-2 ">
        {isButton || (
          <Link
            to={`/my-session-details/${sessionId}`}
            className="btn  w-full bg-sky-950 text-white rounded-md"
          >
            See Details
          </Link>
        )}
        <div>
          {isButton && (
            <Link
              to={`/see-all-materials/${sessionId}`}
              className="btn w-full bg-sky-950 text-white rounded-md"
            >
              Click to see Materials for this course
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

MySessionCardStudent.propTypes = {
  item: PropTypes.object,
  isButton: PropTypes.any,
  
};

export default MySessionCardStudent;
