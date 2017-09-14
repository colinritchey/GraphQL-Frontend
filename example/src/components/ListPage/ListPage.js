import React from 'react'
import { Link } from 'react-router-dom'

import Post from '../Post/Post'
import AddPost from './AddPost/AddPost'
import BarChart from '../BarChart/BarChart'

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
          </div>
        </div>
      )
    }

    return (
      <div>
        <div className='barchart'>
          <BarChart data={[5,10,1,3]} size={[300,300]} />
        </div>

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
