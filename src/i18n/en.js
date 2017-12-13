/* eslint-disable max-len */

module.exports = {
  language: 'en',
  warning: {
    memoryStorage: 'You are using Memory as storage. Please don\'t forget to backup your keys!',
  },
  header: {
    sendTitle: 'Send',
    receiveTitle: 'Receive',
    convertTitle: 'Convert',
    keyManagerTitle: 'Key manager',
  },
  networkManager: {
    knownNetworkTitle: {
      main: 'Main Ethereum Network',
      ropsten: 'Ropsten Test Network',
      kovan: 'Kovan Test Network',
      rinkeby: 'Rinkeby Test Network',
    },
    placeholder: {
      customNetwork: 'Custom RPC',
    },
  },
  modals: {
    sendFunds: {
      title: 'Send Funds',
      customGasTitle: 'Custom Gas',
      alert: {
        internalError: 'Transaction failed. Please try again',
      },
      placeholder: {
        address: 'Recipient address',
        account: 'Account',
        amount: 'Amount',
        gas: 'Limit (21,000 Gas)',
        gasPrice: 'Price (1 Gwei)',
      },
      error: {
        password: {
          invalid: 'Incorrect Password',
        },
        address: {
          invalid: 'Please enter a valid account address',
        },
        account: {
          notSelected: 'Please select an account',
        },
        amount: {
          invalid: 'Please enter a valid transfer amount',
          lessThan0: 'Amount should be greater than 0',
          exceedsBalance: 'Amount specified exceeds current balance. Please enter a valid amount.',
        },
        gas: {
          invalid: 'Please enter a valid gas limit value',
          lessThan0: 'Gas limit should be greater than 0',
        },
        gasPrice: {
          invalid: 'Please input a valid gas price value',
          lessThan0: 'Gas price should be greater than 0',
        },
      },
      buttonTitle: 'Send Funds',
    },
    receiveFunds: {
      title: 'Receive Funds',
      copyTitle: {
        do: 'Copy to Clipboard',
        done: 'Copied',
      },
      placeholder: {
        amount: 'Amount (ETH)',
        address: 'Recipient address',
      },
      error: {},
      buttonTitle: 'Generate QR Code',
    },
    keystore: {
      title: 'Key Manager',
      getMoreTitle: 'Get more',
      createAccountTitle: 'New key',
      importAccountTitle: 'Import key',
      table: {
        field: {
          name: 'NAME',
          actions: 'ACTIONS',
        },
        accountType: {
          address: 'ADDRESS',
          mnemonic: 'MNEMONIC',
          readOnly: 'READ ONLY',
        },
        placeholder: {
          name: 'New name',
        },
      },
      accountManagerAction: {
        editName: 'Edit name',
        editDerivationPath: 'Edit derivation path',
        removeAccount: 'Clear key',
      },
      keystoreManagerAction: {
        backupKeystore: 'Backup keys',
        changePassword: 'Set new password',
        removeAccounts: 'Clear keys',
      },
    },
    createAccount: {
      title: 'Create new key',
      alerts: [{
        yes: '',
        no: 'Your passphrase provides access to your wallet and funds.',
      }, {
        yes: '',
        no: 'It is important to keep your passphrase stored in a safe place.',
      }, {
        yes: 'Please ensure to save your passphrase, you will be required to enter your passphrase on the next screen.',
        no: 'Please ensure to save your passphrase, you will be required to enter your passphrase on the next screen.',
      }, {
        yes: 'Please confirm that you have saved your passphrase by re-entering it below.',
        no: 'Please confirm that you have saved your passphrase by re-entering it below.',
      }, {
        yes: 'Great! You’re all set! Remember to keep your passphrase safe, you can’t access your account with it!',
        no: 'Great! You’re all set! Remember to keep your passphrase safe, you can’t access your account with it!',
      }, {
        yes: 'Please enter your password',
        no: 'Please provide a secure password for your wallet.',
      }],
      placeholder: {
        mnemonic: 'Mnemonic',
        mnemonicConfirm: 'Mnemonic',
        password: 'Password',
        passwordConfirm: 'Confirm password',
      },
      error: {
        mnemonicConfirm: {
          notMatched: 'Mnemonic should match',
        },
        password: {
          incorrect: 'Incorrect Password',
        },
        passwordConfirm: {
          notMatched: 'Password should match',
        },
      },
      buttonTitles: [
        'Got it!',
        'I understand',
        'Save as TXT',
        'Confirm',
        'I understand',
        'Save',
      ],
    },
    importAccount: {
      title: 'Import key',
      alerts: [{
        yes: 'Please enter your key data. Sensitive information never leaves your device.',
        no: 'Please enter your key data. Sensitive information never leaves your device.',
      }, {
        yes: 'You can also set custom options for keys derivation from your mnemonic.',
        no: 'You can also set custom options for keys derivation from your mnemonic.',
      }, {
        yes: 'Please enter your password',
        no: 'Please provide a secure password for your wallet.',
      }, {
        yes: 'Your key was imported successfully!',
        no: 'Great! You’re all set! Remember to keep your password safe, you can’t access your account with it!',
      }],
      placeholder: {
        data: 'Address, private key, mnemonic, BIP32 xpub',
        password: 'Password',
        passwordConfirm: 'Confirm password',
      },
      error: {
        data: {
          invalid: 'Please input valid data to import',
        },
        password: {
          invalid: 'Incorrect Password',
        },
        passwordConfirm: {
          notMatched: 'Password should match',
        },
      },
      buttonTitles: [{
        yes: 'Continue',
        no: 'Continue',
      }, {
        yes: 'Continue',
        no: 'Continue',
      }, {
        yes: 'Save',
        no: 'Save',
      }, {
        yes: 'OK',
        no: 'I understand',
      }],
    },
    derivationPath: {
      title: 'New Derivation Path',
      knownPathNames: [
        'Default',
        'Ledger (ETH)',
        'Ledger (ETC)',
        'TREZOR (ETC)',
        'Network: Testnets',
        'Network: Expanse',
      ],
      placeholder: {
        customDerivationPath: 'Custom derivation path',
      },
      error: {
        password: {
          invalid: 'Incorrect Password',
        },
        customDerivationPath: {
          same: 'Can not set the same derivation path',
          invalid: 'Invalid derivation path',
        },
      },
      buttonTitle: 'Set derivation path',
    },
    backupKeystore: {
      title: 'Backup Keystore',
      buttonTitle: 'Save as TXT',
      placeholder: {
        password: 'Keystore password',
      },
      error: {
        password: {
          invalid: 'Incorrect Password',
        },
      },
    },
    changePassword: {
      title: 'New Keystore Password',
      buttonTitle: 'Confirm',
      placeholder: {
        password: 'Current password',
        newPassword: 'New password',
      },
      error: {
        password: {
          invalid: 'Incorrect Password',
        },
        newPassword: {
          weak: 'Password is too weak',
        },
      },
    },
    removeAccounts: {
      title: 'Clear Keystore',
      alert: 'Please confirm that you would like to remove all your keys',
      buttonTitle: 'Confirm',
      error: {
        password: {
          invalid: 'Incorrect Password',
        },
      },
    },
    digitalAssetManager: {
      searchField: 'Search digital assets...',
      table: {
        field: {
          symbol: 'SYMBOL',
          name: 'NAME',
          balance: 'BALANCE',
          licensed: 'LICENSED',
          transfer: 'TRANSFER',
        },
        licensedValue: {
          yes: 'Yes',
          no: 'No',
        },
        transferValue: {
          authorized: 'Authorized',
          notAuthorized: 'Not authorized',
        },
      },
      addCustomTokenTitle: 'Add custom token',
    },
    addCustomToken: {
      title: 'Add Custom Token',
      buttonTitle: 'Save',
      placeholder: {
        address: 'Address',
        name: 'Name',
        symbol: 'Symbol',
        decimals: 'Decimals',
      },
      error: {
        address: {
          invalid: 'Address should be a valid contract address',
          exists: 'Token with this address already exists',
        },
        name: {
          invalid: 'Name should be a valid contract name',
        },
        symbol: {
          invalid: 'Symbol should be a valid contract symbol',
        },
        decimals: {
          invalid: 'Decimals should be valid contract decimals',
        },
      },
    },
    alphaWarning: {
      buttonTitle: 'Got it!',
      message: 'jWallet is still in alpha and not production ready. Please exercise caution and avoid transacting large values.',
    },
    customOptionsTitle: 'Custom options',
  },
  digitalAssets: {
    title: 'Digital Assets',
    iconTitle: 'Manage Digital Assets',
  },
  transactions: {
    searchField: 'Search transactions...',
    table: {
      emptyContract: [
        'Look like there isn\'t any',
        'in your account yet',
      ],
      noActiveDigitalAsset: 'Look like there isn\'t any active digital asset',
      customNetwork: 'We can not load transactions for the private blockchain',
      blockExplorerError: 'We could not load your ETH transactions',
      blockExplorerLink: 'View transactions in block explorer',
      field: {
        amount: 'AMOUNT',
        timestamp: 'TIME',
        address: 'FROM/TO',
        status: 'STATUS',
      },
      detailsField: {
        txHash: 'TXHASH',
        fee: 'FEE',
        from: 'FROM',
        to: 'TO',
      },
      statusValue: {
        accepted: 'Accepted',
        rejected: 'Rejected',
        pending: 'Pending',
      },
    },
    transactionManagerAction: {
      sendFunds: 'Send funds',
      receiveFunds: 'Receive funds',
      convertFunds: 'Convert funds',
      filter: 'Filter',
      remove: 'Remove',
    },
    filterTitle: 'Date',
  },
}

/* eslint-enable max-len */
