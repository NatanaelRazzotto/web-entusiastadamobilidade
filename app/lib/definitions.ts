import { User as PrismaUser} from '@prisma/client';
import { number } from 'zod';
// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
// export type User = {
//   id: string;
//   name: string;
//   email: string;
//   password: string;
// };

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

///

export type User = PrismaUser;

export type Post = {
  id: string;
  namePost: string;
  title: string;
  content?: string | null; // Deve coincidir com a definição no Prisma
  coverURL?: string | null; // Deve coincidir com a definição no Prisma
  published: boolean;
  newspaperColumnID?: string | null;
  authorId: string;
  images?: Image[]; // Deve ser uma lista de Image, conforme definido
  videos?:  Video[];
  category: number;
  topNews: number;
  resume?: string | null;
  tagPost?: string | null;
  dateCreate: Date;
  dateEvent : Date;
};


export type Image = {
  id: string;
  title: string;
  description?: string | null; // Deve coincidir com a definição no Prisma
  pathURL?: string | null; // Deve coincidir com a definição no Prisma
  published: boolean;

  authorId: string;
  dateCreate?: Date; // Deve coincidir com a definição no Prisma
  postsIDs  ?:        string[]
  vehicleIDs ?:         string[]
  orderImages  ?:  OrderImage[]   
  
};

export type Video = {
  id: string;
  title: string;
  description?: string | null; // Deve coincidir com a definição no Prisma
  pathURL?: string | null; // Deve coincidir com a definição no Prisma
  published: boolean;

  authorId: string;
  dateCreate?: Date; // Deve coincidir com a definição no Prisma
  postsIDs  ?:        String[]
  vehicleIDs ?:         String[]
  
};

export type Vehicle = {
  id: string;
  plate?: string | null; // Deve coincidir com a definição no Prisma
  serialNumber?: string | null; // Deve coincidir com a definição no Prisma
  operatingCategory: number;
  imageIDs?: string[]; // Tornar images opcional, se for o caso
  bodywork?: Bodywork | null; // Deve coincidir com a definição no Prisma
  bodyworkID: string;
  powertrain?: Powertrain | null; // Deve coincidir com a definição no Prisma
  powertrainID: string;
  operator?: Operator; // Deve coincidir com a definição no Prisma
  operatorID: string;
};

export type BookOrder = {
  id: string;
  title?: string;
  description:  string;   
  request: boolean;
  processing : boolean;
  costValue : number;
  unit : number;
  paymentAccept : boolean;
  concluded : boolean;
  bookURL?: string;
  requestingUser ?:User;
  requestingUserId: string;
  dateCreate: Date;
  dateUpdate : Date;
  // Relação muitos para muitos com Image
  orderImages ?:   OrderImage[]   
}

export type OrderImage = {
  id  : string;
  bookOrderId :string;
  imageId     : string;
  requestImage: boolean;

  // Campos adicionais para a tabela de junção
  addedAt  : Date
  requestDate    : Date
  description ?:  string;
  comment?:  string;

  bookOrder ?:  BookOrder | null;
  image ?:      Image | null;

}


// Bodywork.js
export type Bodywork = {
  id: string;
  nameModel: string;
  description?: string | null;
  serialNumber?: string | null;
  year: number;
  vehicles?: Vehicle[];
  manufacturer?: Manufacturer | null;
  manufacturerID?: string | null;
};


// Powertrain.js
export type Powertrain = {
  id: string;
  nameModel: string;
  description?: string | null;
  serialNumber?: string | null;
  year: number;
  fuel: number;
  vehicles?: Vehicle[];
  manufacturer?: Manufacturer | null;
  manufacturerID?: string | null;
};

// Manufacturer.js
export type Manufacturer = {
  id: string;
  name: string;
  cnpj?: string | null;
  nationality: string;
  bodyworks?: Bodywork[];
  powertrains?: Powertrain[];
};

export type Operator = {
  id: string;
  name: string;
  cnpj?: string | null;
  nationality?: string;
  vehicles?: Vehicle[];
};



