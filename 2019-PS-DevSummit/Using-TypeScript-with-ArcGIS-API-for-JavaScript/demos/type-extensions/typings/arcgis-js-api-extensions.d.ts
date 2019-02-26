declare namespace __esri {
  // A typed version of the ElevationQueryResult
  export interface ElevationQueryResultTyped<T extends (Point | Multipoint | Polyline)> extends ElevationQueryResult {
    geometry: T;
  }

  export interface Ground {
    // Override the queryElevation signature to specialize the return type for the
    // input type.
    queryElevation(geometry: Point, options?: GroundQueryElevationOptions): IPromise<ElevationQueryResultTyped<Point>>;
    queryElevation(geometry: Multipoint, options?: GroundQueryElevationOptions): IPromise<ElevationQueryResultTyped<Multipoint>>;
    queryElevation(geometry: Polyline, options?: GroundQueryElevationOptions): IPromise<ElevationQueryResultTyped<Polyline>>;
  }
}