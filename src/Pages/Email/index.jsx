import { Avatar, Box, Divider, Grid, Typography } from "@mui/material";
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
  const [emailForm, setEmailForm] = useState(true);
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

  return (
    <>
      <Grid container spacing={0} ml={0}>
        <Grid
          item
          xs={4}
          sm={4}
          md={4}
          lg={4}
          padding={2}
          className={classes.emailsList}
        >
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
                title={"Email History"}
              />
              <TextLabel
                color={lightTheme.palette.bgLightExtraLightGray.main}
                variant={"body2"}
                title={"512 messages"}
              />
            </Box>
            <CommonButton
              text={"New Message"}
              onClick={() => setEmailForm(true)}
            />
          </Box>

          {emailsList?.response?.map((data) => {
            return (
              <Box padding={2} mt={2} pe={3} className={classes.listBox}>
                <Box onClick={() => _getEmailById(data?._id)}>
                  <Box display={"flex"} justifyContent={"space-between"} mb={1}>
                    <Box display={"flex"} gap={1} alignItems={"center"}>
                      <Avatar />
                      <Box>
                        <TextLabel
                          className={classes.wordBreak}
                          fontWeight={"600"}
                          variant={"body2"}
                          title={data._id}
                        />
                        <TextLabel
                          color={lightTheme.palette.bgLightExtraLightGray.main}
                          variant={"body2"}
                          title={data.title}
                        />
                      </Box>
                    </Box>
                    <TextLabel
                      color={lightTheme.palette.bgLightExtraLightGray.main}
                      variant={"body2"}
                      title={"Jul 19, 2022, 10:20 PM"}
                    />
                  </Box>
                  <Box>
                    <TextLabel
                      variant={"body2"}
                      color={lightTheme.palette.bgLightExtraLightGray.main}
                      fontWeight={"400"}
                      className={classes.listBoxText}
                      title={
                        <div
                          dangerouslySetInnerHTML={{ __html: data?.content }}
                        />
                      }
                    />
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Grid>
        <Grid item xs={8} sm={8} md={8} lg={8}>
          <Box padding={2} className={classes.emailContain}>
            {emailForm === true ? (
              <Grid container spacing={2} xs={12} p={2}>
                <Grid
                  item
                  xs={12}
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <TextLabel
                    fontSize={"18px"}
                    fontWeight={"600"}
                    color={lightTheme.palette.bgDarkPrimary.main}
                    title={"Compose New Mail"}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <AutoCompleteMultiSelect
                    fullWidth
                    text="Select User"
                    options={users?.response || []}
                    placeholder={"Select User"}
                    handleChange={(e, newValue) =>
                      setMultiSelectedUser(newValue)
                    }
                    name="name"
                    getOptionLabel={(option) => option.name}
                    defaultValue={multiSelectedUser || {}}
                    mappingLabel="name"
                  />
                  <TextLabel
                    fontSize={"12px"}
                    color={"red"}
                    fontWeight={"400"}
                    title={
                      multiSelectedUser.length === 0 ? error?.selectUser : ""
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <CommonTextField
                    fontWeight={400}
                    text={"Another User"}
                    placeholder={"ex. test1@gmail.com, test2@gmail.com"}
                    type="text"
                    name="anotherUser"
                    value={data?.anotherUser || ""}
                    onChange={(e) => handleChange(e, false)}
                  />
                  <TextLabel
                    fontSize={"12px"}
                    color={"red"}
                    fontWeight={"400"}
                    title={!data?.anotherUser ? error?.anotherUser : ""}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <CommonTextField
                    fontWeight={400}
                    text={"Title"}
                    placeholder={"Enter Title"}
                    type="text"
                    name="title"
                    value={data?.title || ""}
                    onChange={(e) => handleChange(e, false)}
                  />
                  <TextLabel
                    fontSize={"12px"}
                    color={"red"}
                    fontWeight={"400"}
                    title={!data?.title ? error?.title : ""}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextEditor
                    // value={description}
                    category={"Description"}
                    onChange={(value) => {
                      console.log(value, "value");
                      setDescription(value);
                    }}
                  />
                  <TextLabel
                    fontSize={"12px"}
                    color={"red"}
                    fontWeight={"400"}
                    title={!data?.description ? error?.description : ""}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TextLabel
                      fontSize={"15px"}
                      color={"#151D48"}
                      fontWeight={"400"}
                      title={"Upload Image"}
                    />
                  </Grid>
                  <FileUpload
                    handleFileChange={(e) => {
                      console.log(e.target.files, "e.target.files");
                      handleUpload(e.target.files[0], "image");
                    }}
                    selectedFile={imageData}
                    OnDelate={() => handleDeleteFile("image")}
                    acceptFile="image/png, image/gif, image/jpeg"
                  />
                  {/* <TextLabel
                    fontSize={"12px"}
                    color={"red"}
                    fontWeight={"400"}
                    title={!imageData ? error?.selectImage : ""}
                  /> */}
                  <TextLabel
                    fontSize={"12px"}
                    color={"red"}
                    fontWeight={"400"}
                    title={error?.imageSizeValid}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TextLabel
                      fontSize={"15px"}
                      color={"#151D48"}
                      fontWeight={"400"}
                      title={"Upload PDF"}
                    />
                  </Grid>
                  <FileUpload
                    text={"Upload PDF"}
                    handleFileChange={(e) => {
                      console.log(e.target.files[0], "e.target.files");
                      handleUpload(e.target.files[0], "pdf");
                    }}
                    selectedFile={pdfData}
                    OnDelate={() => handleDeleteFile("pdf")}
                    acceptFile="application/pdf"
                  />
                  {/* <TextLabel
                    fontSize={"12px"}
                    color={"red"}
                    fontWeight={"400"}
                    title={!pdfData ? error?.selectPdf : ""}
                  /> */}
                  <TextLabel
                    fontSize={"12px"}
                    color={"red"}
                    fontWeight={"400"}
                    title={error?.pdfSizeValid}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Box display={"flex"} justifyContent={"center"} mt={"35px"}>
                    <CommonButton
                      width={"30%"}
                      text={`Send`}
                      type="submit"
                      onClick={() => _sendEmail()}
                    />
                  </Box>
                </Grid>
              </Grid>
            ) : (
              <>
                {getEmailData?._id ? (
                  <Box>
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      mb={1}
                    >
                      <Box display={"flex"} gap={1} alignItems={"center"}>
                        <Avatar sx={{ height: "58px", width: "58px" }} />
                        <Box>
                          <SectionHeading
                            variant={"h6"}
                            title={getEmailData?._id}
                          />
                          <SectionHeading
                            fontWeight={"400"}
                            variant={"subtitle2"}
                            title={getEmailData?.title}
                          />
                        </Box>
                      </Box>
                      <SectionHeading
                        fontWeight={"400"}
                        variant={"subtitle2"}
                        color={lightTheme.palette.bgLightExtraLightGray.main}
                        title={"Jul 19, 2022, 10:20 PM"}
                      />
                    </Box>
                    <Box mt={8} mb={4} minHeight={"35vh"}>
                      <TextLabel
                        fontSize={"15px"}
                        color={lightTheme.palette.bgLightExtraLightGray.main}
                        variant={"body2"}
                        title={
                          <div
                            dangerouslySetInnerHTML={{
                              __html: getEmailData?.content,
                            }}
                          />
                        }
                      />
                    </Box>
                    <Box display={"flex"} flexDirection={"column"} gap={"15px"}>
                      {console.log("getEmailData😲", getEmailData)}
                      {getEmailData.image && (
                        <Box display={"flex"} gap={1}>
                          <Assets
                            src={"/assets/image/projectDetail.png"}
                            absolutePath={true}
                          />
                          <Box>
                            <TextLabel
                              className={classes.wordBreak}
                              fontWeight={"600"}
                              variant={"body2"}
                              title={getEmailData?.image}
                            />
                            <TextLabel
                              variant={"body2"}
                              fontWeight={"600"}
                              color={
                                lightTheme.palette.bgLightExtraLightGray.main
                              }
                              title={"1.50 Mb"}
                            />
                          </Box>
                        </Box>
                      )}
                      {getEmailData.pdf && (
                        <Box display={"flex"} gap={1}>
                          <Assets
                            src={"/assets/image/screenShot.png"}
                            absolutePath={true}
                          />
                          <Box>
                            <TextLabel
                              className={classes.wordBreak}
                              fontWeight={"600"}
                              variant={"body2"}
                              title={getEmailData?.pdf}
                            />
                            <TextLabel
                              variant={"body2"}
                              fontWeight={"600"}
                              color={
                                lightTheme.palette.bgLightExtraLightGray.main
                              }
                              title={"1.50 Mb"}
                            />
                          </Box>
                        </Box>
                      )}
                      <Box
                        display={"flex"}
                        justifyContent={"end"}
                        alignItems={"start"}
                        gap={2}
                      >
                        <Assets
                          src={"/assets/icons/trash.png"}
                          absolutePath={true}
                          onClick={() => _deleteEmail(getEmailData?._id)}
                        />
                        <Assets
                          src={"/assets/icons/star.png"}
                          absolutePath={true}
                        />
                        <Assets
                          src={"/assets/icons/share.png"}
                          absolutePath={true}
                        />
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  <DataNotFound />
                )}
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Email;
