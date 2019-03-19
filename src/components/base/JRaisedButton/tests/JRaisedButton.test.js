import React from 'react'
import sinon from 'sinon'
import {
  shallow,
  mount,
} from 'enzyme'

import JRaisedButton from '../JRaisedButton.js'

describe('Render', () => {
  test('Semantic html', () => {
    const wrapper = shallow(<JRaisedButton>Hello world</JRaisedButton>)
    expect(wrapper.html()).toBe('<button type="button" class="core blue">Hello world</button>')
  })

  test('Children simple', () => {
    const wrapper = shallow(<JRaisedButton>Hello</JRaisedButton>)
    expect(wrapper.text()).toBe('Hello')
  })

  test('Children complex', () => {
    const wrapper = shallow(
      <JRaisedButton>
        <span className='hello'>Hello</span>
        <div className='world'>world!</div>
      </JRaisedButton>)
    expect(wrapper.children()).toHaveLength(2)
    expect(wrapper.children().first().hasClass('hello')).toBeTruthy()
    expect(wrapper.children().last().hasClass('world')).toBeTruthy()
  })

  test('Button correct theme classes', () => {
    const whiteButton = shallow(<JRaisedButton theme='white'>Test</JRaisedButton>)
    const blueButton = shallow(<JRaisedButton>Test</JRaisedButton>)
    const grayButton = shallow(<JRaisedButton theme='gray'>Test</JRaisedButton>)

    expect(whiteButton.hasClass('white')).toBeTruthy()
    expect(blueButton.hasClass('blue')).toBeTruthy()
    expect(grayButton.hasClass('gray')).toBeTruthy()
  })

  test('Passing classes to button', () => {
    const wrapper = shallow(<JRaisedButton className='popoker'>Hello</JRaisedButton>)
    expect(wrapper.hasClass('popoker')).toBeTruthy()
  })
})

describe('Logic', () => {
  test('Button onClick handle', () => {
    const onButtonClick = sinon.spy()
    const wrapper = shallow(<JRaisedButton onClick={onButtonClick}>Hello</JRaisedButton>)

    wrapper.find('button').simulate('click')
    expect(onButtonClick.callCount).toBe(1)
    wrapper.find('button').simulate('click')
    expect(onButtonClick.callCount).toBe(2)
  })

  test('Disabled button onClick handle', () => {
    const onButtonClick = sinon.spy()
    const wrapper = mount(<JRaisedButton onClick={onButtonClick} disabled>Hello</JRaisedButton>)
    const button = wrapper.find('button')

    expect(onButtonClick.callCount).toBe(0)
    button.simulate('click')
    expect(onButtonClick.callCount).toBe(0)
    button.simulate('click')
    expect(onButtonClick.callCount).toBe(0)
  })

  test('Loading button onClick handle', () => {
    const onButtonClick = sinon.spy()
    const wrapper = mount(<JRaisedButton onClick={onButtonClick} isLoading>Hello</JRaisedButton>)
    const button = wrapper.find('button')

    expect(onButtonClick.callCount).toBe(0)
    button.simulate('click')
    expect(onButtonClick.callCount).toBe(0)
    button.simulate('click')
    expect(onButtonClick.callCount).toBe(0)
  })
})
