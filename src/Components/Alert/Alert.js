import React, { useState, useContext } from "react";
import AlertShow from "./AlertShow";
import { GlobalVariable } from "./GlobalState";

function Alert() {
  const { beauty, Open, show, open, setShow, Show } = useContext(
    GlobalVariable
  );
  return (
    <div>
      <div
        style={{
          display: "flex",
          top: "100%",
        }}
      >
        {show}
      </div>

      <h1>Hello welcome Guys </h1>

      {open ? (
        <button
          onClick={() => {
            Open();
            Show();
          }}
        >
          Click Me
        </button>
      ) : (
        <button
          onClick={() => {
            Show();
            setShow(false);
          }}
        >
          off me
        </button>
      )}
    </div>
  );
}

export default Alert;
