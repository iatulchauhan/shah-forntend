import React from 'react'
import TextLabel from '../../Components/Common/Fields/TextLabel';
import { Box, Grid } from '@mui/material';
import CommonButton from '../../Components/Common/Button/CommonButton';
import CommonTextField from '../../Components/Common/Fields/TextField';
import { Image_BASE_URL } from '../../APiSetUp/axios';
import MUIRichTextEditor from 'mui-rte';
import { lightTheme } from '../../theme';


const AddOffer = ({ data, setData, error, handleChange, isEdit, onSubmit, handleImageUpload }) => {
    return (
        <>
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
                            onChange={(e) => handleImageUpload(e.target.files[0], "Edit")}
                        />
                        {data.image && (
                            <img src={`${Image_BASE_URL}${data?.image}`} alt="Selected" style={{ maxWidth: '50%', marginTop: '10px' }} />
                            // <img src={URL.createObjectURL(data?.image)} alt="Selected" style={{ maxWidth: '50%', marginTop: '10px' }} />
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
                            text={'Description'}
                            placeholder={"Enter Description"}
                            type='text'
                            name='description'
                            value={data?.description}
                            onChange={(e) => handleChange(e, false)}
                        />
                        <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.description ? error?.description : ""} />
                        <MUIRichTextEditor />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '35px' }}>
                            <CommonButton
                                width={'60%'}
                                text={`${isEdit ? "Update" : "Create"} Offer`}
                                type="submit"
                                onClick={onSubmit}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default AddOffer