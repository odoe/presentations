<!-- .slide: class="title" -->

## Using Frameworks with the ArcGIS API for JavaScript

Tom Wayson
René Rubalcava

---

<!-- .slide: class="agenda" -->

## Agenda

- tbd

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
