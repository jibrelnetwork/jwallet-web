jest.mock('public/assets/logo/logo-white.svg', () => './logo-white.svg')
jest.mock('public/assets/logo/logo-blue.svg', () => './logo-blue.svg')

jest.mock('../src/utils/sprite/spriteUI', () => ({
  keys: () => [],
}))

jest.mock('../src/utils/sprite/spriteAssets', () => ({
  keys: () => [],
}))
