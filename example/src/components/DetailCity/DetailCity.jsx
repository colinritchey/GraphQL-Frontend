import React from 'react'
import { Link } from 'react-router-dom'
import { gql, graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
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
      const {City} = this.props.data

      let addOn = '';

      // if(!City.imageUrl.includes('http://bit.ly')){
      //   addOn = '.jpg'
      // }
      console.log(City);
      return (
        <div className='city-container'>
          <img
            className='detailcity-image'
            style={{
              backgroundImage: `url(${City.image}${addOn})`
            }}

            />
          <div className='city-description'>
            {City.name}
          </div>
        </div>
      )
    }
  }

  // not currently used.
  // handleDelete = async () => {
  //   await this.props.mutate({variables: {id: this.props.city.id}})
  //   this.props.history.replace('/')
  // }
}

// const deleteMutation = gql`
//   mutation deleteDetailCity($id: ID!) {
//     deleteDetailCity(id: $id) {
//       id
//     }
//   }
// `

const CityQuery = gql`
  query city($id: ID!) {
    City(id: $id) {
      id
      image
      name
      description
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

// const DetailCityWithDelete = graphql(deleteMutation)(DetailCityWithData)

export default withRouter(DetailCityWithData)
