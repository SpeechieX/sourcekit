import React, { useState } from "react";
import { Source, Layer } from "@urbica/react-map-gl";

export default function VTE() {
  const vientiane = require("../../localdata/Vientiane.json");
  const vte = require("../../localdata/VTE_Focus.json");
  return (
    <div className="container">
      <Source id="route" type="geojson" data={vientiane} />
      <Layer
        id="route"
        type="line"
        source="route"
        layout={{
          "line-join": "round",
          "line-cap": "round",
        }}
        paint={{
          "line-color": "rgba(255,129,0,.7)",
          "line-width": 2,
        }}
      />
      <div>
        <Source id="focus" type="geojson" data={vte} />
        <Layer
          id="focus"
          type="line"
          source="focus"
          layout={{
            "line-join": "round",
            "line-cap": "round",
          }}
          paint={{
            "line-color": "rgba(255, 255, 120,1)",
            "line-width": 2,
          }}
        />
      </div>
    </div>
  );
}
