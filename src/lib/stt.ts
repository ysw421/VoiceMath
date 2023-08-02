export default async function stt(blob: Blob) {
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

  const text = (await response.json()).text as string;

  const result = (
    await fetch('/api/dialogflow', {
      method: 'POST',
      body: JSON.stringify({
        query: text
      })
    })
  ).json();

  return result;
}
