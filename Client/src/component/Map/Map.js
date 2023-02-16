import React, { useEffect, useState, useContext } from "react";
import GoogleMapReact from "google-map-react";

const api_key = "AIzaSyCeKJylze8iniFLkQWrznEJYnCzSgSdLwk";
const mapStylings = "w-full h-full";
const Uni = {
  address: "2500 University Dr NW, Calgary, AB",
  lat: 51.0784,
  lng: 114.1347,
};
export default function Map(params) {
  return (
    <div className={mapStylings}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: api_key }}
        defaultCenter={Uni}
        defaultZoom={20}
      ></GoogleMapReact>
    </div>
  );
}
