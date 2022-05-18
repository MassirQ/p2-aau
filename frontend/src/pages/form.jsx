import React, { useState } from "react";
import CustomType from "../components/customType";


export default function Form() {
  
    const [types, setType] = useState([]); 

  return (
   <div>
     
      <div className="grid grid-cols-2">
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
          onClick={() => {setType([...types, <CustomType formValue={[]} endpointData={[]} />])}}
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
   
    const response = await fetch("http://localhost:8080/createEndpointResolvers", {
      method: "POST",
    });
  }}
        >
          Create Resolver
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
   
    const response = await fetch("http://localhost:8080/createTypeQueries", {
      method: "POST",
    });
  }}
        >
          Create Queries
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
   
 await fetch("http://localhost:8080/createType", {
      method: "POST",
    });
  }}
        >
          Create Types
        </button>
        </div>
      </div>
  );

}
