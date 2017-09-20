import React from 'react'
import { Link } from 'react-router-dom'
// import { gql, graphql } from 'react-apollo'
import './styles.css';

class City extends React.Component {

  render() {

    return (
      <Link
        className='city-link-item'
        to={`/city/${this.props.city.id}`}
      >
        <img
          alt=''
          className='city-image'
          style={{
            backgroundImage: `url(${this.props.city.image})`
          }}
        />
        <div className='city-description'>
          {this.props.city.name}
        </div>
      </Link>
    )
  }

  // not currently used.
  // handleDelete = async () => {
  //   await this.props.mutate({variables: {id: this.props.city.id}})
  //   this.props.history.replace('/')
  // }
}

// const deleteMutation = gql`
//   mutation deleteCity($id: ID!) {
//     deleteCity(id: $id) {
//       id
//     }
//   }
// `
//
// const CityWithMutation = graphql(deleteMutation)(City)

export default City
