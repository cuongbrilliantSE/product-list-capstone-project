export interface TodoItem {
  userId: string;
  createdAt: string;
  name: string;
  productId: string;
  type: string;
  cost: string;
  description: string;
  attachmentUrl: string;
}

// Fields in a request to create a single TODO item.
export interface TodoCreate {
  name: string;
  type: string;
  cost: string;
  description: string;
  attachmentUrl: string;
}

// Fields in a request to update a single TODO item.
export interface TodoUpdate {
  name: string;
  type: string;
  cost: string;
  description: string;
  attachmentUrl: string;
}
