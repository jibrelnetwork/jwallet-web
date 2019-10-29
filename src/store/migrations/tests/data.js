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
          data: 'hYW4EXjdsB1HH1CXApVjRW5WXbnoOsZYM7Ag0zx8903Uz8z3BNbSzu9zvD1Z/JgwAIPqnLe5kLqXEeOgb95Nfy/3zDoalE+DGFgwhgMadRdGY+ubH1xt45QbpxdvWcSuOrvldipOjldO1680ffryTDd7tIqea4TJlzRYQvPrmw==',
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

export const SETTINGS = {
  v0: {
    fiatCurrency: 'EUR',
  },
}

export const USER = {
  v1: {
    agreementsConditions: {
      understandPrivateDataPolicy: true,
      consentNoWarranty: true,
      consentTrackingCookies: true,
      acceptTermsAndConditions: true,
    },
    language: 'en',
    fiatCurrency: 'EUR',
    isIntroductionPassed: true,
    isAgreementsConfirmed: true,
  },
}

export const NOTES = {
  v0: {
    items: {
      '12': 'a'.repeat(100),
      '34': 'b'.repeat(10),
      '56': 'c'.repeat(1000),
      '78': 'd',
      '90': 'e'.repeat(257),
    },
  },
  v1: {
    items: {
      '12': 'a'.repeat(100),
      '34': 'b'.repeat(10),
      '56': 'c'.repeat(256),
      '78': 'd',
      '90': 'e'.repeat(256),
    },
  },
}

export const CONTACTS = {
  v0: {
    items: {
      '123': {
        address: '123',
        name: '1'.repeat(100),
        description: '2'.repeat(1000),
      },
      '456': {
        name: 'a',
        address: '456',
        description: 'b',
      },
      '789': {
        address: '789',
        name: 'a'.repeat(33),
        description: 'b'.repeat(257),
      },
    },
  },
  v1: {
    items: {
      '123': {
        address: '123',
        name: '1'.repeat(32),
        description: '2'.repeat(256),
      },
      '456': {
        name: 'a',
        address: '456',
        description: 'b',
      },
      '789': {
        address: '789',
        name: 'a'.repeat(32),
        description: 'b'.repeat(256),
      },
    },
  },
}

const DIGITAL_ASSET = {
  name: 'Jibrel Network Token',
  symbol: 'JNT',
  blockchainParams: {
    type: 'erc-20',
    features: [
      'mintable',
    ],
    address: '0xa5fd1a791c4dfcaacc963d4f73c6ae5824149ea7',
    decimals: 18,
    staticGasAmount: 98232,
    deploymentBlockNumber: 4736154,
  },
  display: {
    isDefaultForcedDisplay: true,
    digitalAssetsListPriority: 980,
  },
  priceFeed: {
    currencyID: 2498,
    currencyIDType: 'coinmarketcap',
  },
  assetPage: {
    // eslint-disable-next-line max-len
    description: 'Jibrel provides currencies, equities, commodities and other financial assets as standard ERC-20 tokens on the Ethereum blockchain',
    urls: [
      {
        type: 'site',
        url: 'https://jibrel.network/',
      },
      {
        type: 'binance',
        url: 'https://info.binance.com/en/currencies/jibrel-network-token',
      },
      {
        type: 'coinmarketcap',
        url: 'https://coinmarketcap.com/currencies/jibrel-network',
      },
    ],
  },
}

export const DIGITAL_ASSETS = {
  v0: {
    items: {
      '123': {
        ...DIGITAL_ASSET,
        name: '1'.repeat(100),
        symbol: '2'.repeat(10),
      },
      '456': {
        ...DIGITAL_ASSET,
        name: '3'.repeat(100),
        symbol: '4'.repeat(10),
        isCustom: true,
      },
      '789': {
        ...DIGITAL_ASSET,
        name: '5'.repeat(33),
        symbol: '6'.repeat(6),
        isCustom: true,
      },
      '000': {
        ...DIGITAL_ASSET,
        name: '7',
        symbol: '8',
        isCustom: true,
      },
    },
  },
  v1: {
    items: {
      '123': {
        ...DIGITAL_ASSET,
        name: '1'.repeat(100),
        symbol: '2'.repeat(10),
      },
      '456': {
        ...DIGITAL_ASSET,
        name: '3'.repeat(32),
        symbol: '4'.repeat(5),
        isCustom: true,
      },
      '789': {
        ...DIGITAL_ASSET,
        name: '5'.repeat(32),
        symbol: '6'.repeat(5),
        isCustom: true,
      },
      '000': {
        ...DIGITAL_ASSET,
        name: '7',
        symbol: '8',
        isCustom: true,
      },
    },
  },
}

export const WALLETS_ADDRESSES = {
  v0: {
    addressNames: {
      '12': 'a'.repeat(100),
      '34': 'b'.repeat(10),
      '56': 'c'.repeat(1000),
      '78': 'd',
      '90': 'e'.repeat(33),
    },
  },
  v1: {
    addressNames: {
      '12': 'a'.repeat(32),
      '34': 'b'.repeat(10),
      '56': 'c'.repeat(32),
      '78': 'd',
      '90': 'e'.repeat(32),
    },
  },
}
