import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { createLogger } from '../../utils/logger';
import { getToken } from '../../utils/getJwt';
import { deleteProduct } from '../../businessLogic/products';

const logger = createLogger('deleteProduct');

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info('Processing DeleteProduct event...');
  const jwtToken: string = getToken(event);
  const productId = event.pathParameters.productId;
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  };

  try {
    await deleteProduct(jwtToken, productId);
    logger.info(`Successfully deleted product item: ${productId}`);
    return {
      statusCode: 204,
      headers,
      body: undefined
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
