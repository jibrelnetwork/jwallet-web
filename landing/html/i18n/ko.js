module.exports = {
  language: {
    code: 'ko',
    title: 'Korean',
  },
  meta: {
    title: 'jWallet by the Jibrel Network',
  },
  header: {
    items: [{
      href: '#benefits',
      class: 'scroll',
      title: 'Benefits',
    }, {
      href: '#features',
      class: 'scroll',
      title: 'Features',
    }, {
      href: '#apps',
      class: 'scroll',
      title: 'Apps',
    }, {
      href: '#faq',
      class: 'scroll',
      title: 'FAQ',
    }, {
      href: '/jwallet',
      class: 'button',
      title: 'Try jWallet',
    }],
    buttonTitle: 'Menu',
  },
  start: {
    title: [
      'A better way to manage',
      'your tokens',
    ],
    subtitle: 'An institutional grade wallet to manage your cryptocurrencies',
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
      title: 'Stocked and ready to go',
      subtitle: 'The jWallet is preconfigured to be compatible with all Ethereum tokens and Ethereum itself, straight out of the box, no configuration necessary',
      direction: 'left',
    }, {
      title: 'Bring your own token',
      subtitle: 'Want to add a token that isn\'t listed or public yet? Add your own, in under five seconds',
      direction: 'right',
    }, {
      title: 'Private keys never leave your device',
      subtitle: 'All key, user and transaction data is stored locally on your device. Ensuring you take full advantage of the security and anonymity of crypto',
      direction: 'left',
    }, {
      title: 'Institutional-grade tracking tools',
      subtitle: 'See your transaction history, total value summaries and other traditional banking features you\'ve grown accustomed to',
      direction: 'right',
    }, {
      title: 'Multi-device support',
      subtitle: 'The web version of the jWallet works across devices, with native iOS and Android versions coming soon',
      direction: 'left',
    }],
  },
  apps: {
    title: 'Choose a better way to manage your tokens',
    subtitle: 'Future is already here – manage and monitor your tokens on the move',
    items: [{
      title: 'Open Web App',
      href: '/jwallet',
      class: 'web button',
    }, {
      title: 'iOS Coming soon',
      href: '#',
      class: 'ios button soon',
    }, {
      title: 'Android Coming soon',
      href: '#',
      class: 'android button soon',
    }],
  },
  faq: {
    title: 'Frequently Asked Questions',
    items: [{
      question: 'What is jWallet?',
      answer: [
        'The jWallet makes it easy and safe to store and transfer value of any tokens – anywhere, anytime, anyplace.',
      ],
    }, {
      question: 'What makes it safe?',
      answer: [
        'All the keys are encoded and stored only on user’s device. jWallet also has an open code, which allows community and developers to control the safety of all operations.',
      ],
    }, {
      question: 'Who is behind jWallet?',
      answer: [
        'Jibrel Network. It is the platform which provides traditional financial assets, such as currencies, bonds, commodities and securities, as standard ERC-20 tokens on the ethereum blockchain.',
        'We also create different kind of products on blockchain.',
        'In the longer-term we aim to fully automate and decentralize consumer banking.',
      ],
    }, {
      question: 'How do I get started?',
      answer: [
        'Follow instructions, they will not mislead. You are going to create your own key for managing your assets. After that you will find yourself in the system which is very similar to any kind of internet-banking.',
      ],
    }, {
      question: 'Is it free?',
      answer: [
        'Yes, jWallet is free to use. And will always be.',
      ],
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
      href: 'https://open.kakao.com/o/gJDnwxB',
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
  notification: {
    title: 'Token Sale is now live',
    description: [
      'Jibrel provides traditional financial assets,',
      'as ERC-20 tokens, on the Ethereum blockchain',
    ],
    link: 'Participate in token sale',
  },
  timestamp: Date.now(),
}
