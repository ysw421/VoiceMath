import 'katex/dist/katex.min.css';

import { evalCommandGetLabels, getLaTeXString, reset } from '@lib/commands';
import dialogflowToGeogebraCommand from '@lib/dialogflowToGeogebraCommand';
import stt from '@lib/stt';
import React, { useState } from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';
import Swal from 'sweetalert2';
import { Point } from 'typings';

import Button from './Button';
import ScrollableLatex from './ScrollableLatex';

export default function RightGrid({
  koText,
  enText,
  camera,
  setCamera,
  setZoom,
  defalutCamera,
  isDefalut,
  problemAnswer
}: {
  koText: string;
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
  const clearLatex = () => setLatexSentences([]);
  const moveCamera = (x: number, y: number) => updateCamera(x, y);

  const updateCamera = (dx: number, dy: number) => {
    const point = new Point(camera.x + dx, camera.y + dy);
    setCamera(point);
  };
  function handlestt(blob: Blob) {
    stt(blob).then((dialog: JSON) => {
      console.log('Blob recieved');
      const response = dialogflowToGeogebraCommand(dialog);
      AddLatexSentence(response);
    });
  }
  return (
    <div className="tw-flex tw-flex-col tw-w-full tw-h-full">
      <div
        className="tw-flex tw-flex-col tw-w-full tw-h-full tw-gap-y-4"
        // style={{ height: '670px' }}
      >
        <ScrollableLatex latexSentences={latexSentences} />
        <form
          className="tw-flex tw-flex-row tw-items-center tw-w-full"
          onSubmit={(e) => {
            e.preventDefault();
            var objLatex = evalCommandGetLabels(command);
            if (objLatex == null) objLatex = command;
            AddLatexSentence(objLatex);
          }}
        >
          <div className="tw-w-full tw-mr-3 tw-h-11">
            <input
              type="text"
              value={command}
              placeholder={'Type on the keyboard!'}
              className="tw-w-full tw-h-full tw-px-2 tw-py-1 tw-border-2 tw-rounded-md"
              onChange={(e) => setCommand(e.target.value)}
            />
          </div>
          <Button> {'Submit'}</Button>
        </form>
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
      <div className="tw-flex tw-flex-row-reverse tw-items-end tw-w-full tw-gap-x-4">
        <div className="tw-flex tw-flex-row tw-gap-2">
          <div className="tw-flex tw-flex-col tw-items-end tw-gap-y-2">
            <Button
              className="tw-w-32"
              onClick={() => {
                reset(camera);
                setLatexSentences([]);
              }}
            >
              Clear Space
            </Button>
            <MoveBtn newPoint={new Point(camera.x + 0.5, camera.y)} text={'Left'} />
            <MoveBtn newPoint={new Point(camera.x, camera.y - 0.5)} text={'Up'} />
          </div>
          <div className="tw-flex tw-flex-col tw-items-end tw-gap-y-2">
            <MoveBtn newPoint={defalutCamera} text={`Return to\nstarting point`} />
            <MoveBtn newPoint={new Point(camera.x - 0.5, camera.y)} text={'Right'} />
            <MoveBtn newPoint={new Point(camera.x, camera.y + 0.5)} text={'Down'} />
          </div>
        </div>
        {!isDefalut && (
          <div className="tw-w-full">
            <h3>Answer</h3>
            <form
              className="tw-flex tw-flex-row tw-items-center tw-w-full"
              onSubmit={(e) => {
                e.preventDefault();
                if (problemAnswer === parseInt(answer)) {
                  Swal.fire({
                    title: 'Good job!!',
                    html: 'Try another problem!',
                    icon: 'success',
                    timer: 2000,
                    timerProgressBar: true
                  });
                } else {
                  Swal.fire({
                    title: 'Try Again',
                    html: 'Try again!',
                    icon: 'error',
                    timer: 2000,
                    timerProgressBar: true
                  });
                }
                setAnswer('');
              }}
            >
              <div className="tw-w-full tw-mr-3 tw-h-11">
                <input
                  type="number"
                  value={answer}
                  placeholder="Type a answer!"
                  className="tw-w-full tw-h-full tw-px-2 tw-py-1 tw-border-2 tw-rounded-md"
                  onChange={(e) => setAnswer(e.target.value)}
                />
              </div>
              <Button>Submit</Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
