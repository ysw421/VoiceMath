import '@tensorflow/tfjs';

import * as speechCommands from '@tensorflow-models/speech-commands';
import { useCallback, useRef, useState } from 'react';

export function useTensorflow() {
  const URL = [
    'https://teachablemachine.withgoogle.com/models/G-paON7fc/',
    'https://teachablemachine.withgoogle.com/models/16fj9x2cL/'
  ];
  const [detectedWord, setDetectedWord] = useState<string>('');
  const recognizer = useRef<speechCommands.SpeechCommandRecognizer>();

  const init = useCallback(async () => {
    try {
      if (recognizer.current) return; // Exit early if already initialized
      console.log('Init: Starting to load recognizer...');
      const checkpointURL = URL[0] + 'model.json';
      const metadataURL = URL[0] + 'metadata.json';
      const newRecognizer = speechCommands.create(
        'BROWSER_FFT',
        undefined,
        checkpointURL,
        metadataURL
      );
      console.log('Init: Recognizer created. Loading model...');
      await newRecognizer.ensureModelLoaded();
      console.log(newRecognizer);
      recognizer.current = newRecognizer;
    } catch (error) {
      console.error('Failed to load recognizer:', error);
    }
  }, []);

  const stopRecordTeachable = useCallback(async () => {
    try {
      await recognizer.current?.stopListening();
      console.log('Stopped Listening');
    } catch (error) {
      console.log('Cannot stop listening');
    }
  }, []);

  const startRecordTeachable = useCallback(async () => {
    try {
      recognizer.current?.listen(
        async (result: any) => {
          console.log(result);
          const words = recognizer.current?.wordLabels();
          const highestScoreIndex = result.scores.indexOf(Math.max(...result.scores));
          if (words) await setDetectedWord(words[highestScoreIndex]);
          Promise.resolve();
        },
        {
          includeSpectrogram: false,
          probabilityThreshold: 0.8,
          overlapFactor: 0.9
        }
      );
      console.log('Started Listening' + recognizer);
    } catch (error) {
      console.log('Cannot Start listening');
    }
  }, []);
  return { init, stopRecordTeachable, startRecordTeachable, detectedWord };
}
