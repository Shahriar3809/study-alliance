import PropTypes from "prop-types";

const MaterialsCardForStudent = ({ item }) => {
  const { image, link, materialsTitle } = item;

   const handleClick = () => {
     // You can add any additional actions here before redirecting
     // For example, logging analytics events
     console.log("Link clicked:", link);
   };


  return (
    <div>
      <div className="flex flex-col overflow-hidden border-2 bg-[#074a65] rounded-lg  shadow-2xl">
        <div className="w-full h-[350px] relative">
          <img src={image} alt="" className="w-full h-full" />
          <p className="text-white bg-[#082f49] border-white border-y-4 border-l-4 text-xl absolute top-5 right-0 py-3 pl-4 pr-2 rounded-l-full font-bold">
            Material Banner
          </p>
        </div>

        <div className="w-full p-4 md:p-4 space-y-2">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            {materialsTitle}
          </h1>
          <br />
          <h1 className="text-lg font-bold text-gray-700 dark:text-gray-200 md:text-xl">
            <p className="">
              See the link to see Materials: <br />
              <a
                href={link}
                onClick={handleClick}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-sm hover:text-green-500 text-gray-100"
              >
                {link}
              </a>
            </p>
          </h1>
        </div>
      </div>
    </div>
  );
};
MaterialsCardForStudent.propTypes = {
  item: PropTypes.object,
//   refetch: PropTypes.any,
};
export default MaterialsCardForStudent;
