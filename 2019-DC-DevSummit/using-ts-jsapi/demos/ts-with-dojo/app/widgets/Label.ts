import _WidgetBase from "dijit/_WidgetBase";
import _TemplatedMixin from "dijit/_TemplatedMixin";
import template from "dojo/text!./templates/Label.html";

import declare from "../_utils/declareDecorator";

interface LabelParams {
  id: string
  handleLabelClick: (id: string) => void;
}

interface Label extends _WidgetBase, _TemplatedMixin {}

@declare(_WidgetBase, _TemplatedMixin)
class Label {
  params: LabelParams;
  templateString: string = template;
  label: HTMLElement;

  constructor(params: LabelParams, container: string | HTMLElement) {
    this.params = params;
  }

  postCreate() {
    this.label.addEventListener("click", () => {
      this.params.handleLabelClick(this.params.id);
    });
  }
}

export default Label;
