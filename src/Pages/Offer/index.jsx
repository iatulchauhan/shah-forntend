import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import TextLabel from '../../Components/Common/Fields/TextLabel';
import { makeStyles } from "tss-react/mui";
import { Box, Grid, Typography } from '@mui/material';
import TableHeading from '../../Components/Common/CommonTableHeading';
import CommonButton from '../../Components/Common/Button/CommonButton';
import CommonTextField from '../../Components/Common/Fields/TextField';
import CommonModal from '../../Components/Common/CommonModel';
import PaperContainer from '../../Components/Common/PaperContainer';
import axios, { Image_BASE_URL } from "../../APiSetUp/axios";
import swal from 'sweetalert';
import { useAppContext } from '../../Context/context';
import AddOffer from '../../Components/Offer';
import Assets from '../../Components/Common/ImageContainer';
import { lightTheme } from '../../theme';

const useStyles = makeStyles()((theme) => {
    return {
        card: {
            padding: '15px',
            maxWidth: 300,
            borderRadius: '20px',
            border: '1px solid #F8F9FA',
            boxShadow: '0px 4px 20px 0px rgba(238, 238, 238, 0.50)',
            background: '#f7f7f7'
        },
        writeBox: {
            borderRadius: "6px",
            padding: "8px",
            backgroundColor: lightTheme.palette.bgLightExtraPrimary.main,
            color: lightTheme.palette.primary.main,
            cursor: "pointer",
        },
        deleteBox: {
            borderRadius: "6px",
            padding: "8px",
            color: lightTheme.palette.bgLightRed.main,
            backgroundColor: lightTheme.palette.bgLightExtraRed.main,
            cursor: "pointer",
        },
    };
});

const OfferPage = () => {
    const { classes } = useStyles();
    const { OnUpdateError, toggleLoader, onUpdateUser, updateToken } = useAppContext();

    const [model, setModel] = useState(false);
    const [data, setData] = useState({})
    const [error, setError] = useState({})
    const [isEdit, setIsEdit] = useState(false)
    const [deleteId, setDeleteId] = useState("")
    const [offerDetails, setOfferDetails] = React.useState([]);

    //Validation
    const handleValidation = () => {
        let formIsValid = true
        let errors = {}
        if (!data?.image) {
            formIsValid = false
            errors['image'] = 'Please upload image.'
        }
        if (!data?.title) {
            formIsValid = false
            errors['title'] = 'Please enter title.'
        }
        if (!data?.description) {
            formIsValid = false
            errors['description'] = 'Please enter description.'
        }
        setError(errors)
        return formIsValid
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleInputChange = (e, isImage) => {
        const { name, value, files } = e.target;

        setData((prevData) => ({
            ...prevData,
            [name]: isImage ? files[0] : value,
        }));
        handleImageUpload(files[0])
    };



    const handleImageUpload = async (val, key) => {
        const formData = new FormData();
        formData.append("image", val)
        toggleLoader();
        axios.post("/upload/image/attachment", formData).then((res) => {
            if (res?.data?.data) {
                if (key === "Edit") {
                    setData((prevData) => ({
                        ...prevData,
                        ["image"]: res?.data?.data?.image,
                    }));
                }
                else {
                    setOfferDetails(res?.data?.data)
                }
            }
            toggleLoader();
        }).catch((err) => {
            toggleLoader();
            OnUpdateError(err.data.message);
        }
        );
    };


    const _getOffer = () => {
        toggleLoader();
        axios.get("admin/offer").then((res) => {
            if (res?.data?.data) {
                setOfferDetails(res?.data?.data)
            }
            toggleLoader();
        }).catch((err) => {
            toggleLoader();
            OnUpdateError(err.data.message);
        }
        );
    }

    const _handleDelete = () => {
        if (deleteId) {
            toggleLoader();
            axios.delete(`/admin/offer/delete/${deleteId}`)
                .then((res) => {
                    swal(res?.data?.message, { icon: "success", timer: 5000, })
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
                "image": data?._id ? data?.image : offerDetails?.image,
                "title": data?.title,
                "description": data?.description,

            }
            console.log("body", body);
            if (data?._id) {
                body.id = data?._id
            }
            axios.post(`admin/offer/${data?._id ? "update" : "create"}`, body).then((res) => {
                if (res?.data?.data) {
                    swal(res?.data?.message, { icon: "success", timer: 5000, })
                    setModel(false)
                    setData({})
                    setError({})
                    setIsEdit(false)
                    _getOffer()
                    // navigate("/")
                }
                toggleLoader();
            }).catch((err) => {
                toggleLoader();
                OnUpdateError(err.data.message);
            }
            );
        }
    }

    React.useEffect(() => {
        _getOffer()
    }, [])

    return (
        <>
            <Grid container spacing={1} style={{ marginBottom: '50px' }}>
                <Grid item xs={12}>
                    <TableHeading title="Offer" borderBottom={"none"} removeSearchField buttonText={'Add Offer'} onClick={() => setModel(true)} />
                </Grid>
                {
                    offerDetails?.response?.length > 0 && offerDetails?.response?.map((item) => {
                        return (
                            <Grid item xs={12} sm={6} md={4} lg={3}  >
                                <Card className={classes.card}>
                                    <CardMedia
                                        sx={{ height: 140, padding: '21px' }}
                                        image={`${Image_BASE_URL}${item?.image}`}
                                        title="green iguana"
                                    />
                                    <CardContent>
                                        <TextLabel fontSize={"18px"} color={"#000"} fontWeight={"600"} title={item?.title} />
                                        <TextLabel fontSize={"12px"} color={"#737791"} fontWeight={"400"} title={item?.description} />
                                    </CardContent>
                                    <Box display={"flex"} justifyContent={"end"} gap={1}>
                                        <Assets
                                            className={classes.writeBox}
                                            src={"/assets/icons/write.svg"}
                                            absolutePath={true}
                                            onClick={() => { setData(item); setIsEdit(true); setModel(true) }}
                                        />
                                        <Assets
                                            className={classes.deleteBox}
                                            src={"/assets/icons/delete.svg"}
                                            absolutePath={true}
                                            onClick={() => { setDeleteId(item?._id); _handleDelete(); }}
                                        />
                                    </Box>
                                </Card>
                            </Grid>
                        )
                    })
                }
            </Grid>

            <CommonModal open={model}
                onClose={() => { setModel(false); setData({}); setError({}); setIsEdit(false) }}
                title={`${isEdit ? "Update" : "Add"} Offer`}
                content={
                    <AddOffer data={data} setData={setData} error={error} handleChange={handleChange} onSubmit={_addUpdateOffer} isEdit={isEdit} handleImageUpload={handleImageUpload} />
                }
            />
        </>
    )
}

export default OfferPage