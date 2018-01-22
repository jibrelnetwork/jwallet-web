module.exports = {
  language: {
    code: 'ko',
    title: 'Korean',
  },
  meta: {
    title: 'jWallet by the Jibrel Network',
    description: '지브렐 네트워크는 화폐, 채권 및 주식과 같은 전통 금융 자산을 이더리움 블록체인을 적용한 ERC-20 토큰으로 제공합니다.',
    name: 'jWallet by the Jibrel Network',
  },
  header: {
    items: [{
      href: '#benefits',
      title: '장점',
      class: 'scroll', // not translate
    }, {
      href: '#features',
      title: '특징',
      class: 'scroll', // not translate
    }, {
      href: '#apps',
      title: '앱',
      class: 'scroll', // not translate
    }],
    languages: [{
      href: '/',
      title: 'English',
    }, {
      href: '/ko.html',
      title: 'Korean',
    }],
    jWalletLink: '/jwallet?lang=ko',
    jWalletButtonTitle: 'jWallet 사용하기',
    menuButtonTitle: 'Menu',
  },
  start: {
    title: [
      '토큰을 관리하는',
      '더 좋은 방법',
    ],
    subtitle: '암호화폐를 관리할 기관 수준의 지갑',
  },
  benefits: {
    items: [{
      title: '언제 어디서나 사용 가능',
      description: 'jWallet은 스마트폰으로도 사용할 수 있기 때문에 언제 어디서나 토큰에 접근할 수 있습니다. 웹 버전은 데스크탑과 모바일 브라우저 모두 사용 가능합니다.',
    }, {
      title: '개인정보 보호',
      description: '로그인 되거나 새로 생성된 키 등을 포함한 모든 사용자 데이터는 임시적으로 저장되며 개인 키 등의 개인정보를 보호할 수 있습니다.',
    }, {
      title: '전문가에 의한 제작',
      description: '복잡한 작업들은 전문가들이 모두 완료했기 때문에 사용자들은 복잡한 작업을 할 필요가 없습니다. jWallet은 표준 URI scheme 및 QR 코드 생성과 같은 새로운 기능들을 이더리움에 도입했습니다.',
    }],
  },
  features: {
    items: [{
      title: '구비 및 사용 준비 완료',
      subtitle: 'jWallet은 모든 이더리움 및 이더리움 토큰들과 호환되도록 구성되어 있으며 별도의 환경 설정 없이 즉시 사용할 수 있습니다',
      direction: 'left', // not translate
    }, {
      title: '나만의 토큰 추가하기',
      subtitle: '목록에 없거나 아직 출시되지 않은 토큰을 추가하고 싶은가요? 5초만에 나만의 토큰을 추가하세요',
      direction: 'right', // not translate
    }, {
      title: '개인 키는 절대 디바이스에서 유출되지 않습니다',
      subtitle: '모든 키, 사용자 및 거래 기록 데이터는 디바이스에 저장됩니다. 암호화폐의 보안 및 익명성을 최대한 활용할 수 있도록 보장합니다',
      direction: 'left', // not translate
    }, {
      title: '기관 수준의 확인 기능',
      subtitle: '거래 내역, 총 자산 개요 및 익숙한 기존 은행 업무 기능을 확인하세요',
      direction: 'right', // not translate
    }, {
      title: '멀티 디바이스 지원',
      subtitle: 'jWallet의 웹 버전은 여러 기기에서 사용이 가능하며 iOS 및 안드로이드 버전도 곧 출시됩니다',
      direction: 'left', // not translate
    }],
  },
  apps: {
    title: '토큰을 관리할 더 좋은 방법을 선택하세요',
    subtitle: '미래의 기술들이 실현되고 있습니다. 이동 중에 토큰을 관리하고 모니터하세요',
    items: [{
      title: '웹 버전 사용하기',
      href: '/jwallet?lang=ko',
      class: 'web button', // not translate
      id: 'try-jwallet-web-app', // not translate
    }, {
      title: 'iOS 버전 출시 예정',
      href: '#',
      class: 'ios button soon', // not translate
      id: 'try-jwallet-ios-app', // not translate
    }, {
      title: 'Android 버전 출시 예정',
      href: '#',
      class: 'android button soon', // not translate
      id: 'try-jwallet-android-app', // not translate
    }],
  },
  footer: {
    links: [{
      href: 'https://twitter.com/JibrelNetwork',
      type: 'twitter', // not translate
      title: '트위터',
    }, {
      href: 'https://www.reddit.com/r/JibrelNetwork',
      type: 'reddit', // not translate
      title: '레딧',
    }, {
      href: 'https://bitcointalk.org/index.php?topic=2057487.0',
      type: 'bitcointalk', // not translate
      title: '비트코인 토크',
    }, {
      href: 'https://open.kakao.com/o/ghfXgFE',
      type: 'kakaotalk', // not translate
      title: '카카오톡',
    }, {
      href: 'https://medium.com/@jibrelnetwork',
      type: 'medium', // not translate
      title: '미디엄',
    }, {
      href: 'https://www.youtube.com/watch?v=LBMyd7Ql8QU',
      type: 'youtube', // not translate
      title: '유튜브',
    }, {
      href: 'https://t.me/jibrel_network',
      type: 'telegram', // not translate
      title: '텔레그램',
    }, {
      href: 'https://jibrelnetwork.slack.com',
      type: 'slack', // not translate
      title: '슬랙',
    }],
    copy: [
      '© 2017 Jibrel Network. All Rights Reserved.',
      'Baarerstrasse 10, 6302 Zug, Switzerland',
    ],
  },
  timestamp: Date.now(),
}
