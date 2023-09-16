const tf = require('@tensorflow/tfjs');
const speechCommands = require('@tensorflow-models/speech-commands');
let recognizerSingleton: any | null = null;

export default async function tensorflowjsInit(
  clearButtonCallback: Function,
  startButtonCallback: Function
) {
  if (recognizerSingleton) {
    return recognizerSingleton;
  }

  const URL = 'https://teachablemachine.withgoogle.com/models/G-paON7fc/';
  const checkpointURL = URL + 'model.json';
  const metadataURL = URL + 'metadata.json';

  const recognizer = speechCommands.create('BROWSER_FFT', undefined, checkpointURL, metadataURL);
  await recognizer.ensureModelLoaded();

  recognizerSingleton = recognizer;

  recognizer.listen(
    (result: any) => {
      const { scores } = result;
      const words = recognizer.wordLabels();
      const highestScoreIndex = scores.indexOf(Math.max(...scores));
      const detectedWord = words[highestScoreIndex];

      if (detectedWord === '시작') {
        startButtonCallback();
        console.log('시작');
      } else if (detectedWord === '삭제') {
        clearButtonCallback();
        console.log('삭제');
      }
    },
    { probabilityThreshold: 0.75 }
  );

  return recognizerSingleton;
}
