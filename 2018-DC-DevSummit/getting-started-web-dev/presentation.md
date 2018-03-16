<!-- .slide: data-background="./images/bg-1.png" -->
<!-- .slide: class="title" -->

### Getting Started with Web Development 
### and the ArcGIS API for JavaScript

Andy Gup & René Rubalcava

---

### **Agenda**

 - Setup
 - First steps
 - Working with layers
 - Symbols and renderers
 - Make the map interactive
 - Widgets

---

### **Presentations accessible via GitHub**
  
  - This session focuses on version 4.x
  
  - Concepts remain similar between versions 3.x and 4.x
  
  - <a href="https://github.com/hgonzago/DevSummit-presentations" target="_blank">https://github.com/hgonzago/DevSummit-presentations</a>

---

### **Where do I begin?**

<a href="https://developers.arcgis.com/javascript/" target="_blank">
<img src="images/landingPage_3.png" alt="JavaScript landing page" width="1200" height="656">
</a>

---

### **Which version of the API is best?**

<a href="https://developers.arcgis.com/javascript/latest/guide/choose-version/index.html" target="_blank">
<img src="images/Choose_Your_Own_Version.png" alt="API functionality matrix" width="1000" height="633">
</a>

---

### **Developer Setup**

<a href="https://www.slant.co/topics/1686/~javascript-ides-or-editors" target="_blank">
<img src="images/ides.png" alt="IDEs" width="806" height="443">
</a>

---

### **JSAPI Resources**

<a href="https://github.com/Esri/jsapi-resources" target="_blank">
<img style="float: right;" alt="JSAPI resources" src="images/jsapiResources_2.png" width="790" height="577">
</a>
 - Includes
   - JSHint file
   - TypeScript definition file
   - Build tools, e.g. Bower
   - OAuth popup callback

---

### **Get the API**

 - <a href="https://developers.arcgis.com/javascript/latest/guide/get-api/index.html#cdn" target="_blank">CDN</a>
 - Custom builds
 - <a href="https://developers.arcgis.com/downloads/" target="_blank">Download builds</a>


<pre style="display:inline-block; padding: 5px; margin: 10px auto; width: 100%;"><code data-trim> 
&lt;link rel=&quot;stylesheet&quot; href=&quot;https://js.arcgis.com/4.6/esri/css/main.css&quot;&gt; 
&lt;script src=&quot;https://js.arcgis.com/4.6/&quot;&gt;&lt;/script&gt;
</code></pre>

---

### CSS

- <a href="https://developers.arcgis.com/javascript/latest/guide/styling/index.html" target="_blank"><b>Main.css</b></a> contains styles for entire API
   <pre><code data-trim>
   &lt;link rel=&quot;stylesheet&quot; href=&quot;https://js.arcgis.com/4.6/esri/css/main.css&quot;&gt;
   </code></pre>
- <b>View.css</b> is smaller in size but better choice if only needing basic CSS (maps, widgets, etc.)
  <pre><code data-trim>
   &lt;link rel=&quot;stylesheet&quot; href=&quot;https://js.arcgis.com/4.6/esri/css/view.css&quot;&gt;
   </code></pre>
- Themes
    <pre><code data-trim>
   &lt;link rel=&quot;stylesheet&quot; href=&quot;https://js.arcgis.com/4.6/esri/themes/theme-name/main.css&quot;&gt;
   </code></pre>
- Custom CSS (SASS)

---

### **First steps**

- How will app be written?
- Separate files or one combined file?


<img style="float: center;" src="images/Step1_Combined.png">

---

### **Demo: Make a map**

<a href="Demos/Step1_Map/" target="_blank">
  <img style="float: center;" src="images/Step1_Demo.png">
</a>

---

### **MapView**

Visualize data within Map or Scene

```js
var view = new MapView({
  container: "viewDiv",
  map: map,
  zoom: 12,
  center: [-117.168, 32.776]
});
```

```js
var view = new SceneView({
  container: "viewDiv",
  map: map,
  camera: {
    heading: 210,
    tilt: 78,
    position: {
      x: -8249335,
      y: 4832005,
      z: 50.7,
      spatialReference: {
        wkid: 3857
      }
    }
  }
});
```

---

### **Common Gotchas**

- Module order makes a difference 
- Missing module <img style="float:right;" src="images/requireNotDefined.png">
- Missing CSS <img style="float:right;" src="images/missingCSS.png">

---

### **Add layers**

<img style="float:right;" src="images/add-layers.png">
 - <a href="https://developers.arcgis.com/javascript/latest/api-reference/index.html#modules-in-esri-layers" target="_blank">Various layer types</a>
1. Load module 
2. Create layers 
3. Set properties 
4. Add to map or scene

 - Basic steps remain the same

---

### **Properties**

- No need for a bunch of get/set statements

```js
var map = new Map();
map.basemap = "streets";
map.ground = "world-elevation";
var view = new MapView();
view.center = [-100, 40];
view.zoom = 6;
```

- <a href="https://developers.arcgis.com/javascript/latest/guide/working-with-props/index.html" target="_blank">Properties</a> can be set in constructor

```js
var map = new Map({
    basemap: "streets",
    ground: "world-elevation"
});
var view = new MapView({
    map: map, 
    center: [-100, 40], 
    zoom: 6
  });
```

---

### **Watch for property changes**

- <a href="https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html#watch" target="_blank">Watch</a> for changes 

```js
layer.watch("loadStatus", function(status) {// do something});
```

- Can also use <a href="https://developers.arcgis.com/javascript/beta/api-reference/esri-core-watchUtils.html" target="_blank">esri/core/watchUtils</a> utility methods

