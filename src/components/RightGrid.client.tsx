import 'katex/dist/katex.min.css';

import { evalCommandGetLabels, getLaTeXString, reset } from '@lib/commands';
import stt from '@lib/stt';
import React, { useState } from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';
import { settingVar } from 'setting';
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
  // const [answer, setAnswer] = useState('');
  const [latexSentences, setLatexSentences] = useState<string[]>(['']);
  const AddLatexSentence = (newSentence: string) => {
    const newSentence_Latex = getLaTeXString(newSentence);
    console.log(newSentence_Latex);
    setLatexSentences((prevSentences) => [...prevSentences, newSentence_Latex]);
  };
  function handlestt(blob: Blob) {
    stt(blob).then((dialog: string) => {
      AddLatexSentence(dialog);
    });
  }

  return (
    <div className="tw-flex tw-flex-col tw-w-full tw-h-full">
      <div className="tw-flex tw-flex-col tw-w-full tw-h-full tw-gap-y-4">
        <ScrollableLatex latexSentences={latexSentences} />
        {settingVar.isShowKeyboardBox && (
          <form
            className="tw-flex tw-flex-row tw-items-center tw-w-full"
            onSubmit={(e) => {
              e.preventDefault();
              if (command === '') return;
              else if (command === 'clear') {
                reset(camera);
                setLatexSentences([]);
                setCommand('');
                return;
              }
              var objLatex = evalCommandGetLabels(command);
              if (objLatex == null) objLatex = command;
              AddLatexSentence(objLatex);
              setCommand('');
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
        )}
        {settingVar.isShowVoiceBtn && (
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
        )}
      </div>
    </div>
  );
}
