import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import TextLabel from '../../Components/Common/Fields/TextLabel';
import { makeStyles } from "tss-react/mui";
import { Grid } from '@mui/material';
import { lightTheme } from '../../theme';

const useStyles = makeStyles()((theme) => {
    return {
        card: {
            padding: '15px',
            maxWidth: 300,
            borderRadius: '20px',
            border: '1px solid #F8F9FA',
            boxShadow: '0px 4px 20px 0px rgba(238, 238, 238, 0.50)',
            background: '#fff',
        },
        CardContent: {
            padding: "20px 0px",
            paddingBottom: "0px !important"
        }

    };
});

const ModifyPlan = () => {
    const { classes } = useStyles();
    return (
        <>
            <Grid container spacing={1}>
                <Grid item lg={3} >
                    <Card className={classes.card}>
                        <CardMedia
                            sx={{ height: 140, background: "#EDF2F6", borderRadius: '16px' }}
                            image=""
                        />
                        <CardContent className={classes.CardContent}>
                            <TextLabel fontSize={"18px"} color={"#000"} fontWeight={"600"} title={'42 Days Plan'} />
                            <TextLabel fontSize={"13px"} color={"#000"} fontWeight={"600"} title={'Return Of Investment - 12%'} />
                            <TextLabel fontSize={"12px"} color={lightTheme.palette.bgLightExtraLightGray.main} fontWeight={"400"} title={"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item lg={3} >
                    <Card className={classes.card}>
                        <CardMedia
                            sx={{ height: 140, background: "#EDF2F6", borderRadius: '16px' }}
                            image=""
                        />
                        <CardContent className={classes.CardContent}>
                            <TextLabel fontSize={"18px"} color={"#000"} fontWeight={"600"} title={'42 Days Plan'} />
                            <TextLabel fontSize={"13px"} color={"#000"} fontWeight={"600"} title={'Return Of Investment - 12%'} />
                            <TextLabel fontSize={"12px"} color={lightTheme.palette.bgLightExtraLightGray.main} fontWeight={"400"} title={"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."} />
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </>
    )
}

export default ModifyPlan