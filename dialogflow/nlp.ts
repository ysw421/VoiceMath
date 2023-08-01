import dialogflow from './dialogflow';
import logger from './logger';

export default async function nlp(text: string) {
  const response = await dialogflow(text, 'ko-KR');
  logger.info('Detected intent');
  const result = response.queryResult;
  if (result) {
    logger.info(`  Query: ${result.queryText}`);
    logger.info(`  Response: ${JSON.stringify(result.parameters!.fields, null, 2)}`);
    if (result.intent) {
      logger.info(`  Intent: ${result.intent.displayName}`);
    } else {
      logger.error('  No intent matched.');
    }
  } else {
    logger.error('No result.');
  }
  return result;
}
