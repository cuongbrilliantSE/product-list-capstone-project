import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda';
import { createLogger } from '../../utils/logger';
import { getToken } from '../../utils/getJwt';
import { ProductItem } from '../../models/Product';
import {getProducts} from "../../businessLogic/products";


const logger = createLogger('getProducts');

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info('Processing Getproducts event...');
  const jwtToken: string = getToken(event);
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  };

  try {
    const productList: ProductItem[] = await getProducts(jwtToken);
    logger.info('Successfully retrieved productlist');
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ productList })
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
