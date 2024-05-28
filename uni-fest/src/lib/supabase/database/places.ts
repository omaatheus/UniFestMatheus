import { supabase } from "../config";

export async function get(limit: number = 100) {
  return await supabase.from("places").select("*").limit(limit);
}
