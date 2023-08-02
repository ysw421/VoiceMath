import React, { useState, useEffect } from 'react';
import styles from './mode.module.css';
import { FaAssistiveListeningSystems } from 'react-icons/fa';
import { getSpeech } from '../utils/getSpeech';
import { Link } from 'react-router-dom';
import { atom, useAtom } from 'jotai';

const mode = atom(0);

export default function Mode() {
  const [initialRender, setInitialRender] = useState(true);
  const [text, setText] = useState('');
  const [gmode, setGmode] = useAtom(mode);

  useEffect(() => {
    window.speechSynthesis.getVoices();
    // if (initialRender) {
    //   setTimeout(() => getSpeech('원하는 모드를 선택하세요'), 5000);
    // }
    const interval = setInterval(() => setText(e => e.length >= 3 ? '' : e + '.'), 500);
    return () => clearInterval(interval);
  }, [initialRender, text]);

  const ModeSelect = ({mode, imgSrc, caption}) => (
    <div className={styles[`mode${mode}`]}>
      <Link to="/select" onClick={() => setGmode(mode)}>
        <div className={styles.marginBox}>
          <img src={imgSrc} width="100%"></img>
        </div>
      </Link>
      <caption>{caption}</caption>
    </div>
  );

  return (
    <div className={styles.mainContainer}>
      <h1>원하는 모드를 선택하세요</h1>
      <div className={styles.modeBox}>
        {['그래프를 볼 수 없어요', '종이에 필기하기 어려워요', '말이 정확하지 않아요'].map((caption, index) => 
          <ModeSelect mode={index + 1} imgSrc={`images/mode${index + 1}.svg`} caption={caption} />)}
      </div>
      <div className={styles.bottom}>
        <FaAssistiveListeningSystems size={30} />
        <span style={{ width: '202px', textAlign: 'left' }}>당신의 소리를 듣고 있어요{text}</span>
      </div>
    </div>
  );
}
