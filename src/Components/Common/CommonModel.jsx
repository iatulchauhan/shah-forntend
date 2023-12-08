import React from 'react'
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Box } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { makeStyles } from 'tss-react/mui';
import { lightTheme } from '../../theme';

const useStyles = makeStyles()((theme) => {
    return {
        dialog_Main: {
            '& .MuiDialog-paper.MuiPaper-rounded': {
                borderRadius: '20px',
                overflow: 'hidden',
            }
        }

    };
});

const CommonModal = ({ onClose, open, title, content }) => {
    const { classes } = useStyles();
    return (
        <Dialog
            fullWidth
            onClose={onClose}
            open={open}
            className={classes.dialog_Main}
        >
            <DialogTitle
                fontWeight={700}
                fontSize={16}
                sx={{ borderBottom: "1px solid #CDCDCD" }}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                gap={1}
            >
                {title}
                <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    width={30}
                    height={30}
                    borderRadius={2}
                    sx={{ backgroundColor: lightTheme.palette.bgLightRed.main, cursor: "pointer" }}
                    onClick={() => onClose()}
                >
                    <CloseOutlinedIcon sx={{ color: lightTheme.palette.bgWhite.main, fontSize: "18px" }} />
                </Box>
            </DialogTitle>
            <Box sx={{ overflow: 'auto' }}>
                {content}
            </Box>
        </Dialog>
    )
}
export default CommonModal