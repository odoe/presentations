<!-- .slide: data-background="../reveal.js/img/2019/devsummit/bg-1.png" -->

<h1 style="text-align: left; font-size: 80px;">Using Webpack and React</h1>
<h2 style="text-align: left; font-size: 60px;">with the ArcGIS API for JavaScript</h2>
<p style="text-align: left; font-size: 30px;">René Rubalcava | Tom Wayson</p>
<p style="text-align: left; font-size: 30px;"><a href="https://github.com/odoenet">@odoenet</a> | <a href="https://github.com/tomwayson">@tomwayson</a></p>
    <p style="text-align: left; font-size: 30px;">slides: <a href="https://git.io/fhFTb"><code>https://git.io/fhFTb</code></a></p>

---

<!-- .slide: data-background="../reveal.js/img/2019/devsummit/bg-2.png" -->

## Headline Here 2

* Bullet [points here](http://hakim.se).

---

<!-- .slide: data-background="../reveal.js/img/2019/devsummit/bg-3.png" -->

## Headline Here 3

* Bullet [points here](http://hakim.se).

---

<!-- .slide: data-background="../reveal.js/img/2019/devsummit/bg-2.png" -->

## React with the ArcGIS API for JS

---

### Manage state in React

* You may not need Redux/MobX
* Context is powerful, and injectable

---

### React Context API

* Create a Context

```ts
// main application context
export const AppContext = createContext<ContextProps>({
  state: initialState,
  // add methods to communicate
  setState: (a: any) => void;
});
```

---

### React Context API

* Create a Provider

```tsx
// main application provider
export const AppProvider = ({ children }: AppProviderProps) => {
  ...
  const value = {
    state,
    setState
  };
  return (
      <AppContext.Provider value={value}>
        {children}
      </AppContext.Provider>
  );
};
```

---

### React Context API

* Use the Provider

```tsx
ReactDOM.render(
    <AppProvider location={location}>
        <AwesomeApp />
    </AppProvider>
  document.getElementById("root")
);
```

---

### React Context API

* Use the Context

```tsx
const AwesomeApp = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { state, setState } = useContext(AppContext);
  useEffect(
    () => {
      setState(mapRef.current);
    },
    []
  );
  return (
    <MapContainer webmapid={state.webmapid} ref={mapRef} />
  );
};
```

---

<!-- .slide: data-background="../reveal.js/img/2019/devsummit/bg-4.png" -->

## What the hook?

---

### What have I done?

```ts
const mapRef = useRef<HTMLDivElement>(null);
const { state, setState } = useContext(AppContext);
useEffect(
  () => {
    setState(mapRef.current);
  },
  []
);
```

---

### React hooks

* `useEffect`
* `useState`
* `useContext`
* and more!

- [documentation](https://reactjs.org/docs/hooks-intro.html)

---

### `useEffect`

* Replaces some class lifecycle methods... mostly
  * componentDidMount
  * componentDidUpdate
  * componentWillUnmount

---

### `useEffect`

```ts
let watcher;
useEffect( // happens after render - EVERY TIME
  () => {
    if(watcher) {
      return;
    }
    watcher = mapView.watch("stationary", () => {
      // do something
    });
    return () => watcher.remove();
  },
  // when this value changes
  // rerun this hook
  [someProp]
);
```

---

### `useState`

* Manage local state
* Keep it simple

---

### `useState`

```ts
const initialState = {
  selectedFeatures: [],
  extent: null
};

const [state, setState] = useState({ ...initialState });
```

---

### `useContext`

* Helps you manage application state
* _Could_ replace redux/mobx

---

### `useContext`

```tsx
const AwesomeApp = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { state } = useContext(AppContext);
  return (
    <WebMapComponent webmapid={state.webmapid} />
  );
};
```

---

<!-- .slide: data-background="../reveal.js/img/2019/devsummit/bg-4.png" -->

## Modularize API usage

---

* Do all the API work seperate from your UI
* _Separate content from navigation_ - pattern in PWAs

```ts
// src/data/map.ts
export function initialize(element: Element) {
  view.container = element;
  view.when(() => {
    // magic
  });
}
```

---

* Use in your context or component

```ts
// src/contexts/App.ts
const [ container, setContainer ] = useState<HTMLDivElement>(element);
const loadMap = async () => {
  // lazy load the API
  const map = await import("../data/map");
  map.initialize(container);
};
useEffect(
  () => {
    if (container) {
      loadMap();
    }
  },
  [container]
);
```

---

## Why lazy load the API?

* So webpack can create async bundles
* `bundle1.js` -> `bundle2.js` -> `bundle3.js`
* Only load the resources you need when you need them
* Leads to faster initial loads

---

## Demo

* [Nearby JavaScript](https://developers.arcgis.com/example-apps/nearby-javascript/)

---

<!-- .slide: data-background="../reveal.js/img/2019/devsummit/bg-5.png" -->

## Headline Here 5

* Bullet [points here](http://hakim.se).

---

<!-- .slide: data-background="../reveal.js/img/2019/devsummit/bg-6.png" -->

## Headline Here 6

* Bullet [points here](http://hakim.se).

---

<!-- .slide: data-background="../reveal.js/img/2019/devsummit/bg-esri.png" -->

---

<!-- .slide: data-background="../reveal.js/img/2019/devsummit/bg-rating.png" -->
