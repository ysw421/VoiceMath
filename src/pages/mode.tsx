import TTS_box from '@components/ttsBox';
import { useTensorflow } from '@hooks/use-tensorflow';
import { useTTS } from '@hooks/use-tts';
import { atom, useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo, useEffect, useState } from 'react';
import { MdLanguage } from 'react-icons/md';

export const modeAtom = atom<number>(0);
export const isKoreanAtom = atomWithStorage<boolean>('isKorean', true);

export default function Mode() {
  const router = useRouter();
  const [gmode, setGmode] = useAtom(modeAtom);
  const [isKorean, setIsKorean] = useAtom(isKoreanAtom);
  const { startRecordTeachable, stopRecordTeachable, init, detectedWord } = useTensorflow(1);
  const { text, setText, isSpeaking, isPaused, isResumed, isEnded, speak, pause, resume, cancel } =
    useTTS();
  useEffect(() => {
    init()
      .then(() => {
        console.log('Init completed. Starting to record...'); // Added for debugging
        startRecordTeachable();
      })
      .catch((error) => {
        console.error('An error occurred:', error); // Added for error logging
      });
  }, []);
  useEffect(() => {
    const wordToGModeMap: { [key: string]: number } = {
      하나: 0,
      둘: 1,
      셋: 2
    };

    if (wordToGModeMap.hasOwnProperty(detectedWord)) {
      stopRecordTeachable();
      console.log(detectedWord);
      setGmode(wordToGModeMap[detectedWord]);
      router.push('/select');
    }
  }, [detectedWord]);

  console.log(isKorean);
  const [exText, setExText] = useState(
    isKorean
      ? '당신의 소리를 듣고 있어요. 모드를 선택해 주세요. 모드  하나, 그래프를 볼 수 없어요. 모드  둘, 종이에 필기하기 어려워요. 모드  셋, 말이 정확하지 않아요.'
      : 'I am listening to your voice. Please select a mode. Mode one, I cannot see the graph. Mode two, it is difficult to write on paper. Mode three, the words are not accurate.'
  );

  useEffect(() => {
    cancel();
    setExText(
      isKorean
        ? '당신의 소리를 듣고 있어요. 모드를 선택해 주세요. 모드  하나, 그래프를 볼 수 없어요. 모드  둘, 종이에 필기하기 어려워요. 모드  셋, 말이 정확하지 않아요.'
        : "I am listening to your voice. Please select a mode. Mode one, I cannot see. Mode two, it's difficult for me to write on paper. Mode three, my words are not accurate."
    );
  }, [isKorean]);

  useEffect(() => {
    cancel();
    const timeout = setTimeout(() => {
      console.log(isKorean);
      setExText(
        isKorean
          ? '당신의 소리를 듣고 있어요. 모드를 선택해 주세요. 모드  하나, 그래프를 볼 수 없어요. 모드  둘, 종이에 필기하기 어려워요. 모드  셋, 말이 정확하지 않아요.'
          : "I am listening to your voice. Please select a mode. Mode one, I cannot see. Mode two, it's difficult for me to write on paper. Mode three, my words are not accurate."
      );
      setText(
        isKorean
          ? '당신의 소리를 듣고 있어요. 모드를 선택해 주세요. 모드  하나, 그래프를 볼 수 없어요. 모드  둘, 종이에 필기하기 어려워요. 모드  셋, 말이 정확하지 않아요.'
          : "I am listening to your voice. Please select a mode. Mode one, I cannot see. Mode two, it's difficult for me to write on paper. Mode three, my words are not accurate."
      );
    }, 500);
    setExText(
      isKorean
        ? '당신의 소리를 듣고 있어요. 모드를 선택해 주세요. 모드  하나, 그래프를 볼 수 없어요. 모드  둘, 종이에 필기하기 어려워요. 모드  셋, 말이 정확하지 않아요.'
        : "I am listening to your voice. Please select a mode. Mode one, I cannot see. Mode two, it's difficult for me to write on paper. Mode three, my words are not accurate."
    );
    setText(
      isKorean
        ? '당신의 소리를 듣고 있어요. 모드를 선택해 주세요. 모드  하나, 그래프를 볼 수 없어요. 모드  둘, 종이에 필기하기 어려워요. 모드  셋, 말이 정확하지 않아요.'
        : "I am listening to your voice. Please select a mode. Mode one, I cannot see. Mode two, it's difficult for me to write on paper. Mode three, my words are not accurate."
    );

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (text === exText) {
        speak();
      }
    }, 1000);

    return () => clearTimeout(timeout);
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
      {[
        isKorean ? '그래프를 볼 수 없어요' : "I can't see the graph",
        isKorean ? '종이에 필기하기 어려워요' : 'I find it difficult to take notes',
        isKorean ? '말이 정확하지 않아요' : 'The words are not precise'
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

  useEffect(() => {
    window.speechSynthesis.getVoices();
  }, []);
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
