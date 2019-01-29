import React from "react";

import WebScene from "esri/WebScene";
import SceneView from "esri/views/SceneView";
import SceneLayer from "esri/layers/SceneLayer";

interface MapMainProps {
  hiddenBuildings: string[];
  handleHideBuilding: (id: string) => void;
}

interface MapMainState {
  sceneLayer: __esri.Layer;
}

export default class MapMain extends React.Component<MapMainProps, MapMainState> {
  mapContainer: HTMLElement | null;

  constructor(props: MapMainProps) {
    super(props);
  }

  public render() {
    return (
      <main
        ref={(container) => this.mapContainer = container}
        className="column-17 map-container"
      />
    );
  }

  public componentDidMount() {
    const webscene = new WebScene({
      portalItem: {
        id: "10ede348e4c54c77b45f6ebab2d018db"
      }
    });

    const view = new SceneView({
      container: this.mapContainer as HTMLDivElement,
      map: webscene
    });

    webscene.when(() => {
      this.setState({
        sceneLayer: webscene.layers.find(function(l) {
          return l.title === "Buildings";
        })
      });

      view.on("click", (event) => {
        view.hitTest(event)
          .then((response) => {
            var graphic = response.results[0].graphic;
            if (graphic && graphic.layer.title === "Buildings") {
              this.props.handleHideBuilding(graphic.attributes.OBJECTID);
            }
          });
      });
    });
  }

  public componentWillReceiveProps(nextProps: MapMainProps) {
    if (this.props.hiddenBuildings !== nextProps.hiddenBuildings) {
      this.updateDefinitionExpression(nextProps.hiddenBuildings);
    }
  }

  private updateDefinitionExpression(hiddenBuildings: string[]) {
    let expr;
    if (hiddenBuildings.length > 0) {
      expr = `OBJECTID NOT IN (${hiddenBuildings.join(",")})`;
    } else {
      expr = "";
    }
    this.state.sceneLayer.set("definitionExpression", expr);
  }
}