import { evalCommand, evalCommandGetLabels, setLabelVisible } from '@lib/commands';

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

export default function geogebraCommand(dialog: JSON) {
  let values = Object.entries(dialog);
  // basic loop over the object
  const parameters = values[5][1]['fields']; //parameter name
  const input_sentence = values[2][1]; // input sentence
  const intent = values[10][1]['displayName']; // intent name
  const confidence = values[11][1]; //confidence_score
  const StringValue: string = '';
  let geogebraValue;
  let coordinates: string[] = [];
  let labels: string[] = [];
  if (intent == 'plot_graph') {
    geogebraValue = parameters['math']['stringValue'];
    const label = evalCommandGetLabels(geogebraValue);
    setLabelVisible(label, true);
    labels.push(label);
  } else if (intent == 'plot_line' || intent == 'plot_point' || intent == 'plot_polygon') {
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
      coordinates.push(`(${coordinate})`);
      let label;
      if (i < labellen) {
        label = parameters.label.listValue.values[i].stringValue;
        evalCommand(`${label}=(${coordinate})`);
      } else {
        label = evalCommandGetLabels(`Point({${coordinate}})`);
      }
      setLabelVisible(label, true);
      evalCommand(`SetLabelMode(${label}, 9)`);
      evalCommand(`SetColor(${label}, "Blue")`);
      labels.push(label);
    }
  } else {
    return { StringValue };
  }
  if (intent == 'plot_line') {
    evalCommand(`Segment(${coordinates[0]}, ${coordinates[1]})`);
  } else if (intent == 'plot_polygon') {
    console.log(`Polygon(${coordinates})`);
    evalCommand(`Polygon(${coordinates})`);
  }
  return { intent, coordinates, labels };
}
