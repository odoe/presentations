<!-- .slide: class="title" -->

## Charts & Custom Visualizations Beyond the Map

David Martinez & René Rubalcava

@DavidJmart / @odoenet

---

<!-- .slide: class="sponsor" -->


---

<!-- .slide: class="section" -->

##  Visualization

<p align="center">
<img src="images/cedarcharts.png" alt="alt text"  width="650" height="600">
</p>

---

<!-- .slide: class="section" -->

### Visualizations are any medium to present data, visually, to a visual consumer.
- Cartography
- Charts
- Infographics
- Tables

---

<!-- .slide: class="section" -->

### Why Do We Visualize Data?

- Cognitive understanding is faster when visually consumed
- To understand the data
- To frame the data in a different perspective thereby making it easier to reason and consume

---

<!-- .slide: class="section" -->

## "We should never forget that a **picture of data is not the goal;** it's only the means. Information visualization is all about **gaining the understanding so we can make good decisions."**

#### Stephen Fews

---

<!-- .slide: class="section" -->

### Understanding Data

- Compare
- Sort
- Filter
- Highlight
- Aggregate
- Re- express

---

<!-- .slide: class="section" -->

## Cedar

### JavaScript Library for Creating Charts


<p align="center">
<img src="https://esri.github.io/cedar/img/cedar-logo-tree.png" alt="alt text"  width="550" height="550">
</p>

---

<!-- .slide: class="section" -->

###  Philosophy
- State of art Visualizations
- Re-usable, sharable
- Integrated with ArcGIS API
- Overridable

---

<!-- .slide: class="section" -->

### Working with Cedar

- A Cedar chart needs four things
    - Chart Type
    - Data
    - Mappings
    - DOM Element

---

<!-- .slide: class="section" -->

### Your First Cedar App

[Population](https://jsfiddle.net/dmartine/ndz81ha2/1/)

---


### Maps and Charts

<!-- .slide: class="section" -->

---

<iframe height='600' scrolling='no' title='Query statistics client-side by distance - 4.9' src='//codepen.io/odoe/embed/preview/mzGPyg/?height=600&theme-id=31222&default-tab=html,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/odoe/pen/mzGPyg/'>Query statistics client-side by distance - 4.9</a> by Rene Rubalcava (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

<!-- .slide: class="section" -->

### Cedar in Hub & Open Data

- [Hub](https://hub.arcgis.com/) & [Open Data](https://hub.arcgis.com/pages/open-data) requirements drive Cedar development
- Add-on for Ember apps [ember-cli-cedar](https://github.com/Esri/ember-cli-cedar)

---

<!-- .slide: class="section" -->

### Examples

1. [Bar](https://esri.github.io/ember-cli-cedar/#/charts/bar)
2. [Area](https://esri.github.io/ember-cli-cedar/#/charts/area)
3. [Pie](https://esri.github.io/ember-cli-cedar/#/charts/pie)
4. [Radar](https://esri.github.io/ember-cli-cedar/#/charts/radar)
5. [Line](https://esri.github.io/ember-cli-cedar/#/charts/line)
6. [Scatterplot](https://esri.github.io/ember-cli-cedar/#/charts/scatter)
7. [Secure Services](demos/secure-services.html)

---

<!-- .slide: class="section" -->

### More Intuitive JavaScript API
- Async functions use promises instead of callbacks
- fluent, chainable setters and methods
- streamlined, reduced footprint

---

<!-- .slide: class="section" -->

# SmartMapping

---

## Exploring Age

- _Age_: Time elapsed between two dates
- Need at least one date field

---

## createAgeRenderer

```js
const ageParams = {
  layer: layer,
  view: view,
  basemap: map.basemap,
  startTime: "INSPECTION_DATE",
  endTime: Date.now(),
  theme: "above-and-below"
};

// smart mapping will determine age units to use
const rendererResponse =
    await colorRendererCreator.createAgeRenderer(ageParams);
layer.renderer = rendererResponse.renderer;
```

---

## createAgeRenderer

- Will generate the age for you using [`DateDiff`](https://developers.arcgis.com/arcade/function-reference/date_functions/#datediff)

```js
DateDiff(endDate, startDate, 'years');
```

---

<iframe height='600' scrolling='no' title='createAgeRenderer' src='https://ekenes.github.io/esri-ts-samples/visualization/smart-mapping/age/' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>
</iframe>

---

## createContinuousRenderer

- You construct the Arcade expression yourself
- Color or size

```js
const ageParams = {
  layer: layer,
  view: view,
  basemap: map.basemap,
  // subtracts the current year from the construction year
  valueExpression: "Year(Date()) - $feature.CNSTRCT_YR",
  theme: "above-and-below"
};

const rendererResponse =
    await colorRendererCreator.createContinuousRenderer(ageParams);
layer.renderer = rendererResponse.renderer;
```

---

<iframe height='600' scrolling='no' title='createContinuousRenderer' src='https://ekenes.github.io/esri-ts-samples/visualization/smart-mapping/age-buildings/' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>
</iframe>

---

## Relationship

- Visualize the relationship between values
- A bivariate renderer

---

## Relationship

```js
const params = {
  layer: layer,
  view: view,
  basemap: map.basemap,
  field1: {
    field: "StarScore"
  },
  field2: {
    field: "ElectricUse"
  },
  // HIGH field 1 value & HIGH field 2 value
  // corner of legend is on top
  focus: "HH",
  numClasses: 2
};

const response = await relationshipRendererCreator.createRenderer(params);
layer.renderer = response.renderer;
```

---

<iframe height='600' scrolling='no' title='Relationship' src='https://developers.arcgis.com/javascript/latest/sample-code/visualization-sm-relationship/live/index.html' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>
</iframe>

---

## Predominance

- Visualize data based on attributes based on which one wins
- Election results, survey results, demographic majorities

---

## Predominance

```js
// Gets all the predominance schemes available in the JS API
const schemes = predominanceSchemes.getSchemes({
  basemap: map.basemap,
  geometryType: "polygon",
  numColors: 10
});
const params = {
  view,
  layer,
  fields,
  predominanceScheme: schemes.secondarySchemes[6],
  sortBy: "value",
  basemap: view.map.basemap,
  includeSizeVariable: includeSizeCheckbox.checked,
  includeOpacityVariable: includeOpacityCheckbox.checked,
  legendOptions: {
    title: "Most common decade in which homes were built"
  }
};

const predominanceResponse = predominanceRendererCreator.createRenderer(params);
layer.renderer = predominanceResponse.renderer;
```

---

![Predominance Arcade](images/predominance-arcade-2.png)

---

## Predominance

<iframe height='600' scrolling='no' title='Relationship' src='https://ekenes.github.io/esri-ts-samples/visualization/smart-mapping/predominance/boise-housing/' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>
</iframe>

---

<!-- .slide: class="questions" -->

## Questions?

**Help us to improve** filling out the survey

David Martinez ([@DavidJmart](https://twitter.com/DavidJmart))

Rene Rubalcava ([@odoenet](https://twitter.com/odoenet))

---


<!-- .slide: class="end" -->
