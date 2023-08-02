import { atom, useAtom } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import { memo, useEffect, useState } from 'react';
import { FaAssistiveListeningSystems } from 'react-icons/fa';

const modeAtom = atom(0);

export default function Mode() {
  const [text, setText] = useState('');
  const [gmode, setGmode] = useAtom(modeAtom);

  useEffect(() => {
    window.speechSynthesis.getVoices();
  });

  // eslint-disable-next-line react/display-name
  const ModeSelect = memo(
    ({ mode, imgSrc, caption }: { mode: number; imgSrc: string; caption: string }) => (
      <div className="tw-relative tw-border-[20px] tw-w-72 tw-h-72 tw-border-gray hover:tw-scale-95">
        <Link href="/select" onClick={() => setGmode(mode)}>
          <div className="tw-relative tw-m-12">
            <Image src={imgSrc} width="300" height="300" alt={caption} />
          </div>
        </Link>
        <caption className="tw-absolute tw-bottom-0 tw-w-full tw-mb-5">{caption}</caption>
      </div>
    )
  );

  // eslint-disable-next-line react/display-name
  const Modes = memo(() => (
    <div className="tw-flex tw-w-screen tw-h-auto tw-justify-evenly">
      {['그래프를 볼 수 없어요', '종이에 필기하기 어려워요', '말이 정확하지 않아요'].map(
        (caption, index) => (
          <ModeSelect
            key={index.toString()}
            mode={index + 1}
            imgSrc={`/static/images/modes/${index + 1}.svg`}
            caption={caption}
          />
        )
      )}
    </div>
  ));

  return (
    <div className="tw-flex tw-flex-col tw-h-screen tw-justify-evenly">
      <div className="tw-flex tw-items-center tw-justify-center tw-text-2xl tw-font-bold">
        원하는 모드를 선택하세요
      </div>
      <Modes />
      <div className="tw-flex tw-items-center tw-justify-center tw-gap-2">
        <FaAssistiveListeningSystems size={30} />
        <span className="tw-text-left">당신의 소리를 듣고 있어요{text}</span>
      </div>
    </div>
  );
}
