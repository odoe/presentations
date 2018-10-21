<!-- .slide: class="title" -->

## ArcGIS API for JavaScript
## Creating Custom Layers and Layer Views

Raluca Nicola & René Rubalcava

---

<!-- .slide: class="sponsor" -->

---

<!-- .slide: class="agenda" -->

## Agenda

- Introduction to Layers in 4.x
- Building a custom dynamic layer
- Building a custom tile layer
- Layer loading and attribution
- Custom LayerViews

---

<!-- .slide: class="section" -->

# Introduction to Layers

---

## Introduction to Layers

- They don’t have a visual representation, they are a data access
- Create a custom layer
  - To connect to a service not supported (or not yet) by the API
  - To work on the data client-side before it’s being displayed
  - To mash up multiple services to create new visualizations
- We will cover:
  - Dynamic layer
  - Tile
- New layer classes designed for extensibility

---

<!-- .slide: class="section" -->

# Custom Dynamic Layers

---

## Dynamic Layer

- Displays an image that covers the view. At the end of a user interaction, a new image is requested.
  - 1 export in MapView
  - 2 exports in SceneView
- Pro: One export on the service
- Con: Export is different each time, so cannot be cached

- API reference https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-BaseDynamicLayer.html

---

## Dynamic Layer: Extensibility hooks

- BaseDynamicLayer.getImageUrl
  - Easiest method that creates a url for a extent and size
- BaseDynamicLayer.fetchImage
  - Method that do the actual image fetching
  - To extend if you need to transform data.
  - Default implementation fetch the image at the URL returned by getImageUrl

---

## Custom Dynamic Layer - Consume WMS Service

<iframe height='600' scrolling='no' title='Custom DynamicLayer' src='//codepen.io/odoe/embed/preview/bmYLBy/?height=600&theme-id=31222&default-tab=js,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/odoe/pen/bmYLBy/'>Custom DynamicLayer</a> by Rene Rubalcava (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

<!-- .slide: class="section" -->

# Custom Tile Layers

---

## Tile Layer

- Displays adjacent images stitched together to covers the view.
- New tiles are requested as the user interacts with the view
- Pros:
  - Efficient as tiles are cacheable resources on the server and web browser
  - Tiles appears as you pan and zoom
- Con:
  - a tile resource has to be less dynamic to have an efficient layer

---

## TileLayer: Extensibility Hooks

- BaseTileLayer.getTileUrl
  - Easiest method that creates a url for a tile id: level / row / col
- BaseTileLayer.fetchTile
  - Method that do the actual tile fetching
  - To extend if you need to transform data.
  - Default implementation fetch the image at the URL returned by getTileUrl

- API Reference https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-BaseTileLayer.html

---

## Custom Tile Layer - getTileUrl

<iframe height='600' scrolling='no' title='Custom TileLayer' src='//codepen.io/odoe/embed/preview/BqmYZE/?height=600&theme-id=31222&default-tab=js,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/odoe/pen/BqmYZE/'>Custom TileLayer</a> by Rene Rubalcava (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

<!-- .slide: class="section" -->

# Loading and Integration

---

## Loading and Integration

- Layers are loadable resources
  - Loadable Guide https://developers.arcgis.com/javascript/latest/guide/loadable/index.html
- Layers need to load information before being displayed
  - Test if the service exists and validity
  - Properties of the layer?
    - Extent
    - Title
    - Attribution

---

## Loading and Integration: BlendLayer - service mashup

<iframe height='600' scrolling='no' title='Custom BlendLayer' src='//codepen.io/odoe/embed/preview/XxzZZR/?height=600&theme-id=31222&default-tab=js,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/odoe/pen/XxzZZR/'>Custom BlendLayer</a> by Rene Rubalcava (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

## Loading and Integration: Brick Layers

<iframe height='600' scrolling='no' title='BrickLayer' src='https://odoe.github.io/brick-layer/' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>
</iframe>

---

<!-- .slide: class="section" -->

# Custom LayerViews

---

## Custom LayerViews

- LayerViews are responsible to call the layers’ APIs to get data and redraw
- Provide a Canvas2D API to draw anything you want.

---

## BaseLayerView2D

```js
var TileBorderLayerView2D = BaseLayerView2D.createSubclass({
   render(renderParameters) {
     var state = renderParameters.state;
     var context = renderParameters.context;
     var stationary = renderParamers.stationary;

     context.save();

     // apply rotation
     if (!state.rotation !== 0) {
       // calculate rotation
     }

     for (const tile of this.tiles) {
       // do something
     }

     context.restore();
   }
 });
```

---

## Methods to implement

- `render()` - need to define how and what the layer view is going to draw
- `attach()` - typically define any watchers here
- `hitTest()` - define what is returned in a hitTest
    - useful for interaction

---

## Custom LayerViews

<iframe height='600' scrolling='no' title='Canvas-Flowmap-Layer' src='https://sarahbellum.github.io/Canvas-Flowmap-Layer/demos-jsapi-4/main/' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>
</iframe>

---

<!-- .slide: class="questions" -->

## Questions?

![Survey](images/survey-slide.png)

Raluca Nicola(mdriscoll@esri.com) ([@nicolaraluk](https://twitter.com/nicolaraluk))

Rene Rubalcava (rrubalcava@esri.com ) ([@odoenet](https://twitter.com/odoenet))

---


<!-- .slide: class="end" -->