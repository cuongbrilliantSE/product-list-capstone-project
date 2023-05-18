import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { createLogger } from '../../utils/logger';
import { getToken } from '../../utils/getJwt';
import {ProductUpdate} from "../../models/Product";
import {updateProduct} from "../../businessLogic/products";

const logger = createLogger('updateProduct');

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info('Processing UpdateProduct event...');
  const jwtToken: string = getToken(event);
  const productId = event.pathParameters.productId;
  const updateData: ProductUpdate = JSON.parse(event.body);
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  };

  try {
    await updateProduct(jwtToken, productId, updateData);
    logger.info(`Successfully updated the product item: ${productId}`);
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
