import React from 'react'
import TextLabel from '../../Components/Common/Fields/TextLabel';
import { Box, Grid, useTheme } from '@mui/material';
import CommonButton from '../../Components/Common/Button/CommonButton';
import CommonTextField from '../../Components/Common/Fields/TextField';
import TextEditor from '../Common/textEditor';
import FileUpload from '../Common/uploadButton';

const AddOffer = ({ data, setData, error, handleChange, isEdit, onSubmit, handleImageUpload }) => {
    const theme = useTheme()
    return (
        <>
            <Box>
                <Grid container spacing={1} xs={12} md={12} lg={12} sm={12} p={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextLabel fontSize={"15px"} color={"#151D48"} fontWeight={"400"} title={'Title for Image Upload'} style={{ padding: '3px' }} />
                        </Grid>
                        <FileUpload
                            handleFileChange={(e) => handleImageUpload(e.target.files[0], "Edit")}
                            selectedFile={data?.image}
                        />
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
                        <TextEditor
                            category={"Description"}
                            onChange={(value) => setData({ ...data, description: value })}
                        // valid={true}
                        />
                        <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.description ? error?.description : ""} />
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