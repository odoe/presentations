# ArcGIS API for JavaScript: Using Arcade with your Apps

### Summary

Arcade is a new scripting language that may be used to create custom visualizations and labeling expressions for apps built on the ArcGIS platform. Sometimes simple calculations can provide more insight instead of field values when creating data-driven visualizations and label expressions. Arcade allows you to drive both visualizations and labels by a value returned from an expression rather than a field value. This session will provide an overview of how to navigate the Arcade documenation while highlighting some of the key functions available in Arcade. View examples of how powerful Arcade can be when creating visualizations and labels for a FeatureLayer. Also, observe how the live Arcade editor in ArcGIS Online can be a powerful tool in helping you write, edit, and execute custom expressions.


### Demos

##### [Playground](https://developers.arcgis.com/arcade/playground/)

The playground allows you to choose an Arcade profile and experiment with any expression with test data.


##### [ArcGIS Online web map](https://jsapi.maps.arcgis.com/home/webmap/viewer.html?webmap=f3f83b97f9c14c1abe79ed49810ba023)

###### Visualization

1. Normalization/Rounding (% population that didn't go to school)
2. Calculating new values (% population that went to college)
4. Predominant value (color) + strength of win (opacity)

###### Labels

3. % population that didn't report education
5. Predominant gap (label)


##### [Predominance in JS app](http://odoe.github.io/presentations/2017-European-DevSummit/using-arcade-with-your-apps/demos/political-parties/)

This app visualizes the predominant political party among registered voters in the county level accross the United States. The `Decode()` function of Arcade matches the maximum count of all relevant fields to a string value representing the respective party. This prevents the user or GIS analyst from unecessarily preforming a series of field calculations in new fields. If the expression is incorrect in any way, it is relatively simple to fix the script as opposed to recalculating fields. Also note that an Arcade expression is used to drive opacity. More opaque features represent counties where the predominant political party is relatively strong. Transparent counties incidate the predominant party barely edges the rival parties based on total count.


##### [Weather](http://odoe.github.io/presentations/2017-European-DevSummit/using-arcade-with-your-apps/demos/weather/)

This app demonstrates how to use Arcade in simple and complex labeling expressions. As of the time of this presentation, the labeling profile is supported only in the 3.x versions of the ArcGIS API for JavaScript.

The calculation for determining wind direction (N/S/E/W) is done using a field that contains the compass direction of the wind (0-360).


##### [Wind Chill](http://odoe.github.io/presentations/2017-European-DevSummit/using-arcade-with-your-apps/demos/wind-chill/)

This sample shows how to use Arcade for performing larger calculations and logicial tests. In this case, wind chill and heat index are calculated based on other field values that are potentially updated very frequently. The math operations aren't very complex, but you can use Arcade to automatically create pseudo-fields such as "Apparent temperature" to display calculated data based on fields that are frequently updated, such as weather data.


##### [Earthquake dates](http://odoe.github.io/presentations/2017-European-DevSummit/using-arcade-with-your-apps/demos/earthquakes-day-night/)

This sample demonstrates how to use the date functions and time offsets to render data based on the local time in the time zone in which the event occured. In this case we render earthquakes from the last month based on whether or not they occurred in the morning or evening in the local time of the event.


##### [Earthquake times of day](http://odoe.github.io/presentations/2017-European-DevSummit/using-arcade-with-your-apps/demos/earthquakes-morning/)

This sample demonstrates how to use the date functions and time offsets to render data based on the local time in the time zone in which the event occured. In this case we render earthquakes from the last month based on whether or not they occurred in the morning, afternoon, evening, or nighttime of the local time of the event.


##### [Bivariate Color (advanced Arcade example)](http://odoe.github.io/presentations/2017-European-DevSummit/using-arcade-with-your-apps/demos/bivariate-color/)

This app generates an Arcade expression that is used to categorize features in one of several bins for a bivariate color visualization. The inspiration for this app was derived from the research of Cynthia Brewer on the topic of bivariate color and [this blog post by Joshua Stevens](http://www.joshuastevens.net/cartography/make-a-bivariate-choropleth-map/).

The Arcade expression demonstrates how writing custom functions within Arcade can be useful for writing more efficient or readable code.


##### [Portability: RendererList](http://odoe.github.io/presentations/2017-European-DevSummit/using-arcade-with-your-apps/demos/renderer-list/)

This app uses the LayerList widget to provide options to the user for setting different renderers on the same data source. Therefore the app avoids making duplicate layer/data queries when loading the visualizations saved in a web map. This sample demonstrates the portability of Arcade since most of the renderers were authored with Arcade in the ArcGIS Online map viewer, but can be read into a custom web application using the ArcGIS API for JavaScript. 

The renderers and data used in this sample were loaded from the [Mexico educational attainment](https://jsapi.maps.arcgis.com/home/item.html?id=8bcfd58b039a4477a0eb734fe6c8d4fe) web map.