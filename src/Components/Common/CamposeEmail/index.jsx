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
import { makeStyles } from "tss-react/mui";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SendIcon from "@mui/icons-material/Send";
import StarIcon from "@mui/icons-material/Star";
import SectionHeading from "../SectionHeading";
import AutoCompleteMultiSelect from "../AutoCompleteMultiSelect";
import DataNotFound from "../DataNotFound";
import FileUpload from "../uploadButton";
import TextEditor from "../textEditor";
import CommonTextField from "../Fields/TextField";
import CommonButton from "../Button/CommonButton";
import TextLabel from "../Fields/TextLabel";
import Assets from "../ImageContainer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { lightTheme } from "../../../theme";
import TableHeading from "../CommonTableHeading";
import { Regex } from "../../../Utils/regex";

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

const CamposeEmail = ({
  emailForm,
  setEmailForm,
  users,
  setUsers,
  multiSelectedUser,
  setMultiSelectedUser,
  error,
  setError,
  handleChange,
  data,
  setData,
  description,
  setDescription,
  getEmailData,
  setGetEmailData,
  pdfData,
  setPdfData,
  imageData,
  setImageData,
  handleUpload,
  handleDeleteFile,
  _sendEmail,
  _deleteEmail,
  resetEmailData,
}) => {
  const { classes } = useStyles();
  return (
    <>
      <Grid item xs={12} sm={12} md={7} lg={7}>
        <Box padding={2} className={classes.emailContain}>
          {emailForm ? (
            <Grid container spacing={1} xs={12} p={1}>
              {window.innerWidth <= 900 && (
                <Box
                  ml={1}
                  onClick={() => {
                    setEmailForm(false);
                  }}
                >
                  {/* <Fab
                    color="primary"
                    size="small"
                    onClick={() => {
                      setEmailForm(false);
                    }}
                  > */}
                  <ArrowBackIcon />
                  {/* </Fab> */}
                </Box>
              )}
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
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <AutoCompleteMultiSelect
                  fullWidth
                  text="Select User"
                  options={users?.response || []}
                  placeholder={"Select User"}
                  handleChange={(e, newValue) => setMultiSelectedUser(newValue)}
                  name="name"
                  getOptionLabel={(option) => option.name}
                  defaultValue={multiSelectedUser || {}}
                  mappingLabel="name"
                />
                <TextLabel
                  fontSize={"12px"}
                  color={"red"}
                  fontWeight={"400"}
                  title={(multiSelectedUser.length <= 0 && !data?.anotherUser) ? error?.selectUser : ""}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <CommonTextField
                  fontWeight={400}
                  text={"Another User"}
                  placeholder={"ex. test1@gmail.com, test2@gmail.com"}
                  type="text"
                  name="anotherUser"
                  value={data?.anotherUser || ""}
                  onChange={(e) => handleChange(e, false)}
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
                  defaultValue={data?.description}
                  category={"Description"}
                  onChange={(value) => { setDescription(value) }}
                />
                <TextLabel
                  fontSize={"12px"}
                  color={"red"}
                  fontWeight={"400"}
                  title={!description || description === "<p><br></p>" ? error?.description : ""}
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
                    width={"200px"}
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
                  {window.innerWidth <= 900 && (
                    <Box
                      mb={1}
                      onClick={() => {
                        resetEmailData();
                      }}
                    >
                      <ArrowBackIcon />
                    </Box>
                  )}
                  <Box display={"flex"} justifyContent={"space-between"} mb={1}>
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
                      <Fab
                        size="small"
                        onClick={() => _deleteEmail(getEmailData?._id)}
                      // onClick={()=> handleDeleteFile(getEmailData?._id)}
                      >
                        <DeleteForeverIcon />
                      </Fab>
                      <Fab size="small">
                        <StarIcon />
                      </Fab>
                      <Fab size="small">
                        <SendIcon />
                      </Fab>
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
    </>
  );
};

export default CamposeEmail;
