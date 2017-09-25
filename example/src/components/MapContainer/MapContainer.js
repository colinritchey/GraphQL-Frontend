import React from 'react';
import { GoogleMap, Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

import './styles.css';

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      markers: this.props.markers
    }

    // binding this to event-handler functions
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  render() {
    let firstMarker = this.state.markers[0];

    return (
      <div className='google-map'>
        <Map
            google={this.props.google}
            onClick={this.onMapClicked}
            center={{ lat: firstMarker.latitude, lng: firstMarker.longitude }}>

          {this.state.markers.map((m) => {
            return(
              <Marker
                key={m.id}
                position={{ lat: m.latitude, lng: m.longitude }}
                onClick={this.onMarkerClick}
                name={m.name} />
            )
          })}

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
              <div>
                <h1>{this.state.selectedPlace.name}</h1>
              </div>
          </InfoWindow>
        </Map>
      </div>
    )
  }
};

export default GoogleApiWrapper({
  apiKey: ('AIzaSyC67HaF2VUq0TheleP2gGF1-7QDvoivHiY')
})(MapContainer)
