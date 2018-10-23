import MapView from "esri/views/MapView";

import WebMapShowcase from "./WebMapShowcase";

//----------------
//  map setup
//----------------

const view = new MapView({ container: "viewDiv" });

//----------------
//  widget setup
//----------------

const widget = new WebMapShowcase({ view });

view.ui.add(widget, "top-right");
