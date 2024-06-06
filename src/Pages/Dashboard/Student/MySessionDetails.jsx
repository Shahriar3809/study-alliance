import { useParams } from "react-router-dom";
// import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ReactStarsRating from "react-awesome-stars-rating";
import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";


const MySessionDetails = () => {
   const {id} = useParams();
   const [ratingValue, setRatingValue] = useState(null);
  //  console.log(id)
const {user} = useAuth()
const axiosPublic = useAxiosPublic()
const axiosSecure = useAxiosSecure();
const { data: sessionDetails = [],  } = useQuery({
  queryKey: ["sessionDetails"],
  queryFn: async () => {
    const res = await axiosPublic.get(`/session-details/${id}`);
    return res.data;
  },
});

const {
  title,
  tutorName,
  tutorEmail,
  description,
  startDate,
  endDate,
  classStartDate,
  classEndDate,
  duration,
  fee,
  _id: sessionId,
  // status,
} = sessionDetails;
console.log(sessionDetails)



const onChange = (value) => {
  console.log(`React Stars Rating value is ${value}`);
  setRatingValue(value)
const ratingsData = { email: user?.email, sessionId, rating: value };
  axiosSecure.put(`save-ratings/${sessionId}`, ratingsData)
  .then(res=> {
    if(res.data.upsertedCount > 0) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your review has been recorded",
        showConfirmButton: false,
        timer: 1500,
      });
    } else if(res.data.modifiedCount > 0) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Rating Updated",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  })
};




    return (
      <div className="p-2">
        <div className=" min-h-[550px]  mx-auto">
          <div className=" text-white  space-y-5 p-20 bg-[#083344] rounded-lg shadow-md ">
            <div className="mt-2 space-y-4">
              <p className="text-6xl font-bold">{title}</p>
              <p className="text-xl text-gray-200">{description}</p>
            </div>
            <div className="flex justify-between text-gray-800 py-3 text-xl">
              <div className="space-y-2 font-semibold">
                <p className="py-2 px-5 rounded-md bg-[#a99ad0]">
                  {" "}
                  Reg Start date: {startDate}
                </p>
                <p className="py-2 px-5 rounded-md  bg-[#edce1b]">
                  {" "}
                  Reg End date: {endDate}
                </p>
              </div>
              <p className="text-2xl text-white flex items-center justify-center bg-[#1d6884] px-8 font-bold rounded-full text-center">
                {" "}
                Fee: $ {fee}
              </p>
              <div className="space-y-2 font-semibold text-white">
                <p className="py-2 px-5 rounded-md   bg-[#129726]">
                  {" "}
                  Class Start date: {classStartDate}
                </p>
                <p className="py-2 px-5 rounded-md   bg-[#7a680c]">
                  {" "}
                  Class End date: {classEndDate}
                </p>
              </div>
            </div>

            <div className=" mt-5">
              <div className="">
                <h2 className="text-center text-2xl bg-blue-800 font-bold rounded-t-2xl py-2">
                  Tutor:{" "}
                </h2>
                <div className="flex justify-between py-5">
                  <p className="text-xl">
                    Tutor Name:
                    <span className="text-gray-300 font-bold mx-2">
                      {tutorName}
                    </span>
                  </p>
                  <p className="text-xl">
                    Tutor Email:{" "}
                    <span className="text-gray-300 font-bold mx-2">
                      {tutorEmail}
                    </span>
                  </p>
                </div>
                <hr />
                <br />
              </div>
            </div>
            <p className="text-xl text-center">Average Review: 4</p>
            <div className="flex items-center p-3 justify-between">
              <span className="text-base font-bold text-green-700 bg-white  rounded-lg px-3 py-2 ">
                Session Duration:{" "}
                <span className="text-gray-900">{duration} hours</span>
              </span>
              <div>
                <p className="text-3xl">
                  Give Us a review:
                  <ReactStarsRating className="flex gap-1 mt-5"  size={40} onChange={onChange} value={ratingValue} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default MySessionDetails;


