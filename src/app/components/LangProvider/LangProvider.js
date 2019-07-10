// @flow

import React, { PureComponent } from 'react'
import { I18nProvider } from '@lingui/react'

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

type ChangeLanguage = (language: LanguageCode) => Promise<any>

type LangContextType = {
  language: LanguageCode,
  changeLanguage: ChangeLanguage,
}

const LangContext = React.createContext<LangContextType>({
  language: 'en',
  changeLanguage: () => Promise.resolve(),
})

export class LangProvider extends PureComponent<Props, ComponentState> {
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

    const value = {
      language,
      changeLanguage: this.changeLanguage,
    }

    console.log(
      `LangProvider: language=${language}, availableCatalogs=${Object.keys(catalogs).join(',')}`,
    )

    return (
      <I18nProvider language={language} catalogs={catalogs}>
        <LangContext.Provider value={value}>
          {this.props.children}
        </LangContext.Provider>
      </I18nProvider>
    )
  }
}

export const LangConsumer = LangContext.Consumer

export type WithLanguageChangeProps = {|
  language: LanguageCode,
  changeLanguage: ChangeLanguage,
|}

export function withLanguageChange<Config: {}>(
  Component: React$AbstractComponent<Config, any>,
): React$AbstractComponent<$Diff<Config, WithLanguageChangeProps>, any> {
  return function WithLang(props: $Diff<Config, WithLanguageChangeProps>) {
    return (
      <LangConsumer>
        {({
          language, changeLanguage,
        }) => (
          <Component
            {...props}
            language={language}
            changeLanguage={changeLanguage}
          />
        )}
      </LangConsumer>
    )
  }
}
