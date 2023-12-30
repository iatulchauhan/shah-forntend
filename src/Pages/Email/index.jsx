import {
  Avatar,
  Box,
  Divider,
  Fab,
  Grid,
  Hidden,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CommonSearch from "../../Components/Common/CommonSearch";
import SectionHeading from "../../Components/Common/SectionHeading";
import TableHeading from "../../Components/Common/CommonTableHeading";
import TextLabel from "../../Components/Common/Fields/TextLabel";
import Assets from "../../Components/Common/ImageContainer";
import { lightTheme } from "../../theme";
import CommonButton from "../../Components/Common/Button/CommonButton";
import CommonTextField from "../../Components/Common/Fields/TextField";
import TextEditor from "../../Components/Common/textEditor";
import FileUpload from "../../Components/Common/uploadButton";
import axios, { Image_BASE_URL } from "../../APiSetUp/axios";
import { useAppContext } from "../../Context/context";
import AutoCompleteMultiSelect from "../../Components/Common/AutoCompleteMultiSelect";
import swal from "sweetalert";
import DataNotFound from "../../Components/Common/DataNotFound";
import { makeStyles } from "tss-react/mui";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SendIcon from "@mui/icons-material/Send";
import StarIcon from "@mui/icons-material/Star";
import CamposeEmail from "../../Components/Common/CamposeEmail";

const useStyles = makeStyles()((theme) => {
  return {
    emailsList: {
      background: "var(--LightGrey, #F9FAFB)",
      height: "81.7vh",
      overflow: "scroll",
      "::-webkit-scrollbar": {
        width: "0.5px",
      },
      "::-webkit-scrollbar-thumb": {
        backgroundColor: "transparent",
      },
    },
    listBox: {
      background: lightTheme.palette.bgWhite.main,
      borderRadius: "20px",
      border: "1px solid #F8F9FA",
      boxShadow: "0px 4px 20px 0px rgba(238, 238, 238, 0.50)",
      alignItems: "center",
    },
    listBoxText: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: 4,
      minHeight: "50px",
    },
    emailContain: {
      background: "var(--White, #FFF)",
      height: "81.7vh",
      overflow: "scroll",
      "::-webkit-scrollbar": {
        width: "0.5px",
      },
      "::-webkit-scrollbar-thumb": {
        backgroundColor: "transparent",
      },
    },
    wordBreak: {
      wordBreak: "break-all",
    },
    assets: {
      cursor: "pointer",
    },
  };
});

