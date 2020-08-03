import React from "react";
import { Source, Layer } from "@urbica/react-map-gl";

export default function Svk() {
  const svk = require("../../localdata/Savannahkhet.json");
  const svk_focus = require("../../localdata/SVK_Focus.json");
  return (
    <div className="container">
      <Source id="savannahkhet" type="geojson" data={svk} />
      <Layer
        id="savannahkhet"
        type="line"
        source="savannahkhet"
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
        <Source id="_focus" type="geojson" data={svk_focus} />
        <Layer
          id="_focus"
          type="line"
          source="_focus"
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
