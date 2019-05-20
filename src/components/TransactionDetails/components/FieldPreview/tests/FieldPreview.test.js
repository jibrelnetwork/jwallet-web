import React from 'react'
import {
  shallow,
  mount,
} from 'enzyme'

import { FieldPreview } from '../FieldPreview.js'

describe('Render', () => {
  test('Label and body value', () => {
    const props = {
      label: 'Test label',
      body: 'Some value',
    }
    const wrapper = shallow(<FieldPreview {...props} />)

    expect(wrapper.find('.label').text()).toBe(props.label)
    expect(wrapper.find('.body').text()).toBe(props.body)
  })

  test('Body with link', () => {
    const props = {
      label: 'Test label',
      body: 'Some value',
      link: 'https://jibrel.network',
    }
    const wrapper = mount(<FieldPreview {...props} />)

    expect(wrapper.find('.label').text()).toBe(props.label)
    expect(wrapper.find('.body').children().hasClass('link')).toBe(true)
    expect(wrapper.find('.body > .link').text()).toBe(props.body)
    expect(wrapper.find('.body > .link').getDOMNode().getAttribute('href')).toBe(props.link)
  })

  test('Copy button is rendered', () => {
    const props = {
      label: 'Test label',
      body: 'Some value',
      link: 'https://jibrel.network',
      copy: 'copy text',
    }
    const wrapper = shallow(<FieldPreview {...props} />)

    expect(wrapper.find('.actions').children().length).toBe(1)
  })

  test('Add Contact button is rendered', () => {
    const props = {
      label: 'Test label',
      body: 'Some value',
      link: 'https://jibrel.network',
      contact: 'contact',
    }
    const wrapper = shallow(<FieldPreview {...props} />)

    expect(wrapper.find('.actions').children().length).toBe(1)
  })

  test('Both actions is rendered', () => {
    const props = {
      label: 'Test label',
      body: 'Some value',
      link: 'https://jibrel.network',
      copy: 'haha',
      contact: 'contact',
    }
    const wrapper = shallow(<FieldPreview {...props} />)

    expect(wrapper.find('.actions > .action').length).toBe(2)
  })
})
