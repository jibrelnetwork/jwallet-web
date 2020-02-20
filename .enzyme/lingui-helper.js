import React from 'react'
import { shape, object } from 'prop-types'
import { mount, shallow } from 'enzyme'
import { I18nProvider } from '@lingui/react'

// Create the I18nProvider to retrieve context for wrapping around.
const language = 'en'
const intlProvider = new I18nProvider({
  language,
  catalogs: {
    [language]: {}
  }
}, {})

const {
  linguiPublisher: {
    i18n: originalI18n
  }
} = intlProvider.getChildContext()

// You customize the i18n object here:
const i18n = {
  ...originalI18n,
  _: key => key // provide _ macro, for just passing down the key
}

/**
 * When using Lingui `withI18n` on components, props.i18n is required.
 */
function nodeWithI18nProp(node) {
  return React.cloneElement(node, { i18n })
}

/*
 * Methods to use
 */
export function shallowWithIntl(node, { context } = {}) {
  return shallow(
    nodeWithI18nProp(node),
    {
      context: Object.assign({}, context, { i18n })
    }
  )
}

export function mountWithIntl(node, { context, childContextTypes } = {}) {
  const newContext = Object.assign({}, context, { linguiPublisher: { i18n } })
  /*
   * I18nProvider sets the linguiPublisher in the context for withI18n to get
   * the i18n object from.
   */
  const newChildContextTypes = Object.assign({},
    {
      linguiPublisher: shape({
        i18n: object.isRequired
      }).isRequired
    },
    childContextTypes
  )
  return mount(
    nodeWithI18nProp(node),
    {
      context: newContext,
      childContextTypes: newChildContextTypes
    }
  )
}
