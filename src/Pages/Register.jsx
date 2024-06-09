
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";
import useAxiosPublic from "../Hooks/useAxiosPublic";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const { 
    createUser, 
     } = useAuth()
  const navigate = useNavigate();

const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [show, setShow] = useState(true);





  const onSubmit = async (eventData) => {
    // const form = eventData.target;
    const imageFile = { image: eventData.image[0] };
    console.log(imageFile)
    // Show loading alert
    const loadingAlert = Swal.fire({
      title: "Uploading Photo",
      html: "Please wait while the Profile Photo being uploaded...",
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false, // Prevent closing alert by clicking outside
      showConfirmButton: false, // Hide confirm button
    });


    try{

      const { data } = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if(data.success) {
        const photoURL = data.data.display_url;
         const { email, name, role, password } = eventData;
         createUser(email, password)
           .then((result) => {
             console.log(role);
            console.log(result)
             // Update Profile while registration
             const updatedUser = result.user;
             updateProfile(updatedUser, {
               displayName: name,
               photoURL: photoURL,
             })
               .then((res) => {
                 Swal.fire({
                   position: "top-end",
                   icon: "success",
                   title: "Sign Up Successful",
                   showConfirmButton: false,
                   timer: 1500,
                 });

                 const userInfo = {
                   name: eventData.name,
                   email: eventData.email,
                   role: eventData.role,
                   profilePhoto: photoURL,
                 };
                 axiosPublic.put("/user", userInfo).then((res) => {
                   console.log(res.data);
                 });

                 navigate("/");
                 console.log(res, "Successfully Update");
               })
               .catch((err) => {
                 console.log(err);
               });
           })
           .catch((err) => {
             Swal.fire({
               position: "top-end",
               icon: "error",
               title: "Sign Up Failed",
               showConfirmButton: false,
               timer: 1500,
             });
             console.log(err);
           });

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




 
console.log(useAuth())
  return (
    <div className="bg-sky-950 p-5  md:p-20">
      {/* <Helmet>
        <title>Bistro Boss | Register</title>
      </Helmet> */}
      <div className="bg-sky-800 p-3 rounded-lg md:h-10/12 mx-auto">
        <h1 className="text-5xl text-center pt-10 text-white font-bold">
          Please Register now!
        </h1>
        <div className=" ">
          <div className="">
            <div className="  md:p-10 text-white ">
              <form onSubmit={handleSubmit(onSubmit)} className="">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-xl text-white">Enter Your Full Name</span>
                  </label>
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    placeholder="Name"
                    className="p-5 text-xl rounded-md bg-sky-950 text-sky-50"
                  />
                  {errors.name && (
                    <span className="text-red-500">Name is required.</span>
                  )}
                  <br />
                  <label className="label-text text-xl text-white">
                    Upload Profile Image
                  </label>
                  <input
                    type="file"
                    {...register("image", { required: true })}
                    name="image"
                    required
                    className="file-input block w-full px-5 py-2 mt-2  bg-sky-950 text-sky-50 border border-white rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 "
                  />
                  {errors.image && (
                    <span className="text-red-500">Photo is required.</span>
                  )}
                  <br />
                  <label className="label">
                    <span className="label-text text-xl text-white">
                      Select Your Role Here
                    </span>
                  </label>
                  <select
                    defaultValue={"Default"}
                    {...register("role", { required: true })}
                    className="select select-bordered bg-sky-950 text-sky-50 text-xl  "
                  >
                    <option disabled value="Default">
                      Select a Category?
                    </option>
                    <option value="student">Student</option>
                    <option value="tutor">Tutor</option>
                    <option value="admin">Admin</option>
                  </select>
                  {errors.role && (
                    <span className="text-red-500">Category is Required</span>
                  )}
                  <br />
                  <label className="label">
                    <span className="label-text text-xl text-white">Enter Your Email</span>
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: true,
                    })}
                    placeholder="Email"
                    className="p-5 text-xl rounded-md bg-sky-950 text-sky-50"
                  />
                  {errors.email && (
                    <span className="text-red-500">Email is required.</span>
                  )}
                  <br />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-xl text-white">
                     Enter a Password
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      {...register("password", {
                        required: true,
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{6,}$/,
                          message:
                            "Password must be in one uppercase, one lowercase letters and at least 6 character",
                        },
                      })}
                      type={show ? "password" : "text"}
                      name="password"
                      placeholder="password"
                      className=" input-bordered w-full p-5 text-xl rounded-md bg-sky-950 text-sky-50"
                    />
                    <div
                      onClick={() => {
                        setShow(!show);
                      }}
                      className="absolute text-white right-3 top-6 text-xl"
                    >
                      {show ? <FaRegEye /> : <FaRegEyeSlash />}
                    </div>
                  </div>

                  {errors.password && (
                    <span className="text-red-500">
                      {errors.password.message}
                    </span>
                  )}

                  <label className="label">
                    <a href="#" className="llabel-text text-xl text-white">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="rounded-sm border-2 border-white  py-5 bg-sky-950 text-sky-50 font-bold text-xl">
                    Register
                  </button>
                </div>
              </form>

              <div className=" w-full md:mx-0 text-black mt-10 md:gap-0 justify-around mb-5"></div>

              <div className="mt-6 text-center">
                <Link className="text-white text-2xl" to="/login">
                  Already have an account?{" "}
                  <span className="text-blue-400 text-3xl font-bold underline">
                    Login
                  </span>{" "}
                  Here.
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;





