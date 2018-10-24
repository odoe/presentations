import Map  from "esri/Map";
import MapView from "esri/views/MapView";

import CustomClass from "./CustomClass";

//----------------
//  map setup
//----------------

const map = new Map({
  basemap: "streets-vector"
});

const view = new MapView({
  map,
  container: "viewDiv",
  center: [13.404954, 52.520008],
  zoom: 15
});

//----------------
//  Custom Class setup
//----------------

const customClass = new CustomClass({ view });

// show next webmap every 10 seconds
setInterval(() => customClass.next(), 10000);
