import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { FaAssistiveListeningSystems } from 'react-icons/fa';

import { langAtom } from '../pages/mode';
import { Lang } from '../typings';

export default function TTS_box() {
  const [textAnimation, setTextAnimation] = useState('');
  const lang = useAtomValue<Lang>(langAtom);

  useEffect(() => {
    let count = 0;
    const textAnimationUpdate = setInterval(() => {
      if (count < 4) {
        setTextAnimation((prev) => prev + '.');
        count++;
      } else {
        setTextAnimation('');
        count = 0;
      }
    }, 500);
    return () => {
      clearInterval(textAnimationUpdate);
    };
  }, []);

  return (
    <>
      <div className="tw-flex tw-items-center tw-justify-center">
        <span className="tw-w-8" />
        <div className="tw-mr-2">
          <FaAssistiveListeningSystems size={30} className="tw-relative tw-bottom-0.5" />
        </div>
        <span className="tw-font-semibold tw-text-left">
          {lang === 'ko-KR'
            ? '당신의 소리를 듣고 있어요'
            : lang === 'en-US'
            ? 'I am listening to your voice'
            : ''}
        </span>
        <span className="tw-w-8 tw-font-semibold tw-text-left">{textAnimation}</span>
      </div>
    </>
  );
}
