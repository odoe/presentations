import _WidgetBase from "dijit/_WidgetBase";
import _TemplatedMixin from "dijit/_TemplatedMixin";
import template from "dojo/text!./templates/AppBody.html";

import declare from "../_utils/declareDecorator";

import MapMain from "./MapMain";
import Label from "./Label";

interface AppBodyParams {}

interface AppBody extends _WidgetBase, _TemplatedMixin {}

@declare(_WidgetBase, _TemplatedMixin)
class AppBody {
  params: AppBodyParams;
  templateString: string = template;
  unmaskAllBtn: HTMLElement;
  mapMainContainer: HTMLElement;
  mapMain: MapMain;
  labelContainer: HTMLElement;
  labelWidgets: {
    [id: string]: Label;
  } = {};

  constructor(params: AppBodyParams, container: string | HTMLElement) {
    this.params = params;

    this.updateSidePanel = this.updateSidePanel.bind(this);
    this.handleLabelClick = this.handleLabelClick.bind(this);
  }

  postCreate() {
    this.mapMain = new MapMain({
      updateSidePanel: this.updateSidePanel
    }, this.mapMainContainer)

    this.unmaskAllBtn.addEventListener("click", () => {
      this.mapMain.unhideAllBuildings();
    });
  }

  updateSidePanel(hiddenBuildings: string[]) {
    if (hiddenBuildings.length > 0) {
      this.unmaskAllBtn.style.display = "inline-block";
    } else {
      this.unmaskAllBtn.style.display = "none";
    }

    Object.keys(this.labelWidgets).forEach((id) => {
      if (hiddenBuildings.indexOf(id) < 0) {
        this.labelWidgets[id]["destroy"]();
        delete this.labelWidgets[id];
      }
    });

    hiddenBuildings
      .filter((id) => !this.labelWidgets[id])
      .forEach((id) => {
        const widgetNode = document.createElement("div");
        this.labelContainer.appendChild(widgetNode);
        this.labelWidgets[id] = new Label({
          id,
          handleLabelClick: this.handleLabelClick
        }, widgetNode)
      });
  }

  handleLabelClick(id: string) {
    this.mapMain.unhideBuilding(id);
  }
}

export default AppBody;
