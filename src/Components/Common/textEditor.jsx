import React, { useEffect, useState } from "react";
import { Typography, Box, InputLabel, useTheme, } from "@mui/material";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import { makeStyles } from "tss-react/mui";
import { stateToHTML, } from "draft-js-export-html";
import { ContentState, convertToRaw, DefaultDraftBlockRenderMap, } from "draft-js";
import MUIRichTextEditor from "mui-rte";
import {  stateFromHTML } from "draft-js-import-html";


const useStyles = makeStyles()((theme) => {
  return {
    root: {
      width: "100%",
      // backgroundColor: '#fffcfc',
      borderRadius: '5px',
      border: `1px solid ${theme.palette.bgLightExtraGray.main}`,
      fontSize: "12px",
      "& .MuiSvgIcon-root": {
        fontSize: "1.2rem !important",
      },
    },
    editor: {
      height: "150px",
      maxHeight: "200px",
      overflowY: "auto",
      overflowX: "hidden",
      borderTop: `1px solid ${theme.palette.bgLightExtraGray.main}`,
      // borderRadius: theme.shape.borderRadius,
      fontSize: "12px",
      marginLeft: '10px'
    },
    editorContainer: {
      margin: `${theme.spacing(1)} 0px 0px ${theme.spacing(3)} !important`,
      fontSize: "14px",
    },
    anchorLink: {
      color: "blue",
      textDecoration: "underline",
    },
  };
});

export default function TextEditor({
  value,
  category,
  valid,
  readOnly,
  inlineToolbar,
  onChange,
  defaultValue,
  onBlur,
  fontWeight
}) {
  const { classes } = useStyles();
  const theme = useTheme()
  const [content, setContent] = useState("");
console.log("defaultValue",defaultValue);
  useEffect(() => {
    if (defaultValue) {
      const blockRenderMap = DefaultDraftBlockRenderMap.set("br", {
        element: "br",
      });
      const contentHTML = stateFromHTML(
        defaultValue,
        blockRenderMap
      );
      console.log("contentHTML",contentHTML);
      // const state = ContentState.createFromBlockArray(
      //   contentHTML.contentBlocks,
      //   contentHTML.entityMap
      // );
      setContent(JSON.stringify(convertToRaw(contentHTML)));
    } else {
      setContent("");
    }
  }, [defaultValue]);

  return (
    <>
      {category && (
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
              fontWeight: fontWeight,
              fontSize: "15px",
              color: theme.palette.bgDarkPrimary.main,
              padding: '3px',
            }}
          >
            {category}
          </InputLabel>
          {valid && (
            <Typography color="#EF627A" component={"caption"} variant={"body2"}>
              *
            </Typography>
          )}
        </Box>
      )}
      <MUIRichTextEditor
        controls={["title", "bold", "italic", "bulletList", "numberList", "link", "dropdown",]}
        customControls={[
          {
            name: "header-one", icon: <InvertColorsIcon />, type: "callback", onClick: (_editorState, name, _anchor) => { },
          },
        ]}
        value={value}
        defaultValue={content}
        onChange={async (event) => {
          let value = await stateToHTML(event.getCurrentContent());
          onChange(value);
        }}
        onBlur={onBlur}
        label="Type something here..."
        inlineToolbar={inlineToolbar || false}
        readOnly={readOnly || false}
        classes={{
          root: classes.root,
          editor: classes.editor,
          anchorLink: classes.anchorLink,
          editorContainer: classes.editorContainer,
        }}
      />
    </>
  );
}
