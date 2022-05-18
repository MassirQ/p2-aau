import React, { useState } from "react";
import { CustomField } from "./customField";
import { FieldsForAPI }  from "./fieldsForAPI";
import * as md5 from "md5";
import fetch from "node-fetch";

export default function CustomType({ formValue, endpointData }) {
  let inputStyle =
    "form-control block w-full mb-5 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";

  let onChangeDataTypeHandle = (e) => {
    let index = formValue.findIndex((p) => p.id === e.target.name);
    // Check if the id exists
    if (index != -1) {
      let entry = formValue[index];
      let newEntry = { ...entry, dataType: e.target.value };
      formValue[index] = newEntry;
    } else {
      let entry = {
        id: e.target.name,
        dataType: e.target.value,
      };
      formValue.push(entry);
    }
  };

  let onChangeFieldNameHandle = (e) => {
    let index = formValue.findIndex((p) => p.id === e.target.name);
    if (index != -1) {
      let entry = formValue[index];
      let newEntry = { ...entry, fieldName: e.target.value };
      formValue[index] = newEntry;
    } else {
      let entry = {
        id: e.target.name,
        fieldName: e.target.value,
      };
      formValue.push(entry);
    }
  };

  let onChangeMethodHandle = (e) => {
    let index = endpointData.findIndex((p) => p.id === e.target.name);
    if (index != -1) {
      let entry = endpointData[index];
      let newEntry = { ...entry, fieldMethodName: e.target.value };
      endpointData[index] = newEntry;
    } else {
      let entry = {
        id: e.target.name,
        fieldMethodName: e.target.value,
      };
      endpointData.push(entry);
    }
  };
  let onChangeURLHandle = (e) => {
    let index = endpointData.findIndex((p) => p.id === e.target.name);
    if (index != -1) {
      let entry = endpointData[index];
      let newEntry = { ...entry, URLName: e.target.value };
      endpointData[index] = newEntry;
    } else {
      let entry = {
        id: e.target.name,
        URLName: e.target.value,
      };
      endpointData.push(entry);
    }
  };
  let onChangeMethodNameHandle = (e) => {
    let index = endpointData.findIndex((p) => p.id === e.target.name);
    if (index != -1) {
      let entry = endpointData[index];
      let newEntry = { ...entry, methodName: e.target.value };
      endpointData[index] = newEntry;
    } else {
      let entry = {
        id: e.target.name,
        methodName: e.target.value,
      };
      endpointData.push(entry);
    }
  };

    let onChangeOutPutHandle = (e) => {
      let index = endpointData.findIndex((p) => p.id === e.target.name);
      if (index != -1) {
        let entry = endpointData[index];
        let newEntry = { ...entry, outPut: e.target.value };
        endpointData[index] = newEntry;
      } else {
        let entry = {
          id: e.target.name,
          outPut: e.target.value,
        };
        endpointData.push(entry);
      }
  };

  const [fields, setFields] = useState([]);
  const [type, setType] = useState("");
  const [endpoints, setEndpoints] = useState([]);
  return (
    <div>
      <div>
        <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md mt-6">
          <input type="text" className={inputStyle} name={md5(Date.now())} placeholder="Type" onChange={(e)=>setType(e.target.value)}  />
          {console.log(type)}
          {fields.map((f) => f)}
          {endpoints.map((e) => e)}
         

          <button
            className="
px-3
py-2.5
mb-5  
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
            onClick={() => {
              setFields([
                ...fields,
                <CustomField
                  inputStyle={inputStyle}
                  onChangeDataTypeHandle={onChangeDataTypeHandle}
                  onChangeFieldNameHandle={onChangeFieldNameHandle}
                />,
              ]);
            }}
          >
            Add field 
          </button>
          <button
            className="
px-3
py-2.5
mb-5  
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
            onClick={() => {
             
              setEndpoints([
                ...endpoints,
                <FieldsForAPI
                  inputStyle={inputStyle}
                  onChangeMethodHandle={onChangeMethodHandle}
                  onChangeURLHandle={onChangeURLHandle}
                  onChangeMethodNameHandle={onChangeMethodNameHandle}
                  onChangeOutPutHandle={onChangeOutPutHandle}
                />,
              ]);
            }}
          >
            Attach Endpoint
          </button>
          <button
            type="submit"
            className="
  w-full
  px-6
  py-2.5
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
              const body = JSON.stringify({formValue,type, endpointData});
              await fetch("http://localhost:8080/", {
                method: "POST",
                body,
                headers: { "Content-Type": "application/json" },
              });
              console.log(body);
            }
          }
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
