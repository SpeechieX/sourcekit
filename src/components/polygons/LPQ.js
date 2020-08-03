import React, { useState } from "react";
import { Source, Layer } from "@urbica/react-map-gl";

export default function Lpq() {
  const lpq = require("../../localdata/LuangPrabang.json");
  const LPQ = require("../../localdata/LPQ_Focus.json");

  return (
    <div className="container">
      <Source id="luangprabang" type="geojson" data={lpq} />
      <Layer
        id="luangprabang"
        type="line"
        source="luangprabang"
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
        <Source id="_focus1" type="geojson" data={LPQ} />
        <Layer
          id="_focus1"
          type="line"
          source="_focus1"
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
