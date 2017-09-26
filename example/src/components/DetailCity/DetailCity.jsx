import React from 'react'
import { gql, graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import GoogleApiWrapper from '../MapContainer/MapContainer'
import Spot from './Spot/Spot'
import './styles.css';

class DetailCity extends React.Component {
  constructor(props){
    super(props);
    this.state = { currentMarker: null }
    this.selectMarker = this.selectMarker.bind(this);
  }

  selectMarker(id){
    this.setState({ currentMarker: id });
    console.log('current: ', this.state.currentMarker);
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
          <div className='map-spot-container'>
            <GoogleApiWrapper
              markers={City.spots}
              selectMarker={this.selectMarker}/>
            <Spot spot={this.state.currentMarker}/>
          </div>
          <img
            alt=''
            className='detailcity-image'
            style={{
              backgroundImage: `url(${City.image})`
            }}

            />
          <div className='city-description'>
            {City.name}
          </div>
          {City.spots.map((el) => <div key={el.id}>{el.name}</div>)}
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
