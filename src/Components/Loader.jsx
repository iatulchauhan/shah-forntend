import React from "react";
import { useAppContext } from "../Context/context";

function Loader() {
  const { loader } = useAppContext();
  return (
    <>
      {loader ? (
        <div className="loading">
          <div className="uil-ring-css" style={{ transform: "scale(0.79)" }}>
            <div></div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Loader;
