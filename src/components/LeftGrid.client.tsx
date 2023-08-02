import { moveCamera } from '@lib/commands';
import { useEffect } from 'react';
import { Point } from 'typings';

export default function LeftGrid({ geogebra, camera }: { geogebra: string; camera: Point }) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.geogebra.org/apps/deployggb.js';
    document.body.appendChild(script);
    script.onload = function () {
      const parameters = {
        prerelease: false,
        showToolBar: false,
        borderColor: false,
        showMenuBar: false,
        showAlgebraInput: false,
        showResetIcon: true,
        enableLabelDrags: false,
        enableShiftDragZoom: true,
        enableRightClick: false,
        capturingThreshold: null,
        showToolBarHelp: false,
        errorDialogsActive: true,
        useBrowserForJS: true,
        ggbBase64: geogebra
      };
      const applet = new window.GGBApplet('6.0', parameters);
      applet.inject('applet_container');
      moveCamera(camera);
    };
  }, [geogebra, camera]);

  return <div id="applet_container" className="tw-w-full tw-h-full" />;
}
