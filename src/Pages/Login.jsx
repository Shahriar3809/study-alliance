
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { FaGithub } from "react-icons/fa";



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
    <div>
      {/* <Helmet>
        <title>Bistro Boss | Login</title>
      </Helmet> */}
      <div className="bg-gray-100 p-3 w-5/6 md:h-10/12 mx-auto">
        <h1 className="text-5xl text-center pt-10 text-black font-bold">
          Login now!
        </h1>
        <div className="">
          <div className=" ">
            <div className="md:p-5">
              <form onSubmit={handleLogin} className="">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    className=" p-5 rounded-md text-gray-500"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className="p-5 rounded-md text-gray-500"
                    required
                  />
                  <label className="label">
                    <a
                      href="#"
                      className="label-text-alt text-black link link-hover"
                    >
                      Forgot password?
                    </a>
                  </label>
                </div>

                <div className="form-control mt-6">
                  <button className="btn  text-white bg-gray-500 font-bold text-xl">
                    Login
                  </button>
                </div>
              </form>

              <div className="w-full gap-3 md:mx-0 text-black mt-10 md:gap-0 justify-around mb-5">
                <button
                  onClick={handleGoogleLogin}
                  className="font-bold flex w-full justify-center gap-3 items-center border px-12 py-3 hover:bg-gray-600 hover:text-white rounded-md"
                >
                  Google Login
                </button>
                <button
                  onClick={handleGithubLogin}
                  className="btn bg-violet-500 text-white font-bold"
                >
                  <FaGithub className="text-xl" />
                  Github Login
                </button>
              </div>

              <div className="mt-6">
                <Link className="text-black text-xl " to="/register">
                  Do not have an account?{" "}
                  <span className="text-blue-500 font-bold underline">
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
