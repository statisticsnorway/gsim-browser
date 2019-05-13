import React from 'react'
import { mount } from 'enzyme'
import { StatisticLabel, StatisticValue } from 'semantic-ui-react'

import { putData } from '../utilities/Fetch'
import Import from '../components/Import'
import { MESSAGES, UI } from '../utilities/Enum'

jest.mock('../utilities/Fetch', () => ({ putData: jest.fn() }))
putData.mockImplementation(() => Promise.resolve())

// Not so proper workaround to wait for render part of component to update. Creates race-condition. Wait for fix in Jest/Enzyme.
const waitForAsync = () => new Promise(resolve => setImmediate(resolve))

const goodAgent = {
  'id': '316ce68d-9154-43d3-ae4f-90b4668d2fd7',
  'agentType': 'ORGANIZATION',
  'name': [
    {
      'languageCode': 'en',
      'languageText': 'Department 200'
    }
  ],
  'description': [
    {
      'languageCode': 'en',
      'languageText': 'Department of prices, financial and external statisticsArkiv'
    }
  ],
  'isExternal': false,
  'administrativeStatus': 'OPEN',
  'version': '1.0.0',
  'versionValidFrom': '2015-01-01T15:00:00.000Z',
  'validFrom': '2015-01-01T15:00:00.000Z',
  'createdDate': '2015-01-01T15:00:00.000Z',
  'createdBy': 'OHV',
  'agentDetails': [
    {
      'agentDetailType': 'CONTACT_EMAIL',
      'values': [
        'avd200@ssb.no',
        'headof200@ssb.no'
      ]
    },
    {
      'agentDetailType': 'CONTACT_ADDRESS',
      'values': [
        'Statistisk sentralbyrå, Oterveien 23, 2211 Kongsvinger',
        'Statistisk sentralbyrå, Akersveien 26, 0177 Oslo'
      ]
    }
  ],
  'administrativeDetails': [
    {
      'administrativeDetailType': 'URL',
      'values': [
        'https://www.ssb.no/en/omssb/om-oss/organisasjonskart/priser-finans-og-utenriksstatistikk'
      ]
    }
  ]
}
const goodTestFile = new Blob([JSON.stringify(goodAgent)], { type: 'application/json' })
goodTestFile.name = 'Good Agent'

const badAgent = {
  'agentType': 'ORGANIZATION',
  'name': [
    {
      'languageCode': 'en',
      'languageText': 'Department 200'
    }
  ],
  'description': [
    {
      'languageCode': 'en',
      'languageText': 'Department of prices, financial and external statisticsArkiv'
    }
  ],
  'isExternal': false,
  'administrativeStatus': 'OPEN',
  'version': '1.0.0',
  'versionValidFrom': '2015-01-01T15:00:00.000Z',
  'validFrom': '2015-01-01T15:00:00.000Z',
  'createdDate': '2015-01-01T15:00:00.000Z',
  'createdBy': 'OHV',
  'agentDetails': [
    {
      'agentDetailType': 'CONTACT_EMAIL',
      'values': [
        'avd200@ssb.no',
        'headof200@ssb.no'
      ]
    },
    {
      'agentDetailType': 'CONTACT_ADDRESS',
      'values': [
        'Statistisk sentralbyrå, Oterveien 23, 2211 Kongsvinger',
        'Statistisk sentralbyrå, Akersveien 26, 0177 Oslo'
      ]
    }
  ],
  'administrativeDetails': [
    {
      'administrativeDetailType': 'URL',
      'values': [
        'https://www.ssb.no/en/omssb/om-oss/organisasjonskart/priser-finans-og-utenriksstatistikk'
      ]
    }
  ]
}
const badTestFile = new Blob([JSON.stringify(badAgent)], { type: 'application/json' })
badTestFile.name = 'Bad Agent'

const wrongAgent = 'Not right'
const wrongTestFile = new Blob([wrongAgent], { type: 'text/plain' })
wrongTestFile.name = 'Wrong Agent'

const invalidTestFile = new Blob([goodAgent], { type: 'application/json' })
invalidTestFile.name = 'Invalid Agent'

