'use client';
import 'katex/dist/katex.min.css';

import { evalCommand, getLaTeXString, reset, zoomCamera, zoomCameraOut } from '@lib/commands';
import stt from '@lib/stt';
import React, { useEffect, useState } from 'react';
import { Point } from 'typings';

import ScrollableLatex from './ScrollableLatex';

interface RightGridProps {
  setIsRecording: (recording: boolean) => void;
  currentCamera: Point;
}

const RightGrid: React.FC<RightGridProps> = ({ setIsRecording, currentCamera }) => {
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
        }
        if (event.data.includes('Reset') || event.data.includes('reset')) {
          reset(currentCamera);
          setLatexSentences(['']);
        }
        if (event.data.includes('increase') || event.data.includes('Increase')) {
          zoomCamera(5, currentCamera);
        }
        if (event.data.includes('decrease') || event.data.includes('Decrease')) {
          zoomCameraOut(5, currentCamera);
        } else {
          stt(event.data).then((commandLists: string[] | undefined) => {
            if (commandLists)
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
    <div className="tw-w-full tw-h-full" style={{ height: '30px', overflowY: 'auto' }}>
      <ScrollableLatex latexSentences={latexSentences} />
    </div>
  );
};

export default RightGrid;
