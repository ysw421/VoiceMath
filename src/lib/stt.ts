export default async function stt(blob: Blob) {
  try {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/hoonsung/CodeFairModel_asdf',
      {
        headers: {
          Authorization: 'Bearer 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',
          'Content-Type': blob.type
        },
        method: 'POST',
        body: blob
      }
    );

    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }

    const jsonResponse = await response.json();
    const text = jsonResponse.text;

    if (typeof text !== 'string') {
      throw new Error('Received data is not a string');
    }

    const dialogResponse = await fetch('/api/dialogflow', {
      method: 'POST',
      body: JSON.stringify({
        query: text
      })
    });

    if (!dialogResponse.ok) {
      throw new Error(`An error occurred: ${dialogResponse.statusText}`);
    }

    return await dialogResponse.json();
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}
