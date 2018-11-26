// @flow

// test it with address
// 0x4Bda106325C335dF99eab7fE363cAC8A0ba2a24D

const MAIN_ASSETS = [{
  name: 'Test Test Token (MTT)',
  symbol: '_MTT',
  decimals: 18,
  address: '0x0d0f936ee4c93e25944694d6c121de94d9760f11',
  isActive: true,
  isCustom: false,
}, {
  name: 'Test Test Token (ZRX)',
  symbol: '_ZRX',
  decimals: 18,
  address: '0xa8e9fa8f91e5ae138c74648c9c304f1c75003a8d',
  isActive: true,
  isCustom: false,
}, {
  name: 'Test Test Token (CCC)',
  symbol: '_CCC',
  decimals: 18,
  address: '0x7f01e73f94011f7ac727dc34d7b3f4135b49e80c',
  isActive: true,
  isCustom: false,
}, {
  name: 'ZE Token based on ZRX Token',
  symbol: '_ZE',
  decimals: 18,
  address: '0x4bda106325c335df99eab7fe363cac8a0ba2a24d',
  isActive: true,
  isCustom: false,
}, {
  name: 'Jibrel Network Token',
  symbol: 'JNT',
  decimals: 18,
  address: '0xa5fd1a791c4dfcaacc963d4f73c6ae5824149ea7',
  isActive: true,
  isCustom: false,
}, {
  name: 'Qtum',
  symbol: 'QTUM',
  decimals: 18,
  address: '0x9a642d6b3368ddc662CA244bAdf32cDA716005BC',
  isActive: false,
  isCustom: false,
}, {
  name: 'OmiseGo',
  symbol: 'OMG',
  decimals: 18,
  address: '0xd26114cd6EE289AccF82350c8d8487fedB8A0C07',
  isActive: false,
  isCustom: false,
}, {
  name: 'EOS',
  symbol: 'EOS',
  decimals: 18,
  address: '0x86fa049857e0209aa7d9e616f7eb3b3b78ecfdb0',
  isActive: false,
  isCustom: false,
}, {
  name: 'Maker',
  symbol: 'MKR',
  decimals: 18,
  address: '0xc66ea802717bfb9833400264dd12c2bceaa34a6d',
  isActive: false,
  isCustom: false,
}, {
  name: 'Augur Reputation',
  symbol: 'REP',
  decimals: 18,
  address: '0xe94327d07fc17907b4db788e5adf2ed424addff6',
  isActive: false,
  isCustom: false,
}, {
  name: 'Golem Network Token',
  symbol: 'GNT',
  decimals: 18,
  address: '0xa74476443119A942dE498590Fe1f2454d7D4aC0d',
  isActive: false,
  isCustom: false,
}, {
  name: 'TenXPay',
  symbol: 'PAY',
  decimals: 18,
  address: '0xB97048628DB6B661D4C2aA833e95Dbe1A905B280',
  isActive: false,
  isCustom: false,
}, {
  name: 'Kyber Network Crystal',
  symbol: 'KNC',
  decimals: 18,
  address: '0xdd974d5c2e2928dea5f71b9825b8b646686bd200',
  isActive: false,
  isCustom: false,
}, {
  name: 'Basic Attention Token',
  symbol: 'BAT',
  decimals: 18,
  address: '0x0d8775f648430679a709e98d2b0cb6250d2887ef',
  isActive: false,
  isCustom: false,
}, {
  name: 'Digix Token',
  symbol: 'DGD',
  decimals: 9,
  address: '0xe0b7927c4af23765cb51314a0e0521a9645f0e2a',
  isActive: false,
  isCustom: false,
}, {
  name: 'ICONOMI Token',
  symbol: 'ICN',
  decimals: 18,
  address: '0x888666CA69E0f178DED6D75b5726Cee99A87D698',
  isActive: false,
  isCustom: false,
}, {
  name: '0xToken',
  symbol: 'ZRX',
  decimals: 18,
  address: '0xe41d2489571d322189246dafa5ebde1f4699f498',
  isActive: false,
  isCustom: false,
}, {
  name: 'Status Network Token',
  symbol: 'SNT',
  decimals: 18,
  address: '0x744d70fdbe2ba4cf95131626614a1763df805b9e',
  isActive: false,
  isCustom: false,
}, {
  name: 'Civic Token',
  symbol: 'CVC',
  decimals: 8,
  address: '0x41e5560054824ea6b0732e656e3ad64e20e94e45',
  isActive: false,
  isCustom: false,
}, {
  name: 'MetalPay',
  symbol: 'MTL',
  decimals: 8,
  address: '0xF433089366899D83a9f26A773D59ec7eCF30355e',
  isActive: false,
  isCustom: false,
}, {
  name: 'Singles',
  symbol: 'SNGLS',
  decimals: 0,
  address: '0xaec2e87e0a235266d9c5adc9deb4b2e29b54d009',
  isActive: false,
  isCustom: false,
}, {
  name: 'Bitquence Token',
  symbol: 'BQX',
  decimals: 8,
  address: '0x5af2be193a6abca9c8817001f45744777db30756',
  isActive: false,
  isCustom: false,
}, {
  name: 'Bancor Network Token',
  symbol: 'BNT',
  decimals: 18,
  address: '0x1f573d6fb3f13d689ff844b4ce37794d79a7ff1c',
  isActive: false,
  isCustom: false,
}, {
  name: 'Gnosis Token',
  symbol: 'GNO',
  decimals: 18,
  address: '0x6810e776880c02933d47db1b9fc05908e5386b96',
  isActive: false,
  isCustom: false,
}, {
  name: 'Monaco Token',
  symbol: 'MCO',
  decimals: 8,
  address: '0xb63b606ac810a52cca15e44bb630fd42d8d1d83d',
  isActive: false,
  isCustom: false,
}, {
  name: 'FunToken',
  symbol: 'FUN',
  decimals: 8,
  address: '0x419d0d8bdd9af5e606ae2232ed285aff190e711b',
  isActive: false,
  isCustom: false,
}, {
  name: 'Storj Token',
  symbol: 'STORJ',
  decimals: 8,
  address: '0xb64ef51c888972c908cfacf59b47c1afbc0ab8ac',
  isActive: false,
  isCustom: false,
}, {
  name: 'Edgeless Token',
  symbol: 'EDG',
  decimals: 0,
  address: '0x08711d3b02c8758f2fb3ab4e80228418a7f8e39c',
  isActive: false,
  isCustom: false,
}, {
  name: 'Melon',
  symbol: 'MLN',
  decimals: 18,
  address: '0xBEB9eF514a379B997e0798FDcC901Ee474B6D9A1',
  isActive: false,
  isCustom: false,
}, {
  name: 'Aragon Network Token',
  symbol: 'ANT',
  decimals: 18,
  address: '0x960b236A07cf122663c4303350609A66A7B288C0',
  isActive: false,
  isCustom: false,
}, {
  name: 'iExec RLC Token',
  symbol: 'RLC',
  decimals: 9,
  address: '0x607F4C5BB672230e8672085532f7e901544a7375',
  isActive: true,
  isCustom: false,
}, {
  name: 'Wings',
  symbol: 'WINGS',
  decimals: 18,
  address: '0x667088b212ce3d06a1b553a7221E1fD19000d9aF',
  isActive: false,
  isCustom: false,
}, {
  name: 'TaaS Fund',
  symbol: 'TAAS',
  decimals: 6,
  address: '0xe7775a6e9bcf904eb39da2b68c5efb4f9360e08c',
  isActive: false,
  isCustom: false,
}, {
  name: 'AirSwap',
  symbol: 'AST',
  decimals: 4,
  address: '0x27054b13b1b798b345b591a4d22e6562d47ea75a',
  isActive: false,
  isCustom: false,
}, {
  name: 'TokenCard',
  symbol: 'TKN',
  decimals: 8,
  address: '0xaaaf91d9b90df800df4f55c205fd6989c977e73a',
  isActive: false,
  isCustom: false,
}, {
  name: 'FirstBlood',
  symbol: '1ST',
  decimals: 18,
  address: '0xaf30d2a7e90d7dc361c8c4585e9bb7d2f6f15bc7',
  isActive: false,
  isCustom: false,
}, {
  name: 'Cofound.it Token',
  symbol: 'CFI',
  decimals: 18,
  address: '0x12fef5e57bf45873cd9b62e9dbd7bfb99e32d73e',
  isActive: false,
  isCustom: false,
}, {
  name: 'Decentraland Mana',
  symbol: 'MANA',
  decimals: 18,
  address: '0x0f5d2fb29fb7d3cfee444a200298f468908cc942',
  isActive: false,
  isCustom: false,
}, {
  name: 'district0x Network Token',
  symbol: 'DNT',
  decimals: 18,
  address: '0x0abdace70d3790235af448c88547603b945604ea',
  isActive: false,
  isCustom: false,
}, {
  name: 'TrustCoin',
  symbol: 'TRST',
  decimals: 6,
  address: '0xcb94be6f13a1182e4a4b6140cb7bf2025d28e41b',
  isActive: false,
  isCustom: false,
}, {
  name: 'Xaurum',
  symbol: 'XAUR',
  decimals: 8,
  address: '0x4DF812F6064def1e5e029f1ca858777CC98D2D81',
  isActive: false,
  isCustom: false,
}, {
  name: 'Etheroll Dice',
  symbol: 'DICE',
  decimals: 16,
  address: '0x2e071D2966Aa7D8dECB1005885bA1977D6038A65',
  isActive: false,
  isCustom: false,
}, {
  name: 'ChronoBank Time',
  symbol: 'TIME',
  decimals: 8,
  address: '0x6531f133e6deebe7f2dce5a0441aa7ef330b4e53',
  isActive: false,
  isCustom: false,
}, {
  name: 'Santiment Network Token',
  symbol: 'SAN',
  decimals: 18,
  address: '0x7c5a0ce9267ed19b22f8cae653f198e3e8daf098',
  isActive: false,
  isCustom: false,
}, {
  name: 'Humaniq',
  symbol: 'HMQ',
  decimals: 8,
  address: '0xcbcc0f036ed4788f63fc0fee32873d6a7487b908',
  isActive: false,
  isCustom: false,
}, {
  name: 'Numeraire',
  symbol: 'NMR',
  decimals: 18,
  address: '0x1776e1f26f98b1a5df9cd347953a26dd3cb46671',
  isActive: false,
  isCustom: false,
}, {
  name: 'Matchpool Guppy',
  symbol: 'GUPPY',
  decimals: 3,
  address: '0xf7b098298f7c69fc14610bf71d5e02c60792894c',
  isActive: false,
  isCustom: false,
}, {
  name: 'AdToken',
  symbol: 'ADT',
  decimals: 9,
  address: '0xd0d6d6c5fe4a677d343cc433536bb717bae167dd',
  isActive: false,
  isCustom: false,
}, {
  name: 'Lunyr Token',
  symbol: 'LUN',
  decimals: 18,
  address: '0xfa05A73FfE78ef8f1a739473e462c54bae6567D9',
  isActive: false,
  isCustom: false,
}, {
  name: 'Blockchain Capital Token',
  symbol: 'BCAP',
  decimals: 0,
  address: '0xff3519eeeea3e76f1f699ccce5e23ee0bdda41ac',
  isActive: false,
  isCustom: false,
}, {
  name: 'Nimiq Network Token',
  symbol: 'NET',
  decimals: 18,
  address: '0xcfb98637bcae43C13323EAa1731cED2B716962fD',
  isActive: false,
  isCustom: false,
}, {
  name: 'Swarm City Token',
  symbol: 'SWT',
  decimals: 18,
  address: '0xb9e7f8568e08d5659f5d29c4997173d84cdf2607',
  isActive: true,
  isCustom: false,
}, {
  name: 'Pluton',
  symbol: 'PLU',
  decimals: 18,
  address: '0xD8912C10681D8B21Fd3742244f44658dBA12264E',
  isActive: false,
  isCustom: false,
}, {
  name: 'vSlice',
  symbol: 'VSL',
  decimals: 18,
  address: '0x5c543e7AE0A1104f78406C340E9C64FD9fCE5170',
  isActive: true,
  isCustom: false,
}]

export default MAIN_ASSETS
