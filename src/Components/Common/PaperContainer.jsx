// PaperContainer.js
import React from 'react';
import Paper from '@mui/material/Paper';
import { lightTheme } from '../../theme';

const PaperContainer = ({ children, elevation, square, ...otherProps }) => {
    return (
        <Paper elevation={elevation} square={square}
            sx={{
                borderRadius: '8px',
                border: '1px solid #F8F9FA',
                background: lightTheme.palette.bgWhite.main,
                marginTop: '10px',
            }}
            {...otherProps}>
            {children}
        </Paper>
    );
};

export default PaperContainer;