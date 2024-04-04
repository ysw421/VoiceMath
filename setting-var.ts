// How to use this settig:
// import { settingVar } from 'setting';

interface SettingVarType {
  isTopBottomMode: boolean;
  isShowRightGrid: boolean;
  isShowKeyboardBox: boolean;
  isShowLogo: boolean;
  screenPaddingSize: number;
  isShowVoiceBtn: boolean;
  leftGridWidthRatio: number;
}

export const settingVar: SettingVarType = {
  isTopBottomMode: false,
  isShowRightGrid: true,
  isShowKeyboardBox: true,
  isShowLogo: true,
  screenPaddingSize: 1.5,
  isShowVoiceBtn: true,
  leftGridWidthRatio: 0.4
};

// Examples...

// Raspberry Pi
// export const settingVar: SettingVarType = {
//   isTopBottomMode: true,
//   isShowRightGrid: true,
//   isShowKeyboardBox: false,
//   isShowLogo: false,
//   screenPaddingSize: 0,
//   isShowVoiceBtn: false,
//   leftGridWidthRatio: 1
// };

// Laptop
// export const settingVar: SettingVarType = {
//   isTopBottomMode: false,
//   isShowRightGrid: true,
//   isShowKeyboardBox: true,
//   isShowLogo: true,
//   screenPaddingSize: 1.5,
//   isShowVoiceBtn: true,
//   leftGridWidthRatio: 0.4
// };
