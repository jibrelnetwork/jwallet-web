// @flow strict

const WALLETS_BEFORE = [{
  id: 'b30ade80-05f5-4229-bba8-00aa463e99df',
  name: 'prv',
  address: '0x20C5D99DAa85237718dC69243527fCA5545F94A6',
  orderIndex: 1,
  isSimplified: true,
  isReadOnly: false,
  customType: 'privateKey',
  type: 'address',
  encrypted: {
    mnemonic: null,
    passphrase: null,
    privateKey: {
      nonce: 'WqKta9tkwgB9PPQyb91m4vbqrRxjxuZT',
      // eslint-disable-next-line max-len
      data: '/brdDGAtdJuoZNx1SyLszmFYhu7qTRj0OBkIYMvrJU5qIRizZgwPIr7V2G/FtsaR7ziMWkA9fvwGohWbJXeHPCi/opvVvJmgdlM++ITo0l/8jUv57N0ckb4Z5nok/BJ1ocyatv775u1eM91821Ul4bt4Y2RV6ND8Ic5NB2Nd23FVCyhlPwdBNQ==',
    },
  },
  network: null,
  addressIndex: null,
  derivationPath: null,
  bip32XPublicKey: null,
}, {
  id: '873d1dd6-ddda-4509-9cce-1aecba7946be',
  name: 'mnemonic',
  network: 'livenet',
  orderIndex: 2,
  isSimplified: false,
  derivationPath: 'm/44\'/60\'/0\'/0',
  addressIndex: 0,
  isReadOnly: false,
  // eslint-disable-next-line max-len
  bip32XPublicKey: 'xpub6ENKDW6vuufFhX27QZcoFqJKgadxtu5wteC4wJnPz6EM5QP2koXWSjEZWcRscBMPT5PwCqrHRYtKBBaiGP7J5wCTr2Ny6N3oWsJ3EzpBxTL',
  type: 'mnemonic',
  customType: 'mnemonic',
  encrypted: {
    privateKey: null,
    mnemonic: {
      nonce: 'Jdg6QkMzFLwzXnlb4YAK3o/NiNHpWllh',
      // eslint-disable-next-line max-len
      data: 'WnYe9MUMXSA0AEstNr3qFAFrp12NDtdd4Hg6DEXW0uht6lb677WPw3A7pCZg9lWkdFuW/+OYcOWyvH53ju4w0LocTuM54nexPfJjEO52HB8Q//J6ArywfrBoEGYZXN4T1qe1S+Zs3gKLmQKfm0mREcJq8zJBG7eBK4Err1sS3ZTlqRmbXHdWEA==',
    },
    passphrase: {
      nonce: 'sLLLXQHLuDBbCSFvr8vl0wCFbfVoDQvC',
      // eslint-disable-next-line max-len
      data: 'elDzFmOr4ka1zfNV3BVXiyKh+kQY3ATStsznTtg8zidmHUTtY1Bc9mS1J+7P7QoLBI/Zq097U3KnlBuTpOM3wQvSomHUm8oPIpebzFHGzU5MBnRnmgZ9XILN6n3QQq0ukWaEj3m+LhDMagCxGry8T0raNRLZUMF4EDdgImxy7DEbVBmtk7Pe0w==',
    },
  },
  address: null,
}, {
  id: 'f3f74309-3ac3-4dce-9b02-ce3d47808d4e',
  name: 'xpub',
  orderIndex: 3,
  isSimplified: true,
  addressIndex: 0,
  isReadOnly: true,
  // eslint-disable-next-line max-len
  bip32XPublicKey: 'xpub6Dh6qeTMqoS4KJVdt4V53zrTvtueLTexghP92munR8whUifDaszLoMj8jkMdco3gZTszse9iaGoqABR8FxB8yBaHJJ7Mq2BLf39qM7ja95S',
  customType: 'bip32Xpub',
  type: 'mnemonic',
  encrypted: {
    mnemonic: null,
    privateKey: null,
    passphrase: null,
  },
  address: null,
  network: null,
  derivationPath: null,
}, {
  id: 'cb19081b-4227-4538-bbaa-2eb7b2cf40a2',
  name: 'addr',
  orderIndex: 4,
  isSimplified: true,
  isReadOnly: true,
  type: 'address',
  address: '0xa6b395DF699896a53341602A67E2ED5BbEEe3B21',
  customType: 'address',
  encrypted: {
    mnemonic: null,
    passphrase: null,
    privateKey: null,
  },
  network: null,
  addressIndex: null,
  derivationPath: null,
  bip32XPublicKey: null,
}]

