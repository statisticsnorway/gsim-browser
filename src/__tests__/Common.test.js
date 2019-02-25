import React from 'react'

import {
  extractName,
  extractObjectNameFromFilename,
  handleRoute,
  removeFilenameExtension,
  splitOnUppercase
} from '../utilities/Common'

describe('Common', () => {
  it('Splits on Uppercase', () => {
    const splitString = splitOnUppercase('SplitMePlease')
    const noNeedTosplitString = splitOnUppercase('Split Me Please')
    const notString = splitOnUppercase(false)

    expect(splitString).toEqual('Split Me Please')
    expect(noNeedTosplitString).toEqual('Split Me Please')
    expect(notString).toEqual(false)
  })

  it('Extracts name', () => {
    const extractString = extractName('#/definitions/Agent')
    const noNeedToExtract = extractName('Agent')
    const notString = extractName(false)

    expect(extractString).toEqual('Agent')
    expect(noNeedToExtract).toEqual('Agent')
    expect(notString).toEqual(false)
  })

  it('Removes filename extension', () => {
    const removeExtension = removeFilenameExtension('Agent.json')
    const noNeedToRemoveExtension = removeFilenameExtension('Agent')
    const notString = removeFilenameExtension(false)

    expect(removeExtension).toEqual('Agent')
    expect(noNeedToRemoveExtension).toEqual('Agent')
    expect(notString).toEqual(false)
  })

  it('Extract object name', () => {
    const extractName = extractObjectNameFromFilename('AgentExample.json')
    const extractNameAgain = extractObjectNameFromFilename('Agent_Example.json')
    const extractNameFromComplexThing = extractObjectNameFromFilename('Agent_dude_Example.json')
    const notString = extractObjectNameFromFilename(false)

    expect(extractName).toEqual('Agent')
    expect(extractNameAgain).toEqual('Agent')
    expect(extractNameFromComplexThing).toEqual('Agent')
    expect(notString).toEqual(false)
  })

  it('Handles route', () => {
    const handledRoute = handleRoute('route/')
    const handledDoubleRoute = handleRoute('first/route/')
    const notString = handleRoute(false)

    expect(handledRoute).toEqual('route')
    expect(handledDoubleRoute).toEqual('first/route')
    expect(notString).toEqual(false)
  })
})
