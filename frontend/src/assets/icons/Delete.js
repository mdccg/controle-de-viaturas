import * as React from "react";

function SvgComponent(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 384" {...props}>
      <path d="M64 341.333C64 364.907 83.093 384 106.667 384h170.667C300.907 384 320 364.907 320 341.333v-256H64v256zM266.667 21.333L245.333 0H138.667l-21.334 21.333H42.667V64h298.666V21.333z" />
    </svg>
  );
}

export default SvgComponent;