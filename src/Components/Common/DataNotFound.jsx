import React from "react";
import clsx from "clsx";
import { Card, CardContent, Icon, Typography } from "@mui/material";

export default function DataNotFound({ title, icon, elevation, color }) {
    return (
        <Card elevation={elevation !== undefined ? elevation : 1} style={{
            flexGrow: 1,
            width: "100%",
        }}>
            <CardContent style={{ padding: 35 }}>
                <div style={{ textAlign: "center", display: icon ? "" : "none" }}>
                    {icon}
                </div>
                <div style={{ textAlign: "center", color: color ? color : "inherit", }}>
                    <Typography fontSize={"16px"} fontWeight={500} >
                        {title ? title : "No record found !"}
                    </Typography>
                </div>
            </CardContent>
        </Card>
    );
}