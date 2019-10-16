// @flow

import en from './en/messages.js'
import es from './es/messages.js'
import ja from './ja/messages.js'
import ko from './ko/messages.js'
import ru from './ru/messages.js'
import zhHans from './zh-Hans/messages.js'
import zhHant from './zh-Hant/messages.js'

const catalogs = {
  en,
  es,
  ja,
  ko,
  ru,
  'zh-Hans': zhHans,
  'zh-Hant': zhHant
}

export { catalogs }
