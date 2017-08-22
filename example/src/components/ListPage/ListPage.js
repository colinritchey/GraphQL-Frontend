import React from 'react'
import { Link } from 'react-router-dom'
import Post from '../Post/Post'
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
          <Link
            to='/create'
            className='ma3 box new-post br2 flex flex-column items-center justify-center ttu fw6 f20 black-30 no-underline'
          >
            <img
              src={require('../../assets/plus.svg')}
              alt=''
              className='plus mb3'
            />
            <div>New Post</div>
          </Link>
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
