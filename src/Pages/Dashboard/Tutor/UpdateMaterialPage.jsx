import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const UpdateMaterialPage = () => {
    const {id} = useParams()
const axiosSecure = useAxiosSecure();

const { data: materialData = [] } = useQuery({
  queryKey: ["myApprovedSession"],
  queryFn: async () => {
    const res = await axiosSecure.get(`/tutor/get-materials/${id}`);
    return res.data;
  },
});

const { link, materialsTitle } = materialData; 

const axiosPublic = useAxiosPublic()


const handleUpdateMaterial = async (e) => {
  // console.log("clicked")
  e.preventDefault()

   const form = e.target;
    const imageFile = { image: form.elements["image"].files[0] };

    // Show loading alert
    const loadingAlert = Swal.fire({
      title: "Updating Materials",
      html: "Please wait while the materials are being updated...",
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false, // Prevent closing alert by clicking outside
      showConfirmButton: false, // Hide confirm button
    });

    try {
      const { data } = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        // const email = form.email.value;
        // const sessionId = form.sessionId.value;
        const link = form.link.value;
        const materialsTitle = form.materialsTitle.value;
        const image = data.data.display_url;
        const updatedData = {  link, materialsTitle, image };
        console.log(updatedData)
        const result = await axiosSecure.patch(
          `/tutor/update-materials/${id}`,
          updatedData
        );
        console.log(result.data)
        if (result.data.modifiedCount > 0) {
          loadingAlert.close(); // Close loading alert
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Materials Updating Successful",
            showConfirmButton: false,
            timer: 1500,
          });
          form.reset();
        }
      }
    } catch (error) {
      // Handle error if any
      console.error(error);
      loadingAlert.close(); // Close loading alert
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again later.",
      });
    }

}

    return (
      <div>
        <section className=" p-6  mx-auto rounded-md shadow-md bg-[#083344]">
          <h2 className=" text-4xl font-semibold text-center underline text-white capitalize dark:text-white">
            Update Materials:
          </h2>

          <form onSubmit={handleUpdateMaterial}>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label className="text-sky-700 dark:text-sky-200">Title</label>
                <input
                  type="text"
                  name="materialsTitle"
                  defaultValue={materialsTitle}
                  className="block w-full px-4 py-2 mt-2 text-sky-700 bg-white border border-sky-200 rounded-md dark:bg-sky-800 dark:text-gray-100  dark:border-sky-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>

              <div>
                <label className="text-sky-700 dark:text-sky-200">
                  Link (Google Drive)
                </label>
                <input
                  placeholder="Please, provide your materials link"
                  type="text"
                  name="link"
                  defaultValue={link}
                  className="block w-full px-4 py-2 mt-2 text-gray-100 bg-white border border-sky-200 rounded-md dark:bg-sky-800 dark:text-gray-100 dark:border-sky-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label className="text-sky-700 dark:text-sky-200">
                  Image Upload (Multiple Allowed)
                </label>
                <input
                  type="file"
                  multiple
                  name="image"
                  required
                  className="file-input block w-full px-4 py-2 mt-2 text-sky-700 bg-white border border-sky-200 rounded-md dark:bg-sky-800 dark:text-gray-100 dark:border-sky-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-sky-700 rounded-md hover:bg-sky-600 focus:outline-none focus:bg-sky-600"
              >
                Upload
              </button>
            </div>
          </form>
        </section>
      </div>
    );
};

export default UpdateMaterialPage;




  // const handleUploadMaterials = async (e) => {
  //   e.preventDefault();
   
  // };