// @flow strict

import { type LanguageCode } from 'data/languages'
import { type FiatCurrencyCode } from 'data/currencies'

declare type UserAgreementsConditions = {|
  +understandPrivateDataPolicy?: boolean,
  +consentNoWarranty?: boolean,
  +consentTrackingCookies?: boolean,
  +acceptTermsAndConditions?: boolean,
|}

declare type UserPersistV1 = {|
  +agreementsConditions: UserAgreementsConditions,
  +language: LanguageCode,
  +fiatCurrency: FiatCurrencyCode,
  +isIntroductionPassed: boolean,
  +isAgreementsConfirmed?: boolean,
|}

declare type UserPersist = UserPersistV1

declare type UserState = {|
  +persist: UserPersist,
|}
