import * as AWS from 'aws-sdk';
import * as AWSXRay from 'aws-xray-sdk';
import { createLogger } from '../utils/logger';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import {ProductItem, ProductUpdate} from "../models/Product";


const XAWS = AWSXRay.captureAWS(AWS);
const logger = createLogger('productAccess');

export class ProductAccess {
  constructor(
    private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
    private readonly productsTable = process.env.PRODUCTS_TABLE
  ) {}

  async getProducts(userId: string): Promise<ProductItem[]> {
    logger.info('Getting all products');
    const result = await this.docClient
      .query({
        TableName: this.productsTable,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId
        }
      })
      .promise();
    return result.Items as ProductItem[];
  }

  async getProduct(userId: string, productId: string): Promise<ProductItem> {
    logger.info(`Getting product item: ${productId}`);
    const result = await this.docClient
      .query({
        TableName: this.productsTable,
        KeyConditionExpression: 'userId = :userId and productId = :productId',
        ExpressionAttributeValues: {
          ':userId': userId,
          ':productId': productId
        }
      })
      .promise();
    const productItem = result.Items[0];
    return productItem as ProductItem;
  }

  async createProduct(newProduct: ProductItem): Promise<ProductItem> {
    logger.info(`Creating new product item: ${newProduct.productId}`);
    await this.docClient
      .put({
        TableName: this.productsTable,
        Item: newProduct
      })
      .promise();
    return newProduct;
  }

  async updateProduct(userId: string, productId: string, updateData: ProductUpdate): Promise<void> {
    logger.info(`Updating a product item: ${productId}`);
    await this.docClient
      .update({
        TableName: this.productsTable,
        Key: { userId, productId },
        ConditionExpression: 'attribute_exists(productId)',
        UpdateExpression: 'set #n = :n, category = :category, cost = :cost, description = :description',
        ExpressionAttributeNames: { '#n': 'name' },
        ExpressionAttributeValues: {
          ':n': updateData.name,
          ':category': updateData.category,
          ':cost': updateData.cost,
          ':description': updateData.description,
        }
      })
      .promise();
  }

  async deleteProduct(userId: string, productId: string): Promise<void> {
    await this.docClient
      .delete({
        TableName: this.productsTable,
        Key: { userId, productId }
      })
      .promise();
  }

  async saveImgUrl(userId: string, productId: string, bucketName: string): Promise<void> {
    await this.docClient
      .update({
        TableName: this.productsTable,
        Key: { userId, productId },
        ConditionExpression: 'attribute_exists(productId)',
        UpdateExpression: 'set attachmentUrl = :attachmentUrl',
        ExpressionAttributeValues: {
          ':attachmentUrl': `https://${bucketName}.s3.amazonaws.com/${productId}`
        }
      })
      .promise();
  }
}
