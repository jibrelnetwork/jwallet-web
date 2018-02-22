// @flow

import gtm from 'services/gtm'
import * as backupWallet from 'routes/Wallets/routes/BackupWallet/modules/backupWallet'

export const pushEvent = () => (next: Next) => (action: FSA) => {
  const { type, payload }: FSA = action

  switch (type) {
    case backupWallet.BACKUP_SUCCESS: {
      gtm.pushBackupWallet(payload && payload.walletType)
      break
    }

    default: break
  }

  return next(action)
}
