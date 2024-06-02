import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="md:h-[650px] w-full bg-[linear-gradient(to_top,rgba(00,00,00,0.2),rgba(00,00,00,0.5)),url('https://i.ibb.co/2KM2ZyM/rsz-1pexels-vlada-karpovich-4050302.jpg')] text-white bg-cover rounded-lg flex justify-center items-center p-5 bg-black">
      <div className=" p-10 w-4/6 space-y-12 text-center m-auto">
        <h1 className="md:text-6xl text-3xl leading-loose  font-bold">
          Online Course Can You Purchase or Sell
        </h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam dolores
          eum unde ullam qui praesentium quia vero, odio quo ad!
        </p>
        <Link
          to="/listedBooks"
          className="btn w-32 bg-[#164e63] border-none text-white"
        >
          {" "}
          View The List
        </Link>
      </div>
    </div>
  );
};



export default Banner;
