<!-- .slide: data-background="./images/title.png" -->

UC 2018

# ArcGIS API for JavaScript: Best Practices for Building Apps

---

<!-- .slide: data-background="./images/section.png" -->
# Presenters

### Kelly Hutchins – [@kellyhutchins](https://twitter.com/kellyhutchins)
### René Rubalcava – [@odoenet](https://twitter.com/odoenet)

---

# Agenda

- 4x: What do I get?
- 4x  What are my options?
- Working with Widgets
- Getting responsive with Views
- Using Existing Apps + Tools
- Resources

---

<!-- .slide: data-background="./images/section.png" -->

# What do I get with the 4x JSAPI?

- Simplified and consistent API <!-- .element: class="fragment" data-fragment-index="1" -->
- Write apps in ES6 or TypeScript <!-- .element: class="fragment" data-fragment-index="1" -->
- Modern browser support (IE11+) <!-- .element: class="fragment" data-fragment-index="1" -->

---

<!-- .slide: data-background="./images/section.png" -->
# What are my options?

- Needs?
- Resources?
- Time?
- Customizations?

---

## What do you need?

- Charts and operational monitoring
  - Dashboard, Insights (data exploration)
- Mobile and offline
  - Native app

---

## What can you get with the JavaScript API?

- Suite of templates and configurable apps
- Out-of-the-box widgets
- Integration with various frameworks

---

![chart](./images/needs-chart1.jpg)

---

![chart](./images/needs-chart2.jpg)

---

![chart](./images/needs-chart3.jpg)

---

![chart](./images/needs-chart4.jpg)

---

![chart](./images/needs-chart5.jpg)

---

<!-- .slide: data-background="./images/section.png" -->
# Widgets!

- ~20 Widgets out of the box <!-- .element: class="fragment" data-fragment-index="1" -->
- Widgets help make great apps <!-- .element: class="fragment" data-fragment-index="1" -->
- Less code for you to write <!-- .element: class="fragment" data-fragment-index="1" -->
- Designed with responsive apps in mind <!-- .element: class="fragment" data-fragment-index="1" -->
- We'll look at a few key widgets <!-- .element: class="fragment" data-fragment-index="1" -->

---

# Default Widgets

- MapView & SceneView <!-- .element: class="fragment" data-fragment-index="1" -->
  - Popup
  - Attribution
  - Zoom
- SceneView <!-- .element: class="fragment" data-fragment-index="2" -->
  - NavigationToggle
  - Compass

---

# Widgets: SDK

[Widgets in SDK](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Attribution.html)

---

# Widgets: Popup

- Responsive Design
- Size changes depending on size of view
- Can be docked to top, bottom, center and sides
- [Popup Sample](https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=popup-actions)

---

<!-- .slide: data-background="images/demo.png" -->
# Demo

- [Popup Demo](../demos/popup-docking/popup-docking.html)

---

# Widgets: Expand

- Collapsable button/panel <!-- .element: class="fragment" data-fragment-index="1" -->
- Can be used with widgets, dom node, HTML <!-- .element: class="fragment" data-fragment-index="2" -->
- Designed for view component use <!-- .element: class="fragment" data-fragment-index="3" -->

---

# Widgets: Expand Sample

- [Expand Sample](https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=widgets-expand)

```js
const htmlString = "<div style='background:red'>Hello World</div>";

const node = document.createElement("div");
node.innerHTML = "Hello World 2";
node.style.backgroundColor = "blue";

const bgExpand = new Expand({
  view: view,
  //content: htmlString,
  //content: node,
  content: basemapGallery,
  expandIconClass: "esri-icon-basemap"
});
```

---

# View

