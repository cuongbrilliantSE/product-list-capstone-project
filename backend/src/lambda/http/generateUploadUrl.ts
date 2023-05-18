import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda';
import { generateUploadUrl } from '../../businessLogic/products';
import { createLogger } from '../../utils/logger';
import { getToken } from '../../utils/getJwt';

const logger = createLogger('GenerateUploadUrl');

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info('Processing GenerateUploadUrl event...');
  const jwtToken: string = getToken(event);
  const productId = event.pathParameters.productId;
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  };

  try {
    const signedUrl: string = await generateUploadUrl(jwtToken, productId);
    logger.info('Successfully created signed url.');
    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({ uploadUrl: signedUrl })
    };
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error })
    };
  }
};
