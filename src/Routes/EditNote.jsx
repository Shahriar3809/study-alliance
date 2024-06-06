import { useParams } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";


const EditNote = () => {
    const {id} = useParams()
    const axiosSecure = useAxiosSecure()
  const { data, refetch } = useQuery({
  queryKey: ["noteData"],
  queryFn: async () => {
    const { data } = await axiosSecure.get(`/get-note-data/${id}`);
    return data;
  },
});

console.log(data)



    const handleEditNote = async (event) => {
        event.preventDefault();
      const form = event.target;
      const noteTitle = form.noteTitle.value;
      const noteDetails = form.noteDetails.value;

      const noteData = { noteTitle, noteDetails};


      console.log(noteData)

      const res = await axiosSecure.put(`/edit-note/${id}`, noteData);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Note Updated",
          showConfirmButton: false,
          timer: 1500,
        });
        // form.reset()
        refetch()
      }
    }

    return (
      <div>
        <div className="border-2 bg-gray-100 rounded-md shadow-lg border-sky-800 p-10">
          <h2 className="text-center font-semibold text-3xl underline mb-8">
            Create Your Personal Note Here:
          </h2>
          <form onSubmit={handleEditNote}>
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
                defaultValue={data?.noteTitle}
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
                defaultValue={data?.noteDetails}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#0369a1]"
                rows="6"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full mt-5 bg-[#0c4a6e] text-white py-2 rounded-lg hover:bg-[#0369a1]"
            >
              Save Note
            </button>
          </form>
        </div>
      </div>
    );
};

export default EditNote;