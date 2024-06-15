import React from "react";

const Heading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h1 className={`text-3xl font-bold ${className ? className : ""}`}>
      {children}
    </h1>
  );
};

export default Heading;
