import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <section className="bg-[#082f49]">
        <div className=" flex items-center min-h-screen py-12 mx-auto">
          <div className="flex flex-col items-center max-w-sm mx-auto text-center">
            <p className="p-3 text-sm font-medium text-white rounded-full bg-blue-50 dark:bg-[#051b29]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </p>
            <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-5xl">
              Page not found
            </h1>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              The page you are looking for does not exist.
            </p>

            <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
              <Link
                to="/"
                className="w-1/2 mx-auto px-8 font-bold text-xl py-5  tracking-wide text-white transition-colors duration-200 bg-[#195881] rounded-lg shrink-0 sm:w-auto hover:bg-[#122e41] "
              >
                Take me home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ErrorPage;
