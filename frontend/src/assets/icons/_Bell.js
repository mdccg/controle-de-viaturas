import * as React from "react";

function SvgComponent(props) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M21.395 16.913a6.698 6.698 0 01-2.38-5.125V9c0-3.519-2.613-6.432-6-6.92V1a1 1 0 10-2 0v1.08c-3.386.488-6 3.401-6 6.92v2.788a6.705 6.705 0 01-2.387 5.133 1.752 1.752 0 001.138 3.08h16.5c.965 0 1.75-.786 1.75-1.751 0-.512-.223-.996-.621-1.337zM12.016 24a3.756 3.756 0 003.674-3H8.342a3.756 3.756 0 003.674 3z"
        fill="#2D3436"
      />
      <circle cx={20} cy={4} r={4} fill="#D63031" />
    </svg>
  );
}

export default SvgComponent;