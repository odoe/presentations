import * as Map from "esri/map";
import VectorTileLayer = require("esri/layers/VectorTileLayer");
import Measurement = require("esri/dijit/Measurement");
import "dojo/domReady!";

const map = new Map("map-area", {
  center: [-118.11, 34.65],
  zoom: 7,
  minZoom: 7
});

let vtlayer = new VectorTileLayer("https://www.arcgis.com/sharing/rest/content/items/f96366254a564adda1dc468b447ed956/resources/styles/root.json");
map.addLayer(vtlayer);
map.on('load', () => {
  let measurement = new Measurement({ map }, document.getElementById('measureDiv'));
  measurement.startup();
});
