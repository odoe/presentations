<!-- .slide: class="title" -->

##Using Frameworks with the
##ArcGIS API for JavaScript
Rene Rubalcava

@odoenet

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

## You need more?
### Or do you *want* more?

---

## Dojo can do the job
![Dojo](images/dojo-toolkit-logo.png)

---

## Dojo already did that
<iframe width="560" height="315" src="https://www.youtube.com/embed/BY0-AI1Sxy0" frameborder="0" allowfullscreen></iframe>

---

## Framework Madness
![Embrace your frameworks](images/frameworks.png)

---

## What problems do they solve?
 - Common theme is [Web Components](http://webcomponents.org/)
  - Web Components are not standardized *yet*
 - Some data binding mechanism

---

## What makes 4.0 easier to use?
- Accessors
- View Models (*crème de la crème*)
- Maps and Views (`SceneView`, `MapView`)

---

## React
![React](images/react.png)

---

## React
- Not a framework
- Reusable, composable components
- JSX - declarative

---

```javascript
const view = new MapView({
  container: document.getElementById('viewDiv'),
  map,
  center: [-100.33, 25.69],
  zoom: 10,
  ui: { components: [] } // empty the UI
});
// Render the React Components
ReactDOM.render(
  <div>
    <Zoom view={view}/>
    <Attribution view={view}/>
    <BasemapToggle view={view} secondaryBasemap={'dark-gray'}/>
  </div>,
  document.getElementById('appDiv')
);
```

---

## React
- [Demo](https://github.com/odoe/esrijs4-vm-react)

---

## Angular 2
![Angular2](images/angular2.png)

---

## Angular 2
- Directives are Web Components
- Dependency Injection
- *RxJS 5*

---

```typescript
import { Component } from 'angular2/core';
import { MapComponent } from './map.component';
import { HomeComponent } from './home.component';
@Component({
  directives: [MapComponent, HomeComponent],
    selector: 'my-app',
    template:
    `
    <div>
    <esri-map #mapView (viewCreated)="homeButton.setView(mapView.view)">
      <esri-home #homeButton></esri-home>
    </esri-map>
    </div>
    `
})
export class AppComponent { }
```

---

## Angular 2
- Some challenges
- Uses [SystemJS Module Loader](https://github.com/systemjs/systemjs)

---

## Well that's not going to work for us

```javascript
System.import('./local-module.js');

System.import('https://code.jquery.com/jquery.js');
```

---

## Angular 2
- Don't fight the loader, work around it

---

## Angular 2

```typescript
function register(name: string, mods: any[]) {
  System.register(name, [], exp => {
    return {
      setters: [],
      execute: () => {
        mods.map((mod: any, idx: number) => {
          exp(moduleName(deps[idx]), mod);
        });
      }
    }
  });
}
require(['esri/Map', 'esri/views/MapView'], function(...modules) {
  register('esri-mods', modules);
  System.import('app/boot');
});
```

---

## Packaged it up for you
- [esri-system-js](https://github.com/Esri/esri-system-js)

---

## Angular 2
![yay](images/yays.gif)

---

## Angular 2
- [Demo](https://github.com/odoe/esrijs4-vm-angular2)

---

## Ember
![Ember](images/ember.png)

---

## Ember
- The Ember Way
 - *Ember way or get out the way!*
- Focus on Web Components
- [ember-cli](http://ember-cli.com/)
 - Robust add-on system

---

## Ember
- Also had some challenges
- Uses it's own synchronous *AMD-like* loader
- Doesn't like RequireJS or Dojo loaders

---

## Ember
- So we wrote an addon to help with that
- [ember-cli-amd](https://github.com/esri/ember-cli-amd)

---

## Ember
### `ember install ember-cli-amd`

```javascript
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    amd :{
      loader: 'https://js.arcgis.com/4.0beta3/',
      configPath: 'config/dojo-config.js',
      packages: [
        'esri','dojo','dojox','dijit',
        'put-selector','xstyle','dgrid'
      ]
    }
  });
  return app.toTree();
};
```

---

## Ember
- Map as a service

```javascript
// app/services/map.js
export default Ember.Service.extend({
  map: null,
  loadMap() {
    let map = this.get('map');
    if (map) return map;
    let graphicsLayer = new GraphicsLayer({ id: 'graphics' });
    let tileLayer = new VectorTileLayer({
      url: "https://www.arcgis.com/sharing/rest/content/items/f96366254a564adda1dc468b447ed956/resources/styles/root.json"
    });
    map = new Map({ layers: [tileLayer, graphicsLayer] }); // no display
    this.set('map', map);
    return map;
    }
  }
});
```

---

## Ember
- Map component

```javascript
//app/components/esri-map.js
export default Ember.Component.extend({
  classNames: ['viewDiv'],
  mapService: Ember.inject.service('map'),
  didInsertElement() {
    let map = this.get('map');
    if (!map) {
      map = this.get('mapService').loadMap();
      this.set('map', map);
    }
  },
  createView: function() {
    let map = this.get('map');
    let view = new MapView({
      map,
      container: this.elementId,
      center: [-100.33, 25.69],
      zoom: 10
    });
    view.then(x => this.set('view', x));
  }.observes('map') // similar to Accessor.watch
});
```

---

## Ember
- Using a ViewModel

```javascript
// app/components/esri-home.js
import Ember from 'ember';
import HomeVM from 'esri/widgets/Home/HomeViewModel';
export default Ember.Component.extend({
  classNames: ['home', 'action'],
  vm: null,
  createHome: function() {
    let view = this.get('view');
    let vm = new HomeVM({ view });
    this.set('vm', vm);
  }.observes('view'), // similar to Accessor.watch
  actions: {
    enable() {
      this.get('vm').goHome();
    }
  }
});
```

---

## Ember
- Compose your components

```hbs
//app/templates/index.hbs
{{esri-map view=view}}
{{esri-locate view=view}}
{{esri-home view=view}}
```

---

## Ember
- [Demo](https://github.com/odoe/esrijs4-vm-ember)

---

## Conclusion
 - 4.0 Enhancements make integration easier
 - Pick a framework and dig in
 - Learn your tools

---

## Resources

- https://github.com/odoe/esrijs-resources

---

<!-- .slide: class="questions centered" -->

## Questions
Rene Rubalcava

@odoenet

*Please fill ou the survey!*

---

<!-- .slide: class="end" -->
#