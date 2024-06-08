import {Link} from 'react-router-dom'



import PropTypes from "prop-types";
import { differenceInCalendarDays } from "date-fns";

const HomeSessionCard = ({ item }) => {
  const { title, tutorName, tutorEmail, description, endDate, _id } = item;

  const endDateObject = new Date(endDate);
  const today = new Date();
  const difference = differenceInCalendarDays(endDateObject, today);

  return (
    <div>
      <div className="w-full pt-6 min-h-[300px] text-white flex flex-col px-4 py-3  rounded-md shadow-lg shadow-gray-600 bg-[#082f49]">
        <div className="flex items-center justify-between">
          <span className="text-sm font-light text-gray-800 dark:text-gray-400">
            Tutor Email: {tutorEmail}
          </span>
          <span className="px-3 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full dark:bg-blue-300 dark:text-blue-900">
            {tutorName}
          </span>
        </div>

        <div className="flex-grow mb-3">
          <h1 className="mt-2 text-4xl font-semibold text-gray-800 dark:text-white">
            {title}
          </h1>
          <p className="mt-2 text-lg  text-gray-600 dark:text-gray-300">
            {description}
          </p>
        </div>
        <hr />
        <p className="text-center p-2 ">
          Registration Ends in: <span className="underline">{endDate}</span>
        </p>
        <hr className="my-2" />
        <div>
          <div className="flex gap-3 items-center justify-between mt-4">
            {difference >= 0 ? (
              <button
                disabled
                className="bg-gray-700 border-2 font-bold  px-4 py-3 rounded-lg"
              >
                Ongoing
              </button>
            ) : (
              <button
                disabled
                className="bg-orange-600 border-2 font-bold  px-4 py-3 rounded-lg"
              >
                Closed
              </button>
            )}

            <Link
              to={`/session-details/${_id}`}
              className="bg-[#075985] text-center hover:bg-[#1973a3] font-bold w-1/2 px-4 py-3 rounded-sm"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

HomeSessionCard.propTypes = {
  item: PropTypes.object.isRequired,
};

export default HomeSessionCard;
