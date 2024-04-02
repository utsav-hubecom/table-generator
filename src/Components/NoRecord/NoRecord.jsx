import ImgLogo from "@Images/no-changes.jpg";
export default function NoRecord() {
  return (
    <>
      <div className="absolute w-full max-w-full bg-white   rounded-lg    px-4 py-2">
        <div
          className="flex flex-col items-center justify-center pb-10"
          style={{ minHeight: "50vh" }}
        >
          <img
            className=" h-fit rounded-full"
            width={"300px"}
            src={ImgLogo}
            alt=""
          />
          <h5 className="mb-3 mt-3 text-xl uppercase font-bold text-gray-700 ">
            Currently there is no records
          </h5>
        </div>
      </div>
    </>
  );
}
