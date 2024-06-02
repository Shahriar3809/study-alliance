

const AddSession = () => {
    return (
      <div>
        <div className="mx-auto bg-gray-200 shadow-lg rounded-lg overflow-hidden mt-6">
          <div className="px-6 py-4">
            <h2 className="md:text-4xl text-center pb-3 uppercase text-[#0c4a6e] font-bold mb-4">
              Create Study Session
            </h2>
            <div className="flex gap-8">
              {/* 1 */}
              <div className="w-1/2">
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
                    value={"Hello"}
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
                    value={"Email"}
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
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#0369a1]"
                  />
                </div>
              </div>

              {/* 2 */}
              <div className="w-1/2">
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
                    value="pending"
                    readOnly
                    className="w-full px-3 py-2 border rounded-lg bg-gray-200"
                  />
                </div>
              </div>
            </div>

            <button className="w-full bg-[#0c4a6e] text-white py-2 rounded-lg hover:bg-[#0369a1]">
              Create Session
            </button>
          </div>
        </div>
      </div>
    );
};

export default AddSession;