const INTERNAL_KEY = {
  // eslint-disable-next-line max-len
  data: 'zhiPx0GZsk8AHiZDRRST7Ms69BQCmrtjoxWjarUf5IoyNs0lnGZiv68OSZ4dnahL1OAM9GgxN4igG/WRYrvDiBx7O0XwwPpW51k7xHVfgcp/RqyP1N5WG3MgZOXloq6iRkRDoVsfewlwz0S6QUUW+dsG0pB47HJzWHpm8Y3Yc5gDuq9i85zu9Q==',
  nonce: 'ojgjktg2c+a70LJ0GJNexmzhpjprm/7W',
}

const PASSWORD_HINT = 'super secret p@sw'
const PASSWORD_SALT = '2e8twhOaJ8JU2rVaYwY4uq608gsvVLa7tp+HqihBzeI='

export const PASSWORD = {
  v1: {
    hint: PASSWORD_HINT,
    salt: PASSWORD_SALT,
    internalKey: INTERNAL_KEY,
  },
}

export const WALLETS = {
  v0: {
    activeWalletId: null,
    internalKey: INTERNAL_KEY,
    passwordOptions: {
      derivedKeyLength: 32,
      encryptionType: 'nacl.secretbox',
      passwordHint: PASSWORD_HINT,
      salt: PASSWORD_SALT,
      saltBytesCount: 32,
      scryptParams: {
        N: 262144,
        p: 1,
        r: 8,
      },
    },
    items: WALLETS_BEFORE,
  },
  v1: {
    activeWalletId: WALLETS_BEFORE[0].id,
    items: [{
      ...WALLETS_BEFORE[0],
      xpub: null,
      derivationIndex: null,
      encrypted: {
        ...WALLETS_BEFORE[0].encrypted,
        xprv: null,
      },
    }, {
      ...WALLETS_BEFORE[1],
      derivationIndex: 0,
      // eslint-disable-next-line max-len
      xpub: 'xpub6ENKDW6vuufFhX27QZcoFqJKgadxtu5wteC4wJnPz6EM5QP2koXWSjEZWcRscBMPT5PwCqrHRYtKBBaiGP7J5wCTr2Ny6N3oWsJ3EzpBxTL',
      encrypted: {
        ...WALLETS_BEFORE[1].encrypted,
        xprv: {
          nonce: '5uewdcpUZGXfbywNsHv4TyOM1AjHxKR7',
          // eslint-disable-next-line max-len
          data: 'vh7EFQ6VNYLaR1W0CWQ/cG5WXbnoOcNHD7wX1Vttu1vTl47XduvU86xNtTQgwrkiOIPz24yFpauWIsSgcexUYAamngwom3yUJlxw/jw/VR9rEfWVGis13tRVpFtQaISONrqhPSpqhmhQxoMdbPnOWRILkbWrJaWBgxp8V8r7mg==',
        },
      },
    }, {
      ...WALLETS_BEFORE[2],
      // eslint-disable-next-line max-len
      xpub: 'xpub6Dh6qeTMqoS4KJVdt4V53zrTvtueLTexghP92munR8whUifDaszLoMj8jkMdco3gZTszse9iaGoqABR8FxB8yBaHJJ7Mq2BLf39qM7ja95S',
      customType: 'xpub',
      derivationIndex: 0,
      encrypted: {
        ...WALLETS_BEFORE[2].encrypted,
        xprv: null,
      },
    }, {
      ...WALLETS_BEFORE[3],
      xpub: null,
      derivationIndex: null,
      encrypted: {
        ...WALLETS_BEFORE[3].encrypted,
        xprv: null,
      },
    }],
  },
}
