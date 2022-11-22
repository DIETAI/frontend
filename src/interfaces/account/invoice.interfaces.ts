export interface IInvoiceData {
  _id: string;
  createdAt: string;
  updatedAt: string;
  user: string;
  companyName: string;
  taxpayerIdentificationNumber: string; //nip
  zipCode: string;
  city: string;
  street: string;
  houseNumber: string;
  apartmentNumber?: string;
}

export interface IInvoiceProps {
  invoice: IInvoiceData;
}
