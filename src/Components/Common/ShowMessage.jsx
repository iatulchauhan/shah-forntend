import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../../Context/context";

function ShowMessage() {
  const { success, error, OnUpdateSuccess, OnUpdateError } = useAppContext();
  const location = useLocation();

  useEffect(() => {
    OnUpdateError("");
    OnUpdateSuccess("");
  }, [location?.pathname]);

  const updateErrorMessage = () => {
    setTimeout(() => {
      OnUpdateError("");
    }, 15000);
  };
  const updateSuccessMessage = () => {
    setTimeout(() => {
      OnUpdateSuccess("");
    }, 15000);
  };
  if (error) {
    updateErrorMessage();
  }
  if (success) {
    updateSuccessMessage();
  }
  return (
    <>
      {success ? (
        <div
          className="alert alert-success alert-dismissible"
          style={{ textAlign: "center" }}
        >
          <span>{success}</span>
          <Link
            to="#"
            className="close"
            onClick={() => OnUpdateSuccess("")}
            style={{ color: "initial", position: "absolute", right: "20px" }}
          >
            &times;
          </Link>
        </div>
      ) : (
        ""
      )}
      {error ? (
        <div
          className="alert alert-danger alert-dismissible"
          style={{ textAlign: "center" }}
        >
          <span>{error}</span>
          <Link
            to="#"
            className="close"
            onClick={() => OnUpdateError("")}
            style={{ color: "initial", position: "absolute", right: "20px" }}
          >
            &times;
          </Link>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default ShowMessage;
