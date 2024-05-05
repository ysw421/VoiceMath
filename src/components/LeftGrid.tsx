import { useEffect } from 'react';
import { settingVar } from 'setting';

type parameters = {
  prerelease: boolean;
  width: number;
  showToolBar: boolean;
  borderColor: boolean;
  showMenuBar: boolean;
  showAlgebraInput: boolean;
  showResetIcon: boolean;
  enableLabelDrags: boolean;
  enableShiftDragZoom: boolean;
  enableRightClick: boolean;
  capturingThreshold: null;
  appletOnLoad: (api: { evalCommand: (command: string) => void }) => void;
  showToolBarHelp: boolean;
  errorDialogsActive: boolean;
  useBrowserForJS: boolean;
  ggbBase64: string;
  height?: number | 'full';
};

export default function LeftGrid({
  geogebra,
  innerWidthWeight = 0.4
}: {
  geogebra: string;
  innerWidthWeight: number;
}) {
  function convertRemToPixels(rem: number) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
  }
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.geogebra.org/apps/deployggb.js';
    script.async = true;
    document.body.appendChild(script);
    script.onload = function () {
      let parameters: parameters = {
        prerelease: false,
        width: 480,
        height: 290,
        showToolBar: false,
        borderColor: false,
        showMenuBar: false,
        showAlgebraInput: false,
        showResetIcon: true,
        enableLabelDrags: false,
        enableShiftDragZoom: true,
        enableRightClick: false,
        capturingThreshold: null,
        appletOnLoad: function (api: { evalCommand: (command: string) => void }) {
          api.evalCommand(`CenterView((0, 0))`);
        },
        showToolBarHelp: false,
        errorDialogsActive: true,
        useBrowserForJS: true,
        appletOnLoad: function (api: { evalCommand: (command: string) => void }) {
          api.evalCommand(`CenterView(${defaultCameraPosition.toString()})`);
        }
      };
      if (settingVar.rightGridHeight) {
        parameters.height = window.innerHeight - convertRemToPixels(settingVar.rightGridHeight);
      }
      const applet = new window.GGBApplet('6.0', parameters);
      applet.inject('applet_container');
    };
  }, [geogebra, innerWidthWeight]);

  return <div id="applet_container" className="tw-w-full tw-h-full" />;
}
