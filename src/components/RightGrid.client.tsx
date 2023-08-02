import 'katex/dist/katex.min.css';

import { evalCommand } from '@lib/commands';
import stt from '@lib/stt';
import { useState } from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';
import Latex from 'react-latex-next';

export default function RightGrid({ text }: { text: string }) {
  const [latexText, setLatexText] = useState(text);
  const [command, setCommand] = useState('');

  return (
    <div className="tw-w-full tw-h-full tw-text-3xl tw-text-left">
      <fieldset>
        --테스트용--
        <div className="tw-float-right tw-w-full">
          <br />
          <form
            className="tw-border-2 tw-rounded-md tw-w-[70%] tw-px-[14px] tw-py-[20px] tw-mx-[8px]"
            onSubmit={(e) => {
              e.preventDefault();
              evalCommand(command);
              setCommand('');
            }}
          >
            Command: <input type="text" onChange={(e) => setCommand(e.target.value)} />
            <button className="tw-inline-block tw-text-base tw-text-center tw-text-white tw-bg-black tw-rounded-md">
              {' '}
              Submit
            </button>
          </form>
          <br />
          <div>
            <AudioRecorder
              onRecordingComplete={(blob) => {
                stt(blob).then((value) => console.log(JSON.stringify(value)));
              }}
              audioTrackConstraints={{
                noiseSuppression: true,
                echoCancellation: true
              }}
            />
          </div>
        </div>
      </fieldset>
      <Latex>{latexText}</Latex>
    </div>
  );
}
