import styles from './select.module.css';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Select() {
  return (
    <div className={styles.screen}>
      <h1>문제를 선택하세요</h1>
      <div className={styles.screenContainer}>
        <h3>빈 템플릿</h3>
        <div className={styles.group}>
          <Link
            to="/test"
            state={{
              name: 'p1',
              text: `새로운 메모에 오신 것을 환영합니다.<br/>마음껏 메모하세요! $y=x^2$`,
              geogebra: '',
            }}
            className={styles.box}
          >
            빈 템플릿
          </Link>
          <Link className={styles.box}>빈 템플릿</Link>
        </div>
        <h3>모의고사</h3>
        <div className={styles.group}>
          <Link to="/test" state={{ name: 'p1', text: 'hello?', geogebra: '' }} className={styles.box}>
            가나다
          </Link>
          <Link to="/test" state={{ name: 'p1', text: 'hello?', geogebra: '' }} className={styles.box}>
            가나다
          </Link>
          <Link className={styles.box}>가나다</Link>
          <Link className={styles.box}>가나다</Link>
          <Link className={styles.box}>가나다</Link>
          <Link className={styles.box}>가나다</Link>
          <Link className={styles.box}>가나다</Link>
        </div>
      </div>
    </div>
  );
}
