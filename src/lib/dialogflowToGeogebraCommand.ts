import { evalCommand } from '@lib/commands';

interface Value {
  kind: string;
  stringValue: string;
}

function extractNumbers(input: string): number[] {
  const regex = /\d+/g;
  const matches = input.match(regex);
  console.log(Math.floor(Math.random() * 10) + 1);
  if (matches) {
    return matches.map((num) => parseInt(num));
  } else {
    return [Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1];
  }
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escapes special characters
}

function findSubstringIndex(originalText: string, substring: string): number {
  // Split the substring into components and escape special characters in each
  const components = substring.split(' ').map(escapeRegExp);

  // Create a regex pattern with flexible whitespace matching
  const pattern = components.join('\\s*');
  const regex = new RegExp(pattern, 'i'); // 'i' for case-insensitive matching

  // Perform the search
  const match = originalText.match(regex);

  return match ? originalText.indexOf(match[0]) : -1;
}

function extractFirstFourNumbers(inputString: string): number[] {
  // Regular expression to find numbers in the string
  const regex = /\d+/g;

  // Extract all number sequences from the string
  const allNumbers = inputString.match(regex);

  // Check if there are numbers in the string
  if (!allNumbers) {
    return [];
  }

  // Extract first four numbers
  return allNumbers.slice(0, 4).map((num) => parseInt(num));
}

export default function dialogflowToGeogebraCommand(dialog: any) {
  const originalText = dialog.queryText;
  const intent = dialog.intent.displayName;
  console.log(originalText, intent);
  console.log(dialog);
  let finalCommand: string = '';
  if (intent === 'graph') {
    let mathExpression: string[];
    const processString: Map<number, string> = new Map();
    const mathStringValues = dialog.parameters.fields['math-expression'].listValue.values.map(
      (obj: any) => obj.stringValue
    );
    const numberStringValues = dialog.parameters.fields['number'].listValue.values.map((obj: any) =>
      obj.numberValue.toString()
    );
    mathExpression = mathStringValues.concat(numberStringValues);
    mathExpression.forEach((e) => processString.set(findSubstringIndex(originalText, e), e));
    const sortedProcessString = new Map([...processString.entries()].sort((a, b) => a[0] - b[0]));
    finalCommand = Array.from(sortedProcessString.values()).join('');
    console.log(sortedProcessString);
  }
  if (intent === 'circle') {
    const radius: number = dialog.parameters.fields['radius'].numberValue ?? 3;
    const precenter: string = dialog.parameters.fields['center'].stringValue;
    let center;
    if (precenter && precenter != '') {
      center = extractNumbers(precenter);
    } else {
      center = [Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1];
    }
    finalCommand = `Circle((${center[0]}, ${center[1]}), ${radius})`;
  }
  if (intent === 'line') {
    const numbers = extractFirstFourNumbers(originalText);
    finalCommand = `Segment((${numbers[0]},${numbers[1]}), (${numbers[2]}, ${numbers[3]}))`;
  }
  if (intent === 'point') {
    const numbers = extractFirstFourNumbers(originalText);
    finalCommand = `(${numbers[0]},${numbers[1]})`;
  }
  console.log(finalCommand);
  evalCommand(finalCommand);
  return finalCommand;
}
