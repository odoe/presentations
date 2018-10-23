import Widget from "esri/widgets/Widget";

import { property, declared, subclass } from "esri/core/accessorSupport/decorators";

import { renderable, tsx } from "esri/widgets/support/widget";

const CSS = {
  base: "custom-widget",
  enabled: "custom-widget--enabled"
};

@subclass("esri.demo.CustomWidget")
class CustomWidget extends declared(Widget) {
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  constructor() {
    super();
  }

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  @property()
  @renderable()
  enabled = false;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  render() {
    const { enabled } = this;

    const rootClasses = {
      [CSS.enabled]: enabled
    };

    const text = enabled ? "Enabled" : "Disabled";

    return (
      <div bind={this} onclick={this._toggle} class={this.classes(CSS.base, rootClasses)}>
        {text}
      </div>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private _toggle(): void {
    this.enabled = !this.enabled;
  }
}

export default CustomWidget;
