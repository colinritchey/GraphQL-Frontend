import React from 'react';
import { withRouter } from 'react-router-dom'
import { gql, graphql } from 'react-apollo'

import './styles.css'

class CreateCity extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      imageUrl: '',
      description: ''
    }
  }

  handleCity = async () => {
    const {description, imageUrl} = this.state
    await this.props.addCity({variables: {description, imageUrl}})

  }

  render(){
    let imageLink = this.state.imageUrl !== '' ? `${this.state.imageUrl}.jpg` :
      require('./placeholder.png');

    return (
      <div className='create-container'>
        <img
          alt=''
          src={imageLink}
        />

        <label value='Image'>Image Link:
          <input
            type='text'
            value={this.state.imageUrl}
            onChange={(e) => this.setState({imageUrl: e.target.value})}
          />
        </label>


        <label>Description:
          <input
            type='text'
            value={this.state.description}
            onChange={(e) => this.setState({description: e.target.value})}
            />
        </label>

        <a
          className='submit-button'
          onClick={this.handleCity}>Submit</a>

      </div>
    )
  }
}



const addMutation = gql`
  mutation addCity($description: String!, $imageUrl: String!) {
    createCity(description: $description, image: $imageUrl) {
      id
      description
      image
    }
  }
`

const PageWithMutation = graphql(addMutation, {name: 'addCity'})(CreateCity)

export default withRouter(PageWithMutation)