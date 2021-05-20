import React, { useState } from "react";
import { Input, Button } from "antd";
import "antd/dist/antd.css";

function SignsToogle() {
  const [toogleSign, setToogleSign] = useState(false);

  const justtoogle = () => {
    setToogleSign(!toogleSign);
  };
  return (
    <div>
      {toogleSign ? (
        <div>
          <Input placeholder="Name" type="text" style={{ width: "300px" }} />
          <br />
          <br />
          <Input placeholder="Age" type="text" style={{ width: "300px" }} />
          <br />
          <br />
          <Button>Summit</Button>
          <div>
            Do not have an account <strong onClick={justtoogle}>Sign Up</strong>
          </div>
        </div>
      ) : (
        <div>
          <Input placeholder="Name" type="text" style={{ width: "300px" }} />
          <br />
          <br />
          <Input placeholder="Age" type="text" style={{ width: "300px" }} />
          <br />
          <br />
          <Input placeholder="Email" type="text" style={{ width: "300px" }} />
          <br />
          <br />
          <Button>Summit</Button>
          <div>
            Do not have an account <strong onClick={justtoogle}>Sign In</strong>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignsToogle;
