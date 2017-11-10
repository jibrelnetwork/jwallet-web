module.exports = {
  language: 'en',
  header: {
    sendTitle: 'Send',
    receiveTitle: 'Receive',
    convertTitle: 'Convert',
    keysTitle: 'Keys manager',
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
      customOptionsTitle: 'Custom options',
      alert: {
        incorrectPassword: 'Password is incorrect',
        internalError: 'Sending of the transaction was failed. Please try again later'
      },
      placeholder: {
        address: 'Recipient address',
        account: 'Account',
        amount: 'Amount',
        gas: 'Gas',
        gasPrice: 'Gas price (wei)',
      },
      error: {
        address: {
          invalid: 'Please input valid account address',
        }
        account: {
          notSelected: 'Please select account',
        },
        amount: {
          invalid: 'Please input valid amount to transfer',
          lessThan0: 'Amount should be greater than 0',
          exceedsBalance: 'Amount exceeds account balance',
        },
        gas: {
          invalid: 'Please input valid gas limit value',
          lessThan0: 'Gas limit should be greater than 0',
        },
        gasPrice: {
          invalid: 'Please input valid gas price value',
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
        amount: 'Amount',
        address: 'Recipient address',
      },
      error: {},
      buttonTitle: 'Generate QR Code',
    },
    keystore: {
      title: 'Keys Manager',
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
        no: 'Anyone who has access to your passphrase can spend your money.',
      }, {
        yes: '',
        no: 'Screenshots are not secure. If you save a screenshot, it can be viewed by other applications.',
      }, {
        yes: 'Save your passphrase and move it to a safe place, in the next step we will check it.',
        no: 'Save your passphrase and move it to a safe place, in the next step we will check it.',
      }, {
        yes: 'Let\'s check your word combination. Enter it in the box below.',
        no: 'Let\'s check your word combination. Enter it in the box below.',
      }, {
        yes: 'Excellent! Keep your passphrase in a safe place. Without it, access to your account may be lost forever.',
        no: 'Excellent! Keep your passphrase in a safe place. Without it, access to your account may be lost forever.',
      }, {
        yes: 'Please input your password',
        no: 'It\'s time to create a secure password for your wallet.',
      }],
      placeholder: {
        mnemonic: 'Mnemonic',
        mnemonicConfirm: 'Mnemonic',
        password: 'Password',
        passwordConfirm: 'Confirm password',
      },
      error: {},
      buttonTitles: [
        'I understood',
        'I understood',
        'Save as TXT',
        'Confirm',
        'I understood',
        'Save',
      ],
    },
    importAccount: {
      title: 'Import key',
      alerts: [{
        yes: 'Please input data for your key. It will be stored only in your browser.',
        no: 'Please input data for your key. It will be stored only in your browser.',
      }, {
        yes: 'Now you can set custom options for keys derivation from your mnemonic.',
        no: 'Now you can set custom options for keys derivation from your mnemonic.',
      }, {
        yes: 'Please input your password',
        no: 'It\'s time to create a secure password for your wallet.',
      }, {
        yes: 'Your key has been successfully imported',
        no: 'Excellent! Keep your password in a safe place. Without it, you will not be able to use jWallet.',
      }],
      placeholder: {
        data: 'Address, private key, mnemonic, BIP32 xpub',
        password: 'Password',
        passwordConfirm: 'Confirm password',
      },
      error: {},
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
        no: 'I understood',
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
        password: 'Password',
        customDerivationPath: 'Custom derivation path',
      },
      error: {
        password: {
          incorrect: 'Password is incorrect',
        },
        customDerivationPath: {
          same: 'Can not set the same derivation path',
          invalid: 'Invalid derivation path',
        },
      },
      buttonTitle: 'Set derivation path',
    },
    backupKeysore: {
      title: 'Backup Keystore',
      buttonTitle: 'Save as TXT',
      placeholder: {
        password: 'Keystore password',
      },
      error: {
        password: {
          incorrect: 'Password is incorrect',
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
          incorrect: 'Password is incorrect',
        },
        newPassword: {
          weak: 'Password is too weak',
        },
      },
    },
    removeAccounts: {
      title: 'Clear Keystore',
      alert: 'Please confirm that you really want to remove all your keys',
      buttonTitle: 'Confirm',
    },
    tokens: {
      searchField: 'Search tokens',
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
          invalid: 'Address should be valid contract address',
        },
        name: {
          invalid: 'Name should be valid contract name',
        },
        symbol: {
          invalid: 'Symbol should be valid contract symbol',
        },
        decimals: {
          invalid: 'Decimals should be valid contract decimals',
        },
      },
    },
  },
  currencies: {
    title: 'Currencies',
    iconTitle: 'Manage tokens',
  },
  transactions: {
    searchField: 'Search transactions',
    table: {
      emptyContract: [
        'Look like there isn\'t any',
        'in your account yet',
      ],
      emptyETH: [
        'At the moment we can not load your ETH transactions',
        'See them in the blockexplorer',
      ],
      field: {
        amount: 'AMOUNT',
        time: 'TIME',
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
