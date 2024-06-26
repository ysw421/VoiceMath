export default async function stt(blob: Blob) {
  const replacements: { [key: string]: string } = {
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
  console.log(blob.type);

  function replaceWords(inputString: string): string {
    let modifiedString = inputString;
    Object.keys(replacements).forEach((key) => {
      modifiedString = modifiedString.replace(new RegExp(key, 'g'), replacements[key]);
    });
    return modifiedString;
  }
  try {
    const response = await fetch('http://localhost:8000/transcribe', {
      method: 'POST',
      body: blob
    });

    const jsonResponse = await response.json();
    console.log(jsonResponse);
    if (typeof jsonResponse.text !== 'string') {
      throw new Error('Received data is not a string');
    }
    console.log(jsonResponse.text);
    return replaceWords(jsonResponse.text);
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}
