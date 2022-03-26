import React from 'react';

interface Props {
  value: number;
}

export default function Progress(props: Props) {
  const { value } = props;

  return (
    <>
      <svg width="40" height="40">
        <Arc color="#E0E0E0" ang={359.99} />
        <Arc color="#23b8ff" ang={value * 359.99} />
      </svg>
    </>
  );
}

function Arc(props: {
  ang: number;
  color: string;
}) {
  const { ang, color } = props;

  let r = 16;
  let cx = 20, cy = 20;
  let lineWidth = 4;

  let startX = cx + Math.sin(d2a(0)) * r;
  let startY = cy - Math.cos(d2a(0)) * r;

  let endX = cx + Math.sin(d2a(ang)) * r;
  let endY = cy - Math.cos(d2a(ang)) * r;

  let d = `M ${startX} ${startY} A ${r} ${r} 0 ${ang > 180 ? 1 : 0} 1 ${endX} ${endY}`;

  return <path d={d} fill="none" stroke={color} strokeWidth={lineWidth} />;
}




function d2a(n: number) {
  return n * Math.PI / 180;
}