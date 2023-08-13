import 'katex/dist/katex.min.css';

import { evalCommandGetLabels, getLaTeXString } from '@lib/commands';
import { reset } from '@lib/commands';
import geogebraCommand from '@lib/geogebraCommand';
import stt from '@lib/stt';
import { useState } from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';
import Latex from 'react-latex-next';
import Swal from 'sweetalert2';
import { Point } from 'typings';

import Button from './Button';
import ScrollableLatex from './ScrollableLatex';
export default function RightGrid({
  text,
  camera,
  setCamera,
  zoom,
  setZoom,
  defalutCamera,
  isDefalut,
  problemAnswer
}: {
  text: string;
  camera: Point;
  setCamera: Function;
  zoom: number;
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

  return (
    <div className="tw-flex tw-flex-col tw-w-full tw-h-full">
      <div
        className="tw-flex tw-flex-col tw-w-full tw-h-full tw-gap-y-4"
        // style={{ height: '670px' }}
      >
        <Latex>{text}</Latex>
        <ScrollableLatex latexSentences={latexSentences} />
        <form
          className="tw-flex tw-flex-row tw-items-center tw-w-full"
          onSubmit={(e) => {
            e.preventDefault();
            const objLatex = evalCommandGetLabels(command);
            AddLatexSentence(objLatex);
            setCommand('');
          }}
        >
          <div className="tw-w-full tw-mr-3 tw-h-11">
            <input
              type="text"
              value={command}
              placeholder="키보드로 입력하세요!"
              className="tw-w-full tw-h-full tw-px-2 tw-py-1 tw-border-2 tw-rounded-md"
              onChange={(e) => setCommand(e.target.value)}
            />
          </div>
          <Button>Submit</Button>
        </form>
        <div className="tw-flex tw-flex-row tw-items-center tw-gap-x-3">
          <AudioRecorder
            onRecordingComplete={(blob) => {
              stt(blob).then((dialog: JSON) => {
                const objLatex = geogebraCommand(dialog);
                //iterate through objLatex and add to latexSentences
                if (objLatex.intent == 'plot_graph') {
                  AddLatexSentence(objLatex.labels[0]);
                }
              });
            }}
            audioTrackConstraints={{
              noiseSuppression: true,
              echoCancellation: true
            }}
          />
          음성으로 입력하세요!
        </div>
      </div>
      <div className="tw-flex tw-flex-row-reverse tw-items-end tw-w-full tw-gap-x-4">
        <div className="tw-flex tw-flex-row tw-gap-2">
          <div className="tw-flex tw-flex-col tw-items-end tw-gap-y-2">
            <Button
              className="tw-w-32"
              onClick={() => {
                reset(camera);
                latexSentences.length = 1;
              }}
            >
              Clear Space
            </Button>
            <MoveBtn newPoint={new Point(camera.x + 0.5, camera.y)} text="Left" />
            <MoveBtn newPoint={new Point(camera.x, camera.y - 0.5)} text="Up" />
            <Button
              className="tw-w-32"
              onClick={() => setZoom((e: number) => (e <= 1 ? 1.05 : e + 0.05))}
            >
              Zoom In
            </Button>
          </div>
          <div className="tw-flex tw-flex-col tw-items-end tw-gap-y-2">
            <MoveBtn newPoint={defalutCamera} text={`Return to\nstarting point`} />
            <MoveBtn newPoint={new Point(camera.x - 0.5, camera.y)} text="Right" />
            <MoveBtn newPoint={new Point(camera.x, camera.y + 0.5)} text="Down" />
            <Button
              className="tw-w-32"
              onClick={() => setZoom((e: number) => (e >= 1 ? 0.95 : e - 0.05))}
            >
              Zoom Out
            </Button>
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
                  // console.log('맞은');
                  Swal.fire({
                    title: 'Good job!!',
                    html: '다른 문제도 풀어보세요.',
                    icon: 'success',
                    timer: 2000,
                    timerProgressBar: true
                  });
                } else {
                  // console.log('맞지 아니한');
                  Swal.fire({
                    title: 'Try Again',
                    html: '다시 시도해 보세요!',
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
