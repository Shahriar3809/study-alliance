

const Banner = () => {
  return (
    <div className="lg:h-[750px] w-full bg-[linear-gradient(to_top,rgba(00,00,00,0.2),rgba(00,00,00,0.5)),url('https://i.ibb.co/2KM2ZyM/rsz-1pexels-vlada-karpovich-4050302.jpg')] text-white bg-cover flex justify-center items-center p-5 ">
      <div className=" md:p-10 w-4/6 md:space-y-12 text-center m-auto">
        <h1 className="md:text-6xl text-3xl md:leading-loose  font-bold">
          Online Session Purchase or Selling Platform
        </h1>
        <p className="text-xl">
          Learn to create a platform for buying and selling sessions online,
          covering essential features like user registration, session listings,
          secure payments, and user reviews.
        </p>
      </div>
    </div>
  );
};



export default Banner;
