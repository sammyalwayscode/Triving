import React, { useState } from "react";

function Click() {
  const [click, setClick] = useState(false);

  const clicking = () => {
    setClick(!click);
  };
  return (
    <div>
      {/* <h1 onClick={clicking}>Start</h1> */}

      {click ? (
        <h1 onClick={clicking}>Start</h1>
      ) : (
        <h1 onClick={clicking}>Stop</h1>
      )}
    </div>
  );
}

export default Click;
