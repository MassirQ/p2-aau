import React, { useState } from "react";
import CustomType from "./customType";
import { styles } from '../styles.js'

export default function Form() {

  const [types, setType] = useState([]); 
  return (
   <div>
      <div className="grid grid-cols-4">
      {types.map(type => type)}
      </div>    
      <div className="mt-5">
        <button
          className={styles.controlButton} 
            onClick={() => {
            setType([...types, <CustomType formValue={[]}/>])}
          }
        >
          Add Type
        </button>
        <button
          className={styles.controlButton}
          onClick={async () => {
            const response = await fetch("http://localhost:8080/start", {
              method: "POST",
            });
          }}
        >
          Start Server
        </button>
        <button
          className={styles.controlButton}
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
