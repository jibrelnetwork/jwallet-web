import React from 'react'
import {
  shallow,
} from 'enzyme'

import { JAssetSymbol } from '../JAssetSymbol'

jest.mock('../../../../utils/sprite/iconsAsset', () => ({
  'eth-usage': {
    url: '#eth',
  },
}))

describe('JAssetSymbol', () => {
  it('is available', () => {
    expect(JAssetSymbol).toBeDefined()
  })

  it('renders icon if valid address is specified', () => {
    const wrapper = shallow(<JAssetSymbol address='ethereum' symbol='1234' size={24} />)

    expect(wrapper.exists('use')).toBe(true)
    expect(wrapper.exists('text')).toBe(false)
  })

  it('renders symbol icon if no icon is available for address', () => {
    const wrapper = shallow(<JAssetSymbol address='none' symbol='1234' size={24} />)

    expect(wrapper.exists('use')).toBe(false)
    expect(wrapper.exists('text')).toBe(true)
  })

  it('crops long symbols', () => {
    expect(
      shallow(
        <JAssetSymbol symbol='1' size={24} />,
      ).find('text').text(),
    ).toBe('1')

    expect(
      shallow(
        <JAssetSymbol symbol='12' size={24} />,
      ).find('text').text(),
    ).toBe('12')

    expect(
      shallow(
        <JAssetSymbol symbol='123' size={24} />,
      ).find('text').text(),
    ).toBe('123')

    expect(
      shallow(
        <JAssetSymbol symbol='1234' size={24} />,
      ).find('text').text(),
    ).toBe('1234')

    expect(
      shallow(
        <JAssetSymbol symbol='12345' size={24} />,
      ).find('text').text(),
    ).toBe('123')

    expect(
      shallow(
        <JAssetSymbol symbol='1234567890123456' size={24} />,
      ).find('text').text(),
    ).toBe('123')
  })

  it('adds specified class name', () => {
    const wrapper = shallow(<JAssetSymbol symbol='add' className='foo' />)

    expect(wrapper.hasClass('foo')).toBe(true)
  })
})
