define(["require", "exports", "esri/Map", "esri/views/MapView", "./CustomClass", "./WebMapShowcase"], function (require, exports, Map, MapView, CustomClass, WebMapShowcase) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //----------------
    //  map setup
    //----------------
    var map = new Map({
        basemap: "streets-vector"
    });
    var view = new MapView({
        map: map,
        container: "viewDiv",
        center: [-117.1628487109789, 32.706813240831096],
        zoom: 15
    });
    //----------------
    //  Custom Class setup
    //----------------
    var customClass = new CustomClass({ view: view });
    // show next webmap every 10 seconds
    setInterval(function () { return customClass.next(); }, 10000);
    //----------------
    //  widget setup
    //----------------
    var widget = new WebMapShowcase();
    view.ui.add(widget, "top-right");
});
//# sourceMappingURL=main.js.map