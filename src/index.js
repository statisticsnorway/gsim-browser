import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import 'react-table/react-table.css'
import 'react-datepicker/dist/react-datepicker.css'

import App from './pages/App'

const properties = {
  name: 'GSIM',
  producer: 'GSIM',
  endpoint: process.env.REACT_APP_LDS,
  namespace: 'ns/',
  route: '/gsim/',
  languageCode: 'en',
  specialFeatures: true,
  user: 'Test'
}

ReactDOM.render(
  <BrowserRouter>
    <App {...properties} />
  </BrowserRouter>,
  document.getElementById('root')
)
