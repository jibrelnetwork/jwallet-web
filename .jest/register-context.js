jest.mock('public/assets/logo/logo-white.svg', () => './logo-white.svg')
jest.mock('public/assets/logo/logo-blue.svg', () => './logo-blue.svg')

jest.mock('../src/utils/sprite/spriteUI', () => ({
  keys: () => [],
}))

jest.mock('../src/utils/sprite/spriteAssets', () => ({
  keys: () => [],
}))

jest.mock('../src/utils/sprite/coloredIconsUI', () => ({
  keys: () => [],
}))

jest.mock('../src/public/assets/pic_transactions_112.svg', () => 'pic_transactions_112.svg')
