import Geogebra from 'react-geogebra';
import styles from './test.module.css';
import { useState, useEffect } from 'react';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

function LeftGrid() {
  function afterAppIsLoaded() {
    const app = window.ggbApplet;
    app.evalCommand(`ShowGrid(false)`); // 격자선 끄기
    app.evalCommand(`ShowAxes(false)`); // 가로, 세로축 끄기
    app.evalCommand(`c: y = 4x^2 + 2x - 1`);
    app.evalCommand(`a: y = 4x`);
    app.evalCommand(`b: y = 3`);
    app.evalCommand(`d: Intersect(a, b)`);

    // app.evalCommand(`Intersect(a, b)`); // 교점
    // app.evalCommand('Circle((5,4), 5)'); // 원
    // app.evalCommand('Segment((5,4), (-2,-3))'); // 선분
    // app.evalCommand('Line((5,4), (-2,-3))'); // 직선
    // app.evalCommand('Polygon((0,0), (5,0), (0, 2))'); // 다각형
    // app.evalCommand('Point({2,4})'); // 점
    // app.evalCommand('Text("안녕??", (2,4))'); // 텍스트
  }

  return (
    <Geogebra
      width="700"
      height="700"
      //   width={windowSize.width / 2}
      //   height={windowSize.height}
      // prerelease={false}
      showToolBar={false}
      borderColor={null}
      showMenuBar={false}
      showAlgebraInput={false}
      showResetIcon={false}
      // enableLabelDrags={false}
      // enableShiftDragZoom={true}
      // enableRightClick={true}
      // capturingThreshold={null}
      showToolBarHelp={false}
      // errorDialogsActive={true}
      // useBrowserForJS={true}
      showLogging={false}
      ggbbase64="" // ggb 파일 불러오기
      // debug
      appletOnLoad={afterAppIsLoaded}
      // onReady={() => <h1>⚠️ Loading</h1>s}
      LoadComponent={() => (
        <div className={styles.rightGrid}>
          <h1>⚠️ Loading</h1>
        </div>
      )}
    />
  );
}

function RightGrid() {
  return (
    <div className={styles.rightGrid}>
      <Latex>
        We give illustrations for the three processes $e^+e^-$, gluon-gluon and $\\gamma\\gamma \\to W t\\bar b$.
        $\\f(x) = x^2 + 4x -1\\$11 $\\$⭐한글 한글, 한글!
      </Latex>
    </div>
  );
}

export default function Test() {
  return (
    <div>
      <div className={styles.backGrid}>
        <LeftGrid />
        <RightGrid />
      </div>
      <div className={styles.bottomSign}>Made with 💜</div>
    </div>
  );
}
