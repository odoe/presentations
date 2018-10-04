# Simple View Steps

## 1. Setup Basic Class

Open `CustomWidget.tsx` and add the following basic class to the empty file.

```tsx
/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import Widget = require("esri/widgets/Widget");

import { declared, subclass } from "esri/core/accessorSupport/decorators";

@subclass("esri.demo.CustomWidget")
class CustomWidget extends declared(Widget) {}

export = CustomWidget;
```

## 2. Add Lifecycle Section

```ts
//--------------------------------------------------------------------------
//
//  Lifecycle
//
//--------------------------------------------------------------------------

constructor() {
  super();
}
```

## 3. Add Render

Add the `render()` public method

```tsx
//--------------------------------------------------------------------------
//
//  Public Methods
//
//--------------------------------------------------------------------------

render() {
  return <div class="custom-widget">Hello World</div>;
}
```

Add tsx

```ts
import { tsx } from "esri/widgets/support/widget";
```

## 4. Setup Main

Open `main.ts` and setup the widget initialization.

First require the widget

```ts
import CustomWidget = require("./CustomWidget");
```

Then initialize the widget.

```ts
//----------------
//  widget setup
//----------------

const widget = new CustomWidget();

view.ui.add(widget, "top-right");
```

## Improving on CustomWidget

Lets add a property to our widget

```ts
//--------------------------------------------------------------------------
//
//  Properties
//
//--------------------------------------------------------------------------

@property()
@renderable()
enabled = false;
```

And then import renderable + property

```ts
import { renderable, tsx } from "esri/widgets/support/widget";
import { property, declared, subclass } from "esri/core/accessorSupport/decorators";
```

Modify our render method to contain a button that toggles a class

```tsx
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
```

Add CSS constant for JSX

```ts
const CSS = {
  base: "custom-widget",
  enabled: "custom-widget--enabled"
};
```

Add private method to handle event

```ts
//--------------------------------------------------------------------------
//
//  Private Methods
//
//--------------------------------------------------------------------------

private _toggle(): void {
  this.enabled = !this.enabled;
}
```

## Complete

We're done with this set of steps! Compile, view, and proceed to the [next steps](../4-updated-view/STEPS.md).
