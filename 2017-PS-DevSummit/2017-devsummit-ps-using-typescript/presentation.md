<!-- .slide: class="title" -->

## Using TypeScript with ArcGIS API for Javascript

René Rubalcava

@odoenet

---

<!-- .slide: class="section" -->

## TypeScript
![TypeScript](images/typescriptlogo.png)

---

## What is TypeScript?
- Superset of JavaScript (JavaScript *is* valid TypeScript)
- Integrates newer features of JavaScript
- Includes ES7 & ES8 features

---

## Not every declaration needs a type
```javascript
let center = [-100.33, 25.69];
// or
let center: number[] = [-100.33, 25.69];
```
- The compiler is smart enough to figure it out

---

```javascript
let center: number[];

// valid
center = [-100.33, 25.69];

// invalid
center = ["-100.33", "25.69"];
```

---

## Interfaces

```typescript
interface Props {
  view: MapView;
  initialCenter: Coordinates;
}

interface Point {
  x: number;
  y: number;
}

interface Point3D extends Point {
  z: number;
}

```

---

## Type Alias

```typescript
type Point = {
  x: number;
  y: number
}

type UIParams = {
  element: HTMLElement | string,
  position?: string
};

type Points = Point[];

function addMe(point: Point, params: UIParams) {...}

```

- Cannot _extend_ types

---

## Classes

```typescript
class MyPoint implements Point3D {
	x = 0;
	y = 0;
	z = 0;
}
```

---

## Tooling and configuration

- [tsc](https://www.npmjs.com/package/typescript)
- [Visual Studio Code](https://code.visualstudio.com/)
- [ArcGIS 4.x Typings](https://github.com/Esri/jsapi-resources/tree/master/4.x/typescript)
- [ArcGIS 3.x Typings](https://github.com/Esri/jsapi-resources/tree/master/3.x/typescript)
- [Dojo typings](https://github.com/dojo/typings)

---

## TypeScript in the JSAPI

```ts
/// <amd-dependency path="esr/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esr/core/tsSupport/decorateHelper" name="__decorate" />

import { declared, subclass, property, shared, read, write } from "esri/core/tsSupport/declare";

interface Base extends Layer, SceneService {}
interface BaseConstructor { new (): Base; }
function getBase(): BaseConstructor {
  return <any> Layer;
}

@subclass("esri.layers.SceneLayer")
class SceneLayer extends declared(getBase(), SceneService) {
  // ...
}
```

---

## JSAPI Widget Development

- [Sample Widget](https://github.com/Esri/arcgis-js-api/blob/4master/widgets/Home.tsx)

---

<!-- .slide: class="section" -->

## Demo

---

## More Guidance

- [TypeScript - Setting up your development environment](https://developers.arcgis.com/javascript/latest/guide/typescript-setup/index.html)

---

<!-- .slide: class="questions" -->

## Questions?

**Help us to improve** filling out the survey

![Survey](images/survey-slide.png)

Rene Rubalcava ([@odoenet](https://twitter.com/odoenet))

Slides: [github.com/odoe/presentations/2017-devsummit-ps-using-typescript/](github.com/odoe/presentations/2017-devsummit-ps-using-typescript)

---


<!-- .slide: class="end" -->