const Email = () => {
  const { classes } = useStyles();
  const { OnUpdateError, toggleLoader } = useAppContext();
  const [data, setData] = useState({});
  const [users, setUsers] = useState([]);
  const [multiSelectedUser, setMultiSelectedUser] = useState([]);
  const [imageData, setImageData] = useState();
  const [pdfData, setPdfData] = useState();
  const [error, setError] = useState({});
  const [emailsList, setEmailsList] = useState();
  const [emailForm, setEmailForm] = useState(false);
  const [getEmailData, setGetEmailData] = useState("");
  const [description, setDescription] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleValidation = () => {
    let formIsValid = true;
    let errors = {};
    if (multiSelectedUser.length === 0) {
      formIsValid = false;
      errors["selectUser"] = "Please select User.";
    }
    if (!data?.anotherUser) {
      formIsValid = false;
      errors["anotherUser"] = "Please enter address.";
    }
    if (!data?.title) {
      formIsValid = false;
      errors["title"] = "Please enter title.";
    }
    if (!description || description.trim() === "") {
      formIsValid = false;
      errors["description"] = "Please enter description.";
    }
    // if (!imageData) {
    //   formIsValid = false;
    //   errors["selectImage"] = "Please select Image.";
    // }
    // if (!pdfData) {
    //   formIsValid = false;
    //   errors["selectPdf"] = "Please enter selectPdf.";
    // }
    setError(errors);
    return formIsValid;
  };

  const _getUsers = () => {
    toggleLoader();
    axios
      .post("users")
      .then((res) => {
        if (res?.data?.data) {
          setUsers(res?.data?.data);
        }
        toggleLoader();
      })
      .catch((err) => {
        toggleLoader();
        OnUpdateError(err.data.message);
      });
  };

  const handleUpload = async (file, key) => {
    const formData = new FormData();
    formData.append("image", file);
    toggleLoader();
    if (file?.size <= 10000000) {
      axios
        .post("/upload/image/attachment", formData)
        .then((res) => {
          if (res?.data?.data) {
            if (key === "image") {
              setImageData(res?.data?.data?.image);
            } else {
              setPdfData(res?.data?.data?.image);
            }
          }
          setError({ ...error, imageSizeValid: "", pdfSizeValid: "" });
        })
        .catch((err) => {
          toggleLoader();
          OnUpdateError(err.data.message);
        });
    } else {
      if (key === "image") {
        setError({
          ...error,
          imageSizeValid: "Upload file allowed size is 10MB",
        });
      } else {
        setError({
          ...error,
          pdfSizeValid: "Upload file allowed size is 10MB",
        });
      }
    }
    toggleLoader();
  };

  const handleDeleteFile = (type) => {
    let body = {
      url: type === "image" ? imageData : pdfData,
    };
    axios
      .post(`/upload/delete_file`, body)
      .then((res) => {
        swal(res?.data?.message, { icon: "success", timer: 5000 });
        type === "image" ? setImageData(null) : setPdfData(null);
      })
      .catch((err) => {
        OnUpdateError(err.data.message);
      });
  };

  const _sendEmail = () => {
    if (handleValidation()) {
      toggleLoader();
      const selectedUserEmail = multiSelectedUser?.map((item) => item.email);
      const anotherUserEmail = data?.anotherUser
        ?.split(",")
        .map((email) => email.trim());

      let body = {
        emails: [...selectedUserEmail, ...anotherUserEmail],
        title: data?.title,
        content: description,
        pdf: imageData || "",
        image: pdfData || "",
      };
      axios
        .post(`send_email`, body)
        .then((res) => {
          if (res?.data?.data) {
            toggleLoader();
            setData({});
            setDescription("");
            setMultiSelectedUser([]);
            setImageData(null);
            setPdfData(null);
            _getEmailsList();
          }
        })
        .catch((err) => {
          toggleLoader();
          OnUpdateError(err.data.message);
        });
    }
  };

  const _getEmailById = (id) => {
    setGetEmailData("");
    setEmailForm(false);
    if (id) {
      axios
        .get(`email/get/${id}`)
        .then((res) => {
          if (res?.data?.data) {
            setGetEmailData(res?.data?.data);
          }
        })
        .catch((err) => {
          toggleLoader();
          OnUpdateError(err.data.message);
        });
    }
  };

  const _deleteEmail = (id) => {
    if (id) {
      axios
        .delete(`email/delete/${id}`)
        .then((res) => {
          swal(res?.data?.message, { icon: "success", timer: 5000 });
          _getEmailsList();
          setGetEmailData();
        })
        .catch((err) => {
          toggleLoader();
          OnUpdateError(err.data.message);
        });
    }
  };

  const _getEmailsList = () => {
    let body = {};
    axios
      .post(`emails_list`, body)
      .then((res) => {
        if (res?.data?.data) {
          setEmailsList(res?.data?.data);
        }
      })
      .catch((err) => {
        toggleLoader();
        OnUpdateError(err.data.message);
      });
  };

  useEffect(() => {
    _getUsers();
    _getEmailsList();
  }, []);

  useEffect(() => {
    if (window.innerWidth >= 900) {
      setEmailForm(true);
    }
  }, []);

  const resetEmailData = () => {
    setGetEmailData('')
  };

  return (
    <>
      <Grid container spacing={0} ml={0}>
        {/* {console.log('getEmailData?._id😲', getEmailData?._id, window.innerWidth)} */}
        {window.innerWidth <= 900 ? (
          <>
            {!getEmailData?._id && !emailForm && window.innerWidth <= 900 ? (
              <Grid
                item
                xs={12}
                sm={12}
                md={5}
                lg={5}
                padding={2}
                className={classes.emailsList}
              >
                <Box mb={3}>
                  <CommonSearch />
                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Box>
                    <TextLabel
                      fontSize={"18px"}
                      fontWeight={"600"}
                      color={lightTheme.palette.bgDarkPrimary.main}
                      title={"Emails"}
                    />
                    <TextLabel
                      color={lightTheme.palette.bgLightExtraLightGray.main}
                      variant={"body2"}
                      title={`${emailsList?.count} messages`}
                    />
                  </Box>
                  <CommonButton
                    text={"New Message"}
                    onClick={() => setEmailForm(true)}
                  />
                </Box>
                <Box className={classes.listBox} mt={3}>
                  {emailsList?.response?.map((data) => {
                    return (
                      <>
                        <Box
                          padding={2}
                          sx={{
                            backgroundColor:
                              getEmailData._id === data._id
                                ? "#F5F6FD"
                                : lightTheme.palette.bgWhite.main,
                            cursor: "pointer",
                          }}
                        >
                          <Box onClick={() => _getEmailById(data?._id)}>
                            <Box
                              display={"flex"}
                              justifyContent={"space-between"}
                              mb={2}
                            >
                              <Box
                                display={"flex"}
                                gap={1}
                                alignItems={"center"}
                              >
                                <Avatar />
                                <Box>
                                  <TextLabel
                                    className={classes.wordBreak}
                                    fontWeight={"600"}
                                    variant={"body2"}
                                    title={data.createdBy}
                                  />
                                  <TextLabel
                                    color={
                                      lightTheme.palette.bgLightExtraLightGray
                                        .main
                                    }
                                    variant={"body2"}
                                    title={"Jul 19, 2022, 10:20 PM"}
                                  />
                                  <TextLabel
                                    color={
                                      lightTheme.palette.bgLightExtraLightGray
                                        .main
                                    }
                                    variant={"body2"}
                                    title={data.title}
                                  />
                                </Box>
                              </Box>
                            </Box>
                            <Box>
                              <TextLabel
                                variant={"body2"}
                                color={
                                  lightTheme.palette.bgLightExtraLightGray.main
                                }
                                fontWeight={"400"}
                                className={classes.listBoxText}
                                title={
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: data?.content,
                                    }}
                                  />
                                }
                              />
                            </Box>
                          </Box>
                        </Box>
                        <Divider />
                      </>
                    );
                  })}
                </Box>
              </Grid>
            ) : (
              <CamposeEmail
                emailForm={emailForm}
                setEmailForm={setEmailForm}
                users={users}
                setUsers={setUsers}
                multiSelectedUser={multiSelectedUser}
                setMultiSelectedUser={setMultiSelectedUser}
                error={error}
                setError={setError}
                handleChange={handleChange}
                data={data}
                setData={setData}
                description={description}
                setDescription={setDescription}
                getEmailData={getEmailData}
                setGetEmailData={setGetEmailData}
                pdfData={pdfData}
                setPdfData={setPdfData}
                imageData={imageData}
                setImageData={setImageData}
                handleUpload={handleUpload}
                handleDeleteFile={handleDeleteFile}
                _sendEmail={_sendEmail}
                _deleteEmail={_deleteEmail}
                resetEmailData={() => resetEmailData()}
              />
            )}
          </>
        ) : (
          <>
            <Grid
              item
              xs={12}
              sm={12}
              md={5}
              lg={5}
              padding={2}
              className={classes.emailsList}
            >
              <Box mb={3}>
                <CommonSearch />
              </Box>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Box>
                  <TextLabel
                    fontSize={"18px"}
                    fontWeight={"600"}
                    color={lightTheme.palette.bgDarkPrimary.main}
                    title={"Emails"}
                  />
                  <TextLabel
                    color={lightTheme.palette.bgLightExtraLightGray.main}
                    variant={"body2"}
                    title={`${emailsList?.count} messages`}
                  />
                </Box>
                <CommonButton
                  text={"New Message"}
                  onClick={() => setEmailForm(true)}
                />
              </Box>
              <Box className={classes.listBox} mt={3}>
                {emailsList?.response?.map((data) => {
                  return (
                    <>
                      <Box
                        padding={2}
                        sx={{
                          backgroundColor:
                            getEmailData._id === data._id
                              ? "#F5F6FD"
                              : lightTheme.palette.bgWhite.main,
                          cursor: "pointer",
                        }}
                      >
                        <Box onClick={() => _getEmailById(data?._id)}>
                          <Box
                            display={"flex"}
                            justifyContent={"space-between"}
                            mb={2}
                          >
                            <Box display={"flex"} gap={1} alignItems={"center"}>
                              <Avatar />
                              <Box>
                                <TextLabel
                                  className={classes.wordBreak}
                                  fontWeight={"600"}
                                  variant={"body2"}
                                  title={data.createdBy}
                                />
                                <TextLabel
                                  color={
                                    lightTheme.palette.bgLightExtraLightGray
                                      .main
                                  }
                                  variant={"body2"}
                                  title={"Jul 19, 2022, 10:20 PM"}
                                />
                                <TextLabel
                                  color={
                                    lightTheme.palette.bgLightExtraLightGray
                                      .main
                                  }
                                  variant={"body2"}
                                  title={data.title}
                                />
                              </Box>
                            </Box>
                          </Box>
                          <Box>
                            <TextLabel
                              variant={"body2"}
                              color={
                                lightTheme.palette.bgLightExtraLightGray.main
                              }
                              fontWeight={"400"}
                              className={classes.listBoxText}
                              title={
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: data?.content,
                                  }}
                                />
                              }
                            />
                          </Box>
                        </Box>
                      </Box>
                      <Divider />
                    </>
                  );
                })}
              </Box>
            </Grid>

            <CamposeEmail
              emailForm={emailForm}
              setEmailForm={setEmailForm}
              users={users}
              setUsers={setUsers}
              multiSelectedUser={multiSelectedUser}
              setMultiSelectedUser={setMultiSelectedUser}
              error={error}
              setError={setError}
              handleChange={handleChange}
              data={data}
              setData={setData}
              description={description}
              setDescription={setDescription}
              getEmailData={getEmailData}
              setGetEmailData={setGetEmailData}
              pdfData={pdfData}
              setPdfData={setPdfData}
              imageData={imageData}
              setImageData={setImageData}
              handleUpload={handleUpload}
              handleDeleteFile={handleDeleteFile}
              _sendEmail={_sendEmail}
              _deleteEmail={_deleteEmail}
              resetEmailData={() => resetEmailData()}
            />
          </>
        )}
      </Grid>
    </>
  );
};

export default Email;
