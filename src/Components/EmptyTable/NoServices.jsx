import serviceImg from "@Images/service-img.jpg";
import PropTypes from "prop-types";

export default function NoServices({ title }) {
  return (
    <>
      <div className=" w-full max-w-full bg-white  rounded-lg ">
        <div
          className="flex flex-col items-center justify-center "
          style={{
            maxHeight: "34vh",
            minHeight: "34vh",
          }}
        >
          <img
            className=" h-fit rounded-full"
            width={"230px"}
            src={serviceImg}
            alt=""
          />
          <h5 className="text-md uppercase font-bold text-gray-700 ">
            {title}
          </h5>
        </div>
      </div>
    </>
  );
}

NoServices.propTypes = {
  title: PropTypes.string.isRequired,
};
