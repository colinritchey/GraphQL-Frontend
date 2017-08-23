import React from 'react'
import { Link } from 'react-router-dom'
import Post from '../Post/Post'
import AddPost from './AddPost/AddPost'
import { gql, graphql } from 'react-apollo'
import './styles.css'

class ListPage extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.props.data.refetch()
    }
  }

  render() {
    if (this.props.data.loading) {
      return (
        <div className='loading'>
          <div>
            Loading
            (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})
          </div>
        </div>
      )
    }

    // let blurClass = ''
    //
    // if (this.props.location.pathname !== '/') {
    //   blurClass = ' blur'
    // }

    return (
      <div className='listPage-container'>
        <div className='post-list'>
          <AddPost />
          {this.props.data.allPosts.map(post => (
            <Post
              key={post.id}
              post={post}
              refresh={() => this.props.data.refetch()}
            />
          ))}
        </div>
        {this.props.children}
      </div>
    )
  }
}

const FeedQuery = gql`query allPosts {
  allPosts(orderBy: createdAt_DESC) {
    id
    imageUrl
    description
  }
}`

const ListPageWithData = graphql(FeedQuery, {
  options: {
    fetchPolicy: 'network-only'
  },
})(ListPage)

export default ListPageWithData
