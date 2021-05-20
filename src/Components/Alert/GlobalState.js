import React, { createContext, useState } from "react";
import AlertShow from "./AlertShow";

export const GlobalVariable = createContext();

export const GlobalState = ({ children }) => {
  const [show, setShow] = useState("");
  const [open, setOpen] = useState(false);

  const beauty = () => {
    setShow(<AlertShow />);
  };

  const Open = () => {
    if (open) {
      setShow(<AlertShow />);
    } else {
      setShow("");
    }
  };

  const Show = () => {
    setOpen(!open);
  };

  return (
    <>
      <GlobalVariable.Provider
        value={{
          beauty,
          show,
          Open,
          open,
          setShow,
          Show,
        }}
      >
        {children}
      </GlobalVariable.Provider>
    </>
  );
};
