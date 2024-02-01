import React from "react";

const HeadingText = ({ title, subtitle }) => {
  return (
    <div className="container mx-auto  xl:h-[900px]">
      <h2 className="tracking-[4px] text-center mx-auto mb-10">{title}</h2>
      <p className="subtitle  text-center mx-auto">{subtitle}</p>
    </div>
  );
};

export default HeadingText;
