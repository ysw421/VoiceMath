import { evalCommand } from '@lib/commands';
export default function dialogflowToGeogebraCommand(dialog: string) {
  evalCommand(dialog);
  return dialog;
}
