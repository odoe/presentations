<!-- .slide: class="title" -->

## Choosing the Best JavaScript Framework

Andy Gup & René Rubalcava

@agup

@odoenet

---

<!-- .slide: class="sponsor" -->

---

<!-- .slide: class="section" -->

# Options

---

## Options available to you

 - [Templates](http://www.esri.com/software/arcgis-web-app-templates)
 - [Configurable Apps](http://www.arcgis.com/home/gallery.html#c=esri&t=apps&o=modified&f=configurable)
 - [Apps](http://www.esri.com/software/apps/)
 - Builders
  - [App Studio](http://appstudio.arcgis.com/)
  - [Web AppBuilders](http://www.esri.com/software/web-appbuilder)

---

## Templates

 - Easy to use
 - Configurable
 - Integrates with Portal

---

## Apps

 - Prebuilt with specific purpose ([Collector](http://www.esri.com/software/arcgis/collector-for-arcgis), [Navigator](http://www.esri.com/landing-pages/navigator))
 - Some provide extensibility ([Ops Dashboard](http://www.esri.com/software/arcgis/operations-dashboard-for-arcgis))

---

## Web AppBuilder

 - Can be thought of as its own framework
 - **jimu** - *the Lego framework*

---

## ArcGIS JS API Widget Framework

  - [Custom Widget Development](https://developers.arcgis.com/javascript/latest/guide/custom-widget/index.html)
  - Based on [MaquetteJS](http://maquettejs.org/)
  - TypeScript
  - JSX

---

## Why use a framework?
 - Simplify workflow
 - All teams on same page

---

## Challenges
- JSAPI AMD Loader
- Most issues with loader plugins
- _We have solutions for most tooling!_

```js
define([
  "dojo/has!webgl?esri/package1:esri/package2"
], function(myDrawingPackage) {...});
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
- [esri-angular-cli-example](https://github.com/tomwayson/esri-angular-cli-example)
- [esri-loader-react](https://github.com/davetimmins/esri-loader-react)
- [ember-esri-loader](https://github.com/Esri/ember-esri-loader)
- [ember-cli-amd](https://github.com/Esri/ember-cli-amd)

---

## 3rd Party JS Frameworks
## Module loaders
```js
// only load the ArcGIS API for JavaScript when this component is loaded
this.esriLoader.load({
  // use a specific version of the API instead of the latest
  url: 'https://js.arcgis.com/4.5/'
}).then(() => {
  // load the map class needed to create a new map
  this.esriLoader.loadModules(['esri/Map']).then(([EsriMap]) => {
    // create the map at the DOM element in this component
    this.map = new EsriMap({
      basemap: 'dark-gray'
    });
  });
});

```

---

## [angular-esri-loader](https://github.com/tomwayson/angular-esri-loader) (Angular 4 or 5)

```js

npm install angular-esri-loader

```


---

<!-- .slide: class="section" -->

## Demos

---

## More Stuff

---

## Community Contributions (Thank YOU!)

* angular-esri-components by @TheKeithStewart
* esri-webpack-typescript by @lobsteropteryx

@davetimmins, @ScottONeal, @willisd2, @trkbrkr2000, @Robert-W, @gund, @oppoudel and others!


---

<!-- .slide: class="questions" -->

## Questions?

**Help us to improve** filling out the survey

![Survey](images/survey-slide.png)

Andy Gup ([@agup](https://twitter.com/agup))

Rene Rubalcava ([@odoenet](https://twitter.com/odoenet))

Slides: [github.com/odoe/presentations/2017-European-DevSummit/choosing-best-js-framework/](github.com/odoe/presentations/2017-European-DevSummit/choosing-best-js-framework)

---


<!-- .slide: class="end" -->
