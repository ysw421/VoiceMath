import 'katex/dist/katex.min.css';

import styles from '@styles/ScrollableLatex.module.css';
import React, { useEffect, useRef } from 'react';
import Latex from 'react-latex-next';

interface ScrollableLatexProps {
  latexSentences: string[];
}

const ScrollableLatex: React.FC<ScrollableLatexProps> = ({ latexSentences }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [latexSentences]);

  return (
    <div
      ref={containerRef}
      style={{ overflowY: 'scroll', maxHeight: '30px' }}
      className={`tw-p-2 tw-rounded-md tw-border tw-border-gray-300 tw-relative ${styles.scrollBar}`}
    >
      {latexSentences.map((sentence, index) => (
        <div key={index} className="tw-mb-2">
          <Latex>{sentence}</Latex>
        </div>
      ))}
    </div>
  );
};

export default ScrollableLatex;
