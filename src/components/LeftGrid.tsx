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
    script.src = '/GeoGebra/deployggbs.js'; // Updated to use local file
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
        showResetIcon: false,
        enableLabelDrags: false,
        enableShiftDragZoom: true,
        enableRightClick: false,
        capturingThreshold: null,
        showToolBarHelp: false,
        errorDialogsActive: true,
        useBrowserForJS: true,
        appletOnLoad: function (api: { evalCommand: (command: string) => void }) {
          api.evalCommand(`CenterView(${defaultCameraPosition.toString()})`);
        }
      };
      const applet = new (window as any).GGBApplet('5.0', parameters);
      applet.setHTML5Codebase('/GeoGebra/HTML5/5.0/web3d/'); // Set the local base URL
      applet.inject('applet_container');
    };
  }, [defaultCameraPosition]);

  useEffect(() => {
    moveCamera(camera);
  }, [camera]);

  return <div id="applet_container" className="tw-w-full tw-h-full" />;
}
