// IOSSlider.js
import React from 'react';
import PropTypes from 'prop-types';
import { Box, InputLabel, Slider, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';

const iOSBoxShadow =
    '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const IOSSliderStyled = styled(Slider)(({ theme }) => ({
    position: 'relative',
    color: theme.palette.mode === 'dark' ? '#3880ff' : '#3880ff',
    height: 2,
    padding: '15px 0',
    '& .MuiSlider-thumb': {
        position: 'relative',
        zIndex: 1,
        height: 22,
        width: 22,
        backgroundColor: '#fff',
        boxShadow: iOSBoxShadow,
        borderRadius: '50%', // Make the thumb rounded
        '&:focus, &:hover, &.Mui-active': {
            boxShadow:
                '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
            '@media (hover: none)': {
                boxShadow: iOSBoxShadow,
            },
        },
    },
    '& .MuiSlider-valueLabel': {
        fontSize: 12,
        fontWeight: 'normal',
        top: -22, // Adjust the position of the label
        left: '50%',
        position: 'absolute',
        width: '30px',
        // borderRadius: '50%',
        backgroundColor: '#3880ff',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: 'translateX(-50%)',
    },
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-rail': {
        opacity: 0.5,
        backgroundColor: '#bfbfbf',
        backgroundImage: `linear-gradient(to right, #bfbfbf ${100 / 10}%, transparent ${100 / 10}%)`, // Change the denominator to match the number of steps
        backgroundSize: '10px 100%', // Adjust the size based on your design
    },
    '& .MuiSlider-mark': {
        backgroundColor: '#bfbfbf',
        height: 8,
        width: 1,
        '&.MuiSlider-markActive': {
            opacity: 1,
            backgroundColor: 'currentColor',
        },
    },
}));

function CommonSlider({ marks, handleChange, ...props }) {
    const theme = useTheme()
    const valueLabelFormat = (value) => {
        return marks.find((mark) => mark.value === value)?.label || value;
    };

    return (
        <>
            {props?.text && (
                <Box
                    mt={1.5}
                    // mb={1}
                    display="flex"
                    fontSize="12px"
                    flexDirection={"row"}
                >
                    <InputLabel
                        sx={{
                            marginRight: "3px",
                            fontWeight: props.fontWeight,
                            fontSize: "15px",
                            color: theme.palette.bgDarkPrimary.main,
                            padding: '3px',
                        }}
                    >
                        {props?.text}
                    </InputLabel>
                </Box>
            )}
            <IOSSliderStyled
                marks={marks}
                onChange={handleChange}
                valueLabelDisplay="on"
                valueLabelFormat={valueLabelFormat}
                sx={{ marginTop: 2 }}
                {...props}
            />
        </>
    );
}

CommonSlider.propTypes = {
    marks: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.number.isRequired,
            label: PropTypes.node,
        })
    ),
    handleChange: PropTypes.func,
    min: PropTypes.number, // Include the min prop
    max: PropTypes.number, // Include the max prop
    step: PropTypes.number, // Include the step prop
};

export default CommonSlider;
