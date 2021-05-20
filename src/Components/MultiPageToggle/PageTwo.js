import React from "react";

function PageTwo({ justclick, setJustClick }) {
  return <div>{justclick ? <h1>This is page two</h1> : null}</div>;
}

export default PageTwo;
