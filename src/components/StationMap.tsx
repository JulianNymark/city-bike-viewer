import { Map, divIcon } from "leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBicycle, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { setCurrentPosition } from "../utils";
import { StationListData } from "../StationData";
import "./StationMap.css";
import { HTMLStringCustomMarkerIcon } from "../CustomMarkerIcon";

const MapEventHandler = () => {
  const map = useMapEvents({
    locationfound: (location) => {
      setCurrentPosition(map, location);
    },
  });
  return null;
};

export const StationMap = ({ mapRef, data }: { mapRef: React.MutableRefObject<Map|null>, data: StationListData }) => {
  return (
    <MapContainer
      center={[59.905, 10.709]}
      zoom={13}
      scrollWheelZoom={true}
      whenCreated={(map) => {
        map.locate({watch: true});
        mapRef.current = map;
      }}
    >
      <MapEventHandler />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // use this while developing (looks messy, but it's free)
        // url="https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=64e88e13938c4874889cbc2e68171f06" // NOTE: looks nice but only 15k request limit per month is free
      />
      {data.map((station) => {
        let customIcon = divIcon({
          className: "CustomMarkerIcon",
          html: HTMLStringCustomMarkerIcon({
            docksAvailable: station.docksAvailable, 
            bikesAvailable: station.bikesAvailable,
            station_id: station.id
          }),
        });
        return (
          <Marker position={[station.lat, station.lon]} icon={customIcon}>
            <Popup data-station-id={"test"}>
              <h3>{station.name}</h3>
              <FontAwesomeIcon icon={faBicycle} /> {station.bikesAvailable}
              <br />
              <FontAwesomeIcon icon={faLockOpen} /> {station.docksAvailable}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};
