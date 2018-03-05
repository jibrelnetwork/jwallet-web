/* eslint-disable max-len */

module.exports = {
  language: 'en', // not translate
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
  languages: {
    en: 'English',
    zh: 'Chinese',
    ko: 'Korean',
    ja: 'Japanese',
  },
  routes: {
    addCustomAsset: {
      title: 'Add Custom Asset',
      buttonTitle: 'Add asset',
      placeholder: {
        address: 'Address',
        name: 'Name',
        symbol: 'Symbol',
        decimals: 'Decimals',
      },
    },
    backupKeys: {
      title: 'Backup Keys',
      buttonTitle: 'Backup keys',
      placeholder: {
        password: 'Password',
      },
      error: {
        password: {
          invalid: 'Invalid Password',
        },
      },
    },
    changePassword: {
      title: 'Set new password',
      buttonTitle: 'Save',
      placeholder: {
        password: 'Old password',
        newPassword: 'New password',
        confirmPassword: 'Confirm password',
      },
      error: {
        password: {
          invalid: 'Invalid Password',
        },
        confirmPassword: {
          notMatched: 'Password should match',
        },
      },
    },
    createWallet: {
      title: 'Create New Mnemonic Wallet',
      alert: {
        mnemonic: 'Your mnemonic provides access to your assets!',
        mnemonicConfirm: 'Confirm your mnemonic by re-entering it below.',
        password: 'Please provide a secure password for your wallet.',
      },
      placeholder: {
        mnemonic: 'Your mnemonic',
        mnemonicConfirm: 'Confirm mnemonic',
        name: 'Wallet name',
        password: 'Password',
        passwordConfirm: 'Confirm password',
      },
      buttonTitle: {
        save: 'Save as TXT',
        confirm: 'Confirm',
        prevStep: 'Previous step',
        nextStep: 'Next step',
        finish: 'Finish',
      },
    },
    importWallet: {
      title: 'Import Wallet',
      alert: {
        data: 'Please enter your wallet data',
        password: 'Please provide a secure password for your wallet.',
      },
      placeholder: {
        data: 'Address, private key, mnemonic, BIP32 xpub',
        name: 'Wallet name',
        password: 'Password',
        passwordConfirm: 'Confirm password',
      },
      error: {
        data: {
          invalid: 'Please input valid data to import',
        },
      },
      buttonTitle: {
        prevStep: 'Previous step',
        nextStep: 'Next step',
        finish: 'Finish',
      },
    },
    editWallet: {
      title: 'Edit Wallet',
      placeholder: {
        address: 'Address',
        name: 'Wallet name',
        password: 'Password',
      },
      buttonTitle: {
        save: 'Save',
        confirm: 'Confirm',
      },
    },
    changeWalletPassword: {
      title: 'Set new password',
      buttonTitle: 'Save',
      placeholder: {
        password: 'Old password',
        newPassword: 'New password',
        confirmPassword: 'Confirm password',
      },
    },
    removeWallet: {
      title: 'Remove wallet',
      buttonTitle: 'Yes, remove wallet',
      info: {
        title: 'Remove current wallet',
        text: [
          'All user data, including imported or generated',
          'private keys are stored locally, meaning your private',
        ],
      },
    },
    receiveFunds: {
      title: 'Receive Funds',
      buttonTitleCopy: 'Copy address',
      buttonTitleCopied: 'Copied!',
      placeholder: {
        symbol: 'Asset',
        amount: 'Amount',
        recipient: 'Address',
      },
      error: {
        amount: {
          invalid: 'Please enter a valid transfer amount',
        },
      },
    },
    sendFunds: {
      title: 'Send Funds',
      optionalTitle: 'Optional',
      buttonTitleForm: 'Send funds',
      buttonTitlePassword: 'Confirm',
      alert: {
        internalError: 'Transaction failed. Please try again',
      },
      placeholder: {
        sender: 'Address',
        symbol: 'Asset',
        amount: 'Amount',
        recipient: 'Recipient address',
        gas: 'Gas',
        gasPrice: 'Gas price',
        nonce: 'Nonce',
        password: 'Password',
      },
      error: {
        amount: {
          invalid: 'Please enter a valid transfer amount',
          lessThan0: 'Amount should be greater than 0',
          exceedsBalance: 'Amount specified exceeds current balance. Please enter a valid amount.',
          emptyETHBalance: 'You don\'t have any ETH to paid for transaction',
        },
        recipient: {
          invalid: 'Please enter a valid account address',
        },
        gas: {
          invalid: 'Please enter a valid gas limit value',
          lessThan0: 'Gas limit should be greater than 0',
        },
        gasPrice: {
          invalid: 'Please input a valid gas price value',
          lessThan0: 'Gas price should be greater than 0',
        },
        nonce: {
          invalid: 'Please input a valid transaction nonce',
          lessThan0: 'Nonce should be greater than or equal 0 to',
        },
        password: {
          invalid: 'Invalid Password',
        },
      },
    },
  },
  modals: {
    sendFunds: {
      title: 'Send Funds',
      customGasTitle: 'Custom Gas',
      alert: {
        internalError: 'Transaction failed. Please try again',
        emptyETHBalance: 'You don\'t have any ETH to paid for transaction',
      },
      placeholder: {
        sender: 'Sender',
        recipient: 'Recipient address',
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
        yes: 'Great! You’re all set! Remember to keep your passphrase safe, you can’t access your account without it!',
        no: 'Great! You’re all set! Remember to keep your passphrase safe, you can’t access your account without it!',
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
        no: 'Great! You’re all set! Remember to keep your password safe, you can’t access your account without it!',
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
        customDerivationPath: {
          same: 'Can not set the same derivation path',
          invalid: 'Invalid derivation path',
        },
      },
      buttonTitle: 'Set derivation path',
    },
    removeAccounts: {
      title: 'Clear Keystore',
      alert: 'Please confirm that you would like to remove all your keys',
      buttonTitle: 'Confirm',
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
    alphaWarning: {
      buttonTitle: 'Got it!',
      message: 'jWallet is still in alpha and not production ready. Please exercise caution and avoid transacting large values.',
    },
    general: {
      error: {
        password: {
          invalid: 'Incorrect Password',
        },
        passwordConfirm: {
          notMatched: 'Password should match',
        },
      },
    },
    customOptionsTitle: 'Custom options',
    passwordButtonTitle: 'Type your password',
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
  general: {
    error: {
      password: {
        invalid: 'Invalid Password',
      },
      confirmPassword: {
        notMatched: 'Password should match',
      },
      mnemonicConfirm: {
        notMatched: 'Mnemonic should match',
      },
      walletName: {
        empty: 'Wallet name shouldn\'t be empty',
        invalid: 'Please input valid key name',
        exists: 'Wallet with this name already exists',
      },
      derivationPath: {
        invalid: 'Please input valid custom derivation path',
      },
      searchQuery: {
        invalid: 'Search query is invalid',
      },
      address: {
        invalid: 'Address should be a valid contract address',
        exists: 'Asset with this address already exists',
      },
      name: {
        invalid: 'Name should be a valid contract name',
        exists: 'Asset with this name already exists',
      },
      symbol: {
        invalid: 'Symbol should be a valid contract symbol',
        exists: 'Asset with this symbol already exists',
      },
      decimals: {
        invalid: 'Decimals should be valid contract decimals',
      },
    },
  },
}

/* eslint-enable max-len */
