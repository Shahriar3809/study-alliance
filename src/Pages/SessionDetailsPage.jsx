import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { differenceInCalendarDays } from "date-fns";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import useAdmin from "../Hooks/useAdmin";
import useTutor from "../Hooks/useTutor";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import ReactStarsRating from "react-awesome-stars-rating";

const SessionDetailsPage = () => {
const {id} = useParams();
const {user} = useAuth()
const axiosSecure = useAxiosSecure()
const axiosPublic = useAxiosPublic()
const { data: sessionDetails = [], isLoading } = useQuery({
  queryKey: ["sessionDetails"],
  queryFn: async () => {
    const res = await axiosPublic.get(`/session-details/${id}`);
    return res.data;
  },
});

const {isAdmin} = useAdmin();
const {isTutor} = useTutor()

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


 const endDateObject = new Date(endDate);
 const today = new Date();
 const difference = differenceInCalendarDays(endDateObject, today);




 const handleBookedFreeSession = async() => {
  const detailsOfSession = {
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
    sessionId: sessionId ,
  };
  // console.log("Tor jonno free eta", sessionId, user?.email);
  const purchaseData = {...detailsOfSession, studentEmail: user?.email}
  // console.log(purchaseData)
  const res = await axiosPublic.post("/booked-session", purchaseData)
  if(res.data.insertedId) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Session Booking Successful",
        showConfirmButton: false,
        timer: 1500,
      });
  }
  if(res.data.exist) {
     Swal.fire({
       position: "top-end",
       icon: "warning",
       title: "You Already Booked This Session",
       showConfirmButton: false,
       timer: 1500,
     });
  }
 }






 const { data=[] } = useQuery({
   queryKey: ["myRating"],
   enabled: !isLoading,
   queryFn: async () => {
     const { data } = await axiosSecure.get(`/review/${sessionId}`);
     return data;
   },
 });

 console.log(data);

 const sum = data?.reduce((accumulator, currentItem) => {
   return accumulator + currentItem.rating;
 }, 0);
//  console.log();



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
            <p className="text-xl flex items-center gap-5 justify-center text-center">
              <span className="text-3xl mt-5">Average Rating: </span>
              <ReactStarsRating
                className="flex gap-1 mt-5"
                size={40}
                value={sum / data?.length}
              />
            </p>
            <div className="flex items-center p-3 justify-between">
              <span className="text-base font-bold text-green-700 bg-white  rounded-lg px-3 py-2 ">
                Session Duration:{" "}
                <span className="text-gray-900">{duration} hours</span>
              </span>
              <p>
                {" "}
                <span className="mr-3 ">Want to Book this session?</span>
                {difference >= 0 ? (
                  <>
                    {fee > 0 ? (
                      <Link
                        to={
                          isAdmin || isTutor
                            ? null
                            : `/book-session/payment/${sessionId}`
                        }
                        className={`px-5 py-4 text-xl mt-5 font-bold text-gray-100 transition-colors duration-300 transform rounded ${
                          isAdmin || isTutor
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-[#11c811] hover:bg-[#0f9d0f] active:bg-[#0d7e0d]"
                        }`}
                        role="button"
                      >
                        Book Now
                      </Link>
                    ) : (
                      <button
                        className="px-5 py-4 text-xl mt-5 font-bold text-gray-100 transition-colors hover:bg-green-600 duration-300 transform bg-[#11c811] rounded"
                        role="button"
                        disabled={
                          isAdmin === true || isTutor === true ? true : false
                        }
                        onClick={handleBookedFreeSession}
                      >
                        Book Now
                      </button>
                    )}
                  </>
                ) : (
                  <button
                    className="px-5 py-4 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-[#ef9a22] rounded"
                    role="button"
                    disabled
                  >
                    Closed
                  </button>
                )}
              </p>
            </div>
            <br />
            <hr />
            <br />
            <div>
              <p className="text-2xl bg-slate-500 px-5 mb-3 text-center font-bold rounded-sm">
                Here is all review of this session:
              </p>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                {data.map((item) => (
                  <p key={item._id}>
                    <p className="">
                      Student Name:{" "}
                      <span className="font-bold text-sky-400 text-xl">
                        {item?.studentName}
                      </span>
                    </p>
                    <p>
                      Email: <span className="text-sky-400">{item?.email}</span>
                    </p>
                    <p>Review: {item?.reviewText}</p>
                    <ReactStarsRating
                      className="flex gap-1 mt-2"
                      size={20}
                      value={item?.rating}
                    />
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default SessionDetailsPage;