import TTS_box from '@components/ttsBox';
import { useTensorflow } from '@hooks/use-tensorflow';
import { useTTS } from '@hooks/use-tts';
import { atom, useAtom } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo, useEffect, useState } from 'react';
import { MdLanguage } from 'react-icons/md';

export const modeAtom = atom<number>(0);
export const isKoreanAtom = atom<boolean>(false);

export default function Mode() {
  const router = useRouter();
  const [gmode, setGmode] = useAtom(modeAtom);
  const [isKorean, setIsKorean] = useAtom(isKoreanAtom);
  const { startRecordTeachable, stopRecordTeachable, init, detectedWord } = useTensorflow();
  const { text, setText, isSpeaking, isPaused, isResumed, isEnded, speak, pause, resume, cancel } =
    useTTS();
  useEffect(() => {
    console.log('isKorean on mode', isKorean);
    init('http://localhost:3000/static/tensorflowmodel-mode-eng/')
      .then(() => {
        console.log('Init completed. Starting to record...'); // Added for debugging
        startRecordTeachable();
      })
      .catch((error) => {
        console.error('An error occurred:', error); // Added for error logging
      });
  }, []);
  useEffect(() => {
    const wordToGModeMap: { [key: string]: number } = isKorean
      ? {
          하나: 0,
          둘: 1,
          셋: 2
        }
      : {
          one: 0,
          two: 1,
          three: 3
        };
    if (wordToGModeMap.hasOwnProperty(detectedWord)) {
      stopRecordTeachable();
      console.log(detectedWord);
      setGmode(wordToGModeMap[detectedWord]);
      router.push('/select');
    }
  }, [detectedWord]);

  const [exText, setExText] = useState(
    isKorean
      ? '당신의 소리를 듣고 있어요. 모드를 선택해 주세요. 모드  일 종이에 필기하기 어려워요. 모드  이, 그래프를 볼 수 없어요 . 모드  삼, 말이 정확하지 않아요.'
      : 'I am listening to your voice. Please select a mode. first mode, I cannot see the graph. second mode, it is difficult to write on paper. third mode, the words are not accurate.'
  );

  useEffect(() => {
    cancel();
    const timeout = setTimeout(() => {
      speak(exText, isKorean);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [exText]);

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
      {[
        isKorean ? '하나: 종이에 필기하기 어려워요' : 'one: I find it difficult to take notes',
        isKorean ? '둘: 그래프를 볼 수 없어요 ' : "two: I can't see the graph",
        isKorean ? '셋: 말이 정확하지 않아요' : 'three: The words are not precise'
      ].map((caption, index) => (
        <ModeSelect
          key={index.toString()}
          mode={index + 1}
          src={`/static/images/modes/${index + 1}.svg`}
          caption={caption}
        />
      ))}
    </div>
  ));
  return (
    <div className="tw-flex tw-flex-col tw-h-screen tw-justify-evenly">
      <div className="tw-flex tw-items-center tw-justify-center tw-text-3xl tw-font-bold">
        {isKorean ? '원하는 모드를 선택하세요' : 'Select the mode you want'}
      </div>
      <Modes />
      <TTS_box />
      <div className="tw-absolute tw-top-3 tw-right-3" onClick={() => setIsKorean((e) => !e)}>
        <MdLanguage size={30} />
      </div>
    </div>
  );
}
