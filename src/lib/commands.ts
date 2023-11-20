import { Point } from 'typings';

function hasLoaded() {
  return window.ggbApplet ? true : false;
}

export function evalCommand(str: string) {
  if (hasLoaded()) {
    window.ggbApplet.evalCommand(str);
    window.ggbApplet.setLabelVisible(str, true);
  }
}

export function getLaTeXString(str: string): string {
  var label = '';
  const LatexString = window.ggbApplet.getLaTeXString(str);
  if (hasLoaded()) {
    label = `$${str} : ${LatexString}$`;
    if (LatexString == '') label = `$${str}$`;
  }
  return label;
}

export function evalCommandGetLabels(str: string) {
  if (hasLoaded()) {
    const label = window.ggbApplet.evalCommandGetLabels(str);
    setLabelVisible(label, true);
    return label;
  }
}

export function setLabelVisible(str: string, bool: boolean) {
  if (hasLoaded()) return window.ggbApplet.setLabelVisible(str, bool);
}

export function moveCamera(point: Point) {
  if (hasLoaded()) window.ggbApplet.evalCommand(`CenterView(${point.toString()})`);
}

export function zoomCamera(zoom: number, point: Point) {
  if (hasLoaded()) window.ggbApplet.evalCommand(`ZoomIn(${zoom}, ${point.toString()})`);
}

export function drawCircle(point: Point, radius: number) {
  if (hasLoaded()) window.ggbApplet.evalCommand(`Circle(${point.toString()}, ${radius})`);
}

export function drawLine(point1: Point, point2: Point) {
  if (hasLoaded()) window.ggbApplet.evalCommand(`Line(${point1.toString()}, ${point2.toString()})`);
}

export function drawSegment(point1: Point, point2: Point) {
  if (hasLoaded())
    window.ggbApplet.evalCommand(`Segment(${point1.toString()}, ${point2.toString()})`);
}

export async function reset(point: Point) {
  if (hasLoaded()) {
    window.ggbApplet.reset();
    moveCamera(point);
  }
}

// Not working!
// export function undo() {
//   if (hasLoaded()) window.ggbApplet.registerClientListener();
//   if (hasLoaded()) window.ggbApplet.undo();
// }
