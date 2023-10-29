import { useAtomValue } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useCallback, useState } from 'react';

import { Lang } from '../typings';

export const ttsVoiceKoAtom = atomWithStorage<number>('voice_setting', 331);
export const ttsVoiceEnAtom = atomWithStorage<number>('voice_settings_en', 1);

export const useTTS = () => {
  const voiceAtom = useAtomValue<number>(ttsVoiceKoAtom);
  const voiceEnAtom = useAtomValue<number>(ttsVoiceEnAtom);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isResumed, setIsResumed] = useState<boolean>(false);
  const [isEnded, setIsEnded] = useState<boolean>(false);

  const getVoices = () => {
    const voices = window.speechSynthesis.getVoices();
    return voices;
  };
  // const speak = useCallback(
  //   (sentence: string, lang: 'en-US' | 'ko-KR') => {
  //     const msg = new SpeechSynthesisUtterance();
  //     msg.text = sentence;
  //     // console.log(window.speechSynthesis.getVoices()[0]);
  //     // console.log(text);
  //     // function speak() {
  //     console.log('isKorean', isKorean, lang);
  //     if (lang === 'ko-KR') {
  //       msg.voice = window.speechSynthesis.getVoices()[voiceAtom];
  //     } else if (lang === 'en-US') {
  //       msg.voice = window.speechSynthesis.getVoices()[voiceEnAtom];
  //     }
  //     console.log(window.speechSynthesis.getVoices().length);
  //     // console.log(msg.voice.name);
  //     window.speechSynthesis.speak(msg);
  //     // }
  //     // speak();
  //     setIsSpeaking(true);
  //     setIsEnded(false);
  //   },
  //   [text]
  // );

  const speak = (sentence: string, voiceLang: Lang) => {
    const msg = new SpeechSynthesisUtterance();
    msg.text = sentence;
    // console.log(window.speechSynthesis.getVoices()[0]);
    // console.log(text);
    // function speak() {
    if (voiceLang === 'ko-KR') {
      msg.voice = window.speechSynthesis.getVoices()[voiceAtom];
    } else if (voiceLang === 'en-US') {
      msg.voice = window.speechSynthesis.getVoices()[voiceEnAtom];
    }
    console.log(window.speechSynthesis.getVoices().length);
    // console.log(msg.voice.name);
    window.speechSynthesis.speak(msg);
    // }
    // speak();
    setIsSpeaking(true);
    setIsEnded(false);
  };

  const pause = useCallback(() => {
    function pause() {
      window.speechSynthesis.pause();
    }
    pause();
    setIsPaused(true);
    setIsSpeaking(false);
    setIsEnded(false);
    setIsResumed(false);
  }, []);

  const resume = useCallback(() => {
    function resume() {
      window.speechSynthesis.resume();
    }
    resume();
    setIsPaused(false);
    setIsSpeaking(false);
    setIsEnded(false);
    setIsResumed(true);
  }, []);

  const cancel = useCallback(() => {
    function cancel() {
      window.speechSynthesis.cancel();
    }
    cancel();
    setIsPaused(false);
    setIsResumed(false);

    setIsSpeaking(false);
    setIsEnded(true);
  }, []);

  return {
    isSpeaking,
    isPaused,
    isResumed,
    isEnded,
    speak,
    pause,
    resume,
    cancel,
    getVoices
  };
};