- See this in action with the <a href="https://developers.arcgis.com/javascript/latest/sample-code/watch-for-changes/index.html" target="_blank">Watch for Changes</a> sample

---

### **Demo: Add layer to sample app**

<a href="Demos/Step2_Layer/" target="_blank">
  <img style="float: center;" src="images/Step2_Demo.png">
</a>

---

### **Renderers**

- <a href="https://developers.arcgis.com/javascript/latest/sample-code/get-started-visualization/index.html" target="_blank">Define</a> a set of symbols to use for the layer

- Sets the rules on how the symbols are used

- Basic coding pattern

```js
var layerRenderer = new UniqueValueRenderer(); // Set the renderer
var featurelayer = new FeatureLayer({
    url: "featurelayer url",
    renderer: layerRenderer // pass in renderer to featurelayer using default properties
})
```

---

### **Symbols**

- Renderers use symbology, e.g. points, lines, polygons

- Set the renderer's symbol

```js
var symbol = new SimpleMarkerSymbol({
    // set the properties
});

var renderer = new UniqueValueRenderer({
    defaultSymbol: symbol, // set symbol for renderer
    // provide anymore properties necessary
});
```

---

### **Autocasting**

- No need to <b>Require()</b> the module

- Look for the <img style="float: center;" src="images/autocast-label.png"> label in SDK's API Reference

- <a href="https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=layers-portal" target="_blank">Create a layer from portal item sample </a> shows autocasting in action

- Read more about <a href="https://developers.arcgis.com/javascript/latest/guide/autocasting/index.html" target="_blank">Autocasting</a> in the Guide

---

### **Demo: Update a feature layer's renderer**

<a href="Demos/Step3_LayerRenderer/" target="_blank">
  <img style="float: center;" src="images/Step3_Demo.png">
</a>

---

### **Map interaction using popups**

<img style="float: right;" src="images/popupcombined.png">

- Responds to mouse clicks

- Provides info on:
  - feature attributes
  - location
  - search results

- Customizable

---

### **PopupTemplate**
- View has associated popup, can set content here
- FeatureLayer has associated <a href="https://developers.arcgis.com/javascript/latest/api-reference/esri-PopupTemplate.html" target="_blank">popupTemplate</a> property
- Position the popup using *dockOptions*

```js
var popupTemplate = new PopupTemplate({
    title: "Title of the popup",
    content: [{
      // Set the content here
    }]
});

var featurelayer = new FeatureLayer({
    url: "url to the feature layer",
    outFields: ["*"],
    popupTemplate: popupTemplate,
    renderer: renderer
});
```

---

### **Demo: Add a popup to the map**

<a href="Demos/Step4_Popup/" target="_blank">
  <img style="float: center;" src="images/Step4_Demo.png">
</a>

---

### **Filtering data**

- FeatureLayer definition expressions
  - Where clause filters features on the client
  - Use with large datasets
- FeatureLayer <a href="https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#querying" target="_blank">queries</a>



```js
var select = dom.byId("selectState");
on(select, "change", function(e) {
  var featureId = select.value;
  var expr = select.value === "" ? "" : "FID = '" + featureId + "'";
  privateSchoolsPoly.definitionExpression = expr;

  privateSchoolsPoly.queryFeatures().then(function(results) {
    results.features.forEach(function(feature) {
      var featureId = feature.attributes.FID;
      ...
```

---

### **Demo: Filter features within a layer**

<a href="Demos/Step5_LayerFilter/" target="_blank">
  <img style="float: center;" src="images/Step5_Demo.png">
</a>


---

### **Using web maps**

- Reduces coding effort

- Retains all customizations with rendering, popups, etc. 

```js
var map = new WebMap({
    portalItem: {
      id: "8444e275037549c1acab02d2626daaee" // Remember portalItem is autocasted
    }
});
```

---

### **Demo: Add a web map to an application**

<a href="Demos/Step6_Webmap/" target="_blank">
  <img style="float: center;" src="images/Step6_Demo.png">
</a>

---

### **Widgets**

- <a href="https://developers.arcgis.com/javascript/latest/api-reference/index.html#modules-in-esri-widgets" target="_blank">Encapsulates functionality</a>
- Similar coding pattern across all widgets

```js
view.when(function){
    var featurelayer = map.layers.getItemAt(1);
    // 1. Create the widget
    var legend = new Legend({
      // 2. Specify properties for widget
      view: view,
      layerInfos: [{
          layer: featurelayer,
          title: "Name"
      }]
  });
    // 3. Add widget to the view UI
    view.ui.add(legend, "bottom-left");
});
```

---

### ** View UI**

- Position widgets
  - Add
  - Move
  - Remove
  

```js
view.ui.add(legend, "bottom-left");
view.ui.add(searchWidget, "top-right");
```

---

### **Demo: Add widgets to the application**

<a href="Demos/Step7_Widgets/" target="_blank">
  <img style="float: center;" src="images/Step7_Demo.png">
</a>

---

### **Where can I get more info?**

- SDK Documentation
- Esri-related training and webinars
- JavaScript online training, free and not-so-free
- User forums, e.g. GeoNet, StackExchange, Spatial Community in Slack, etc.

<a href="https://developers.arcgis.com/javascript/latest/guide/community/index.html" target="_blank">
<img style="float:bottom;" src="images/Community.png" alt="Community" width="900" height="395">

---

<!-- .slide: class="questions" -->

## Questions?

![Survey](images/survey.png)

Andy Gup (agup@esri.com ) ([@agup](https://twitter.com/agup))

Réne Rubalcava (rrubalcava@esri.com ) ([@odoenet](https://twitter.com/odoenet))

---

<!-- .slide: data-background="./images/bg-final.png" -->

