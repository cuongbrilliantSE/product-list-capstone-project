import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda';
import { createLogger } from '../../utils/logger';
import { getToken } from '../../utils/getJwt';
import {ProductCreate, ProductItem} from "../../models/Product";
import {createProduct} from "../../businessLogic/products";

const logger = createLogger('createProduct');

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info('Processing CreateProduct event...');
  const jwtToken: string = getToken(event);
  const newProductData: ProductCreate = JSON.parse(event.body);
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  };

  try {
    const newProduct: ProductItem = await createProduct(jwtToken, newProductData);
    logger.info('Successfully created a new Product item.');
    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({ newProduct })
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
