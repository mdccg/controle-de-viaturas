import * as React from "react";

function SvgComponent(props) {
  return (
    <svg
      height="512pt"
      viewBox="0 0 512 512"
      width="512pt"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M1.031 492.398c-1.5 5.204 0 10.903 3.797 14.704 2.8 2.796 6.703 4.398 10.602 4.398 1.398 0 2.8-.2 4.101-.602L159.328 471 40.93 352.602zm0 0" />
      <path d="M15.43 512c-4.102 0-8-1.602-10.899-4.5-4-4-5.5-9.8-3.902-15.2l40.2-140.6 119.6 119.6-140.8 40.098c-1.399.403-2.8.602-4.2.602zm25.8-158.5l-39.699 139c-1.402 5.102 0 10.5 3.7 14.2 2.699 2.698 6.398 4.198 10.199 4.198 1.3 0 2.699-.199 4-.597l139-39.7zm0 0M498.328 77.2l-63.5-63.5C426.23 5.2 415.031.5 402.93.5c-12 0-23.301 4.7-31.801 13.102l-31.8 31.796 127.1 127.102 31.801-31.8c8.5-8.5 13.098-19.802 13.098-31.802.102-12-4.598-23.199-13-31.699zm0 0" />
      <path d="M466.531 173.2l-127.8-127.802 32.097-32.097C379.43 4.699 390.828 0 402.93 0c12.199 0 23.601 4.7 32.101 13.3l63.5 63.5c8.598 8.598 13.297 20 13.297 32.098 0 12.204-4.7 23.602-13.297 32.102zM340.13 45.397L466.53 171.801l31.399-31.403c8.398-8.398 13-19.5 13-31.398s-4.602-23-13-31.398L434.43 14c-8.399-8.398-19.602-13-31.5-13-11.899 0-23 4.602-31.399 13zm0 0M57.805 327.016L318.227 66.59l127.136 127.137-260.422 260.425zm0 0" />
      <path d="M184.93 454.898L57.03 327l261.2-261.102L446.03 193.7zM58.53 327L184.93 453.398 444.629 193.7 318.23 67.301zm0 0" />
    </svg>
  );
}

export default SvgComponent;