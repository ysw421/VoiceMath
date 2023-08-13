import { useRouter } from 'next/router';
import React from 'react';

import { Default, mockExam } from './items';
import styles from './select.module.css';

export default function Select() {
  const router = useRouter();

  return (
    <div className="tw-relative tw-w-screen tw-h-screen tw-p-6 tw-overflow-y-scroll">
      <div className="tw-flex tw-justify-center tw-w-full tw-mt-10 tw-mb-10 tw-text-3xl tw-font-bold">
        문제를 선택하세요
      </div>
      <div className="tw-p-10">
        {/* <div className="tw-mb-4 tw-text-xl tw-font-semibold">빈 템플릿</div> */}
        <h3 className="tw-mb-2">빈 템플릿</h3>
        <div className={styles.group}>
          <button
            onClick={() => {
              router.push({ pathname: '/draw', query: Default }, '/draw');
            }}
            className={`${styles.box} tw-leading-0.5 tw-whitespace-pre-line`}
          >
            {Default.info}
          </button>
        </div>
        <h3 className="tw-mb-2">모의고사</h3>
        <div className={styles.group}>
          {mockExam.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                router.push({ pathname: '/draw', query: item }, '/draw');
              }}
              className={`${styles.box} tw-leading-0.5 tw-whitespace-pre-line`}
            >
              {item.info}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
