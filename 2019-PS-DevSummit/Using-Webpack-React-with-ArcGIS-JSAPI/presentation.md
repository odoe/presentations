<!-- .slide: data-background="../reveal.js/img/2019/devsummit/bg-1.png" -->

<h1 style="text-align: left; font-size: 80px;">Using Webpack and React</h1>
<h2 style="text-align: left; font-size: 60px;">with the ArcGIS API for JavaScript</h2>
<p style="text-align: left; font-size: 30px;">René Rubalcava | Tom Wayson</p>
<p style="text-align: left; font-size: 30px;"><a href="https://github.com/odoenet">@odoenet</a> | <a href="https://github.com/tomwayson">@tomwayson</a></p>
    <p style="text-align: left; font-size: 30px;">slides: <a href="http://bit.ly/abc123"><code>http://bit.ly/abc123</code></a></p>

---

<!-- .slide: data-background="../reveal.js/img/2019/devsummit/bg-2.png" -->

## Headline Here 2

* Bullet [points here](http://hakim.se).

---

<!-- .slide: data-background="../reveal.js/img/2019/devsummit/bg-3.png" -->

## Headline Here 3

* Bullet [points here](http://hakim.se).

---

<!-- .slide: data-background="../reveal.js/img/2019/devsummit/bg-4.png" -->

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
const WebMapView = () => {
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
