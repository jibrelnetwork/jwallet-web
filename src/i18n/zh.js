/* eslint-disable max-len */

module.exports = {
  language: 'zh', // not translate
  warning: {
    memoryStorage: '你正在使用记忆来存储，请别忘记备份你的密钥！',
  },
  header: {
    sendTitle: '发送',
    receiveTitle: '接收',
    convertTitle: '兑换',
    keyManagerTitle: '密钥管理',
  },
  networkManager: {
    knownNetworkTitle: {
      main: '以太坊主网络',
      ropsten: 'Ropsten测试网络',
      kovan: 'Kovan测试网络',
      rinkeby: 'Rinkeby测试网络',
    },
    placeholder: {
      customNetwork: '自定义RPC',
    },
  },
  languages: {
    en: 'English',
    zh: 'Chinese',
    ko: 'Korean',
    ja: 'Japanese',
  },
  modals: {
    sendFunds: {
      title: '发送资产',
      customGasTitle: '自定义Gas',
      alert: {
        internalError: '交易失败，请再试一遍。',
      },
      placeholder: {
        sender: 'Sender',
        recipient: '接收地址',
        amount: '数量',
        gas: '限制 (21,000 Gas)',
        gasPrice: '价格 (1 Gwei)',
      },
      error: {
        password: {
          invalid: '密码错误',
        },
        address: {
          invalid: '请输入有效账户地址',
        },
        account: {
          notSelected: '请选择数量',
        },
        amount: {
          invalid: '请输入有效接收数量',
          lessThan0: '数量需大于0',
          exceedsBalance: '输入数量超过当前余额，请重新输入。',
        },
        gas: {
          invalid: '请输入有效的Gas限制',
          lessThan0: 'Gas限制需大于0',
        },
        gasPrice: {
          invalid: '请输入有效的Gas价格',
          lessThan0: 'Gas价格需大于0',
        },
      },
      buttonTitle: '发送资产',
    },
    receiveFunds: {
      title: '接收资产',
      copyTitle: {
        do: '复制到剪贴板',
        done: '已复制',
      },
      placeholder: {
        amount: '数量(ETH)',
        address: '接收地址',
      },
      error: {},
      buttonTitle: '生成二维码',
    },
    keystore: {
      title: '密钥管理',
      getMoreTitle: '获得更多',
      createAccountTitle: '新密钥',
      importAccountTitle: '导入密钥',
      table: {
        field: {
          name: '名称',
          actions: '行动',
        },
        accountType: {
          address: '地址',
          mnemonic: '助记词',
          readOnly: '只读',
        },
        placeholder: {
          name: '新名称',
        },
      },
      accountManagerAction: {
        editName: '编辑名称',
        editDerivationPath: '编辑派生路径',
        removeAccount: '清除密钥',
      },
      keystoreManagerAction: {
        backupKeystore: '备份密钥',
        changePassword: '设置新密码',
        removeAccounts: '清除密钥',
      },
    },
    createAccount: {
      title: '创建新密钥',
      alerts: [{
        yes: '',
        no: '密码用于访问你的钱包和资产。',
      }, {
        yes: '',
        no: '将密码备份到安全的地方十分重要。',
      }, {
        yes: '请确保已保存好密码，下一步你需要再次输入密码。',
        no: '请确保已保存好密码，下一步你需要再次输入密码。',
      }, {
        yes: '请确认你已经通过再次输入来保存好密码。',
        no: '请确认你已经通过再次输入来保存好密码。',
      }, {
        yes: '很好！操作完成！请保持密码安全存放，否则无法访问账户。',
        no: '很好！操作完成！请保持密码安全存放，否则无法访问账户。',
      }, {
        yes: '请输入密码',
        no: '请为你的钱包设置强密码。',
      }],
      placeholder: {
        mnemonic: '助记词',
        mnemonicConfirm: '助记词',
        password: '密码',
        passwordConfirm: '确认密码',
      },
      error: {
        mnemonicConfirm: {
          notMatched: '助记词需一致',
        },
      },
      buttonTitles: [
        '明白！',
        '我了解',
        '保存TXT文本',
        '确认',
        '我了解',
        '保存',
      ],
    },
    importAccount: {
      title: '导入密钥',
      alerts: [{
        yes: '请输入你的密钥数据，注意敏感信息安全',
        no: '请输入你的密钥数据，注意敏感信息安全',
      }, {
        yes: '你也可以根据助记词设置密钥派生的自定义选项。',
        no: '你也可以根据助记词设置密钥派生的自定义选项。',
      }, {
        yes: '请输入密码',
        no: '请为钱包设置强密码',
      }, {
        yes: '你的密钥导入成功！',
        no: '很好！操作完成！请保持密码安全，否则无法访问你的账号。',
      }],
      placeholder: {
        data: '地址、私钥、助记词、BIP32 xpub',
        password: '密码',
        passwordConfirm: '确认密码',
      },
      error: {
        data: {
          invalid: '请输入有效数据进行导入',
        },
      },
      buttonTitles: [{
        yes: '继续',
        no: '继续',
      }, {
        yes: '继续',
        no: '继续',
      }, {
        yes: '保存',
        no: '保存',
      }, {
        yes: 'OK',
        no: '我了解',
      }],
    },
    derivationPath: {
      title: '新派生路径',
      knownPathNames: [
        '默认',
        'Ledger (ETH)',
        'Ledger (ETC)',
        'TREZOR (ETC)',
        '网络: Testnets',
        '网络: Expanse',
      ],
      placeholder: {
        customDerivationPath: '自定义派生路径',
      },
      error: {
        customDerivationPath: {
          same: '无法设置同样派生路径',
          invalid: '无效派生路径',
        },
      },
      buttonTitle: '设置派生路径',
    },
    backupKeystore: {
      title: '备份Keystore',
      buttonTitle: '保存TXT文本',
      placeholder: {
        password: 'Keystore密码',
      },
      error: {
        password: {
          invalid: '密码错误',
        },
      },
    },
    changePassword: {
      title: '新Keystore密码',
      buttonTitle: '确认',
      placeholder: {
        password: '当前密码',
        newPassword: '新密码',
      },
      error: {
        password: {
          invalid: '密码错误',
        },
        newPassword: {
          weak: '密码太弱',
        },
      },
    },
    removeAccounts: {
      title: '清除Keystore',
      alert: '请确认你要删除所有密钥',
      buttonTitle: '确认',
    },
    digitalAssetManager: {
      searchField: '搜索数字资产...',
      table: {
        field: {
          symbol: '标志',
          name: '名称',
          balance: '余额',
          licensed: '合规',
          transfer: '交易',
        },
        licensedValue: {
          yes: '是',
          no: '否',
        },
        transferValue: {
          authorized: '经授权',
          notAuthorized: '未经授权',
        },
      },
      addCustomTokenTitle: '添加自定义代币',
    },
    addCustomToken: {
      title: '添加自定义代币',
      buttonTitle: '保存',
      placeholder: {
        address: '地址',
        name: '名称',
        symbol: '标志',
        decimals: '精度',
      },
      error: {
        address: {
          invalid: '地址需为有效的合约地址',
          exists: '该代币地址已存在',
        },
        name: {
          invalid: '名称需为有效的合约名称',
        },
        symbol: {
          invalid: '名称需为有效的合约名称',
          exists: 'Token with this symbol already exists',
        },
        decimals: {
          invalid: '精度需为有效的合约精度',
        },
      },
    },
    alphaWarning: {
      buttonTitle: '明白！',
      message: 'j钱包现仍处于Alpha测试阶段，请谨慎使用，避免大额交易。',
    },
    general: {
      error: {
        password: {
          invalid: '密码错误',
        },
        passwordConfirm: {
          notMatched: '密码需一致',
        },
      },
    },
    customOptionsTitle: '自定义选项',
    passwordButtonTitle: 'Type your password',
  },
  digitalAssets: {
    title: '数字资产',
    iconTitle: '管理数字资产',
  },
  transactions: {
    searchField: '搜索交易...',
    table: {
      emptyContract: [
        '似乎账户上',
        '还没有任何交易记录',
      ],
      noActiveDigitalAsset: '似乎账户上还没有活跃的数字资产',
      customNetwork: '我们无法加载私有区块链的交易记录',
      blockExplorerError: '我们无法加载你的ETH交易记录',
      blockExplorerLink: '在区块浏览器上查看交易记录',
      field: {
        amount: '数量',
        timestamp: '时间',
        address: '从/到',
        status: '状态',
      },
      detailsField: {
        txHash: '交易哈希',
        fee: '手续费',
        from: '从',
        to: '到',
      },
      statusValue: {
        accepted: '接收',
        rejected: '拒绝',
        pending: '待确认',
      },
    },
    transactionManagerAction: {
      sendFunds: '发送资产',
      receiveFunds: '接收资产',
      convertFunds: '兑换资产',
      filter: '过滤',
      remove: '移除',
    },
    filterTitle: '日期',
  },
}

/* eslint-enable max-len */
