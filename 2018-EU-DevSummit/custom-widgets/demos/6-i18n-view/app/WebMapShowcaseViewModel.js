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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "esri/WebMap", "esri/portal/Portal", "esri/core/accessorSupport/decorators", "esri/core/Accessor"], function (require, exports, __extends, __decorate, WebMap, Portal, decorators_1, Accessor) {
    "use strict";
    var WebMapShowcaseViewModel = /** @class */ (function (_super) {
        __extends(WebMapShowcaseViewModel, _super);
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        function WebMapShowcaseViewModel(props) {
            var _this = _super.call(this) || this;
            //--------------------------------------------------------------------------
            //
            //  Properties
            //
            //--------------------------------------------------------------------------
            //----------------------------------
            //  active
            //----------------------------------
            _this.active = null;
            //----------------------------------
            //  portal
            //----------------------------------
            _this.portal = Portal.getDefault();
            //----------------------------------
            //  webMapGroupId
            //----------------------------------
            _this.webMapGroupId = "a09a1595fd944f17a47a244e67d804f9";
            //----------------------------------
            //  webMaps
            //----------------------------------
            _this.webMaps = null;
            //----------------------------------
            //  view
            //----------------------------------
            _this.view = null;
            _this._fetchWebMaps().then(function (webMaps) {
                _this._set("webMaps", webMaps);
                _this._setActive(webMaps[0]); // set first as active
            });
            return _this;
        }
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        WebMapShowcaseViewModel.prototype.next = function () {
            var webMaps = this.webMaps;
            var index = webMaps.indexOf(this.active) + 1;
            if (index === webMaps.length) {
                index = 0;
            }
            this._setActive(webMaps[index]);
        };
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        WebMapShowcaseViewModel.prototype._fetchWebMaps = function () {
            var _a = this, portal = _a.portal, webMapGroupId = _a.webMapGroupId;
            var webMapsFromGroupQuery = "group:" + webMapGroupId + " AND type:\"Web Map\" AND -type:\"Web Mapping Application\"";
            return portal
                .load()
                .then(function () {
                return portal.queryItems({
                    query: webMapsFromGroupQuery,
                    sortField: "num-views",
                    sortOrder: "desc"
                });
            })
                .then(function (queryResults) { return queryResults.results; });
        };
        WebMapShowcaseViewModel.prototype._setActive = function (portalItem) {
            var view = this.view;
            this._set("active", portalItem);
            var webMap = new WebMap({ portalItem: portalItem });
            webMap.when(function () { return (view.viewpoint = webMap.initialViewProperties.viewpoint); });
            view.map = webMap;
        };
        __decorate([
            decorators_1.property({ readOnly: true })
        ], WebMapShowcaseViewModel.prototype, "active", void 0);
        __decorate([
            decorators_1.property()
        ], WebMapShowcaseViewModel.prototype, "portal", void 0);
        __decorate([
            decorators_1.property()
        ], WebMapShowcaseViewModel.prototype, "webMapGroupId", void 0);
        __decorate([
            decorators_1.property({ readOnly: true })
        ], WebMapShowcaseViewModel.prototype, "webMaps", void 0);
        __decorate([
            decorators_1.property()
        ], WebMapShowcaseViewModel.prototype, "view", void 0);
        WebMapShowcaseViewModel = __decorate([
            decorators_1.subclass("esri.demo.WebMapShowcaseViewModel")
        ], WebMapShowcaseViewModel);
        return WebMapShowcaseViewModel;
    }(decorators_1.declared(Accessor)));
    return WebMapShowcaseViewModel;
});
//# sourceMappingURL=WebMapShowcaseViewModel.js.map