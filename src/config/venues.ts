import martini from "@/assets/venue-martini-in-the-clouds.webp";
import regency from "@/assets/venue-maharaja-regency.webp";
import residence from "@/assets/venue-saidha-residence.webp";
import tajMoga from "@/assets/venue-hotel-taj-moga.webp";

export type VenueId = "residence" | "martini" | "regency" | "taj";

export interface Venue {
  id: VenueId;
  image: string;
  /** Google Maps search used for "Get directions". */
  mapsQuery: string;
}

export const venues: Venue[] = [
  {
    id: "martini",
    image: martini,
    mapsQuery:
      "Martini In The Clouds, Hotel Maharaja Regency, Aarti Chowk, Ferozepur Road, Ludhiana, Punjab 141001",
  },
  {
    id: "regency",
    image: regency,
    mapsQuery: "Hotel Maharaja Regency, Aarti Chowk, Ferozepur Road, Ludhiana, Punjab 141001",
  },
  {
    id: "residence",
    image: residence,
    mapsQuery: "House No. 117, Apple Villa, Ludhiana, Punjab",
  },
  {
    id: "taj",
    image: tajMoga,
    mapsQuery: "Hotel Taj, Moga, Punjab",
  },
];

export function mapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
