import { i18n } from 'i18n/lingui'

export default [
  {
    img: '/assets/feature/jwallet.png',
    animationName: 'jwallet',
    title: i18n._(
      'Introduction.slides.jwallet.title',
      null,
      { defaults: 'Jwallet' },
    ),
    descr: i18n._(
      'Introduction.slides.jwallet.description',
      null,
      { defaults: 'A simple, fast and secure mobile wallet for Ethereum and all ERC-20 tokens.' },
    ),
  },
  {
    img: '/assets/feature/store.png',
    animationName: 'store',
    title: i18n._(
      'Introduction.slides.store.title',
      null,
      { defaults: 'Store' },
    ),
    descr: i18n._(
      'Introduction.slides.store.description',
      null,
      // eslint-disable-next-line max-len
      { defaults: 'Create and manage several wallets for different goals or just simply import your existing Ethereum and ERC-20 wallet.' },
    ),
  },
  {
    img: '/assets/feature/protect.png',
    animationName: 'protect',
    title: i18n._(
      'Introduction.slides.protect.title',
      null,
      { defaults: 'Protect' },
    ),
    descr: i18n._(
      'Introduction.slides.protect.description',
      null,
      // eslint-disable-next-line max-len
      { defaults: 'All sensitive data never leaves your device and your private keys are never shared with anyone, including us.' },
    ),
  },
  {
    img: '/assets/feature/send_receive.png',
    animationName: 'send_receive',
    title: i18n._(
      'Introduction.slides.sendReceive.title',
      null,
      { defaults: 'Send & Receive' },
    ),
    descr: i18n._(
      'Introduction.slides.sendReceive.description',
      null,
      // eslint-disable-next-line max-len
      { defaults: 'Easily send and receive assets. Save addresses for fast access to your contacts.' },
    ),
  },
  {
    img: '/assets/feature/manage.png',
    animationName: 'manage',
    title: i18n._(
      'Introduction.slides.manage.title',
      null,
      { defaults: 'Manage' },
    ),
    descr: i18n._(
      'Introduction.slides.manage.description',
      null,
      // eslint-disable-next-line max-len
      { defaults: 'Enjoy complete control over your digital assets. Manage ETH and all ERC-20 tokens.' },
    ),
  },
]
