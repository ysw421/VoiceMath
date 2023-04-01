import Geogebra from 'react-geogebra';
import styles from './test.module.css';
import { useState, useEffect } from 'react';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import { atom, useAtom } from 'jotai';
import { moveCamera, zoomCamera } from '../commands';
import React from 'react';

const appAtom = atom(null);
const isLoadingAtom = atom(false);

function LeftGrid(props) {
  const [app, setApp] = useAtom(appAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  function afterAppIsLoaded() {
    const app = window.ggbApplet;
    setApp(app);
    setIsLoading(true);
    app.evalCommand(`ShowGrid(false)`); // 격자선 끄기
    app.evalCommand(`ShowAxes(false)`); // 가로, 세로축 끄기
    app.evalCommand(`c: y = 4x^2 + 2x - 1`);
    app.evalCommand(`a: y = 4x`);
    app.evalCommand(`b: y = 3`);
    app.evalCommand(`d: Intersect(a, b)`);
    app.evalCommand(`O: Point({0, 0})`);

    // 화면 이동 및 줌
    // app.evalCommand(`CenterView((20, 0))`);  // 중요, 위치 설정
    // app.evalCommand('ZoomIn(5, (0.75,3))');
    // app.evalCommand('ZoomOut(5, (0.75,3))');

    // app.evalCommand(`InputBox()`);  // 신기
    // app.evalCommand(`Intersect(a, b)`); // 교점
    // app.evalCommand('Circle((5,4), 5)'); // 원
    // app.evalCommand('Segment((5,4), (-2,-3))'); // 선분
    // app.evalCommand('Line((5,4), (-2,-3))'); // 직선
    // app.evalCommand('Polygon((0,0), (5,0), (0, 2))'); // 다각형
    // app.evalCommand('Point({2,4})'); // 점
    // app.evalCommand('Text("안녕??", (2,4))'); // 텍스트
  }

  // return (
  //   <div style={{ width: '700px', height: '700px' }}>
  //     <div style={{ position: 'relative', left: '-350px' }}>
  //       <Geogebra
  //         appName="app"
  //         width={1050}
  //         height={700}
  //         showToolBar={false}
  //         showAlgebraInput={false}
  //         showMenuBar={false}
  //         showZoomButtons={false}
  //         showToolBarHelp={false}
  //         showResetIcon={false}
  //         showLogging={false}
  //         // autoHeight={true}
  //         showAnimationButton={false}
  //         showFullscreenButton={false}
  //         showSuggestionButtons={false}
  //         showStartTooltip={false}
  //         reloadOnPropChange={false}
  //         // width="700"
  //         // height="700"
  //         // //   width={windowSize.width / 2}
  //         // //   height={windowSize.height}
  //         // // prerelease={false}
  //         // showToolBar={false}
  //         borderColor={null}
  //         // showMenuBar={false}
  //         // showAlgebraInput={false}
  //         // showResetIcon={false}
  //         // // enableLabelDrags={false}
  //         // // enableShiftDragZoom={true}
  //         // // enableRightClick={true}
  //         // // capturingThreshold={null}
  //         // showToolBarHelp={false}
  //         // // errorDialogsActive={true}
  //         // // useBrowserForJS={true}
  //         // // showLogging={true
  //         // ggbbase64="" // ggb 파일 불러오기
  //         // // debug
  //         appletOnLoad={afterAppIsLoaded}
  //         // // onReady={() => <h1>⚠️ Loading</h1>s}
  //         LoadComponent={() => (
  //           <div className={styles.rightGrid}>
  //             <h1>⚠️ Loading</h1>
  //           </div>
  //         )}
  //       />
  //     </div>
  //   </div>
  // );

  return (
    <Geogebra
      appName="app"
      width={700}
      height={700}
      showToolBar={false}
      showAlgebraInput={false} //옆에 Algebra View 끔
      showMenuBar={false}
      showZoomButtons={false}
      showToolBarHelp={false}
      showResetIcon={false}
      showLogging={false}
      // autoHeight={true}
      showAnimationButton={false}
      showFullscreenButton={false}
      showSuggestionButtons={false}
      showStartTooltip={false}
      reloadOnPropChange={false}
      // width="700"
      // height="700"
      borderColor={null}
      // ggbbase64="" // ggb 파일 불러오기
      appletOnLoad={afterAppIsLoaded}
      // // onReady={() => <h1>⚠️ Loading</h1>s}
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
        $\\f(x) = x^2 + 4x -1\\$11 $\\$⭐한글 한글, 한글! test test test test이다 + 2454
      </Latex>
    </div>
  );
}

export default function Test() {
  const [camera, setCamera] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [app, setApp] = useAtom(appAtom);

  useEffect(() => {
    if (isLoading) moveCamera(app, `(${camera.x}, ${camera.y})`);
    // if (isLoading) moveCamera(app, `d`); // ex) 'd'점으로 이동
  }, [camera]);

  useEffect(() => {
    if (isLoading) zoomCamera(app, zoom, `(${camera.x}, ${camera.y})`);
  }, [zoom]);

  return (
    <div>
      <div className={styles.backGrid}>
        <LeftGrid camer={camera} />
        <RightGrid />
      </div>
      <div style={{ position: 'absolute', bottom: '50px', right: '50px', display: 'inline-grid' }}>
        <button onClick={() => setCamera({ x: camera.x - 0.5, y: camera.y })}>right</button>
        <button onClick={() => setCamera({ x: camera.x + 0.5, y: camera.y })}>left</button>
        <button onClick={() => setCamera({ x: camera.x, y: camera.y + 0.5 })}>down</button>
        <button onClick={() => setCamera({ x: camera.x, y: camera.y - 0.5 })}>up</button>
        <button onClick={() => setZoom((e) => (e <= 1 ? 1.05 : e + 0.05))}>zoom in</button>
        <button onClick={() => setZoom((e) => (e >= 1 ? 0.95 : e - 0.05))}>zoom out</button>
      </div>
    </div>
  );
}
