import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const UploadMaterialsForm = () => {
    const {user} = useAuth()
    const {id} = useParams()
    const axiosPublic = useAxiosPublic()
    // console.log(id) 
    const axiosSecure = useAxiosSecure()
    const {data} = useQuery({
        queryKey: ['uploadMaterials'],
        queryFn: async()=> {
            const {data} = await axiosSecure.get(`/singleSession/${id}`)
            return data;
        }
    })


  const handleUploadMaterials = async (e) => {
    e.preventDefault();
    const form = e.target;
    const imageFile = { image: form.elements["image"].files[0] };

    // Show loading alert
    const loadingAlert = Swal.fire({
      title: "Uploading Materials",
      html: "Please wait while the materials are being uploaded...",
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
        const email = form.email.value;
        const sessionId = form.sessionId.value;
        const link = form.link.value;
        const materialsTitle = form.materialsTitle.value;
        const image = data.data.display_url;
        const materialsData = { email, sessionId, link, materialsTitle, image };

        const result = await axiosSecure.post(
          "/tutor/upload-materials",
          materialsData
        );

        if (result.data.insertedId) {
          loadingAlert.close(); // Close loading alert
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Materials Uploading Successful",
            showConfirmButton: false,
            timer: 1500,
          });
          form.reset()
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
  };

    // console.log(data)
    return (
      <section className=" p-6 mx-auto rounded-md shadow-md bg-[#083344]">
        <h2 className="text-lg font-semibold text-center underline text-white capitalize dark:text-white">
          Upload Materials:
        </h2>

        <form onSubmit={handleUploadMaterials}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-sky-700 dark:text-sky-200">Title</label>
              <input
                type="text"
                name="materialsTitle"
                defaultValue={data?.title}
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
            <div>
              <label className="text-sky-700 dark:text-sky-200">
                Email Address
              </label>
              <input
                type="text"
                readOnly
                name="email"
                value={user?.email}
                className="block w-full px-4 py-2 mt-2 text-sky-700 bg-white border border-sky-200 rounded-md dark:bg-sky-800 dark:text-gray-100 dark:border-sky-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
          </div>

          <div>
            <label className="text-sky-700 dark:text-sky-200">Session ID</label>
            <input
              type="text"
              value={id}
              name="sessionId"
              readOnly
              className="block w-full px-4 py-2 mt-2 text-sky-700 bg-white border border-sky-200 rounded-md dark:bg-sky-800 dark:text-gray-100  dark:border-sky-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            />
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
    );
};

export default UploadMaterialsForm;


 {/* <input id="passwordConfirmation" type="password" className=""></input> */}