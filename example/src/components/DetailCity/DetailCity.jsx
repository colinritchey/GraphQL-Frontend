import React from 'react'
import { gql, graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import GoogleApiWrapper from '../MapContainer/MapContainer'
import './styles.css';

class DetailCity extends React.Component {
  constructor(props){
    super(props);
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
          <GoogleApiWrapper/>
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
