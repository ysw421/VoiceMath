import GlobeButton from '@components/GlobeButton';
import TTS_box from '@components/ttsBox';
import { useTensorflow } from '@hooks/use-tensorflow';
import { useTTS } from '@hooks/use-tts';
import { useAtomValue } from 'jotai';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { Lang, TemplateInfo } from 'typings';

import { allTemplates, Default, koreanUniversityScholasticAbilityTest, mockExam } from './items';
import { modeAtom } from './mode';
import { langAtom } from './mode';
import styles from './select.module.css';

export default function Select() {
  const mode = useAtomValue(modeAtom);
  const [lang, setLang] = useAtom<Lang>(langAtom);
  const router = useRouter();
  const { isSpeaking, isPaused, isResumed, isEnded, speak, pause, resume, cancel } = useTTS();
  const { startRecordTeachable, stopRecordTeachable, init, detectedWord } = useTensorflow();

  const [exText, setExText] = useState(
    lang === 'ko-KR'
      ? '원하는 템플릿을 선택하세요. 빈 템플릿를 말하여 빈 템플릿을 선택할 수 있어요. 또는 모의고사를 말한 후 모의고사 문제를 선택해 보세요.'
      : lang === 'en-US'
      ? 'choose your template. You can choose your template using your voice. say go or back to navigate'
      : ''
  );

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
    setExText(
      lang === 'ko-KR'
        ? '원하는 템플릿을 선택하세요. 빈 템플릿를 말하여 빈 템플릿을 선택할 수 있어요. 또는 모의고사를 말한 후 모의고사 문제를 선택해 보세요.'
        : lang === 'en-US'
        ? 'choose your template. You can choose your template using your voice. say go or back to navigate'
        : ''
    );
  }, [lang]);

  useEffect(() => {
    if (mode === 2) {
      speak(exText, lang);
      const speak_ = setInterval(() => {
        speak(exText, lang);
      }, 30000);
      return () => {
        clearInterval(speak_);
      };
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
  const actionKeys =
    lang === 'ko-KR'
      ? { left: '앞', right: '뒤', go: '선택' }
      : lang === 'en-US'
      ? { left: 'left', right: 'right', go: 'one' }
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
            {lang === 'ko-KR' ? item.koInfo : lang === 'en-US' ? item.enInfo : ''}
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
            <span>{lang === 'ko-KR' ? '돌아가기' : lang === 'en-US' ? 'Go Back' : ''}</span>
          </Link>
        </div>
        <div className="tw-w-full tw-h-7"></div>
        <div className="tw-flex tw-justify-center tw-w-full tw-mt-10 tw-mb-10 tw-text-3xl tw-font-bold">
          {lang === 'ko-KR' ? '템플릿을 선택하세요' : lang === 'en-US' ? 'Select the template' : ''}
        </div>
        <div className="tw-p-10">
          {mode == 2 ? (
            renderGroup(
              lang === 'ko-KR' ? '전체 템플릿' : lang === 'en-US' ? 'Template' : '',
              allTemplates
            )
          ) : (
            <>
              <h3 className="tw-mb-2">
                {lang === 'ko-KR' ? '빈 템플릿' : lang === 'en-US' ? 'Blank template' : ''}
              </h3>
              <div className={styles.group}>
                <button
                  onClick={() => {
                    router.push({ pathname: '/draw', query: Default }, '/draw');
                  }}
                  className={`${styles.box} tw-leading-0.5 tw-whitespace-pre-line`}
                >
                  {lang === 'ko-KR' ? Default.koInfo : lang === 'en-US' ? Default.enInfo : ''}
                </button>
              </div>
              <h3 className="tw-mb-2">
                {lang === 'ko-KR' ? '모의고사' : lang === 'en-US' ? 'Mock exam' : ''}
              </h3>
              <div className={styles.group}>
                {mockExam.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      router.push({ pathname: '/draw', query: item }, '/draw');
                    }}
                    className={`${styles.box} tw-leading-0.5 tw-whitespace-pre-line`}
                  >
                    {lang === 'ko-KR' ? item.koInfo : lang === 'en-US' ? item.enInfo : ''}
                  </button>
                ))}
              </div>
              <h3 className="tw-mb-2">
                {lang === 'ko-KR' ? '수능' : lang === 'en-US' ? 'KSAT' : ''}
              </h3>
              <div className={styles.group}>
                {koreanUniversityScholasticAbilityTest.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      router.push({ pathname: '/draw', query: item }, '/draw');
                    }}
                    className={`${styles.box} tw-leading-0.5 tw-whitespace-pre-line`}
                  >
                    {lang === 'ko-KR' ? item.koInfo : lang === 'en-US' ? item.enInfo : ''}
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
      <GlobeButton />
    </>
  );
}
