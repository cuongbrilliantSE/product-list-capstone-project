export interface ProductItem {
  productId: string;
  userId: string;
  createdAt: string;
  name: string;
  dueDate: string;
  done: boolean;
  attachmentUrl: string;
}

export interface GetProductsResp {
  productList: ProductItem[];
}

export interface GetProductResp {
  productItem: ProductItem[];
}

export interface CreateProductResp {
  newProduct: ProductItem;
}

// Fields in a request to create a single TODO item.
export interface ProductCreate {
  name: string;
  dueDate: string;
  attachmentUrl: string;
}

// Fields in a request to update a single TODO item.
export interface ProductUpdate {
  name: string;
  dueDate: string;
  done: boolean;
}

export interface UploadUrl {
  uploadUrl: string;
}
