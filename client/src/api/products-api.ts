import Axios from 'axios';
import { Method, AxiosResponse } from 'axios';
import { apiEndpoint } from '../config';
import {
  CreateProductResp,
  GetProductResp, GetProductsResp,
  ProductCreate,
  ProductItem,
  ProductUpdate,
  UploadUrl
} from "../types/Product";


async function axRequest<ReqData, RespData>(
  idToken: string,
  path: string,
  method: Method,
  reqBody: ReqData
): Promise<AxiosResponse<RespData>> {
  const url = `${apiEndpoint}/${path}`;
  const data = reqBody ? JSON.stringify(reqBody) : reqBody;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${idToken}`
  };
  return Axios({ method, url, headers, data });
}

export async function getProducts(idToken: string): Promise<ProductItem[]> {
  const response: AxiosResponse<GetProductsResp> = await axRequest<null, GetProductsResp>(
    idToken,
    'products',
    'GET',
    null
  );
  return response.data.productList;
}

export async function getProduct(idToken: string, productId: string): Promise<ProductItem> {
  const response: AxiosResponse<GetProductResp> = await axRequest<null, GetProductResp>(
    idToken,
    `products/${productId}`,
    'GET',
    null
  );
  return response.data.productItem[0];
}

export async function createProduct(idToken: string, newProduct: ProductCreate): Promise<ProductItem> {
  const response: AxiosResponse<CreateProductResp> = await axRequest<ProductCreate, CreateProductResp>(
    idToken,
    'products',
    'POST',
    newProduct
  );
  return response.data.newProduct;
}

export async function updateProduct(
  idToken: string,
  productId: string,
  updatedProduct: ProductUpdate
): Promise<undefined> {
  const response: AxiosResponse<undefined> = await axRequest<ProductUpdate, undefined>(
    idToken,
    `products/${productId}`,
    'PUT',
    updatedProduct
  );
  return response.data;
}

export async function deleteProduct(idToken: string, productId: string): Promise<undefined> {
  const response: AxiosResponse<undefined> = await axRequest<null, undefined>(
    idToken,
    `products/${productId}`,
    'DELETE',
    null
  );
  return response.data;
}

export async function getUploadUrl(
  idToken: string,
  productId: string
): Promise<string> {
  const response: AxiosResponse<UploadUrl> = await axRequest<null, UploadUrl>(
    idToken,
    `products/${productId}/attachment`,
    'POST',
    null
  );
  return response.data.uploadUrl;
}

export async function uploadFile(uploadUrl: string, file: Buffer): Promise<void> {
  await Axios.put(uploadUrl, file);
}
