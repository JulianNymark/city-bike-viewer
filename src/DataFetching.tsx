import { StationListData } from "./StationData";

const CLIENT_IDENTIFIER = "julians-citybikeviewer"; // best practice to send in Client-Identifier header

// 1. fetch station information (cache 24h clientside)
//    this data is unlikely to change often, can be cached for a while
// 2. fetch station state (every refresh / ajax)
//    this data will frequently change, don't cache it for very long, or at all, let the user refresh it on demand as well!  
// 3. (optional) smart "live" fetching only stations in view more frequently (and animate ripples on change?)

// Raw data from the last fetch is stored here, as close to the fetching code as possible,
// when sent further down the React tree (from the App.tsx), this data
// will get transformed to contain only "useful render data", consider this the "source of truth"
// and it's "as good as" fetching the request from the API again (except for staleness!)
let raw_state_station_info = {}
let raw_state_station_state = {}

const fetchStationInfo = async () => {
  console.debug('fetching station info...');
  const stationInfo = await fetch(
    "https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json",
    {
      headers: {
        "Client-Identifier": CLIENT_IDENTIFIER,
      },
    }
  );
  raw_state_station_info = await stationInfo.json();
  return raw_state_station_info;
};

const fetchStationState = async () => {
  console.debug('fetching station states...');
  const stationState = await fetch(
    "https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json",
    {
      headers: {
        "Client-Identifier": CLIENT_IDENTIFIER,
      },
    }
  );
  raw_state_station_state = await stationState.json();
  return raw_state_station_state;
};

const extractData = (stationInfo: any, stationState: any): StationListData => {
  const stations: StationListData = stationInfo.data.stations.map(
    (station: any) => {
      // Since I couldn't finde a guarantee that the API will return the data in a stable ordering / sorted ordering.
      // I have decided to use clientside "data processing", that is .find() to extract the parts I want from the server response.
      // 
      // using .find() here for each update is fine for the approx 250 stations
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
        id: station.station_id,
      };
    }
  );

  return stations;
};

// don't call too often, or the API will probably throttle the client
export const updateStationState = async (setData: React.Dispatch<any>) => {
  const stationState = await fetchStationState();
  setData(extractData(raw_state_station_info, stationState));
}

export const fetchData = async (setData: React.Dispatch<any>) => {
  const allData = await Promise.all([fetchStationInfo(), fetchStationState()]);
  setData(extractData(...allData));
};
