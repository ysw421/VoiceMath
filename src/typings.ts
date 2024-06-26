export type Lang = 'ko-KR' | 'en-US';

export enum Form {
  Initial,
  Loading,
  Success,
  Error
}

export class Point {
  private _x: number;
  private _y: number;
  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }
  public toString() {
    return `(${this._x}, ${this._y})`;
  }
  get x(): number {
    return this._x;
  }
  set x(value: number) {
    this._x = value;
  }
  get y(): number {
    return this._y;
  }
  set y(value: number) {
    this._y = value;
  }
}

export type FormState = {
  state: Form;
  message?: string;
};

export type TemplateInfo = {
  name: string;
  koInfo: string;
  koText: string;
  enInfo: string;
  enText: string;
  geogebra: string;
  defaultCameraPosition: string;
  isDefault: string;
  answer: string;
  type: string;
};
