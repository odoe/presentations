import Map = require("esri/Map");
import MapView = require("esri/views/MapView");

import WebMapShowcase = require("./WebMapShowcase");

//----------------
//  map setup
//----------------

const map = new Map({
  basemap: "streets-vector"
});

const view = new MapView({
  map,
  container: "viewDiv",
  center: [-117.1628487109789, 32.706813240831096],
  zoom: 15
});

//----------------
//  widget setup
//----------------

const widget = new WebMapShowcase({ view });

view.ui.add(widget, "top-right");
