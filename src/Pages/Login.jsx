
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";


const Login = () => {


  const { logIn, googleLogin, githubLogin } = useAuth();
  const navigate = useNavigate();
  // const location = useLocation();
  const axiosPublic = useAxiosPublic()

  const handleLogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    logIn(email, password)
      .then((res) => {
        // eslint-disable-next-line no-unused-vars
        const user = res.user;
        console.log(user)
         Swal.fire({
           position: "top-end",
           icon: "success",
           title: "Login Successful",
           showConfirmButton: false,
           timer: 1500,
         });
        //  const userInfo = {
        //    name: user?.displayName,
        //    email: user?.email,
        //  };
        // //  console.log(userInfo)
        //  axiosPublic.put("/user", userInfo).then((res) => {
        //    console.log(res?.data);
        //  });
        navigate(location.state?.from?.pathname || "/");
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Something went wrong!",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const handleGithubLogin = () => {
    githubLogin()
      .then((result) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });
       const userInfo = {
         name: result?.user?.displayName,
         email: result?.user?.email,
         role: "student",
       };
        //  console.log(userInfo)
        axiosPublic.put("/user", userInfo).then((res) => {
          console.log(res?.data);
        });
      })
      .catch((error) => {
        console.log(error.message);
        // toast.error("Something went wrong");
      });
  };



 const handleGoogleLogin = () => {
   googleLogin()
     .then((result) => {
       console.log(result);
       const userInfo = {
         name: result?.user?.displayName,
         email: result?.user?.email,
         role: 'student'
       };
       axiosPublic.put("/user", userInfo).then((res) => {
         console.log(res.data);
       });
       navigate(location?.state ? location.state : "/");
       Swal.fire({
         position: "top-end",
         icon: "success",
         title: "Login Successful",
         showConfirmButton: false,
         timer: 1500,
       });
     })
     .catch((error) => {
       console.log(error);
     });
 };

  return (
    <div className="bg-sky-950 p-3  md:px-96">
      {/* <Helmet>
        <title>Bistro Boss | Login</title>
      </Helmet> */}
      <div className="bg-sky-800 p-3 rounded-lg md:h-10/12 mx-auto">
        <h1 className="text-3xl md:text-5xl text-center pt-5 text-white font-bold">
          Please Login now!
        </h1>
        <p className="text-xl font-bold text-center text-white">
          <br />
          Sign Up Using
        </p>
        <div className=" flex gap-5  md:mx-0  mt-10  items-center justify-center mb-5">
          <button onClick={handleGoogleLogin} className="">
            <FcGoogle className="text-4xl md:text-5xl rounded-full bg-white md:p-2" />
          </button>
          <button onClick={handleGithubLogin} className="">
            <FaGithub className=" text-4xl md:text-5xl rounded-full bg-white md:p-2" />
          </button>
        </div>
        {/* <hr /> */}
        <p className="text-2xl text-center font-bold text-white ">Or</p>
        {/* <br /> */}
        <hr className="w-1/2 mx-auto" />

        <div className="">
          <div className=" ">
            <div className="md:p-5">
              <form onSubmit={handleLogin} className="">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-xl text-white">Enter Your Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Example: abc@gmail.com"
                    className=" p-5 text-xl rounded-md bg-sky-950 text-sky-50"
                    required
                  />
                </div>
                <br />
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-xl text-white ">
                      Enter Your Password
                    </span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className="p-5 text-xl rounded-md bg-sky-950 text-sky-50"
                    required
                  />
                  <label className="label">
                    <a
                      href="#"
                      className="label-text-xl text-white link link-hover"
                    >
                      Forgot password?
                    </a>
                  </label>
                </div>

                <div className="form-control mt-6">
                  <button className="border-2 border-white  rounded-sm  py-5 bg-sky-950 text-sky-50 font-bold text-xl">
                    Login
                  </button>
                </div>
              </form>
              <br />
              <br />
              <hr className="w-1/2 mx-auto" />
              <div className="mt-6 text-center ">
                <Link className="text-white text-2xl " to="/register">
                  Do not have an account?{" "}
                  <span className="text-blue-400 text-3xl font-bold underline">
                    Register
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

export default Login;
