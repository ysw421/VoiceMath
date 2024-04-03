import { moveCamera } from '@lib/commands';
import { useEffect } from 'react';
import { Point } from 'typings';

export default function LeftGrid({
  geogebra,
  camera,
  defaultCameraPosition,
  innerWidthWeight = 0.4
}: {
  geogebra: string;
  camera: Point;
  defaultCameraPosition: Point;
  innerWidthWeight: number;
}) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/static/GeoGebra/deployggb.js';
    script.async = true;
    document.body.appendChild(script);
    script.onload = function () {
      const parameters = {
        prerelease: false,
        // width: 600,
        width: window.innerWidth * innerWidthWeight,
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
          api.evalCommand(`CenterView(${defaultCameraPosition.toString()})`);
        },
        showToolBarHelp: false,
        errorDialogsActive: true,
        useBrowserForJS: true,
        ggbBase64: geogebra
      };
      const applet = new window.GGBApplet('5.0', parameters);
      applet.inject('applet_container');
    };
  }, [geogebra, defaultCameraPosition, innerWidthWeight]);

  useEffect(() => {
    moveCamera(camera);
  }, [camera]);

  return <div id="applet_container" className="tw-w-full tw-h-full" />;
}
