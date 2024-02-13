import React from 'react'
import { Box, Grid, Tab, Tabs, Typography, useTheme } from '@mui/material'
import CommonTextField from '../../Components/Common/Fields/TextField';
import { globalAmountConfig } from '../../Utils/globalConfig';
import TextLabel from '../../Components/Common/Fields/TextLabel';
import { makeStyles } from "tss-react/mui";
import CommonButton from '../../Components/Common/Button/CommonButton';

const useStyles = makeStyles()((theme) => {
    return {
        paddedRow: {
            padding: '15px 10px',
        },
        customGridItem: {
            paddingTop: '0px !important', // Adjust the margin top as needed
        },
        customTab: {
            "& .MuiTabs-root": {
                padding: '0px !important'
            }
        }
    };
});

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 0 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const SettleUpModel = ({ selectedReminder, handleTabChange, tab, handleChange, data, submitForReturn, submitForInvestment, setError, error }) => {
    //Hooks
    const { classes } = useStyles();
    const theme = useTheme()
    return (
        <Grid container xs={12} md={12} lg={12} sm={12} p={1}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box sx={{ bgcolor: 'background.paper' }}>
                    <Tabs value={tab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto" >
                        <Tab label="Return">1asdaaaaaaaaaaaaaaaaasdas23</Tab>
                        <Tab label="Investment" >456</Tab>
                    </Tabs>
                    <TabPanel value={tab} index={0}>
                        <Grid item container spacing={1} xs={12} md={12} lg={12} sm={12} p={2}>
                            <Grid item xs={12} sm={12} md={6} lg={4} className={classes.customGridItem}>
                                <CommonTextField
                                    fontWeight={400}
                                    text={'Investment Amount'}
                                    placeholder={"Enter Investment"}
                                    type='text'
                                    name='investment'
                                    value={globalAmountConfig(data?.investment || 0)}
                                    onChange={(e) => handleChange(e)}
                                    disabled
                                />
                                <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.investment ? error?.investment : ""} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={4} className={classes.customGridItem}>
                                <CommonTextField
                                    fontWeight={400}
                                    text={'Invested Days'}
                                    placeholder={"Enter Investment Days"}
                                    type='number'
                                    name='investmentDays'
                                    value={data?.investmentDays}
                                    onChange={(e) => handleChange(e)}
                                    disabled
                                />
                                <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.investmentDays ? error?.investmentDays : ""} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={4} className={classes.customGridItem}>
                                <CommonTextField
                                    fontWeight={400}
                                    text={'Return Of Investment (%)'}
                                    placeholder={"Enter Return Of Investment"}
                                    type='number'
                                    name='returnOfInvestment'
                                    value={data?.returnOfInvestment}
                                    onChange={(e) => handleChange(e)}
                                    disabledE
                                />
                                <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.returnOfInvestment ? error?.returnOfInvestment : ""} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} >
                                <Box display={'flex'} justifyContent={'flex-end'} marginTop={1}>
                                    <CommonButton
                                        // width={'90px'}
                                        text={`Apply For Return`}
                                        // padding={"2px 2px"}
                                        fontSize='12px'
                                        onClick={submitForReturn}
                                        background={theme.palette.bgLightBlue2.main}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={tab} index={1}>
                        Item Two
                    </TabPanel>
                </Box>
            </Grid>
        </Grid>
    )
}

export default SettleUpModel