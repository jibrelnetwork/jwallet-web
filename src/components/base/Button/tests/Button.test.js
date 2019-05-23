import React from 'react'
import sinon from 'sinon'
import {
  shallow,
  mount,
} from 'enzyme'

import { Button } from 'components/base'
import buttonStyle from '../button.m.scss'

describe('Button', () => {
  it('has semantic html', () => {
    expect(
      shallow(<Button>Hello world</Button>).is('button'),
    ).toBe(true)
  })

  it('renders children', () => {
    expect(
      shallow(<Button>Hello</Button>).text(),
    ).toBe('Hello')

    const wrapper = shallow(
      <Button>
        <span className='hello'>Hello</span>
        <div className='world'>world!</div>
      </Button>,
    )

    expect(wrapper.children()).toHaveLength(2)
    expect(wrapper.children().first().hasClass('hello')).toBeTruthy()
    expect(wrapper.children().last().hasClass('world')).toBeTruthy()
  })

  it('uses correct class names for themes', () => {
    const THEMES = [
      'general',
      'secondary',
      'additional',
      'additional-icon',
    ]

    THEMES.forEach((theme) => {
      expect(
        shallow(<Button theme={theme}>Test</Button>).hasClass(buttonStyle[theme]),
      ).toBe(true)
    })
  })

  it('applies disabled state', () => {
    expect(
      shallow(<Button>Test</Button>).prop('disabled'),
    ).toBe(false)

    expect(
      shallow(<Button isDisabled>Test</Button>).prop('disabled'),
    ).toBe(true)
  })

  it('passes className to component', () => {
    const wrapper = shallow(<Button className='popoker'>Hello</Button>)
    expect(wrapper.hasClass('popoker')).toBe(true)
  })

  it('handles onClick', () => {
    const onButtonClick = sinon.spy()
    const wrapper = shallow(<Button onClick={onButtonClick}>Hello</Button>)

    wrapper.find('button').simulate('click')
    expect(onButtonClick.callCount).toBe(1)
    wrapper.find('button').simulate('click')
    expect(onButtonClick.callCount).toBe(2)
  })

  it('disables onClick handle if button is disabled', () => {
    const onButtonClick = sinon.spy()
    const wrapper = mount(<Button onClick={onButtonClick} isDisabled>Hello</Button>)
    const button = wrapper.find('button')

    expect(onButtonClick.callCount).toBe(0)
    button.simulate('click')
    expect(onButtonClick.callCount).toBe(0)
    button.simulate('click')
    expect(onButtonClick.callCount).toBe(0)
  })

  it('disables onClick handle if button is loading', () => {
    const onButtonClick = sinon.spy()
    const wrapper = mount(<Button onClick={onButtonClick} isLoading>Hello</Button>)
    const button = wrapper.find('button')

    expect(onButtonClick.callCount).toBe(0)
    button.simulate('click')
    expect(onButtonClick.callCount).toBe(0)
    button.simulate('click')
    expect(onButtonClick.callCount).toBe(0)
  })
})
