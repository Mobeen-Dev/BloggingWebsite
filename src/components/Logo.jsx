import React from "react";

function Logo({width='100px'}) {
  return (
    <img
      src="../assets/react.svg"
      alt="React Logo"
      style={{ width }}
    />
  );
}

export default Logo;
// Compare this snippet from src/components/Header/Header.jsx: