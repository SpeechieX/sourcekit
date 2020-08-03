import React, { useState } from "react";
import ReactMapGL, { GeolocateControl } from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import Geocoder from "react-map-gl-geocoder";
import logo from "./logo.svg";

import "./App.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
});

export default function Map() {
  const [viewport, setViewport] = useState({
    latitude: 17.999342, // Should never be over 90!!!
    longitude: 102.643989,
    width: "600px",
    height: "400px",
    zoom: 8.5,
  });
  return (
    <ApolloProvider client={client}>
      <div className="container">
        <ReactMapGL
          {...viewport}
          mapStyle="mapbox://styles/speechiex/ckc4cytu30l8u1inxwfmkx76g"
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          onViewportChange={(viewport) => {
            setViewport(viewport);
          }}
        />
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
        <header>
          <p>Test Source Kit</p>
        </header>
      </div>
    </ApolloProvider>
  );
}
