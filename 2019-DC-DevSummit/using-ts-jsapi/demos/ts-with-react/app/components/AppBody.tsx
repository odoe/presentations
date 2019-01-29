import React from "react";

import MapMain from "./MapMain";
import Label from "./Label";

interface AppBodyProps {}

interface AppBodyState {
  hiddenBuildings: string[];
}

export default class AppBody extends React.Component<AppBodyProps, AppBodyState> {
  constructor(props: AppBodyProps) {
    super(props);

    this.state = {
      hiddenBuildings: []
    };

    this.handleLabelClick = this.handleLabelClick.bind(this);
    this.handleHideBuilding = this.handleHideBuilding.bind(this);
    this.unmaskAll = this.unmaskAll.bind(this);
  }

  public render() {
    return (
      <div>
        <header className="top-nav fade-in">
          <div className="grid-container">
            <div className="column-24">
              <div className="tablet-hide">
                <a href="https://developers.arcgis.com/javascript/latest/guide/typescript-setup/index.html" className="top-nav-title">ArcGIS JS API 4.x App</a>
                <nav className="top-nav-list" role="navigation" aria-labelledby="topnav">
                  <a className="top-nav-link" href="https://www.typescriptlang.org/docs/home.html">Using TypeScript & React</a>
                </nav>

                <nav className="class-top-nav-list right" role="navigation" aria-labelledby="usernav">
                  <a className="top-nav-link icon-ui-experimental margin-left-1" href="https://github.com/nicksenger/2018-TS-DS">Repository</a>
                </nav>
              </div>
            </div>
          </div>
        </header>
        <div className="grid-container leader-1 trailer-1">
          <div className="column-6">
            <aside className="side-nav">
              <h4 className="side-nav-title">
                Masked Features
                <a
                  data-dojo-attach-point="unmaskAllBtn"
                  className="font-size--2 unmask-all-btn"
                  style={{
                    display: this.state.hiddenBuildings.length > 0 ? "inline-block" : "none"
                  }}
                  onClick={this.unmaskAll}
                >
                  Unmask All
                </a>
              </h4>
              <div
                className="padding-leader-half padding-trailer-half padding-left-half padding-right-half label-container"
              >
                {this.state.hiddenBuildings.map((building) => (
                    <Label
                      key={building}
                      id={building}
                      handleLabelClick={this.handleLabelClick}
                      title={"Unmask Feature"}
                    />
                ))}
              </div>
            </aside>
          </div>
          <MapMain
            hiddenBuildings={this.state.hiddenBuildings}
            handleHideBuilding={this.handleHideBuilding}
          />
        </div>
      </div>
    );
  }

  public handleLabelClick(id: string) {
    this.setState({
      hiddenBuildings: this.state.hiddenBuildings
        .filter((buildingId) => buildingId !== id)
    });
  }

  public handleHideBuilding(id: string) {
    this.setState({
      hiddenBuildings: this.state.hiddenBuildings.concat([id])
    });
  }

  private unmaskAll() {
    this.setState({
      hiddenBuildings: []
    });
  }
}