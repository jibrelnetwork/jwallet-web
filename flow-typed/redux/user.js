// @flow

import { type FiatCurrencyCode } from 'data/currencies'
import { type LanguageCode } from 'data/languages'

declare type UserState = {|
  persist: {|
    +isIntroductionPassed: boolean,
    +agreementsConditions: {
      +understandPrivateDataPolicy?: boolean,
      +consentNoWarranty?: boolean,
      +consentTrackingCookies?: boolean,
      +acceptTermsAndConditions?: boolean,
    },
    +isAgreementsConfirmed?: boolean,
    +fiatCurrency: FiatCurrencyCode,
    +language: LanguageCode,
  |},
|}
