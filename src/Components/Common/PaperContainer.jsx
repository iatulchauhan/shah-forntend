// PaperContainer.js
import React from 'react';
import Paper from '@mui/material/Paper';

const PaperContainer = ({ children, elevation, square, ...otherProps }) => {
    return (
        <Paper elevation={elevation} square={square}
            sx={{
                borderRadius: '20px',
                border: '1px solid #F8F9FA',
                background: '#FFF',
                boxShadow: '0px 4px 20px 0px rgba(174, 167, 167, 0.50)',
                marginTop: '10px',
            }}
            {...otherProps}>
            {children}
        </Paper>
    );
};

export default PaperContainer;