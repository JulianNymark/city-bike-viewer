import { Map, circle, LocationEvent, Circle } from "leaflet";

export let currentPosition: null | Circle;

export const setCurrentPosition = (map: Map, location: LocationEvent) => {
  let radius = location.accuracy;
  if (currentPosition) {
    currentPosition.setLatLng(location.latlng);
    currentPosition.setRadius(radius);
  } else {
    currentPosition = circle(location.latlng, radius).addTo(map);
  }
};
