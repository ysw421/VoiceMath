import TTS_box from '@components/ttsBox';
import { useTTS } from '@hooks/use-tts';
import { atom, useAtom } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import { memo, useEffect, useState } from 'react';

export const modeAtom = atom(0);

export default function Mode() {
  const [gmode, setGmode] = useAtom(modeAtom);

  const { text, setText, isSpeaking, isPaused, isResumed, isEnded, speak, pause, resume, cancel } =
    useTTS();

  useEffect(() => {
    cancel();
  }, []);

  // useEffect(() => {
  //   window.speechSynthesis.getVoices();
  // });

  const [exText, setExText] = useState(
    '당신의 소리를 듣고 있어요. 모드를 선택해 주세요. 모드  하나, 그래프를 볼 수 없어요. 모드  둘, 종이에 필기하기 어려워요. 모드  셋, 말이 정확하지 않아요.'
  );
  useEffect(() => {
    setText(exText);
  }, []);

  useEffect(() => {
    if (text === exText) {
      speak();
    }
  }, [text]);

  useEffect(() => {
    const speak_ = setInterval(() => {
      if (text === exText) {
        speak();
      }
    }, 30000);
    return () => {
      clearInterval(speak_);
    };
  }, [text]);

  // eslint-disable-next-line react/display-name
  const ModeSelect = memo(
    ({ mode, src, caption }: { mode: number; src: string; caption: string }) => (
      <div className="tw-flex tw-flex-col tw-justify-between tw-border-2 tw-rounded-2xl tw-p-4 tw-w-72 tw-h-72 tw-border-gray hover:tw-scale-[98%]">
        <Link href="/select" onClick={() => setGmode(mode)}>
          <div className="tw-relative tw-m-12">
            <Image src={src} width="250" height="250" alt={caption} />
          </div>
        </Link>
        <div className="tw-flex tw-items-center tw-justify-center tw-text-xl ">{caption}</div>
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
            src={`/static/images/modes/${index + 1}.svg`}
            caption={caption}
          />
        )
      )}
    </div>
  ));

  useEffect(() => {
    window.speechSynthesis.getVoices();
  }, []);

  return (
    <div className="tw-flex tw-flex-col tw-h-screen tw-justify-evenly">
      <div className="tw-flex tw-items-center tw-justify-center tw-text-3xl tw-font-bold">
        원하는 모드를 선택하세요
      </div>
      <Modes />
      <TTS_box />
    </div>
  );
}
