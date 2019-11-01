// @flow strict

import { i18n } from 'i18n/lingui'

import { type IndicatorStatus } from './components/Indicator'

export const STATUS_MESSAGE_MAP: { [IndicatorStatus]: ?string } = {
  red: i18n._(
    'common.NewPasswordField.strength.red',
    null,
    { defaults: 'Too weak' },
  ),
  green: i18n._(
    'common.NewPasswordField.strength.green',
    null,
    { defaults: 'Not bad' },
  ),
  yellow: i18n._(
    'common.NewPasswordField.strength.yellow',
    null,
    { defaults: 'Bit weak' },
  ),
  orange: i18n._(
    'common.NewPasswordField.strength.orange',
    null,
    { defaults: 'Easily cracked' },
  ),
}
