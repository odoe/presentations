/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "esri/widgets/Widget", "./WebMapShowcaseViewModel", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "esri/core/watchUtils"], function (require, exports, __extends, __decorate, Widget, WebMapShowcaseViewModel, decorators_1, widget_1, watchUtils_1) {
    "use strict";
    var CSS = {
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
    var ticksToNext = 10;
    var tickRateInMs = 1000;
    var WebMapShowcase = /** @class */ (function (_super) {
        __extends(WebMapShowcase, _super);
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        function WebMapShowcase(props) {
            var _this = _super.call(this) || this;
            //--------------------------------------------------------------------------
            //
            //  Variables
            //
            //--------------------------------------------------------------------------
            _this._currentTick = 0;
            _this._playing = false;
            //--------------------------------------------------------------------------
            //
            //  Properties
            //
            //--------------------------------------------------------------------------
            //----------------------------------
            //  view
            //----------------------------------
            _this.view = null;
            //----------------------------------
            //  viewModel
            //----------------------------------
            _this.viewModel = new WebMapShowcaseViewModel();
            return _this;
        }
        WebMapShowcase.prototype.postInitialize = function () {
            var _this = this;
            this.own(watchUtils_1.once(this, "viewModel.webMaps", function () {
                _this._playing = true;
                var intervalId = setInterval(function () {
                    if (!_this._playing) {
                        return;
                    }
                    _this._currentTick++;
                    if (_this._currentTick === ticksToNext) {
                        _this._currentTick = 0;
                        _this.viewModel.next();
                    }
                    _this.own({
                        remove: function () { return clearInterval(intervalId); }
                    });
                    _this.scheduleRender();
                }, tickRateInMs);
            }));
        };
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        WebMapShowcase.prototype.render = function () {
            var active = this.viewModel.active;
            return (widget_1.tsx("div", { class: this.classes(CSS.esriWidget, CSS.root) }, active ? this.renderContent() : this.renderLoader()));
        };
        //--------------------------------------------------------------------------
        //
        //  Protected Methods
        //
        //--------------------------------------------------------------------------
        WebMapShowcase.prototype.renderContent = function () {
            return (widget_1.tsx("div", { class: CSS.panel, key: "content" }, this.renderInfoCard()));
        };
        WebMapShowcase.prototype.renderInfoCard = function () {
            var _a;
            var active = this.viewModel.active;
            var _playing = this._playing;
            var iconClasses = (_a = {},
                _a[CSS.esriIconPlay] = !_playing,
                _a[CSS.esriIconPause] = _playing,
                _a);
            var buttonText = _playing ? "Pause" : "Play";
            return (widget_1.tsx("div", { class: CSS.infoCard },
                widget_1.tsx("div", { class: CSS.itemControl, bind: this, tabIndex: 0, role: "button", title: buttonText, "aria-label": buttonText, onclick: this._toggleCountdown, onkeydown: this._toggleCountdown },
                    widget_1.tsx("span", { "aria-hidden": "true", class: this.classes(CSS.itemControlIcon, iconClasses) }),
                    widget_1.tsx("img", { alt: active.title, class: CSS.thumbnail, src: active.thumbnailUrl }),
                    this.renderCountdownBar()),
                widget_1.tsx("h1", { class: this.classes(CSS.esriHeader, CSS.header) }, this.renderLink()),
                widget_1.tsx("div", { class: CSS.modifiedDate },
                    "Last updated ",
                    active.modified.toLocaleString()),
                widget_1.tsx("div", { class: CSS.description, innerHTML: active.description })));
        };
        WebMapShowcase.prototype.renderLink = function () {
            var active = this.viewModel.active;
            var itemDetailsURL = active.portal.url + "/home/item.html?id=" + active.id;
            return (widget_1.tsx("a", { class: CSS.link, href: itemDetailsURL, target: "_blank" }, active.title));
        };
        WebMapShowcase.prototype.renderLoader = function () {
            return widget_1.tsx("div", { class: CSS.loader, key: "loader" });
        };
        WebMapShowcase.prototype.renderCountdownBar = function () {
            var max = 100;
            var value = max - this._currentTick * (ticksToNext + 1);
            return widget_1.tsx("progress", { class: CSS.countdownBar, value: value, max: max });
        };
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        WebMapShowcase.prototype._toggleCountdown = function () {
            this._playing = !this._playing;
            this.scheduleRender();
        };
        __decorate([
            decorators_1.aliasOf("viewModel.view")
        ], WebMapShowcase.prototype, "view", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable(["active"])
        ], WebMapShowcase.prototype, "viewModel", void 0);
        __decorate([
            widget_1.accessibleHandler()
        ], WebMapShowcase.prototype, "_toggleCountdown", null);
        WebMapShowcase = __decorate([
            decorators_1.subclass("esri.demo.WebMapShowcase")
        ], WebMapShowcase);
        return WebMapShowcase;
    }(decorators_1.declared(Widget)));
    return WebMapShowcase;
});
//# sourceMappingURL=WebMapShowcase.js.map