import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';

import ListPage from './components/ListPage/ListPage'
import CreateCity from './components/CreateCity/CreateCity'
import DetailCity from './components/DetailCity/DetailCity'

import {BrowserRouter as Router, Route} from 'react-router-dom'
import {ApolloProvider, createNetworkInterface, ApolloClient} from 'react-apollo'

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj4sy952g35gv0179y4icnvaq'
})

const client = new ApolloClient({networkInterface})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <div className='main-container'>
        <Route exact path='/' component={ListPage} />
        <Route exact path='/create' component={CreateCity} />
        <Route exact path='/city/:id' component={DetailCity} />
      </div>
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
)
