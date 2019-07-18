// @flow

import React from 'react'

import {
  LanguageConsumer,
  type ChangeLanguage,
} from './LanguageProvider'

export type WithLanguageChangeProps = {|
  language: LanguageCode,
  changeLanguage: ChangeLanguage,
|}

export function withLanguageChange<Config: {}>(
  Component: React$AbstractComponent<Config, any>,
  // $FlowFixMe
): React$AbstractComponent<$Diff<Config, WithLanguageChangeProps>, any> {
  // $FlowFixMe
  return function WithLang(props: $Diff<Config, WithLanguageChangeProps>) {
    return (
      <LanguageConsumer>
        {({
          language,
          changeLanguage,
        }) => (
          <Component
            {...props}
            language={language}
            changeLanguage={changeLanguage}
          />
        )}
      </LanguageConsumer>
    )
  }
}
