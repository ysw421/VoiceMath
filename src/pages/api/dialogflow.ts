import Dialogflow from '@google-cloud/dialogflow';
import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

// const sessionClient = new Dialogflow.SessionsClient({
//   credentials: {
//     type: 'service_account',
//     project_id: 'codefairfinal-vomv',
//     private_key_id: '9475ce28741ed369205ab78242453ea46313af5e',
//     private_key:
//       '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDJH9qz88ZunCOB\n/9fbh3fCwHw9PFbI3z7iE+u2kaFqrmD1iK7YRH464ywv/D4md6tcK6UeHGpcQrBd\nUjkGlLYN68dB/BBUD/sgUwDQP7A6kW/t8zBObP0DNj1I5yDwWXoDN+2DYaaF0kXQ\nYyZ3+87zq0ldSpdjueFfm9+KUTVZiAZxC4Hn794oaeS2eyCCELXmjorArh0S+6nd\nowcobCmm/ITbybSuyLK0c69W+J8X5sxsp6SEqC90E8kbh4MtPJBWqHWtygMHiRlH\ndiV2qePi4T7aUmhOy9ucOWCXG6miqtj2hmlcT/Pfj+99Pig7WumudOmEBoNHhLci\n/0RAkR5hAgMBAAECggEAEYjUbBHvFTT0UjYi9JcNQDkV28+HOsCz3nP200DuaLrx\nOxbX34UBLah2nBcKuBcremqtB5YEnoHglxI/Dy18kx7LjXDTX5t7vRK0zx3DrdIr\nhvxHvt6jpFm14sWRH+3nxEtmSqkDIpxKzTiHtw2Ium0O2rJRG+GtyMRx1cDvZ3Gx\nQURWdGt7uJsHR5Uu52K7XWq/Y52evbB86PkhtYWLOcExziRin4rpE7E9wV8kmdJs\ndEvYncyyL/mnIdwJSyDp2ZdrbgkJHATA+azENdkvUd/EZMxA9xqSpuEecRfuIf31\nMOMCVfhH0YTZNui1fE+c/dHeU6HpH77LPPG1LYbOnQKBgQDpZdvnERxcVJl1zCOX\nPrpg9AsIT8upjG3PRXNwX/hyhXuzSwOV1GNPfMGaLHMEcdan3+dQYSPZTj/Tb+aH\nc+YNQE+V6WnPQv7ml3RKJTWdIYK1Uin1EBJLWLD0IegfPn1EY/DCnKmo9yKiWJOt\nOIQ2+VoZ6VTU/vUPB4KHDLCy9wKBgQDcmehc1xFkKaBv/kJld+UL5NA1jfKUeSHc\nvUhOPpsj2AyZf+ONig1Np4Oo496DWgsFy94sME1cjf3RR+aO8gG+A07WO69pJJAR\nVWDsPebOFAuXaTaxnL8Cw8ZQjMCEMmGAQMq0jKn2DnddUE8uL09+S9WkAGuaG1eA\ngvlV/duLZwKBgHfnACWgwLUeMQg3K0GT1CPiu5g1hidAIVmOEFP2uaf7syTUsK7U\nQYCgUsVleGEcKm5rtGWywbvtWxTAM+n6PIEqPLiDBPyZKmJEBFXi77wdbwy/fRaM\nfxl+IsoIcTs72xa7UQBpgy9uZriIULV4h1PGnecZ257gq/xgm0nN1yjZAoGBAIVa\nYHWm6PN0mnC48egmtwYelqKZIVgRdZ/bqFbsT5o2Yz9zaNpJ5srXhaZVwVAD4X/q\ngm6R8GIPz6xwW3Zz4wu7MjAdOmdD2/cudn242cofofYwewiZKXqBYGOXAlWnovsF\nr8O++IsuqYd2IbdYkCRXsVkHjARHnPiptBIAeHPnAoGBANTHim08HsQpHjGUQzsO\nnsUCVm6ESG1COCvaa6tos8iWoU88w9d0TvBfam5wJUfOyN2VCjNLxdqNsCEpolnY\niXA8LosnNWZ/ILi6kV5Ub9XTu7cgTe2ZaiTMTGfVLP9VwxadomUG67w8O3+nXhYz\nSJy/oQAGGzsgqJc/rl8AkvZr\n-----END PRIVATE KEY-----\n',
//     client_email: 'dialogflow-cli@codefairfinal-vomv.iam.gserviceaccount.com',
//     client_id: '102150142118346830444',
//     auth_uri: 'https://accounts.google.com/o/oauth2/auth',
//     token_uri: 'https://oauth2.googleapis.com/token',
//     auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
//     client_x509_cert_url:
//       'https://www.googleapis.com/robot/v1/metadata/x509/dialogflow-cli%40codefairfinal-vomv.iam.gserviceaccount.com',
//     universe_domain: 'googleapis.com'
//   } as any
// });
const sessionClient = new Dialogflow.SessionsClient({
  credentials: {
    type: 'service_account',
    project_id: 'english-version-beta-ajuq',
    private_key_id: 'd536b9ec78543449b5ac04245be09de09e4539a1',
    private_key:
      '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCVltUukxP+U/ls\nh04FUt8QXiStsMQL3i13vqXDqPoVwRnNiqyslZhSmDIjS3pT9dUBUd9wCCZbckx3\n4TExO9dicE2fRPgX52uWh6YlHDKsBP99JziM2YDOzStverrIfuhYahglpMQ8eec6\nVKfu5aeYHiwJR7cCU9LFHG17a6O8vb9YvHvWnxwPEr3aMa9nUGJu4wo4dhk9f8xn\n16WB+ToNs/getz0BqE9xymfcVgBvkmRhIPDkKu80khW5ToRVVv7YvPaQmwv8D0LH\nsjWrRxCL2TdWDwDi4fp71+tSuG8oSC5WWjUf8C+Nw8dT1eSWAEuRZymm+dDCOCHM\n4exg4sbfAgMBAAECggEACeoCvAD8cL0xCTvYdGrfJM8QgEB4Zc72VXrZsqOG250+\nMAyyUAfkHgk/PW6Zr2naEanS9LJdlG75WXKf14L/TeNiiZ1BEhiA3WulG82IIDV+\nl1Vbnp4lts8LQ2qvaW1bycxSSGBorxdnN0r4DFHFL0REp+LMYseabvzo1qa2JeKV\nj0aNTEHPJaQHaByGXArWcwAt4rzszCoWWiweWEs5a2odmsTtFYfWa8tYwSwaofia\nOQ1DM1pzIAD0UST7t6olnlRyzEEFosoY74oaotmkgLg4qEriRUEV1gpesmjrKxaY\n3G4RyWRoumwHs74eRQoBsomMHHP00kde7QMVzuiqfQKBgQDL9nxqg5ntbQLocuOq\n2PBW01fR2QkmE/aX069tHImQkJ2kj9QgF6SnfcgokYW8fGkCTTg8UOx1Q6NwPJOp\n8EnKuQpud6vq/usRsQaiqTLFnxV5gtO3aUUf0BSMLrCOgQPrda9ciHb4DWkl02s/\nkqo+Tb2+ckCKRzMm9b/xeIr38wKBgQC7wQRbxmpxxGIb8d+gnyk7n2WQqu/o0DEX\nVHI3fOPCNIgbODdQwNIe+NNycypVzcfbkhj2FCJOEGaY3lgUf+BsSzCuqSrmLd6w\nmCBo5i9TIB3Ol6RmfoNbnwy8e6ps/GNLoN7RMnh5FKDg38KrMTupr1QJkvZv/SyT\nFfXvHsY8ZQKBgDb9NFvvMR/O5RrQZssYA+wUvLeJ4SqP9UrHuqMbL4d3RdkpIdKp\nLS4u/jjZywmfLRx+vyub0bRn0PegjVsiunJaYxKXVxVbNvslFBnkrhiTpFGHURdA\n3W8PRYrpx5YT+H+R0f6LmC+WRgP5tQ+Ftjpn8UEYQohFW+gkF2S90BG7AoGALjUN\nnoyRa9haEOiREdW57xuGgnkfPBvoyQYWagOJhiUpjhFiw7QAwnCYkWU4eQ+A7U/i\nZsWDv9SXe23VHY5vLBfBLmshzK5jTPDToR1tbjbMPyjg4/yk1WqqVsTUp6fhxB4e\nWDvknF/wTAelwD4IofUtaIHLtroHO1e/RA892GUCgYA1ic0k3TD76auWQVX6+E8m\ndShccLoot0HqD7Yoe5KKU3AFYsbsETI7ChuyZMKrrkC8zatf8Q0OUzSEJG8SMLyK\nITMDGKSfi9sC59URmJfZjRqNqo8U93zt9c4UhjAvYsVICb+E9z7YdtFwXs53YQvl\nenK3cHM2F9lkUwaolnXXhA==\n-----END PRIVATE KEY-----\n',
    client_email: 'english-version-beta-ajuq@english-version-beta-ajuq.iam.gserviceaccount.com',
    client_id: '100435864895583815809',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url:
      'https://www.googleapis.com/robot/v1/metadata/x509/english-version-beta-ajuq%40english-version-beta-ajuq.iam.gserviceaccount.com',
    universe_domain: 'googleapis.com'
  } as any
});

const sessionId = uuidv4();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {
      query,
      languageCode = 'en-EN',
      contexts
    }: {
      query: string;
      languageCode?: string;
      contexts?: string[];
    } = JSON.parse(req.body);

    // The path to identify the agent that owns the created intent.
    const sessionPath = sessionClient.projectAgentSessionPath(
      'english-version-beta-ajuq',
      sessionId
    );

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
