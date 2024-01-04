import React, { useEffect, useState } from "react";
import PaperContainer from "../../Components/Common/PaperContainer";
import CommonButton from "../../Components/Common/Button/CommonButton";
import { Avatar, Box, Grid } from "@mui/material";
import TextLabel from "../../Components/Common/Fields/TextLabel";
import SelectDropDown from "../../Components/Common/SelectDropDown";
import CommonTextField from "../../Components/Common/Fields/TextField";
import { Regex } from "../../Utils/regex";
import AutoCompleteSearch from "../../Components/Common/commonAutoComplete";
import { useAppContext } from "../../Context/context";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { makeStyles } from "tss-react/mui";
import axios from "../../APiSetUp/axios";
import swal from "sweetalert";
import Assets from "../../Components/Common/ImageContainer";
import AddIcon from "@mui/icons-material/Add";

const useStyles = makeStyles()((theme) => {
  return {
    profileImage: {
      height: "130px",
      width: "130px",
      objectFit: "cover",
      borderRadius: "50%",
      border: `1px solid ${theme.palette.bgGray.main}`,
      padding: "4px",
    },
    imageEditIcon: {
      position: "absolute",
      bottom: "14px",
      right: "8px",
      backgroundColor: theme.palette.bgGray.main,
      height: "25px",
      width: "25px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "50%",
    },
  };
});

