import { Box, Fab } from '@mui/material'
import React, { useState } from 'react'
import SectionHeading from './SectionHeading'
import CommonButton from './Button/CommonButton'
import { lightTheme } from '../../theme';
import SelectDropDown from './SelectDropDown';
import CommonSearch from './CommonSearch';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const TableHeading = ({ title, buttonText, onClick, showSelectDropDown, borderBottom, removeSearchField, handleBack, }) => {
    const [data, setData] = useState({})
    const credit = ['Gujarat ', 'Gujarat']

    return (
        <Box style={{
            borderBottom: borderBottom ? borderBottom : '1px solid #e3e1e1',
            padding: '10px 13px',
            display: 'flex',
            justifyContent: 'space-between'
        }}>
            <SectionHeading
                title={title}
                style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    color: lightTheme.palette.bgDarkPrimary.main,
                    marginTop: '5px'
                }}
            />
            <Box display={'flex'} gap={2}>
                {!removeSearchField && (
                    <CommonSearch />
                )}
                {buttonText && <CommonButton
                    text={buttonText}
                    type="submit"
                    fontSize="13px"
                    onClick={onClick}
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