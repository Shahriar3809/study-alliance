

const SessionCard = () => {
    const session = {
      title: "Advanced Mathematics",
      tutorName: "John Doe",
      tutorEmail: "john.doe@example.com",
      description:
        "An advanced mathematics study session covering algebra, calculus, and geometry.",
      regStartDate: "2024-06-01",
      regEndDate: "2024-06-15",
      classStartDate: "2024-06-20",
      classEndDate: "2024-07-20",
      duration: "1 month",
      registrationFee: 0,
      status: "pending",
    };
    return (
      <div className="max-w-[450px] mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden mt-6 border border-gray-200">
        <div className="bg-[#0e516c] text-white px-6 py-4">
          <h2 className="text-xl font-bold">{session.title}</h2>
        </div>
        <div className="px-6 py-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="block text-gray-700 text-sm font-semibold mb-1">
              Tutor Name:
            </span>
            <p className="text-gray-900">{session.tutorName}</p>
          </div>

          <div>
            <span className="block text-gray-700 text-sm font-semibold mb-1">
              Tutor Email:
            </span>
            <p className="text-gray-900">{session.tutorEmail}</p>
          </div>

          <div>
            <span className="block text-gray-700 text-sm font-semibold mb-1">
              Session Description:
            </span>
            <p className="text-gray-900">{session.description}</p>
          </div>

          <div>
            <span className="block text-gray-700 text-sm font-semibold mb-1">
              Registration Start Date:
            </span>
            <p className="text-gray-900">{session.regStartDate}</p>
          </div>

          <div>
            <span className="block text-gray-700 text-sm font-semibold mb-1">
              Registration End Date:
            </span>
            <p className="text-gray-900">{session.regEndDate}</p>
          </div>

          <div>
            <span className="block text-gray-700 text-sm font-semibold mb-1">
              Class Start Date:
            </span>
            <p className="text-gray-900">{session.classStartDate}</p>
          </div>

          <div>
            <span className="block text-gray-700 text-sm font-semibold mb-1">
              Class End Date:
            </span>
            <p className="text-gray-900">{session.classEndDate}</p>
          </div>

          <div>
            <span className="block text-gray-700 text-sm font-semibold mb-1">
              Session Duration:
            </span>
            <p className="text-gray-900">{session.duration}</p>
          </div>

          <div>
            <span className="block text-gray-700 text-sm font-semibold mb-1">
              Registration Fee:
            </span>
            <p className="text-gray-900">₹{session.registrationFee}</p>
          </div>

          <div>
            <span className="block text-gray-700 text-sm font-semibold mb-1">
              Status:
            </span>
            <p className="text-gray-900">{session.status}</p>
          </div>
        </div>
      </div>
    );
};

export default SessionCard;