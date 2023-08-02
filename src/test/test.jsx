import styles from './test.module.css';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import { command, moveCamera, zoomCamera, drawCircle, drawLine, drawSegment } from '../commands/commands';
import React, { useState, useEffect } from 'react';
import { ReactMediaRecorder, useReactMediaRecorder  } from "react-media-recorder";
import { sendAudioToModel } from '../asr/get_string_from_model.js'
import { useLocation } from 'react-router-dom';

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
        ggbBase64: props.geogebra,
      };
      const applet = new window.GGBApplet('6.0', parameters);
      applet.inject('applet_container');
      moveCamera(`(0, 0)`);
    };
  }, []);

  return (
    <div>
      <div id="applet_container"></div>
    </div>
  );
}

function RightGrid(props) {
  var [latexText, setLatexText] = useState(props.text);
  
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ audio: true });
  const [isRecording, setIsRecording] = useState(false);

  const handleRecording = async () => {
    if (isRecording) {
      stopRecording();
      // const audioBlob = await fetch(mediaBlobUrl).then((r) => r.blob());
      // const audioUrl = URL.createObjectURL(audioFile);
      // console.log(audioUrl)
      // // const audioFile = new File([audioBlob], 'voice.wav', { type: 'audio/wav' });
      // sendAudioToModel()
      // setLatexText = await (audioBlob)
    
      console.log(setLatexText)
    } else {
      startRecording();
    }
    setIsRecording(!isRecording);
  }
  
  return (
    <div className={styles.rightGrid}>
      <fieldset>
        --테스트용--
        <div style={{ float: 'right', width: '100%' }}>
          <br />
          <form
            className={styles.input}
            onSubmit={(e) => {
              e.preventDefault();
              command(e.target.inputField.value);
              e.target.inputField.value = '';
            }}
          >
            Command: <input type="text" name="inputField" size="50" />
            <button className={styles.button}> Submit</button>
          </form>
          <br />
          <div>
            <button className={styles.button} onClick={handleRecording}> 
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
          </div>
        </div>
      </fieldset>
      <Latex>{latexText}</Latex>
    </div>
  );
}

export default function Test() {
  const [camera, setCamera] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  let location = useLocation().state;

  console.log('#########');
  console.log(location);
  if (location !== null) {
    console.log(location.state);
  } else {
    location = {
      name: 'none',
      text: '새로운 메모!',
      geogebra:
        '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',
    };
  }

  useEffect(() => {
    moveCamera(`(${camera.x}, ${camera.y})`);
  }, [camera]);
  useEffect(() => {
    zoomCamera(zoom, `(${camera.x}, ${camera.y})`);
  }, [zoom]);

  return (
    <div>
      <div className={styles.backGrid}>
        <LeftGrid camera={camera} geogebra={location.geogebra} />
        <RightGrid text={location.text} />
      </div>
      {/* <div className={styles.answerBox}></div>
      <div style={{ position: 'absolute', bottom: '80px', right: '50px', display: 'inline-grid' }}>
        <button onClick={() => setCamera({ x: camera.x - 0.5, y: camera.y })}>right</button>
        <button onClick={() => setCamera({ x: camera.x + 0.5, y: camera.y })}>left</button>
        <button onClick={() => setCamera({ x: camera.x, y: camera.y + 0.5 })}>down</button>
        <button onClick={() => setCamera({ x: camera.x, y: camera.y - 0.5 })}>up</button>
        <button onClick={() => setZoom((e) => (e <= 1 ? 1.05 : e + 0.05))}>zoom in</button>
        <button onClick={() => setZoom((e) => (e >= 1 ? 0.95 : e - 0.05))}>zoom out</button>
        <button onClick={() => drawCircle(`(${camera.x}, ${camera.y})`, 0.5)}>draw circle</button>
        <button onClick={() => drawLine(`(${camera.x}, ${camera.y})`, `(${camera.x + 5}, ${camera.y + 5})`)}>
          draw line
        </button>
        <button onClick={() => drawSegment(`(${camera.x}, ${camera.y})`, `(${camera.x + 5}, ${camera.y + 5})`)}>
          draw Segment
        </button>
  </div> */}
    </div>
  );
}
