import { Avatar, Box, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import CommonSearch from '../../Components/Common/CommonSearch';
import SectionHeading from '../../Components/Common/SectionHeading'
import TextLabel from '../../Components/Common/Fields/TextLabel';
import Assets from '../../Components/Common/ImageContainer';

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
    {
        heading: "Lorem Ipsum Dolor",
        name: "John Doe",
        time: "12 min ago",
        data: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type...",
    },
]

const Email = () => {
    return (
        <>
            <Grid container >
                <Grid item xs={4} padding={4} sx={{ background: "#F9FAFB" }}>
                    <CommonSearch placeholder={"Search here..."} />
                    {EmailData.map((data) => {
                        return (
                            <Box padding={4} mt={4} borderRadius={5} sx={{ background: "#fff" }}>
                                <Box display={'flex'} justifyContent={"space-between"} mb={1}>
                                    <Box display={'flex'} gap={1} alignItems={"center"}>
                                        <Avatar />
                                        <Box>
                                            <SectionHeading variant={"caption"} title={data.heading} />
                                            <SectionHeading variant={"caption"} color='#737791' title={data.name} />
                                        </Box>
                                    </Box>
                                    <SectionHeading variant={"caption"} color='#737791' title={data.time} />
                                </Box>
                                <Box>
                                    <TextLabel variant={"body2"} color={"#737791"} fontWeight={"400"} title={data.data} />
                                </Box>
                            </Box>
                        )
                    })}
                </Grid>
                <Grid item xs={8}>
                    <Box padding={4} borderRadius={5} sx={{ background: "#fff" }}>
                        <Box display={"flex"} justifyContent={"center"} my={4}>
                            <SectionHeading fontWeight={"400"} variant={"subtitle2"} color='#737791' title={"Load 3 previous messages"} />
                        </Box>
                        <Box display={'flex'} justifyContent={"space-between"} mb={1}>
                            <Box display={'flex'} gap={1} alignItems={"center"}>
                                <Avatar sx={{ height: "58px", width: "58px" }} />
                                <Box>
                                    <SectionHeading variant={"h6"} title={"Lorem Ipsum Dolor"} />
                                    <SectionHeading fontWeight={"400"} variant={"subtitle2"} title={"John Doe to Dianna Smiley"} />
                                </Box>
                            </Box>
                            <SectionHeading fontWeight={"400"} variant={"subtitle2"} color='#737791' title={"Jul 19, 2022, 10:20 PM"} />
                        </Box>
                        <Box mt={8} mb={4}>
                            <TextLabel fontSize={"15px"} color={"#737791"} variant={"body2"} title={' Hi Dianna Smiley,'} />
                            <br />
                            <TextLabel fontSize={"15px"} color={"#737791"} variant={"body2"} title={"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularized in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."} />
                            <br />
                            <TextLabel fontSize={"15px"} color={"#737791"} variant={"body2"} title={" It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose."} />

                        </Box>

                        <Box display={"flex"} flexDirection={"column"} gap={"15px"}>
                            <Box display={'flex'} gap={1}>
                                <Assets
                                    src={"/assets/image/projectDetail.png"}
                                    absolutePath={true}
                                />
                                <Box>
                                    <SectionHeading variant={"caption"} title={"Projectdetails.pdf"} />
                                    <SectionHeading variant={"caption"} color='#737791' title={"1.50 Mb"} />
                                </Box>
                            </Box>
                            <Box display={'flex'} gap={1} >
                                <Assets
                                    src={"/assets/image/screenShot.png"}
                                    absolutePath={true}
                                />
                                <Box>
                                    <SectionHeading variant={"caption"} title={"Projectdetails.pdf"} />
                                    <SectionHeading variant={"caption"} color='#737791' title={"1.50 Mb"} />
                                </Box>
                            </Box>
                        </Box>
                        <Box display={"flex"} justifyContent={"end"} gap={3}>
                            <Assets src={"/assets/icons/trash.png"} absolutePath={true} />
                            <Assets src={"/assets/icons/star.png"} absolutePath={true} />
                            <Assets src={"/assets/icons/preview.png"} absolutePath={true} />
                            <Assets src={"/assets/icons/frame.svg"} absolutePath={true} />
                            <Assets src={"/assets/icons/share.png"} absolutePath={true} />
                            
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default Email;