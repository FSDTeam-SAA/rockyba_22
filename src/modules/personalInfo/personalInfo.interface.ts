export interface IAddress {
  houseNumber: string;
  zipCode: string;
  street: string;
  city: string;
}

export interface IPersonalInfo {
  salutation: "Mr" | "Ms";
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: IAddress;
  referral?: string; // Optional
}
