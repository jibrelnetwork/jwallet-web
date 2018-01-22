module.exports = {
  language: {
    code: 'en',
    title: 'English',
  },
  meta: {
    title: 'jWallet by the Jibrel Network',
    description: 'The jWallet is the first institutional-grade Ethereum wallet. It works across desktop and mobile devices, and private keys never leave your device. The jWallet comes preconfigured to work with your favorite tokens.',
    name: 'jWallet by the Jibrel Network',
  },
  header: {
    items: [{
      href: '#benefits',
      title: 'Benefits',
      class: 'scroll', // not translate
    }, {
      href: '#features',
      title: 'Features',
      class: 'scroll', // not translate
    }, {
      href: '#apps',
      title: 'Apps',
      class: 'scroll', // not translate
    }],
    languages: [{
      href: '/',
      title: 'English',
    }, {
      href: '/ko.html',
      title: 'Korean',
    }],
    jWalletLink: '/jwallet',
    jWalletButtonTitle: 'Try jWallet',
    menuButtonTitle: 'Menu',
  },
  start: {
    title: [
      'A better way to manage',
      'your tokens',
    ],
    subtitle: 'An institutional-grade wallet to manage your digital assets',
  },
  benefits: {
    items: [{
      title: 'Anywhere, anytime',
      description: 'The jWallet is mobile friendly, so you can access your tokens everywhere you go. The web-version works on desktop and mobile browsers.',
    }, {
      title: 'The power of privacy',
      description: 'All user data, including imported or generated private keys are stored locally, meaning your private keys, remain just that… private.',
    }, {
      title: 'Made by geeks',
      description: 'We’ve done the complicated stuff so you won’t have to. the jWallet introduces new features to Ethereum, like a standard URI scheme and QR code generator.',
    }],
  },
  features: {
    items: [{
      title: 'Stocked and Loaded',
      subtitle: 'The jWallet is preconfigured to be compatible with the most popular ERC-20 tokens, straight out of the box, no configuration necessary',
      direction: 'left',
    }, {
      title: 'Bring Your Own Token (BYOT)',
      subtitle: 'Want to add a token that isn\'t listed or public yet? You can easily add your own, using the import token feature',
      direction: 'right',
    }, {
      title: 'Private Keys Always Stay Private',
      subtitle: 'With the jWallet, all sensitive data never leaves your device. Your private keys are never shared with anyone, including us!',
      direction: 'left',
    }, {
      title: 'Banking-grade Tracking Tools',
      subtitle: 'See your transaction history, total value summaries and other traditional banking features you\'ve gotten used to',
      direction: 'right',
    }, {
      title: 'Multi-device support',
      subtitle: 'The web version of the jWallet works across devices, with native iOS and Android versions coming soon',
      direction: 'left',
    }],
  },
  apps: {
    title: 'The Next Generation of Token Wallets has Arrived',
    subtitle: 'Manage all your digital assets easily and securely',
    items: [{
      title: 'Open Web App',
      href: '/jwallet',
      class: 'web button', // not translate
      id: 'try-jwallet-web-app', // not translate
    }, {
      title: 'iOS Coming soon',
      href: '#',
      class: 'ios button soon', // not translate
      id: 'try-jwallet-ios-app', // not translate
    }, {
      title: 'Android Coming soon',
      href: '#',
      class: 'android button soon', // not translate
      id: 'try-jwallet-android-app', // not translate
    }],
  },
  footer: {
    links: [{
      href: 'https://twitter.com/JibrelNetwork',
      type: 'twitter',
      title: 'Twitter',
    }, {
      href: 'https://www.reddit.com/r/JibrelNetwork',
      type: 'reddit',
      title: 'Reddit',
    }, {
      href: 'https://bitcointalk.org/index.php?topic=2057487.0',
      type: 'bitcointalk',
      title: 'Bitcointalk',
    }, {
      href: 'https://open.kakao.com/o/ghfXgFE',
      type: 'kakaotalk',
      title: 'Kakaotalk',
    }, {
      href: 'https://medium.com/@jibrelnetwork',
      type: 'medium',
      title: 'Medium',
    }, {
      href: 'https://www.youtube.com/watch?v=LBMyd7Ql8QU',
      type: 'youtube',
      title: 'Youtube',
    }, {
      href: 'https://t.me/jibrel_network',
      type: 'telegram',
      title: 'Telegram',
    }, {
      href: 'https://jibrelnetwork.slack.com',
      type: 'slack',
      title: 'Slack',
    }],
    copy: [
      '© 2017 Jibrel Network. All Rights Reserved.',
      'Baarerstrasse 10, 6302 Zug, Switzerland',
    ],
  },
  timestamp: Date.now(),
}
