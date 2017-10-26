# Coffee Shop Finder

This project has a curated list of coffee shops in certain cities and displays details such as location, rating, and pricing. An interactive chart is shown on the main page to display the average pricing per city.

### Technologies

React, GraphQL, D3

This is a single page application that queries data from a service called GraphCool. These queries demonstrates the utility of GraphQL and said data is bind to the React Components with the ApolloClient.

Example GraphQL query:

```javascript
const CityQuery = gql`
  query city($id: ID!) {
    City(id: $id) {
      id
      image
      name
      description
      spots {
        id
        name
        image
        prices
        latitude
        longitude
      }
    }
  }
`
```
