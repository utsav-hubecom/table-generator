import ImgLogo from "@Images/404-Image.jpg";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function NoPage() {
  return (
    <>
      <div className=" w-full max-w-full bg-white   rounded-lg    px-4 py-2">
        <div className="flex flex-col items-center justify-center pb-10">
          <img
            className=" h-fit rounded-full"
            width={"420px"}
            src={ImgLogo}
            alt=""
          />
          <div>
            <h1 className="mb-3 mt-3 font-bold text-center text-gray-800 ">
              Page not found
            </h1>
            <h5 className="text-gray-600">
              Sorry, we couldn’t find the page you’re looking for.
            </h5>
            <a href="/" className="flex gap-2 font-bold justify-center mt-7">
              <span className="text-indigo-600">
                <FontAwesomeIcon icon={faArrowLeft} />
              </span>
              <span className="text-indigo-600">Back to home</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
