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

const useStyles = makeStyles()((theme) => {
    return {
        card: {
            padding: '15px',
            maxWidth: 300,
            borderRadius: '20px',
            border: '1px solid #F8F9FA',
            boxShadow: '0px 4px 20px 0px rgba(238, 238, 238, 0.50)',
            background: '#f7f7f7'
        }
    };
});

const OfferPage = () => {
    const { classes } = useStyles();
    const { OnUpdateError, toggleLoader, onUpdateUser, updateToken } = useAppContext();

    const [model, setModel] = useState(false);
    const [data, setData] = useState({})
    const [error, setError] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
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
        if (!data?.subTitle) {
            formIsValid = false
            errors['subTitle'] = 'Please enter subTitle.'
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
    };

    const handleLoginClick = () => {
        setIsSubmit(true)
        if (handleValidation()) {

        }
    }

    const _getOffer = () => {
        toggleLoader();
        axios.get("admin/offer").then((res) => {
            if (res?.data?.data) {
                console.log("resasdasd", res?.data?.data);
                setOfferDetails(res?.data?.data)
            }
            toggleLoader();
        }).catch((err) => {
            toggleLoader();
            OnUpdateError(err.data.message);
        }
        );
    }
    React.useEffect(() => {
        _getOffer()
    }, [])
    console.log(offerDetails, "offerDetails")
    return (
        <>
            <PaperContainer elevation={0} square={false}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <TableHeading title="Offer" removeSearchField buttonText={'Add Offer'} onClick={() => setModel(true)} />
                    </Grid>
                    {
                        offerDetails?.response?.length > 0 && offerDetails?.response?.map((item) => {
                            return (
                                <Grid item lg={3} >
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
                                    </Card>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </PaperContainer>


            <CommonModal open={model} onClose={() => setModel(false)} title={"Add New User"}
                content={
                    <Box>
                        <Grid container spacing={1} xs={12} md={12} lg={12} sm={12} p={2}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <TextLabel fontSize={"15px"} color={"#151D48"} fontWeight={"400"} title={'Title for Image Upload'} style={{ padding: '3px' }} />
                                </Grid>
                                <input
                                    style={{
                                        border: '1px solid #EDF2F6',
                                        padding: '14px',
                                        borderRadius: '10px',
                                        width: '100%',
                                    }}
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={(e) => handleInputChange(e, true)}
                                />
                                {data.image && (
                                    <img src={URL.createObjectURL(data.image)} alt="Selected" style={{ maxWidth: '50%', marginTop: '10px' }} />
                                )}
                                <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.image ? error?.image : ""} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <CommonTextField
                                    fontWeight={400}
                                    text={'Title'}
                                    placeholder={"Enter Title"}
                                    type='text'
                                    name='title'
                                    value={data?.title}
                                    onChange={(e) => handleChange(e, false)}
                                />
                                <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.title ? error?.title : ""} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <CommonTextField
                                    fontWeight={400}
                                    text={'SubTitle'}
                                    placeholder={"Enter SubTitle"}
                                    type='text'
                                    name='subTitle'
                                    value={data?.subTitle}
                                    onChange={(e) => handleChange(e, false)}
                                />
                                <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.subTitle ? error?.subTitle : ""} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '35px' }}>
                                    <CommonButton
                                        width={'60%'}
                                        text="Add Offer"
                                        type="submit"
                                        onClick={handleLoginClick}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                }
            />
        </>
    )
}

export default OfferPage