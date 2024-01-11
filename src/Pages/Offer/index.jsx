import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import TextLabel from "../../Components/Common/Fields/TextLabel";
import { makeStyles } from "tss-react/mui";
import { Box, Divider, Grid, Typography } from "@mui/material";
import TableHeading from "../../Components/Common/CommonTableHeading";
import CommonModal from "../../Components/Common/CommonModel";
import axios, { Image_BASE_URL } from "../../APiSetUp/axios";
import swal from "sweetalert";
import { useAppContext } from "../../Context/context";
import AddOffer from "../../Components/Offer";
import Assets from "../../Components/Common/ImageContainer";
import { lightTheme } from "../../theme";
import PaperContainer from "../../Components/Common/PaperContainer";

const useStyles = makeStyles()((theme) => {
  return {
    card: {
      padding: "20px",
      borderRadius: "16px",
      border: "1px solid #F8F9FA",
      boxShadow: "0px 4px 20px 0px rgba(238, 238, 238, 0.50)",
      background: "#FFF",
    },
    writeBox: {
      borderRadius: "6px",
      height: "35px",
      width: "35px",
      padding: "8px",
      backgroundColor: lightTheme.palette.bgLightExtraPrimary.main,
      color: lightTheme.palette.primary.main,
      cursor: "pointer",
    },
    deleteBox: {
      height: "35px",
      width: "35px",
      borderRadius: "6px",
      padding: "8px",
      color: lightTheme.palette.bgLightRed.main,
      backgroundColor: lightTheme.palette.bgLightExtraRed.main,
      cursor: "pointer",
    },
    cardImage: {
      height: "150px",
      border: "1px solid #EDF2F6",
      borderRadius: "16px",
      backgroundPosition: "top center",
    },
    cardContent: {
      display: "flex",
      justifyContent: "space-between",
      padding: "15px 5px",
      gap: "5px",
    },
    cardDescription: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: 4,
      minHeight: "70px",
    },
  };
});

const OfferPage = () => {
  const { classes } = useStyles();
  const { OnUpdateError, toggleLoader } = useAppContext();
  const [model, setModel] = useState(false);
  const [data, setData] = useState({});
  const [error, setError] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [offerDetails, setOfferDetails] = React.useState([]);
  const [description, setDescription] = useState("<p><br></p>");

  //Validation
  const handleValidation = () => {
    let formIsValid = true;
    let errors = {};
    if (!data?.image) {
      formIsValid = false;
      errors["image"] = "Please upload image.";
    }
    if (!data?.title) {
      formIsValid = false;
      errors["title"] = "Please enter title.";
    }
    // if (!description ) {
    //     formIsValid = false;
    //     errors["description"] = "Please enter description.";
    //   }
    if (!data?.description) {
      formIsValid = false;
      errors["description"] = "Please enter description.";
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

  const handleImageUpload = async (val, key) => {
    const formData = new FormData();
    formData.append("image", val);
    toggleLoader();
    axios
      .post("/upload/image/attachment", formData)
      .then((res) => {
        if (res?.data?.data) {
          setData((prevData) => ({
            ...prevData,
            ["image"]: res?.data?.data?.image,
          }));
        }
        toggleLoader();
      })
      .catch((err) => {
        toggleLoader();
        OnUpdateError(err.data.message);
      });
  };

  const _getOffer = () => {
    toggleLoader();
    axios
      .get("offer")
      .then((res) => {
        if (res?.data?.data) {
          setOfferDetails(res?.data?.data);
        }
        toggleLoader();
      })
      .catch((err) => {
        toggleLoader();
        OnUpdateError(err.data.message);
      });
  };

  const _handleDelete = () => {
    if (deleteId) {
      toggleLoader();
      axios
        .delete(`/offer/delete/${deleteId}`)
        .then((res) => {
          swal(res?.data?.message, { icon: "success", timer: 5000 });
          toggleLoader();
          setDeleteId("");
          _getOffer();
        })
        .catch((err) => {
          toggleLoader();
          OnUpdateError(err.data.message);
        });
    }
  };

  const _addUpdateOffer = () => {
    if (handleValidation()) {
      toggleLoader();
      let body = {
        image: data?.image,
        title: data?.title,
        description: description,
      };
      console.log("body", body);
      if (data?._id) {
        body.id = data?._id;
      }
      axios
        .post(`offer/${data?._id ? "update" : "create"}`, body)
        .then((res) => {
          if (res?.data?.data) {
            swal(res?.data?.message, { icon: "success", timer: 5000 });
            setModel(false);
            setData({});
            setError({});
            setDescription("");
            setIsEdit(false);
            _getOffer();
          }
          toggleLoader();
        })
        .catch((err) => {
          toggleLoader();
          OnUpdateError(err.data.message);
        });
    }
  };

  React.useEffect(() => {
    _getOffer();
  }, []);

  return (
    <>
      <PaperContainer elevation={0} square={false}>
        <Grid item xs={12}>
          <TableHeading
            title="Offer"
            removeSearchField
            buttonText={"Add Offer"}
            onClick={() => setModel(true)}
          />
        </Grid>
        <Grid
          container
          spacing={4}
          style={{ marginBottom: "50px", padding: "30px" }}
        >
          {offerDetails?.response?.length > 0 &&
            offerDetails?.response?.map((item) => {
              return (
                <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardImage}
                      image={`${Image_BASE_URL}${item?.image}`}
                      title="green iguana"
                    />
                    <CardContent className={classes.cardContent}>
                      <TextLabel
                        fontSize={"18px"}
                        color={"#000"}
                        fontWeight={"600"}
                        title={item?.title}
                      />
                      <Box display={"flex"} justifyContent={"end"} gap={1}>
                        <Assets
                          className={classes.writeBox}
                          src={"/assets/icons/write.svg"}
                          absolutePath={true}
                          onClick={() => {
                            setData(item);
                            setIsEdit(true);
                            setDescription(item?.description);
                            setModel(true);
                          }}
                        />
                        <Assets
                          className={classes.deleteBox}
                          src={"/assets/icons/delete.svg"}
                          absolutePath={true}
                          onClick={() => {
                            setDeleteId(item?._id);
                            _handleDelete();
                          }}
                        />
                      </Box>
                    </CardContent>
                    <TextLabel
                      className={classes.cardDescription}
                      variant={"body2"}
                      color={lightTheme.palette.bgLightExtraLightGray.main}
                      fontWeight={"400"}
                      title={
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item?.description,
                          }}
                        />
                      }
                    />
                    
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </PaperContainer>

      <CommonModal
        open={model}
        onClose={() => {
          setModel(false);
          setData({});
          setError({});
          setIsEdit(false);
        }}
        title={`${isEdit ? "Update" : "Add"} Offer`}
        content={
          <AddOffer
            data={data}
            setData={setData}
            error={error}
            handleChange={handleChange}
            onSubmit={_addUpdateOffer}
            isEdit={isEdit}
            handleImageUpload={handleImageUpload}
            description={description}
            setDescription={setDescription}
          />
        }
      />
    </>
  );
};

export default OfferPage;
