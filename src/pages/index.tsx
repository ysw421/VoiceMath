import 'katex/dist/katex.min.css';
import 'reactjs-popup/dist/index.css';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Point } from 'typings';

const LeftGrid = dynamic(() => import('@components/LeftGrid'));
const RightGrid = dynamic(() => import('@components/RightGrid.client'));
const Popup = dynamic(() => import('reactjs-popup').then((module) => module.default), {});

export default function Draw() {
  const [camera, setCamera] = useState<Point>(new Point(0, 0));
  const [isRecording, setIsRecording] = useState(false);
  console.log(camera.toString());
  return (
    <>
      {typeof window !== 'undefined' && (
        <Popup open={isRecording} closeOnDocumentClick={false} position="right center">
          <div className="bg-black bg-opacity-75 flex items-center justify-center p-5 rounded-lg text-white">
            Recording...
          </div>
        </Popup>
      )}
      <LeftGrid camera={camera} defaultCameraPosition={camera} />
      <RightGrid setIsRecording={setIsRecording} currentCamera={camera} />
    </>
  );
}
