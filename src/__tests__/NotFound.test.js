import React from 'react'
import { shallow } from 'enzyme'
import { Header } from 'semantic-ui-react'

import NotFound from '../pages/NotFound'
import { MESSAGES } from '../utilities/Enum'

describe('NotFound', () => {
  it('Renders correct information', () => {
    const properties = {
      location: {
        pathname: '/something/that/does/not/exist'
      },
      languageCode: 'en'
    }

    const component = shallow(<NotFound {...properties} />)

    expect(component.find(Header).prop('subheader'))
      .toEqual(MESSAGES.PAGE_NOT_FOUND[properties.languageCode] + ' \'/something/that/does/not/exist\'')
  })
})
