import React, { Component } from 'react'
import { Container, Header, Icon } from 'semantic-ui-react'

import { MESSAGES } from '../utilities/Enum'

class NotFound extends Component {
  render () {
    const {languageCode, location} = this.props

    return (
      <Container textAlign='center'>
        <Icon name='eye slash outline' color='red' size='massive' circular />
        <Header as='h1' content={MESSAGES.SORRY[languageCode]}
                subheader={MESSAGES.PAGE_NOT_FOUND[languageCode] + ' \'' + location.pathname + '\''}
        />
      </Container>
    )
  }
}

export default NotFound
