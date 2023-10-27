import '@tensorflow/tfjs';

import * as speechCommands from '@tensorflow-models/speech-commands';
import { useRouter } from 'next/router';
import { useCallback, useRef, useState } from 'react';

export function useTensorflow() {
  const router = useRouter();
  let URL = '';
  if (router.pathname === '/mode' || router.pathname === '/select')
    URL = 'http://localhost:3000/static/tensorflowmodel-mode/';
  if (router.pathname === 'draw') URL = 'http://localhost:3000/static/tensorflowmodel-draw/';
  const [detectedWord, setDetectedWord] = useState<string>('');
  const recognizer = useRef<speechCommands.SpeechCommandRecognizer>();
  const [isListening, setisListening] = useState<boolean>(false);
  const init = useCallback(async () => {
    try {
      if (recognizer.current) return; // Exit early if already initialized
      console.log('Init: Starting to load recognizer...');
      const checkpointURL = URL + 'model.json';
      const metadataURL = URL + 'metadata.json';
      const newRecognizer = speechCommands.create(
        'BROWSER_FFT',
        undefined,
        checkpointURL,
        metadataURL
      );
      await newRecognizer.ensureModelLoaded();
      console.log(newRecognizer);
      recognizer.current = newRecognizer;
    } catch (error) {
      console.error('Failed to load recognizer:', error);
    }
  }, []);
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
          if (words) await setDetectedWord(words[highestScoreIndex]);
          Promise.resolve();
        },
        {
          includeSpectrogram: false,
          probabilityThreshold: 0.7,
          overlapFactor: 0.75
        }
      );
      console.log('Started Listening');
    } catch (error) {
      console.log('Cannot Start listening');
    }
  }, []);
  return { init, stopRecordTeachable, startRecordTeachable, detectedWord, isListening };
}
