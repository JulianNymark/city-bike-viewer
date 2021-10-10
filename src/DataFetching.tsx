import { StationData } from "./StationData";

const CLIENT_IDENTIFIER = "julians-citybikeviewer"; // best practice to send in Client-Identifier header

// 1. fetch station information (cache 24h clientside)
// 2. fetch station state (every refresh / ajax)
// 3. (optional) smart "live" fetching only stations in view more frequently (and animate ripples on change?)

const fetchStationInfo = async () => {
  const stationInfo = await fetch(
    "https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json",
    {
      headers: {
        "Client-Identifier": CLIENT_IDENTIFIER,
      },
    }
  );
  return stationInfo.json();
};

const fetchStationState = async () => {
  const stationState = await fetch(
    "https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json",
    {
      headers: {
        "Client-Identifier": CLIENT_IDENTIFIER,
      },
    }
  );
  return stationState.json();
};

const extractData = (stationInfo: any, stationState: any): StationData => {
  const stations: StationData = stationInfo.data.stations.map(
    (station: any) => {
      // NOTE: using .find() here for each update is fine for the approx 250 stations
      // I don't want to assume the two request responses match / come in sorted order 
      // this can be optimized with gql or safe sort assumption...
      const stationStateMatch = stationState.data.stations.find((element: any) => element.station_id === station.station_id)
      const bikesAvailable = stationStateMatch.num_bikes_available;
      const docksAvailable = stationStateMatch.num_docks_available;
      return {
        name: station.name,
        lon: station.lon,
        lat: station.lat,
        bikesAvailable,
        docksAvailable,
      };
    }
  );

  return stations;
};

export const fetchData = async (setData: React.Dispatch<any>) => {
  const stationInfo = await fetch(
    "https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json",
    {
      headers: {
        "Client-Identifier": CLIENT_IDENTIFIER,
      },
    }
  );
  const allData = await Promise.all([fetchStationInfo(), fetchStationState()]);
  setData(extractData(...allData));
};
