import MapView = require("esri/views/MapView");

import WebMapShowcase = require("./WebMapShowcase");

//----------------
//  map setup
//----------------

const view = new MapView({ container: "viewDiv" });

//----------------
//  widget setup
//----------------

const widget = new WebMapShowcase({ view });

view.ui.add(widget, "top-right");
