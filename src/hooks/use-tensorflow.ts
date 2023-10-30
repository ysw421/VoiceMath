import '@tensorflow/tfjs';

import { isKoreanAtom } from '@pages/mode';
import * as speechCommands from '@tensorflow-models/speech-commands';
import { useAtom } from 'jotai/index';
import { useRef, useState } from 'react';

export function useTensorflow() {
  const [isKorean, setIsKorean] = useAtom(isKoreanAtom);
  const [detectedWord, setDetectedWord] = useState<string>('');
  const recognizer = useRef<speechCommands.SpeechCommandRecognizer>();
  const [isListening, setisListening] = useState<boolean>(false);
  const init = async () => {
    const URL = 'http://localhost:3000/static/tensorflowmodel-draw-eng/';
    try {
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

  const stopRecordTeachable = async () => {
    setisListening(false);
    try {
      await recognizer.current?.stopListening();
      console.log('Stopped Listening');
    } catch (error) {
      console.log('Cannot stop listening');
    }
  };

  const startRecordTeachable = async () => {
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
          probabilityThreshold: 0.85,
          overlapFactor: 0.7
        }
      );
      console.log('Started Listening');
    } catch (error) {
      console.log('Cannot Start listening');
    }
  };
  return { init, stopRecordTeachable, startRecordTeachable, detectedWord, isListening };
}
