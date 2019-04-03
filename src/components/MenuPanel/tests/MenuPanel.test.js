// @flow

import React from 'react'
import { shallow } from 'enzyme'

import {
  divDecimals,
  formatBalance,
} from 'utils/numbers'

jest.mock('../../../utils/sprite/spriteUI', () => ({
  keys: () => [],
}))

jest.mock('../../../utils/sprite/spriteAssets', () => ({
  keys: () => [],
}))

jest.mock('react-router5', () => ({
  withRouter: function withRouter(BaseComponent) {
    const ReactForMock = require('react')

    return function WithRouter(props) {
      return ReactForMock.createElement(
        BaseComponent, {
          ...props,
          router: {
            matchUrl: () => null,
          },
        },
      )
    }
  },
}))

// eslint-disable-next-line import/first
import { MenuPanel } from '../MenuPanel'

describe('MenuPanel', () => {
  test('is available', () => {
    expect(MenuPanel).toBeDefined()
  })

  test('renders', () => {
    const fiatCurrency = '₩'
    const routeName = 'Settings'
    const walletName = 'walletName'
    const previousRouteNameFallback = null
    const fiatBalance = 123.45

    const wrapper = shallow(
      <MenuPanel
        routeName={routeName}
        walletName={walletName}
        fiatCurrency={fiatCurrency}
        mnemonicAddressName=''
        fiatBalance={fiatBalance}
      />,
    )

    /**
     * Wrapper
     */
    const componentInstance = wrapper.instance()

    expect(componentInstance.props.walletName).toBe(walletName)
    expect(componentInstance.props.fiatCurrency).toBe(fiatCurrency)
    expect(componentInstance.props.routeName).toEqual(routeName)
    expect(componentInstance.props.mnemonicAddressName).toBe('')
    expect(componentInstance.props.fiatBalance).toBe(fiatBalance)
    expect(componentInstance.props.isMnemonic).toBe(false)

    expect(wrapper.children()).toHaveLength(6)

    /**
     * Top
     */
    const top = wrapper.children().first()

    expect(top.prop('walletName')).toBe(walletName)
    expect(top.prop('fiatCurrency')).toBe(fiatCurrency)
    expect(top.prop('mnemonicAddressName')).toBe('')
    expect(top.prop('fiatBalance')).toBe(fiatBalance)
    expect(top.prop('isMnemonic')).toBe(false)

    const topRendered = top.shallow()

    expect(topRendered.children()).toHaveLength(2)

    const logoWrapper = topRendered.children().first()

    expect(logoWrapper.hasClass('logo')).toBe(true)
    expect(logoWrapper.children()).toHaveLength(1)

    const logo = logoWrapper.children().first().shallow()

    expect(logo.prop('href')).toBe('/')
    expect(logo.prop('className')).toBe('core')
    expect(logo.find('span').html()).toBe('<span class="image white"></span>')

    const walletLink = topRendered.children().last()

    expect(walletLink.hasClass('ticker')).toBe(true)
    expect(walletLink.prop('href')).toBe('/wallets')
    expect(walletLink.find('.name').text()).toBe(walletName)

    expect(walletLink.find('.balance').text())
      .toBe(`${fiatCurrency}\u202F${formatBalance(divDecimals(fiatBalance))}`)

    const chevronIcon = walletLink.find('.chevron').children().first()

    expect(chevronIcon.prop('size')).toBe('medium')
    expect(chevronIcon.prop('name')).toBe('arrow-right')

    /**
     * Separator
     */
    const separatorFirst = wrapper.childAt(1).shallow()
    const separatorSecond = wrapper.childAt(3).shallow()

    expect(separatorFirst.hasClass('separator')).toBe(true)
    expect(separatorSecond.hasClass('separator')).toBe(true)

    /**
     * Actions
     */
    const actionsWrapper = wrapper.childAt(2)

    expect(actionsWrapper.prop('routeName')).toBe(routeName)

    const actions = actionsWrapper.shallow()

    const actionsList = actions.find('ol > li')

    expect(actionsList.children()).toHaveLength(4)
    expect(actionsList.find('a').every('.action')).toBe(true)

    const homeLink = actionsList.at(0).childAt(0)

    expect(homeLink.prop('href')).toBe('/')
    expect(homeLink.children().first().prop('name')).toBe('home')
    expect(homeLink.find('span.label').text()).toBe('Home')

    const historyLink = actionsList.at(1).childAt(0)

    expect(historyLink.prop('href')).toBe('/history')
    expect(historyLink.children().first().prop('name')).toBe('history')
    expect(historyLink.find('span.label').text()).toBe('History')

    const contactsLink = actionsList.at(2).childAt(0)

    expect(contactsLink.prop('href')).toBe('/contacts')
    expect(contactsLink.children().first().prop('name')).toBe('contact')
    expect(contactsLink.find('span.label').text()).toBe('Contacts')

    const moreLink = actionsList.at(3).childAt(0)

    expect(moreLink.prop('href')).toBe('/more')
    expect(moreLink.children().first().prop('name')).toBe('more')
    expect(moreLink.find('span.label').text()).toBe('More')

    /**
     * Settings
     */
    const settings = wrapper.childAt(4).shallow()

    expect(settings.hasClass('actions settings')).toBe(true)
    expect(settings.children()).toHaveLength(1)
    expect(settings.children().first().prop('href')).toBe('/settings')
    expect(settings.find('span.label').text()).toBe('Settings')

    /**
     * Back
     */
    const backWrapper = wrapper.childAt(5)

    expect(backWrapper.prop('previousRouteNameFallback')).toBe(previousRouteNameFallback)
    expect(backWrapper.prop('isMinimized')).toBe(false)

    const back = backWrapper.shallow()

    expect(back.hasClass('back')).toBe(true)
    expect(back.children()).toHaveLength(0)
  })

  test('renders (mnemonic)', () => {
    const fiatCurrency = '₩'
    const routeName = 'Home'
    const walletName = 'walletName'
    const mnemonicAddressName = 'mnemonicAddressName'
    const fiatBalance = 123.45

    const wrapper = shallow(
      <MenuPanel
        routeName={routeName}
        walletName={walletName}
        fiatCurrency={fiatCurrency}
        mnemonicAddressName={mnemonicAddressName}
        fiatBalance={fiatBalance}
        isMnemonic
      />,
    )

    const componentInstance = wrapper.instance()

    expect(componentInstance.props.mnemonicAddressName).toBe(mnemonicAddressName)
    expect(componentInstance.props.isMnemonic).toBe(true)

    expect(wrapper.children()).toHaveLength(6)

    const top = wrapper.children().first()

    expect(top.prop('walletName')).toBe(walletName)
    expect(top.prop('fiatCurrency')).toBe(fiatCurrency)
    expect(top.prop('mnemonicAddressName')).toBe(mnemonicAddressName)
    expect(top.prop('fiatBalance')).toBe(fiatBalance)
    expect(top.prop('isMnemonic')).toBe(true)

    const walletLink = top.shallow().children().last()

    expect(walletLink.find('.name').children()).toHaveLength(2)
    expect(walletLink.find('.name').at(0).text()).toBe(walletName)
    expect(walletLink.find('.name').at(1).text()).toBe(mnemonicAddressName)
  })

  test('renders (minimized)', () => {
    const routeName = 'Send'
    const fiatCurrency = '₩'
    const walletName = 'walletName'
    const fiatBalance = 123.45

    const wrapper = shallow(
      <MenuPanel
        routeName={routeName}
        walletName={walletName}
        fiatCurrency={fiatCurrency}
        mnemonicAddressName=''
        fiatBalance={fiatBalance}
      />,
    )

    expect(wrapper.hasClass('minimized')).toBe(true)

    expect(wrapper.children()).toHaveLength(6)

    const backWrapper = wrapper.childAt(5)

    expect(backWrapper.prop('isMinimized')).toBe(true)

    const back = backWrapper.shallow()

    expect(back.children()).toHaveLength(1)

    const backLink = back.children().first()

    expect(backLink.prop('routeName')).toBe('Home')

    const backIcon = backLink.children().first()

    expect(backIcon.prop('color')).toBe('blue')
    expect(backIcon.prop('size')).toBe('medium')
    expect(backIcon.prop('name')).toBe('arrow-back')
  })

  test('renders (empty wallet)', () => {
    const walletName = ''
    const fiatCurrency = '₩'
    const routeName = 'Send'
    const fiatBalance = 123.45

    const wrapper = shallow(
      <MenuPanel
        routeName={routeName}
        walletName={walletName}
        fiatCurrency={fiatCurrency}
        mnemonicAddressName=''
        fiatBalance={fiatBalance}
      />,
    )

    expect(wrapper.hasClass('minimized')).toBe(true)

    expect(wrapper.children()).toHaveLength(6)

    const backWrapper = wrapper.childAt(5)

    expect(backWrapper.prop('isMinimized')).toBe(true)

    const back = backWrapper.shallow()

    expect(back.children()).toHaveLength(1)

    const backLink = back.children().first()

    expect(backLink.prop('routeName')).toBe('Home')

    const backIcon = backLink.children().first()

    expect(backIcon.prop('color')).toBe('blue')
    expect(backIcon.prop('size')).toBe('medium')
    expect(backIcon.prop('name')).toBe('arrow-back')
  })
})
