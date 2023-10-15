import '@tensorflow/tfjs';

import * as speechCommands from '@tensorflow-models/speech-commands';
import { useEffect, useState } from 'react';

export function useTensorflow() {
  const URL = 'https://teachablemachine.withgoogle.com/models/G-paON7fc/';
  const [detectedWord, setdetectedWord] = useState('');
  async function createModel() {
    const checkpointURL = URL + 'model.json'; // model topology
    const metadataURL = URL + 'metadata.json'; // model metadata
    const recognizer = speechCommands.create('BROWSER_FFT', undefined, checkpointURL, metadataURL);
    // check that model and metadata are loaded via HTTPS requests.
    await recognizer.ensureModelLoaded();
    return recognizer;
  }

  useEffect(() => {
    async function init() {
      const recognizer = await createModel();
      // listen() takes two arguments:
      // 1. A callback function that is invoked anytime a word is recognized.
      // 2. A configuration object with adjustable fields
      await recognizer.listen(
        (result: any): Promise<void> => {
          const words = recognizer.wordLabels();
          const highestScoreIndex = result.scores.indexOf(Math.max(...result.scores));
          setdetectedWord(words[highestScoreIndex]);
          return Promise.resolve(undefined);
        },
        {
          includeSpectrogram: false,
          probabilityThreshold: 0.75
        }
      );
    }
    init();
  }, []);
  return detectedWord;
}
