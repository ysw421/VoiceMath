import { evalCommand, evalCommandGetLabels, setLabelVisible } from '@lib/commands';
export default function GGBcommand(Dialog: JSON) {
  let values = Object.entries(Dialog);
  // basic loop over the object
  const parameters = values[5][1]['fields']; //parameter name
  const input_sentence = values[2][1]; // input sentence
  const intent = values[10][1]['displayName']; // intent name
  const confidence = values[11][1]; //confience_score
  var GGBvalue;

  interface Value {
    kind: string;
    stringValue: string;
  }

  interface ListValue {
    kind: string;
    listValue: {
      values: Value[];
    };
  }
  interface Coordinate {
    coordinate: ListValue;
    label: ListValue;
  }
  let coordinates: string[] = [];
  let labels: string[] = [];

  if (intent == 'plot_graph') {
    GGBvalue = parameters['math']['stringValue'];
    const label = evalCommandGetLabels(GGBvalue);
    setLabelVisible(label, true);
  } else {
    let coordinateValues = parameters.coordinate.listValue.values;
    let labelValues = parameters?.label?.listValue?.values;
    let labellen;
    let coordinatelen = coordinateValues.length;
    if (labelValues == undefined) {
      labellen = 0;
    } else {
      labellen = labelValues.length;
    }

    for (let i = 0; i < coordinatelen; i++) {
      let coordinate = parameters.coordinate.listValue.values[i].stringValue;
      console.log(coordinate);
      coordinates.push(`(${coordinate})`);
      if (i < labellen) {
        const label = parameters.label.listValue.values[i].stringValue;
        evalCommand(`${label}=(${coordinate})`);
        setLabelVisible(label, true);
        evalCommand(`SetLabelMode(${label}, 9)`);
        evalCommand(`SetColor(${label}, "Blue")`);

        labels.push(label);
      } else {
        const label = evalCommandGetLabels(`Point({${coordinate}})`);
        setLabelVisible(label, true);
        evalCommand(`SetLabelMode(${label}, 9)`);
        evalCommand(`SetColor(${label}, "Blue")`);
        labels.push(label);
      }
    }
  }
  if (intent == 'plot_line') {
    evalCommand(`Segment(${coordinates[0]}, ${coordinates[1]})`);
  } else if (intent == 'plot_polygon') {
    evalCommand(`Polygon(${coordinates}`);
  }
  console.log(`Segment(${coordinates[0]}, ${coordinates[1]}`);
  return values;
}
