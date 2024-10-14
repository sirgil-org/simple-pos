export type IOrder = {
  id: string;
  vendor: IVendor;
  order_number: number;
  phone_number: number;
  status: string;
  catalogue: string;
  created_at: Date;
  completed_at: Date;
  collected_at: Date;
  cancelled_at: Date;
  preparing_at: Date;
};

export type IProductOrder = {
  product_id: string;
  quantity: number;
  created_at: Date;
  order_id: string;
  price: number;
  products: IProduct;
};

export type IProduct = {
  id: string;
  instock: boolean;
  created_at: Date;
  title: string;
  image_url: string;
  price: number;
  vendor: IVendor;
};

export type IVendor = {
  id: string;
  name: string;
  slug: string;
  created_at: Date;
};

export type IShop = {
  id?: string;
  name?: string;
  created_at?: string;
  slug?: string;
};

export type IExpense = {
  id?: string;
  shop?: IShop;
  invoice_number?: string;
  amount?: number;
  created_at?: Date;
};

export type QueryProps = {
  table: string;
  is_single?: boolean;
  from?: number;
  to?: number;
  pageSize?: number;
  offset?: number;
  _id?: number;
  filter?: string;
  modifier?: string;
  order?: { column?: string; ascending?: boolean };
  cb?: (i: unknown) => void;
};

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}


export type IAddItemForm = {
  title: string;
  price: number;
};