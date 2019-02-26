/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />

import { subclass, property, declared } from "esri/core/accessorSupport/decorators";

import * as promiseUtils from "esri/core/promiseUtils";
import BaseElevationLayer from "esri/layers/BaseElevationLayer";
import ElevationLayer from "esri/layers/ElevationLayer";

@subclass()
export class ExaggerationElevationLayer extends declared(BaseElevationLayer) {

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  constructor(obj?: ConstructProperties) {
    super();
  }

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------
  
  //----------------------------------
  //  elevationLayer
  //----------------------------------

  @property({ constructOnly: true })
  readonly elevationLayer: ElevationLayer;

  //----------------------------------
  //  exaggerationFactor
  //----------------------------------

  @property({ constructOnly: true })
  readonly exaggerationFactor: number | ((level: number) => number);

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  fetchTile(level: number, row: number, col: number) {
    return this._fetchTile(level, row, col) as any;
  }

  //--------------------------------------------------------------------------
  //
  //  Private methods
  //
  //--------------------------------------------------------------------------

  private async _fetchTile(level: number, row: number, col: number) {
    // Make sure the underlying layer is loaded
    try {
      await this.elevationLayer.load();
    }
    catch (err) {
      console.error("Failed to load layer", err);
      throw err;
    }

    // Fetch the tile
    const data = await this.elevationLayer.fetchTile(level, row, col);

    const multiplier = (
        typeof this.exaggerationFactor === "function"
      ? this.exaggerationFactor(level)
      : this.exaggerationFactor || 1
    );

    for (var i = 0; i < data.values.length; i++) {
      data.values[i] *= multiplier;
    }

    return data;
  }
}

interface ConstructProperties {
  elevationLayer: ElevationLayer;
  exaggerationFactor?: number | ((level: number) => number);
}

export default ExaggerationElevationLayer;
