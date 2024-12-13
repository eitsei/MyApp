import GtfsRealtimeBindings from "gtfs-realtime-bindings";
import fetch from "node-fetch";

/**
 * Hakee ajoneuvot ja suodattaa ne annetun tyypin mukaan.
 * @param {string} type - Suodatettava tyyppi, esim. "spora".
 * @returns {Promise<Array>} - Lista ajoneuvo-objekteista.
 */
async function fetchVehiclesByType(type) {
  try {
    const response = await fetch("https://realtime.hsl.fi/realtime/vehicle-positions/v2/hsl");
    if (!response.ok) {
      throw new Error(`${response.url}: ${response.status} ${response.statusText}`);
    }

    // Lue binäärinen Protobuf-data
    const buffer = await response.arrayBuffer();
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(new Uint8Array(buffer));

    // Suodattimet eri tyypeille ("spora" on esimerkkinä)
    const typeFilters = {
      spora: "40", // Sporan tunniste palveluntarjoajalta
      toge: "90",   // Toinen tyyppi
    };

    const filterCode = typeFilters[type];
    if (!filterCode) {
      throw new Error(`Tuntematon tyyppi: ${type}`);
    }

    // Suodatetaan ajoneuvot
    const vehicles = feed.entity
      .filter((entity) => {
        if (entity.vehicle) {
          const parts = entity.vehicle.vehicle.id.split("/");
          return parts[0] === filterCode; // Tarkistetaan tarjoajakoodi
        }
        return false;
      })
      .map((entity) => {
        const { id } = entity.vehicle.vehicle;
        const { latitude, longitude, bearing, speed } = entity.vehicle.position;
        const route = entity.vehicle.trip.routeId.slice(-2); // Reitin viimeiset kaksi merkkiä
        const filteredId = id.split("/")[1];
        return {
          filteredId,
          bearing,
          speed,
          latitude,
          longitude,
          route,
        };
      });

    return vehicles;
  } catch (error) {
    console.error("Error fetching or decoding GTFS-RT data:", error);
    return [];
  }
}

export default fetchVehiclesByType;
