// @flow

import '../src/styles/core.scss'
import './styles.css'

import './components'
import './components/base'

import i18n from '../src/i18n'

import './components/base'
import './components'

if (typeof window !== 'undefined') {
  window.i18n = i18n()
}
