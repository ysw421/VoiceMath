import { moveCamera } from '@lib/commands';
import { useEffect } from 'react';
import { Point } from 'typings';

export default function LeftGrid({
  camera,
  defaultCameraPosition
}: {
  camera: Point;
  defaultCameraPosition: Point;
}) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'static/GeoGebra/deployggb.js';
    script.async = true;
    document.body.appendChild(script);
    script.onload = function () {
      const parameters = {
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
        showToolBarHelp: false,
        errorDialogsActive: true,
        useBrowserForJS: true,
        appletOnLoad: function (api: { evalCommand: (command: string) => void }) {
          api.evalCommand(`CenterView(${defaultCameraPosition.toString()})`);
        },
        setHTML5Codebase: 'static/GeoGebra/HTML5/5.0/web3d/'
      };
      const applet = new window.GGBApplet('5.0', parameters);
      applet.inject('applet_container');
    };
  }, []);

  useEffect(() => {
    moveCamera(camera);
  }, [camera]);

  return <div id="applet_container" className="tw-w-full tw-h-full" />;
}
