import React from 'react';
import styles from './mode.module.css';
import { FaAssistiveListeningSystems } from 'react-icons/fa';

export default function Mode() {
  return (
    <div className={styles.mainContainer}>
      <h1>모드를 선택하세요</h1>
      <div className={styles.modeBox}>
        <div className={styles.mode1}>
          <div>hello</div>
          <caption>그래프를 볼 수 없어요</caption>
        </div>
        <div className={styles.mode2}>
          <div>hello</div>
          <caption>종이에 필기하기 어려워요</caption>
        </div>
        <div className={styles.mode3}>
          <div>hello</div>
          <caption>말이 정확하지 않아요</caption>
        </div>
      </div>
      <div className={styles.bottom}>
        <FaAssistiveListeningSystems size={30} />
        <span>당신의 소리를 듣고 있어요</span>
      </div>
    </div>
  );
}
