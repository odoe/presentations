<!-- .slide: class="title" -->

## ArcGIS API for JavaScript: Getting Started

## Andy Gup – [@agup](https://twitter.com/agup)
## René Rubalcava – [@odoenet](https://twitter.com/odoenet)

---

<!-- .slide: class="sponsor" -->

---

<!-- .slide: class="section" -->

## Agenda

- Introduction to the ArcGIS API 4.x for JavaScript
- Fundamentals and Patterns
- Platform Integration
- Visualizations (2D and 3D)
- New Features
- _Bonus - Custom Builds_
- JS Framework Integration
- Questions

---

## Introduction to the ArcGIS API 4.x for JavaScript

- Simplified and consistent API
- Write apps in ES6 or TypeScript
- Modern browser support (IE11+)
- 3D support (No plugin required!)
- And many more!

---

## Where to begin?

<br>

- https://developers.arcgis.com/javascript

<br>

```
<link rel="stylesheet" href="https://js.arcgis.com/4.4/esri/css/main.css">
<script src="https://js.arcgis.com/4.4/"></script>
```

---

## Hello World Map

<br>

```js
  const map = new Map({
    basemap: "streets"
  });

  const view = new MapView({
    container: "viewDiv",  
    map: map               
  });

```

---

<!-- .slide: class="section" -->

## Fundamentals and Patterns

- Map and View

- Map
  - Contains Layers, data model for the world
- MapView and SceneView
  - Responsible for rendering the Map

---

## Map and View Relationship

![Map-View](./images/mapview1.png)

---

## Map and View Relationship

![Map-View](./images/mapview2.png)

---

## Basemap, Ground and Operational Layers

Layers are separated into 3 main groups.
 - `basemap`
 - `ground`
 - operational `layers`

`basemap` and `ground` gives context to the operational `layers`.

---

## Basemap, Ground and Operational Layers

- `basemap` and `ground` can be set by well-know ids:

```js
const map = new Map({

  /*
   streets, satellite, hybrid, terrain, topo, gray,
   dark-gray, oceans, national-geographic, osm,
   dark-gray-vector, gray-vector, streets-vector, topo-vector,
   streets-night-vector, streets-relief-vector, streets-navigation-vector
   */
  basemap: "streets"

  /*
   world-elevation 
   */
  ground: "world-elevation" 

});
```

---

## Basemap, Ground and Operational Layers

- or by specifying them