const Profile = () => {
  const { classes } = useStyles();
  const { OnUpdateError, toggleLoader, user } = useAppContext();
  const [data, setData] = useState({});
  const [error, setError] = useState({});
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const getLoginData = JSON.parse(localStorage.getItem("user"));

  const handleValidation = () => {
    let formIsValid = true;
    let errors = {};
    if (!data?.name) {
      formIsValid = false;
      errors["name"] = "Please enter name.";
    }
    if (!data?.address) {
      formIsValid = false;
      errors["address"] = "Please enter address.";
    }
    if (!selectedCountry) {
      formIsValid = false;
      errors["country"] = "Please select country.";
    }
    if (!selectedState) {
      formIsValid = false;
      errors["state"] = "Please select state.";
    }
    if (!selectedCity) {
      formIsValid = false;
      errors["city"] = "Please select city.";
    }
    if (!data?.postalCode) {
      formIsValid = false;
      errors["postalCode"] = "Please enter Pincode.";
    }
    if (!data?.email) {
      formIsValid = false;
      errors["email"] = "Please enter email.";
    } else if (!data?.email?.match(Regex.emailRegex)) {
      formIsValid = false;
      errors["invalidEmail"] = "* Invalid email Address";
    }
    if (!data?.mobileNo) {
      formIsValid = false;
      errors["mobileNo"] = "Please enter Contact No.";
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
  };

  const _getDefaultId = (data, name) => {
    console.log(name, data, "namename");
    return data?.length > 0 && data?.filter((e) => e?.name == name)?.[0]?.id;
  };

  const updateProfile = () => {
    if (handleValidation()) {
      let body = {
        id: getLoginData?._id,
        name: data?.name,
        address: data?.address,
        country: _getDefaultId(countries?.response, selectedCountry),
        state: _getDefaultId(states?.response, selectedState),
        city: _getDefaultId(cities?.response, selectedCity),
        postalCode: data?.postalCode,
      };
      axios
        .post("update_profile", body)
        .then((res) => {
          swal(res?.data?.message, { icon: "success", timer: 5000 });
          _getUserById();
        })
        .catch((err) => {
          toggleLoader();
          OnUpdateError(err.data.message);
        });
    }
  };

  const _getCountries = async () => {
    await axios
      .get("/countries")
      .then((res) => {
        if (res?.data?.data) {
          setCountries(res?.data?.data);
        }
      })
      .catch((err) => {
        toggleLoader();
        OnUpdateError(err?.data?.message);
      });
  };

  const _getStates = async () => {
    toggleLoader();
    await axios
      .post("/states", {
        country_id: _getDefaultId(countries?.response, selectedCountry),
      })
      .then((res) => {
        if (res?.data?.data) {
          console.log(res?.data?.data, "res?.data?.data");
          setStates(res?.data?.data);
        }
        toggleLoader();
      })
      .catch((err) => {
        toggleLoader();
        OnUpdateError(err.data.message);
      });
  };
  const _getCities = async () => {
    toggleLoader();
    console.log(states?.response, selectedState, "selectedState");
    await axios
      .post("/cities", {
        state_id: _getDefaultId(states?.response, selectedState),
        country_id: _getDefaultId(countries?.response, selectedCountry),
      })
      .then((res) => {
        if (res?.data?.data) {
          setCities(res?.data?.data);
        }
        toggleLoader();
      })
      .catch((err) => {
        toggleLoader();
        OnUpdateError(err.data.message);
      });
  };

  const _getUserById = () => {
    if (getLoginData?._id) {
      axios
        .get(`users/by_id/${getLoginData?._id}`)
        .then((res) => {
          if (res?.data?.data) {
            setData(res?.data?.data);
            setSelectedCountry(res?.data?.data?.countryDetail?.name);
            setSelectedState(res?.data?.data?.stateDetail?.name);
            setSelectedCity(res?.data?.data?.cityDetail?.name);
          }
        })
        .catch((err) => {
          toggleLoader();
          OnUpdateError(err.data.message);
        });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      axios
        .post("/upload/image/attachment", formData)
        .then((res) => {
        //   console.log("res😲", res);
        //   //   _getUserById();
        })
        .catch((err) => {
          toggleLoader();
          OnUpdateError(err.data.message);
        });
    }
  };

  useEffect(() => {
    _getUserById();
    _getCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry && countries?.response) {
      _getStates();
    }
  }, [selectedCountry, countries?.response]);

  useEffect(() => {
    if (selectedCountry && selectedState && states?.response) {
      _getCities();
    }
  }, [selectedState, selectedCountry, states?.response]);
  return (
    <>
      <PaperContainer>
        <Box>
          <Grid container spacing={1} xs={12} md={12} lg={12} sm={12} p={2}>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              display={"flex"}
              justifyContent={"center"}
              my={5}
            >
              <Box position={"relative"}>
                {data?.avtar ? (
                  <Assets
                    src={`https://shiv-gas-agency.s3.ap-south-1.amazonaws.com/${data?.avtar}`}
                    className={classes.profileImage}
                    absolutePath={true}
                  />
                ) : (
                  <Avatar className={classes.profileImage} />
                )}
                <label htmlFor="image-upload" className={classes.imageEditIcon}>
                  <AddIcon />
                </label>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => handleImageUpload(e)}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <CommonTextField
                fontWeight={400}
                text={"Name"}
                placeholder={"Enter User Name"}
                type="text"
                name="name"
                value={data?.name}
                onChange={(e) => handleChange(e, false)}
              />
              <TextLabel
                fontSize={"12px"}
                color={"red"}
                fontWeight={"400"}
                title={!data?.name ? error?.name : ""}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <CommonTextField
                fontWeight={400}
                text={"Address"}
                placeholder={"Enter Address"}
                type="text"
                name="address"
                value={data?.address}
                onChange={(e) => handleChange(e, false)}
              />
              <TextLabel
                fontSize={"12px"}
                color={"red"}
                fontWeight={"400"}
                title={!data?.address ? error?.address : ""}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <AutoCompleteSearch
                text="Country"
                fullWidth
                backgroundColor="white"
                handleChange={(e, newValue) => {
                  setSelectedCountry(newValue);
                  if (selectedCountry !== newValue) {
                    setSelectedCity("");
                    setSelectedState("");
                  }
                }}
                options={countries?.response?.map((e) => e?.name) || []}
                name="label"
                defaultValue={selectedCountry || ""}
                freeSolo
                blurOnSelect
                placeholder={"Select Country"}
              />
              <TextLabel
                fontSize={"12px"}
                color={"red"}
                fontWeight={"400"}
                title={!selectedCountry ? error?.country : ""}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <AutoCompleteSearch
                text="State"
                fullWidth
                backgroundColor="white"
                // width={"300px"}
                handleChange={(e, newValue) => {
                  setSelectedState(newValue);
                  if (selectedState !== newValue) {
                    setSelectedCity("");
                  }
                }}
                options={states?.response?.map((e) => e?.name) || []}
                name="label"
                defaultValue={selectedState || ""}
                freeSolo
                blurOnSelect
                placeholder={"Select State"}
              />
              <TextLabel
                fontSize={"12px"}
                color={"red"}
                fontWeight={"400"}
                title={!selectedState ? error?.state : ""}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <AutoCompleteSearch
                text="City"
                fullWidth
                backgroundColor="white"
                handleChange={(e, newValue) => setSelectedCity(newValue)}
                options={cities?.response?.map((e) => e?.name) || []}
                name="label"
                defaultValue={selectedCity || ""}
                freeSolo
                blurOnSelect
                placeholder={"Select City"}
              />
              <TextLabel
                fontSize={"12px"}
                color={"red"}
                fontWeight={"400"}
                title={!selectedCity ? error?.city : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3}>
              <CommonTextField
                fontWeight={400}
                text={"Pincode"}
                placeholder={"Enter Pincode"}
                type="number"
                name="postalCode"
                value={data?.postalCode}
                onChange={(e) => handleChange(e, false)}
              />
              <TextLabel
                fontSize={"12px"}
                color={"red"}
                fontWeight={"400"}
                title={!data?.postalCode ? error?.postalCode : ""}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <CommonTextField
                fontWeight={400}
                text={"Email"}
                placeholder={"Enter Email"}
                type="text"
                name="email"
                disabled
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
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <CommonTextField
                fontWeight={400}
                text={"Contact Number"}
                placeholder={"Enter Contact Number"}
                type="number"
                name="mobileNo"
                disabled
                value={data?.mobileNo}
                onChange={(e) => handleChange(e, false)}
              />
              <TextLabel
                fontSize={"12px"}
                color={"red"}
                fontWeight={"400"}
                title={!data?.mobileNo ? error?.mobileNo : ""}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "35px",
                }}
              >
                <CommonButton
                  width={"280px"}
                  text="Update Profile"
                  type="submit"
                  onClick={() => updateProfile()}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </PaperContainer>
    </>
  );
};

export default Profile;
