import '@tensorflow/tfjs';

import * as speechCommands from '@tensorflow-models/speech-commands';
export default function tensorflowJS() {
  const URL = 'https://teachablemachine.withgoogle.com/models/G-paON7fc/';

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
        alert(result.scores);
        return Promise.resolve(undefined);
      },
      {
        includeSpectrogram: true,
        probabilityThreshold: 0.75
      }
    );
  }
  init();
}
