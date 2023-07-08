function isLoading() {
  return window.ggbApplet ? true : false;
}

export function command(str) {
  if (isLoading()) window.ggbApplet.evalCommand(str);
}

export function moveCamera(position) {
  if (isLoading()) window.ggbApplet.evalCommand(`CenterView(${position})`);
}

export function zoomCamera(zoom, position) {
  if (isLoading()) window.ggbApplet.evalCommand(`ZoomIn(${zoom}, ${position})`);
}

export function drawCircle(position, radius) {
  if (isLoading()) window.ggbApplet.evalCommand(`Circle(${position}, ${radius})`);
}

export function drawLine(position1, position2) {
  if (isLoading()) window.ggbApplet.evalCommand(`Line(${position1}, ${position2})`);
}

export function drawSegment(position1, position2) {
  if (isLoading()) window.ggbApplet.evalCommand(`Segment(${position1}, ${position2})`);
}
