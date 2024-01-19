import React from "react";

export default function Assets({ absolutePath, onClick, className, style, height, width, ...props }) {
    const convertAssetsPath = (src) => {
        return absolutePath ? src : `${process.env.PUBLIC_URL}/${src}`;
    };

    return (
        <img {...props} onClick={onClick} src={convertAssetsPath(props.src)} alt="img" height={height} width={width} style={{ ...style }} className={className} />
    );
}