// @flow

import { connect } from 'react-redux'
import { i18n } from 'i18n/lingui'

import { CURRENCIES } from 'data'
import { selectSettingsFiatCurrency } from 'store/selectors/settings'

import { setFiatCurrency } from 'store/modules/settings'

import CurrencyView from './CurrencyView'

import {
  type CurrencyFormFieldErrors,
  type CurrencyFormFieldValues,
} from './types'

const validate = ({ fiatCurrency }: CurrencyFormFieldValues): CurrencyFormFieldErrors => {
  const fiatCurrencyData: ?FiatCurrencyData = CURRENCIES[fiatCurrency]

  if (!fiatCurrencyData) {
    return {
      fiatCurrency: i18n._(
        'SettingsCurrency.errors.currencyUnavailable',
        { symbol: fiatCurrency },
        { defaults: 'Currency { symbol } is not available' },
      ),
    }
  }

  return {}
}

function mapStateToProps(state: AppState) {
  const fiatCurrency: FiatCurrency = selectSettingsFiatCurrency(state)

  return {
    fiatCurrency,
    validate,
  }
}

const mapDispatchToProps = {
  onSubmit: setFiatCurrency,
}

export default connect/* :: < AppState, null, OwnPropsEmpty, _, _ > */(
  mapStateToProps,
  mapDispatchToProps,
)(CurrencyView)
