interface Entity {
  text: string;
  start: number;
  end: number;
  label: string;
}

interface NerResponse {
  entities: Entity[];
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

function spacyToGeogebra(data: NerResponse) {
  const commands: string[] = [];
  data.entities.forEach((entity) => {
    if (entity.label == 'EQUATION') {
      entity.text = replaceWords(entity.text);
      commands.push(entity.text);
    }
  });
  return commands;
}

export default async function stt(data: string) {
  try {
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
