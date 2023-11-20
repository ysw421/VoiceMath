import 'katex/dist/katex.min.css';

import Button from '@components/Button';
import GlobeButton from '@components/GlobeButton';
import { useTTS } from '@hooks/use-tts';
import { moveCamera, zoomCamera } from '@lib/commands';
import { langAtom } from '@pages/mode';
import { useAtomValue } from 'jotai';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { Lang, Point } from 'typings';

const LeftGrid = dynamic(() => import('@components/LeftGrid'));
const RightGrid = dynamic(() => import('@components/RightGrid.client'));

export default function Draw() {
  // const { isSpeaking, isPaused, isResumed, isEnded, speak, pause, resume, cancel } = useTTS();
  // const [lang, setLang] = useAtom<Lang>(langAtom);
  const { cancel } = useTTS();
  const lang = useAtomValue<Lang>(langAtom);

  const router = useRouter();
  let { koText, enText, geogebra, name, defaultCameraPosition, isDefalut, koInfo, enInfo, answer } =
    router.query;
  if (enInfo === undefined) {
    enInfo = 'Blank template';
    koInfo = '빈 템플릿';
  }
  name = (name instanceof Array ? name.join('') : name) ?? 'None';
  const isDefalut_bool = isDefalut === undefined ? true : isDefalut === '1' ? true : false;
  koText =
    (koText instanceof Array ? koText.join('') : koText) ??
    '새로운 메모에 오신 것을 환영합니다.<br/>마음껏 메모하세요!';
  enText =
    (enText instanceof Array ? enText.join('') : enText) ??
    'Welcome to a new memo.<br/>Feel free to write anything!';
  geogebra = (geogebra instanceof Array ? geogebra.join('') : geogebra) ?? '';
  defaultCameraPosition =
    (defaultCameraPosition instanceof Array
      ? defaultCameraPosition.join('')
      : defaultCameraPosition) ?? '0,0';
  const answer_int = answer === undefined ? 0 : parseInt(answer[0]);
  const defalutCamera_list = defaultCameraPosition.split(',').map(parseFloat);
  const defalutCamera = new Point(defalutCamera_list[0], defalutCamera_list[1]);
  const [camera, setCamera] = useState<Point>(defalutCamera);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    cancel();
  }, []);

  useEffect(() => {
    moveCamera(camera);
  }, [camera]);

  useEffect(() => {
    zoomCamera(zoom, camera);
  }, [zoom]);

  return (
    <>
      <div className="tw-relative tw-w-screen tw-h-screen tw-overflow-x-hidden">
        <div className="tw-absolute tw-flex tw-items-center tw-gap-4 tw-px-6 tw-h-14">
          <Button
            onClick={() => {
              router.push({ pathname: '/select' }, '/select');
            }}
            className="tw-flex tw-p-0"
          >
            <IoIosArrowBack size={20} />
            <span>{lang === 'ko-KR' ? '돌아가기' : lang === 'en-US' ? 'Go Back' : ''}</span>
          </Button>
          <span>{lang === 'ko-KR' ? koInfo : lang === 'en-US' ? enInfo : ''}</span>
        </div>
        <div
          className="tw-flex tw-flex-row tw-w-full tw-h-full tw-grid-flow-col tw-p-6 tw-pt-14 tw-items-full tw-gap-x-10 "
          // style={{ height: 'calc(100% - 50px)' }}
        >
          <LeftGrid camera={camera} geogebra={geogebra} defaultCameraPosition={defalutCamera} />
          <RightGrid
            koText={koText}
            enText={enText}
            camera={camera}
            setCamera={setCamera}
            setZoom={setZoom}
            defalutCamera={defalutCamera}
            isDefalut={isDefalut_bool}
            problemAnswer={answer_int}
          />
        </div>
      </div>
      <GlobeButton />
    </>
  );
}
