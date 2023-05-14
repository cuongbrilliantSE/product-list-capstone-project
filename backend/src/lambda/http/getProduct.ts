import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda';
import { createLogger } from '../../utils/logger';
import { getToken } from '../../utils/getJwt';
import {ProductItem} from "../../models/Product";
import {getProduct} from "../../businessLogic/products";


const logger = createLogger('getProduct');

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info('Processing GetProduct event...');
  const jwtToken: string = getToken(event);
  const productId = event.pathParameters.productId;
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  };

  try {
    const productItem: ProductItem = await getProduct(jwtToken, productId);
    logger.info(`Successfully retrieved Product item: ${productId}`);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ productItem })
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
