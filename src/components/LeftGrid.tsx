import { moveCamera } from '@lib/commands';
import { useEffect } from 'react';
import { Point } from 'typings';

export default function LeftGrid({
  geogebra,
  camera,
  defaultCameraPosition
}: {
  geogebra: string;
  camera: Point;
  defaultCameraPosition: Point;
}) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.geogebra.org/apps/deployggb.js';

    document.body.appendChild(script);
    script.onload = function () {
      const parameters = {
        prerelease: false,
        width: 600,
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
    };
  }, [geogebra]);

  useEffect(() => {
    moveCamera(camera);
  }, [camera]);

  return <div id="applet_container" className="tw-w-full tw-h-full" />;
}