Useful [view properties](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#properties-summary) for building apps

- height
- width
- heightBreakpoint
- widthBreakpoint
- orientation
- size
- padding
- ui

---

<!-- .slide: data-background="./images/section.png" -->
# View UI

- View has `ui` property
- Can has `components` that can hold...
  - Widget, DOM node, text, html string
- [Default UI](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-ui-DefaultUI.html)

---

# View UI: Components

- Provide easy way to add/position widgets on a view
- [SDK](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-ui-DefaultUI.html#components)

---

<!-- .slide: data-background="images/demo.png" -->
# Demo

- [Components Demo](../demos/view-ui/view-ui-expand.html)
- [UI Positions Demo](../demos/view-ui/view-ui-positions.html)

---

# View: Padding

- View will work off a subsection of the full view
- Useful when UI covers portion of the view
- [SDK](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#padding)

---

<!-- .slide: data-background="images/demo.png" -->
# Demo

- [View Padding Demo](../demos/view-padding/panel-view-padding.html)

---

# View: Sizing

Useful view sizing properties

- height
- width
- heightBreakpoint
- widthBreakpoint
- orientation
- size

---

# View: Breakpoints

- [Breakpoints SDK](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#breakpoints)

---

# View UI: CSS

- Breakpoints also add classes on view

```css
.esri-view esri-view-height-xsmall,
.esri-view-height-less-than-small,
.esri-view-height-less-than-medium,
.esri-view-height-less-than-large,
.esri-view-height-less-than-xlarge,
.esri-view-width-xlarge,
.esri-view-width-greater-than-xsmall,
.esri-view-width-greater-than-small,
.esri-view-width-greater-than-medium,
.esri-view-width-greater-than-large,
.esri-view-orientation-landscape {}
```

---

<!-- .slide: data-background="images/demo.png" -->
# Demo

- [View UI Sizes](../demos/view-sizes/panel-dynamic.html)

---

<!-- .slide: data-background="./images/section.png" -->
# Apps

- Lots of existing apps
- Use as starting point
- Customize
- Code on [Esri Github](https://github.com/esri)

---

# Apps: Configurable AGOL

- [Product Info](http://www.esri.com/software/configurable-apps)
- [Choose an app](http://doc.arcgis.com/en/arcgis-online/create-maps/choose-configurable-app.htm)
- [Configurable Apps Gallery](https://www.arcgis.com/home/gallery.html#c=esri&t=apps&o=modified&f=configurable)

---

# Apps: Boilerplates & Examples

- 3x
  - [Creating App Templates](http://doc.arcgis.com/en/arcgis-online/create-maps/create-app-templates.htm)
  - [Application Boilerplate](https://github.com/Esri/application-boilerplate-3x-js)
- 4x
  - [Application Base](https://github.com/Esri/application-base-js)
  - [Configurable App Examples](https://github.com/Esri/configurable-app-examples-4x-js)

---

<!-- .slide: data-background="./images/section.png" -->
# Web AppBuilder

---

# Apps: Web AppBuilder

- Two Options
  - Online
  - Developer Edition

---

# Apps: Scaffolding app

---
<!-- .slide: data-background="./images/section.png" -->

# Things you should maybe do

## It's up to you

---

## Basemaps

```js
const map = new Map({
  basemap: "topo-vector"
});
```

- Convenience Strings
- Be more explicit in production apps

---
<!-- .slide: data-background="./images/demo.png" -->

## Basemaps

<iframe height='600' scrolling='no' title='VT Basemaps' src='//codepen.io/odoe/embed/preview/rpQOEM/?height=600&theme-id=31222&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/odoe/pen/rpQOEM/'>VT Basemaps</a> by Rene Rubalcava (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

## Zoom or Scale

```js
const view = new MapView({
  container: "viewDiv",
  map: map,
  center: [-116.5, 33.80],
  zoom: 14 // what does that really mean?
});
```

- Zoom = LOD (Level of Details)
- Not all LODs are created equal

---

## Zoom is not Scale

```js
const view = new MapView({
  container: "viewDiv",
  map: map,
  center: [-116.5, 33.80],
  scale: 50000 // I know what that means!
});
```

- Scale is portable
- Scale has meaning
- We still snap to closest LOD/zoom

---

## WebMap is still a Map

```js
const map = new WebMap({
  basemap: { ... },
  layers: [ ... ]
});
```

- Still acts like a regular `Map`
- Has some advantages

---

## WebMap is still a Map

<iframe height='600' scrolling='no' title='Local bookmarks' src='//codepen.io/odoe/embed/preview/QxrEVX/?height=600&theme-id=31222&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/odoe/pen/QxrEVX/'>Local bookmarks</a> by Rene Rubalcava (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

## Sublayer to FeatureLayer

- You can extract a FeatureLayer from MapImageLayer Sublayer
- `sublayer.createFeatureLayer()`
- Can use capabilities not normally available with Sublayer

---

## Sublayer to FeatureLayer

<iframe height='600' scrolling='no' title='createFeatureLayer' src='//codepen.io/odoe/embed/preview/PaxeyO/?height=600&theme-id=31222&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/odoe/pen/PaxeyO/'>createFeatureLayer</a> by Rene Rubalcava (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

## createQuery

- When you can do `layer.createQuery()`
  - `query` object will already have the layers filters and layer definitions
  - more consistent
- Use `new Query()` when you don't want predefined filters to be applied

---

## createQuery

<iframe height='600' scrolling='no' title='createQuery' src='//codepen.io/odoe/embed/preview/rKQqQW/?height=600&theme-id=31222&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/odoe/pen/rKQqQW/'>createQuery</a> by Rene Rubalcava (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

## MapImageLayer

- If you want to modify Sublayers, do it after you load the layer
- Defining them upfront overrides the defaults
  - May not be what you want

---

## MapImageLayer

<iframe height='600' scrolling='no' title='MapImageLayer - Load Sublayers' src='//codepen.io/odoe/embed/preview/WyYBwL/?height=600&theme-id=31222&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/odoe/pen/WyYBwL/'>MapImageLayer - Load Sublayers</a> by Rene Rubalcava (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

## LayerViews

- Renders the Layer
- When is it done though?
  - _hotly debated topic!_
  - When can you actually use it!!
  - Behavior different with optimized FeatureLayer

---

## LayerViews

<iframe height='600' scrolling='no' title='LayerView - Ready' src='//codepen.io/odoe/embed/preview/YvRJgj/?height=600&theme-id=31222&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/odoe/pen/YvRJgj/'>LayerView - Ready</a> by Rene Rubalcava (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

## You can query SceneLayer too

---

## Elevation, query it, go ahead

---

## Architect your app

- TypeScript (widgets)
- Modular
- Tests
- Performance (don't over-optimize)

---

### TypeScript

- [Typings](https://github.com/Esri/jsapi-resources/tree/master/4.x/typescript) `npm install --save @types/arcgis-js-api`
- [Widget Development Guide](https://developers.arcgis.com/javascript/latest/guide/custom-widget/index.html)
- [Implementing Accessor](https://developers.arcgis.com/javascript/latest/guide/implementing-accessor/index.html)

---

### Structure your app

- Keep it modular

```json
src/
  app/
    stores/     <-- manage application state
    styles/     <-- css files
    widgets/    <-- custom widget code
    index.ts    <-- entry point for application
    index.html  <-- Mian HTML page
  tests/        <-- unit and functional tests
```

---

### Take it further

```json
dist/                   <-- compiled and runnable application
src/                    <-- application code
typings/
  extensions.d.ts       <-- any custom typings you need
package.json            <-- package file
tsconfig.json           <-- TypeScript compilation configuration
tslint.json             <-- Linting for your TypeScript code
webpack.config.js       <-- Webpack config for builds
webpack.tests.config.js <-- Webpack config for tests
```

---

### TypeScript Best Practices
- Use `interface` over `type`
- Use provided decorators (Accessor and Widget)

---

### Progressive Web Apps
- _Tough with a mapping library_
- Avoid starting with a white page (application shell)
- Cache all images/css/js (appcache or service worker)
- Offline is sketchy, tricky and all around tough for mapping
- [Learn more](https://developers.google.com/web/fundamentals/getting-started/codelabs/your-first-pwapp/)

---

### Cache

- Service Workers
- AppCache (Internet Explorer)

---

### Take advantage of some modern tooling
- [webpack](https://webpack.js.org/)
- [TypeScript](http://www.typescriptlang.org/)

---

### We can help you

- [`@arcgis/webpack-plugin`](https://github.com/esri/arcgis-webpack-plugin)
  - A webpack plugin that can compile the ArcGIS API for JavaScript into applictions
- [`@arcgis/cli`](https://github.com/Esri/arcgis-js-cli)
  - A useful tool to quickly scaffold applications using the ArcGIS API for JavaScript

---

### Review an app

<iframe height='600' scrolling='no' title='ArcGIS JS API - Demo Appp' src='https://arcgis-template-app.surge.sh/' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 337px;background:white;'>
</iframe>

---

# Lets Recap

- What you get in 4x <!-- .element: class="fragment" data-fragment-index="1" -->
- Options for creating apps <!-- .element: class="fragment" data-fragment-index="2" -->
- Widgets you can use <!-- .element: class="fragment" data-fragment-index="3" -->
- View properties, components, responsiveness <!-- .element: class="fragment" data-fragment-index="4" -->
- Existing apps available to customize <!-- .element: class="fragment" data-fragment-index="5" -->

---

<!-- .slide: data-background="./images/section.png" -->
# Additional Resources

<!-- - Geonet/support/rene/github/sass (Rene) -->
- [Documentation](https://developers.arcgis.com/javascript/latest)
- [4x What's new](https://developers.arcgis.com/javascript/latest/guide/whats-new/index.html)
- [4x FAQ](https://developers.arcgis.com/javascript/latest/guide/faq/index.html)

---

# JSAPI Resources
- TypeScript definition files
- npm demo
- webpack demo
- JSHint

[esriurl.com/resources](http://esriurl.com/resources)

---

# Geonet
[![Geonet](./images/geonet.png)](https://geonet.esri.com/community/developers/web-developers/arcgis-api-for-javascript)


---

# Blogs
- [ArcGIS Blog](https://blogs.esri.com/esri/arcgis/tag/javascript/)
- [odoe.net](http://odoe.net/blog/)

---

# Related Sessions

TBD

---

<!-- .slide: data-background="images/survey.png" -->

---

# Questions?

![questions](./images/questions.gif)

---

# Thank you!

---

<!-- .slide: data-background="images/end.png" -->
