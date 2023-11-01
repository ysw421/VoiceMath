import TTS_box from '@components/ttsBox';
import { useTensorflow } from '@hooks/use-tensorflow';
import { useTTS } from '@hooks/use-tts';
import { useAtomValue } from 'jotai';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { MdLanguage } from 'react-icons/md';
import { TemplateInfo } from 'typings';

import { allTemplates, Default, koreanUniversityScholasticAbilityTest, mockExam } from './items';
import { modeAtom } from './mode';
import { isKoreanAtom } from './mode';
import styles from './select.module.css';

export default function Select() {
  const mode = useAtomValue(modeAtom);
  const [isKorean, setIsKorean] = useAtom(isKoreanAtom);
  const router = useRouter();
  const { text, setText, isSpeaking, isPaused, isResumed, isEnded, speak, pause, resume, cancel } =
    useTTS();
  const { startRecordTeachable, stopRecordTeachable, init, detectedWord } = useTensorflow();
  useEffect(() => {
    init('http://localhost:3000/static/tensorflowmodel-draw-eng/')
      .then(() => {
        console.log('Init completed. Starting to record...'); // Added for debugging
        startRecordTeachable();
      })
      .catch((error) => {
        console.error('An error occurred:', error); // Added for error logging
      });
  }, []);

  useEffect(() => {
    cancel();
  }, [isKorean]);

  const [exText, setExText] = useState(
    isKorean
      ? '원하는 템플릿을 선택하세요. 빈 템플릿를 말하여 빈 템플릿을 선택할 수 있어요. 또는 모의고사를 말한 후 모의고사 문제를 선택해 보세요.'
      : 'choose your template. You can choose your template using your voice. say go or back to navigate'
  );

  useEffect(() => {
    if (mode === 2) {
      speak(exText, isKorean);
    }
  }, [exText]);

  const refs = useRef(
    Array(allTemplates.length + 1)
      .fill(null)
      .map(() => React.createRef<HTMLButtonElement>())
  );
  const findFocusedIndex = () =>
    refs.current.findIndex((ref) => ref.current === document.activeElement);
  const focusNextElement = () => {
    const nextIndex = (findFocusedIndex() + 1) % refs.current.length;
    refs.current[nextIndex].current?.focus();
  };
  const focusPreviousElement = () => {
    const prevIndex = (findFocusedIndex() - 1 + refs.current.length) % refs.current.length;
    refs.current[prevIndex].current?.focus();
  };
  const triggerClick = () => {
    const focusedElement = document.activeElement as HTMLElement;
    focusedElement.click();
  };
  const actionKeys = isKorean
    ? { left: '앞', right: '뒤', go: '선택' }
    : { left: 'left', right: 'right', go: 'one' };
  const actions = {
    [actionKeys.left]: focusNextElement,
    [actionKeys.right]: focusPreviousElement,
    [actionKeys.go]: triggerClick
  };
  useEffect(() => {
    if (actions[detectedWord as keyof typeof actions]) {
      actions[detectedWord as keyof typeof actions]();
    }
    if (detectedWord !== 'Background Noise') console.log(detectedWord);
  }, [detectedWord]);

  const renderGroup = (title: String, templates: TemplateInfo[]) => (
    <div>
      <h3 className="tw-mb-2">{title}</h3>
      <div className={styles.group}>
        {templates.map((item, index) => (
          <button
            key={index}
            ref={refs.current[index]} // Assign ref
            onClick={() => {
              router.push({ pathname: '/draw', query: item }, '/draw');
            }}
            className={`${styles.box} tw-leading-0.5 tw-whitespace-pre-line`}
          >
            {isKorean ? item.info : item.enInfo}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div
        className={`tw-relative tw-w-screen tw-h-screen tw-p-6 tw-pt-0 tw-overflow-y-scroll ${styles.scrollBar}`}
      >
        <div
          className="tw-fixed tw-z-50 tw-flex tw-items-center tw-px-6"
          style={{
            height: '50px',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'saturate(160%) blur(10px) opacity(.5)',
            width: 'calc(100% - 48px)'
          }}
        >
          <Link href={'/mode'} className="tw-flex tw-text-black">
            <IoIosArrowBack size={20} />
            <span>{isKorean ? '돌아가기' : 'Go Back'}</span>
          </Link>
        </div>
        <div className="tw-w-full tw-h-7"></div>
        <div className="tw-flex tw-justify-center tw-w-full tw-mt-10 tw-mb-10 tw-text-3xl tw-font-bold">
          {isKorean ? '템플릿을 선택하세요' : 'Select the template'}
        </div>
        <div className="tw-p-10">
          {mode == 2 ? (
            renderGroup('전체 템플릿', allTemplates)
          ) : (
            <>
              <h3 className="tw-mb-2">{isKorean ? '빈 템플릿' : 'Blank template'}</h3>
              <div className={styles.group}>
                <button
                  onClick={() => {
                    router.push({ pathname: '/draw', query: Default }, '/draw');
                  }}
                  className={`${styles.box} tw-leading-0.5 tw-whitespace-pre-line`}
                >
                  {isKorean ? Default.info : Default.enInfo}
                </button>
              </div>
              <h3 className="tw-mb-2">{isKorean ? '모의고사' : 'Mock exam'}</h3>
              <div className={styles.group}>
                {mockExam.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      router.push({ pathname: '/draw', query: item }, '/draw');
                    }}
                    className={`${styles.box} tw-leading-0.5 tw-whitespace-pre-line`}
                  >
                    {isKorean ? item.info : item.enInfo}
                  </button>
                ))}
              </div>
              <h3 className="tw-mb-2">{isKorean ? '수능' : 'KSAT'}</h3>
              <div className={styles.group}>
                {koreanUniversityScholasticAbilityTest.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      router.push({ pathname: '/draw', query: item }, '/draw');
                    }}
                    className={`${styles.box} tw-leading-0.5 tw-whitespace-pre-line`}
                  >
                    {isKorean ? item.info : item.enInfo}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      {mode === 2 && (
        <div className="tw-absolute tw-w-auto tw-h-auto tw-p-4 tw-bottom-16 tw-left-1/2 -tw-translate-x-1/2 tw-bg-[#ced5e0ba] tw-rounded-3xl">
          <div className="tw-opacity-100">
            <TTS_box />
          </div>
        </div>
      )}
      <div
        className="tw-absolute tw-z-50 tw-top-3 tw-right-3"
        onClick={() => setIsKorean((e) => !e)}
      >
        <MdLanguage size={30} />
      </div>
    </>
  );
}
