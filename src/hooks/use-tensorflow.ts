import '@tensorflow/tfjs';

import * as speechCommands from '@tensorflow-models/speech-commands';
import { useEffect, useState } from 'react';

export function useTensorflow(isUserRecording: boolean) {
  const URL = 'https://teachablemachine.withgoogle.com/models/G-paON7fc/';
  const [detectedWord, setDetectedWord] = useState<string>('');
  const [recognizer, setRecognizer] = useState<speechCommands.SpeechCommandRecognizer | null>(null);

  useEffect(() => {
    async function createModel() {
      const checkpointURL = URL + 'model.json';
      const metadataURL = URL + 'metadata.json';
      const newRecognizer = speechCommands.create(
        'BROWSER_FFT',
        undefined,
        checkpointURL,
        metadataURL
      );
      await newRecognizer.ensureModelLoaded();
      setRecognizer(newRecognizer);
    }

    if (!recognizer) {
      createModel();
    }
  }, [recognizer]);

  useEffect(() => {
    if (isUserRecording) {
      recognizer?.stopListening();
      console.log('Stopped Listening');
    } else {
      recognizer
        ?.listen(
          async (result: any) => {
            const words = recognizer.wordLabels();
            const highestScoreIndex = result.scores.indexOf(Math.max(...result.scores));
            setDetectedWord(words[highestScoreIndex]);
            return Promise.resolve();
          },
          {
            includeSpectrogram: false,
            probabilityThreshold: 0.8,
            overlapFactor: 0.9
          }
        )
        .then(() => {
          console.log('Started Listening');
        })
        .catch((err) => {
          console.log('An error occurred:', err);
        });
    }
  }, [isUserRecording, recognizer]);

  return detectedWord;
}