const badCaseAgent = {
  'id': '316ce68d-9154-43d3-ae4f-90b4668d2fd7',
  'agentType': 'ORGANIZATION',
  'name': [
    {
      'languageCode': 'en',
      'languageText': 'Department 200'
    }
  ],
  'Description': [
    {
      'languageCode': 'en',
      'languageText': 'Department of prices, financial and external statisticsArkiv'
    }
  ],
  'isExternal': false,
  'administrativeStatus': 'OPEN',
  'version': '1.0.0',
  'versionValidFrom': '2015-01-01T15:00:00.000Z',
  'validFrom': '2015-01-01T15:00:00.000Z',
  'createdDate': '2015-01-01T15:00:00.000Z',
  'createdBy': 'OHV',
  'agentDetails': [
    {
      'agentDetailType': 'CONTACT_EMAIL',
      'values': [
        'avd200@ssb.no',
        'headof200@ssb.no'
      ]
    },
    {
      'agentDetailType': 'CONTACT_ADDRESS',
      'values': [
        'Statistisk sentralbyrå, Oterveien 23, 2211 Kongsvinger',
        'Statistisk sentralbyrå, Akersveien 26, 0177 Oslo'
      ]
    }
  ],
  'administrativeDetails': [
    {
      'administrativeDetailType': 'URL',
      'values': [
        'https://www.ssb.no/en/omssb/om-oss/organisasjonskart/priser-finans-og-utenriksstatistikk'
      ]
    }
  ]
}
const badCaseFile = new Blob([JSON.stringify(badCaseAgent)], { type: 'application/json' })
badCaseFile.name = 'Bad case Agent'

const doubleAgent = [
  {
    'id': '316ce68d-9154-43d3-ae4f-90b4668d2fd7',
    'agentType': 'ORGANIZATION',
    'name': [
      {
        'languageCode': 'en',
        'languageText': 'Department 200'
      }
    ],
    'description': [
      {
        'languageCode': 'en',
        'languageText': 'Department of prices, financial and external statisticsArkiv'
      }
    ],
    'isExternal': false,
    'administrativeStatus': 'OPEN',
    'version': '1.0.0',
    'versionValidFrom': '2015-01-01T15:00:00.000Z',
    'validFrom': '2015-01-01T15:00:00.000Z',
    'createdDate': '2015-01-01T15:00:00.000Z',
    'createdBy': 'OHV',
    'agentDetails': [
      {
        'agentDetailType': 'CONTACT_EMAIL',
        'values': [
          'avd200@ssb.no',
          'headof200@ssb.no'
        ]
      },
      {
        'agentDetailType': 'CONTACT_ADDRESS',
        'values': [
          'Statistisk sentralbyrå, Oterveien 23, 2211 Kongsvinger',
          'Statistisk sentralbyrå, Akersveien 26, 0177 Oslo'
        ]
      }
    ],
    'administrativeDetails': [
      {
        'administrativeDetailType': 'URL',
        'values': [
          'https://www.ssb.no/en/omssb/om-oss/organisasjonskart/priser-finans-og-utenriksstatistikk'
        ]
      }
    ]
  },
  {
    'id': '1d6ca477-4d0c-47b1-967d-1bead9c1b56b',
    'name': [
      {
        'languageCode': 'nb',
        'languageText': 'Avdeling 300'
      },
      {
        'languageCode': 'en',
        'languageText': 'Department 300'
      }
    ],
    'description': [
      {
        'languageCode': 'nb',
        'languageText': 'Avdeling for person- og sosialstatistikk'
      },
      {
        'languageCode': 'en',
        'languageText': 'Department of social statistics'
      }
    ],
    'administrativeStatus': 'OPEN',
    'version': '1.0.0',
    'versionValidFrom': '1985-01-01T15:00:00.000Z',
    'validFrom': '1985-01-01T15:00:00.000Z',
    'createdDate': '1985-01-01T15:00:00.000Z',
    'createdBy': 'BNJ',
    'agentType': 'ORGANIZATION',
    'isExternal': false,
    'agentDetails': [
      {
        'agentDetailType': 'CONTACT_EMAIL',
        'values': [
          'avd300@ssb.no',
          'headof300@ssb.no'
        ]
      },
      {
        'agentDetailType': 'CONTACT_ADDRESS',
        'values': [
          'Statistisk sentralbyrå, Oterveien 23, 2211 Kongsvinger',
          'Statistisk sentralbyrå, Akersveien 26, 0177 Oslo'
        ]
      }
    ],
    'administrativeDetails': [
      {
        'administrativeDetailType': 'URL',
        'values': ['https://www.ssb.no/befolkning']
      }
    ]
  }
]
const doubleAgentFile = new Blob([JSON.stringify(doubleAgent)], { type: 'application/json' })
doubleAgentFile.name = 'Double Agent'

