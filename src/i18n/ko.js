/* eslint-disable max-len */

module.exports = {
  language: 'ko', // not translate
  warning: {
    memoryStorage: '메모리를 스토리지로 사용 중입니다. 반드시 키를 백업하세요!',
  },
  header: {
    sendTitle: '출금',
    receiveTitle: '입금',
    convertTitle: '전환',
    keyManagerTitle: '키 관리',
  },
  networkManager: {
    knownNetworkTitle: {
      main: '메인 이더리움 네트워크',
      ropsten: 'Ropsten 테스트 네트워크',
      kovan: 'Kovan 테스트 네트워크',
      rinkeby: 'Rinkeby 테스트 네트워크',
    },
    placeholder: {
      customNetwork: '커스텀 RPC',
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
        address: '주소',
        name: '이름',
        symbol: '심볼',
        decimals: 'decimals',
      },
      error: {
        address: {
          invalid: '유효한 컨트랙트 주소를 입력해주세요',
          exists: 'Asset with this address already exists',
        },
        name: {
          invalid: '유효한 컨트랙트 이름을 입력해주세요',
        },
        symbol: {
          invalid: '유효한 컨트랙트 심볼을 입력해주세요',
          exists: 'Asset with this symbol already exists',
        },
        decimals: {
          invalid: '유효한 컨트랙트 소수점을 입력해주세요',
        },
      },
    },
    backupKeys: {
      title: 'Backup Keys',
      buttonTitle: 'Backup keys',
      placeholder: {
        password: '키스토어 비밀번호',
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
        newPassword: '새 비밀번호',
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
      title: '출금',
      customGasTitle: '사용자 정의 옵션',
      alert: {
        internalError: '거래 실패. 다시 시도해주세요',
        emptyETHBalance: 'You don\'t have any ETH to paid for transaction',
      },
      placeholder: {
        sender: 'Sender',
        recipient: '입금 주소',
        amount: '금액',
        gas: '가스',
        gasPrice: '가스 가격 (wei)',
      },
      error: {
        password: {
          invalid: '비밀번호 불일치',
        },
        address: {
          invalid: '유효한 주소를 입력해주세요',
        },
        account: {
          notSelected: '계정을 선택해주세요',
        },
        amount: {
          invalid: '유효한 거래 금액을 입력해주세요',
          lessThan0: '금액은 0보다 높아야 합니다',
          exceedsBalance: '잔액이 부족합니다. 유효한 금액을 입력해주세요',
        },
        gas: {
          invalid: '유효한 가스 한도 값을 입력해주세요',
          lessThan0: '가스 한도는 0보다 높아야 합니다',
        },
        gasPrice: {
          invalid: '유효한 가스 가격을 입력해주세요',
          lessThan0: '가스 가격은 0보다 높아야 합니다',
        },
      },
      buttonTitle: '출금',
    },
    receiveFunds: {
      title: '입금',
      copyTitle: {
        do: '클립보드로 복사하기',
        done: '복사 완료',
      },
      placeholder: {
        amount: '금액 (ETH)',
        address: '입금 주소',
      },
      error: {},
      buttonTitle: 'QR코드 생성',
    },
    keystore: {
      title: '키 관리',
      getMoreTitle: '더보기',
      createAccountTitle: '키 만들기',
      importAccountTitle: '키 불러오기',
      table: {
        field: {
          name: '이름',
          actions: '행동',
        },
        accountType: {
          address: '주소',
          mnemonic: '니모닉',
          readOnly: '읽기 전용',
        },
        placeholder: {
          name: '새로운 이름',
        },
      },
      accountManagerAction: {
        editName: '이름 편집',
        editDerivationPath: 'Derivation Path 편집',
        removeAccount: '키 초기화',
      },
      keystoreManagerAction: {
        backupKeystore: '키 백업',
        changePassword: '비밀번호 재설정',
        removeAccounts: '키 초기화',
      },
    },
    createAccount: {
      title: '신규 키 만들기',
      alerts: [{
        yes: '',
        no: '패스프레이즈는 귀하의 지갑과 자산에 대한 접근 권한을 부여합니다.',
      }, {
        yes: '',
        no: '패스프레이즈는 안전한 장소에 보관하세요.',
      }, {
        yes: '패스프레이즈를 저장하세요. 다음 단계에서 패스프레이즈를 입력해야 합니다.',
        no: ' 패스프레이즈를 저장하세요. 다음 단계에서 패스프레이즈를 입력해야 합니다.',
      }, {
        yes: '패스프레이즈를 저장했는지 확인하기 위해 다시 한번 입력해주세요.',
        no: ' 패스프레이즈를 저장했는지 확인하기 위해 다시 한번 입력해주세요.',
      }, {
        yes: '모든 설정이 완료되었습니다. 패스프레이즈 없이는 귀하의 계정에 접근할 수 없으니 안전하게 보관하세요!',
        no: '모든 설정이 완료되었습니다. 패스프레이즈 없이는 귀하의 계정에 접근할 수 없으니 안전하게 보관하세요!',
      }, {
        yes: '비밀번호를 입력하세요',
        no: '지갑 비밀번호를 설정하세요.',
      }],
      placeholder: {
        mnemonic: '니모닉',
        mnemonicConfirm: '니모닉',
        password: '비밀번호',
        passwordConfirm: '비밀번호 확인',
      },
      error: {
        mnemonicConfirm: {
          notMatched: '니모닉이 일치하지 않습니다',
        },
      },
      buttonTitles: [
        '알겠습니다.',
        '알겠습니다.',
        'TXT파일로 저장하기',
        '확인',
        '알겠습니다.',
        '저장하기',
      ],
    },
    importAccount: {
      title: '키 불러오기',
      alerts: [{
        yes: '키 데이터를 입력하세요. 중요한 정보는 귀하의 디바이스에서 유출되지 않습니다.',
        no: ' 키 데이터를 입력하세요. 중요한 정보는 귀하의 디바이스에서 유출되지 않습니다.',
      }, {
        yes: '니모닉에서의 키 유도를 위해 사용자 정의 옵션을 설정할 수 있습니다.',
        no: ' 니모닉에서의 키 유도를 위해 사용자 정의 옵션을 설정할 수 있습니다.',
      }, {
        yes: '비밀번호를 입력해주세요',
        no: '지갑 비밀번호를 설정하세요.',
      }, {
        yes: '성공적으로 키를 불러왔습니다.',
        no: '모든 설정이 완료되었습니다. 비밀번호 없이는 귀하의 계정에 접근할 수 없으니 안전하게 보관하세요!',
      }],
      placeholder: {
        data: '주소, 개인 키, 니모닉, BIP32 xpub',
        password: '비밀번호',
        passwordConfirm: '비밀번호 확인',
      },
      error: {
        data: {
          invalid: '유효한 데이터를 입력하세요',
        },
      },
      buttonTitles: [{
        yes: '계속',
        no: '계속',
      }, {
        yes: '계속',
        no: '계속',
      }, {
        yes: '저장하기',
        no: '저장하기',
      }, {
        yes: 'OK',
        no: '알겠습니다',
      }],
    },
    derivationPath: {
      title: '신규 Derivation Path',
      knownPathNames: [
        '기본 설정',
        'Ledger (ETH)',
        'Ledger (ETC)',
        'TREZOR (ETC)',
        '네트워크: Testnets',
        '네트워크: Expanse',
      ],
      placeholder: {
        customDerivationPath: '사용자 정의 Derivation Path',
      },
      error: {
        customDerivationPath: {
          same: '동일한 Derivation Path를 설정할 수 없습니다',
          invalid: '유효하지 않은 Derivation Path',
        },
      },
      buttonTitle: 'Derivation Path 설정',
    },
    removeAccounts: {
      title: '키스토어 초기화',
      alert: '모든 키를 제거하시겠습니까?',
      buttonTitle: '확인',
    },
    digitalAssetManager: {
      searchField: '디지털 자산 검색...',
      table: {
        field: {
          symbol: '심볼',
          name: '이름',
          balance: '잔액',
          licensed: '라이센스',
          transfer: '이체',
        },
        licensedValue: {
          yes: 'O',
          no: 'X',
        },
        transferValue: {
          authorized: '승인',
          notAuthorized: '비승인',
        },
      },
      addCustomTokenTitle: '커스텀 토큰 추가',
    },
    alphaWarning: {
      buttonTitle: '알겠습니다',
      message: 'jWallet 알파 버전은 안정적이지 않습니다. 조심히 사용해주세요.',
    },
    general: {
      error: {
        password: {
          invalid: '비밀번호 불일치',
        },
        passwordConfirm: {
          notMatched: '비밀번호가 일치하지 않습니다',
        },
      },
    },
    customOptionsTitle: '사용자 정의 옵션',
    passwordButtonTitle: 'Type your password',
  },
  digitalAssets: {
    title: '디지털 자산',
    iconTitle: '디지털 자산 관리',
  },
  transactions: {
    searchField: '거래 내역 검색...',
    table: {
      emptyContract: [
        '귀하의 계정에',
        '가/이 존재하지 않습니다.',
      ],
      noActiveDigitalAsset: '활성화된 디지털 자산이 존재하지 않습니다',
      customNetwork: '개인 블록체인에 대한 거래 내역을 불러올 수 없습니다',
      blockExplorerError: 'ETH 거래 내역을 불러올 수 없습니다',
      blockExplorerLink: 'block explorer에서 거래 확인하기',
      field: {
        amount: '금액',
        timestamp: '시간',
        address: '보낸 주소/받는 주소',
        status: '상태',
      },
      detailsField: {
        txHash: 'TXHASH',
        fee: '수수료',
        from: '보낸 주소',
        to: '받는 주소',
      },
      statusValue: {
        accepted: '승인됨',
        rejected: '거부됨',
        pending: '대기 중',
      },
    },
    transactionManagerAction: {
      sendFunds: '출금',
      receiveFunds: '입금',
      convertFunds: '변환',
      filter: '필터',
      remove: '삭제',
    },
    filterTitle: '날짜',
  },
}

/* eslint-enable max-len */
