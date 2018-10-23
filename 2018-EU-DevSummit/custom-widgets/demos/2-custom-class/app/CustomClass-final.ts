import MapView from "esri/views/MapView";
import WebMap from "esri/WebMap";

import Portal from "esri/portal/Portal";
import PortalItem from "esri/portal/PortalItem";

import { declared, property, subclass } from "esri/core/accessorSupport/decorators";

import Accessor from "esri/core/Accessor";

interface WebMapShowcaseProperties {
  view: MapView;

  portal?: Portal;
  webMapGroupId?: string;
}

@subclass("esri.demo.CustomClass")
class CustomClass extends declared(Accessor) {
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  constructor(props?: WebMapShowcaseProperties) {
    super();
  }

  initialize() {
    this._fetchWebMaps().then((webMaps) => {
      this._set("webMaps", webMaps);
      this._setActive(webMaps[0]); // set first as `active`
    });
  }

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

  @property() webMapGroupId: string = "a09a1595fd944f17a47a244e67d804f9";

  //----------------------------------
  //  webMaps
  //----------------------------------

  @property({ readOnly: true })
  readonly webMaps: PortalItem[] = null;

  //----------------------------------
  //  view
  //----------------------------------

  @property() view: MapView = null;

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
}

export default CustomClass;
