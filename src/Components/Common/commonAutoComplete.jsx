import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, InputLabel, Paper, Typography } from "@mui/material";

export default function AutoCompleteSearch({
  width,
  height,
  text,
  valid,
  options,
  placeholder,
  handleChange,
  name,
  handleChangeInput,
  fontWeight,
  labelSize,
  disabled,
  defaultValue,
  freeSolo = true,
  clearOnSelect,
  blurOnSelect,
  loadData,
  onBlur,
  searchValue,
  handleSearch,
  multiple = false,
}) {
    console.log("defaultValue",defaultValue);
  return (
    <>
      {text && (
        <Box
          mt={1.5}
          mb={1}
          display="flex"
          fontSize="12px"
          flexDirection={"row"}
          // gap={0.5}
        >
          <InputLabel
            sx={{
              fontWeight: fontWeight,
              fontSize: "14px",
              marginRight: "2px",
            }}
          >
            {text}
          </InputLabel>
          {valid && (
            <Typography color="#EF627A" component={"caption"} variant={"body2"}>
              *
            </Typography>
          )}
        </Box>
      )}
      <Box
        display="flex"
        className="search_filed"
        bgcolor="white"
        borderRadius={1}
      >
        <Autocomplete
          // multiple={multiple}
          disabled={disabled ? disabled : ""}
          autoHighlight={false}
          disablePortal
          blurOnSelect={blurOnSelect}
          options={options || []}
          onChange={handleChange}
          isOptionEqualToValue={(option, value) => {
            if (value === "" || value === option) {
              return true;
            } else {
              return false;
            }
          }}
          value={defaultValue || ""}
          defaultValue={defaultValue || ""}
          sx={{
            borderRadius: 1,
            width: width,
            backgroundColor: "white",
          }}
          freeSolo={freeSolo}
          renderInput={(params) => (
            <TextField
              className="searchInput"
              {...params}
              onBlur={onBlur}
              placeholder={placeholder}
              onChange={handleSearch}
              name={name}
              disabled={disabled ? disabled : ""}
              value={searchValue}
            />
          )}
        />
      </Box>
    </>
  );
}
