// @flow

import React, { PureComponent } from 'react'
import { type I18n as I18nType } from '@lingui/core'
import {
  I18nProvider,
  I18n,
} from '@lingui/react'

import { type LanguageCode } from 'data/languages'
import { catalogs } from 'data/lingui'

import {
  init,
  storeLang,
  getStoredLang,
  type LanguageStore,
} from 'services/translation'

type Props = {|
  children: React$Node,
|}

type ComponentState = {|
  isInitialized: boolean,
  language: LanguageCode,
|}

export type ChangeLanguage = (language: LanguageCode) => Promise<any>

type LanguageContextType = {
  language: LanguageCode,
  changeLanguage: ChangeLanguage,
  i18n: I18nType,
}

export const LanguageContext = React.createContext<LanguageContextType>({
  language: 'en',
  changeLanguage: () => Promise.resolve(),
  // $FlowFixMe
  i18n: { '_': () => '' },
})

export class LanguageProvider extends PureComponent<Props, ComponentState> {
  state = {
    isInitialized: false,
    language: 'en',
  }

  langDb: ?LanguageStore = null

  async componentDidMount() {
    try {
      this.langDb = await init()
      const language = await getStoredLang(this.langDb) || 'en'

      this.setState({
        language,
        isInitialized: true,
      })
    } catch (err) {
      console.error(err)

      this.setState({
        isInitialized: true,
      })
    }
  }

  changeLanguage = async (language: LanguageCode) => {
    if (this.langDb) {
      await storeLang(this.langDb, language)
    }

    this.setState({ language })
  }

  render() {
    const {
      isInitialized,
      language,
    } = this.state

    if (!isInitialized) {
      // #FIXME: It is possible to show loader here, when we will do async language loading
      return null
    }

    console.log(
      `LanguageProvider: language=${language}, catalogs=${Object.keys(catalogs).join(',')}`,
    )

    return (
      <I18nProvider language={language} catalogs={catalogs}>
        <I18n>
          {({ i18n }) => (
            <LanguageContext.Provider value={{
              i18n,
              language,
              changeLanguage: this.changeLanguage,
            }}
            >
              {this.props.children}
            </LanguageContext.Provider>
          )}
        </I18n>
      </I18nProvider>
    )
  }
}

export const LanguageConsumer = LanguageContext.Consumer
