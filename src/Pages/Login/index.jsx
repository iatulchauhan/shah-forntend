import React, { useEffect, useState } from "react";
import AuthLayout from "../../Components/AuthLayout";
import { Box, Grid, Typography } from "@mui/material";
import { Regex } from "../../Utils/regex";
import CommonTextField from "../../Components/Common/Fields/TextField";
import TextLabel from "../../Components/Common/Fields/TextLabel";
import CommonButton from "../../Components/Common/Button/CommonButton";
import { lightTheme } from "../../theme";
import { useAppContext } from "../../Context/context";
import axios from "../../APiSetUp/axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { requestForToken } from "../../firebase";
import Assets from "../../Components/Common/ImageContainer";

const Login = () => {
  const navigate = useNavigate();

  //States
  const [data, setData] = useState({});
  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const {
    OnUpdateError,
    toggleLoader,
    onUpdateUser,
    updateToken,
    getMenuListByRole,
    deviceToken,
  } = useAppContext();

  //Validation
  const handleValidation = () => {
    let formIsValid = true;
    let errors = {};
    if (!data?.email) {
      formIsValid = false;
      errors["email"] = "Please enter email.";
    } else if (!data?.email?.match(Regex.emailRegex)) {
      formIsValid = false;
      errors["invalidEmail"] = "* Invalid email Address";
    }
    if (!data?.password) {
      formIsValid = false;
      errors["password"] = "Please enter password.";
    } else if (data.password.length < 8) {
      formIsValid = false;
      errors["password"] = "Password must be at least 8 characters.";
    }
    setError(errors);
    return formIsValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (isSubmit) {
      handleValidation();
    }
  };

  const _deviceToken = () => {
    let body = {
      deviceToken: deviceToken,
    };
    axios
      .post("/deviceToken", body)
      .then((res) => {
        console.log("res", res)
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleLoginClick = () => {

    setIsSubmit(true);
    if (handleValidation()) {
      toggleLoader();
      axios
        .post("/login", {
          email: data?.email,
          password: data?.password,
        })
        .then((res) => {
          if (res?.data?.data) {
            onUpdateUser(res?.data?.data);
            updateToken(res?.data?.data?.token);
            getMenuListByRole();
            swal(res?.data?.message, {
              icon: "success",
              timer: 5000,
            });
            navigate("/");
            _deviceToken();
          }
          toggleLoader();
        })
        .catch((err) => {
          toggleLoader();
          OnUpdateError(err.data.message);
        });
    }
  };

  useEffect(() => {
    requestForToken();
  }, [])

  return (
    <>
      <AuthLayout
        logo={<Assets height={"70px"} src={"/assets/icons/logo.png"} absolutePath={true} />}
        login={"Login"}
        account={"Please login to your account"}
      >
        <Grid
          container
          spacing={2}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Grid
            item
            xs={10}
            sm={10}
            md={10}
            lg={10}
            style={{ marginTop: "20px" }}
          >
            <CommonTextField
              placeholder={"Email id"}
              type={"email"}
              name="email"
              value={data?.email}
              onChange={(e) => handleChange(e, false)}
            />
            <TextLabel
              fontSize={"12px"}
              color={"red"}
              title={!data?.email ? error?.email : ""}
            />
            <TextLabel
              fontSize={"12px"}
              color={"red"}
              title={
                data?.email?.match(Regex.emailRegex) ? "" : error.invalidEmail
              }
            />
          </Grid>
          <Grid item xs={10} sm={10} md={10} lg={10}>
            <CommonTextField
              placeholder={"Password"}
              type="password"
              name="password"
              showPasswordToggle
              value={data?.password}
              onChange={(e) => handleChange(e, false)}
            />
            <TextLabel
              fontSize={"12px"}
              color={"red"}
              fontWeight={"400"}
              title={error?.password}
            />
          </Grid>
          <Grid item xs={10} sm={10} md={10} lg={10}>
            <Typography
              style={{
                fontSize: "16px",
                fontWeight: 500,
                textAlign: "center",
                marginTop: "40px",
                color: lightTheme.palette.primary.main,
                cursor: "pointer",
              }}
              onClick={() => navigate("/forgot-password")}
            >
              {"Forgot Password ?"}
            </Typography>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "35px",
              }}
            >
              <CommonButton
                width={"200px"}
                text="Login"
                type="submit"
                onClick={handleLoginClick}
              />
            </Box>
          </Grid>
        </Grid>
      </AuthLayout>
    </>
  );
};

export default Login;
