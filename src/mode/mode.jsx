import React, { useState, useEffect } from 'react';
import styles from './mode.module.css';
import { FaAssistiveListeningSystems } from 'react-icons/fa';
import { getSpeech } from '../utils/getSpeech';

export default function Mode() {
  const [initialRender, setInitialRender] = useState(true);
  const [text, setText] = useState('');

  useEffect(() => {
    window.speechSynthesis.getVoices();
  }, []);

  useEffect(() => {
    if (initialRender) {
      setTimeout(function() {
        getSpeech('원하는 모드를 선택하세요. 모드에는');
      }, 2200);
      setInitialRender(false);
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

  // useEffect(() => {
  // setInterval(() => {
  //   console.log(getSpeech('원하는 모드를 선택하세요. 모드에는'));
  // }, 200);
  // clearInterval(intervalId)
  // });

  return (
    <div className={styles.mainContainer}>
      <h1>모드를 선택하세요</h1>
      <div className={styles.modeBox}>
        <div className={styles.mode1}>
          {/* <div>hello</div> */}
          <div className={styles.marginBox}>
            <img src="images/mode1.svg" width="100%"></img>
          </div>
          <caption>그래프를 볼 수 없어요</caption>
        </div>
        <div className={styles.mode2}>
          {/* <div>hello</div> */}
          <div className={styles.marginBox}>
            <img src="images/mode2.svg" width="100%"></img>
          </div>
          <caption>종이에 필기하기 어려워요</caption>
        </div>
        <div className={styles.mode3}>
          {/* <div>hello</div> */}
          <div className={styles.marginBox}>
            <img src="images/mode3.svg" width="100%"></img>
          </div>
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
