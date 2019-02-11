// @flow

import { t } from 'ttag'

export default function formatBoolean(value: boolean): string {
  return value ? t`Enabled` : t`Disabled`
}
