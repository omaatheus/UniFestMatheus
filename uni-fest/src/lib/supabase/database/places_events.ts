import Events from "../../../types/Events";
import Places from "../../../types/Places";
import * as events from "./events";

export async function relationateEventsWithPlaces(places: Places[]) {
  try {
    // Create an array of promises to fetch events for each place
    const eventPromises = places.map(async (place) => {
      let data: Events[];
      data = await events.getEventsByPlaceId(place.id);

      // Monto um objeto place novo mas coloco os lugares que vieram nos events que tá vazio
      return {
        ...place,
        events: data,
      };
    });

    // Wait for all event fetching promises to resolve
    const combinedData = await Promise.all(eventPromises);

    return combinedData;
  } catch (error) {
    throw new Error("ERRO");
  }
}
