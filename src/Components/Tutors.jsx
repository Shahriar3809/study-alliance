import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
// import TutorDisplayCard from "./TutorDisplayCard";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";



// import required modules
import { FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";


const Tutors = () => {
    const axiosSecure = useAxiosSecure()
  
  const { data=[] } = useQuery({
    queryKey: ["allTutors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tutors");
      return res.data;
    },
  });

// console.log(data)

    return (
      <div>
        <h2 className="text-5xl mt-20 font-bold text-center text-sky-950">Our Tutors</h2>
        <hr className="w-1/2 mx-auto mt-5 border-2 border-sky-950" />
        <p className="text-xl mb-10 font-semibold text-center py-5">Here, You can see our all experienced tutors</p>
        

        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          {data.map((item) => (
            <SwiperSlide key={item._id}>
              <div>
                <div className="w-full relative min-h-[350px] overflow-hidden bg-sky-900 rounded-lg shadow-lg ">
                  <img
                    src="https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg"
                    className="object-cover w-full h-56"
                    alt=""
                  />
                  <p className="absolute bg-black text-white px-4 py-2 rounded-md font-bold uppercase top-5 right-5">Tutor</p>
                  <div className="py-5 text-center">
                    <a
                      href="#"
                      className="block text-2xl mb-5 font-bold text-gray-800 dark:text-white"
                      role="link"
                    >
                      {item.name}
                    </a>
                    <span className="text-xl text-gray-700 dark:text-gray-200">
                      Email: {item.email}
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
};

export default Tutors;

