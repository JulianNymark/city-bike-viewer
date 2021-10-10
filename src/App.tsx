import React, { useEffect, useState } from "react";
import "./App.css";
import { fetchData } from "./DataFetching";
import { StationMap } from "./StationMap";

export const App = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    fetchData(setData);
  }, []);

  return (
    <div className="App">
      {/* <h1>oslo city bikes</h1> */}
      <StationMap data={data}/>
    </div>
  );
}
