import 'katex/dist/katex.min.css';

import React, { useRef } from 'react';
import Latex from 'react-latex-next';

interface ScrollableLatexProps {
  latexSentences: string[];
}

const ScrollableLatex: React.FC<ScrollableLatexProps> = ({ latexSentences }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      style={{ height: '22rem', overflowY: 'scroll' }}
      className="bg-white p-4 border border-gray-300"
    >
      {latexSentences.map((sentence, index) => (
        <div key={index} className="mb-4">
          <Latex>{sentence}</Latex>
        </div>
      ))}
    </div>
  );
};

export default ScrollableLatex;
