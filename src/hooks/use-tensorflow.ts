import '@tensorflow/tfjs';

import * as speechCommands from '@tensorflow-models/speech-commands';
import { useCallback, useState } from 'react';

export function useTensorflow() {
  const URL = [
    'https://teachablemachine.withgoogle.com/models/G-paON7fc/',
    'https://teachablemachine.withgoogle.com/models/16fj9x2cL/'
  ];
  const [detectedWord, setDetectedWord] = useState<string>('');
  const [recognizer, setRecognizer] = useState<speechCommands.SpeechCommandRecognizer>();

  const init = useCallback(async () => {
    try {
      const checkpointURL = URL[0] + 'model.json';
      const metadataURL = URL[0] + 'metadata.json';
      const newRecognizer = speechCommands.create(
        'BROWSER_FFT',
        undefined,
        checkpointURL,
        metadataURL
      );

      await newRecognizer.ensureModelLoaded();
      setRecognizer(newRecognizer);
      console.log('loaded recognizer');
    } catch (error) {
      console.error('Failed to load recognizer:', error);
    }
  }, []);

  const stopRecordTeachable = useCallback(async () => {
    try {
      await recognizer?.stopListening();
      console.log('Stopped Listening');
    } catch (error) {
      console.log('Cannot stop listening');
    }
  }, []);

  const startRecordTeachable = useCallback(async () => {
    try {
      recognizer?.listen(
        async (result: any) => {
          const words = recognizer.wordLabels();
          const highestScoreIndex = result.scores.indexOf(Math.max(...result.scores));
          setDetectedWord(words[highestScoreIndex]);
        },
        {
          includeSpectrogram: false,
          probabilityThreshold: 0.8,
          overlapFactor: 0.9
        }
      );
      console.log('Started Listening');
    } catch (error) {
      console.log('Cannot Start listening');
    }
  }, []);
  return { init, stopRecordTeachable, startRecordTeachable, detectedWord };
}
