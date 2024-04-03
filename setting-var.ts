// How to use this settig:
// import { settingVar } from 'setting';

interface SettingVarType {
  isTopBottomMode: boolean;
  isShowRightGrid: boolean;
  isShowKeyboardBox: boolean;
  isShowLogo: boolean;
  screenPaddingSize: number;
}

// export const settingVar: SettingVarType = {
//   isTopBottomMode: false,
//   isShowRightGrid: true,
//   isShowKeyboardBox: true,
//   isShowLogo: true,
//   screenPaddingSize: 1.5
// };

// Examples...

// Raspberry Pi
export const settingVar: SettingVarType = {
  isTopBottomMode: true,
  isShowRightGrid: false,
  isShowKeyboardBox: false,
  isShowLogo: false,
  screenPaddingSize: 0
};

// Laptop
// export const settingVar: SettingVarType = {
//   isTopBottomMode: false,
//   isShowRightGrid: true,
//   isShowKeyboardBox: true,
//   isShowLogo: true,
//   screenPaddingSize: 1.5
// };
