import { isKoreanAtom } from '@pages/mode';
import { useAtomValue } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useCallback, useState } from 'react';

export const ttsVoiceAtom = atomWithStorage<number>('voice_setting', 0);
export const ttsVoiceEnAtom = atomWithStorage<number>('voice_setting', 0);

export const useTTS = () => {
  const voiceAtom = useAtomValue(ttsVoiceAtom);
  const voiceEnAtom = useAtomValue(ttsVoiceEnAtom);
  const isKorean = useAtomValue(isKoreanAtom);
  const [text, setText] = useState<string>('hello');
  const [enText, setEnText] = useState<string>('hello');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isResumed, setIsResumed] = useState<boolean>(false);
  const [isEnded, setIsEnded] = useState<boolean>(false);

  const getVoices = () => {
    const voices = window.speechSynthesis.getVoices();
    return voices;
  };
  const speak = useCallback(() => {
    const msg = new SpeechSynthesisUtterance();

    msg.text = <string>text;
    // console.log(window.speechSynthesis.getVoices()[0]);
    // console.log(text);
    function speak() {
      console.log('isKorean', isKorean);
      msg.voice = window.speechSynthesis.getVoices()[isKorean ? voiceAtom : voiceEnAtom];
      // msg.voice = window.speechSynthesis.getVoices()[voiceAtom];
      window.speechSynthesis.speak(msg);
    }
    speak();
    setIsSpeaking(true);
    setIsEnded(false);
  }, [text]);

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
    text,
    setText,
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
