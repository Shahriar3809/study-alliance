import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://study-alliance-server.vercel.app",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
