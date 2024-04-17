import 'katex/dist/katex.min.css';

import { evalCommandGetLabels, getLaTeXString, reset } from '@lib/commands';
import stt from '@lib/stt';
import React, { useState } from 'react';
import { settingVar } from 'setting';
import { Point } from 'typings';

import ScrollableLatex from './ScrollableLatex';

export default function RightGrid({
  camera
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
            className="tw-flex tw-flex-row tw-items-center tw-w-48"
            onSubmit={(e) => {
              e.preventDefault();
              if (command === '') return;
              else if (command === 'clear') {
                reset(camera);
                setLatexSentences([]);
                setCommand('');
                return;
              }
              let objLatex = evalCommandGetLabels(command);
              if (objLatex == null) objLatex = command;
              AddLatexSentence(objLatex);
              setCommand('');
            }}
          ></form>
        )}
      </div>
    </div>
  );
}
