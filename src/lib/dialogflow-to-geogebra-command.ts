import { evalCommand } from '@lib/commands';

export default function dialogflowToGeogebraCommand(dialog: any) {
  const originalText = dialog.queryText;
  const intent = dialog.intent.displayName;
  console.log(originalText, intent);
  let mathExpression: string[];
  const processString: Map<number, string> = new Map();
  if (intent === 'graph') {
    const mathStringValues = dialog.parameters.fields['math-expression'].listValue.values.map(
      (obj: any) => obj.stringValue
    );
    const numberStringValues = dialog.parameters.fields['number'].listValue.values.map((obj: any) =>
      obj.numberValue.toString()
    );
    mathExpression = mathStringValues.concat(numberStringValues);

    mathExpression.forEach((e) => processString.set(originalText.indexOf(e), e));
  }

  const sortedProcessString = new Map([...processString.entries()].sort((a, b) => a[0] - b[0]));
  const finalCommand = Array.from(sortedProcessString.values()).join('');
  console.log(finalCommand);
  evalCommand(finalCommand);
  return finalCommand;
}
