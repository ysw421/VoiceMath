export function moveCamera(app, x, y) {
  app.evalCommand(`CenterView((${x}, ${y}))`);
}
