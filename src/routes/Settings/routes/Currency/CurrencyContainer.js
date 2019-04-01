// @flow

import { connect } from 'react-redux'
import { t } from 'ttag'

import currenciesData from 'data/currencies'
import { selectSettingsFiatCurrency } from 'store/selectors/settings'

import { setFiatCurrency } from 'store/modules/settings'

import CurrencyView from './CurrencyView'

import {
  type CurrencyFormFieldErrors,
  type CurrencyFormFieldValues,
} from './types'

const validate = ({ fiatCurrency }: CurrencyFormFieldValues): CurrencyFormFieldErrors => {
  const fiatCurrencyData: ?FiatCurrencyData = currenciesData[fiatCurrency]

  if (!fiatCurrencyData) {
    return {
      fiatCurrency: t`Currency ${fiatCurrency} is not available`,
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
