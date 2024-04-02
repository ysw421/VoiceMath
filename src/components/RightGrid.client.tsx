import 'katex/dist/katex.min.css';

import { getLaTeXString } from '@lib/commands';
import dialogflowToGeogebraCommand from '@lib/dialogflowToGeogebraCommand';
import stt from '@lib/stt';
import React, { useState } from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';
import { Point } from 'typings';

import Button from './Button';
import ScrollableLatex from './ScrollableLatex';

export default function RightGrid({
  enText,
  camera,
  setCamera,
  setZoom,
  defalutCamera,
  isDefalut,
  problemAnswer
}: {
  enText: string;
  camera: Point;
  setCamera: Function;
  setZoom: Function;
  defalutCamera: Point;
  isDefalut: boolean;
  problemAnswer: number;
}) {
  const [command, setCommand] = useState('');
  const [answer, setAnswer] = useState('');
  const [latexSentences, setLatexSentences] = useState<string[]>(['']);
  const AddLatexSentence = (newSentence: string) => {
    const newSentence_Latex = getLaTeXString(newSentence);
    console.log(newSentence_Latex);
    setLatexSentences((prevSentences) => [...prevSentences, newSentence_Latex]);
  };

  function MoveBtn({ newPoint, text }: { newPoint: Point; text: string }) {
    return (
      <Button
        className="tw-w-32 tw-leading-none tw-whitespace-pre-line"
        onClick={() => setCamera(newPoint)}
      >
        {text}
      </Button>
    );
  }
  function handlestt(blob: Blob) {
    stt(blob).then((dialog: JSON) => {
      console.log('Blob recieved');
      const response = dialogflowToGeogebraCommand(dialog);
      AddLatexSentence(response);
    });
  }

  return (
    <div className="tw-flex tw-flex-col tw-w-full tw-h-full">
      <div className="tw-flex tw-flex-col tw-w-full tw-h-auto tw-gap-y-4">
        <ScrollableLatex latexSentences={latexSentences} />
        <div className="tw-flex tw-flex-row tw-items-center tw-gap-x-3">
          <div>
            <AudioRecorder
              onRecordingComplete={handlestt}
              audioTrackConstraints={{
                noiseSuppression: true,
                echoCancellation: true
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
