import * as React from "react";

function SvgComponent(props) {
  return (
    <svg
      aria-hidden="true"
      data-prefix="fas"
      data-icon="minus-circle"
      className="prefix__svg-inline--fa prefix__fa-minus-circle prefix__fa-w-16"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zM124 296c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h264c6.6 0 12 5.4 12 12v56c0 6.6-5.4 12-12 12H124z"
      />
    </svg>
  );
}

export default SvgComponent;