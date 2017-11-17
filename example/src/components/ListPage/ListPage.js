import React from 'react'

import City from '../City/City'
import AddCity from './AddCity/AddCity'
import BarChart from '../BarChart/BarChart'

import { gql, graphql } from 'react-apollo'
import './styles.less'

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
          <div className='city-list'>
            {this.props.data.allCities.map(city => (
              <City
                key={city.id}
                city={city}
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

const FeedQuery = gql`query allCities {
  allCities(orderBy: createdAt_DESC) {
    id
    image
    name
    description
  }
}`

const ListPageWithData = graphql(FeedQuery, {
  options: {
    fetchPolicy: 'network-only'
  },
})(ListPage)

export default ListPageWithData
