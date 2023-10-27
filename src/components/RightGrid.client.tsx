import 'katex/dist/katex.min.css';

import { useTensorflow } from '@hooks/use-tensorflow';
import { evalCommandGetLabels, getLaTeXString, reset } from '@lib/commands';
import geogebraCommand from '@lib/geogebraCommand';
import stt from '@lib/stt';
import { router } from 'next/client';
import React, { useEffect, useState } from 'react';
import Latex from 'react-latex-next';
import { useReactMediaRecorder } from 'react-media-recorder';
import Swal from 'sweetalert2';
import { Point } from 'typings';

import Button from './Button';
import ScrollableLatex from './ScrollableLatex';
export default function RightGrid({
  text,
  camera,
  setCamera,
  setZoom,
  defalutCamera,
  isDefalut,
  problemAnswer
}: {
  text: string;
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
  const { isListening, detectedWord, init, stopRecordTeachable, startRecordTeachable } =
    useTensorflow();
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
  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
    audio: true,
    onStop: (blobUrl, blob) => {
      console.log('Blob: ', blob);
      handlestt(blob);
    }
  });
  function startCodeFairModel() {
    if (isListening) {
      stopRecordTeachable().then(() => {
        startRecording();
        const id = setInterval(() => {
          stopRecording();
        }, 10000);
        return () => {
          clearInterval(id);
        };
      });
    }
  }
  useEffect(() => {
    init()
      .then(() => {
        console.log('Init completed. Starting to record...'); // Added for debugging
        startRecordTeachable();
      })
      .catch((error) => {
        console.error('An error occurred:', error); // Added for error logging
      });
  }, []);

  useEffect(() => {
    const actions = {
      삭제: () => setLatexSentences([]),
      시작: startCodeFairModel,
      상: () => updateCamera(0, 0.5),
      하: () => updateCamera(0, -0.5),
      좌: () => updateCamera(-0.5, 0),
      우: () => updateCamera(0.5, 0),
      뒤로: router.back
    };
    if (actions[detectedWord as keyof typeof actions])
      actions[detectedWord as keyof typeof actions]();
    if (detectedWord !== 'Background Noise') console.log(detectedWord);
  }, [detectedWord]);
  const updateCamera = (dx: number, dy: number) => {
    const point = new Point(camera.x + dx, camera.y + dy);
    setCamera(point);
  };
  function handlestt(blob: Blob) {
    console.log('Blob recieved');
    stt(blob).then((dialog: JSON) => {
      const objLatex = geogebraCommand(dialog);
      if (objLatex) AddLatexSentence(objLatex.labels[0]);
      else alert('다시 말해주실 수 있나요?');
      startRecordTeachable();
    });
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
            var objLatex = evalCommandGetLabels(command);
            if (objLatex == null) objLatex = command;
            AddLatexSentence(objLatex);
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
          <div className={isListening ? 'tw-opacity-60' : 'tw-opacity-100'}>
            <Button onClick={startCodeFairModel} disabled={!isListening}>
              {' '}
              음성으로 입력하세요!{' '}
            </Button>
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
            <MoveBtn newPoint={new Point(camera.x + 0.5, camera.y)} text="Left" />
            <MoveBtn newPoint={new Point(camera.x, camera.y - 0.5)} text="Up" />
          </div>
          <div className="tw-flex tw-flex-col tw-items-end tw-gap-y-2">
            <MoveBtn newPoint={defalutCamera} text={`Return to\nstarting point`} />
            <MoveBtn newPoint={new Point(camera.x - 0.5, camera.y)} text="Right" />
            <MoveBtn newPoint={new Point(camera.x, camera.y + 0.5)} text="Down" />
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
