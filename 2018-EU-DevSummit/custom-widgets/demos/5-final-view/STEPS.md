# Final View Steps

Lastly, we're going to enhance the view to automatically go to the next webmap after a specified time.

## 1. Add postInitialize lifecycle method to change WebMap

```ts
postInitialize() {
  this.own(
    once(this, "viewModel.webMaps", () => {
      this._playing = true;

      const intervalId = setInterval(() => {
        if (!this._playing) {
          return;
        }

        this._currentTick++;

        if (this._currentTick === ticksToNext) {
          this._currentTick = 0;
          this.viewModel.next();
        }

        this.own({
          remove: () => clearInterval(intervalId)
        });

        this.scheduleRender();
      }, tickRateInMs);
    })
  );
}
```

Import `once` from `watchUtils` to handle the listener

```ts
import { once } from "esri/core/watchUtils";
```

Add variables for timing state

```ts
//--------------------------------------------------------------------------
//
//  Variables
//
//--------------------------------------------------------------------------

private _currentTick: number = 0;

private _playing: boolean = false;
```

Add constants for timing

```ts
const ticksToNext = 10;
const tickRateInMs = 1000;
```

This should autoplay now

## Modify image button to pause or play

Modify the itemControl node to call a different method, contain an icon and contain a countdown bar.

```tsx
<div
  class={CSS.itemControl}
  bind={this}
  tabIndex={0}
  role="button"
  title={buttonText}
  aria-label={buttonText}
  onclick={this._toggleCountdown}
  onkeydown={this._toggleCountdown}
>
  <span aria-hidden="true" class={this.classes(CSS.itemControlIcon, iconClasses)} />
  <img alt={active.title} class={CSS.thumbnail} src={active.thumbnailUrl} />
  {this.renderCountdownBar()}
</div>
```

Add constants for updated itemControl

```ts
const { _playing } = this;

const iconClasses = {
  [CSS.esriIconPlay]: !_playing,
  [CSS.esriIconPause]: _playing
};

const buttonText = _playing ? "Pause" : "Play";
```

Replace button method

```ts
@accessibleHandler()
private _toggleCountdown(): void {
  this._playing = !this._playing;
  this.scheduleRender();
}
```

Add render countdown bar

```tsx
protected renderCountdownBar() {
  const max = 100;
  const value = max - this._currentTick * (ticksToNext + 1);

  return <progress class={CSS.countdownBar} value={value} max={max} />;
}
```

## Complete

We're done with this set of steps! Woohoo!!
