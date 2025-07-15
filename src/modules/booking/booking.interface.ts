import { Types } from "mongoose";

export interface ICleaningPackage {
  type: "executive" | "ceo";
  includedServices: string[];
}

export interface IAppointment {
  hasPreferredDate: boolean;
  preferredDate?: Date;
  preferredTime?: string;
}

export interface IExtras {
  specialRequests?: string;
}

export interface IPrice {
  perCleaning: number;
  total: number;
}

export interface IBookingInfo {
  apartmentSize: string;
  cleaningInterval: string;
  householdSize: number;
  cleaningPackage: ICleaningPackage;
  extras?: IExtras;
  appointment: IAppointment;
  price: IPrice;
  agreedToPrivacyPolicy: boolean;
  personalInfo: Types.ObjectId;
  createdAt?: Date;
}
