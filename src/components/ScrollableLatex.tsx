import 'katex/dist/katex.min.css';

import styles from '@styles/ScrollableLatex.module.css';
import React, { useEffect, useRef } from 'react';
import Latex from 'react-latex-next';

interface ScrollableLatexProps {
  latexSentences: string[];
}

const ScrollableLatex: React.FC<ScrollableLatexProps> = ({ latexSentences }) => {
  // const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current !== null) scrollRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [latexSentences]);

  return (
    <div
      style={{ height: '22rem', overflowY: 'scroll' }}
      className={`tw-p-2 tw-rounded-md tw-border tw-border-gray-300 tw-relative ${styles.scrollBar}`}
    >
      {latexSentences.map((sentence, index) => (
        <div key={index} className="tw-mb-2">
          <Latex>{sentence}</Latex>
        </div>
      ))}
      <div ref={scrollRef}></div>
    </div>
  );
};

export default ScrollableLatex;
