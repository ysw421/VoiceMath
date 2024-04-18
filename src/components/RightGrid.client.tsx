'use client';
import 'katex/dist/katex.min.css';

import { getLaTeXString } from '@lib/commands';
import React, { useEffect, useState } from 'react';

import ScrollableLatex from './ScrollableLatex';

export default function RightGrid() {
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
        console.log('New event from server:', event.data);
      };

      eventSource.onerror = (error) => {
        console.error('EventSource failed:', error);
        eventSource.close(); // Properly close the connection on error
      };

      return () => {
        eventSource.close(); // Cleanup on component unmount
      };
    }
  }, []);

  return (
    <div className="tw-flex tw-flex-col tw-w-full tw-h-full">
      <ScrollableLatex latexSentences={latexSentences} />
    </div>
  );
}
