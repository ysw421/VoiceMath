interface Entity {
  text: string;
  start: number;
  end: number;
  label: string;
}

interface NerResponse {
  entities: Entity[];
  original_text: string;
}

function findPointValues(input: string): number[] {
  const regex = /-?\d*\.?\d+/g;
  const matches = input.match(regex);
  if (matches && matches.length >= 2) {
    return [parseFloat(matches[0]), parseFloat(matches[1])];
  }
  return [2, 2];
}

function findNumberValue(input: string): number {
  const regex = /\b\d+(\.\d+)?\b/g;
  const matches = input.match(regex);
  if (matches) return parseFloat(matches[0]);
  return 2;
}

function spacyToGeogebra(data: NerResponse) {
  const commands: string[] = [];
  if (data.original_text.includes('circle')) {
    const point = data.entities.filter((entity) => entity.label === 'POINT');
    const radi = data.entities.filter((entity) => entity.label === 'CIRCLE_RADIUS');
    const temp = findPointValues(point[0].text);
    const tempRadi = findNumberValue(radi[0].text);
    commands.push(`Circle((${temp[0]}, ${temp[1]}),${tempRadi})`);
  } else {
    const points = data.entities.filter((entity) => entity.label === 'POINT');
    if (points.length == 1) {
      const temp = findPointValues(points[0].text);
      commands.push(`(${temp[0]}, ${temp[1]})`);
    }
    for (let i = 0; i < points.length - 1; i++) {
      // @ts-ignore
      const temp = findPointValues(points[i].text);
      const temp2 = findPointValues(points[i + 1].text);

      commands.push(`Segment((${temp[0]},${temp[1]}),(${temp2[0]},${temp2[1]}))`);
    }
    data.entities.forEach((entity) => {
      if (entity.label == 'EQUATION') {
        entity.text = replaceWords(entity.text);
        commands.push(entity.text);
      }
    });
  }
  console.log(commands);
  return commands;
}

// Define replacements for transcription text
const replacements: { [key: string]: any } = {
  equals: '=',
  squared: '^2',
  'to the power of': '^',
  plus: '+',
  minus: '-',
  times: '*',
  over: '/',
  cubed: '^3',
  'divided by': '/',
  comma: ''
};

// Function to replace specified words in the transcription text
function replaceWords(inputString: string) {
  let modifiedString = inputString;
  Object.keys(replacements).forEach((key) => {
    const pattern = new RegExp(key, 'gi'); // 'gi' for global and case-insensitive matching
    modifiedString = modifiedString.replace(pattern, replacements[key]);
  });
  return modifiedString;
}

export default async function stt(data: string) {
  try {
    console.log(data);
    const response = await fetch('/api/spacy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: data })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('NER results:', result);
    return spacyToGeogebra(result);
  } catch (error) {
    console.error('Failed to fetch NER data:', error);
  }
}
