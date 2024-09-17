import React from "react";

const page = () => {
  return (
    <div className="mt-16">
      <div className="flex justify-center items-center xl:w-3/4 mx-auto space-x-4">
        <span className="font-bold text-xl flex-shrink-0 whitespace-nowrap">
          Browse articles
        </span>{" "}
        <input
          type="search"
          className="block w-full flex-auto rounded-full border border-solid border-neutral-300 bg-white px-6 py-3 text-base font-normal leading-6 text-neutral-700 outline-none shadow-md transition duration-200 ease-in-out focus:z-[3] focus:border-blue-500 focus:ring focus:ring-blue-300 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200 dark:placeholder:text-neutral-400 dark:focus:border-blue-500"
          placeholder="Search for an article..."
          aria-label="Search"
          aria-describedby="button-addon2"
        />
        <span
          className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-sm font-normal text-neutral-700 dark:text-neutral-200"
          id="basic-addon2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default page;
