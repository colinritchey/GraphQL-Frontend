import React from 'react'
import { Link } from 'react-router-dom'
import { gql, graphql } from 'react-apollo'
import {withRouter} from 'react-router-dom'
import './styles.css';

class DetailPost extends React.Component {
  // constructor(props){
  //   super(props);
  // }


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
      const {Post} = this.props.data

      let addOn = '';
      // debugger;

      if(!Post.imageUrl.includes('http://bit.ly')){
        addOn = '.jpg'
      }

      return (
        <div className='post-container'>
          <img
            className='detailpost-image'
            style={{
              backgroundImage: `url(${Post.imageUrl}${addOn})`
            }}

            />
          <div className='post-description'>
            {Post.description}
          </div>
        </div>
      )
    }
  }
  //<span className='red f6 pointer dim' onClick={this.handleDelete}>Delete</span>

  // not currently used.
  // handleDelete = async () => {
  //   await this.props.mutate({variables: {id: this.props.post.id}})
  //   this.props.history.replace('/')
  // }
}

// const deleteMutation = gql`
//   mutation deleteDetailPost($id: ID!) {
//     deleteDetailPost(id: $id) {
//       id
//     }
//   }
// `

const PostQuery = gql`
  query post($id: ID!) {
    Post(id: $id) {
      id
      imageUrl
      description
    }
  }
`

// update w/ react-router v4 url params api
//
// see documentation on computing query variables from props in wrapper
// http://dev.apollodata.com/react/queries.html#options-from-props
const DetailPostWithData = graphql(PostQuery, {
  options: ({match}) => ({
    variables: {
      id: match.params.id,
    },
  }),
})(DetailPost)

// const DetailPostWithDelete = graphql(deleteMutation)(DetailPostWithData)

export default withRouter(DetailPostWithData)
