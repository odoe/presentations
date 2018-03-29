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

---

## React

<!-- .slide: class="section" -->

- Populat UI Library (not really a framework)
- Large community
- Very flexible (`setState()`, MobX, Redux, Flux)

---

## React

```ts

export class WebMapView extends React.Component<WebMapViewProps, {}>{
  mapDiv: HTMLDivElement;

  componentDidMount() {
    const view = new MapView({
      map: this.props.webmap,
      container: this.mapDiv
    });
    this.props.onload(view);
  }

  render() {
    return (
      <div className="webmap" ref={(element: HTMLDivElement) => this.mapDiv = element}>
      </div>
    );
  }
}
```

---

## React

```ts
const webmap = new WebMap({
  portalItem: {
    id: "3ff64504498c4e9581a7a754412b6a9e"
  },
  layers: [featureLayer]
});

ReactDOM.render(
  <div className="main">
    <Header appName="Webpack App"/>
    <WebMapView webmap={webmap} onload={onComponentLoad} />
  </div>,
  document.querySelector("#app")
);
```

---

<!-- .slide: class="section" -->

## Hyperapp

- minimal framework
- tiny (1KB)
- Inspired by [Elm](http://elm-lang.org/)
- _State -> Actions -> View_

---

## Hyperapp

- State

```ts
export const state: State = {
  webmap: new EsriMap({
    basemap: {
      portalItem: {
        id: "4f2e99ba65e34bb8af49733d9778fb8e"
      }
    },
    ground: "world-elevation",
    layers: [sceneLayer]
  }),
  view: new SceneView({
    ...
  }),
  scene: sceneLayer
}
```

---

## Hyperapp

- Actions

```ts
const years = {
  "1915": "CNSTRCT_YR < 1915",
  "2015": "CNSTRCT_YR > 2015",
  "all": "1=1"
};

export const actions: Actions = {
  addMapView: element => state => {
    state.view.container = element;
  },
  filterScene: year => state => {
    state.scene.definitionExpression = years[year];
  }
}
```

---

## Hyperapp

- Views

```ts
export const filter = (state: State, actions: Actions) =>
  h("nav",
    {
      class: "footer-item"
    },
    [
      h(...),
      h("button",
        {
          class: "btn modifier-class btn-clear btn-grouped",
          onclick: () => actions.filterScene("2015")
        },
        [
          "After 2015"
        ]
      ),
      h(...)
    ]
  );
```

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

<!-- .slide: class="questions" -->

## Questions?

**Help us to improve** filling out the survey

![Survey](images/survey-slide.png)

Tom Wayson ([@tomwayson](https://twitter.com/tomwayson))

Rene Rubalcava ([@odoenet](https://twitter.com/odoenet))

Slides: [github.com/odoe/presentations/tree/master/2018-PS-DevSummit/using-frameworks](https://github.com/odoe/presentations/tree/master/2018-PS-DevSummit/using-frameworks)

---


<!-- .slide: class="end" -->
