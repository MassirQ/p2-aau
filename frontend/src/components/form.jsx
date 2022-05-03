import React, { useState } from "react";
import CustomType from "./customType";
import CustomAPI from "./customAPI";

export default function Form() {
  
    const [types, setType] = useState([]); 
    const [paths, setPath] = useState([]); 

  return (
   <div>
      <div className="grid grid-cols-5">
      {types.map(type => type)}
      {paths.map(path => path)}
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
  onClick={() => {setPath([...paths, <CustomAPI formValue={[]}/>])}}
        >
          Add API
        </button>
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
  onClick={async () => {
   
    const response = await fetch("http://localhost:8080/start", {
      method: "POST",

    });
  }}
        >
          Start Server
        </button>
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
  onClick={async () => {
   
    const response = await fetch("http://localhost:8080/stop", {
      method: "POST",

    });
  }}
        >
          Stop Server
        </button>
        </div>
      </div>
  );

}
