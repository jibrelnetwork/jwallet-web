// @flow
import { connect } from 'react-redux'
import { selectSettings } from 'store/selectors/settings'

import { CURRENCIES_MAP } from 'data/settings'

import { changeLocalCurrencyCode } from '../../modules/settings'

import CurrencyView from './CurrencyView'
import type {
  CurrencyFormFieldErrors,
  CurrencyFormFieldValues,
} from './types'

const validate: (CurrencyFormFieldValues) => CurrencyFormFieldErrors = ({
  currencyCode,
}) => {
  if (!CURRENCIES_MAP[currencyCode]) {
    return {
      currencyCode: `Currency ${currencyCode} is not available`,
    }
  }

  return {}
}

function mapStateToProps(state: AppState) {
  const { localCurrencyCode } = selectSettings(state)

  return {
    initialCurrencyCode: localCurrencyCode,
    validate,
  }
}

const mapDispatchToProps = {
  onSubmit: changeLocalCurrencyCode,
}

export default connect/* :: < AppState, null, OwnPropsEmpty, _, _ > */(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyView)
