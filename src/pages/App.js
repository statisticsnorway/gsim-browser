import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import {
  Checkbox,
  Container,
  Dropdown,
  Flag,
  Icon,
  Input,
  Label,
  Menu,
  Message,
  Popup,
  Segment
} from 'semantic-ui-react'

import { SchemaHandler, UIFormBuilder, UITableBuilder } from 'react-components-library'
import { extractName, handleRoute, splitOnUppercase } from '../utilities/Common'
import { LANGUAGES, MESSAGES, UI } from '../utilities/Enum'
import Home from './Home'
import Import from '../components/Import'
import NotFound from './NotFound'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      ready: false,
      schemas: [],
      message: '',
      languageCode: this.props.languageCode,
      namespace: this.props.namespace,
      specialFeatures: this.props.specialFeatures,
      namespaceLocked: true
    }
  }

  componentDidMount () {
    const {producer, endpoint, namespace, specialFeatures, route} = this.props
    const updatedUrl = endpoint + handleRoute(namespace) + '?schema=embed'

    SchemaHandler(updatedUrl, producer, endpoint, namespace, specialFeatures, route).then(schemas => {
      this.setState({
        schemas: schemas,
        ready: true
      })
    }).catch(error => {
      this.setState({
        schemas: [],
        ready: true,
        message: error
      })
    })
  }

  changeLanguage = (languageCode) => {
    localStorage.setItem('languageCode', languageCode)

    this.setState({ready: false}, () => this.setState({
      ready: true,
      languageCode: languageCode
    }))
  }

  changeNamespace = (event) => {
    this.setState({namespace: event.target.value})
  }

  toggleNamespace = () => {
    this.setState({namespaceLocked: !this.state.namespaceLocked}, () => {
      if (this.state.namespaceLocked) {
        const {specialFeatures, namespace} = this.state
        const {producer, endpoint, route} = this.props
        const updatedUrl = endpoint + handleRoute(namespace) + '?schema=embed'

        SchemaHandler(updatedUrl, producer, endpoint, namespace, specialFeatures, route).then(schemas => {
          this.setState({
            schemas: schemas,
            message: '',
            ready: true
          })
        }).catch(error => {
          this.setState({
            schemas: [],
            ready: true,
            message: error
          })
        })
      }
    })
  }

  toggleSpecialFeatures = () => {
    this.setState({ready: false}, () => {
      const {specialFeatures} = this.state
      const {producer, endpoint, namespace, route} = this.props
      const updatedUrl = endpoint + handleRoute(namespace) + '?schema=embed'

      SchemaHandler(updatedUrl, producer, endpoint, namespace, !specialFeatures, route).then(schemas => {
        this.setState({
          specialFeatures: !this.state.specialFeatures,
          schemas: schemas,
          message: '',
          ready: true
        })
      }).catch(error => {
        this.setState({
          schemas: [],
          ready: true,
          message: error
        })
      })
    })
  }

  render () {
    const {ready, schemas, message, languageCode, specialFeatures, namespace, namespaceLocked} = this.state
    const {producer, route, endpoint, user} = this.props

    return (
      <Segment basic>
        <Menu fixed='top'>
          <Menu.Item header as={Link} to={route} disabled={!ready}>
            {UI.HEADER[languageCode]}
            <Label color='teal' size='large'>{ready ? schemas.length : <Icon fitted loading name='spinner' />}</Label>
          </Menu.Item>
          <Dropdown item text={UI.SHOW_ALL[languageCode]} scrolling disabled={!ready}>
            <Dropdown.Menu>
              {ready && schemas.map((schema, index) => {
                const domain = extractName(schema.$ref)
                const link = route + domain

                return <Dropdown.Item key={index} as={Link} to={link} content={splitOnUppercase(domain)} />
              })}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown item text={UI.CREATE_NEW[languageCode]} scrolling disabled={!ready}>
            <Dropdown.Menu>
              {ready && schemas.map((schema, index) => {
                const domain = extractName(schema.$ref)
                const link = route + domain + '/new'

                return <Dropdown.Item key={index} as={Link} to={link} content={splitOnUppercase(domain)} />
              })}
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Item as={Link} to='/gsim/import' content={UI.IMPORT[languageCode]} name='import' />
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input labelPosition='right' value={namespace} onChange={this.changeNamespace}>
                <Label basic content='Namespace (LDS)' />
                <input disabled={namespaceLocked} />
                <Label basic>
                  <Icon link fitted name={namespaceLocked ? 'lock' : 'unlock'} onClick={this.toggleNamespace}
                        color={namespaceLocked ? 'red' : 'green'} />
                </Label>
              </Input>
            </Menu.Item>
            <Menu.Item>
              <Icon name='spy' size='large' color={specialFeatures ? 'blue' : 'grey'} />
              <Popup flowing hideOnScroll position='bottom center'
                     trigger={<Checkbox toggle checked={specialFeatures} onChange={this.toggleSpecialFeatures} />}>
                <Icon color='blue' name='info circle' />
                {MESSAGES.SPECIAL_FEATURES[languageCode]}
              </Popup>
            </Menu.Item>
            <Dropdown item text={UI.LANGUAGE[languageCode] + ' (' + UI.LANGUAGE_CHOICE[languageCode] + ')'}>
              <Dropdown.Menu>
                {Object.keys(LANGUAGES).map(language => {
                  return (
                    <Dropdown.Item key={language}
                                   onClick={this.changeLanguage.bind(this, LANGUAGES[language].languageCode)}>
                      <Flag name={LANGUAGES[language].flag} /> {UI[language.toUpperCase()][languageCode]}
                    </Dropdown.Item>
                  )
                })}
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Menu>
        <Container fluid style={{marginTop: '5em'}}>
          {ready && message !== '' && <Message error content={message} />}
          <Switch>
            <Route path='/gsim' exact
                   component={() => <Home languageCode={languageCode} imageSource={UI.GSIM_IMAGE} />} />

            {ready && message === '' && schemas.map((schema, index) => {
              const domain = extractName(schema.$ref)
              const path = route + domain + '/:id'

              return <Route key={index} path={path} exact
                            render={({match}) => <UIFormBuilder params={match.params} producer={producer}
                                                                schema={JSON.parse(JSON.stringify(schema))}
                                                                languageCode={languageCode} namespace={namespace}
                                                                specialFeatures={specialFeatures}
                                                                endpoint={endpoint} user={user} />} />
            })}

            {ready && message === '' && schemas.map((schema, index) => {
              const domain = extractName(schema.$ref)
              const path = route + domain

              return <Route key={index} path={path} exact
                            render={({match}) => <UITableBuilder params={match.params} producer={producer}
                                                                 schema={JSON.parse(JSON.stringify(schema))}
                                                                 languageCode={languageCode} namespace={namespace}
                                                                 specialFeatures={specialFeatures}
                                                                 endpoint={endpoint} routing={path} />} />
            })}

            <Route path='/gsim/import' exact component={() => <Import endpoint={endpoint} namespace={namespace}
                                                                      languageCode={languageCode} />} />
            <Route component={({location}) => <NotFound location={location} languageCode={languageCode} />} />
          </Switch>
        </Container>
      </Segment>
    )
  }
}

export default App
