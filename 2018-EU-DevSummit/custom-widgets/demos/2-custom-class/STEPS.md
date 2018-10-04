# Writing a class

1.  Let's start off by adding some boilerplate for creating a module or class.

```
/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import { declared, subclass } from "esri/core/accessorSupport/decorators";

import Accessor = require("esri/core/Accessor");

@subclass("esri.demo.CustomClass")
class CustomClass extends declared(Accessor) {

}

export = CustomClass;
```

This is the minimum required to create a class in 4x. All we're doing here is creating a class that extends `esri/core/Accessor`, which is the base of all 4x classes.

1.  We'll now add the properties we described earlier in our design. We'll do this with the `property` decorator.

```tsx
//--------------------------------------------------------------------------
//
//  Properties
//
//--------------------------------------------------------------------------

//----------------------------------
//  active
//----------------------------------

@property({ readOnly: true })
readonly active: PortalItem = null;

//----------------------------------
//  portal
//----------------------------------

@property() portal: Portal = Portal.getDefault();

//----------------------------------
//  webMapGroupId
//----------------------------------

@property() webMapGroupId: string = "a09a1595fd944f17a47a244e67d804f9";  // "Make Great Maps" group ID

//----------------------------------
//  webMaps
//----------------------------------

@property({ readOnly: true })
readonly webMaps: PortalItem[] = null;

//----------------------------------
//  view
//----------------------------------

@property() view: MapView = null;
```

TypeScript will complain about references to classes and utilities we haven't imported, so let's go ahead and fix that.

```tsx
import { declared, property, subclass } from "esri/core/accessorSupport/decorators";

import Accessor = require("esri/core/Accessor");
import Portal = require("esri/portal/Portal");
import PortalItem = require("esri/portal/PortalItem");
import MapView = require("esri/views/MapView");
```

We can leverage TypeScript and type the constructor argument to ensure our class is created with the correct properties. We'll define an interface for these properties

```tsx
interface CustomClassProperties {
  view: MapView;

  portal?: Portal;
  webMapGroupId?: string;
}
```

and type the constructor arguments

```tsx
//--------------------------------------------------------------------------
//
//  Lifecycle
//
//--------------------------------------------------------------------------

constructor(props?: CustomClassProperties) {
  super();
}
```

We've now implemented the properties from our design. Properties defined this way can be watched for changes and initialized by a constructor object.

1.  Let's update the class to fetch the webmaps and populate when initialized.

```tsx
constructor(props?: CustomClassProperties) {
  super();

  this._fetchWebMaps().then((webMaps) => {
    this._set("webMaps", webMaps);
    this._setActive(webMaps[0]); // set first as `active`
  });
}
```

**Note** we use `_set` to internally set the value of read-only properties.

TypeScript let's us know that we have not defined `_fetchWebMaps`, nor `_setActive`, so let's do that right now.

```tsx
//--------------------------------------------------------------------------
//
//  Private Methods
//
//--------------------------------------------------------------------------

private _fetchWebMaps(): IPromise<PortalItem[]> {
  const { portal, webMapGroupId } = this;
  const webMapsFromGroupQuery = `group:${webMapGroupId} AND type:"Web Map" AND -type:"Web Mapping Application"`;

  return portal
    .load()
    .then(() =>
      portal.queryItems({
        query: webMapsFromGroupQuery,
        sortField: "num-views",
        sortOrder: "desc"
      })
    )
    .then((queryResults) => queryResults.results);
}

private _setActive(portalItem: PortalItem): void {
  const { view } = this;

  this._set("active", portalItem);

  const webMap = new WebMap({ portalItem });

  webMap.when(() => (view.viewpoint = webMap.initialViewProperties.viewpoint));

  view.map = webMap as any;
}
```

Let's bring in the missing imports

```tsx
import WebMap = require("esri/WebMap");
```

1.  Next up, is `next`. 🙃 This method will change the `active` property with the next available one from `webMaps`

```tsx
//--------------------------------------------------------------------------
//
//  Public Methods
//
//--------------------------------------------------------------------------

next(): void {
  const { webMaps } = this;

  let index = webMaps.indexOf(this.active) + 1;

  if (index === webMaps.length) {
    index = 0;
  }

  this._setActive(webMaps[index]);
}
```

We have now implemented our class and we can test it in our demo page.

1.  We can now update the application from the previous demo and bring in our `CustomClass`.

```ts
import Map = require("esri/Map");
import MapView = require("esri/views/MapView");

// import our new class
import CustomClass = require("./CustomClass");

//----------------
//  map setup
//----------------

const map = new Map({
  basemap: "streets-vector"
});

const view = new MapView({
  map,
  container: "viewDiv",
  center: [-117.1628487109789, 32.706813240831096],
  zoom: 15
});

// create an instance of our new class
const custom = new CustomClass({ view });

// set timer to set next webmap from portal
setInterval(() => custom.next(), 5000);
```
