// import "mapbox-gl/dist/mapbox-gl.css";
// import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
// import React, { Component } from "react";
// import ReactMapGL from "react-map-gl";
// import DeckGL, { GeoJsonLayer } from "deck.gl";
// import Geocoder from "react-map-gl-geocoder";

// export default class SearchMap extends Component {
//   state = {
//     latitude: 0,
//     longitude: 0,
//     zoom: 1,
//     searchResultLayer: null,
//   };
//   mapRef = React.createRef();

//   handleViewPortChange = (viewport) => {
//     this.ListeningStateChangedEvent({
//       viewport: { ...this.state.viewport, ...viewport },
//     });
//   };

//   handleGeocoderViewportChange = (viewport) => {
//     const geocoderDefaultOverrides = { transitionDuration: 1000 };

//     return this.handleViewPortChange({
//       ...viewport,
//       ...geocoderDefaultOverrides,
//     });
//   };

//   handleOnResult = (event) => {
//     this.ListeningStateChangedEvent({
//       searchResultLayer: new GeoJsonLayer({
//         id: "search-result",
//         data: event.result.geometry,
//         getFillColor: [255, 0, 0, 128],
//         getRadius: 1000,
//         pointRadiusMinPixels: 10,
//         pointRadiusMaxPixels: 10,
//       }),
//     });
//   };

//   render() {
//     const { viewport, searchResultLayer } = this.state;

//     return (
//       <div style={{ height: "100vh" }}>
//         <h1
//           style={{
//             textAlign: "center",
//             fontSize: "25px",
//             fontWeight: "bolder",
//           }}
//         >
//           Use the search bar to find a location or click <a href="/">here</a> to
//           find your location
//         </h1>
//         <ReactMapGL
//           ref={this.mapRef}
//           {...viewport}
//           mapStyle="mapbox://styles/speechiex/ckc4cytu30l8u1inxwfmkx76g"
//           width="100%"
//           height="90%"
//           onViewportChange={this.handleViewportChange}
//           mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
//         >
//           <Geocoder
//             mapRef={this.mapRef}
//             onResult={this.handleOnResult}
//             onViewportChange={this.handleGeocoderViewportChange}
//             mapboxApiAccessToken={token}
//             position="top-left"
//           />
//         </ReactMapGL>
//         <DeckGL {...viewport} layers={[searchResultLayer]} />
//       </div>
//     );
//   }
// }
