import React, { useState } from "react";
import PageTwo from "./PageTwo";

function PageOne() {
  const [justclick, setJustClick] = useState(false);

  const clickPage = () => {
    setJustClick(!justclick);
  };
  return (
    <div>
      <h1 onClick={clickPage}>This is page one</h1>
      <PageTwo justclick={justclick} setJustClick={setJustClick} />
    </div>
  );
}

export default PageOne;
