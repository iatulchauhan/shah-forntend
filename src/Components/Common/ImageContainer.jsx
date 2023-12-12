import React from "react";

export default function Assets({ absolutePath, style, ...props }) {
    const convertAssetsPath = (src) => {
        return absolutePath ? src : `${process.env.PUBLIC_URL}/${src}`;
    };

    return (
        <img {...props} src={convertAssetsPath(props.src)} alt="img" style={{style}} />
    );
}