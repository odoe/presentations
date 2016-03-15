<!-- .slide: class="title" -->

##Using TypeScript with the
##ArcGIS API for JavaScript
Dasa Paddock - @dasapaddock

Rene Rubalcava - @odoenet

---

## TypeScript meet ArcGIS API for JavaScript
- [3.16](https://github.com/Esri/jsapi-resources/tree/master/typescript) on github
- 4.0 *coming soon!*

---

## TypeScript
![TypeScript](images/typescriptlogo.png)

---

## What is TypeScript?
- Superset of JavaScript (JavaScript *is* valid TypeScript)
- Integrates newer features of JavaScript

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

type Points = Point[];

```

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
- [typings](https://www.npmjs.com/package/typings)
- [Visual Studio Code](https://code.visualstudio.com/)

---

## Ain't nuthin' but a Demo Party!

---

<!-- .slide: class="questions centered" -->

# Questions
Dasa Paddock - @dasapaddock

Rene Rubalcava - @odoenet

---

<!-- .slide: class="end" -->
#