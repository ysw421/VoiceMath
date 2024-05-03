'use client';
import 'katex/dist/katex.min.css';

import { evalCommand, getLaTeXString } from '@lib/commands';
import stt from '@lib/stt';
import React, { useEffect, useState } from 'react';

import ScrollableLatex from './ScrollableLatex';

interface RightGridProps {
  setIsRecording: (recording: boolean) => void;
}

const RightGrid: React.FC<RightGridProps> = ({ setIsRecording }) => {
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
    <div className="tw-w-full tw-h-full" style={{ height: '30px', overflowY: 'auto' }}>
      <ScrollableLatex latexSentences={latexSentences} />
    </div>
  );
};

export default RightGrid;
