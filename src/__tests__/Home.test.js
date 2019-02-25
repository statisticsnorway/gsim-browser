import React from 'react'
import { shallow } from 'enzyme'
import { Header, Image } from 'semantic-ui-react'

import Home from '../pages/Home'
import { UI } from '../utilities/Enum'

describe('Home', () => {
  it('Renders correct information', () => {
    const properties = {
      languageCode: 'en',
      imageSource: 'https://via.placeholder.com/300'
    }

    const component = shallow(<Home {...properties} />)

    expect(component.find(Header).prop('subheader')).toEqual(UI.HOME[properties.languageCode])
    expect(component.find(Image)).toHaveLength(1)
  })
})
