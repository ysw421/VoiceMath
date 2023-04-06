import styles from './test.module.css';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import { command, moveCamera, zoomCamera } from '../commands';
import React, { useState, useEffect } from 'react';

function LeftGrid(props) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.geogebra.org/apps/deployggb.js';
    document.body.appendChild(script);
    script.onload = function() {
      const parameters = {
        prerelease: false,
        width: 650,
        height: 700,
        showToolBar: false,
        borderColor: true,
        showMenuBar: false,
        showAlgebraInput: false,
        showResetIcon: true,
        enableLabelDrags: false,
        enableShiftDragZoom: true,
        enableRightClick: false,
        capturingThreshold: null,
        showToolBarHelp: false,
        errorDialogsActive: true,
        useBrowserForJS: true,
      };
      const applet = new window.GGBApplet('6.0', parameters);
      applet.inject('applet_container');
    };
  }, []);

  return (
    <div>
      <div id="applet_container"></div>
    </div>
  );
}

function RightGrid() {
  return (
    <div className={styles.rightGrid}>
      <Latex>
        We give illustrations for the three processes $e^+e^-$, gluon-gluon and $\\gamma\\gamma \\to W t\\bar b$.
        $\\f(x) = x^2 + 4x -1\\$11 $\\$⭐한글 한글, 한글! test test test Testsdfsdf
      </Latex>
      <form
        className={styles.input}
        onSubmit={(e) => {
          e.preventDefault();
          command(e.target.inputField.value);
          e.target.inputField.value = '';
        }}
      >
        Input field: <input type="text" name="inputField" size="50" />
        <button className={styles.button}> Submit</button>
      </form>
    </div>
  );
}

export default function Test() {
  const [camera, setCamera] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    moveCamera(`(${camera.x}, ${camera.y})`);
    // moveCamera(app, `d`); // ex) 'd'점으로 이동
  }, [camera]);

  useEffect(() => {
    zoomCamera(zoom, `(${camera.x}, ${camera.y})`);
  }, [zoom]);

  return (
    <div>
      <div className={styles.backGrid}>
        <LeftGrid camera={camera} />
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
