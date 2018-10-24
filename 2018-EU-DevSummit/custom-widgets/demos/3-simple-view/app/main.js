define(["require", "exports", "esri/Map", "esri/views/MapView"], function (require, exports, Map, MapView) {
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
        center: [13.404954, 52.520008],
        zoom: 15
    });
});
//# sourceMappingURL=main.js.map