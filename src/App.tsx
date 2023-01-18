import React, { useEffect, useState } from "react";
import "./App.css";
import { fetchData, updateStationState } from "./DataFetching";
import { StationData } from "./StationData";
import { StationMap } from "./components/StationMap";
import { GUIOverlay } from "./components/GUIOverlay";

export const App = () => {
  const [data, setData] = useState<StationData>([]);

  useEffect(() => {
    fetchData(setData);
    setInterval(() => updateStationState(setData), 10000);
  }, []);

  return (
    <div className="App">
      {/* <h1>oslo city bikes</h1> */}
      <GUIOverlay />
      <StationMap data={data} />
    </div>
  );
}
