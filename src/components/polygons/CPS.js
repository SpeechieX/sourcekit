import React, { useState } from "react";
import { Source, Layer } from "@urbica/react-map-gl";

const cps = require("../../localdata/Chompasak.json");

export default function CPS() {
  return (
    <div className="container">
      <Source id="chompasak" type="geojson" data={cps} />
      <Layer
        id="chompasak"
        type="line"
        source="chompasak"
        layout={{
          "line-join": "round",
          "line-cap": "round",
        }}
        paint={{
          "line-color": "rgba(255,229,0,.7)",
          "line-width": 2,
        }}
      />
    </div>
  );
}
