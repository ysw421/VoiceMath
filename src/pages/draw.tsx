import 'katex/dist/katex.min.css';

import Button from '@components/Button';
import { drawCircle, drawLine, drawSegment, moveCamera, reset, zoomCamera } from '@lib/commands';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Point } from 'typings';

const LeftGrid = dynamic(() => import('@components/LeftGrid.client'));
const RightGrid = dynamic(() => import('@components/RightGrid.client'));

export default function Draw() {
  const defaultPosition = new Point(0, 0);
  const [camera, setCamera] = useState<Point>(defaultPosition);
  const [zoom, setZoom] = useState(1);
  const router = useRouter();
  let { text, geogebra, name, defaultCameraPosition } = router.query;
  name = (name instanceof Array ? name.join('') : name) ?? 'None';
  text =
    (text instanceof Array ? text.join('') : text) ??
    '새로운 메모에 오신 것을 환영합니다.<br/>마음껏 메모하세요!';
  geogebra = (geogebra instanceof Array ? geogebra.join('') : geogebra) ?? '';
  defaultCameraPosition =
    (defaultCameraPosition instanceof Array
      ? defaultCameraPosition.join('')
      : defaultCameraPosition) ?? '0,0';
  const defalutCamera_list = defaultCameraPosition.split(',').map(parseFloat);
  const defalutCamera = new Point(defalutCamera_list[0], defalutCamera_list[1]);

  useEffect(() => {
    moveCamera(camera);
  }, [camera]);

  useEffect(() => {
    zoomCamera(zoom, camera);
  }, [zoom]);

  function MoveBtn({ newPoint, text }: { newPoint: Point; text: string }) {
    return (
      <Button
        className="tw-w-32 tw-leading-none tw-whitespace-pre-line"
        onClick={() => setCamera(newPoint)}
      >
        {text}
      </Button>
    );
  }

  return (
    <div className="tw-relative">
      <div className="tw-grid tw-w-screen tw-h-screen tw-grid-flow-col tw-p-6 tw-gap-x-10">
        <LeftGrid camera={camera} geogebra={geogebra} defaultCameraPosition={defalutCamera} />
        <RightGrid text={text} />
      </div>
      <div className="tw-absolute tw-bottom-6 tw-right-6">
        <div className="tw-flex tw-flex-row tw-gap-x-4">
          <div className="tw-flex tw-flex-col tw-items-end tw-gap-y-2">
            <Button className="tw-w-32" onClick={() => reset()}>
              Clear Space
            </Button>
            <MoveBtn newPoint={new Point(camera.x + 0.5, camera.y)} text="Left" />
            <MoveBtn newPoint={new Point(camera.x, camera.y - 0.5)} text="Up" />
            <Button className="tw-w-32" onClick={() => setZoom((e) => (e <= 1 ? 1.05 : e + 0.05))}>
              Zoom In
            </Button>
            <Button className="tw-w-32" onClick={() => drawCircle(camera, 0.5)}>
              Draw Circle
            </Button>
          </div>
          <div className="tw-flex tw-flex-col tw-items-end tw-gap-y-2">
            <MoveBtn newPoint={defaultPosition} text={`Return to\n(0, 0)`} />
            <MoveBtn newPoint={new Point(camera.x - 0.5, camera.y)} text="Right" />
            <MoveBtn newPoint={new Point(camera.x, camera.y + 0.5)} text="Down" />
            <Button className="tw-w-32" onClick={() => setZoom((e) => (e >= 1 ? 0.95 : e - 0.05))}>
              Zoom Out
            </Button>
            <Button
              className="tw-w-32"
              onClick={() => drawLine(camera, new Point(camera.x + 5, camera.y + 5))}
            >
              Draw Line
            </Button>
            <Button
              className="tw-w-32"
              onClick={() => drawSegment(camera, new Point(camera.x + 5, camera.y + 5))}
            >
              Draw Segment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
