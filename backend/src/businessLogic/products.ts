import * as uuid from 'uuid';
import * as AWS from 'aws-sdk';
import {ProductAccess} from '../dataLayer/productAccess';
import { getUserId } from '../utils/getJwt';
import {ProductCreate, ProductItem, ProductUpdate} from "../models/Product";


const productAccess = new ProductAccess();

export async function getProducts(jwtToken: string): Promise<ProductItem[]> {
  const userId: string = getUserId(jwtToken);
  return productAccess.getProducts(userId);
}

export async function getProduct(jwtToken: string, productId: string): Promise<ProductItem> {
  const userId: string = getUserId(jwtToken);
  return productAccess.getProduct(userId, productId);
}

export async function createProduct(jwtToken: string, newProductData: ProductCreate): Promise<ProductItem> {
  const productId = uuid.v4();
  const userId = getUserId(jwtToken);
  const createdAt = new Date().toISOString();
  const newProduct: ProductItem = { productId, userId, createdAt, ...newProductData };
  return productAccess.createProduct(newProduct);
}

export async function updateProduct(
  jwtToken: string,
  productId: string,
  updateData: ProductUpdate
): Promise<void> {
  const userId = getUserId(jwtToken);
  return productAccess.updateProduct(userId, productId, updateData);
}

export async function deleteProduct(jwtToken: string, productId: string): Promise<void> {
  const userId = getUserId(jwtToken);
  return productAccess.deleteProduct(userId, productId);
}

export async function generateUploadUrl(jwtToken: string, productId: string): Promise<string> {
  const userId = getUserId(jwtToken);
  const bucketName = process.env.IMAGES_S3_BUCKET;
  const urlExpiration = parseInt(process.env.SIGNED_URL_EXPIRATION, 10);
  const s3 = new AWS.S3({ signatureVersion: 'v4' });
  const signedUrl = s3.getSignedUrl('putObject', {
    Bucket: bucketName,
    Key: productId,
    Expires: urlExpiration
  });
  await productAccess.saveImgUrl(userId, productId, bucketName);
  return signedUrl;
}
