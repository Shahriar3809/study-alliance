import axios from "axios";
// import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});
const useAxiosSecure = () => {
//   const { logOut } = useAuth();

  // Req
//   axiosSecure.interceptors.request.use(
//     function (config) {
//       // console.log("Req stopped by interceptor")
//       const token = localStorage.getItem("access-token");
//       config.headers.authorization = `Bearer ${token}`;
//       return config;
//     },
//     function (error) {
//       console.log(error);
//     }
//   );

  // Res
//   axiosSecure.interceptors.response.use(
//     function (res) {
//       return res;
//     },
//     async (error) => {
//       // console.log("Status Error", error)
//       if (error.response.status === 401 || error.response.status === 403) {
//         await logOut();
//       }
//       return Promise.reject(error);
//     }
//   );
  return axiosSecure;
};

export default useAxiosSecure;
