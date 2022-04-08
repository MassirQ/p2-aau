import React, { useState } from "react";
import { CustomField } from "./customField";
import fetch from "node-fetch";
import {styles} from "../styles.js"

export default function CustomType({ formValue }) {
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

 

  const [fields, setFields] = useState([]);
  const [type, setType] = useState("");
  return (
    <div>
      <div>
        <div className={styles.custumType}>
          <input type="text" className={inputStyle} placeholder="Type" onChange={(e)=>setType(e.target.value)}  />
          {console.log(type)}
          {fields.map((f) => f)}

          <button
            className={styles.fieldAddButton}
            onClick={() => {
              setFields([
                ...fields,
                <CustomField
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
            className={styles.submitButton}
            onClick={async () => {
              const body = JSON.stringify({formValue,type});
              const response = await fetch("http://localhost:8080/", {
                method: "POST",
                body,
                headers: { "Content-Type": "application/json" },
              });
              console.log(body);
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
