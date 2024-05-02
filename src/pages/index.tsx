import 'katex/dist/katex.min.css';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Point } from 'typings';

const LeftGrid = dynamic(() => import('@components/LeftGrid'));

const RightGrid = dynamic(() => import('@components/RightGrid.client'));

export default function Draw() {
  const [camera, setCamera] = useState<Point>(new Point(0, 0));
  console.log(camera.toString());
  return (
    <>
      <LeftGrid camera={camera} defaultCameraPosition={camera} />
      <RightGrid />
    </>
  );
}
