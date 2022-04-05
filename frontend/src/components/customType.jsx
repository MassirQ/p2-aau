import React, { useState } from "react";
import { CustomField } from "./customField";

export default function CustomType({ formValue }) {
  let inputStyle =
    "form-control block w-full mb-5 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";

  let onChangeDataTypeHandle = (e) => {
    let index = formValue.findIndex((p) => p.id === e.target.name);
    // Check if the id exists
    console.log(index)
    if (index != -1) {
      let entry = formValue[index];
      let newEntry = { ...entry, dataType: e.target.value };
      formValue[index] = newEntry;
      console.log("formValue: ", formValue);
    } else {
      let entry = {
        id: e.target.name,
        dataType: e.target.value,
      };
      formValue.push(entry);
      console.log("formValue: ", formValue);
    }
  };

  let onChangeFieldNameHandle = (e) => {
    let index = formValue.findIndex((p) => p.id === e.target.name);
    if (index != -1) {
      let entry = formValue[index];
      let newEntry = { ...entry, fieldName: e.target.value };
      formValue[index] = newEntry;
      console.log("formValue: ", formValue);

    } else {
      let entry = {
        id: e.target.name,
        fieldName: e.target.value,
      };
      formValue.push(entry);
      console.log("formValue: ", formValue);
    }
  };

  const [fields, setFields] = useState([]);
  return (
    <div>
      <div>
        <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md mt-6">
          <input type="text" className={inputStyle} placeholder="Type" />
          {fields.map((f) => f)}

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
            +
          </button>
          <button
            type="submit"
            class="
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
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
