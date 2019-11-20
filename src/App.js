import React, { Component } from 'react';
import './App.css';
import DeckGL from '@deck.gl/react';
import {COORDINATE_SYSTEM, OrbitView} from '@deck.gl/core';
import {PathLayer} from '@deck.gl/layers';
import {implicitCoordinates} from './data/take3'
import {explicitCoordinates} from './data/explicittake3'
const INITIAL_VIEW_STATE = {
  target: [0, 0, 0],
  rotationX: 0,
  rotationOrbit: 0,
  orbitAxis: 'Y',
  fov: 50,
  minZoom: 0,
  maxZoom: 10,
  zoom: 5
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewState: INITIAL_VIEW_STATE,
      coordinates: [implicitCoordinates,explicitCoordinates]
    };

    this._onViewStateChange = this._onViewStateChange.bind(this);
  }

  _onViewStateChange({viewState}) {
    this.setState({viewState});
  }

  render() {
    const { coordinates, viewState} = this.state
    const layers = [
      new PathLayer({
        id: 'drone-path-layer',
        data: coordinates,
        getPath: d => d.position,
        getWidth: 2,
        widthMinPixels: 2,
        widthMaxPixels: 2,
        sizeUnits: 'pixels',
        getColor: d => d.color,
        onHover: ({object, x, y}) => {
          const tooltip = `${x} ${y}`;
        },
        coordinateSystem: COORDINATE_SYSTEM.IDENTITY,
        positionFormat: 'XYZ',
        miterLimit: 10,
        billboard: true,
      })
    ];

    return (
      <div className="App">
        <header className="App-header">
          <DeckGL
            views={new OrbitView()}
            viewState={viewState}
            controller={true}
            onViewStateChange={this._onViewStateChange}
            layers={layers}
            parameters={{
              clearColor: [0.5, 0.5, 0.5, 1]
            }}
          />
        </header>
      </div>
    );
  }

}

export default App;
