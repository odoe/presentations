<!-- .slide: class="title" -->

## Using Frameworks with the ArcGIS API for JavaScript

Tom Wayson
René Rubalcava

---

<img src="images/esri.png" class="transparent" height="180" />
<img src="images/Heart_corazon.svg" class="transparent" height="180" />
<img src="images/angular2.png" class="transparent" height="180" />
<img src="images/tomster-sm.png" class="transparent" height="180" />
<img src="images/react.png" class="transparent" height="180" />
<img src="images/vue-logo.png" class="transparent" height="180" />

Note:
integration story is better than ever

---

## Just getting started?

See the [Using Frameworks](https://developers.arcgis.com/javascript/latest/guide/using-frameworks/index.html) guide page

Note:
Links out to tons of resources

---

## ArcGIS API as application framework

<img src="images/all-about-the-map.svg" height="240">

"Map centric" approach

---

## ArcGIS API as map library

<img src="images/search-app.svg" class="transparent" height="240" />
<img src="images/icons8-right.png" class="transparent" />
<img src="images/details-page.svg" class="transparent" height="240" />

"Framework first" approach

---

<!-- .slide: data-transition="none" -->

<div style="width: 659px; margin: 0 auto; font-size: .8em">
  <div style="display: flex; justify-content: space-between">
    <div>JSAPI as framework</div>
    <div>JSAPI as library</div>
  </div>
  <div class="center-row"><img src="images/jsapi-and-frameworks.png"></div>
  <div style="display: flex; justify-content: space-between">
    <div>Map centric</div>
    <div> vs </div>
    <div>Framework first</div>
  </div>
</div>


---

<!-- .slide: data-transition="none" -->

<div style="width: 659px; margin: 0 auto; font-size: .8em">
  <div style="display: flex; justify-content: space-between">
    <div>Esri samples</div>
    <div>boilerplates</div>
    <div>framework CLIs</div>
  </div>
  <div class="center-row"><img src="images/jsapi-and-frameworks-w-lines.png"></div>
  <div style="display: flex; justify-content: space-between">
    <div>Dojo Only</div>
    <div>Dojo loads bundle</div>
    <div>esri-loader</div>
  </div>
</div>


---

<!-- .slide: data-transition="none" -->

<code style="font-size: 1.5em">import Map from 'esri-map';</code>

---

<!-- .slide: data-transition="none" -->

<del><code style="font-size: 1.5em">import Map from 'esri-map';</code></del>

---

## _The_ Issue
Other module loaders can **not** load Dojo AMD modules (problem is plugins)

```js
define([
  "dojo/has!webgl?esri/package1:esri/package2"
], function(myDrawingPackage) {...});
```

<p class="fragment">_We has solutions for your app!_</p>

---

## Solution 1: Only use Dojo loader

See [Esri samples](https://developers.arcgis.com/javascript/latest/sample-code/widgets-frameworks-react/index.html?search=frameworks)

```js
window.dojoConfig = {
  async: true,
  packages: [{
    name: "react",
    location: "https://fb.me/",
    main: "react-0.14.7.min"
  },{
    name: "react-dom",
    location: "https://fb.me/",
    main: "react-dom-0.14.7.min"
  }]
};
```

Note:
Configure Dojo to load framework (UMD) modules

---

## Solution 1: Only use Dojo loader

```js
require([
  "react",
  "react-dom",
  "esri/Map",
  "esri/views/MapView"
], function(React, ReactDOM, Map, MapView) { ... })
```

Note:
`require()` those modules as needed

---

## Solution 1: Only use Dojo loader
Good when:
<ul>
<li class="fragment">map centric app
<li class="fragment">just want components (no router, etc)
<li class="fragment">dev team is familiar w/ Dojo
</ul>

---

## Solution 1: Only use Dojo loader
Not so good when:
<ul>
<li class="fragment">map is buried 3+ clicks deep
<li class="fragment">want benefits from framework opinions and tooling
<ul>

Will **not** work with Angular / Ember

---

## Solution 2: Dojo loads application bundle

```js
externals: /^esri/,
output: {
  libraryTarget: 'amd'
}
```

Note:
Configure webpack (or rollup, etc) to skip 'esri' modules & output AMD

---

## Solution 2: Dojo loads application bundle

```html
<script src="https://js.arcgis.com/4.6/"></script>
<script>
  require(['scripts/app.bundle.js'], function (app) {
    app.start();
  });
</script>
```

Note:
Then load your app using the ArcGIS API

---

## Solution 2: Dojo loads application bundle
Good when:
<ul>
<li class="fragment">map centric app
<li class="fragment">want more from framework (router, redux, etc)
<li class="fragment">dev team is familiar w/ framework
</ul>

---

## Solution 2: Dojo loads application bundle
Not so good when:
<ul>
<li class="fragment">map is buried 3+ clicks deep
<li class="fragment">using a CLI or "no config" loader
<li class="fragment">primarily targeting mobile
</ul>

<p class="fragment">Will **not** work when you need SSR</p>

---

## Solution 3: [esri-loader](https://github.com/Esri/esri-loader)

`npm install --save esri-loader` or
<br>`yarn add esri-loader`

A tiny library you can install

---

## Solution 3: [esri-loader](https://github.com/Esri/esri-loader)

```js
import { loadModules } from 'esri-loader'

loadModules([
  'esri/views/MapView',
  'esri/WebMap'
]).then(([MapView, WebMap]) => {
  // use MapView and WebMap as normal
})
```

Note:
should look familiar to those coming from Dojo

---

## Solution 3: [esri-loader](https://github.com/Esri/esri-loader)

```js
define([require], function (require) {
  require(['esri/views/MapView', 'esri/WebMap'],
  function (MapView, WebMap) {
    // ... the rest of the code is the same
  });
});
```

~= a nested `require()` call, _but_ also <span class="fragment"><br>_lazy loads the ArcGIS API_

---

## Solution 3: [esri-loader](https://github.com/Esri/esri-loader)
Good when:
<ul>
<li class="fragment">map is buried 3+ clicks deep
<li class="fragment">using a CLI or "no config" loader
<li class="fragment">primarily targeting mobile
<li class="fragment">concerned about SEO
</ul>

<p class="fragment">**Only** way to server-side render your application</p>

---

## Solution 3: [esri-loader](https://github.com/Esri/esri-loader)
Not so good when:
<ul>
<li class="fragment">map centric app
<li class="fragment">want "future proof" code
</ul>

Note:
esri-loader makes working with framework easier, but working with ArcGIS API will be harder

---

<!-- .slide: class="visible-links" -->

<h2><img class="inline" src="images/tomster-sm.png" height="100">  More on Ember</h2>

[Audacious Enterprise GIS Apps with EmberJs ](https://devsummit2018.schedule.esri.com/schedule/477474013)

Thu 4:00 pm - 5:00 pm
Catalina/Madera

[@Esri/jsapi-resources/frameworks/ember](https://github.com/Esri/jsapi-resources/tree/master/frameworks/ember)

---

<!-- .slide: class="visible-links" -->

<h2><img class="inline" src="images/angular2.png" height="100">  More on Angular</h2>

[Kick Starter: Rapid Application Development using Angular CLI
](https://devsummit2018.schedule.esri.com/schedule/433914485)

Friday, March 09 8:30 am - 9:30am Pasadena/Sierra/Ventura

[@Esri/jsapi-resources/frameworks/angular](https://github.com/Esri/jsapi-resources/tree/master/frameworks/angular)

---

## Demo: [esri-preact-pwa](https://github.com/tomwayson/esri-preact-pwa)

<img src="images/search-phone.svg" height="120" />
<img src="images/icons8-right.png" />
<img src="images/map-phone.svg" height="120" />

Lazy loading the ArcGIS API for best possible load times on mobile

---

## Demo: [esri-loader-react-starter-kit](https://github.com/tomwayson/esri-loader-react-starter-kit)

<img src="images/icons8-download_from_cloud.png" height="120" />
<img src="images/icons8-html_filetype.png" height="120" />
<img src="images/search-phone.svg" height="120" />

Using the ArcGIS API in a server-side rendered app

---

<!-- .slide: class="visible-links" -->

## Demo: [esri-hyperapp-example](https://github.com/jwasilgeo/esri-hyperapp-example)

<img src="images/icons8-for_experienced.png" />

Using the ArcGIS API with "no config" loaders like [Parcel](https://parceljs.org/)
