import { Search } from "lucide-react";
import React from "react";

export const Navbar = () => {
  return (
    <div className=" mb-4 h-16 w-full flex items-center justify-center">
      <div className=" h-full w-1/2 flex items-center justify-center">
        <h1 className=" text-2xl font-bold">Video Search </h1>
        <Search className=" ml-2" />
      </div>
    </div>
  );
};
