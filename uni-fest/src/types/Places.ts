import Events from "./Events";

export default interface Places {
  id: string;
  latitude: number;
  longitude: number;
  name: string;
  image?: string;
  description: string;
  rate: number;
  images?: string[];
  events: Events[];
}
