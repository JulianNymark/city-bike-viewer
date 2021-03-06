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
import { setCurrentPosition } from "./utils";
import { StationData } from "./StationData";
import "./StationMap.css";
import { HTMLSringCustomMarkerIcon } from "./CustomMarkerIcon";

let stickyCenter = true; // set this to true to follow the users location
let willCenterNextTick = true; // this tracks the 'on first load' centering inside location events

const MapEventHandler = () => {
  const map = useMapEvents({
    locationfound: (location) => {
      setCurrentPosition(map, location);

      if (willCenterNextTick) {
        map.setView(location.latlng, 16);
        willCenterNextTick = stickyCenter;
      }
    },
    dragstart: (event) => {
      stickyCenter = false;
      willCenterNextTick = false;
    },
  });
  return null;
};

const onMapCreate = (map: Map) => {
  map.locate({ watch: true });
};

export const StationMap = ({ data }: { data: StationData }) => {
  return (
    <MapContainer
      center={[59.905, 10.709]}
      zoom={13}
      scrollWheelZoom={false}
      whenCreated={onMapCreate}
    >
      <MapEventHandler />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // use this while developing (looks messy, but it's free)
        // url="https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=64e88e13938c4874889cbc2e68171f06" // TODO: use this for "final" (looks nice but only 15k request limit per month is free)
      />
      {data.map((station) => {
        let customIcon = divIcon({
          className: "CustomMarkerIcon",
          html: HTMLSringCustomMarkerIcon({docksAvailable: station.docksAvailable, bikesAvailable: station.bikesAvailable}),
        });
        return (
          <Marker position={[station.lat, station.lon]} icon={customIcon}>
            <Popup>
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
