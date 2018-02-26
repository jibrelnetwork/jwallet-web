/* eslint-disable max-len */

module.exports = {
  language: 'ja', // not translate
  warning: {
    memoryStorage: 'メモリをストレージとして使用しています。キーをバックアップすることを忘れないでください!',
  },
  header: {
    sendTitle: '送信',
    receiveTitle: '受信',
    convertTitle: '変換',
    keyManagerTitle: 'キー マネージャー',
  },
  networkManager: {
    knownNetworkTitle: {
      main: 'メイン Ethereum ネットワーク',
      ropsten: 'Ropstenテスト ネットワーク',
      kovan: 'Kovanテスト ネットワーク',
      rinkeby: 'Rinkebyテスト ネットワーク',
    },
    placeholder: {
      customNetwork: 'カスタムRPC',
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
        address: 'アドレス',
        name: '名',
        symbol: 'シンボル',
        decimals: '小数点以下の桁数',
      },
      error: {
        address: {
          invalid: 'アドレスが有効な契約のアドレスをする必要があります',
          exists: 'Asset with this address already exists',
        },
        name: {
          invalid: '有効な契約名である必要があります',
        },
        symbol: {
          invalid: '記号は、有効な契約記号をする必要があります',
          exists: 'Asset with this symbol already exists',
        },
        decimals: {
          invalid: '小数点以下は小数点以下の有効な契約をする必要があります',
        },
      },
    },
    backupKeys: {
      title: 'Backup Keys',
      buttonTitle: 'Backup keys',
      placeholder: {
        password: 'キーは、パスワードを保存',
      },
      error: {
        password: {
          invalid: 'Invalid Password',
        },
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
    changePassword: {
      title: 'Set new password',
      buttonTitle: 'Save',
      placeholder: {
        password: 'Old password',
        newPassword: '新しいパスワード',
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
    clearKeys: {
      title: 'Clear keys',
      buttonTitle: 'Yes, clear keys',
      info: {
        title: 'Clear all keys',
        text: [
          'All user data, including imported or generated',
          'private keys are stored locally, meaning your private',
        ],
      },
    },
    editKey: {
      title: 'Edit Key',
      placeholder: {
        address: 'Address',
        name: 'Key name',
        password: 'Password',
      },
      buttonTitle: {
        form: 'Save',
        password: 'Confirm',
        remove: 'Remove key',
      },
    },
    importKey: {
      title: 'Import New Key',
      alert: {
        data: 'Please enter your key data',
        name: 'Some text, some text.',
        password: 'Please provide a secure password for your wallet.',
      },
      placeholder: {
        data: 'Address, private key, mnemonic, BIP32 xpub',
        name: 'Key name',
        password: 'Password',
        passwordConfirm: 'Confirm password',
      },
      error: {
        data: {
          invalid: 'Please input valid data to import',
        },
        derivationPath: {
          invalid: 'Please input valid custom derivation path',
        },
        name: {
          empty: 'Key name shouldn\'t be empty',
          invalid: 'Please input valid key name',
          exists: 'Key with this name already exists',
        },
        password: {},
        passwordConfirm: {
          notMatched: 'Password should match',
        },
      },
      buttonTitle: {
        prevStep: 'Previous step',
        nextStep: 'Next step',
        finish: 'Finish',
      },
    },
    createKey: {
      title: 'Create New Key',
      alert: {
        mnemonic: 'Your mnemonic provides access to your assets!',
        mnemonicConfirm: 'Confirm your mnemonic by re-entering it below.',
        name: 'Some text, some text.',
        password: 'Please provide a secure password for your wallet.',
      },
      placeholder: {
        mnemonic: 'Your mnemonic',
        mnemonicConfirm: 'Confirm mnemonic',
        name: 'Key name',
        password: 'Password',
        passwordConfirm: 'Confirm password',
      },
      error: {
        mnemonicConfirm: {
          notMatched: 'Mnemonic should match',
        },
        name: {
          empty: 'Key name shouldn\'t be empty',
          invalid: 'Please input valid key name',
          exists: 'Key with this name already exists',
        },
        password: {},
        passwordConfirm: {
          notMatched: 'Password should match',
        },
      },
      buttonTitle: {
        save: 'Save as TXT',
        confirm: 'Confirm',
        prevStep: 'Previous step',
        nextStep: 'Next step',
        finish: 'Finish',
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
          lessThan0: 'Nonce should be greater than or equal to 0',
        },
        password: {
          invalid: 'Invalid Password',
        },
      },
    },
  },
  modals: {
    sendFunds: {
      title: '送金',
      customGasTitle: 'カスタム ガス',
      alert: {
        internalError: 'トランザクションに失敗しました。もう一度やり直してください',
        emptyETHBalance: 'You don\'t have any ETH to paid for transaction',
      },
      placeholder: {
        sender: 'Sender',
        recipient: '受信者アドレス',
        amount: '量',
        gas: '制限(21,000ガス)',
        gasPrice: '価格(1 Gwei)',
      },
      error: {
        password: {
          invalid: 'パスワード',
        },
        address: {
          invalid: '有効なアカウントのアドレスを入力してください',
        },
        account: {
          notSelected: 'アカウントを選択してください',
        },
        amount: {
          invalid: '有効な転送量を入力してください',
          lessThan0: '量を 0 より大きい値にする必要があります',
          exceedsBalance: '指定した量を超えると現在の残高。有効な量を入力してください。',
        },
        gas: {
          invalid: '有効なガスの制限値を入力してください',
          lessThan0: 'ガス制限は 0 より大きくなければなりません',
        },
        gasPrice: {
          invalid: '有効なガス価格の値を入力してください',
          lessThan0: 'ガス価格は 0 より大きくなければなりません',
        },
      },
      buttonTitle: '資金を送る',
    },
    receiveFunds: {
      title: '資金を受け取る',
      copyTitle: {
        do: 'クリップボードにコピー',
        done: 'コピー',
      },
      placeholder: {
        amount: '量(ETH)',
        address: '受信者のアドレス',
      },
      error: {},
      buttonTitle: 'QR コードを生成',
    },
    keystore: {
      title: 'キー マネージャー',
      getMoreTitle: '詳細を取得',
      createAccountTitle: '新しいキー',
      importAccountTitle: 'キーのインポート',
      table: {
        field: {
          name: '名',
          actions: 'アクション',
        },
        accountType: {
          address: 'アドレス',
          mnemonic: 'ニーモニック',
          readOnly: '読み取り専用',
        },
        placeholder: {
          name: '新しい名前',
        },
      },
      accountManagerAction: {
        editName: '名を編集',
        editDerivationPath: 'パスの派生を編集',
        removeAccount: 'クリア キー',
      },
      keystoreManagerAction: {
        backupKeystore: 'キーをバックアップ',
        changePassword: '新しいパスワードの設定',
        removeAccounts: 'キーをオフに',
      },
    },
    createAccount: {
      title: '新しいキーの作成',
      alerts: [{
        yes: '',
        no: 'あなたのパスフレーズがお財布と資金へのアクセスを提供します。',
      }, {
        yes: '',
        no: 'あなたのパスフレーズを安全な場所に格納することが重要です。',
      }, {
        yes: 'を確認してくださいあなたのパスフレーズを保存するには、次の画面で、パスフレーズを入力する必要ななります。',
        no: 'を確認してくださいあなたのパスフレーズを保存するには、次の画面で、パスフレーズを入力する必要ななります。',
      }, {
        yes: '再下記に入力して、パスフレーズを保存いることを確認してください。',
        no: '再下記に入力して、パスフレーズを保存いることを確認してください。',
      }, {
        yes: '素晴らしい!あなたはすべてのセットしている!パスフレーズを安全に保つために覚えている, それがなければあなたのアカウントにアクセスできません。!',
        no: '素晴らしい!あなたはすべてのセットしている!パスフレーズを安全に保つために覚えて、それなしあなたのアカウントにアクセスすることはできません!',
      }, {
        yes: 'あなたのパスワードを入力してください',
        no: 'あなたの財布の安全なパスワードを指定してください。',
      }],
      placeholder: {
        mnemonic: 'ニーモニック',
        mnemonicConfirm: 'ニーモニック',
        password: 'パスワード',
        passwordConfirm: 'パスワードの確認',
      },
      error: {
        mnemonicConfirm: {
          notMatched: 'のニーモニックと一致する必要があります',
        },
      },
      buttonTitles: [
        'それを得た!',
        '私は理解して',
        'として保存TXT',
        '確認します',
        '私は理解して',
        '保存',
      ],
    },
    importAccount: {
      title: 'キーのインポート',
      alerts: [{
        yes: '、重要なデータを入力してください。機密情報は、お使いのデバイスを残します。',
        no: '、重要なデータを入力してください。機密情報は、お使いのデバイスを残します。',
      }, {
        yes: 'あなたのニーモニックから派生キーのカスタム オプションを設定することも。',
        no: 'あなたのニーモニックから派生キーのカスタム オプションを設定することも。',
      }, {
        yes: 'あなたのパスワードを入力してください',
        no: 'あなたの財布の安全なパスワードを指定してください。',
      }, {
        yes: 'あなたのキーが正常にインポートされました!',
        no: '素晴らしい!あなたはすべてのセットしている!忘れずにあなたのパスワードを安全に保つ、それなしあなたのアカウントにアクセスすることはできません!',
      }],
      placeholder: {
        data: 'アドレス、秘密キー、ニーモニック, BIP32 xpub',
        password: 'パスワード',
        passwordConfirm: 'パスワードの確認入力',
      },
      error: {
        data: {
          invalid: 'をインポートする有効なデータを入力してください',
        },
      },
      buttonTitles: [{
        yes: '続行',
        no: '続行',
      }, {
        yes: '続行',
        no: '続行',
      }, {
        yes: '保存',
        no: '保存',
      }, {
        yes: 'OK',
        no: '私は理解して',
      }],
    },
    derivationPath: {
      title: '新しい派生パス',
      knownPathNames: [
        'Default',
        'Ledger (ETH)',
        'Ledger (ETC)',
        'TREZOR (ETC)',
        'ネットワーク: ネットをテストします',
        'ネットワーク: 広がり',
      ],
      placeholder: {
        customDerivationPath: 'カスタム派生パス',
      },
      error: {
        customDerivationPath: {
          same: '同じ派生のパスを設定することはできません',
          invalid: '無効パス',
        },
      },
      buttonTitle: 'セット派生パス',
    },
    removeAccounts: {
      title: 'キーストアをクリア',
      alert: 'すべてのキーを削除したいことを確認してください',
      buttonTitle: '確認します',
    },
    digitalAssetManager: {
      searchField: 'デジタル資産を検索...',
      table: {
        field: {
          symbol: 'シンボル',
          name: '名',
          balance: 'バランス',
          licensed: 'ライセンス',
          transfer: '転送',
        },
        licensedValue: {
          yes: 'うん',
          no: '違います',
        },
        transferValue: {
          authorized: '承認',
          notAuthorized: '権限がありません',
        },
      },
      addCustomTokenTitle: 'カスタム トークンを追加',
    },
    alphaWarning: {
      buttonTitle: 'それを得た!',
      message: 'jWalletまだアルファの生産準備ができていないです。注意が必要、大きな値を取引してください。',
    },
    general: {
      error: {
        password: {
          invalid: 'パスワードが正しくありません',
        },
        passwordConfirm: {
          notMatched: 'パスワードと一致する必要があります',
        },
      },
    },
    customOptionsTitle: 'カスタム オプション',
    passwordButtonTitle: 'Type your password',
  },
  digitalAssets: {
    title: 'デジタル資産',
    iconTitle: 'デジタル資産を管理',
  },
  transactions: {
    searchField: 'トランザクションを検索...',
    table: {
      emptyContract: [
        'いずれかがないよう',
        'まだあなたのアカウントで',
      ],
      noActiveDigitalAsset: '任意のアクティブなデジタル資産がないよう',
      customNetwork: '私たちはプライベート ・ ブロック チェーンのトランザクションを読み込むことができません',
      blockExplorerError: '私たちは、ETH トランザクションを読み込めませんでした',
      blockExplorerLink: 'ブロック エクスプ ローラーでトランザクションを表示',
      field: {
        amount: '量',
        timestamp: '時間',
        address: 'から / 漸く',
        status: 'ステータス',
      },
      detailsField: {
        txHash: 'TXHASH',
        fee: '料金',
        from: '差出人',
        to: '宛先',
      },
      statusValue: {
        accepted: '受け入れ',
        rejected: '拒否',
        pending: '保留中',
      },
    },
    transactionManagerAction: {
      sendFunds: '送金',
      receiveFunds: '資金をを受け取る',
      convertFunds: '資金に変換',
      filter: 'フィルター',
      remove: '削除',
    },
    filterTitle: '日付',
  },
  general: {
    error: {
      password: {
        invalid: 'Invalid Password',
      },
      confirmPassword: {
        notMatched: 'Password should match',
      },
      name: {
        empty: 'Key name shouldn\'t be empty',
        invalid: 'Please input valid key name',
        exists: 'Key with this name already exists',
      },
      derivationPath: {
        invalid: 'Please input valid custom derivation path',
      },
    },
  },
}

/* eslint-enable max-len */
