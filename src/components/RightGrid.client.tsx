import 'katex/dist/katex.min.css';

import { useTensorflow } from '@hooks/use-tensorflow';
import { evalCommandGetLabels, getLaTeXString, reset } from '@lib/commands';
import geogebraCommand from '@lib/geogebraCommand';
import stt from '@lib/stt';
import { langAtom } from '@pages/mode';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import Latex from 'react-latex-next';
import { useReactMediaRecorder } from 'react-media-recorder';
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
  const [lang, setLang] = useAtom(langAtom);
  const [latexSentences, setLatexSentences] = useState<string[]>(['']);
  const { isListening, detectedWord, init, stopRecordTeachable, startRecordTeachable } =
    useTensorflow();
  const AddLatexSentence = (newSentence: string) => {
    const newSentence_Latex = getLaTeXString(newSentence);
    console.log(newSentence_Latex);
    setLatexSentences((prevSentences) => [...prevSentences, newSentence_Latex]);
  };
  const [timer, setTimer] = useState(7);
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
    onStart: () => {
      setTimer(7);
    },
    onStop: (blobUrl, blob) => {
      console.log('Blob: ', blob);
      handlestt(blob);
    }
  });
  useEffect(() => {
    if (timer > 0 && !isListening) {
      const id = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => {
        clearInterval(id);
      };
    }
  }, [timer, isListening]);
  function startCodeFairModel() {
    if (isListening) {
      stopRecordTeachable().then(() => {
        startRecording();
        const id = setInterval(() => {
          stopRecording();
        }, 7000);
        return () => {
          clearInterval(id);
        };
      });
    }
  }
  useEffect(() => {
    init('http://localhost:3000/static/tensorflowmodel-draw-eng/')
      .then(() => {
        console.log('Init completed. Starting to record...'); // Added for debugging
        startRecordTeachable();
      })
      .catch((error) => {
        console.error('An error occurred:', error); // Added for error logging
      });
  }, []);

  const clearLatex = () => setLatexSentences([]);
  const startModel = startCodeFairModel;
  const moveCamera = (x: number, y: number) => updateCamera(x, y);

  const actionKeys =
    lang === 'ko-KR'
      ? { stop: '삭제', go: '시작', up: '상', down: '하', left: '좌', right: '우' }
      : lang == 'en-US'
      ? { stop: 'stop', go: 'go', up: 'up', down: 'down', left: 'left', right: 'right' }
      : { stop: 'stop', go: 'go', up: 'up', down: 'down', left: 'left', right: 'right' };
  const actions = {
    [actionKeys.stop]: clearLatex,
    [actionKeys.go]: startModel,
    [actionKeys.up]: () => moveCamera(0, 0.5),
    [actionKeys.down]: () => moveCamera(0, -0.5),
    [actionKeys.left]: () => moveCamera(-0.5, 0),
    [actionKeys.right]: () => moveCamera(0.5, 0)
  };

  useEffect(() => {
    if (actions[detectedWord as keyof typeof actions]) {
      actions[detectedWord as keyof typeof actions]();
    }
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
      if (objLatex.labels) AddLatexSentence(objLatex.labels[0]);
      else if (objLatex.StringValue) AddLatexSentence(objLatex.StringValue);
      else
        alert(
          lang === 'ko-KR'
            ? '다시 말하실 수 있을까요?'
            : lang === 'en-US'
            ? 'Can you try again?'
            : ''
        );
      startRecordTeachable();
    });
  }
  return (
    <div className="tw-flex tw-flex-col tw-w-full tw-h-full">
      <div
        className="tw-flex tw-flex-col tw-w-full tw-h-full tw-gap-y-4"
        // style={{ height: '670px' }}
      >
        <Latex>{lang === 'ko-KR' ? koText : lang === 'en-US' ? enText : ''}</Latex>
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
              placeholder={
                lang === 'ko-KR'
                  ? '키보드로 입력하세요!'
                  : lang === 'en-US'
                  ? 'Type on the keyboard!'
                  : ''
              }
              className="tw-w-full tw-h-full tw-px-2 tw-py-1 tw-border-2 tw-rounded-md"
              onChange={(e) => setCommand(e.target.value)}
            />
          </div>
          <Button> {lang === 'ko-KR' ? '제출' : lang === 'en-US' ? 'Submit' : ''}</Button>
        </form>
        <div className="tw-flex tw-flex-row tw-items-center tw-gap-x-3">
          <div className={isListening ? 'tw-opacity-60' : 'tw-opacity-100'}>
            <Button onClick={startCodeFairModel} disabled={!isListening}>
              {!isListening
                ? lang === 'ko-KR'
                  ? `${timer}초간 말하세요!`
                  : lang === 'en-US'
                  ? `Talk for ${timer} seconds!`
                  : ''
                : lang === 'ko-KR'
                ? '음성으로 입력하세요!'
                : lang === 'en-US'
                ? 'Input using your voice!'
                : ''}
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
              {lang === 'ko-KR' ? '전체 지우기' : lang === 'en-US' ? 'Clear Space' : ''}
            </Button>
            <MoveBtn
              newPoint={new Point(camera.x + 0.5, camera.y)}
              text={lang === 'ko-KR' ? '왼쪽' : lang === 'en-US' ? 'Left' : ''}
            />
            <MoveBtn
              newPoint={new Point(camera.x, camera.y - 0.5)}
              text={lang === 'ko-KR' ? '위' : lang === 'en-US' ? 'Up' : ''}
            />
          </div>
          <div className="tw-flex tw-flex-col tw-items-end tw-gap-y-2">
            <MoveBtn
              newPoint={defalutCamera}
              text={
                lang === 'ko-KR'
                  ? '카메라 초기화'
                  : lang === 'en-US'
                  ? `Return to\nstarting point`
                  : ''
              }
            />
            <MoveBtn
              newPoint={new Point(camera.x - 0.5, camera.y)}
              text={lang === 'ko-KR' ? '오른쪽' : lang === 'en-US' ? 'Right' : ''}
            />
            <MoveBtn
              newPoint={new Point(camera.x, camera.y + 0.5)}
              text={lang === 'ko-KR' ? '아래' : lang === 'en-US' ? 'Down' : ''}
            />
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
                    html:
                      lang === 'ko-KR'
                        ? '다른 문제도 풀어보세요.'
                        : lang === 'en-US'
                        ? 'Try another problem!'
                        : '',
                    icon: 'success',
                    timer: 2000,
                    timerProgressBar: true
                  });
                } else {
                  // console.log('맞지 아니한');
                  Swal.fire({
                    title: 'Try Again',
                    html:
                      lang === 'ko-KR'
                        ? '다시 시도해 보세요!'
                        : lang === 'en-US'
                        ? 'Try again!'
                        : '',
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
