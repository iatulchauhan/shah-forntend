import React, { useEffect, useState } from 'react'
import { Box, Grid, TextField, } from "@mui/material";
import TextLabel from '../../Components/Common/Fields/TextLabel';
import CommonTextField from '../../Components/Common/Fields/TextField';
import CommonButton from '../../Components/Common/Button/CommonButton';

const AddMeeting = ({ data, setData, error, handleChange, isEdit, onSubmit, }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    return (
        <Box>
            <Grid container spacing={1} xs={12} md={12} lg={12} sm={12} p={2}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <CommonTextField
                        fontWeight={400}
                        text={'Title'}
                        placeholder={"Enter Title"}
                        type='text'
                        name='Title'
                        value={data?.title}
                        onChange={(e) => handleChange(e, false)}
                    />
                    <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.title ? error?.title : ""} />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                    <CommonTextField
                        fontWeight={400}
                        text={'Title'}
                        placeholder={"Enter Title"}
                        type='text'
                        name='Title'
                        value={data?.title}
                        onChange={(e) => handleChange(e, false)}
                    />
                    <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.title ? error?.title : ""} />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '35px' }}>
                        <CommonButton
                            width={'60%'}
                            text={`${isEdit ? "Update" : "Create"} Meeting`}
                            type="submit"
                            onClick={onSubmit}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AddMeeting