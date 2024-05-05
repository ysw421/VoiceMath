import 'katex/dist/katex.min.css';

import styles from '@styles/ScrollableLatex.module.css';
import React, { useEffect, useRef } from 'react';
import Latex from 'react-latex-next';
import { settingVar } from 'setting';

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
      style={{ overflowY: 'scroll' }}
      className={`tw-px-2 tw-h-full tw-rounded-md tw-border tw-border-gray-300 tw-relative ${styles.scrollBar}`}
    >
      {settingVar.isShowOneCommand && latexSentences.length > 0 ? (
        <div>
          <Latex>{latexSentences[latexSentences.length - 1]}</Latex>
        </div>
      ) : (
        latexSentences.map((sentence, index) => (
          <div key={index}>
            <Latex>{sentence}</Latex>
          </div>
        ))
      )}
      <div ref={scrollRef}></div>
    </div>
  );
};

export default ScrollableLatex;
