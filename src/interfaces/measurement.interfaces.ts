import { IAssetData } from "./asset.interfaces";
import { IClientData } from "./client.interfaces";

export interface IMeasurementData {
  _id: string;
  createdAt: string;
  updatedAt: string;
  user: string;
  date: string;
  client: Pick<IClientData, "_id" | "name" | "lastName">;
  //   client: IClientDocument['_id'];
  name: string;
  notes?: string;
  images?: Pick<IAssetData, "_id" | "imageURL">[];
  weight: number;
  height: number;
  age: number;
  sex: "male" | "female";
  pal: number;
  bmi: number;
  //   bmi_type: 'niedowaga' | 'norma' | 'nadwaga' | 'otyłość';
  ppmMifflin: number;
  ppmHarris: number;
  cpm: number;
  whr?: number;
  whtr?: number;
  ymca?: number;
  //circuits
  chest_breath?: number;
  chest_exhaust?: number;
  shoulder?: number;
  shoulder_tonus?: number;
  waist?: number;
  hip?: number;
  forearm?: number;
  thigh?: number;
  calf?: number;
  //lappets
  biceps?: number;
  triceps?: number;
  shoulder_blade?: number;
  ala_of_ilium?: number;
  iliac_spine?: number;
}

export interface IMeasurementPaginationData {
  measurements: IMeasurementData[];
  pagination: {
    count: number;
    pageCount: number;
  };
}

export interface IMeasurementProps {
  measurement: IMeasurementData;
}
