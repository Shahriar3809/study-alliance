import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const CreateNote = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()

    const handleSubmitNote = async (event) => {
      event.preventDefault();
      const form = event.target;
      const noteTitle = form.noteTitle.value;
      const noteDetails = form.noteDetails.value;
      const noteData = { noteTitle, noteDetails, studentEmail: user?.email };
      const res = await axiosSecure.post("/save-note", noteData);
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Note Saved",
          showConfirmButton: false,
          timer: 1500,
        });
        form.reset()
      }
    };
    return (
      <div className="border-2 rounded-md shadow-lg border-sky-800 p-10">
        <h2 className="text-center font-semibold text-3xl underline mb-8">Create Your Personal Note Here:</h2>
        <form onSubmit={handleSubmitNote}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="sessionTitle"
            >
              Note Title
            </label>
            <input
              id="sessionTitle"
              type="text"
              name="noteTitle"
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#0369a1]"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="sessionDescription"
            >
              Note Details
            </label>
            <textarea
              id="sessionDescription"
              name="noteDetails"
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#0369a1]"
              rows="6"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="tutorEmail"
            >
              Your Email
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
          <button
            type="submit"
            className="w-full mt-5 bg-[#0c4a6e] text-white py-2 rounded-lg hover:bg-[#0369a1]"
          >
            Save Note
          </button>
        </form>
      </div>
    );
};

export default CreateNote;