import React from 'react'
import { Link } from 'react-router-dom'
import { gql, graphql } from 'react-apollo'
import './styles.css';

class City extends React.Component {

  render() {
    let addOn = '';

    // if(!this.props.city.image.includes('http://bit.ly')){
    //   addOn = '.jpg'
    // }

    return (
      <Link
        className='city-link-item'
        to={`/city/${this.props.city.id}`}
      >
        <img
          className='city-image'
          style={{
            backgroundImage: `url(${this.props.city.image}${addOn})`
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

const deleteMutation = gql`
  mutation deleteCity($id: ID!) {
    deleteCity(id: $id) {
      id
    }
  }
`

const CityWithMutation = graphql(deleteMutation)(City)

export default City
