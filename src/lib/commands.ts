import { Point } from 'typings';

function hasLoaded() {
  return window.ggbApplet ? true : false;
}

export function evalCommand(str: string) {
  if (hasLoaded()) window.ggbApplet.evalCommand(str);
}

export function moveCamera(point: Point) {
  console.log(point.toString());
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
