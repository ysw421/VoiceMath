import Dialogflow from '@google-cloud/dialogflow';
import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

const sessionClient = new Dialogflow.SessionsClient({
  credentials: {
    type: 'service_account',
    project_id: 'codefairfinal-vomv',
    private_key_id: '9475ce28741ed369205ab78242453ea46313af5e',
    private_key:
      '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDJH9qz88ZunCOB\n/9fbh3fCwHw9PFbI3z7iE+u2kaFqrmD1iK7YRH464ywv/D4md6tcK6UeHGpcQrBd\nUjkGlLYN68dB/BBUD/sgUwDQP7A6kW/t8zBObP0DNj1I5yDwWXoDN+2DYaaF0kXQ\nYyZ3+87zq0ldSpdjueFfm9+KUTVZiAZxC4Hn794oaeS2eyCCELXmjorArh0S+6nd\nowcobCmm/ITbybSuyLK0c69W+J8X5sxsp6SEqC90E8kbh4MtPJBWqHWtygMHiRlH\ndiV2qePi4T7aUmhOy9ucOWCXG6miqtj2hmlcT/Pfj+99Pig7WumudOmEBoNHhLci\n/0RAkR5hAgMBAAECggEAEYjUbBHvFTT0UjYi9JcNQDkV28+HOsCz3nP200DuaLrx\nOxbX34UBLah2nBcKuBcremqtB5YEnoHglxI/Dy18kx7LjXDTX5t7vRK0zx3DrdIr\nhvxHvt6jpFm14sWRH+3nxEtmSqkDIpxKzTiHtw2Ium0O2rJRG+GtyMRx1cDvZ3Gx\nQURWdGt7uJsHR5Uu52K7XWq/Y52evbB86PkhtYWLOcExziRin4rpE7E9wV8kmdJs\ndEvYncyyL/mnIdwJSyDp2ZdrbgkJHATA+azENdkvUd/EZMxA9xqSpuEecRfuIf31\nMOMCVfhH0YTZNui1fE+c/dHeU6HpH77LPPG1LYbOnQKBgQDpZdvnERxcVJl1zCOX\nPrpg9AsIT8upjG3PRXNwX/hyhXuzSwOV1GNPfMGaLHMEcdan3+dQYSPZTj/Tb+aH\nc+YNQE+V6WnPQv7ml3RKJTWdIYK1Uin1EBJLWLD0IegfPn1EY/DCnKmo9yKiWJOt\nOIQ2+VoZ6VTU/vUPB4KHDLCy9wKBgQDcmehc1xFkKaBv/kJld+UL5NA1jfKUeSHc\nvUhOPpsj2AyZf+ONig1Np4Oo496DWgsFy94sME1cjf3RR+aO8gG+A07WO69pJJAR\nVWDsPebOFAuXaTaxnL8Cw8ZQjMCEMmGAQMq0jKn2DnddUE8uL09+S9WkAGuaG1eA\ngvlV/duLZwKBgHfnACWgwLUeMQg3K0GT1CPiu5g1hidAIVmOEFP2uaf7syTUsK7U\nQYCgUsVleGEcKm5rtGWywbvtWxTAM+n6PIEqPLiDBPyZKmJEBFXi77wdbwy/fRaM\nfxl+IsoIcTs72xa7UQBpgy9uZriIULV4h1PGnecZ257gq/xgm0nN1yjZAoGBAIVa\nYHWm6PN0mnC48egmtwYelqKZIVgRdZ/bqFbsT5o2Yz9zaNpJ5srXhaZVwVAD4X/q\ngm6R8GIPz6xwW3Zz4wu7MjAdOmdD2/cudn242cofofYwewiZKXqBYGOXAlWnovsF\nr8O++IsuqYd2IbdYkCRXsVkHjARHnPiptBIAeHPnAoGBANTHim08HsQpHjGUQzsO\nnsUCVm6ESG1COCvaa6tos8iWoU88w9d0TvBfam5wJUfOyN2VCjNLxdqNsCEpolnY\niXA8LosnNWZ/ILi6kV5Ub9XTu7cgTe2ZaiTMTGfVLP9VwxadomUG67w8O3+nXhYz\nSJy/oQAGGzsgqJc/rl8AkvZr\n-----END PRIVATE KEY-----\n',
    client_email: 'dialogflow-cli@codefairfinal-vomv.iam.gserviceaccount.com',
    client_id: '102150142118346830444',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url:
      'https://www.googleapis.com/robot/v1/metadata/x509/dialogflow-cli%40codefairfinal-vomv.iam.gserviceaccount.com',
    universe_domain: 'googleapis.com'
  } as any
});

const sessionId = uuidv4();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {
      query,
      languageCode = 'ko-KR',
      contexts
    }: {
      query: string;
      languageCode?: string;
      contexts?: string[];
    } = JSON.parse(req.body);

    // The path to identify the agent that owns the created intent.
    const sessionPath = sessionClient.projectAgentSessionPath('codefairfinal-vomv', sessionId);

    // The text query request.
    let request: Record<string, any> = {
      session: sessionPath,
      queryInput: {
        text: {
          text: query,
          languageCode
        }
      }
    };

    if (contexts && contexts.length > 0) {
      request = {
        ...request,
        queryParams: {
          contexts
        }
      };
    }

    const responses = await sessionClient.detectIntent(request);

    return res.status(200).json(responses[0].queryResult);
  }
}
