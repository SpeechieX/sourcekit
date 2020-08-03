/*

Written By Erik HR Copyright AroiTech 2020
Server Code for React x GraphQL x Node x MongoDB Testing.

 */

import React, { useState } from "react";
import DeckGL from "@deck.gl/react";
import { LineLayer } from "@deck.gl/layers";

// Solids
import ReactMapGL, { FullscreenControl } from "@urbica/react-map-gl";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Sidebar from "./components/nav/Sidebar";
import Clock from "./components/Clock";

// import useSwr from "swr"; // Used this to get the clusters
// import Geocoder from "react-map-gl-geocoder"; // Used to Query
import { GeolocateControl } from "react-map-gl";
// import Map from "./components/SearchMap";
// import Weather from "./components/Weather";

// GraphQL Client
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

// Polygons - Will be moved downtree
import ServiceArea from "./components/polygons/ServiceArea";

// Styles

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
});

const route = [
  {
    sourcePosition: [102.6264271047922, 18.03090283648859],
    targetPosition: [102.5976198, 17.9709182],
  },
];

// const fetcher = (...args) => fetch(...args).then(response.json());

export default function App(route) {
  const [viewport, setViewport] = useState({
    latitude: 17.999342, // Should never be over 90!!!
    longitude: 102.643989,
    width: "100vw",
    height: "100vh",
    zoom: 8.5,
  });

  const layers = [new LineLayer({ id: "line-layer", route })];

  // const [location, getLocation] = useState({
  //   getLocation = navigator.geolocation.getCurrentPosition()
  // })

  // load and prep data
  // urban data url

  return (
    <ApolloProvider client={client}>
      <Container fluid>
        <Clock />
        <div id="menu-one" className="menu-one">
          <Sidebar />
        </div>
        <div id="menu-two" className="menu-two"></div>

        <div className="container">
          <DeckGL
            initialViewState={[viewport, setViewport]}
            controller={true}
            layers={layers}
          ></DeckGL>
          <ReactMapGL
            {...viewport}
            style={{ width: "100%", height: "1000px" }}
            maxZoom={20}
            accessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            mapStyle="mapbox://styles/speechiex/ckc4cytu30l8u1inxwfmkx76g"
            onViewportChange={(viewport) => {
              setViewport(viewport);
            }}
          >
            <ServiceArea />
            <GeolocateControl
              positionOptions={{
                enableHighAccuracy: true,
                timeout: 8000,
              }}
              trackUserLocation={true}
              z
              showUserLocation={true}
              showAccuracyCircle={true}
            />

            {/* <FullscreenControl
              style={}
              position="top-right"
            /> */}
            {/* {resturants.map(restaurants => (
              <Marker key={resturants.id} latitude={restaurants.location.latitude} longitude={restaurants.location.longitude}>
                <button>
                  <img src="<RESTAURANT_MARKER_URL>" alt="" />
                </button>
              </Marker>
            ))} */}
          </ReactMapGL>
        </div>
      </Container>
    </ApolloProvider>
  );
}
