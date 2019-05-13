import React from 'react'
import { mount, shallow } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { Dropdown, DropdownItem, Flag } from 'semantic-ui-react'
import { SchemaHandler } from 'react-components-library'

import App from '../pages/App'
import Home from '../pages/Home'
import Import from '../components/Import'
import { LANGUAGES, UI } from '../utilities/Enum'

jest.mock('react-components-library', () => ({ SchemaHandler: jest.fn() }))
SchemaHandler.mockImplementation(() => Promise.resolve([]))

// Not so proper workaround to wait for render part of component to update. Creates race-condition. Wait for fix in Jest/Enzyme.
const waitForAsync = () => new Promise(resolve => setImmediate(resolve))

const properties = {
  name: 'GSIM',
  producer: 'GSIM',
  endpoint: 'http://localhost:9090/',
  namespace: 'ns/',
  route: '/gsim/',
  languageCode: 'en',
  specialFeatures: true,
  user: 'Test'
}

describe('App', () => {
  it('Language menu works correctly', () => {
    const component = shallow(<App {...properties} />)

    expect(component.find(DropdownItem)).toHaveLength(Object.keys(LANGUAGES).length)
    expect(component.find(Flag)).toHaveLength(Object.keys(LANGUAGES).length)
    expect(component.find(Dropdown).at(2).prop('text'))
      .toEqual(UI.LANGUAGE[component.state('languageCode')] +
        ' (' + UI.LANGUAGE_CHOICE[component.state('languageCode')] + ')')

    component.find(DropdownItem).at(0).simulate('click')

    expect(component.find(Dropdown).at(2).prop('text'))
      .toEqual(UI.LANGUAGE[component.state('languageCode')] +
        ' (' + UI.LANGUAGE_CHOICE[component.state('languageCode')] + ')')
  })

  it('Home rendered on base page', () => {
    const component = mount(
      <MemoryRouter initialEntries={['/']}>
        <App {...properties} />
      </MemoryRouter>
    )

    expect(component.find(Home)).toHaveLength(1)
    expect(component.find(Import)).toHaveLength(0)
  })

  it('Import rendered on /gsim/import', () => {
    const component = mount(
      <MemoryRouter initialEntries={['/gsim/import']}>
        <App {...properties} />
      </MemoryRouter>
    )

    expect(component.find(Home)).toHaveLength(0)
    expect(component.find(Import)).toHaveLength(1)
  })

  it('Namespace value changes correctly', () => {
    const component = mount(
      <MemoryRouter>
        <App {...properties} />
      </MemoryRouter>
    )

    expect(component.find('input').at(0).prop('value')).toEqual('ns/')
    expect(component.find('input').at(0).prop('disabled')).toEqual(true)
    expect(component.find(App).state('namespaceLocked')).toEqual(true)

    component.find('i.red.lock.fitted.link.icon').simulate('click')

    expect(component.find('input').at(0).prop('disabled')).toEqual(false)
    expect(component.find(App).state('namespaceLocked')).toEqual(false)

    component.find('input').at(0).simulate('change', { target: { value: 'data/' } })

    expect(component.find('input').at(0).prop('value')).toEqual('data/')
    expect(component.find('input').at(0).prop('disabled')).toEqual(false)
    expect(component.find(App).state('namespaceLocked')).toEqual(false)

    component.find('i.green.unlock.fitted.link.icon').simulate('click')

    expect(component.find('input').at(0).prop('disabled')).toEqual(true)
    expect(component.find(App).state('namespaceLocked')).toEqual(true)
  })

  it('Toggles special features correctly', async () => {
    const component = mount(
      <MemoryRouter>
        <App {...properties} />
      </MemoryRouter>
    )

    expect(component.find('input').at(1).prop('checked')).toEqual(true)
    expect(component.find(App).state('specialFeatures')).toEqual(true)

    component.find('input').at(1).simulate('change')

    await waitForAsync()
    component.update()

    expect(component.find('input').at(1).prop('checked')).toEqual(false)
    expect(component.find(App).state('specialFeatures')).toEqual(false)
  })
})
