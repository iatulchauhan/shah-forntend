import React from "react";

export default function Assets({ absolutePath, ...props }) {
    const convertAssetsPath = (src) => {
        return absolutePath ? src : `${process.env.PUBLIC_URL}/${src}`;
    };

    return (
        <img {...props} src={convertAssetsPath(props.src)} alt="img" />
    );
}