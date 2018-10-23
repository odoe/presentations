import MapView from "esri/views/MapView";
import Widget from "esri/widgets/Widget";

import WebMapShowcaseViewModel from "./WebMapShowcaseViewModel";

import { aliasOf, declared, property, subclass } from "esri/core/accessorSupport/decorators";
import { accessibleHandler, renderable, tsx } from "esri/widgets/support/widget";

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

    return (
      <div class={CSS.infoCard}>
        <div
          class={CSS.itemControl}
          bind={this}
          tabIndex={0}
          role="button"
          onclick={this._toggleWebMap}
          onkeydown={this._toggleWebMap}
        >
          <img alt={active.title} class={CSS.thumbnail} src={active.thumbnailUrl} />
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

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  @accessibleHandler()
  private _toggleWebMap(): void {
    this.viewModel.next();
    this.scheduleRender();
  }
}

export default WebMapShowcase;
