export type Status = "published" | "hidden";

export interface Governorate {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  status: Status;
}

export interface Area {
  id: string;
  governorateId: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  status: Status;
}

export interface Building {
  id: string;
  governorateId: string;
  areaId: string;
  name: string;
  slug: string;
  mainImage: string;
  images: string[];
  description: string;
  address: string;
  details: {
    propertyType: string;
    floors: number;
    units: number;
    area: string;
    rooms: number;
    bathrooms: number;
    finishing: string;
    deliveryStatus: string;
  };
  location: { address: string; googleMapsUrl: string; latitude: number; longitude: number };
  contact: { phone: string; whatsapp: string };
  notes: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
}

export interface AppData { governorates: Governorate[]; areas: Area[]; buildings: Building[] }
