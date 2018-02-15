<!-- .slide: class="title" -->

## Using Frameworks with the ArcGIS API for JavaScript

Tom Wayson
René Rubalcava

---

<!-- .slide: class="agenda" -->

## Agenda

- Options
- Angular
- Ember
- React
- VueJS
- Elm

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

## Angular

![Angular](images/angular2.png)

---

## Features

- Directives are Web Components
- Dependency Injection
- *RxJS*
- Uses [_SystemJS_](https://github.com/systemjs/systemjs)
- _TypeScript_

---

## esri-system-js

```js
    esriSystem.register(
    // array of Esri module names to load and then register with SystemJS
    [
        'esri/Map',
        'esri/views/SceneView',
        'esri/layers/FeatureLayer'
    ],
    // optional callback function
    function() {
        // then bootstrap application
        System.import('app/main')
        .then(null, console.error.bind(console));
    });
```

- [github](https://github.com/Esri/esri-system-js)

---

## Component

```ts
import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    styles: [`
        section {
            width: 100%;
            margin: 0 auto;
            padding: 4em 0 0 0;
        }
        `],
    template: `
        <main>
            <section>
                <esri-scene-view></esri-scene-view>
            </section>
        </main>
        `
})
export class AppComponent { }
```

---

## Injectable

```ts
import { Injectable } from "@angular/core";

import EsriMap from "esri/Map";

@Injectable()
export class SimpleMapService {
    map: EsriMap;
    constructor() {
        this.map = new EsriMap({
            basemap: "satellite",
            ground: "world-elevation"
        });
    }
}
```

---

## Dependency Injection

```ts
import { Component, ElementRef, Input, Output, EventEmitter } from "@angular/core";
import SceneView from "esri/views/SceneView";
import { SimpleMapService } from "./map.services";

@Component({
    selector: "esri-scene-view",
    template: `<div id="viewDiv" style="height:600px"><ng-content></ng-content></div>`,
    providers: [SimpleMapService]
})
export class EsriSceneViewComponent {
    @Output() viewCreated = new EventEmitter();

    view: any = null;

    constructor(
        private _mapService: SimpleMapService,
        private elRef: ElementRef
    ) {}

    ngOnInit() {
        this.view = new SceneView({
            container: this.elRef.nativeElement.firstChild,
            map: this._mapService.map,
            camera: {...}
        })
    }
}
```

---

## Angular

- Lots of iterations since announced
- Stabilizing

---

<!-- .slide: class="section" -->

## Ember
![Ember](images/ember.png)

---

## Features

- The Ember Way
 - *Ember way or get out the way!*
- Focus on Web Components
- [ember-cli](http://ember-cli.com/)
 - Robust add-on system
 - Great for teams!

---

## We use it!

- Operations Dashboard
- Open Data
- Workforce Web App

---

## Challenges

- Uses it's own synchronous *AMD-like* loader
- Doesn't like RequireJS or Dojo loaders

---

## Solutions!

- So we wrote an addon to help with that
- [ember-cli-amd](https://github.com/esri/ember-cli-amd)

---

## Configure

### `ember install ember-cli-amd`

```javascript
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    amd :{
      loader: 'https://js.arcgis.com/4.3/',
      packages: [
        'esri','dojo','dojox','dijit',
        'moment', 'dgrid', 'dstore'
      ]
    }
  });
  return app.toTree();
};
```

---

## Map as a Service

```js
import Ember from 'ember';
import EsriMap from 'esri/Map';

export default Ember.Service.extend({
  map: null,

  loadMap() {
    let map = this.get('map');
    if (map) {
      return map;
    }
    else {
      map = new EsriMap({
        basemap: 'hybrid',
        ground: 'world-elevation'
      });
      this.set('map', map);
      return map;
    }
  }
});

```

---

## Component

```js
import Ember from 'ember';
import SceneView from 'esri/views/SceneView';

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

  createMap: function() {
    let map = this.get('map');
    let view = new SceneView({
      map,
      container: this.elementId,
      center: [-101.17, 21.78],
      zoom: 10
    });
    view.then(x => this.set('view', x));
  }.observes('map')

});

```

---

## Add Component

```js
{{esri-map}}
```

_Magic_

---

## Ember

- Large community
- Flexible ecosystem
  - Lots of [addons!](https://www.emberaddons.com/)

---

<!-- .slide: class="section" -->

## React
![React](images/react.png)

---

## Features

- Technically, _not a framework_
- Reusable, composable components
- JSX - declarative

---

## Components

```tsx
class Recenter extends React.Component<Props, State> {
  state = { x: 0, y: 0, interacting: false };
  ...
  render() {
    let style: Style = {
      textShadow: this.state.interacting ? '-1px 0 red, 0 1px red, 1px 0 red, 0 -1px red' : ''
    };
    let { x, y } = this.state;
    return (
      <div className='recenter-tool'  style={style} onClick={this.defaultCenter}>
        <p>x: {Number(x).toFixed(3)}</p>
        <p>y: {Number(y).toFixed(3)}</p>
      </div>
    );
  }
}
```

---

## Compose

```tsx
view.then(() => {
  ReactDOM.render(
    <div>
      <Recenter view={view} initialCenter={[-100.33, 25.69]} />
    </div>,
    document.getElementById('appDiv')
  );
}, (err: Error) => {
  console.warn('Error: ', err);
});
```

---

## State Management for React

- [Redux](http://redux.js.org/)
- [MobX](https://mobx.js.org/)
- [Create React App](https://github.com/facebookincubator/create-react-app) - React cli

---

## Can use esri-loader

```js
createMap() {
  dojoRequire(['esri/Map', 'esri/views/MapView'], (Map, MapView) => { 
    new MapView({
      container: this.refs.mapView,
      map: new Map({basemap: 'topo'})
    })
  });
}
componentWillMount() {
  if (!isLoaded()) {
    bootstrap((err) => {
      if (err) { console.error(err) }
      this.createMap();
    }, {
      url: 'https://js.arcgis.com/4.3/'
    });
  } else {
    this.createMap();
  }
}
```

---

## React

- Very popular, large community
- Has one job
- Variety of ways it can be used

---

<!-- .slide: class="section" -->

## VueJS
![VueJS](images/vue-logo.png)

---

## Features

- Not a framework, but so so nice
- Build components
- Simple
- _Small_ (under 20kb)

---

## Easy to integrate

```js
Vue.component("camera-info", {
  props: ["camera"],
  template: "<div>" +
            "<h2>Camera Details</h2>" +
            "<p><strong>Heading</strong>: {{ camera.heading.toFixed(3) }}</p>" +
            "<p><strong>Tilt</strong>: {{ camera.tilt.toFixed(3) }}</p>" +
            "<p><strong>Latitude</strong>: {{ camera.position.latitude.toFixed(2) }}</p>" +
            "<p><strong>Longitude</strong>: {{ camera.position.longitude.toFixed(2) }}</p>" +
            "</div>"
});
view.then(function() {
  var info = new Vue({
    el: "#info",
    data: { camera: view.camera }
  });
  view.ui.add(info.$el, "top-right");
  view.watch("camera", function() {
    info.camera = view.camera;
  });
});
```

---

## Has a cli!

- Uses templates!

```js
<template>
    ...
    <div id="viewDiv"></div>
    ...
</template>
```

---

## Can use esri-loader

```js
import * as esriLoader from 'esri-loader'
export default {
  ...
  mounted () {
    const createMap = () => {
      esriLoader.dojoRequire([
        'esri/Map',
        'esri/views/SceneView',
        'esri/core/watchUtils'
      ], (EsriMap, SceneView, watchUtils) => {
        ...
        return view
      })
    }
    ...
  },
  ...
}
```

[vue-cli demo](https://github.com/odoe/vue-jsapi4)

---

<!-- .slide: class="section" -->

## Elm
![Elm](images/elm-lang.png)

---

## Features

- Purely Functional Language
- Also a Framework
- _Crazy right_
- Statically typed
  - describe the shape of your value

---

## Elm Architecture

- Model — the state of your application
- Update — a way to update your state
- View — a way to view your state as HTML

---

## Model

```elm
type alias Model =
    { items : List Card
    }


type alias Card =
    { id : String
    , title : String
    , thumbnailUrl : Maybe String
    , itemUrl : String
    , snippet : Maybe String
    , selected : Bool
    }
```

---

## Update

```elm
type Msg
    = Select String
    | UpdateSave String Int
    | Change Model

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Change newItems ->
            ( newItems, Cmd.none )

        UpdateSave itemid rating ->
            model
                ! []
                |> andThen update (Select itemid)
        ...
```

---

## Update

```elm
Select itemid ->
    let
        selected t =
            if t.id == itemid then
                { t | selected = True }
            else
                { t | selected = False }

        findCard itemid =
            let
                valid val =
                    case val of
                        Nothing ->
                            sampleCard

                        Just val ->
                            val

                card =
                    model.items
                        |> List.filter (\x -> x.id == itemid)
                        |> List.head
            in
                valid card
    in
        ( { model
            | items = List.map selected model.items
          }
        , Cmd.none
        )
```

---

## View

```elm
viewCard : Card -> Html Msg
viewCard card =
    ...
        div [ class cardStyle ]
            [ figure [ class "card-image-wrap" ]
                [ img
                    [ class "card-image"
                    , card.thumbnailUrl
                        |> showVal
                        |> src
                    ]
                    []
                , div [ class "card-image-caption" ]
                    [ text card.title
                    ]
                ]
            , div [ class "card-content" ]
                [ card.snippet
                    |> showVal
                    |> text
                , div
                    [ class "btn btn-fill leader-1"
                    , onClick (Select card.id)
                    ]
                    [ text "Edit" ]
                ]
            ]
```

---

<!-- .slide: class="section" -->

# Looking forward

---

## Dojo 2
  - multiple packages
  - [dojo/core still Beta](https://github.com/dojo/meta)
  - will have `dojo-cli`

---

## TypeScript
  - 2.2 introduced [mixins](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Mix-ins) and `object` type
  - Future updates

---

## Notable Mentions

- [Riot](http://riotjs.com/)
- [Mithril](http://mithril.js.org/) - _hyperscript_
- [Cycle](https://cycle.js.org/)

---

<!-- .slide: class="questions" -->

## Questions?

**Help us to improve** filling out the survey

![Survey](images/survey-slide.png)

Rene Rubalcava ([@odoenet](https://twitter.com/odoenet))

Slides: [github.com/odoe/presentations/2017-devsummit-ps-using-frameworks/](github.com/odoe/presentations/2017-devsummit-ps-using-frameworks)

---


<!-- .slide: class="end" -->
