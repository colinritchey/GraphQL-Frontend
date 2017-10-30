import React from 'react';
import { withRouter } from 'react-router-dom'
import { gql, graphql } from 'react-apollo'

import './styles.less'

class CreateCity extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      imageUrl: '',
      description: ''
    }
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
