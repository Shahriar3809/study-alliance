import PropTypes from "prop-types";

const MaterialsCardForStudent = ({ item }) => {
  const { image, link, materialsTitle } = item;

  const handleClick = () => {
    // You can add any additional actions here before redirecting
    // For example, logging analytics events
    console.log("Link clicked:", link);
  };

  const handleDownload = (url, filename) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
      .catch(() => alert("An error occurred while downloading the image."));
  };

  return (
    <div>
      <div className="flex flex-col overflow-hidden border-2 bg-[#074a65] rounded-lg shadow-2xl">
        <div className="w-full h-[350px] relative">
          <img src={image} alt="" className="w-full h-full" />
          <p className="top-5 right-5 absolute">
            <button
              onClick={() => handleDownload(image, "downloaded-image-study-alliance.jpg")}
              className="mt-4 px-4 py-2 bg-sky-900 text-white font-bold rounded hover:bg-blue-700"
            >
              Download Image
            </button>
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
  item: PropTypes.object.isRequired,
};

export default MaterialsCardForStudent;
