import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { fetchData, updateStationState } from "./DataFetching";
import { StationListData } from "./StationData";
import { StationMap } from "./components/StationMap";
import { GUIOverlay } from "./components/GUIOverlay";
import { Map } from "leaflet";

export const App = () => {
  const [data, setData] = useState<StationListData>([]);
  const leafletMap = useRef<Map|null>(null);

  useEffect(() => {
    fetchData(setData);
    // setInterval(() => updateStationState(setData), 10000);
  }, []);

  return (
    <div className="App">
      <GUIOverlay data={data} mapRef={leafletMap} />
      <StationMap data={data} mapRef={leafletMap} />
    </div>
  );
}
