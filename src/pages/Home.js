import React, { Component } from 'react'
import { Container, Divider, Header, Image } from 'semantic-ui-react'

import { UI } from '../utilities/Enum'

class Home extends Component {
  render () {
    const { languageCode, imageSource } = this.props

    return (
      <Container fluid textAlign='center'>
        <Header as='h1' content='GSIM Browser' subheader={UI.HOME[languageCode]} />
        <Divider hidden />
        <Image src={imageSource} centered />
      </Container>
    )
  }
}

export default Home
