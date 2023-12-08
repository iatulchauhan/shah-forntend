import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import TextLabel from '../../Components/Common/Fields/TextLabel';
import { makeStyles } from "tss-react/mui";
import { Grid } from '@mui/material';

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
    return (
        <>
            <Grid container spacing={1}>
                <Grid item lg={3} >
                    <Card className={classes.card}>
                        <CardMedia
                            sx={{ height: 140, padding: '21px' }}
                            image="/assets/image/image 1.png"
                            title="green iguana"
                        />
                        <CardContent>
                            <TextLabel fontSize={"18px"} color={"#000"} fontWeight={"600"} title={'Invest $10k & Get $1 Cr. on Maturity'} />
                            <TextLabel fontSize={"12px"} color={"#737791"} fontWeight={"400"} title={'Lorem Ipsum has been the industry standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book.'} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item lg={3}>
                    <Card className={classes.card}>
                        <CardMedia
                            sx={{ height: 140, padding: '21px' }}
                            image="/assets/image/image 1.png"
                            title="green iguana"
                        />
                        <CardContent>
                            <TextLabel fontSize={"18px"} color={"#000"} fontWeight={"600"} title={'Invest $10k & Get $1 Cr. on Maturity'} />
                            <TextLabel fontSize={"12px"} color={"#737791"} fontWeight={"400"} title={'Lorem Ipsum has been the industry standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book.'} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item lg={3}>
                    <Card className={classes.card}>
                        <CardMedia
                            sx={{ height: 140, padding: '21px' }}
                            image="/assets/image/image 1.png"
                            title="green iguana"
                        />
                        <CardContent>
                            <TextLabel fontSize={"18px"} color={"#000"} fontWeight={"600"} title={'Invest $10k & Get $1 Cr. on Maturity'} />
                            <TextLabel fontSize={"12px"} color={"#737791"} fontWeight={"400"} title={'Lorem Ipsum has been the industry standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book.'} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item lg={3}>
                    <Card className={classes.card}>
                        <CardMedia
                            sx={{ height: 140, padding: '21px' }}
                            image="/assets/image/image 1.png"
                            title="green iguana"
                        />
                        <CardContent>
                            <TextLabel fontSize={"18px"} color={"#000"} fontWeight={"600"} title={'Invest $10k & Get $1 Cr. on Maturity'} />
                            <TextLabel fontSize={"12px"} color={"#737791"} fontWeight={"400"} title={'Lorem Ipsum has been the industry standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book.'} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

export default OfferPage