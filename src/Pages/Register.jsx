
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";
import useAxiosPublic from "../Hooks/useAxiosPublic";


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


  const onSubmit = (data) => {
    const { email, name, role, password } = data;
    createUser(email, password)
      .then((result) => {
        console.log(role)
        
        // Update Profile while registration
        const updatedUser = result.user;
        updateProfile(updatedUser, {
          displayName: name,
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
              name: data.name,
              email: data.email,
              role: data.role,
            };
            axiosPublic.put("/user", userInfo).then((res) => {
              console.log(res.data);
            });
            
            navigate('/')
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
  };

 
console.log(useAuth())
  return (
    <>
      {/* <Helmet>
        <title>Bistro Boss | Register</title>
      </Helmet> */}
      <div className="bg-gray-100 p-3 w-5/6 md:h-10/12 mx-auto">
        <h1 className="text-5xl text-center pt-10 text-black font-bold">
          Register now!
        </h1>
        <div className=" ">
          <div className="">
            <div className="  md:p-10 text-white ">
              <form onSubmit={handleSubmit(onSubmit)} className="">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black">Name</span>
                  </label>
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    placeholder="Name"
                    className="p-5 text-gray-400 rounded-md"
                  />

                  {errors.name && (
                    <span className="text-red-500">Name is required.</span>
                  )}

                  <label className="label">
                    <span className="label-text text-black">Select Your Role Here</span>
                  </label>
                  <select
                    defaultValue={"Default"}
                    {...register("role", { required: true })}
                    className="select select-bordered text-black w-full "
                  >
                    <option disabled value="Default">
                      Select a Category?
                    </option>
                    <option value="student">Student</option>
                    <option value="tutor">Tutor</option>
                    <option value="admin">Admin</option>
               
                  </select>

                  {errors.photo && (
                    <span className="text-red-500">Photo URL is required.</span>
                  )}

                  <label className="label">
                    <span className="label-text text-black">Email</span>
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: true,
                    })}
                    placeholder="Email"
                    className=" p-5 text-gray-500 rounded-md"
                  />
                  {errors.email && (
                    <span className="text-red-500">Email is required.</span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black">Password</span>
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
                      className="input text-gray-500 k input-bordered w-full"
                    />
                    <div
                      onClick={() => {
                        setShow(!show);
                      }}
                      className="absolute text-black right-3 top-4 text-xl"
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
                    <a href="#" className="label-text-alt  link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn  text-white bg-gray-700 font-bold text-xl">
                    Register
                  </button>
                </div>
              </form>

              <div className=" w-full md:mx-0 text-black mt-10 md:gap-0 justify-around mb-5">
                
              </div>

              <div className="mt-6">
                <Link className="text-black text-xl " to="/login">
                  Already have an account?{" "}
                  <span className="text-blue-500 font-bold underline">
                    Login
                  </span>{" "}
                  Here.
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
