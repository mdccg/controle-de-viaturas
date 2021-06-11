import * as React from "react";

function SvgComponent(props) {
  return (
    <svg
      height={512}
      viewBox="0 0 512 512"
      width={512}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M248 200a64.027 64.027 0 00-61.984 48H184v112h128V200z"
        fill="#c7312e"
      />
      <g fill="#dadcde">
        <path d="M128 72h16v48h-16zM176 72h16v48h-16zM224 72h16v48h-16zM272 72h16v48h-16zM320 72h16v48h-16zM368 72h16v48h-16zM416 72h16v48h-16z" />
      </g>
      <path d="M312 280h176v112H312z" fill="#eb423f" />
      <path d="M24 360h288v32H24z" fill="#dadcde" />
      <path
        d="M184 184v176H40l13.35-146.9A32 32 0 0185.22 184z"
        fill="#eb423f"
      />
      <path
        d="M184 313.61V392H88a80.028 80.028 0 0196-78.39zM24 328h32v64H24z"
        fill="#a82a27"
      />
      <path
        d="M152 280H72l6.248-49.985A16 16 0 0194.124 216H152z"
        fill="#e9eef2"
      />
      <circle cx={169.33} cy={392} fill="#606669" r={48} />
      <circle cx={169.33} cy={392} fill="#e9eef2" r={16} />
      <path
        d="M57.43 200.13a31.808 31.808 0 00-4.08 12.97l-.26 2.9H32v24a8 8 0 01-16 0v-32a8 8 0 018-8h32a7.459 7.459 0 011.43.13z"
        fill="#a82a27"
      />
      <circle cx={400} cy={392} fill="#606669" r={48} />
      <circle cx={400} cy={392} fill="#e9eef2" r={16} />
      <circle cx={232} cy={248} fill="#b6b9ba" r={16} />
      <path d="M72 120h416v32H72z" fill="#a82a27" />
      <path
        d="M480 120h-16V88a8.009 8.009 0 00-8-8H104a8.009 8.009 0 00-8 8v32H80V88a24.027 24.027 0 0124-24h352a24.027 24.027 0 0124 24z"
        fill="#e9eef2"
      />
      <path
        d="M424 120a32 32 0 00-32 32v64h64v-64a32 32 0 00-32-32z"
        fill="#eb423f"
      />
      <circle cx={424} cy={152} fill="#e9eef2" r={8} />
      <path d="M312 248h176v32H312z" fill="#dadcde" />
      <path d="M344 216h32v32h-32zM408 216h32v32h-32z" fill="#b6b9ba" />
      <path d="M312 184h176v32H312z" fill="#dadcde" />
      <path
        d="M239.43 200.57A49.122 49.122 0 00232 200a48 48 0 00-48 48 49.122 49.122 0 00.57 7.43A48.05 48.05 0 00248 293.27V296h32v-48a48.016 48.016 0 00-40.57-47.43zM232 264a16 16 0 1116-16 16 16 0 01-16 16z"
        fill="#b6b9ba"
      />
      <path d="M248 296h32v32h-32z" fill="#60b8d1" />
      <circle cx={232} cy={248} fill="#dadcde" r={48} />
      <circle cx={232} cy={248} fill="#b6b9ba" r={16} />
    </svg>
  );
}

export default SvgComponent;