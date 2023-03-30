export function moveCamera(app, position) {
  app.evalCommand(`CenterView(${position})`);
}

export function zoomCamera(app, zoom, position) {
  app.evalCommand(`ZoomIn(${zoom}, ${position})`);
}
