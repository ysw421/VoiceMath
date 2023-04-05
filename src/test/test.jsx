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
  
}

function RightGrid() {
  return (
    <div className={styles.rightGrid}>
      <Latex>
        We give illustrations for the three processes $e^+e^-$, gluon-gluon and $\\gamma\\gamma \\to W t\\bar b$.
        $\\f(x) = x^2 + 4x -1\\$11 $\\$⭐한글 한글, 한글! test test test Testsdfsdf
        
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
