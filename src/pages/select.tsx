import Template from '@components/templates/Template';
import Link from 'next/link';
import React from 'react';

import items from './items';
import styles from './select.module.css';

export default function Select() {
  return (
    <Template>
      <div className={styles.screen}>
        <h1 className="tw-font-bold">문제를 선택하세요</h1>
        <div className={styles.screenContainer}>
          <h3>빈 템플릿</h3>
          <div className={styles.group}>
            <Link
              href={{
                pathname: '/draw',
                query: items[0]
              }}
              className={styles.box}
            >
              빈 템플릿
            </Link>
            <Link
              href={{
                pathname: '/draw',
                query: items[0]
              }}
              className={styles.box}
            >
              빈 템플릿
            </Link>
          </div>
          <h3>모의고사</h3>
          <div className={styles.group}>
            <Link
              href={{
                pathname: '/draw',
                query: items[1]
              }}
              className={styles.box}
            >
              가나다
            </Link>
            <Link
              href={{
                pathname: '/draw',
                query: {
                  name: 'p1',
                  text: 'hello?',
                  geogebra: ''
                }
              }}
              className={styles.box}
            >
              가나다
            </Link>
            <Link href="/draw" className={styles.box}>
              가나다
            </Link>
            <Link href="/draw" className={styles.box}>
              가나다
            </Link>
            <Link href="/draw" className={styles.box}>
              가나다
            </Link>
            <Link href="/draw" className={styles.box}>
              가나다
            </Link>
          </div>
        </div>
      </div>
    </Template>
  );
}
