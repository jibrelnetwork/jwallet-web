// @flow strict

import React from 'react'

import {
  mount,
  shallow,
} from 'enzyme'

import FieldPreview from '../FieldPreview'

const VALUE: string = 'Some value'
const LABEL: string = 'Test label'
const LINK: string = 'https://jibrel.network'
const VALUE_TO_SHOW: string = 'Some value to show'

describe('Render', () => {
  test('Label and body value', () => {
    const wrapper = shallow(
      <FieldPreview
        label={LABEL}
        value={VALUE}
      />,
    )

    expect(wrapper.find('.label').text()).toBe(LABEL)
    expect(wrapper.find('.value').text()).toBe(VALUE)
  })

  test('Body with link', () => {
    const wrapper = mount(
      <FieldPreview
        link={LINK}
        label={LABEL}
        value={VALUE}
      />,
    )

    expect(wrapper.find('.label').text()).toBe(LABEL)
    expect(wrapper.find('.value > .link').text()).toBe(VALUE)
    expect(wrapper.find('.value').children().hasClass('link')).toBe(true)
    expect(wrapper.find('.value > .link').getDOMNode().getAttribute('href')).toBe(LINK)
  })

  test('Copy button is rendered', () => {
    const wrapper = shallow(
      <FieldPreview
        link={LINK}
        label={LABEL}
        value={VALUE}
        isCopyable
      />,
    )

    expect(wrapper.find('.actions').children()).toHaveLength(1)
  })

  test('Add Contact button is rendered', () => {
    const wrapper = shallow(
      <FieldPreview
        link={LINK}
        label={LABEL}
        value={VALUE}
        isContact
      />,
    )

    expect(wrapper.find('.actions').children()).toHaveLength(1)
  })

  test('Both actions is rendered', () => {
    const wrapper = shallow(
      <FieldPreview
        link={LINK}
        label={LABEL}
        value={VALUE}
        isContact
        isCopyable
      />,
    )

    expect(wrapper.find('.actions').children()).toHaveLength(2)
  })

  test('Applying copy message', () => {
    const wrapper = shallow(
      <FieldPreview
        link={LINK}
        label={LABEL}
        value={VALUE}
        valueToShow={VALUE_TO_SHOW}
        isContact
        isCopyable
      />,
    )

    expect(wrapper.find('.actions').children()).toHaveLength(2)
    expect(wrapper.find('.value > .link').prop('children')).toBe(VALUE_TO_SHOW)
  })
})
