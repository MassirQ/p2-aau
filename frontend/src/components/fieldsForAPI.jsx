import React from "react";
import * as md5 from "md5";

export const FieldsForAPI = ({
  inputStyle,
  onChangeEndpointTypeHandle,
  onChangeMethodHandle,
}) => {
    
  return (
    <div className="grid grid-cols-2 gap-4 border-8">
    
      <div class="form-group mb-6">
        <select
          onChange={(e) => onChangeEndpointTypeHandle(e)}
          name={md5(Date.now())}
          type="text"
          className={inputStyle}
          id="exampleInput123"
          aria-describedby="emailHelp123"
          placeholder="text"
        >
          <option value="graphql">GraphQL</option>
          <option value="restAPI">Rest API</option>
        </select>
      </div>

      <div class="form-group mb-6">
        <select
          onChange={(e) => onChangeMethodHandle(e)}
          name={md5(Date.now())}
          type="text"
          className={inputStyle}
          id="exampleInput123"
          aria-describedby="emailHelp123"
          placeholder="text"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
          <option value="PATCH">PATCH</option>
        </select>
      </div>
    </div>
  );
};
