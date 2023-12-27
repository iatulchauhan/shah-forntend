import { Avatar, Box, Divider, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CommonSearch from '../../Components/Common/CommonSearch';
import SectionHeading from '../../Components/Common/SectionHeading'
import TableHeading from '../../Components/Common/CommonTableHeading';
import TextLabel from '../../Components/Common/Fields/TextLabel';
import Assets from '../../Components/Common/ImageContainer';
import { lightTheme } from '../../theme';
import CommonButton from '../../Components/Common/Button/CommonButton';
import CommonTextField from '../../Components/Common/Fields/TextField';
import TextEditor from '../../Components/Common/textEditor';
import AutoCompleteSearch from '../../Components/Common/commonAutoComplete';
import FileUpload from '../../Components/Common/uploadButton';
import axios, { Image_BASE_URL } from "../../APiSetUp/axios";
import { useAppContext } from '../../Context/context';
import AutoCompleteMultiSelect from '../../Components/Common/AutoCompleteMultiSelect';
import swal from 'sweetalert';

const EmailData = [
    {
        heading: "Lorem Ipsum Dolor",
        name: "John Doe",
        time: "12 min ago",
        data: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type...",
    },
    {
        heading: "Lorem Ipsum Dolor",
        name: "John Doe",
        time: "12 min ago",
        data: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type...",
    },
]

const Email = () => {
    const { OnUpdateError, toggleLoader } = useAppContext();
    const [data, setData] = useState();
    const [user, setUser] = useState([]);
    const [multiSelectedUser, setMultiSelectedUser] = useState([]);
    const [imageData, setImageData] = useState()
    const [pdfData, setPdfData] = useState()
    const [error, setError] = useState({})
    const [emailsList, setEmailsList] = useState()



    const handleChange = (e) => {
        const { name, value } = e.target
        setData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleValidation = () => {
        let formIsValid = true
        let errors = {}
        if (multiSelectedUser.length === 0) {
            formIsValid = false;
            errors['selectUser'] = 'Please select User.';
        }
        // if (!data?.anotherUser) {
        //     formIsValid = false
        //     errors['anotherUser'] = 'Please enter address.'
        // }
        if (!data?.title) {
            formIsValid = false
            errors['title'] = 'Please enter title.'
        }
        if (!data?.description || data.description.trim() === '') {
            formIsValid = false;
            errors['description'] = 'Please enter description.';
        }
        if (!imageData) {
            formIsValid = false
            errors['selectImage'] = 'Please select Image.'
        }
        if (!pdfData) {
            formIsValid = false
            errors['selectPdf'] = 'Please enter selectPdf.'
        }
        setError(errors)
        return formIsValid
    }

    const _getUsers = () => {
        toggleLoader();
        axios.post('admin/users',).then((res) => {
            if (res?.data?.data) {
                setUser(res?.data?.data)
            }
            toggleLoader();
        }).catch((err) => {
            toggleLoader();
            OnUpdateError(err.data.message);
        }
        );
    }

    const handleImageUpload = async (val, key) => {
        const formData = new FormData();
        formData.append("image", val)
        toggleLoader();
        axios.post("/upload/image/attachment", formData).then((res) => {
            if (res?.data?.data) {
                if (key === "Edit") {
                    setImageData(res?.data?.data?.image)
                }
                else {
                    setImageData(res?.data?.data)
                }
            }
            toggleLoader();
        }).catch((err) => {
            toggleLoader();
            OnUpdateError(err.data.message);
        }
        );
    };

    const handleDeleteImage = () => {
        let body = {
            "url": imageData,
        }
        axios.post(`/upload/delete_file`, body)
            .then((res) => {
                swal(res?.data?.message, { icon: "success", timer: 5000, })
                setImageData(null);
            })
            .catch((err) => {
                OnUpdateError(err.data.message);
            });
    };

    const handlePdfUpload = async (val, key) => {
        const formData = new FormData();
        formData.append("image", val)
        toggleLoader();
        axios.post("/upload/image/attachment", formData).then((res) => {
            if (res?.data?.data) {
                if (key === "Edit") {
                    setPdfData(res?.data?.data?.image)
                }
                else {
                    setPdfData(res?.data?.data)
                }
            }
            toggleLoader();
        }).catch((err) => {
            toggleLoader();
            OnUpdateError(err.data.message);
        }
        );
    };

    const handleDeletePdf = () => {
        let body = {
            "url": pdfData,
        }
        axios.post(`/upload/delete_file`, body)
            .then((res) => {
                swal(res?.data?.message, { icon: "success", timer: 5000, })
                setPdfData(null);
            })
            .catch((err) => {
                OnUpdateError(err.data.message);
            });
    };


    const _sendEmail = () => {
        if (handleValidation()) {
            toggleLoader();
            const selectedUserEmail = multiSelectedUser?.map((item) => item.email)
            const anotherUserEmail = data?.anotherUser?.split(",").map(email => email.trim());

            let body = {
                "emails": [...selectedUserEmail, ...anotherUserEmail],
                "title": data?.title,
                "content": data?.description,
                "pdf": imageData,
                "image": pdfData
            }
            axios.post(`admin/send_email`, body)
                .then((res) => {
                    if (res?.data?.data) {
                    }
                    toggleLoader();
                }).catch((err) => {
                    toggleLoader();
                    OnUpdateError(err.data.message);
                }
                );
        }
    }

    const _getEmailsList = () => {
        let body = {

        }
        axios.post(`admin/emails_list`, body)
            .then((res) => {
                if(res?.data?.data){
                    setEmailsList(res?.data?.data)
                    console.log('res?.data?.data😯', res?.data?.data)
                }
            }).catch((err) => {
                toggleLoader();
                OnUpdateError(err.data.message);
            })

    }

    useEffect(() => {
        _getUsers()
        _getEmailsList()
    }, [])

    return (
        <>
            <Grid container spacing={0} style={{ marginLeft: '0px' }}>
                <Grid item xs={4} sm={4} md={4} lg={4} padding={2}
                    sx={{ background: "var(--LightGrey, #F9FAFB)" }}
                >
                    {emailsList?.response?.map((data) => {
                        return (
                            <Box padding={4} mt={1} pe={3}
                                sx={{
                                    background: lightTheme.palette.bgWhite.main,
                                    borderRadius: '20px',
                                    border: '1px solid #F8F9FA',
                                    boxShadow: '0px 4px 20px 0px rgba(238, 238, 238, 0.50)',
                                    alignItems: 'center',
                                }}>
                                <Box display={'flex'} justifyContent={"space-between"} mb={1}>
                                    <Box display={'flex'} gap={1} alignItems={"center"}>
                                        <Avatar />
                                        <Box>
                                            <SectionHeading variant={"caption"} title={data.createdBy} />
                                            <SectionHeading variant={"caption"} title={data.title} color={lightTheme.palette.bgLightExtraLightGray.main} />
                                        </Box>
                                    </Box>
                                    <SectionHeading variant={"caption"} color={lightTheme.palette.bgLightExtraLightGray.main} title={data.time} />
                                </Box>
                                <Box>
                                    <TextLabel variant={"body2"} color={lightTheme.palette.bgLightExtraLightGray.main} fontWeight={"400"} title={data.content} />
                                </Box>
                            </Box>
                        )
                    })}
                </Grid>
                <Grid item xs={8} sm={8} md={8} lg={8}>
                    <Box padding={2} sx={{ background: 'var(--White, #FFF)' }}>
                        <Grid item xs={12} display={"flex"} justifyContent={"end"} mb={2}>
                            <CommonButton text={"New Message"} />
                        </Grid>

                        <Grid container spacing={2} xs={12} md={12} lg={12} sm={12} p={2}>

                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <AutoCompleteMultiSelect
                                    fullWidth
                                    text="Select User"
                                    placeholder={"Select User"}
                                    handleChange={(e, newValue) => setMultiSelectedUser(newValue)}
                                    options={user?.response || []}
                                    name="selectUser"
                                    getOptionLabel={(option) => option?.name}
                                    defaultValue={multiSelectedUser || {}}
                                />
                                <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={(multiSelectedUser.length === 0) ? error?.selectUser : ""} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <CommonTextField
                                    fontWeight={400}
                                    text={'Another User'}
                                    placeholder={"ex. test1@gmail.com, test2@gmail.com"}
                                    type='text'
                                    name='anotherUser'
                                    value={data?.anotherUser}
                                    onChange={(e) => handleChange(e, false)}
                                />
                                {/* <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.anotherUser ? error?.anotherUser : ""} /> */}
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
                                <TextEditor
                                    category={"Description"}
                                    onChange={(value) => setData({ ...data, description: value })}
                                    valid={true}
                                />
                                <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.description ? error?.description : ""} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <TextLabel fontSize={"15px"} color={"#151D48"} fontWeight={"400"} title={'Upload Image'} style={{ padding: '3px' }} />
                                </Grid>
                                <FileUpload
                                    handleFileChange={(e) => handleImageUpload(e.target.files[0], "Edit")}
                                    selectedFile={imageData}
                                    OnDelate={handleDeleteImage}
                                />
                                <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!imageData ? error?.selectImage : ""} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <TextLabel fontSize={"15px"} color={"#151D48"} fontWeight={"400"} title={'Upload PDF'} style={{ padding: '3px' }} />
                                </Grid>
                                <FileUpload
                                    text={"Upload PDF"}
                                    handleFileChange={(e) => handlePdfUpload(e.target.files[0], "Edit")}
                                    selectedFile={pdfData}
                                    OnDelate={handleDeletePdf}
                                />
                                <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!pdfData ? error?.selectPdf : ""} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '35px' }}>
                                    <CommonButton
                                        width={'30%'}
                                        text={`Send`}
                                        type="submit"
                                        onClick={() => _sendEmail()}
                                    />
                                </Box>
                            </Grid>
                        </Grid>

                        {/* <Box display={'flex'} justifyContent={"space-between"} mb={1}>
                            <Box display={'flex'} gap={1} alignItems={"center"}>
                                <Avatar sx={{ height: "58px", width: "58px" }} />
                                <Box>
                                    <SectionHeading variant={"h6"} title={"Lorem Ipsum Dolor"} />
                                    <SectionHeading fontWeight={"400"} variant={"subtitle2"} title={"John Doe to Dianna Smiley"} />
                                </Box>
                            </Box>
                            <SectionHeading fontWeight={"400"} variant={"subtitle2"} color={lightTheme.palette.bgLightExtraLightGray.main} title={"Jul 19, 2022, 10:20 PM"} />
                        </Box>
                        <Box mt={8} mb={4} >
                            <TextLabel fontSize={"15px"} color={lightTheme.palette.bgLightExtraLightGray.main} variant={"body2"} title={' Hi Dianna Smiley,'} />
                            <br />
                            <TextLabel fontSize={"15px"} color={lightTheme.palette.bgLightExtraLightGray.main} variant={"body2"} title={"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularized in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."} />
                            <br />
                            <TextLabel fontSize={"15px"} color={lightTheme.palette.bgLightExtraLightGray.main} variant={"body2"} title={" It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose."} />

                        </Box>
                        <Box display={"flex"} flexDirection={"column"} gap={"15px"}>
                            <Box display={'flex'} gap={1}>
                                <Assets
                                    src={"/assets/image/projectDetail.png"}
                                    absolutePath={true}
                                />
                                <Box>
                                    <SectionHeading variant={"caption"} title={"Projectdetails.pdf"} />
                                    <SectionHeading variant={"caption"} color={lightTheme.palette.bgLightExtraLightGray.main} title={"1.50 Mb"} />
                                </Box>
                            </Box>
                            <Box display={'flex'} gap={1} >
                                <Assets
                                    src={"/assets/image/screenShot.png"}
                                    absolutePath={true}
                                />
                                <Box>
                                    <SectionHeading variant={"caption"} title={"Projectdetails.pdf"} />
                                    <SectionHeading variant={"caption"} color={lightTheme.palette.bgLightExtraLightGray.main} title={"1.50 Mb"} />
                                </Box>
                            </Box>
                        </Box>
                        */}
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default Email;