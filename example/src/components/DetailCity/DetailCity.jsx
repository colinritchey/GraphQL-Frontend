import React from 'react'
import { gql, graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import GoogleApiWrapper from '../MapContainer/MapContainer'
import Spot from './Spot/Spot'
import { LocationItem } from './LocationItem/LocationItem';
import './styles.css';

class DetailCity extends React.Component {
  constructor(props){
    super(props);
    this.state = { currentMarker: null }
    this.selectMarker = this.selectMarker.bind(this);
  }

  selectMarker(id){
    this.setState({ currentMarker: id });
  }

  render() {
    if (this.props.data.loading) {
      return (
        <div className='flex w-100 h-100 items-center justify-center pt7'>
          <div>
            Loading
          </div>
        </div>
      )
    } else {
      const { City } = this.props.data

      return (
        <div className='city-container'>
          <div className='city-description'>
            {City.name}
          </div>
          <div className='map-spot-container'>
            <GoogleApiWrapper
              markers={City.spots}
              marker={this.state.currentMarker}
              selectMarker={this.selectMarker}/>
            <Spot spot={this.state.currentMarker}/>
          </div>
          <div className='city-location-list'>
            {City.spots.map((el) =>
              <LocationItem key={el.id} location={el}/>
            )}
          </div>
        </div>
      )
    }
  }

}

const CityQuery = gql`
  query city($id: ID!) {
    City(id: $id) {
      id
      image
      name
      description
      spots {
        id
        name
        image
        prices
        latitude
        longitude
      }
    }
  }
`

const DetailCityWithData = graphql(CityQuery, {
  options: ({match}) => ({
    variables: {
      id: match.params.id,
    },
  }),
})(DetailCity)

export default withRouter(DetailCityWithData)
