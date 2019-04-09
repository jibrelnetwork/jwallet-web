// @flow

declare type FiatId = string
declare type FiatTimestamp = string
declare type FiatCurrency = 'USD' | 'CNY' | 'EUR' | 'GBP' | 'JPY' | 'KRW'
declare type FiatCourse = { [FiatCurrency]: ?string }
declare type FiatCourseById = { [FiatTimestamp]: ?FiatCourse }
declare type FiatCourses = { [FiatId]: ?FiatCourseById }
declare type FiatCoursesAPI = { [FiatId]: ?FiatCourse }

declare type FiatCurrencyData = {|
  +name: string,
  +symbol: string,
  +code: FiatCurrency,
|}

declare type FiatCurrencies = { [FiatCurrency]: FiatCurrencyData }

declare type TickerPersist = {|
  +items: FiatCourses,
|}

declare type TickerState = {|
  +persist: TickerPersist,
  +isLoading: boolean,
|}
