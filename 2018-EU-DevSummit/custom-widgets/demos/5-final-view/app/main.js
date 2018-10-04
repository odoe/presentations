define(["require", "exports", "esri/views/MapView", "./WebMapShowcase"], function (require, exports, MapView, WebMapShowcase) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //----------------
    //  map setup
    //----------------
    var view = new MapView({ container: "viewDiv" });
    //----------------
    //  widget setup
    //----------------
    var widget = new WebMapShowcase({ view: view });
    view.ui.add(widget, "top-right");
});
//# sourceMappingURL=main.js.map