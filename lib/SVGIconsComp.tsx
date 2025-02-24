import React from "react";

const SVGIcon = ({ svgString }: { svgString: string }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: svgString,
      }}
    />
  );
};

export default SVGIcon;
