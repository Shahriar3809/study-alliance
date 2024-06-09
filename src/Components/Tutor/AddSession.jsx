import PropTypes from "prop-types";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddSession = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleCreateSession = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const tutorName = user?.displayName;
    const tutorEmail = user?.email;
    const description = form.description.value;
    const startDate = form.startDate.value;
    const endDate = form.endDate.value;
    const classStartDate = form.classStartDate.value;
    const classEndDate = form.classEndDate.value;
    const duration = parseInt(form.duration.value);
    const fee = parseInt(form.fee.value);
    const status = form.status.value;
    const sessionData = {
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
    };
    console.log(sessionData);

    axiosSecure.post("/all-session", sessionData).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Session Added Successful",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  return (
    <div>
      <div className="mx-auto bg-gray-200 shadow-lg rounded-lg overflow-hidden mt-6">
        <div className="px-1 md:px-6 py-4">
          <h2 className="md:text-4xl text-center pb-3 uppercase text-[#0c4a6e] font-bold mb-6 pt-5">
            Create Study Session
          </h2>
          <form onSubmit={handleCreateSession}>
            <div className="flex flex-col md:flex-row gap-8">
              {/* 1 */}
              <div className="md:w-1/2">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="sessionTitle"
                  >
                    Session Title
                  </label>
                  <input
                    id="sessionTitle"
                    type="text"
                    name="title"
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#0369a1]"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="tutorName"
                  >
                    Tutor Name
                  </label>
                  <input
                    id="tutorName"
                    type="text"
                    required
                    value={user?.displayName}
                    readOnly
                    className="w-full px-3 py-2 border rounded-lg bg-gray-200"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="tutorEmail"
                  >
                    Tutor Email
                  </label>
                  <input
                    id="tutorEmail"
                    type="text"
                    required
                    value={user?.email}
                    readOnly
                    className="w-full px-3 py-2 border rounded-lg bg-gray-200"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="sessionDescription"
                  >
                    Session Description
                  </label>
                  <textarea
                    id="sessionDescription"
                    name="description"
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#0369a1]"
                    rows="4"
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="regStartDate"
                  >
                    Registration Start Date
                  </label>
                  <input
                    id="regStartDate"
                    type="date"
                    name="startDate"
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#0369a1]"
                  />
                </div>
              </div>

              {/* 2 */}
              <div className="md:w-1/2">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="regEndDate"
                  >
                    Registration End Date
                  </label>
                  <input
                    id="regEndDate"
                    type="date"
                    name="endDate"
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#0369a1]"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="classStartDate"
                  >
                    Class Start Date
                  </label>
                  <input
                    id="classStartDate"
                    type="date"
                    name="classStartDate"
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#0369a1]"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="classEndDate"
                  >
                    Class End Date
                  </label>
                  <input
                    id="classEndDate"
                    type="date"
                    name="classEndDate"
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#0369a1]"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="sessionDuration"
                  >
                    Session Duration
                  </label>
                  <input
                    id="sessionDuration"
                    type="text"
                    placeholder="In Minutes"
                    name="duration"
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#0369a1]"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="registrationFee"
                  >
                    Registration Fee
                  </label>
                  <input
                    id="registrationFee"
                    type="text"
                    value="0"
                    name="fee"
                    readOnly
                    className="w-full px-3 py-2 border rounded-lg bg-gray-200"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="status"
                  >
                    Status
                  </label>
                  <input
                    id="status"
                    type="text"
                    name="status"
                    value="pending"
                    readOnly
                    className="w-full px-3 py-2 border rounded-lg bg-gray-200"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0c4a6e] text-white py-2 rounded-lg hover:bg-[#0369a1]"
            >
              Create Session
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

AddSession.propTypes = {
  handleCreateSession: PropTypes.func,
};
export default AddSession;
