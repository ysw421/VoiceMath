import 'katex/dist/katex.min.css';

import dynamic from 'next/dynamic';
import { settingVar } from 'setting';

const LeftGrid = dynamic(() => import('@components/LeftGrid'));
const RightGrid = settingVar.isShowRightGrid
  ? dynamic(() => import('@components/RightGrid.client'))
  : null;

export default function Draw() {
  const geogebra = settingVar.geogebra ?? '';
  return (
    <>
      <div className="tw-relative tw-w-screen tw-h-screen tw-overflow-x-hidden">
        {settingVar.isShowLogo && (
          <div className="tw-absolute tw-flex tw-items-center tw-gap-4 tw-px-6 tw-h-14">
            <h1 className="tw-ml-2">VoiceMath</h1>
          </div>
        )}
        <div
          className={
            settingVar.isTopBottomMode
              ? 'tw-flex tw-flex-col tw-w-full tw-h-full tw-grid-flow-col tw-items-full tw-gap-y-4 tw-overflow-hidden'
              : 'tw-flex tw-flex-row tw-w-full tw-h-full tw-grid-flow-col tw-items-full tw-gap-x-10 tw-overflow-hidden'
          }
          style={
            settingVar.isShowLogo
              ? {
                  padding: `${settingVar.screenPaddingSize}rem`,
                  paddingTop: '3.5rem',
                  gap: `${settingVar.gapGrid}rem`
                }
              : { padding: `${settingVar.screenPaddingSize}rem`, gap: `${settingVar.gapGrid}rem` }
          }
        >
          <LeftGrid
            geogebra={geogebra}
            innerWidthWeight={settingVar.isTopBottomMode ? 1 : settingVar.leftGridWidthRatio}
          />
          {settingVar.isShowRightGrid && RightGrid && <RightGrid />}
        </div>
      </div>
    </>
  );
}
