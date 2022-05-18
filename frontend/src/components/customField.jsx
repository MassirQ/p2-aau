import React from "react";
import * as md5 from "md5";

export const CustomField = ({
  inputStyle,
  onChangeDataTypeHandle,
  onChangeFieldNameHandle,
  onChangeTypeHandle,
}) => {
  return (
    <div class="grid grid-cols-2 gap-4">

      <div class="form-group mb-6">

        <input
          onChange={(e) => onChangeFieldNameHandle(e)}
          name={md5(Date.now())}
          type="text"
          className={inputStyle}
          id="exampleInput123"
          aria-describedby="emailHelp123"
          placeholder="text"
        />
      </div>
      <div class="form-group mb-6">
        <select
          onChange={(e) => onChangeDataTypeHandle(e)}
          name={md5(Date.now())}
          type="text"
          className={inputStyle}
          id="exampleInput123"
          aria-describedby="emailHelp123"
          placeholder="text"
        >
          <option value="">Please Choose</option>
          <option value="String">Text</option>
          <option value="Int">Number</option>
        </select>
      </div>
    </div>
  );
};
