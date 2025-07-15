interface IAddress {
  houseNumber: string;
  zipCode: string;
  street: string;
  city: string;
}

interface IAppointment {
  hasPreferredDate: boolean;
  preferredDate?: Date;
  preferredTime?: string;
}

export interface ICleaningPackage {
  type: "executive" | "ceo";
  includedServices: string[];
}

export interface IPrice {
  perCleaning: number;
  total: number;
}

export interface IBooking extends Document {
  apartmentSize: string;
  cleaningInterval: string;
  householdSize: number;
  cleaningPackage: ICleaningPackage;
  extras?: {
    specialRequests?: string;
  };
  appointment: IAppointment;
  personalInfo: {
    salutation: "Mr" | "Ms";
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: IAddress;
    howDidYouFindUs?: string;
  };
  price: IPrice;
  // agreedToPrivacyPolicy: boolean;
  createdAt: Date;
}
