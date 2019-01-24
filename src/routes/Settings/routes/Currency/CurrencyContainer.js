// @flow
import { connect } from 'react-redux'

import { CURRENCIES_MAP } from 'data/settings'
import { selectSettingsFiatCurrency } from 'store/selectors/settings'

import { setFiatCurrency } from '../../modules/settings'

import CurrencyView from './CurrencyView'

import type {
  CurrencyFormFieldErrors,
  CurrencyFormFieldValues,
} from './types'

const validate = ({ fiatCurrency }: CurrencyFormFieldValues): CurrencyFormFieldErrors => {
  if (!CURRENCIES_MAP[fiatCurrency]) {
    return {
      fiatCurrency: `Currency ${fiatCurrency} is not available`,
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
  mapDispatchToProps
)(CurrencyView)
