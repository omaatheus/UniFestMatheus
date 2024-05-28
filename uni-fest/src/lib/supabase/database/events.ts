import Events from "../../../types/Events";
import { supabase } from "../config";

/**
 *
 * @param limit
 * @returns all events that end_date is greater than the current date
 */
export async function get(limit: number = 1000) {
  const date = new Date();
  date.setDate(date.getDate() - 1); // yesterday date

  // Get all 100 events that end_date is greater than yesterday date and get the place data (place is a foreign key in the events table)
  const { data } = await supabase
    .from("events")
    .select(`"*", places(*)`) // get the place data
    .limit(limit)
    .gte("end_date", new Date().toISOString());

  return data as unknown as Events[];
}

export async function getEventsByPlaceId(placeId: string) {
  const { data } = await supabase
    .from("events")
    .select("*")
    .limit(50)
    .eq("location_id", placeId);

  return data as unknown as Events[];
}
