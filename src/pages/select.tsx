import { useRouter } from 'next/router';
import React from 'react';

import { items, mockExam } from './items';
import styles from './select.module.css';

export default function Select() {
  const router = useRouter();
  return (
    <div className="tw-relative tw-w-screen tw-h-screen tw-p-6 tw-overflow-y-scroll">
      <div className="tw-flex tw-justify-center tw-w-full tw-text-3xl tw-font-bold">
        문제를 선택하세요
      </div>
      <div>
        {/* <div className="tw-mb-4 tw-text-xl tw-font-semibold">빈 템플릿</div> */}
        <h3>빈 템플릿</h3>
        <div className={styles.group}>
          <button
            onClick={() => {
              router.push({ pathname: '/draw', query: items[0] }, '/draw');
            }}
            className={styles.box}
          >
            빈 템플릿
          </button>
        </div>
        <h3>모의고사</h3>
        <div className={styles.group}>
          {mockExam.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                router.push({ pathname: '/draw', query: item }, '/draw');
              }}
              className={styles.box}
            >
              {item.problem_year}
              <br />
              {item.problem_number}
            </button>
          ))}
          {/* <button
            onClick={() => {
              router.push(
                {
                  pathname: '/draw',
                  query: {
                    name: 'p1',
                    text: 'hello?',
                    geogebra: ''
                  }
                },
                '/draw'
              );
            }}
            className={styles.box}
          >
            모의고사 2
          </button> */}
        </div>
      </div>
    </div>
  );
}
