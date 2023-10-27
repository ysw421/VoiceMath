import '@tensorflow/tfjs';

import { isKoreanAtom, modeAtom } from '@pages/mode';
import * as speechCommands from '@tensorflow-models/speech-commands';
import { useAtom, useAtomValue } from 'jotai/index';
import { useRouter } from 'next/router';
import { useCallback, useRef, useState } from 'react';

export function useTensorflow() {
  const [isKorean, setIsKorean] = useAtom(isKoreanAtom);
  const mode = useAtomValue(modeAtom);
  const router = useRouter();
  console.log('isKorean on use-tensorflow', isKorean);
  let URL = '';
  if (router.pathname === '/draw') URL = 'http://localhost:3000/static/tensorflowmodel-draw';
  else if (router.pathname === '/mode' || router.pathname === '/select')
    URL = 'http://localhost:3000/static/tensorflowmodel-mode';
  if (!isKorean) URL += '-eng/';
  else URL += '/';
  const [detectedWord, setDetectedWord] = useState<string>('');
  const recognizer = useRef<speechCommands.SpeechCommandRecognizer>();
  const [isListening, setisListening] = useState<boolean>(false);
  const init = async () => {
    try {
      if (recognizer.current) return; // Exit early if already initialized
      console.log('Init: Starting to load recognizer...');
      const checkpointURL = URL + 'model.json';
      const metadataURL = URL + 'metadata.json';
      var newRecognizer;
      console.log('isKorean on use-tensorflow', isKorean);
      newRecognizer = speechCommands.create('BROWSER_FFT', undefined, checkpointURL, metadataURL);
      await newRecognizer.ensureModelLoaded();
      console.log(newRecognizer.wordLabels());
      recognizer.current = newRecognizer;
    } catch (error) {
      console.error('Failed to load recognizer:', error);
    }
  };

  const stopRecordTeachable = useCallback(async () => {
    setisListening(false);
    try {
      await recognizer.current?.stopListening();
      console.log('Stopped Listening');
    } catch (error) {
      console.log('Cannot stop listening');
    }
  }, []);

  const startRecordTeachable = useCallback(async () => {
    setisListening(true);
    try {
      recognizer.current?.listen(
        async (result: any) => {
          const words = recognizer.current?.wordLabels();
          const highestScoreIndex = result.scores.indexOf(Math.max(...result.scores));
          console.log(result);
          if (words) await setDetectedWord(words[highestScoreIndex]);
          Promise.resolve();
        },
        {
          includeSpectrogram: false,
          probabilityThreshold: mode == 3 ? 0.75 : 0.85,
          overlapFactor: mode == 3 ? 0.5 : 0.7
        }
      );
      console.log('Started Listening');
    } catch (error) {
      console.log('Cannot Start listening');
    }
  }, []);
  return { init, stopRecordTeachable, startRecordTeachable, detectedWord, isListening };
}