<iframe height='600' scrolling='no' title='Basemaps' src='//codepen.io/odoe/embed/preview/WEPydQ/?height=600&theme-id=31222&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/odoe/pen/WEPydQ/'>Basemaps</a> by Rene Rubalcava (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

## Basemap, Ground and Operational Layers

- `basemap` can also be set by item id.

```js
const map = new Map({

  basemap: {
    portalItem: {
      id: "8b3d38c0819547faa83f7b7aca80bd76"
    }
  }

});
```

---

## Basemap, Ground and Operational Layers

- `Map.layers` contains `Layer` objects with the operational data the user interacts with.

<iframe height='600' scrolling='no' title='Webinar - Add a FeatureLayer' src='//codepen.io/odoe/embed/preview/YxJEba/?height=300&theme-id=31222&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/odoe/pen/YxJEba/'>Webinar - Add a FeatureLayer</a> by Rene Rubalcava (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

## Basemap, Ground and Operational Layers

- `GroupLayer`

<iframe height='600' scrolling='no' title='Webinar - Grouplayer' src='//codepen.io/odoe/embed/preview/RZOjrv/?height=600&theme-id=31222&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/odoe/pen/RZOjrv/'>Webinar - Grouplayer</a> by Rene Rubalcava (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

## Layers and LayerViews

|            |          |
| ------------- | -------------:|
| FeatureLayer | TileLayer |
| GraphicsLayer | Grouplayer |
| MapImageLayer | VectorTileLayer |
| ImageryLayer | CSVLayer |
| GeoRSSLayer | KMLLayer |
| ElevationLayer | OpenStreetMapLayer |
| SceneLayer (3D) | PointCloudsLayer (3D) |
| IntegratedMeshLayer (3D) | StreamLayer |
| WebTileLayer | WMSLayer |
| WMTSLayer |  |

---

## Layers

- `Layer.fromPortalItem(...)`

<iframe height='600' scrolling='no' title='Portal Items' src='//codepen.io/odoe/embed/preview/OjQLmK/?height=600&theme-id=31222&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/odoe/pen/OjQLmK/'>Portal Items</a> by Rene Rubalcava (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

## Layers

- MapImageLayer

<iframe height='600' scrolling='no' title='Webinar - MapImageLayer - Renderer' src='//codepen.io/odoe/embed/preview/rzbYqv/?height=300&theme-id=31222&default-tab=js,result&embed-version=2&editable=true' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/odoe/pen/rzbYqv/'>Webinar - MapImageLayer - Renderer</a> by Rene Rubalcava (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

## Layers

- VectorTileLayer

<iframe height='600' scrolling='no' title='Webinar - VectorTileLayer' src='//codepen.io/odoe/embed/preview/EvJbrd/?height=600&theme-id=31222&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/odoe/pen/EvJbrd/'>Webinar - VectorTileLayer</a> by Rene Rubalcava (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

## LayerViews

![Map&View](./images/mapview2.png)

---

## LayerViews

- `LayerViews` renders the layers on the screen.
- [LayerView](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-LayerView.html) API.
- Give info about layer rendering
- Give access to data available to draw on the screen
 - Features
 - Elevation data

---

## LayerViews

- There is a layerview per layer in the map
  - except if the layer is not supported
    - incompatible SpatialReference
    - incompatible tile cache
    - 3D layer and a MapView
- Like `Map`, a view has multiple collection of layerviews.

---

## LayerViews

- access a layerview with [`View.whenLayerView()`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#whenLayerView) 

```js
  const map = new Map({
    basemap: 'topo'
  });
  const mapView = new MapView({
    map: map,
    container: 'mapDiv'
  });

  const layer = new FeatureLayer(...)
  map.add(layer);

  view.whenLayerView(layer)
    .then((layerView) => {
      layerView.visible = false
    });
```
- or [`View.allLayerViews`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#allLayerViews) 

---

## LayerViews

<iframe height='600' scrolling='no' title='FeatureLayer' src='//codepen.io/odoe/embed/preview/vJdVpQ/?height=600&theme-id=31222&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/odoe/pen/vJdVpQ/'>FeatureLayer</a> by Rene Rubalcava (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

## Accessor

- Autocasting
- Property watching
- Consistent API

---

## Accessor

- Autocasting

```js
const view = new MapView({
  container: "viewDiv",
  map: map,
  extent: { // autocast to an Extent class
    xmin: -9177811,
    ymin: 4247000,
    xmax: -9176791,
    ymax: 4247784,
    spatialReference: 102100
  }
});
```

---

## Accessor

- Property watching

<iframe height='600' scrolling='no' title='Property Changes' src='//codepen.io/odoe/embed/preview/LjKaxj/?height=300&theme-id=31222&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/odoe/pen/LjKaxj/'>Property Changes</a> by Rene Rubalcava (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

## Widgets!

- ~20 Widgets out of the box <!-- .element: class="fragment" data-fragment-index="1" -->
- Widgets help make great apps <!-- .element: class="fragment" data-fragment-index="1" -->
- Less code for you to write <!-- .element: class="fragment" data-fragment-index="1" -->
- Designed with responsive apps in mind <!-- .element: class="fragment" data-fragment-index="1" -->
- We'll look at a few key widgets <!-- .element: class="fragment" data-fragment-index="1" -->

---

## Default Widgets

- MapView & SceneView <!-- .element: class="fragment" data-fragment-index="1" -->
  - Popup
  - Attribution
  - Zoom
- SceneView <!-- .element: class="fragment" data-fragment-index="2" -->
  - NavigationToggle
  - Compass

---

## Widgets: Popup

- Responsive Design
- Size changes depending on size of view
- Can be docked to top, bottom, center and sides
- [Popup Sample](https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=popup-actions)

---

<iframe height='600' scrolling='no' title='Popup Docking' src='//codepen.io/odoe/embed/preview/qXwoRy/?height=265&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/odoe/pen/qXwoRy/'>Popup Docking</a> by Rene Rubalcava (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

## Widgets: Expand

- Collapsable button/panel <!-- .element: class="fragment" data-fragment-index="1" -->
- Can be used with widgets, dom node, HTML <!-- .element: class="fragment" data-fragment-index="2" -->
- Designed for view component use <!-- .element: class="fragment" data-fragment-index="3" -->

---

## Widgets: Expand Sample

<iframe height='600' scrolling='no' title='Expand Widget' src='//codepen.io/odoe/embed/preview/MvNYKm/?height=300&theme-id=31222&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/odoe/pen/MvNYKm/'>Expand Widget</a> by Rene Rubalcava (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

## Widgets: Expand Sample (Responsive)

<iframe height='568' scrolling='no' title='Expand Widget' src='//codepen.io/odoe/embed/preview/MvNYKm/?height=300&theme-id=31222&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 320px;'>See the Pen <a href='https://codepen.io/odoe/pen/MvNYKm/'>Expand Widget</a> by Rene Rubalcava (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

## View

Useful [view properties](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#properties-summary) for building apps

- ui
- padding

---

## View UI

- View has [`ui`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-ui-DefaultUI.html) property
- Can has `components` that can hold...
  - Widget, DOM node, text, html string

![UI](./images/views-ui-layout.jpg)

---

## View UI

<iframe height='600' scrolling='no' title='Positions' src='//codepen.io/odoe/embed/preview/mMYqGZ/?height=300&theme-id=31222&default-tab=js,result&embed-version=2&editable=true' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/odoe/pen/mMYqGZ/'>Positions</a> by Rene Rubalcava (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

## View UI: Components

- Provide easy way to add/position widgets on a view

```js
const view = new SceneView({
  ...
  components: [
    "attribution", "navigation-toggle", "compass", "zoom",
    legend, layeList
  ]
});
```

---

## Components Demo

<iframe height='600' scrolling='no' title='Components' src='//codepen.io/odoe/embed/preview/MvdOXm/?height=600&theme-id=31222&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/odoe/pen/MvdOXm/'>Components</a> by Rene Rubalcava (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

<!-- .slide: class="section" -->

## Platform Integration
## With ArcGIS Portal and ArcGIS Online

<br>
- Creating Hosted Services
- Consuming those services in the API

---

## Platform Demo

<iframe height='600' scrolling='no' title='Platform' src='//codepen.io/andygup/embed/preview/vJoOEL/?height=300&theme-id=theme-id=31222&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/andygup/pen/vJoOEL/'>vJoOEL</a> by Andy (<a href='https://codepen.io/andygup'>@andygup</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

<!-- .slide: class="section" -->

## Visualizations

---

## Visualizations

- [Smart Mapping (platform) demo](http://www.arcgis.com/home/search.html?q=NYC%20Taxi%20Data%20Snapshot&t=content&start=1&sortOrder=desc&sortField=relevance)
- Consumable via Portal Items

---

## Smart Mapping Demo

<iframe height='600' scrolling='no' title='Smart Mapping' src='//codepen.io/andygup/embed/preview/zdggNE/?height=300&theme-id=31222&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/andygup/pen/zdggNE/'>zdggNE</a> by Andy (<a href='https://codepen.io/andygup'>@andygup</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

## Visualizations

- [Renderers](https://developers.arcgis.com/javascript/latest/api-reference/esri-renderers-Renderer.html)

<iframe height='600' scrolling='no' title='SimpleRenderer' src='//codepen.io/andygup/embed/preview/qPBqVw/?height=265&theme-id=31222&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/andygup/pen/qPBqVw/'>SimpleRenderer</a> by Andy (<a href='https://codepen.io/andygup'>@andygup</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

## Visualizations
- [Arcade Expressions](https://developers.arcgis.com/arcade/)

---

## Simple Arcade Demo

<iframe height='600' scrolling='no' title='Wind Arcade' src='//codepen.io/andygup/embed/preview/pWmXZK/?height=265&theme-id=31222&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/andygup/pen/pWmXZK/'>Wind Arcade</a> by Andy (<a href='https://codepen.io/andygup'>@andygup</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

## Wind Arcade Demo

<iframe height='600' scrolling='no' title='Wind Arcade' src='//codepen.io/andygup/embed/preview/prXPWG/?height=265&theme-id=31222&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/andygup/pen/prXPWG/'>Wind Arcade</a> by Andy (<a href='https://codepen.io/andygup'>@andygup</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

## Visualizations

- [3D Maps](https://codepen.io/andygup/pen/mBdmrb)
- [3D SceneLayer](https://developers.arcgis.com/javascript/latest/sample-code/layers-scenelayer-filter-query/live/index.html)
- [3D Local Scenes](https://developers.arcgis.com/javascript/latest/sample-code/scene-local/live/index.html)

---

<!-- .slide: class="section" -->

## New Features

---

## WebGL FeatureLayer

- Beta feature in 4.5 release

```js
var dojoConfig = {
  has: {
    "esri-featurelayer-webgl": 1
  }
};
```

---

## WebGL FeatureLayer

<iframe height='600' scrolling='no' title='WebGL FeatureLayer' src='//codepen.io/odoe/embed/preview/zEOZKz/?height=300&theme-id=31222&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/odoe/pen/zEOZKz/'>WebGL FeatureLayer</a> by Rene Rubalcava (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

## Draw API and SketchViewModel

---

## SketchViewModel

```js
const sketch = new SketchViewModel({
  view: view,
  pointSymbol: {
    ...
  },
  polylineSymbol: {
    ...
  },
  polygonSymbol: {
    ...
  }
});

sketch.on("draw-complete", (event) => ...);
sketch.create("polyline"); // point, polyline, polygon
```

---

## SketchViewModel

<iframe height='600' scrolling='no' title='YrKVBW' src='//codepen.io/odoe/embed/preview/YrKVBW/?height=300&theme-id=31222&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/odoe/pen/YrKVBW/'>YrKVBW</a> by Rene Rubalcava (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

## Draw API

- More fine-grained control

```js
const draw = new Draw({ view });
const action = draw.create(type); // point, polygon, polyline
action.on("vertex-add", (event) => ...);
action.on("vertex-remove", (event) => ...);
action.on("cursor-update", (event) => ...);
action.on("draw-complete", (event) => ...);
```

---

## Draw API

<iframe height='600' scrolling='no' title='Draw API' src='//codepen.io/odoe/embed/preview/zEOdBz/?height=300&theme-id=31222&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/odoe/pen/zEOdBz/'>Draw API</a> by Rene Rubalcava (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

<!-- .slide: class="section" -->

## Custom Builds

---

## Custom Builds
- [Dojo](https://github.com/Esri/jsapi-resources/tree/master/4.x/bower/dojo)
- [Webpack](https://github.com/odoe/odoenet-esrijs)

---

## Dojo Builds

- Pros
  - Compact
  - Single file and layer builds (bundles)
- Cons
  - Not fast
  - Can be complicated

---

## Dojo Builds

- npm
  - `npm install --save arcgis-js-api`
- bower
  - `bower install arcgis-js-api@4.4.0`

---

## Dojo Builds

- `build.profile.js`

```js
var profile = {
  ...
    layers: {
    "dojo/dojo": {
      boot: true,
      customBase: true,
      include: [
        "app/main",
        ...
      ]
    },
    "esri/views/2d/layers/VectorTileLayerView2D": {
      ...
    },
    "esri/core/workers/WorkerConnection": {
      ...
    },
    "esri/views/vectorTiles/WorkerTileHandler": {
      ...
  },
  ...
};
```

---

## Webpack Builds

- Pros
  - Fast
  - Lots of community support
- Cons
  - Not fully compatible with Dojo loader
  - Built apps require CDN

---

## Webpack Builds

- `webpack.config.js`
- ignore the `esri` and `dojo` modules

```js
module.exports = {
  ...
  externals: [
    function(context, request, callback) {
      if (
        /^dojo/.test(request) ||
        /^dojox/.test(request) ||
        /^dijit/.test(request) ||
        /^esri/.test(request)
      ) {
        return callback(null, "amd " + request);
      }
      callback();
    }
  ]
};
```

---

<!-- .slide: class="section" -->

## 3rd Party JS Frameworks
## Module loaders
- Open-source helper libraries and wrappers
- Small internal + large external community effort
- Not officially supported by Esri Tech Support

---

## 3rd Party JS Frameworks
## Module loaders
- [esri-loader](https://github.com/Esri/esri-loader)
- [angular-esri-loader](https://github.com/tomwayson/angular-esri-loader)
- [esri-loader-react](https://github.com/davetimmins/esri-loader-react)
- [ember-esri-loader](https://github.com/Esri/ember-esri-loader)
- [ember-cli-amd](https://github.com/Esri/ember-cli-amd)

---

## 3rd Party JS Frameworks
## Module loaders
```js
  ngOnInit() {
    // only load the ArcGIS API for JavaScript when this component is loaded
    return this.esriLoader.load({
      // use a specific version of the API instead of the latest
      url: 'https://js.arcgis.com/4.4/'
    }).then(() => {
      // load the map class needed to create a new map
      this.esriLoader.loadModules(['esri/map']).then(([Map]) => {
        // create the map at the DOM element in this component
        this.map = new Map(this.mapEl.nativeElement, {
          center: [-118, 34.5],
          zoom: 8,
          basemap: 'dark-gray'
        });
      });
    });
  }

```

---

## Developer Resources
- [github.com/esri](https://github.com/esri)
   - [JS API Resources](http://esriurl.com/resources)
- [GeoNet Community for Web Developers](https://geonet.esri.com/community/developers/web-developers/arcgis-api-for-javascript)

---


<!-- .slide: class="questions" -->

## Questions?

**Help us to improve** filling out the survey

![Survey](images/survey-slide.png)

## Andy Gup – [@agup](https://twitter.com/agup)
## René Rubalcava – [@odoenet](https://twitter.com/odoenet)

---


<!-- .slide: class="end" -->