describe('Import', () => {
  it('Valid file upload updates component correctly', async () => {
    const properties = {
      languageCode: 'en'
    }

    const component = mount(<Import {...properties} />)

    expect(component.state('progressObjects')).toEqual(0)
    expect(component.state('totalObjects')).toEqual(0)
    expect(component.state('successfulObjectUploads')).toEqual(0)

    component.find('input').simulate('change', { target: { files: [goodTestFile] } })

    await waitForAsync()
    component.update()

    expect(component.state('progressObjects')).toEqual(0)
    expect(component.state('totalObjects')).toEqual(1)
    expect(component.state('successfulObjectUploads')).toEqual(0)

    await waitForAsync()
    component.update()

    expect(component.state('progressObjects')).toEqual(1)
    expect(component.state('totalObjects')).toEqual(1)
    expect(component.state('successfulObjectUploads')).toEqual(1)
    expect(component.state('responses')).toBeInstanceOf(Array)
    expect(component.state('responses').length).toEqual(1)
    expect(component.state('responses')[0].color).toEqual('green')
    expect(component.state('responses')[0].name).toEqual('Good Agent')

    expect(component.find(StatisticValue).find('div').text()).toEqual('1 / 1')
    expect(component.find(StatisticLabel).find('div').text()).toEqual(UI.IMPORTING_SUCCESS[properties.languageCode])
  })

  it('Invalid file upload updates component correctly', async () => {
    const properties = {
      languageCode: 'en'
    }

    const component = mount(<Import {...properties} />)

    expect(component.state('progressObjects')).toEqual(0)
    expect(component.state('totalObjects')).toEqual(0)
    expect(component.state('successfulObjectUploads')).toEqual(0)

    component.find('input').simulate('change', { target: { files: [wrongTestFile, invalidTestFile, goodTestFile, badTestFile, badCaseFile, doubleAgentFile] } })

    await waitForAsync()
    component.update()

    expect(component.state('progressObjects')).toEqual(1)
    expect(component.state('totalObjects')).toEqual(6)
    expect(component.state('successfulObjectUploads')).toEqual(0)

    await waitForAsync()
    component.update()

    expect(component.state('progressObjects')).toEqual(7)
    expect(component.state('totalObjects')).toEqual(7)
    expect(component.state('successfulObjectUploads')).toEqual(3)
    expect(component.state('responses')).toBeInstanceOf(Array)
    expect(component.state('responses').length).toEqual(7)
    expect(component.state('responses')[0].color).toEqual('red')
    expect(component.state('responses')[0].name).toEqual('Wrong Agent')
    expect(component.state('responses')[0].text).toEqual(MESSAGES.INVALID_FORMAT[properties.languageCode])
    expect(component.state('responses')[1].color).toEqual('red')
    expect(component.state('responses')[1].name).toEqual('Invalid Agent')
    expect(component.state('responses')[1].text).toEqual(MESSAGES.INVALID_JSON[properties.languageCode])
    expect(component.state('responses')[2].color).toEqual('green')
    expect(component.state('responses')[2].name).toEqual('Good Agent')
    expect(component.state('responses')[2].text).toEqual('')
    expect(component.state('responses')[3].color).toEqual('red')
    expect(component.state('responses')[3].name).toEqual('Bad Agent')
    expect(component.state('responses')[3].text).toEqual(MESSAGES.MISSING_ID[properties.languageCode])
    expect(component.state('responses')[4].color).toEqual('red')
    expect(component.state('responses')[4].name).toEqual('Bad case Agent')
    expect(component.state('responses')[4].text).toEqual(MESSAGES.PROPERTY_ERROR_CASE[properties.languageCode])
    expect(component.state('responses')[5].color).toEqual('green')
    expect(component.state('responses')[5].name).toEqual('(1/2) Double Agent')
    expect(component.state('responses')[5].text).toEqual('')
    expect(component.state('responses')[6].color).toEqual('green')
    expect(component.state('responses')[6].name).toEqual('(2/2) Double Agent')
    expect(component.state('responses')[6].text).toEqual('')

    expect(component.find(StatisticValue).find('div').text()).toEqual('3 / 7')
    expect(component.find(StatisticLabel).find('div').text()).toEqual(UI.IMPORTING_SUCCESS[properties.languageCode])
  })
})
