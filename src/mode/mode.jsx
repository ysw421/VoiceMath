import React, { useState, useEffect } from 'react';
import styles from './mode.module.css';
import { FaAssistiveListeningSystems } from 'react-icons/fa';
import { getSpeech } from '../utils/getSpeech';
import { Link } from 'react-router-dom';
import { atom, useAtom } from 'jotai';

function ModeBox(props) {}
//커밋 되는지 확인
const mode = atom(0);

export default function Mode() {
  const [initialRender, setInitialRender] = useState(true);
  const [text, setText] = useState('');

  const [gmode, setGmode] = useAtom(mode);

  function handleSetMode(e) {
    setGmode(e);
  }

  useEffect(() => {
    window.speechSynthesis.getVoices();
  }, []);

  useEffect(() => {
    if (initialRender) {
      setTimeout(function() {
        // console.log('speech');
        getSpeech(
          '원하는 모드를 선택하세요'
        );
        // getSpeech('원하는 모드');
      }, 5000);
      // setInitialRender(false);
    }
  }, [initialRender]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (text.length >= 3) {
        setText('');
      } else {
        setText((e) => e + '.');
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [text]);

  return (
    <div className={styles.mainContainer}>
      <h1>원하는 모드를 선택하세요</h1>
      <div className={styles.modeBox}>
        <div className={styles.mode1}>
          {/* <div>hello</div> */}
          <Link to="/select" onClick={() => handleSetMode(1)}>
            <div className={styles.marginBox}>
              <img src="images/mode1.svg" width="100%"></img>
            </div>
          </Link>
          <caption>그래프를 볼 수 없어요</caption>
        </div>
        <div className={styles.mode2}>
          {/* <div>hello</div> */}
          <Link to="/select" onClick={() => handleSetMode(2)}>
            <div className={styles.marginBox}>
              <img src="images/mode2.svg" width="100%"></img>
            </div>
          </Link>
          <caption>종이에 필기하기 어려워요</caption>
        </div>
        <div className={styles.mode3}>
          {/* <div>hello</div> */}
          <Link to="/select" onClick={() => handleSetMode(3)}>
            <div className={styles.marginBox}>
              <img src="images/mode3.svg" width="100%"></img>
            </div>
          </Link>
          <caption>말이 정확하지 않아요</caption>
        </div>
      </div>
      <div className={styles.bottom}>
        <FaAssistiveListeningSystems size={30} />
        <span style={{ width: '202px', textAlign: 'left' }}>당신의 소리를 듣고 있어요{text}</span>
      </div>
    </div>
  );
}
