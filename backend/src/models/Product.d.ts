export interface ProductItem {
  userId: string;
  createdAt: string;
  name: string;
  productId: string;
  type: string;
  cost: number;
  description: string;
  attachmentUrl: string;
}

// Fields in a request to create a single TODO item.
export interface ProductCreate {
  name: string;
  type: string;
  cost: number;
  description: string;
  attachmentUrl: string;
}

// Fields in a request to update a single TODO item.
export interface ProductUpdate {
  name: string;
  type: string;
  cost: number;
  description: string;
  attachmentUrl: string;
}
