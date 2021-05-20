import React from "react";

function AlertShow() {
  return (
    <div
      style={{
        height: "20px",
        width: "200px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "red",
          color: "white",
        }}
      >
        {" "}
        Cool stuff Bro{" "}
      </div>
    </div>
  );
}

export default AlertShow;
