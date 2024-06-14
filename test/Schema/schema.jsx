export let PatientSchema = {
  srNo: {
    headerLabel: "SR#",
    headerReflact: (value) => {
      return (
        <div>
          <p>{value}</p>
        </div>
      );
    },
    headerUtils: {
      class: "   font-semibold  ",
    },
    dataValueReflact: (dataValue, row) => {
      return (
        <div>
          <p>{dataValue}</p>
        </div>
      );
    },
    dataUtils: {
      class: "px-3 py-2.5  font-semibold",
    },
  },
  Image: {
    headerLabel: "	IMAGES",
    headerReflact: (value) => {
      return (
        <div>
          <p>{value}</p>
        </div>
      );
    },
    headerUtils: {
      class: "min-w-[4rem]  font-semibold  ",
    },
    dataValueReflact: (dataValue, row) => {
      return <div className="w-8 m-auto"></div>;
    },
    dataUtils: {
      class: "px-3 py-2.5  font-medium capitalize whitespace-nowrap",
    },
  },
  firstName: {
    headerLabel: "NAME",
    headerReflact: (value) => {
      return (
        <div>
          <p>{value}</p>
        </div>
      );
    },
    headerUtils: {
      class: "min-w-[4rem]  font-semibold  ",
    },
    filterReflact: (setFilterValue) => {
      return (
        <>
          <div className="relative mt-2 w-fit m-auto flex flex-grow items-stretch focus-within:z-10 ">
            <input
              type="text"
              name="masterNo"
              className="block w-full py-0.5 bg-white text-center rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-200 focus:outline-0 sm:text-sm sm:leading-6"
              placeholder="SEARCH"
              style={{ fontSize: "11px" }}
            />
          </div>
        </>
      );
    },
    dataValueReflact: (dataValue, row) => {
      return <div className="pl-1"></div>;
    },
    dataUtils: {
      class: "px-3 py-2.5  font-medium capitalize whitespace-nowrap",
    },
  },
  phoneNo: {
    headerLabel: "PHONE",
    headerReflact: (value) => {
      return (
        <div>
          <p>{value}</p>
        </div>
      );
    },
    headerUtils: {
      class: "min-w-[4rem]  font-semibold  ",
    },
    filterReflact: (setFilterValue) => {
      return (
        <>
          <div className="relative mt-2 w-fit m-auto flex flex-grow items-stretch focus-within:z-10 ">
            <input
              type="text"
              name="masterNo"
              className="block w-full py-0.5 bg-white text-center rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-200 focus:outline-0 sm:text-sm sm:leading-6"
              placeholder="SEARCH"
              style={{ fontSize: "11px" }}
            />
          </div>
        </>
      );
    },
    dataValueReflact: (dataValue, row) => {
      return (
        <div>
          <p className="text-center"> {dataValue}</p>
        </div>
      );
    },
    dataUtils: {
      class: "px-3 py-2.5  font-medium capitalize whitespace-nowrap",
    },
  },
  reference: {
    headerLabel: "REFERENCE",
    headerReflact: (value) => {
      return (
        <div>
          <p>{value}</p>
        </div>
      );
    },
    headerUtils: {
      class: "min-w-[4rem]  font-semibold  ",
    },
    filterReflact: (setFilterValue) => {
      return (
        <>
          <div className="relative mt-2 w-fit m-auto flex flex-grow items-stretch focus-within:z-10 ">
            <input
              type="text"
              name="masterNo"
              className="block w-full py-0.5 bg-white text-center rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-200 focus:outline-0 sm:text-sm sm:leading-6"
              placeholder="SEARCH"
              style={{ fontSize: "11px" }}
            />
          </div>
        </>
      );
    },
    dataValueReflact: (dataValue, row) => {
      return (
        <div className="m-auto">
          <p className=""> {dataValue}</p>
        </div>
      );
    },
    dataUtils: {
      class: "px-3 py-2.5  font-medium capitalize whitespace-nowrap",
    },
  },
  status: {
    headerLabel: "STATUS",
    headerReflact: (value) => {
      return (
        <div>
          <p>{value}</p>
        </div>
      );
    },
    headerUtils: {
      class: "min-w-[4rem]  font-semibold  ",
    },
    filterReflact: (setFilterValue) => {
      return (
        <>
          <div className="relative mt-2 w-fit m-auto flex flex-grow items-stretch focus-within:z-10 ">
            <input
              type="text"
              name="masterNo"
              className="block w-full py-0.5 bg-white text-center rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-200 focus:outline-0 sm:text-sm sm:leading-6"
              placeholder="SEARCH"
              style={{ fontSize: "11px" }}
            />
          </div>
        </>
      );
    },
    dataValueReflact: (dataValue, row) => {
      return (
        <div>
          <p className="text-left"> {dataValue}</p>
        </div>
      );
    },
    dataUtils: {
      class: "px-3 py-2.5  font-medium capitalize whitespace-nowrap",
    },
  },

  actions: {
    headerLabel: "Actions",
    headerReflact: (value) => {
      return (
        <div>
          <p>{value}</p>
        </div>
      );
    },

    headerUtils: {
      class: "min-w-[4rem] px-3 font-semibold",
    },
    dataValueReflact: (dataValue, row) => {
      return (
        <div className={`flex justify-start items-center gap-6`}>
          <div className="border  border-gray-300 px-1 py-1 rounded-full bg-gradient-to-r from-lime-500 to-lime-100">
            <button
              type="button"
              className="flex w-full gap-2  justify-center border border-lime-500 items-center h-7 rounded-full bg-lime-600 px-3 text-xs font-semibold text-green-50 shadow-md hover:bg-lime-700 active:bg-lime-600  sm:w-auto"
            >
              {/* {appointment.actions} */}Send Form
            </button>
          </div>
          {/* <div className="border  border-gray-300 px-1 py-1 rounded-full bg-gradient-to-r from-lime-500 to-lime-100">
                          <button
                            type="button"
                            className="flex w-full gap-2  justify-center border border-lime-500 items-center h-7 rounded-full bg-lime-600 px-3 text-xs font-semibold text-green-50 shadow-md hover:bg-lime-700 active:bg-lime-600  sm:w-auto"
                          >
                            <IoMdSend
                              className="h-4 w-4  text-gray-50"
                              aria-hidden="true"
                            />
                            {appointment.actions}
                          </button>
                        </div> */}
        </div>
      );
    },
    dataUtils: {
      class: "font-medium",
    },
  },
};
