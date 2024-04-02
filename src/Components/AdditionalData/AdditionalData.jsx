import PropTypes from "prop-types";
import LoadingPage from "@Components/LoadingPage/LoadingPage";

export default function AdditionalData({ additionalData, higherValue }) {
  return (
    <>
      {additionalData ? (
        additionalData?.totalDocuments === higherValue ? (
          <>
            <div className="w-full text-center mt-2 mb-2 text-gray-700">
              <b className="text-xs ">That's all we have</b>
            </div>
          </>
        ) : (
          <div className="h-8 w-full mt-2">
            <button
              type="button"
              className="flex w-full justify-center items-center"
              disabled
            >
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5   text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="black"
                  strokeWidth="2"
                ></circle>
                <path
                  className="opacity-75"
                  fill="white"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <b className="text-xs ml-2">
                Showing {higherValue} of {additionalData?.totalDocuments}
              </b>
            </button>
          </div>
        )
      ) : (
        <>
          <LoadingPage />
        </>
      )}
    </>
  );
}

AdditionalData.propTypes = {
  additionalData: PropTypes.object.isRequired,
  higherValue: PropTypes.number.isRequired,
};
