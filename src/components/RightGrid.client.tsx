import 'katex/dist/katex.min.css';

import { evalCommand } from '@lib/commands';
import stt from '@lib/stt';
import { useState } from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';

import Button from './Button';

export default function RightGrid({ text }: { text: string }) {
  const [latexText, setLatexText] = useState(text);
  const [command, setCommand] = useState('');

  return (
    <div className="tw-flex tw-flex-col tw-w-full tw-h-full tw-gap-y-4">
      <form
        className="tw-flex tw-flex-row tw-items-center tw-w-full"
        onSubmit={(e) => {
          e.preventDefault();
          evalCommand(command);
          setCommand('');
        }}
      >
        <div className="tw-w-full tw-mr-3 tw-h-11">
          <input
            type="text"
            value={command}
            placeholder="Type a command!"
            className="tw-w-full tw-h-full tw-px-2 tw-py-1 tw-border-2 tw-rounded-md"
            onChange={(e) => setCommand(e.target.value)}
          />
        </div>
        <Button>Submit</Button>
      </form>
      <div className="tw-flex tw-flex-row tw-items-center tw-gap-x-3">
        <AudioRecorder
          onRecordingComplete={(blob) => {
            stt(blob).then((value) => console.log(JSON.stringify(value)));
          }}
          audioTrackConstraints={{
            noiseSuppression: true,
            echoCancellation: true
          }}
        />
        Input via voice!
      </div>
    </div>
  );
}
