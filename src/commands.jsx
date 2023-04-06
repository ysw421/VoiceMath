function isLoading() {
  return window.ggbApplet ? true : false;
}

export function command(str) {
  if (isLoading()) window.ggbApplet.evalCommand(str);
}

export function moveCamera(position) {
  console.log('moveCamera');
  if (isLoading()) window.ggbApplet.evalCommand(`CenterView(${position})`);
}

export function zoomCamera(zoom, position) {
  if (isLoading()) window.ggbApplet.evalCommand(`ZoomIn(${zoom}, ${position})`);
}
