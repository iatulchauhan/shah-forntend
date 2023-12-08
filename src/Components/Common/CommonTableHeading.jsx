import { Box } from '@mui/material'
import React, { useState } from 'react'
import SectionHeading from './SectionHeading'
import CommonButton from './Button/CommonButton'
import { lightTheme } from '../../theme';
import SelectDropDown from './SelectDropDown';
import CommonSearch from './CommonSearch';
const TableHeading = ({ title, buttonText, onClick, showSelectDropDown }) => {
    const [data, setData] = useState({})
    const credit = ['Gujarat ', 'Gujarat']

    return (
        <Box style={{
            borderBottom: '1px solid #e3e1e1',
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
                <CommonSearch />
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
            </Box>
        </Box>
    )
}

export default TableHeading