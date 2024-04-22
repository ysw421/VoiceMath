import type { NextApiRequest, NextApiResponse } from 'next';

interface TextRequest {
  text: string;
}

interface Entity {
  text: string;
  start: number;
  end: number;
  label: string;
}

interface NerResponse {
  entities: Entity[];
}

export default async function spacy(
  req: NextApiRequest,
  res: NextApiResponse<NerResponse | { message: string }>
) {
  if (req.method === 'POST') {
    const { text } = req.body as TextRequest;

    try {
      const fastApiResponse = await fetch('http://localhost:8000/ner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
      });

      if (!fastApiResponse.ok) {
        throw new Error(`Error from FastAPI: ${fastApiResponse.statusText}`);
      }

      const nerResults: NerResponse = await fastApiResponse.json();

      res.status(200).json(nerResults);
    } catch (error) {
      console.error('Failed to process NER:', error);
      // @ts-ignore
      res.status(500).json({ message: error.message || 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
