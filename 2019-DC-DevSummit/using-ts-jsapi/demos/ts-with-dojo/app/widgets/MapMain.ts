import _WidgetBase from "dijit/_WidgetBase";
import _TemplatedMixin from "dijit/_TemplatedMixin";
import template from "dojo/text!./templates/MapMain.html";

import WebScene from "esri/WebScene";
import SceneView from "esri/views/SceneView";
import SceneLayer from "esri/layers/SceneLayer";

import declare from "../_utils/declareDecorator";

interface MapMainParams {
  updateSidePanel: (hiddenBuildings: string[]) => void;
}

interface MapMain extends _WidgetBase, _TemplatedMixin {}

@declare(_WidgetBase, _TemplatedMixin)
class MapMain {
  params: MapMainParams;
  templateString: string = template;
  mapContainer: HTMLElement;
  hiddenBuildings: string[] = [];
  sceneLayer: __esri.Layer;

  constructor(params: MapMainParams, container: string | HTMLElement) {
    this.params = params;
  }

  unhideBuilding(id: string) {
    this.hiddenBuildings.splice(this.hiddenBuildings.indexOf(id), 1);
    this.updateDefinitionExpression();
    this.params.updateSidePanel(this.hiddenBuildings);
  }

  unhideAllBuildings() {
    this.hiddenBuildings = [];
    this.updateDefinitionExpression();
    this.params.updateSidePanel(this.hiddenBuildings);
  }

  postCreate() {
    const webscene = new WebScene({
      portalItem: {
        id: "10ede348e4c54c77b45f6ebab2d018db"
      }
    });

    const view = new SceneView({
      container: this.mapContainer as HTMLDivElement,
      map: webscene
    });

    webscene.when(() => {
      this.sceneLayer = webscene.layers.find(function(l) {
        return l.title === "Buildings";
      });

      view.on("click", (event) => {
        view.hitTest(event)
          .then((response) => {
            var graphic = response.results[0].graphic;
            if (graphic && graphic.layer.title === "Buildings") {
              this.hideBuilding(graphic.attributes.OBJECTID);
            }
          });
      });
    });
  }

  private hideBuilding(id: string) {
    this.hiddenBuildings.push(id);
    this.updateDefinitionExpression();
    this.params.updateSidePanel(this.hiddenBuildings);
  }

  private updateDefinitionExpression() {
    let expr;
    if (this.hiddenBuildings.length > 0) {
      expr = `OBJECTID NOT IN (${this.hiddenBuildings.join(",")})`;
    } else {
      expr = "";
    }
    this.sceneLayer.set("definitionExpression", expr);
  }
}

export default MapMain;
