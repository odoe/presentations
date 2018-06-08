# Customize Directions Template Steps

1. Go to the [Directions Template](https://www.arcgis.com/home/item.html?id=556db83093934365a8d7e2f294aa785b) item on ArcGIS Online

2. Download the zip file from GitHub

3. Extract and move to a web directory

4. Load to make sure its working
[http://localhost/directions-master/](http://localhost/directions-master/)

5. Go to [BasemapGallery API Doc](https://developers.arcgis.com/javascript/3/jsapi/basemapgallery-amd.html)

6. Open `main.js` file and require the BasemapGallery widget.

```
"esri/dijit/BasemapGallery",
```

7. Add a node for the widget

```
<div id="bmGallery"></div>
```

8. Initialize the widget

```
var bmGallery = new BasemapGallery({
    map: this.map
}, "bmGallery");
bmGallery.startup();
```

9. View the page

10. Add CSS

```
#bmGallery{
    position: absolute;
    top: 65px;
    left: 10px;
    z-index: 1;
    width: 140px;
    height: 235px;
    overflow: auto;
    padding: 10px;
    border-radius: 5px;
    background-color: rgb(128, 171, 0);
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.3);
    color: #fff;
}
```

11. Remove filter for Basemap to show.
  - Remove filter in `_setColor` function.

```
// if (this.config.styleBasemap === 1) {
//     var style2 = document.createElement('style');
//     var str2 = '.layerTile {filter: url(css/filters.svg#grayscale); filter: gray; -webkit-filter: grayscale(1); -ms-filter: grayscale(100%); -moz-opacity: 0.7; -khtml-opacity: 0.7; opacity: 0.7;}';
//     style2.setAttribute("type", "text/css");
//     document.getElementsByTagName('head')[0].appendChild(style2);
//     if (style2.styleSheet) { // IE
//         style2.styleSheet.cssText = str2;
//     } else { // the world
//         var t2 = document.createTextNode(str2);
//         style2.appendChild(t2);
//     }
// }
```

