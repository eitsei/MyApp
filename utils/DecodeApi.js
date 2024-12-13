import GtfsRealtimeBindings from "gtfs-realtime-bindings";
import fetch from "node-fetch";

(async () => {
  try {
    const response = await fetch("https://realtime.hsl.fi/realtime/vehicle-positions/v2/hsl");
    if (!response.ok) {
      throw new Error(`${response.url}: ${response.status} ${response.statusText}`);
    }

    // Lue binäärinen Protobuf-data
    const buffer = await response.arrayBuffer();
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(new Uint8Array(buffer));

    // Tulostetaan ajoneuvojen sijainnit
    feed.entity.forEach((entity) => {
        
      if (entity.vehicle) {
        const { vehicle, position } = entity.vehicle;
        const parts = vehicle.id.split("/")
        /**
         * Tarjoajat löytyvät:
         * https://digitransit.fi/en/developers/apis/5-realtime-api/vehicle-positions/high-frequency-positioning/
         */
        if (parts[0]== "40"){
            //console.log(`Vehicle ID: ${parts[1]}, Lat: ${position.latitude}, Lon: ${position.longitude}`);
            console.log(entity)
        }}
    });
  } catch (error) {
    console.error("Error fetching or decoding GTFS-RT data:", error);
  }
})();
