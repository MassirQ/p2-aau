import React, {useState} from "react";
import * as md5 from "md5";

export const FieldsForAPI = ({
  inputStyle,
  onChangeMethodHandle,
  onChangeURLHandle,
  onChangeMethodNameHandle,
  onChangeOutPutHandle,
}) => {
    const name = md5(Date.now());
  return (
    <div className="grid grid-cols-2 gap-4 border-8">
        

     
<input
  onChange={(e) => onChangeURLHandle(e)}
  type="text"
  name={name}
  className={inputStyle}
  id="exampleInput123"
  aria-describedby="emailHelp123"
  placeholder="API path"
/>


<input
  onChange={(e) => onChangeMethodNameHandle(e)}
  type="text"
  name={name}
  className={inputStyle}
  id="exampleInput123"
  aria-describedby="emailHelp123"
  placeholder="Method Name"
/>

       <div className="form-group mb-6">
        <select
          onChange={(e) => onChangeMethodHandle(e)}
          type="text"
          name={name}
          className={inputStyle}
          id="exampleInput123"
          aria-describedby="emailHelp123"
          placeholder="text"
        >
          <option value="">Choose a request Method</option>
          <option value="get">GET</option>
          <option value="post">POST</option>
          <option value="put">PUT</option>
          <option value="delete">DELETE</option>
          <option value="patch">PATCH</option>
        </select>
<label> Please write what you want
        <input
  onChange={(e) => onChangeOutPutHandle(e)}
  type="text"
  name={name}
  className={inputStyle}
  id="exampleInput123"
  aria-describedby="emailHelp123"
  placeholder="example: [user] or user"
/></label>
        
      </div>
    </div>
  );
};
