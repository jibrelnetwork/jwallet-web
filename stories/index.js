// @flow

import i18n from '../src/i18n'

import '../src/styles/core.scss'
import './styles.css'

import './components/base'
import './components'

if (typeof window !== 'undefined') {
  window.i18n = i18n()
}
