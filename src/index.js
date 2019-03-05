import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'

import App from './pages/App'
import 'semantic-ui-css/semantic.min.css'
import 'react-table/react-table.css'
import 'react-datepicker/dist/react-datepicker.css'

import ApolloClient from "apollo-boost";
import {ApolloProvider} from "react-apollo";
import {AxiosProvider} from "react-axios";
import * as axios from "axios";

// TODO: This is too big.
let ldsURL, ldsDataURL, graphqlURL
  if (window._env_.REACT_APP_LDS === undefined) {
  ldsURL = 'http://localhost:9090/'
} else {
  ldsURL = window._env_.REACT_APP_LDS
  if (!ldsURL.endsWith('/')) {
    ldsURL = window._env_.REACT_APP_LDS + '/'
  }
}
if (window._env_.REACT_APP_LDS_DATA === undefined) {
  ldsDataURL = 'http://localhost:8080/'
} else {
  ldsDataURL = window._env_.REACT_APP_LDS_DATA
  if (!ldsURL.endsWith('/')) {
    ldsDataURL = window._env_.REACT_APP_LDS_DATA + '/'
  }
}
if (window._env_.REACT_APP_LDS_GRAPHQL === undefined) {
  graphqlURL = ldsURL + 'graphql'
} else {
  graphqlURL = window._env_.REACT_APP_LDS_GRAPHQL
  if (!ldsURL.endsWith('/')) {
    graphqlURL = window._env_.REACT_APP_LDS_GRAPHQL + '/'
  }
}

console.log("Environment is: ", window._env_)

const properties = {
  name: 'GSIM',
  producer: 'GSIM',
  endpoint: ldsURL,
  namespace: 'data/',
  route: '/gsim/',
  languageCode: 'en',
  specialFeatures: true,
  user: 'Test'
}

const client = new ApolloClient({
  uri: graphqlURL
});

const axiosInstance = axios.create({
  baseURL: ldsDataURL,
  timeout: -1
});

ReactDOM.render(
  <AxiosProvider instance={axiosInstance}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App {...properties} />
      </BrowserRouter>
    </ApolloProvider>
  </AxiosProvider>,
  document.getElementById('root')
)
