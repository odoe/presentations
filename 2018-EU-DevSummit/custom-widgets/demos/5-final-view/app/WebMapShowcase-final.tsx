import MapView from "esri/views/MapView";
import Widget from "esri/widgets/Widget";

import WebMapShowcaseViewModel from "./WebMapShowcaseViewModel";

import { aliasOf, declared, property, subclass } from "esri/core/accessorSupport/decorators";
import { accessibleHandler, renderable, tsx } from "esri/widgets/support/widget";

import { once } from "esri/core/watchUtils";

const CSS = {
  root: "esri-webmap-showcase",
  header: "esri-webmap-showcase__header",
  infoCard: "esri-webmap-showcase__info-card",
  link: "esri-webmap-showcase__link",
  modifiedDate: "esri-webmap-showcase__modified-date",

  panel: "esri-webmap-showcase__panel",
  itemControl: "esri-webmap-showcase__item-control",
  itemControlIcon: "esri-webmap-showcase__item-control-icon",
  thumbnail: "esri-webmap-showcase__thumbnail",
  description: "esri-webmap-showcase__description",

  loader: "esri-webmap-showcase__loader",
  countdownBar: "esri-webmap-showcase__countdown-bar",

  // common
  esriWidget: "esri-widget",
  esriHeader: "esri-widget__header",
  esriIconPlay: "esri-icon-play",
  esriIconPause: "esri-icon-pause"
};

interface WebMapShowcaseProperties {
  view: MapView;
}

const ticksToNext = 10;
const tickRateInMs = 1000;

@subclass("esri.demo.WebMapShowcase")
class WebMapShowcase extends declared(Widget) {
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  constructor(props: WebMapShowcaseProperties) {
    super();
  }

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

  //--------------------------------------------------------------------------
  //
  //  Variables
  //
  //--------------------------------------------------------------------------

  private _currentTick: number = 0;

  private _playing: boolean = false;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  //----------------------------------
  //  view
  //----------------------------------

  @aliasOf("viewModel.view") view: MapView = null;

  //----------------------------------
  //  viewModel
  //----------------------------------

  @property()
  @renderable(["active"])
  viewModel: WebMapShowcaseViewModel = new WebMapShowcaseViewModel();

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  render() {
    const { active } = this.viewModel;

    return (
      <div class={this.classes(CSS.esriWidget, CSS.root)}>
        {active ? this.renderContent() : this.renderLoader()}
      </div>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Protected Methods
  //
  //--------------------------------------------------------------------------

  protected renderContent() {
    return (
      <div class={CSS.panel} key="content">
        {this.renderInfoCard()}
      </div>
    );
  }

  protected renderInfoCard() {
    const { active } = this.viewModel;

    const { _playing } = this;

    const iconClasses = {
      [CSS.esriIconPlay]: !_playing,
      [CSS.esriIconPause]: _playing
    };

    const buttonText = _playing ? "Pause" : "Play";

    return (
      <div class={CSS.infoCard}>
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

        <h1 class={this.classes(CSS.esriHeader, CSS.header)}>{this.renderLink()}</h1>

        <div class={CSS.modifiedDate}>Last updated {active.modified.toLocaleString()}</div>

        <div class={CSS.description} innerHTML={active.description} />
      </div>
    );
  }

  protected renderLink() {
    const { active } = this.viewModel;
    const itemDetailsURL = `${active.portal.url}/home/item.html?id=${active.id}`;

    return (
      <a class={CSS.link} href={itemDetailsURL} target="_blank">
        {active.title}
      </a>
    );
  }

  protected renderLoader() {
    return <div class={CSS.loader} key="loader" />;
  }

  protected renderCountdownBar() {
    const max = 100;
    const value = max - this._currentTick * (ticksToNext + 1);

    return <progress class={CSS.countdownBar} value={value} max={max} />;
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  @accessibleHandler()
  private _toggleCountdown(): void {
    this._playing = !this._playing;
    this.scheduleRender();
  }
}

export default WebMapShowcase;
