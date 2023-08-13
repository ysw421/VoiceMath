import 'katex/dist/katex.min.css';

import Button from '@components/Button';
import { moveCamera, zoomCamera } from '@lib/commands';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { Point } from 'typings';

const LeftGrid = dynamic(() => import('@components/LeftGrid.client'));
const RightGrid = dynamic(() => import('@components/RightGrid.client'));

export default function Draw() {
  const router = useRouter();
  let { text, geogebra, name, defaultCameraPosition, isDefalut } = router.query;
  name = (name instanceof Array ? name.join('') : name) ?? 'None';
  const isDefalut_bool = isDefalut === undefined ? true : isDefalut === '1' ? true : false;
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
  const [camera, setCamera] = useState<Point>(defalutCamera);
  const [zoom, setZoom] = useState(1);

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
    <div className="tw-relative tw-w-screen tw-h-screen">
      <div className="tw-flex tw-items-center tw-px-6" style={{ height: '50px' }}>
        <Link href={'/select'} className="tw-flex tw-text-black">
          <IoIosArrowBack size={20} />
          <span>돌아가기</span>
        </Link>
      </div>
      <div
        className="tw-flex tw-flex-row tw-w-full tw-grid-flow-col tw-p-6 tw-pt-0 tw-items-full tw-gap-x-10 "
        style={{ height: 'calc(100% - 50px)' }}
      >
        <LeftGrid camera={camera} geogebra={geogebra} defaultCameraPosition={defalutCamera} />
        <RightGrid
          text={text}
          camera={camera}
          setCamera={setCamera}
          zoom={zoom}
          setZoom={setZoom}
          defalutCamera={defalutCamera}
          isDefalut={isDefalut_bool}
        />
      </div>
    </div>
  );
}
