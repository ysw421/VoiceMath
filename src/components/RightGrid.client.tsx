'use client';
import 'katex/dist/katex.min.css';

import { evalCommand, getLaTeXString } from '@lib/commands';
import stt from '@lib/stt';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { settingVar } from 'setting';
import { Point } from 'typings';

import ScrollableLatex from './ScrollableLatex';

export default function RightGrid() {
  const AudioRecorder = settingVar.isShowVoiceBtn
    ? dynamic(() => import('react-audio-voice-recorder').then((module) => module.AudioRecorder))
    : null;

  const [command, setCommand] = useState('');
  // const [answer, setAnswer] = useState('');
  const [latexSentences, setLatexSentences] = useState<string[]>(['']);

  const AddLatexSentence = (newSentence: string) => {
    const newSentence_Latex = getLaTeXString(newSentence);
    console.log(newSentence_Latex);
    setLatexSentences((prevSentences) => [...prevSentences, newSentence_Latex]);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const eventSource = new EventSource('http://localhost:8000/events');
      eventSource.onmessage = (event) => {
        if (event.data == 'started') {
          setIsRecording(true);
        }
        if (event.data == 'ended') {
          setIsRecording(false);
        } else {
          // @ts-ignore
          stt(event.data).then((commandLists: string[]) => {
            commandLists.forEach((commandGGB) => {
              evalCommand(commandGGB);
              AddLatexSentence(commandGGB);
            });
          });
        }
      };
    }
  }, []);

  return (
    <div className="tw-flex tw-flex-col tw-w-full tw-h-full tw-overflow-hidden">
      <div className="tw-flex tw-flex-col tw-w-full tw-h-full tw-gap-y-4">
        <ScrollableLatex latexSentences={latexSentences} />
        {settingVar.isShowKeyboardBox && (
          <form
            className="tw-flex tw-flex-row tw-items-center tw-w-full"
            onSubmit={(e) => {
              e.preventDefault();
              if (command === '') return;
              else if (command === 'clear') {
                reset(new Point(0, 0));
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
        {settingVar.isShowVoiceBtn && AudioRecorder && (
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
};

export default RightGrid;
