import React, { useState } from "react";
import CustomType from "./customType";

export default function Form() {
  
    const [types, setType] = useState([]); 

  return (
   <div>
      <div className="grid grid-cols-4">
      {types.map(type => type)}
      </div>    
      <div className="mt-5">
        <button
          className="
  px-10
  py-10
  bg-blue-600
  text-white
  font-medium
  text-xs
  leading-tight
  uppercase
  rounded
  shadow-md
  hover:bg-blue-700 hover:shadow-lg
  focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
  active:bg-blue-800 active:shadow-lg
  transition
  duration-150
  ease-in-out"
          onClick={() => {setType([...types, <CustomType formValue={[]}/>])}}
        >
          Add Type
        </button>
        </div>
      </div>
  );

}
