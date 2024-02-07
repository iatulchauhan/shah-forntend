import { Box, Fab } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SectionHeading from './SectionHeading'
import CommonButton from './Button/CommonButton'
import { lightTheme } from '../../theme';
import SelectDropDown from './SelectDropDown';
import CommonSearch from './CommonSearch';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
    return {

        commonHeader: {
            padding: '6px 7px', 
            display: 'flex',
            gap: "5px",
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            [theme.breakpoints.down("sm")]: {
                justifyContent: "center",
            },
            [theme.breakpoints.down("xs")]: {
                justifyContent: "center",
            }
        }
    };
});

const TableHeading = ({ title, buttonText, onClick, showSelectDropDown, borderBottom, removeSearchField, handleBack, handleSearch, fontSize, variant }) => {
    const [data, setData] = useState({})
    const credit = ['Gujarat ', 'Gujarat']
    const { classes } = useStyles();

    const variantToFontSize = {
        h1: "40px",
        h2: "36px",
        h3: "30px",
        h4: "26px",
        h5: "24px",
        h6: "20px",
        subtitle1: "18px",
        subtitle2: "16px",
        body1: "14px",
        body2: "12px",
    };
    const [responsiveFontSize, setResponsiveFontSize] = useState(
        fontSize || variantToFontSize[variant]
    );
    useEffect(() => {
        const updateFontSizes = () => {
            const newVariantToFontSize = { ...variantToFontSize };
            if (window.innerWidth <= 600) {
                newVariantToFontSize.h1 = "28px";
                newVariantToFontSize.h2 = "25px";
                newVariantToFontSize.h3 = "24px";
                newVariantToFontSize.h4 = "22px";
                newVariantToFontSize.h5 = "20px";
                newVariantToFontSize.h6 = "18px";
                newVariantToFontSize.subtitle1 = "16px";
                newVariantToFontSize.subtitle2 = "14px";
                newVariantToFontSize.body1 = "12px";
                newVariantToFontSize.body2 = "12px";
            }
            setResponsiveFontSize(fontSize || newVariantToFontSize[variant]);
        };
        window.addEventListener("resize", updateFontSizes);
        updateFontSizes();
        return () => {
            window.removeEventListener("resize", updateFontSizes);
        };
    }, [fontSize, variant]);

    return (
        <Box style={{ borderBottom: borderBottom ? borderBottom : '1px solid #e3e1e1' }} className={classes.commonHeader}>
            <SectionHeading
                title={title}
                style={{ fontSize: responsiveFontSize || "15px", fontWeight: 600, color: lightTheme.palette.bgDarkPrimary.main, marginTop: '5px' }}
                variant={variant}
            />
            <Box display={'flex'} gap={1} flexWrap={'wrap'} justifyContent={'center'}>
                {!removeSearchField && (
                    // <CommonSearch onSearch={onSearch ? onSearch : null}/>
                    <CommonSearch handleSearch={handleSearch ? handleSearch : null} />
                )}
                {buttonText && <CommonButton
                    text={buttonText}
                    type="submit"
                    // fontSize="13px"
                    onClick={onClick}
                    variant={variant}
                />}
                {showSelectDropDown && (
                    <SelectDropDown
                        fullWidth
                        size={'small'}
                        width={'130px'}
                        values={credit || []}
                        value={data?.credit}
                        name="state"
                        onChange={(e) => {
                            setData({ ...data, state: e.target.value });
                        }}
                    />
                )}
                {handleBack && <Fab color="primary" aria-label="add" onClick={handleBack} size='small'>
                    <ArrowBackIcon />
                </Fab>}
            </Box>
        </Box>
    )
}

export default TableHeading