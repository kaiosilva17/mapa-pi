import React, { Component } from 'react';
import { render } from 'react-dom';

import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import { fromLonLat } from 'ol/proj'
import {OSM} from 'ol/source.js';
import { Style, Stroke, Fill } from 'ol/style'
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import Feature from 'ol/Feature'
import { Polygon } from 'ol/geom'

import datageo from './data'

const COORD_SYSTEM_GPS = 'EPSG:4326';
const COORD_SYSTEM_OSM = 'EPSG:3857';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  map

  styled = (color = 'blue') => {
    return [
      new Style({
        stroke: new Stroke({
          color,
          width: 3
        }),
        fill: new Fill({
          color: 'rgba(0, 0, 255, 0.2)'
        })
      })
    ]
  }

  componentDidMount () {
    const f =  new Feature({
      geometry: (new Polygon(datageo.utt.coordinates)).transform(COORD_SYSTEM_GPS, COORD_SYSTEM_OSM),
      setProperties: {
        name: 'bukton',
        test: 'asdasd'
      },
      lab: {
        test: 1
      }
    })
    f.setId(1)
    f.setStyle(this.styled('green'))
    var source = new VectorSource({
      features:  [
        f,
        new Feature({
          geometry: (new Polygon(datageo.bkk.coordinates)).transform(COORD_SYSTEM_GPS, COORD_SYSTEM_OSM)
        })//.setStyle(this.styled('red'))
      ]
    });

    var layer = new VectorLayer({
      source: source,
      style: this.styled()
    });

    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        layer
      ],
      target: 'map',
      view: new View({
        center: fromLonLat([100.4029452, 17.625163]),
        zoom: 7
      })
    });

    this.map.on('singleclick', event => {
      let features = this.map.getFeaturesAtPixel(event.pixel);
      if (features) {
        console.log(features[0].getProperties())
      }
    })
  }

  render() {
    return (
      <div id="map">
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
