import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import ListPage from './components/ListPage/ListPage'
import CreatePost from './components/CreatePost/CreatePost'

import {BrowserRouter as Router, Route} from 'react-router-dom'
import {ApolloProvider, createNetworkInterface, ApolloClient} from 'react-apollo'

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

const networkInterface = createNetworkInterface({
// __SIMPLE_API_ENDPOINT__ looks similar to: `https://api.graph.cool/simple/v1/<PROJECT_ID>`
  uri: 'https://api.graph.cool/simple/v1/cj4sy952g35gv0179y4icnvaq'
})

const client = new ApolloClient({networkInterface})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <div className='main-container'>
        <Route exact path='/' component={ListPage} />
        <Route exact path='/create' component={CreatePost} />
      </div>
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
)
