import PropTypes from "prop-types";

const RejectedCard = ({ item }) => {
  const {  tutorEmail, title, feedback, rejectionReason } = item;
  return (
    <div>
      <div className="w-full h-[320px] space-y-3 px-4 py-3 bg-white text-white rounded-md shadow-md dark:bg-sky-950">
        <div className="flex items-center justify-between">
          <span className="text-sm font-light text-gray-800 dark:text-gray-400">
            {tutorEmail}
          </span>
        </div>
        <h1 className="mt-2 text-2xl text-center font-semibold text-gray-800 dark:text-white">
          {title}
        </h1> 
        <hr />
        <div className=" justify-between gap-3">
          <div className="flex items-center mt-2 text-gray-700 dark:text-orange-200">
            <p>
              <span className="font-bold underline text-white">
                {" "}
                Rejection Reason:
              </span>{" "}
              <br />
              {rejectionReason}
            </p>
          </div>

          <div>
            <div className="flex items-center mt-2 text-gray-700 dark:text-orange-200">
              <p>
                <span className="font-bold underline text-white">
                  {" "}
                  Feedback:
                </span>{" "}
                <br />
                {feedback}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

RejectedCard.propTypes = {
  item: PropTypes.object,
};

export default RejectedCard;
