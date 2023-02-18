import React, { useEffect, useState, useContext } from "react";
import { Map, Marker, GoogleApiWrapper, InfoWindow } from "google-maps-react";
import { MaterialLoader } from "three";

const api_key = "AIzaSyCeKJylze8iniFLkQWrznEJYnCzSgSdLwk";
const mapStylings = "w-full h-full";
const Uni = {
  lat: 51.0784,
  lng: 114.1347,
};
export default function OurMap(params) {
  return (
    <div className={mapStylings}>
      <Map google={api_key} zoom={15} initialCenter={Uni}></Map>
    </div>
  );
}
