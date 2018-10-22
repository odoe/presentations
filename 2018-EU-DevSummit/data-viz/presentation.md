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

### Recent Improvements

- 2016 focused on flexibility & reliability of data queries:
  - Better support for and examples of SQL expressions
  - Ability to transform data returned from server
  - Query callback for error handling
  - Timeouts for slow loading Data
- 2017 focussing on cedar v1...

---

<!-- .slide: class="section" -->

## Where Are We Headed?

<p align="center">
<img src="images/astronautransparent.png" alt="alt text"  width="550" height="550">
</p>

---

<!-- .slide: class="section" -->

### Cedar v1

[Released in alpha last week!](https://github.com/Esri/cedar/releases/tag/v1.0.0-alpha)

- Better support for [multi-series charts](https://esri.github.io/ember-cli-cedar/#/charts/line)
- Support for [joining multiple datasets](https://esri.github.io/ember-cli-cedar/#/charts/bar-grouped)
- New chart types ([area](https://esri.github.io/ember-cli-cedar/#/charts/area), [radar](https://esri.github.io/ember-cli-cedar/#/charts/radar))
- improved default styling for charts based on [Calcite](https://esri.github.io/calcite-bootstrap/colors.html)

---

<!-- .slide: class="section" -->

### v1 uses amCharts

- Basing cedar on   [amCharts](https://www.amcharts.com/javascript-charts/) will make it easier to:
    - Create and customize new chart types
    - Customize or extend existing built-in chart types
    - Style and theme charts

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

### v1 Roadmap
- [open issues](https://github.com/Esri/cedar/issues?q=is%3Aissue+is%3Aopen+label%3Av1x)
- TLDR: `TODO: documentation!`
- we welcome your [ideas](https://github.com/Esri/cedar/issues), and of course, [contributions](https://github.com/esri/contributing)

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

<!-- .slide: class="questions" -->

## Questions?

**Help us to improve** filling out the survey

David Martinez ([@DavidJmart](https://twitter.com/DavidJmart))

Rene Rubalcava ([@odoenet](https://twitter.com/odoenet))

---


<!-- .slide: class="end" -->
