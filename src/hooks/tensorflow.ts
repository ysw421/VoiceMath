import '@tensorflow/tfjs';

import * as speechCommands from '@tensorflow-models/speech-commands';
import { useState } from 'react';
export default function tensorflow(): number {
  const URL = 'https://teachablemachine.withgoogle.com/models/G-paON7fc/';
  const [index, setIndex] = useState(0);
  async function createModel() {
    const checkpointURL = URL + 'model.json'; // model topology
    const metadataURL = URL + 'metadata.json'; // model metadata
    const recognizer = speechCommands.create('BROWSER_FFT', undefined, checkpointURL, metadataURL);
    // check that model and metadata are loaded via HTTPS requests.
    await recognizer.ensureModelLoaded();
    return recognizer;
  }

  async function init() {
    const recognizer = await createModel();
    const classLabels = recognizer.wordLabels(); // get class labels
    // listen() takes two arguments:
    // 1. A callback function that is invoked anytime a word is recognized.
    // 2. A configuration object with adjustable fields
    await recognizer.listen(
      (result): Promise<void> => {
        console.log(classLabels, result.scores);
        return Promise.resolve(undefined);
      },
      {
        includeSpectrogram: false,
        probabilityThreshold: 0.75
      }
    );
  }
  init();
  return 0;
}
